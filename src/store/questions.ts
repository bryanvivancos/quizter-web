import {create} from 'zustand'
import {type Question} from './types'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'

interface State {
    questions: Question[]
    isLoading: boolean //get questions
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

const BIN_ID = import.meta.env.VITE_JSONBIN_ID;
const MASTER_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY;
const API_KEY = import.meta.env.VITE_JSONBIN_KEY;

const PROD_API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`
const API_URL = import.meta.env.PROD ? `${PROD_API_URL}` : 'http://localhost:5173/data.json'


export const useQuestionStore = create<State>()(persist((set, get) => {
    
    return {
        questions: [],
        isLoading: false,
        error: null,
        currentQuestion: 0,
        showResults: false,


        fetchQuestions: async (limit: number) => {
            // const res = await fetch(`${API_URL}/data.json`)
            // if (!res.ok) {
            //     throw new Error('Error al obtener preguntas desde JSONBin')
            // }
            // const json = await res.json()
            // const data = json

            // ////////////////////////
        //    let {isLoading} = get()
        //    isLoading = true

            set({isLoading:true, error:null})

            try {
                const response = await fetch (`${API_URL}`, {
                headers: {
                    "X-Master-Key": MASTER_KEY,
                    "X-Access-Key": API_KEY,
                    }
                })

                if (!response.ok) {
                    throw new Error(`Error al obtener preguntas: ${response.statusText}`)
                }

                const json = await response.json()
                const data = json?.record

                //  ///////////////////////

                const questions =data.sort(() => Math.random() - 0.5).slice(0,limit)
                
                set({questions})

            } catch (error:any) {
                    set({ error: error.message || "Error desconocido" })
            } finally {
                set({isLoading:false})
            }
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