import React, { useEffect, useState } from 'react'
import Perks from '../perks'
import PhotoUploader from '../photoUploader'
import axios from 'axios'
import AccountNav from '../accountNav'
import { Navigate, useParams } from 'react-router-dom'

function PlacesFormPage() {
    const { id } = useParams()
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [photos, setPhotos] = useState<string[]>([])
    const [description, setDescription] = useState("")
    const [perks, setPerks] = useState<string[]>([])
    const [extraInfo, setExtraInfo] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [maxGuests, setMaxGuests] = useState(1)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then((response) => {
            const { data } = response
            setTitle(data.title)
            setAddress(data.address)
            setPhotos(data.photos || [])
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
        })
    }, [id])

    const inputHeader = (text: string) => {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        );
    }

    const inputDescription = (text: string) => {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        );
    }

    const preInput = (header: string, description: string) => {
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        );
    }

    const savePlace = async (e: React.FormEvent) => {
        e.preventDefault();
        const placeData = { title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests }
        if (id) {
            await axios.put('/places', {
                id,
                ...placeData
            })
            setRedirect(true)
        } else {
            await axios.post('/places', placeData)
            console.log(placeData)
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'title for your place, should be short and catchy as in advertisment')}
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title, for example: Kost Jaya indah taman anggrek' />
                {preInput('Address', 'address to this place')}
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='address' />
                {preInput('Photo', 'more = better')}
                <PhotoUploader photos={photos} onChange={setPhotos} />
                {preInput('Description', 'description of the place')}
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='description about your place' />
                {preInput('Perks', 'select all the perks your place')}
                <div className='grid mt-2  gap-2 grid-cols-2 md:grid-cols-4 lg:gris-cols-6'>
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {preInput('Extra Info', 'house rules, etc')}
                <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />
                {preInput('Check in/out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
                <div className='grid gap-2 sm:grid-cols-3'>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check in time</h3>
                        <input type="text" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} placeholder='14' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check out time</h3>
                        <input type="text" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} placeholder='12' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                        <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.valueAsNumber)} />
                    </div>
                </div>
                <button className='primary my-4'>Save</button>
            </form>
        </div>
    )
}

export default PlacesFormPage