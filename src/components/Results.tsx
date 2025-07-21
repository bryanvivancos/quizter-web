import { Button, Card } from "@mui/material"
import { useQuestionsData } from "../hooks/useQuestionsData"
import { useQuestionStore } from "../store/questions"
import { LIMIT_QUESTIONS } from "./atoms/Start"

export const Results = () => {
    const {correct, incorrect} = useQuestionsData()
    const reset = useQuestionStore(state => state.reset)

  return (
    <>
    <Card variant='outlined' sx={{ bgcolor:'#222', textAlign: 'left', paddingX: 4, paddingY: 2}}>
        <h1>TUS RESULTADOS</h1>

        <strong>
            <p>✅ Correctas: {correct}</p>
            <p>❌ Incorrectas: {incorrect}</p>
        </strong>

        <p style={{textAlign:'center', width:'100%', fontWeight:'bolder'}}>{`PUNTAJE: ${correct*100 / LIMIT_QUESTIONS}%`}</p>

        
    </Card>
    <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>
            Empezar de nuevo
        </Button>
    </div>
    </>
  )
}
