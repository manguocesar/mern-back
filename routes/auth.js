import express from 'express'
import { register, login } from '../controllers/auth.js'

const router = express.Router()
const authRoute = router

authRoute.post("/register", register)
authRoute.post("/login", login)

export default authRoute