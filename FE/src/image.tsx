import { ImageProps } from "./interface/IPhoto";

export default function Image({ src, ...rest }: ImageProps) {
    src = src && src.includes('https://')
        ? src
        : 'http://localhost:4000/uploads/' + src;
    return (
        <img {...rest} src={src} alt={''} />
    );
}