import { Link, useParams } from 'react-router-dom'
import AccountNav from '../accountNav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { IPlaces } from '../interface/IPlaces'

function PlacesPages() {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data)
        })
    }, [])


    return (
        <>
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary py-2 px-6 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add New Place
                </Link>
            </div>
            <div className='mt-4'>
                {places.length > 0 && places.map((place: IPlaces) => (
                    <Link
                        to={'/account/places/' + place._id}
                        className='flex cursor-pointer gap-4 mb-1 bg-gray-100 p-4 rounded-2xl text-black shadow-md hover:bg-gray-200 transition'
                    >
                        <div className='flex w-32 h-32 bg-gray-300 flex-shrink-0 overflow-hidden rounded-lg'>
                            {place.photos.length > 0 && (
                                <img src={'http://localhost:4000/uploads/' + place.photos[0]} alt='' className='w-full h-full object-cover' />
                            )}
                        </div>
                        <div className='flex-grow'>
                            <h2 className='text-lg font-semibold text-gray-800'>{place.title}</h2>
                            <p className='text-sm text-gray-600 mt-1'>{place.description.length > 500 ? place.description.slice(0, 500) + "..." : place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </>
    )
}

export default PlacesPages