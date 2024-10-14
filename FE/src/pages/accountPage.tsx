import React, { useContext, useState } from 'react'
import { UserContext } from '../userContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'

function AccountPage() {
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

    function linkClasses(type: string) {
        let classes = 'py-2 px-6'

        if (type === subpage) {
            classes += ' bg-primary rounded-full'
        }

        return classes
    }

    if(ready && !user && !redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <>
            <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
                <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Booking</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My Accomodations</Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user?.name} ({user?.email})<br />
                    <button onClick={logout} className='primary max-sm mt-2'>Logout</button>
                </div>
            )}
        </>
    )
}

export default AccountPage