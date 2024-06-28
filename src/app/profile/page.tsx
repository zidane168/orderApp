'use client'
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import UserTabs from "@/components/layout/Tabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast  from 'react-hot-toast';

export default function ProfilePage() {
    const session = useSession(); 
    const userEmail = session.data?.user?.email || '';
    const userImage = session.data?.user?.image || '';
 
    const [ userName, setUserName ] = useState('' as string | null | undefined )  
    const [ saved, setSaved ] = useState(false)
    const [ isSaving, setIsSaving ] = useState(false)
    const { status } = session

    const [ isAdmin, setIsAdmin ] = useState(false)

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName( session?.data?.user?.name )
            // setIsAdmin( session?.data?.user?.admin )
            setIsAdmin(true)
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

    async function handleFileCHange(e: React.FormEvent<HTMLFormElement>) {
        console.log(e);
        const files = e?.target?.files;
        toast('Uploading ...')
        if (files?.length > 0) {
            const data = new FormData
            data.set('file', files[0])
            await fetch('/api/upload', {
                method: 'POST',
                body: data,
                // headers: {'Content-Type': 'multipart/form-data'}
            })
        } 
    }

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
                        <Image src={ userImage } className="rounded-full" width={ 128 } height={ 128 } alt={'avatar'} />

                        <label>
                            <input type="file" className="hidden" onChange={ handleFileCHange }/>
                            <span className="flex justify-center p-1 mt-2 text-white border-2 rounded-md cursor-pointer"> Change avatar </span>
                        </label>
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