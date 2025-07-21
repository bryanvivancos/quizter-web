import { Stack } from "@mui/material"
import { useQuestionsData } from "../hooks/useQuestionsData"

export const QuestionAnswerInfo = () => {

  const {answerInfo, answerSource} = useQuestionsData()

  return (
    <Stack sx={{ marginTop: 2 }}>
        {answerInfo}
        <a href={answerSource} target="_blank">{answerSource}</a>
    </Stack>
  )
}