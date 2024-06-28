'use client'
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/Tabs"
import { ReactHTMLElement, useEffect, useState } from "react"
import toast from "react-hot-toast";

export default function Categories(): any {

    const { loading: profileLoading , data: profileData } = useProfile(); // tra
    const [ newCategoryName, setNewCategoryName ] = useState<string>('')

    if (profileLoading) {
        return "Loading user info ..."
    }

    if (!profileData.admin) {
        return 'Not an admin';
    }

    async function handleNewCategorySubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        const creationPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/categories', {
                body: JSON.stringify({ name: newCategoryName }),
                method: 'POST',
                headers: { 'content-type': 'application/json' }, 
            })

            if (response.ok) resolve()
            else reject() 
        })

        await toast.promise(creationPromise, {
            loading: 'Creating your new category ...',
            error: 'Error created,',
            success: 'Category created',
        })
      
    }
    
    return (
        <section className="max-w-lg mx-auto mt-8"> 
            <UserTabs isAdmin={ true } />
            
            <form className="mt-8" onSubmit={ handleNewCategorySubmit }>
                <div className="flex items-end gap-2">
                    <div className="grow">
                        <label>New Category Name </label>
                        <input type="text" value={ newCategoryName } onChange={ ev => setNewCategoryName(ev.target.value) }/>
                    </div>
                    <div  className="pb-2">
                        <button type="submit" > Create </button>
                    </div>
                </div>
                
            </form>
        </section>
    )
}