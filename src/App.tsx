import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import { Start } from './components/atoms/Start'
import { useQuestionStore } from './store/questions'
import { LightBulb } from './components/atoms/LightBulb'
import { Game } from './components/Game'

function App() {
  const questions = useQuestionStore(state => state.questions)

  return (
    <main >
     <Container maxWidth="sm" sx={{ height:'100dvh', alignContent:'center', justifyItems:'center'}}>
      <Stack direction='row' gap={0} alignItems={'center'} justifyContent={'center'} sx={{ marginBottom: 2 }}>
        <LightBulb/>
        <Typography variant='h2' component='h1'>
          Quizter
        </Typography>
      </Stack>

      {questions.length === 0 && 
        <>
          <p>Veamos cuantas preguntas de Cultura General puedes responder...</p>
          <Start/>
        </>
      }
      {questions.length >0 && <Game/>}

     </Container>

    </main>
  )
}

export default App
