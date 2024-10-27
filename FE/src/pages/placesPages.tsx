import React, { ChangeEvent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../perks'
import axios from 'axios'

function PlacesPages() {
    const { action } = useParams()
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [photo, setPhoto] = useState<string[]>([])
    const [photoLink, setPhotoLink] = useState("")
    const [description, setDescription] = useState("")
    const [perks, setPerks] = useState<string[]>([])
    const [extraInfo, setExtraInfo] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [maxGuests, setMaxGuests] = useState(1)

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

    const addedPhotoByLink = async (e: React.FormEvent) => {
        e.preventDefault()
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        setPhoto(prev => {
            return [...prev, filename]
        });
        setPhotoLink("")
    }

    const uploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const files =  e.target.files
        if (files && files.length > 0) {
            const data = new FormData();
            for (let i = 0; i < files.length; i++) {
                data.append('photos', files[i]);
            }
    
            axios.post('/upload', data, {
                headers: {'Content-type': 'multipart/form-data'}
            }).then(response => {
                const {data: filenames} = response
                setPhoto(prev => {
                    return [...prev, ...filenames]
                });
            })
        }
    }


    return (
        <>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add New Place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'title for your place, should be short and catchy as in advertisment')}
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title, for example: Kost Jaya indah taman anggrek' />
                        {preInput('Address', 'address to this place')}
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='address' />
                        {preInput('Photo', 'more = better')}
                        <div className='flex gap-2'>
                            <input type="text" value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} placeholder='add using link ....jpg' />
                            <button onClick={addedPhotoByLink} className='bg-gray-200 grpw px-4 rounded-2xl text-black'>Add&nbsp;Photo</button>
                        </div>
                        <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            {photo.length > 0 && photo.map((link) => (
                                <div className='h-32 flex'>
                                    <img className="rounded-2xl w-full object-cover" src={`http://localhost:4000/uploads/${link}`} alt={link} />
                                </div>
                            ))}
                            <label className='h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-400'>
                                <input type='file' className='hidden' onChange={uploadPhoto} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                                Upload
                            </label>
                        </div>
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
            )}
        </>
    )
}

export default PlacesPages