import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { type Question as QuestionType } from "../../store/types"
import { useQuestionStore } from "../../store/questions"
import { QuestionAnswerInfo } from "./QuestionAnswerInfo"


const getBackgroudColor = (info:QuestionType, index: number) =>{
    const { userSelectedAnswer, correctAnswer } = info

    //usuario no ha seleccionado nada todavia
    if (userSelectedAnswer == null) return 'transparent'
    // si ya selecciono pero la solución es incorrecta
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    // si esta es la solución correcta
    if (index === correctAnswer) return 'green'
    // si esta es la selección del usuario pero no es correcta
    if (index === userSelectedAnswer) return 'red'
    // si no es ninguna de las anteriores
    return 'transparent'
}


export const QuestionCard = ({info}: {info: QuestionType}) => {
    const selectedAnswer = useQuestionStore(state => state.selectedAnswer)

    const createHandleClick = (answerIndex: number) => () => {
        selectedAnswer(info.id, answerIndex)
    }

  return (
    <>
    <Card variant="outlined" sx={{ bgcolor:'#222', textAlign: 'left' }}>
        <Typography variant="h5" sx={{ p:4 }}>
            {info.question}
        </Typography>

        <List sx={{ bgcolor: '#333' }} disablePadding>
            {info.answers.map((answerItem, index) =>
                <ListItem key={index} disablePadding divider>
                    <ListItemButton 
                        //deshabilita si ya se selecciono respuesta
                        disabled={info.userSelectedAnswer != null}
                        //se ejecuta funcion al  seleccionar respuesta
                        onClick={createHandleClick(index)}
                        // se coloca fondo verde o rojo a la respuesta seleccionada dependiendo si es True o False
                        sx={{
                            backgroundColor: getBackgroudColor(info,index)
                        }}
                        >
                        <ListItemText primary={answerItem}sx={{ textAlign: 'center' }}/>
                    </ListItemButton>
                </ListItem>
            )}
        </List>
    </Card>
    
    {/* {console.log(info.explanation, info.source)} */}
    
    {info.userSelectedAnswer != null && 
        <QuestionAnswerInfo answerInfo={info.explanation}/>
    }
    </>
  )
}
