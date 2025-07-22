import {create} from 'zustand'
import {type Question} from './types'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'

interface State {
    questions: Question[]
    loading: boolean //get questions
    error: null // get questions
    currentQuestion: number
    showResults: boolean
    fetchQuestions: (limit: number) => Promise<void>
    selectedAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: () => void
    goPreviousQuestion: () => void
    reset: () => void
    showResultsDisplay: () => void

}

// const BIN_ID = import.meta.env.VITE_JSONBIN_ID;
// const API_KEY = import.meta.env.VITE_JSONBIN_KEY;

// const JSONBIN_API_KEY = import.meta.env.VITE_JSONBIN_API_KEY
// const JSONBIN_API_URL = import.meta.env.VITE_JSONBIN_API_URL
// const JSONBIN_MASTER_API_KEY = import.meta.env.VITE_JSONBIN_MASTER_API_KEY


const API_URL = import.meta.env.PROD ? 'https://quizter-web.vercel.app/' : 'http://localhost:5173/'

// const API_URL = import.meta.env.PROD ? JSONBIN_API_URL : 'http://localhost:5173/'
// const API_URL = JSONBIN_API_URL

export const useQuestionStore = create<State>()(persist((set, get) => {
    
    return {
        questions: [],
        loading: true,
        error: null,
        currentQuestion: 0,
        showResults: false,


        fetchQuestions: async (limit: number) => {
            const res = await fetch(`${API_URL}/data.json`)
            if (!res.ok) {
                throw new Error('Error al obtener preguntas desde JSONBin')
            }
            const json = await res.json()
            const data = json

            // ////////////////////////
            
        //    const response = await fetch (`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        //         headers: {
        //             "X-Master-Key": API_KEY,
        //             "Content-Type": "application/json"
        //         }
        //     })

        //     if (!response.ok) {
        //         throw new Error(`Error al obtener preguntas: ${response.statusText}`)
        //     }

        //     const json = await response.json()
        //     const data = json?.record

            //  ///////////////////////

            const questions =data.sort(() => Math.random() - 0.5).slice(0,limit)
            
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
            //cambiar esta informacion en la copia de la pregunta
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            //actualizamos el estado
            set({questions: newQuestions})

            return newQuestions[questionIndex]

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

        showResultsDisplay: () => {
            set({ showResults: true })
        },

        reset: () => {
            set({ currentQuestion: 0, questions:[], showResults:false })
        }
    }
}, {
    name: 'questions'
}))