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
 
    const [ userName, setUserName ] = useState<string>('')  
    const [ saved, setSaved ] = useState(false)
    const [ isSaving, setIsSaving ] = useState(false)
    const { status } = session

    const [ isAdmin, setIsAdmin ] = useState(false)
    const [ image, setImage ] = useState<string>('');
    const [ avatarId, setAvatarId ] = useState('');
    const [ address, setAddress ] = useState<string>('')

    const [ phone, setPhone ] = useState<string>('')
    const [ country, setCountry ] = useState<string>('')
    const [ postalCode, setPostalCode ] = useState<string>('')
    const [ city, setCity ] = useState<string>('')
    
    

    useEffect( () => {

        const fetchData = async () => {
            if (status === 'authenticated') { 
                const session = await useSessionData()      // must use await this for make asynchoronous and useSessionData is get from a hook 
                if (session) { 
                
                    try {
                        const { getProfile } = memberApi();
                        const res = await getProfile();  
    
                        if (res?.status === 200 && res?.data?.status === 200) {
                            const userData = res.data.params; 
                            session.user = userData 
    
                            const userName = userData?.name || userData?.email; 
                            const isAdmin = userData.is_admin  
                            const avatar = userData.avatar
                            const street_address = userData.street_address
                            const country = userData.country
                            const city = userData.city
                            const postalCode = userData.postal_code
                            const phone = userData.phone
    
                            setUserName( userName )
                            setIsAdmin( isAdmin ) 
                            setImage( avatar )  
                            setAddress( street_address )
                            setCountry( country )
                            setPhone( phone )
                            setPostalCode(postalCode)
                            setCity(city)
                        }  
                    } catch(error: any) {
                        toast.error(error.message)
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

        try   { 
            const { update } =  memberApi()  
             
            let obj = {
                name:      userName ?? '', 
                avatar_id: Number(avatarId) ?? null, 
                street_address: address ?? '',
                city: city ?? '',
                phone: phone ?? '',
                postal_code: postalCode ?? '',
                country: country ?? '',
            }
            
            if (avatarId) { 
                obj.avatar_id = Number(avatarId) ?? null    
            } 

            let res: any =  await update( obj )   

            setIsSaving(false)  

            if (res?.status == 200 && res?.data?.status === 200) {
                setSaved(true)   
                
                if (session.data) {
                    session.data.user = res.data.params  
                }
            
                await toast.promise(Promise.resolve(), {
                    loading: 'Saving ...',
                    success: 'Profile is saved!',
                    error: ' ',
                })
            
                return router.push('/profile')   // nothing happen
            }  else { 
                await toast.promise(Promise.reject(res?.data.message), {
                    loading: ' ',
                    success: ' ',
                    error: res?.data.message,
                })
            }
        } catch (error) {
             
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
                
                <div className="flex items-start gap-4 mt-2">
                    <div className="p-4 bg-gray-600 rounded-md">
                        <EditableImage 
                            link={ image } 
                            setLink={ setImage } 
                            setAvatarId={ setAvatarId } 
                            typeUpload={ 1 } /> 
                    </div>
                    <form className="grow" onSubmit={ handleProfileInfoUpdate }>
                        <div>
                            <label> Username </label>
                            <input type="text"  value= { userName  }  onChange={ e => setUserName(e.target.value) }/>
                        </div>
                        
                        <div>
                            <label> Email </label>
                            <input type="email" disabled={ true }  value= { userEmail }  />
                        </div>

                        <div>
                            <label> Address </label>
                            <input type="text"  
                                    value={ address } onChange={ e => setAddress(e.target.value) } /> 
                        </div>

                        <div>
                                <label> Phone Number </label>
                                <input type="text"  
                                        value={ phone } onChange={ e => setPhone(e.target.value) } /> 
                            </div>

                        <div>
                            <label> Country </label>
                            <input type="text"  
                                    value={ country } onChange={ e => setCountry(e.target.value) } /> 
                        </div>

                        <div className="flex gap-4">
                            <div>
                                <label> Postal code </label>
                                <input type="text"  
                                        value={ postalCode } onChange={ e => setPostalCode(e.target.value) } /> 
                            </div>
                            <div>
                                <label> City </label>
                                <input type="text"  
                                        value={ city } onChange={ e => setCity(e.target.value) } /> 
                            </div>
                        </div>

                        <button type="submit"> Save </button>
                    </form>
                </div>
            </div>
        </section>  
    )
}