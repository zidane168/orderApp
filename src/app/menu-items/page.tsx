'use client'
import EditableImage from "@/components/EditableImage"
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/Tabs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { productApi } from "../api/product/product.api"
import { ISize } from "../api/product"
import Combobox, { IListItem } from "@/components/Combobox"
import { categoryApi } from "../api/categories/category.api"
import { ICategory } from "../api/categories"
import { Button } from "@nextui-org/react"
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps"

export default function MenuItemsPage() {

    const { loading, data } = useProfile()
    const [ name, setName ] = useState()
    const [ description, setDescription ] = useState()
    const [ basePrice, setBasePrice ] = useState()

    const [ image, setImage ] = useState<string>('') 
    const [ imageId, setImageId ] = useState<string>('')

    const [ sizes, setSizes ] = useState<ISize[]>([]); 
    const [ extras, setExtras ] = useState<ISize[]>([]); 

    const [ category, setCategories ] = useState<ICategory[]>();
    const [ selectedItem, setSelectedItem ] = useState<IListItem>({id: 0, name:'-- Please Select --'});

    useEffect(() => {    
        fetchCategories()
    }, []) 
    

    async function fetchCategories() {
        const { getAll } = categoryApi()
        const res = await getAll();
     
        if (res.data.status === 200) {  
            setCategories(res.data.params)
        }
    }  

    async function setSizeName() {

    }

    async function setSizePrice() {
        
    }


    async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {

        ev.preventDefault()  
        
        try { 
            const { create } = productApi(); 
            const response = await create({
                name: name,
                description: description,
                base_price: basePrice,
                category_id: selectedItem.id,
                image_id: imageId, 
                product_sizes: sizes,
                product_extras: extras,
            })

            if (response.data.status == 200) {
                await toast.promise(Promise.resolve(), {
                    success: 'Data is saved',
                    loading: 'Saving',
                })
                
            } else { 
                await toast.promise(Promise.reject(response.data.message), {
                    error: response.data.message
                })
            }  
        } catch (error) {
            // console.error('An unexpected error occurred: ', error)
        }
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
                    <Combobox name={ 'Category' } list={ category } setSelectedItem={ setSelectedItem } />
                    <div className="grow">
                        <label> Item name </label>
                        <input type="text" value={ name } onChange={ ev => setName(ev.target.value)}  />
                        <label> Description </label>
                        <input type="text" value={ description } onChange={ ev => setDescription(ev.target.value)}  />
                        <label> Base price </label>
                        <input type="number" className="form-control" value={ basePrice } onChange={ ev => setBasePrice(ev.target.value)}  />

                    </div>

                    <MenuItemPriceProps props={ sizes } setProps={ setSizes } labelText={'Sizes'} buttonText={ 'Add new sizes'}/>

                    <MenuItemPriceProps props={ extras } setProps={ setExtras } labelText={'Extras Ingredients'} buttonText={ 'Add new extras'}/>

                    <div>
                        <Button type="submit"> Save </Button>
                    </div> 
                </div>
            </form>
        </section>
    )
}