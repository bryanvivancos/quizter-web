const BIN_ID = "<BIN_ID>"
const API_KEY = "<API_KEY>"

export const useGetQuestions = async (): Promise<any[]> => {

        const response = await fetch (`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: {
                "X-Master-Key": API_KEY,
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error(`Error al obtener preguntas: ${response.statusText}`)
        }

        const data = await response.json()

        return data.record
    }
