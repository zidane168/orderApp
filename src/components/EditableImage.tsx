import React, { ReactHTMLElement } from "react"
import toast from "react-hot-toast"

interface IEditableImage {
    link: string,
    setLink: React.Dispatch<React.SetStateAction<string>>
}

export default function EditableImage( {link, setLink} : IEditableImage ) {
 
    async function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {  
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]) 
    
            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data,
            }).then(response => {
                if (response.ok) {
                    return response.json().then(link => {
                        setLink(link)
                    })
                }
    
                throw new Error('Something went wrong')
            })
    
            await toast.promise(uploadPromise, {
                loading: 'Uploading ...',
                success: 'Upload complete',
                error: 'Upload failed',
            }) 
        }  
     
    }
   
    return (
        <>
            { link && (
                <Image className="w-full h-full mb-1 rounded-lg" src={ link } width={ 250 } height={ 250 } alt={'avatar'} /> 
            )}

            {
                !link && (
                    <div className="p-4 mb-1 text-center text-gray-500 bg-gray-200 rounded-lg">
                        No image
                    </div>
                )
            }

            <label>
                <input type="file" className="hidden" onChange={ handleFileChange } />
                <span className="block p-2 text-center border border-gray-300 rounded-lg cursor-pointer"> Edit </span>
            </label>
        </>
    )
}