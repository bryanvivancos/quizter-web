import { Stack } from "@mui/material"

export const QuestionAnswerInfo = ({answerInfo}:{answerInfo: string}) => {

  return (
    <Stack sx={{ marginTop: 2 }}>
        {answerInfo}
        {/* <a href={answerSource} target="_blank">{answerSource}</a> */}
    </Stack>
  )
}