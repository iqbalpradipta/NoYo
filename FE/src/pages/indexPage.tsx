import { Link } from "react-router-dom";
import Headers from "../headers";
import { useEffect, useState } from "react";
import axios from "axios";
import { IPlaces } from "../interface/IPlaces";

export default function IndexPage() {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data)
        })
    }, [])

    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map((place: IPlaces, index: number) => (
                <Link to={'/places/' + place._id}>
                    <div className='relative bg-gray-500 mb-2 rounded-2xl flex' key={index}>
                        {place.photos?.[0] && (
                            <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
                        )}
                    </div>
                    <h3 className="font-bold">
                        {place.address}
                    </h3>
                    <h2 className='text-sm text-gray-400'>
                        {place.title}
                    </h2>
                    <div className="mt-1">
                       <span className="font-bold">{place.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace('IDR', '')} / Malam</span> 
                    </div>
                </Link>
            ))}
        </div>
    )
}