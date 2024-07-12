'use client'
import EditableImage from "@/components/EditableImage"
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/Tabs"
import { useState } from "react"
import toast from "react-hot-toast"
import { productApi } from "../api/product/product.api"

export default function MenuItemsPage() {

    const { loading, data } = useProfile()
    const [ name, setName ] = useState()
    const [ description, setDescription ] = useState()
    const [ basePrice, setBasePrice ] = useState()

    const [ image, setImage ] = useState<string>('') 
    const [ imageId, setImageId ] = useState<string>('')

    async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {

        ev.preventDefault() 
        const savingPromise = new Promise(async (resolve, reject) => {
            // const response = await fetch('/api/menu-items', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         data
            //     }), 
            //     headers: { 'Content-Type': 'application/json', }
            // })
            // if ( response.ok ) {
            //     resolve() 
            // } else {
            //     reject();
            // }

            const { create } = productApi(); 
            const response = await create({
                name: name,
                description: description,
                base_rice: basePrice,
                image_id: image, 
            })
        }) 

        await toast.promise(savingPromise, {
            success: 'Data is saved',
            loading: 'Saving',
            error: 'Error',
        })
        
    }

    if (loading) {
        return 'Loading user info ...'
    }

    if (!data.is_admin) {
        return 'Not an admin ...'
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={ true } />
            <form className="max-w-md mx-auto mt-8" onSubmit={ handleSubmit }>
                <div className="grid items-start gap-4"> 
                    <div className="grid items-start gap-4" style={{ gridTemplateColumns: '.3fr, .7fr'}}>
                        <div> 
                            <EditableImage link={ image } setLink={ setImage } setAvatarId={ setImageId } typeUpload={ 2 } /> 
                        </div>
                    </div>
                    <div className="grow">
                        <label> Item name </label>
                        <input type="text" value={ name } onChange={ ev => setName(ev.target.value)}  />
                        <label> Description </label>
                        <input type="text" value={ description } onChange={ ev => setDescription(ev.target.value)}  />
                        <label> Base price </label>
                        <input type="text" value={ basePrice } onChange={ ev => setBasePrice(ev.target.value)}  />

                        <button type="submit"> Save </button>
                    </div> 
                </div>
            </form>
        </section>
    )
}