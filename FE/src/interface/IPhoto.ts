export interface IPhoto {
    photos: string[];
    onChange: (photos: (prev: string[]) => string[]) => void;

}