'use client' 
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/Tabs"
import { useEffect, useState } from "react" 
import { productApi } from "@/app/[locale]/api/product/product.api"  
import RightIcon from "@/components/icons/RightIcon"
import Link from "next/link"
import MenuItem from "@/components/menu/MenuItem" 
import { IProduct } from "@/app/[locale]/api/product"
import { useTranslations } from 'next-intl';

export default function MenuItemsPage() {

    const { loading, data } = useProfile()  
    const [ products, setProducts ] = useState<IProduct[]>();  

    const t = useTranslations('MenuItemPage')
    const tc = useTranslations('CommonPage')

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
        return tc('loadingUserInfo')
    }

    if (data && !data.is_admin) {
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
                    { t('createNewMenuItem') }
                    <RightIcon />  

                </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 my-4">
            {
                products && products?.length > 0 && products.map( (product, index) => (
                    <MenuItem  
                        key={ index } id={ product.id ? product.id : 0 } path={ product.image ?? ''}  name={ product.name } description={ product.description ?? '' } basePrice={ product.base_price ? product.base_price : 0} isAddToCart={ false }/>
                ))
            }
            </div>
             
        </section>
    )
}