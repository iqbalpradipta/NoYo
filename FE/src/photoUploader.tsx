import axios from 'axios'
import React, { useState } from 'react'
import { IPhoto } from './interface/IPhoto'

function PhotoUploader({ photos, onChange }: IPhoto) {
    const [photoLink, setPhotoLink] = useState<string>("")

    const addedPhotoByLink = async (e: React.FormEvent) => {
        e.preventDefault()
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        onChange((prev: string[] = []) => {
            return [...prev, filename]
        });
        setPhotoLink("")
    }

    const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const data = new FormData();
            for (let i = 0; i < files.length; i++) {
                data.append('photos', files[i]);
            }

            axios.post('/upload', data, {
                headers: { 'Content-type': 'multipart/form-data' }
            }).then(response => {
                const { data: filenames } = response
                onChange((prev: string[] = []) => {
                    return [...prev, ...filenames]
                });
            })
        }
    }

    const removePhoto = (e: React.MouseEvent<HTMLButtonElement>, filename: string) => {
        e.preventDefault()
        onChange((photos) => photos.filter((photo) => photo !== filename))
    }

    const selectAsMain = (e: React.MouseEvent<HTMLButtonElement>, filename: string) => {
        e.preventDefault()
        onChange((prev) => [filename, ...photos.filter(photo => photo !== filename)])
    }

    return (
        <>
            <div className='flex gap-2'>
                <input type="text" value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} placeholder='add using link ....jpg' />
                <button onClick={addedPhotoByLink} className='bg-gray-200 grpw px-4 rounded-2xl text-black'>Add&nbsp;Photo</button>
            </div>
            <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                {photos?.length > 0 && photos.map((link: string) => (
                    <div className='h-32 flex relative' key={link}>
                        <img className="rounded-2xl w-full object-cover" src={`http://localhost:4000/uploads/${link}`} alt={link} />
                        <button onClick={(e) => removePhoto(e, link)} className="cursor-pointer absolute text-white bg-black py-2 px-3 bg-opacity-50 rounded-2xl bottom-1 right-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                        <button onClick={(e) => selectAsMain(e, link)} className="cursor-pointer absolute text-white bg-black py-2 px-3 bg-opacity-50 rounded-2xl bottom-1 left-1">
                            {link === photos[0] && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFB700" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                            )}
                            {link !== photos[0] && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5" />
                                </svg>
                            )}
                        </button>
                    </div>
                ))}
                <label className='h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-400'>
                    <input type='file' className='hidden' onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                    Upload
                </label>
            </div>
        </>
    )
}

export default PhotoUploader