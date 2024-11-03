export interface IPlaces {
    _id: string,
    title: string,
    address: string,
    photos: [string],
    description: string,
    perks: [string],
    extraInfo: string,
    checkIn: number,
    checkOut: number,
    maxGuest: number
}