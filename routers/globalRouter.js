import express from "express"
import routes from "../routes"
import { videoHome, videoSearch } from "../controller/videoController"
import { join, login, logout } from "../controller/userController"

const globalRouter = express.Router()

globalRouter.get(routes.home, videoHome)
globalRouter.get(routes.search, videoSearch) 
globalRouter.get(routes.join, join)
globalRouter.get(routes.login, login)
globalRouter.get(routes.logout, logout)

export default globalRouter