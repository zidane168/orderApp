'use client';
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";
import { productApi } from "@/app/[locale]/api/product/product.api";
import toast from 'react-hot-toast'
import { IProduct } from "@/app/[locale]/api/product";
import { useTranslations } from 'next-intl'

export default function HomeMenu() {

    const th = useTranslations('HomePage')

    const [ products, setProducts ] = useState<IProduct[]>([])
    useEffect(() => {
        fetchProducts() 
    }, [])

    async function fetchProducts() {
        try {
            const { getAll } = productApi()
            const res = await getAll();  
            if (res.data.status === 200) {
                setProducts(res.data.params)
            
            } else {
                await toast.promise(Promise.reject(res.data.message), {
                    loading: '',
                    success: '',
                    error: res.data.message
                }) 
            }
 
        } catch (error) {
            
        } 
    }

    return (
        <section className="">
            <div className="absolute left-0 right-0 w-full">
                <div className="absolute -left-12 top-[-100px]">
                    <Image src={'/salat.png'} width={'182'}  height={'182'} alt="salad" objectFit={'contain'}/>
                </div>
                <div className="absolute right-0 w-48 h-48 top-[-100px] -z-10">
                    <Image src={'/salat.png'} layout={'fill'} alt="salad" objectFit={'contain'}/>
                </div>
            </div>
            <div className="mt-32 text-center"> 
              <SectionHeaders subHeader={ th('checkOut') } mainHeader={ th('ourBestSellers') } />
            </div>


            <div className="grid grid-cols-3 gap-4 my-4">
                {
                    products?.length > 0 && products.map( (product, index) => (
                        <MenuItem 
                            sizes={ product.product_sizes }
                            extras={ product.product_extras }
                            key={ index } path={ product.image ?? '' }  
                            id={ product.id ?? 0 }
                            name={ product.name } description={ product.description } basePrice={ product.base_price } />
                    ))
                } 
            </div>
        </section>
    )
}