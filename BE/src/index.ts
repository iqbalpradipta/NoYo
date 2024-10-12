import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './model/user'
import 'dotenv/config'


const app = express()
const bcryptSalt = bcrypt.genSaltSync(10)

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

mongoose.connect(`${process.env.MONGO_URL}`)

app.get('/test', (req: Request, res: Response) => {
    res.json('test ok')
})

app.post('/register', async (req: Request, res: Response) => {
    const {name, email, password} = req.body

    try {
        const userModel = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt)
        })  
        res.json(userModel);
    } catch (error) {
        res.status(422).json(error)
    }
})

app.listen(4000, () => {
    console.log(`server running at ${4000}`)
})