import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './model/user'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import 'dotenv/config'


const app = express()
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = '$(#hjifds09uwqrjoijfxoizjas0d9()*#)8942w'

app.use(express.json())
app.use(cookieParser())
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

app.post('/login', async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const UserModel = await User.findOne({email})

    if(UserModel) {
        const paswordCompare = bcrypt.compareSync(password, String(UserModel.password))
        if(paswordCompare) {
            jwt.sign({email: UserModel.email, id: UserModel._id}, jwtSecret, {}, (err, token) => {
                if(err) throw err
                res.cookie('token', token).json(UserModel)
            })
        } else {
            res.status(422).json('pass not ok')
        }
    } else {
        res.json('not found')
    }
}) 

app.get('/profile', (req: Request, res: Response) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData: any) => {
            if(err) throw err;
            const user = await User.findById(userData.id).lean()

            if(user) {
                const {name, email, _id} = user;
                res.json({name, email, _id})
            } else {
                res.status(422).json(null)
            }

        })
    } else {
        res.json(null)
    }
})

app.post('/logout', (req: Request, res: Response) => {
    res.cookie('token', '').json(true)
})

app.listen(4000, () => {
    console.log(`server running at ${4000}`)
})