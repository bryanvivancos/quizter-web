import {create} from 'zustand'
import {type Question} from './types'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'

interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>
    selectedAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: () => void
    goPreviousQuestion: () => void
    reset: () => void
}

export const useQuestionStore = create<State>()(persist((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,

        fetchQuestions: async (limit: number) => {
            const res = await fetch("http://localhost:5173/data.json")
            const json = await res.json()

            const questions = json.sort(() => Math.random() - 0.5).slice(0,limit)
            
            set({questions})
        },

        selectedAnswer: (questionId: number, answerIndex: number) => {
            // get nos retorna el objeto del estado useQuestionStore y con el podemos trabajar
            const {questions} = get() 
            // usar el structuredClone para cloner el objeto
            const newQuestions = structuredClone(questions)
            // encontramos el indice de la pregunta
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            // obtenemos la informacion de la pregunta
            const questionInfo = newQuestions[questionIndex]
            // averiguamos si el usuario ha seleccionado la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
            if (isCorrectUserAnswer) confetti({
                origin: { y: 0.8}
            })
            //cambiar esta informacion en la copiua de la pregunta
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            //actualizamos el estado
            set({questions: newQuestions})

        },

        goNextQuestion: () => {
            const {currentQuestion, questions} = get()
            const nextQuestion = currentQuestion + 1

            if (currentQuestion < questions.length) {
                set({ currentQuestion: nextQuestion })
            }
        },

        goPreviousQuestion: () => {
            const { currentQuestion } = get()
            const nextQuestion = currentQuestion - 1

            if (currentQuestion >= 0) {
                set({ currentQuestion: nextQuestion })
            }
        },

        reset: () => {
            set({ currentQuestion: 0, questions:[] })
        }
    }
}, {
    name: 'questions'
}))