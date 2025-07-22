import { Button } from "@mui/material"
import { useQuestionStore } from "../../store/questions"

export const ResultsButton = () => {
    const showResultsDisplay = useQuestionStore(state => state.showResultsDisplay)

  return (
    <Button onClick={() => showResultsDisplay()} sx={{ width:'auto' }}>
        Resultados
    </Button>
  )
}
