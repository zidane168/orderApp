'use client';
import { useEffect, useState } from "react"
import { categoryApi } from "../api/categories/category.api"
import SectionHeaders from "@/components/layout/SectionHeaders";
import { ICategoryAndProducts } from "../api/product";
import MenuItem from "@/components/menu/MenuItem"; 

export default function MenuPage() {

    const [ items, setItems ] = useState<ICategoryAndProducts[]>([]);

    useEffect(() => {
       fetchFullCategoryAndProduct();
    }, [])  

    async function fetchFullCategoryAndProduct() {
        const { getFull } = categoryApi()
        const res = await getFull()
        if (res.data.status === 200) {
            setItems(res.data.params)
        }
    }

    return (
        <section className="mt-8">
            { 
                items?.length > 0 && items.map( (item, index) => (

                    <div key={ index } className="mt-8">
                        <div className="text-center">
                            <SectionHeaders mainHeader={ item.name } subHeader={''} />
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {
                                item.products.length > 0 && item.products.map( (p, index) => (

                                    <div key={ p.id }>
                                        <MenuItem  
                                            id={p.id ?? 0} 
                                            path={ p.image ?? '' } name={ p.name } 
                                            description={ p.description } basePrice={ p.base_price }
                                            sizes={ p.product_sizes }
                                            extras={ p.product_extras }
                                        />
                                    </div>
                                ))
                            }
                           
                        </div>
                    </div>
                ))
            }
        </section>
    )
}