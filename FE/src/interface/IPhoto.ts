export interface IPhoto {
    photo: string[];
    onChange: (photos: (prev: string[]) => string[]) => void;

}