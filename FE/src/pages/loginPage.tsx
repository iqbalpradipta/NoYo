import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../userContext'

function LoginPage() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [redirect, setRedirect] = useState<boolean>(false)
    const { setUser } = useContext(UserContext)

    async function handleLoginSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            const { data } = await axios.post('/login', { email, password })
            setUser(data)
            alert("Login Success")
            setRedirect(true)
        } catch (error) {
            alert("Email or Password is wrong! please try again later")
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-32'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto text-black' onSubmit={handleLoginSubmit}>
                    <input type='email' placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-300'>
                        Don't have an account yet? <Link className='underline text text-primary' to={'/register'}>Register now!</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage