import React, { ReactHTMLElement } from "react"
import toast from "react-hot-toast"
import Image from 'next/image'
 
import { useSessionData } from "@/customHook/useSessionData";
import { memberApi } from "@/app/api/members/member.api";

interface IEditableImage {
    link: string,
    setLink: React.Dispatch<React.SetStateAction<string>>
    setAvatarId: React.Dispatch<React.SetStateAction<string>>
}

export default function EditableImage( {link, setLink, setAvatarId} : IEditableImage ) {   

    async function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {  
      
        const files = ev.target.files;
        if (files?.length > 0) {
            
            let message = "";  
 
            const session = await useSessionData()
            const { uploadImage } = memberApi(session)

            const uploadPromise = uploadImage(files[0]).then((result: any) => {
                console.log(result);
                console.log(' ------> ')
                if (result.data.status == 200) { 
 
                    console.log(result?.data?.params?.path)
                    setLink(result?.data?.params?.path)
                    setAvatarId(result?.data?.params.id)
                } else {
                    message = result.data.message
                    throw new Error(message)
                } 
            })
                    
            await toast.promise(uploadPromise, {
                loading: 'Uploading ...',
                success: 'Upload complete',
                error: message,
            }) 
        }  
     
    }
   
    return (
        <>
            { link && (
                <Image className="w-full h-full mb-1 rounded-lg" src={ link } width={ 100 } height={ 100 } alt={'avatar'} /> 
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