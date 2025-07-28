import { Button } from '@mui/material'
import { useQuestionStore } from '../../store/questions'

export const LIMIT_QUESTIONS = 10

export const Start = () => {
  const isLoading = useQuestionStore(state => state.isLoading)
  const fetchQuestions = useQuestionStore(state => state.fetchQuestions)
  
  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS)
  }


  return (
    <Button onClick={handleClick} loading={isLoading} variant='contained'> 
        {isLoading ? 'Cargando':'Empezar'}
    </Button>
  )
}
