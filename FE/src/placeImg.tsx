import React from 'react'
import Image from './image';
import { PlaceImgProps } from './interface/IPlaces';

function PlaceImg({ place, index = 0, className = 'object-cover' }: PlaceImgProps) {
    if (!place.photos?.length) return null;
    return (
        <Image className={className || 'object-cover'} src={place.photos[index]} alt="" />
    );
}


export default PlaceImg