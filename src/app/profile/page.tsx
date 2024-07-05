'use client'
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import UserTabs from "@/components/layout/Tabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast  from 'react-hot-toast';
import memberApi from "../api/members/member.api";
import EditableImage from "@/components/EditableImage";

export default function ProfilePage() {
    const session = useSession(); 

    // console.log (' ------------> ')
    // console.log (session)
    // console.log (' ------------> ')

    const userEmail = session.data?.user?.email || '';
    const userImage = session.data?.user?.avatar || '';
 
    const [ userName, setUserName ] = useState('' as string | null | undefined )  
    const [ saved, setSaved ] = useState(false)
    const [ isSaving, setIsSaving ] = useState(false)
    const { status } = session

    const [ isAdmin, setIsAdmin ] = useState(false)
    const [ image, setImage ] = useState();

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName( session?.data?.user?.name )
            setIsAdmin( session?.data?.user?.is_admin ) 
            setImage( session?.data?.user?.avatar )
            // call api here;
        }
    }, [session, status])

    if (status === 'loading') {
        return 'Loading ...'
    }

    if (status === 'unauthenticated') {
        return redirect('/login')
    }

    async function handleProfileInfoUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSaved(false)
        setIsSaving(true)  
        
        const savePromise = new Promise(async(resolve, reject) => { 
            const response = await fetch('api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: userName})
            })
    
            const { ok } = response
    
            setIsSaving(false)
            if ( ok ) {
                setSaved(true)
                resolve()
            } else {
                reject()
            }
        })

        await toast.promise(savePromise, {
            loading: 'Saving ...',
            success: 'Profile saved!',
            error: 'Error',
        })
    } 

    // async function handleFileChange(e: React.FormEvent<HTMLFormElement>) {

    //     // toast( JSON.stringify(e?.target?.files) )
    //     const files = e?.target?.files;  
    //     if (files?.length > 0) {
    //         const formData = new FormData()
    //         formData.append('file', files[0])

    //        // toast( JSON.stringify(files[0]) )

    //         // toast('Uploading image:',  );
    //        toast('Uploading image:', formData.get('file'));
    //         await memberApi.uploadImage(formData).then((result) => {
    //             if (result.status == 200) { 
    //                // toast (JSON.stringify(result))
    //               //  toast("upload succeed")
    //             } else {
    //                // toast("upload failed")
    //             }
    //         })
    //     } 
        
    //     // console.log(e);
    //     // const files = e?.target?.files;
    //     // toast('Uploading ...')
    //     // if (files?.length > 0) {
    //     //     const data = new FormData
    //     //     data.set('file', files[0])
    //     //     await fetch('/api/upload', {
    //     //         method: 'POST',
    //     //         body: data,
    //     //         // headers: {'Content-Type': 'multipart/form-data'}
    //     //     })
    //     // } 
    // }

    return ( 
        <section className="my-8">
            <UserTabs isAdmin={ isAdmin } />

            <div className='max-w-lg p-4 mx-auto border'>

                {saved && (
                    <SuccessBox> Profile saved </SuccessBox>
                )}

                {isSaving && (
                   <InfoBox > Saving ... </InfoBox>
                )}
                
                <div className="flex items-center gap-4 mt-2">
                    <div className="p-4 bg-gray-600 rounded-md">
                        <EditableImage link={ image } setLink={ setImage } /> 
                    </div>
                    <form className="grow" onSubmit={ handleProfileInfoUpdate }>
                        <input type="text"  value= { userName }  onChange={ e => setUserName(e.target.value) }/>
                        <input type="email" disabled={ true }  value= { userEmail }  />
                        <button type="submit"> Save </button>
                    </form>
                </div>
            </div>
        </section>  
    )
}