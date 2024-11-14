import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './model/user'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import download from 'image-downloader'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

import PlaceModel from './model/place'

import 'dotenv/config'



const app = express()
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = '$(#hjifds09uwqrjoijfxoizjas0d9()*#)8942w'
const port = 4000

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads/'))
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

app.post('/upload-by-link', async (req: Request, res: Response) => {
    const {link} = req.body
    const newName = 'photo' + Date.now() + '.jpg'
    await download.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    })

    res.json(newName)
})

const photoMiddleware = multer({dest: __dirname + '/uploads/'})
app.post('/upload', photoMiddleware.array('photos', 100) ,async (req: Request, res: Response) => {
    const uploadFiles = []
    if (Array.isArray(req.files)) {
        for (let i = 0; i < req.files.length; i++) {
            const { path: filePath, originalname } = req.files[i] as Express.Multer.File;
            const parts = originalname.split('.')
            const ext = parts[parts.length - 1]
            const newPath = filePath + '.' + ext
            fs.renameSync(filePath, newPath)
            const filename = path.basename(newPath);
            uploadFiles.push(filename)
        }
    }
    res.json(uploadFiles);
})

app.post('/places', (req: Request, res: Response) => {
    const {token} = req.cookies;
    const {title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body
    jwt.verify(token, jwtSecret, {}, async (err, userData: any) => {
        if(err) throw err;
        const resPlaces = await PlaceModel.create({
            owner: userData.id, 
            title, address, photos, description, perks, 
            extraInfo, checkIn, checkOut, maxGuests, price         
        })
        res.json(resPlaces)
    })
})

app.get('/user-places', (req: Request, res: Response) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData: any) => {
        if(err) throw err;
        const {id} = userData;
        res.json( await PlaceModel.find({owner: id}).sort({ _id: -1 }) )
    })
})

app.get('/places/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    const place = await PlaceModel.findById(id);
    res.json(place);
})

app.put('/places', async (req: Request, res: Response) => {
    const {token} = req.cookies;
    const {id, title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body
    jwt.verify(token, jwtSecret, {}, async (err, userData: any) => {
        const resData = await PlaceModel.findById(id)
        if(userData.id === resData?.owner?.toString()) {
            resData?.set({
                title, address, photos, description, perks, 
                extraInfo, checkIn, checkOut, maxGuests, price
            })
            await resData?.save()
            res.json('Success update data')
        }
    })
})

app.get('/places', async (req: Request, res: Response) => {
    res.json(await PlaceModel.find().sort({ _id: -1 }))
})

app.listen(port, () => {
    console.log(`server running at ${port}`)
})