import app from "./app"

const PORT = 4000
 
const handleListening = () => console.log(`Listening on : ${PORT}`)

// 지정된 호스트 및 포트에서 연결을 바인드하고 청취합니다.
app.listen(PORT, handleListening) 