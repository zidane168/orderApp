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
import QuillTextEditor from '@/components/AppQuillTextEditor'
import RightIcon from "@/components/icons/RightIcon"
import Link from "next/link"
import MenuItem from "@/components/menu/MenuItem"

export default function MenuItemsPage() {
  
    const { loading, data } = useProfile()
    const [ name, setName ] = useState()
    const [ description, setDescription ] = useState('')
    const [ basePrice, setBasePrice ] = useState()

    const [ image, setImage ] = useState<string>('') 
    const [ imageId, setImageId ] = useState<string>('')

    const [ sizes, setSizes ] = useState<ISize[]>([]); 
    const [ extras, setExtras ] = useState<ISize[]>([]); 

    const [ products, setProducts ] = useState<ICategory[]>();
    const [ selectedItem, setSelectedItem ] = useState<IListItem>({id: 0, name:'-- Please Select --'}); 
    
    
    function handleEditorChange(content: string) {
        setDescription(content)
    } 

    useEffect(() => {     
        fetchProducts()
    }, []) 
    

    async function fetchProducts() {
        const { getAll } = productApi()
        const res = await getAll();
     
        if (res.data.status === 200) {  
            setProducts(res.data.params)
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

            <div className="mt-8"> 
                <Link
                    className="flex justify-center gap-2 p-2 border-2 rounded-md button"
                    href={'/menu-items/new'}
                >    
                    Create new menu item 
                    <RightIcon />  

                </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 my-4">
            {
                products?.length > 0 && products.map( (product, index) => (
                    <MenuItem key={ index }  id={ product.id } path={ product.path }  name={ product.name } description={ product.description } basePrice={ product.base_price } isAddToCart={ false }/>
                ))
            }
            </div>
             
        </section>
    )
}