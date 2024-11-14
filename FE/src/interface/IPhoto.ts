export interface IPhoto {
    photos: string[];
    onChange: (photos: (prev: string[]) => string[]) => void;
}


export interface ImageProps { 
    src: any; 
    [key: string]: any;
}