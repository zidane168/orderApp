'use client'
import EditableImage from "@/components/EditableImage"
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/Tabs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { productApi } from "../../../api/product/product.api"
import { ISize } from "../../../api/product"
import Combobox, { IListItem } from "@/components/Combobox"
import { categoryApi } from "../../../api/categories/category.api"
import { ICategory } from "../../../api/categories" 
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps" 
import QuillTextEditor2 from '@/components/AppQuillTextEditor2'
import RightIcon from "@/components/icons/RightIcon"
import Link from "next/link" 
import { useParams, useRouter } from "next/navigation"

// tao new thu muc cho duong dẫn menu-items/new/page.tsx

export default function MenuItemsEditPage() {
  
    const params = useParams<{id: string}>() 

    let id: string = '';
    if (params) {
        id = params.id;
    } 

    const { push } = useRouter();

    const { loading, data } = useProfile()
    const [ name, setName ] = useState<string>('')
    const [ description, setDescription ] = useState('')
    const [ basePrice, setBasePrice ] = useState<number>()

    const [ categoryId, setCategoryId ] = useState<number>(0) 
    const [ categoryName, setCategoryName ] = useState<string>('') 
    
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
        fetchItem( );
    }, []) 

    async function fetchItem( ) {
        const { get } =  productApi();
        let idNum: number = Number(id)
        const res = await get({
            id: idNum
        });
        if (res.data.status === 200) {
            setName(res.data.params.name)
            setImage(res.data.params.path) 
            setCategoryId(res.data.params.category.id)
            setCategoryName(res.data.params.category.name)
            setDescription(res.data.params.description)
            setBasePrice(res.data.params.base_price)
            setSizes(res.data.params.product_sizes)
            setExtras(res.data.params.product_extras) 
            setSelectedItem({id: res.data.params.category.id, name:res.data.params.category.name})
        } 
    }
    

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
            const { update } = productApi(); 
            const response = await update({
                id: Number(id), 
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
                    success: 'Data is update',
                    loading: 'Saving',
                    error: '',
                })

                // redirect to menu-items page
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
                        isRequired={ true} 
                        name={ 'Category' } 
                        list={ category ?? [] } 
                        setSelectedItem={ setSelectedItem } 
                        defaultItem={ {id: categoryId, 'name':categoryName} } />
                    <div className="grow">
                        <label> Item name </label>
                        <input type="text" value={ name } onChange={ ev => setName(ev.target.value)}  />
                        <label> Description </label> 
                        <QuillTextEditor2 setValue={setDescription} value={description || ''} />
                        
                        <label> Base price </label>
                        <input type="number"  step="0.01" className="form-control" value={ basePrice } onChange={ ev => setBasePrice(Number(ev.target.value))}  />

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