import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,  // 몽고디비 디폴트 설정 세팅
    userFindAndModify: false
})

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB")
const handleError = () => console.log(`❌ Error on DB Connection:${error}`)

db.once("open", handleOpen)
db.on("error", handleError)
