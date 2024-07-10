'use client'
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import UserTabs from "@/components/layout/Tabs";
import { useSession } from "next-auth/react"; 
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast  from 'react-hot-toast';
import { memberApi } from "../api/members/member.api";
import EditableImage from "@/components/EditableImage";  

import { useRouter } from 'next/navigation';
import { useSessionData } from '@/customHook/useSessionData'

export default function ProfilePage() {
    const session = useSession();   
    const router = useRouter();
    
    const userEmail = session.data?.user?.email || ''; 
 
    const [ userName, setUserName ] = useState('' as string | null | undefined )  
    const [ saved, setSaved ] = useState(false)
    const [ isSaving, setIsSaving ] = useState(false)
    const { status } = session

    const [ isAdmin, setIsAdmin ] = useState(false)
    const [ image, setImage ] = useState();
    const [ avatarId, setAvatarId ] = useState('');
    

    useEffect( () => {

        const fetchData = async () => {
            if (status === 'authenticated') { 
                const session = await useSessionData()      // must use await this for make asynchoronous and useSessionData is get from a hook 
                if (session) { 
                
                    const { getProfile } = memberApi(session);
                    const res = await getProfile();  

                    if (res?.status === 200 && res?.data?.status === 200) {
                        const userData = res.data.params; 
                        session.user = userData 

                        const userName = userData?.name || userData?.email; 
                        const isAdmin = userData.is_admin  
                        const avatar = userData.avatar

                        setUserName( userName )
                        setIsAdmin( isAdmin ) 
                        setImage( avatar )  
                    }  
                } 
            }
        }
        fetchData()
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

            try   {
                // const session = await useSessionData()
                const { update } =  memberApi(session) 

                let res = null
                if (avatarId) {
                    res =  await update({
                        name:      userName, 
                        avatar_id: avatarId
                    })   
                } else {
                    res =  await update({
                        name:      userName,  
                    })   
                } 

                setIsSaving(false)  
 
                if (res?.status == 200 && res?.data?.status === 200) {
                    setSaved(true)   
                 
                    session.data.user = res?.data?.params  
                    resolve()  
                    return router.push('/profile')   // nothing happen
                }  else {
                    reject(new Error(res?.data))
                }
            } catch (error) {
                reject(error)
            }
        })

        await toast.promise(savePromise, {
            loading: 'Saving ...',
            success: 'Profile saved!',
            error: 'Error',
        })
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
                        <EditableImage link={ image } setLink={ setImage } setAvatarId={ setAvatarId }  /> 
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