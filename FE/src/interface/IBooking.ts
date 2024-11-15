import { IPlaces } from "./IPlaces";

export interface IBooking {
    _id: string,
    place: IPlaces,
    checkIn: string,
    checkOut: string,
    name: string,
    phone: string,
    price: number,
}