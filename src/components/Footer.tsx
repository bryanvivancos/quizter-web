import { Button } from "@mui/material"
import { useQuestionsData } from "../hooks/useQuestionsData"
import { useQuestionStore } from "../store/questions"
import { ResultsButton } from "./atoms/ResultsButton"

export const Footer = () => {
    const {correct, incorrect, unanswered} = useQuestionsData()
    const reset = useQuestionStore(state => state.reset)

  return (
    <footer style={{ marginTop: '16px', paddingBottom:'16px' }}>
        <strong> {`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
        
        <div style={{ marginTop: '16px',display:'grid', justifyContent:'space-around' }}>
          {unanswered === 0 && <ResultsButton/>}  
          <Button onClick={() => reset()}>
              Empezar de nuevo
          </Button>
        </div>

    </footer>
  )
}
