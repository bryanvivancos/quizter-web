import { useQuestionStore } from "../store/questions"

export const useQuestionsData = () => {
    const questions = useQuestionStore(state => state.questions)

    let correct = 0
    let incorrect = 0
    let unanswered = 0 
    let answerInfo= ''
    let answerSource= ''

    questions.forEach(question => {
        const {userSelectedAnswer, correctAnswer} = question
        if (userSelectedAnswer == null) unanswered++
        else if (userSelectedAnswer === correctAnswer) correct++
        else incorrect++

        answerInfo = question.explanation
        answerSource = question.source 
    })

    return {correct, incorrect,unanswered, answerInfo, answerSource}
}