import React, { useContext, useState } from 'react'
import { UserContext } from '../userContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacesPages from './placesPages'
import AccountNav from '../accountNav'

function ProfilePage() {
    const [redirect, setRedirect] = useState<string>("")
    const { ready, user, setUser } = useContext(UserContext)
    let { subpage } = useParams()

    if (subpage == undefined) {
        subpage = 'profile'
    }

    async function logout() {
        await axios.post('/logout')
        setUser(null)
        setRedirect('/')
    }

    if (!ready) {
        return 'Loading...'
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

    if (ready && !user && !redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user?.name} ({user?.email})<br />
                    <button onClick={logout} className='primary max-sm mt-2'>Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPages />
            )}
        </>
    )
}

export default ProfilePage