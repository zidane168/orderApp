'use client'
import EditableImage from "@/components/EditableImage"
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/Tabs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { productApi } from "../../api/product/product.api"
import { ISize } from "../../api/product"
import Combobox, { IListItem } from "@/components/Combobox"
import { categoryApi } from "../../api/categories/category.api"
import { ICategory } from "../../api/categories" 
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps" 
import QuillTextEditor from '@/components/AppQuillTextEditor'
import RightIcon from "@/components/icons/RightIcon"
import Link from "next/link"
import { useRouter } from "next/navigation"


// tao new thu muc cho duong dẫn menu-items/new/page.tsx

export default function MenuItemsNewPage() {
  
    const { push } = useRouter();
    const { loading, data } = useProfile()
    const [ name, setName ] = useState<string>()
    const [ description, setDescription ] = useState('')
    const [ basePrice, setBasePrice ] = useState<number>()

    const [ image, setImage ] = useState<string>('') 
    const [ imageId, setImageId ] = useState<string>('')

    const [ sizes, setSizes ] = useState<ISize[]>([]); 
    const [ extras, setExtras ] = useState<ISize[]>([]); 

    const [ category, setCategories ] = useState<ICategory[]>();
    const [ selectedItem, setSelectedItem ] = useState<IListItem>({id: 0, name:'-- Please Select --'}); 
    
    
    function handleEditorChange(content: string) {
        setDescription(content)
    } 

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

    async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {

        ev.preventDefault()  
        
        try { 
            const { create } = productApi();  
           
            const response = await create({
                name: name ?? '',
                description: description,
                base_price: basePrice ?? 0,
                category_id: selectedItem.id,
                image_id: Number(imageId), 
                product_sizes: sizes,
                product_extras: extras,
            })

            if (response.data.status == 200) {
                await toast.promise(Promise.resolve(), {
                    success: 'Data is saved',
                    loading: 'Saving',
                    error :'',
                })

                push('/menu-items') 
                
            } else { 
                await toast.promise(Promise.reject(response.data.message), {
                    success: ' ',
                    loading: ' ',
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

    if (data) {
        if (!data.is_admin) {
            return 'Not an admin ...'
        }
    } 

    return (
        <section className="mt-8">
            <UserTabs isAdmin={ true } /> 

            <div>
                <Link
                    href={ '/menu-items' }
                    className="flex items-center justify-center gap-2 p-2 border-2 rounded-md button"
                >
                    Show all Products
                    <RightIcon />
                </Link>
            </div>

            <form className="max-w-md mx-auto mt-8" onSubmit={ handleSubmit }>
                <div className="grid items-start gap-4"> 
                    <div className="grid items-start gap-4" style={{ gridTemplateColumns: '.3fr, .7fr'}}>
                        <div> 
                            <EditableImage link={ image } setLink={ setImage } setAvatarId={ setImageId } typeUpload={ 2 } /> 
                        </div>
                    </div>
                    <Combobox  
                        isRequired={ true } name={ 'Category' } list={ category } setSelectedItem={ setSelectedItem } />
                    <div className="grow">
                        <label> Item name <span className="text-primary">(*) </span></label>
                        <input type="text" value={ name } onChange={ ev => setName(ev.target.value)}  />
                        <label> Description <span className="text-primary">(*) </span> </label> 
                        <QuillTextEditor onChange={handleEditorChange} value={description || ''} />
                        
                        <label> Base price <span className="text-primary">(*) </span> </label>
                        <input type="number" className="form-control" value={ basePrice } onChange={ ev => setBasePrice(Number(ev.target.value))}  />

                    </div>

                    <MenuItemPriceProps props={ sizes } setProps={ setSizes } labelText={'Sizes'} buttonText={ 'Add new sizes'}/>

                    <MenuItemPriceProps props={ extras } setProps={ setExtras } labelText={'Extras Ingredients'} buttonText={ 'Add new extras'}/>

                    <div>
                        <button type="submit"> Save </button>
                    </div> 
                </div>
            </form>
        </section>
    )
}