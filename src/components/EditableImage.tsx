import React, { ReactHTMLElement } from "react"
import toast from "react-hot-toast"
import Image from 'next/image'
 
import { useSessionData } from "@/customHook/useSessionData";
import { memberApi } from "@/app/[locale]/api/members/member.api";
import { productApi } from "@/app/[locale]/api/product/product.api";
import { useTranslations } from "next-intl"
interface IEditableImage {
    link: string,
    setLink: React.Dispatch<React.SetStateAction<string>>
    setAvatarId: React.Dispatch<React.SetStateAction<string>>,
    typeUpload: number,
}

export default function EditableImage( {link, setLink, setAvatarId, typeUpload = 1} : IEditableImage ) {   
 
    const tc = useTranslations("CommonPage");
    
    async function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {  
 
        const files = ev.target.files; 
        if (files && files.length > 0) {
            
            let message = "";   
            let uploadPromise: Promise<void> | null = null;
            if (typeUpload == 1) {
                const { uploadImage2 } = memberApi( ) 
                uploadPromise = uploadImage2(files[0]).then((result: any) => { 
                    if (result.data.status == 200) {  
                        setLink(result?.data?.params?.path)
                        setAvatarId(result?.data?.params.id)
                    } else {
                        message = result.data.message
                        throw new Error(message)
                    } 
                }) 

            } else if (typeUpload == 2) {
                const { uploadImage } = productApi( ) 
                uploadPromise = uploadImage(files[0]).then((result: any) => { 
                    if (result.data.status == 200) {  
                        setLink(result?.data?.params?.path)
                        setAvatarId(result?.data?.params.id)
                    } else {
                        message = result.data.message
                        throw new Error(message)
                    } 
                }) 
            } 
                    
            if (uploadPromise) {
                await toast.promise(uploadPromise, {
                    loading: tc('uploading'),
                    success: tc('uploadCompleted'),
                    error: message,
                }) 
            } 
        }  
     
    }
   
    return (
        <>
            { link && (
                <Image priority={false}  className="w-full h-full mb-1 rounded-lg" src={ link } width={ 100 } height={ 100 } alt={'avatar'} /> 
            )}

            {
                !link && (
                    <div className="p-4 mb-1 text-center text-gray-500 bg-gray-200 rounded-lg">
                        { tc('noImage') }
                    </div>
                )
            }

            <label>
                <input type="file" className="hidden" onChange={ handleFileChange } />
                <span className="block p-2 text-center bg-white border border-gray-300 rounded-lg cursor-pointer">  { typeUpload == 1 ? tc('uploadAvatar')  : tc('uploadImage') }  </span>
            </label>
        </>
    )
}