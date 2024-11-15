import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AddressLink from '../addressLink';
import BookingDates from '../bookingDates';
import PlaceGallery from '../placeGallery';
import { IBooking } from '../interface/IBooking';

function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState<IBooking | null>(null);
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }: IBooking) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            });
        }
    }, [id]);

    if (!booking) {
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between text-black">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information:</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Total price</div>
                    <div className="text-3xl">{booking.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace('IDR', '')}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    );
}

export default BookingPage