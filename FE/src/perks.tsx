import React from 'react'
import { IPerks } from './interface/IPerks'

function Perks({selected, onChange}: IPerks) {
    return (
        <>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer '>
                <input type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
                <span>Wi-Fi</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer '>
                <input type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 color-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17H16M8 17C8 18.1046 7.10457 19 6 19C4.89543 19 4 18.1046 4 17M8 17C8 15.8954 7.10457 15 6 15C4.89543 15 4 15.8954 4 17M16 17C16 18.1046 16.8954 19 18 19C19.1046 19 20 18.1046 20 17M16 17C16 15.8954 16.8954 15 18 15C19.1046 15 20 15.8954 20 17M10 5V11M4 11L4.33152 9.01088C4.56901 7.58593 4.68776 6.87345 5.0433 6.3388C5.35671 5.8675 5.79705 5.49447 6.31346 5.26281C6.8993 5 7.6216 5 9.06621 5H12.4311C13.3703 5 13.8399 5 14.2662 5.12945C14.6436 5.24406 14.9946 5.43194 15.2993 5.68236C15.6435 5.96523 15.904 6.35597 16.425 7.13744L19 11M4 17H3.6C3.03995 17 2.75992 17 2.54601 16.891C2.35785 16.7951 2.20487 16.6422 2.10899 16.454C2 16.2401 2 15.9601 2 15.4V14.2C2 13.0799 2 12.5198 2.21799 12.092C2.40973 11.7157 2.71569 11.4097 3.09202 11.218C3.51984 11 4.0799 11 5.2 11H17.2C17.9432 11 18.3148 11 18.6257 11.0492C20.3373 11.3203 21.6797 12.6627 21.9508 14.3743C22 14.6852 22 15.0568 22 15.8C22 15.9858 22 16.0787 21.9877 16.1564C21.9199 16.5843 21.5843 16.9199 21.1564 16.9877C21.0787 17 20.9858 17 20.8 17H20" />
                </svg>
                <span>Free parking spot</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer '>
                <input type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 color-white">
                    <path d="M2 15c1.67-.75 3.33-1.5 5-1.83V5a3 3 0 013-3c1.31 0 2.42.83 2.83 2H10a1 1 0 00-1 1v1h5V5a3 3 0 013-3c1.31 0 2.42.83 2.83 2H17a1 1 0 00-1 1v9.94c2-.32 4-1.94 6-1.94v2c-2.22 0-4.44 2-6.67 2-2.22 0-4.44-2-6.66-2-2.23 0-4.45 1-6.67 2v-2m12-7H9v2h5V8m0 4H9v1c1.67.16 3.33 1.31 5 1.79V12M2 19c2.22-1 4.44-2 6.67-2 2.22 0 4.44 2 6.66 2 2.23 0 4.45-2 6.67-2v2c-2.22 0-4.44 2-6.67 2-2.22 0-4.44-2-6.66-2-2.23 0-4.45 1-6.67 2v-2z" />
                </svg>
                <span>Pool</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer '>
                <input type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 color-white">
                    <path
                        fill="currentColor"
                        d="M20.274 9.869l-3.442-4.915 1.639-1.147 3.441 4.915-1.638 1.147zM18.39 12.409L16.67 9.95l-8.192 5.736 1.72 2.457-1.638 1.148-4.588-6.554 1.638-1.147 1.72 2.458 8.192-5.736-1.72-2.458 1.638-1.147 4.588 6.553-1.638 1.148zM20.765 7.083l1.638-1.147-1.147-1.638-1.638 1.147 1.147 1.638zM7.168 19.046l-3.442-4.915-1.638 1.147 3.441 4.915 1.639-1.147zM4.382 18.555l-1.638 1.147-1.147-1.638 1.638-1.147 1.147 1.638z"
                    />
                </svg>
                <span>Gym</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer '>
                <input type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
                <span>TV</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer '>
                <input type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path d="M5.33 12.77A4 4 0 113 5.13V5a4 4 0 015.71-3.62 3.5 3.5 0 016.26 1.66 2.5 2.5 0 012 2.08 4 4 0 11-2.7 7.49A5.02 5.02 0 0112 14.58V18l2 1v1H6v-1l2-1v-3l-2.67-2.23zM5 10l3 3v-3H5z" />
                </svg>
                <span>Park</span>
            </label>
        </>
    )
}

export default Perks