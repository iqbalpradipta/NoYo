import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPlaces } from '../interface/IPlaces';
import AddressLink from '../addressLink';
import PlaceGallery from '../placeGallery';
import BookingWidget from '../bookingWidget';

function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState<IPlaces | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [showExtraInfo, setShowExtraInfo] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
      console.log(response.data);
    });
  }, [id]);

  if (!place) return '';

  const handleToggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleToggleExtraInfo = () => {
    setShowExtraInfo(!showExtraInfo);
  };

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8 text-black">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            <p className={showDescription ? '' : 'line-clamp-3'}>{place.description}</p>
            <button
              onClick={handleToggleDescription}
              className="text-black font-bold underline"
            >
              {showDescription ? 'Tampilkan sedikit' : 'Tampilkan Lengkap'}
            </button>
          </div>
          Check-in: {place.checkIn}<br />
          Check-out: {place.checkOut}<br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className={showExtraInfo ? 'mb-4 mt-2 text-sm text-gray-700 leading-5' : 'mb-4 mt-2 text-sm text-gray-700 leading-5 line-clamp-3'}>
          {place.extraInfo}
        </div>
        <button
          onClick={handleToggleExtraInfo}
          className="text-black font-bold underline"
        >
          {showExtraInfo ? 'Tampilkan sedikit' : 'Tampilkan lengkap'}
        </button>
      </div>
    </div>
  );
}

export default PlacePage;
