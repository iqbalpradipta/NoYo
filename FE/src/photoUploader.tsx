import axios from 'axios'
import React, { useState } from 'react'
import { IPhoto } from './interface/IPhoto'

function PhotoUploader({photo, onChange}: IPhoto) {
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

    return (
        <>
            <div className='flex gap-2'>
                <input type="text" value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} placeholder='add using link ....jpg' />
                <button onClick={addedPhotoByLink} className='bg-gray-200 grpw px-4 rounded-2xl text-black'>Add&nbsp;Photo</button>
            </div>
            <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                {photo?.length > 0 && photo.map((link: string) => (
                    <div className='h-32 flex' key={link}>
                        <img className="rounded-2xl w-full object-cover" src={`http://localhost:4000/uploads/${link}`} alt={link} />
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