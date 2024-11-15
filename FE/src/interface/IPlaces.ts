import { IPhoto } from "./IPhoto";

export interface IPlaces {
    _id: string,
    title: string,
    address: string,
    photos: IPhoto[],
    description: string,
    perks: string[],
    extraInfo: string,
    checkIn: number,
    checkOut: number,
    maxGuests: number,
    price: number
}

export interface IPlace { 
    title: string; 
    photos: IPhoto[]; 
}

export interface PlaceImgProps {
    place: IPlace;
    index?: number;
    className?: string | null;
}