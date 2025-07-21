// import { IconButton, Stack } from "@mui/material"
import { IconButton, Stack, } from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuestionStore } from "../store/questions"
import { QuestionCard } from "./atoms/QuestionCard"
import { Footer } from "./Footer";



export const Game = () => {
    const questions = useQuestionStore(state => state.questions)
    const currentQuestion = useQuestionStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionStore(state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionStore(state => state.goPreviousQuestion)
    
    const questionInfo = questions[currentQuestion]

  return (
    <> 
        <Stack direction='row' gap={2} alignItems={'center'} justifyContent={'center'} sx={{ marginBottom: 2 }}>
            <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
                <ArrowBackIosIcon/>
            </IconButton>

            {currentQuestion + 1}  / { questions.length}

            <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
                <ArrowForwardIosIcon/>
            </IconButton>
        </Stack>
        <QuestionCard info={questionInfo} />  
        <Footer/>
    </>
  )
}
