'use client'
import EditableImage from "@/components/EditableImage"
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/Tabs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { productApi } from "../api/product/product.api"
import { ISize } from "../api/product"
import DeleteIcon from "@/components/icons/DeleteIcon"
import Combobox, { IListItem } from "@/components/Combobox"
import { categoryApi } from "../api/categories/category.api"
import { ICategory } from "../api/categories"

export default function MenuItemsPage() {

    const { loading, data } = useProfile()
    const [ name, setName ] = useState()
    const [ description, setDescription ] = useState()
    const [ basePrice, setBasePrice ] = useState()

    const [ image, setImage ] = useState<string>('') 
    const [ imageId, setImageId ] = useState<string>('')

    const [ sizes, setSizes ] = useState<ISize[]>(); 
    const [ category, setCategories ] = useState<ICategory[]>();
    const [ selectedItem, setSelectedItem ] = useState<IListItem>({id: 0, name:'-- Please Select --'});

    useEffect(() => {   
        fetchSizes() 
        fetchCategories()
    }, [])

    async function fetchSizes() {
        const { getAllSize  } = productApi()
        const res = await getAllSize();
     
        if (res.data.status === 200) { 
            setSizes(res.data.params)
        }
    }  

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
        const savingPromise = new Promise(async (resolve, reject) => { 

            const { create } = productApi(); 
            const response = await create({
                name: name,
                description: description,
                base_price: basePrice,
                // category_id: 
                image_id: setImageId, 
            })

            if (response.data.status == 200) {
                resolve();
            } else {
                reject();
            } 
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
                    <Combobox name={ 'Category' } list={ category } selectedItem={ selectedItem } />
                    <div className="grow">
                        <label> Item name </label>
                        <input type="text" value={ name } onChange={ ev => setName(ev.target.value)}  />
                        <label> Description </label>
                        <input type="text" value={ description } onChange={ ev => setDescription(ev.target.value)}  />
                        <label> Base price </label>
                        <input type="text" value={ basePrice } onChange={ ev => setBasePrice(ev.target.value)}  />

                    </div>

                    <div className="p-2 mb-2 bg-gray-100 rounded-md">
                        <label> Sizes </label>      

                        { sizes?.length === 0 && <div> No sizes </div> }
                        { 
                        sizes?.length > 0 &&  
                            // sizes.map( (s, index) => {   // MUST return khi dấu {}

                            //     return (
                            //         <div  className="flex items-center justify-around gap-4" key={  index  } > 
                            //             <div className="flex items-center gap-2 grow">
                            //                 <input type="text" className="font-bold text-red-600" placeholder="Size name" value={ s.name } />
                            //                 <input type="number" className="p-2 rounded-md" placeholder="Extra price" value={ s.price } />
                            //             </div>
                            //             <div className="">
                            //                 <button className="transition bg-white border-none shadow-lg hover:cursor-pointer hover:scale-110"> 
                            //                     <DeleteIcon className="w-8 h-8"/>
                            //                 </button>
                            //             </div>
                            //         </div>
                            //     ) 
                            // })  
                            sizes.map( (s, index) =>    // NO NEED return khi dấu ()

                                 (
                                    <div  className="flex items-center justify-around gap-4" key={  index  } > 
                                        <div className="flex items-center gap-2 grow">
                                            <input type="text" className="font-bold text-red-600" 
                                                onChange={ setSizeName } 
                                                placeholder="Size name" value={ s.name } />
                                            <input type="number" className="p-2 rounded-md" 
                                                onChange={ setSizePrice } 
                                                placeholder="Extra price" value={ s.price } />
                                        </div>
                                        <div className="">
                                            <button className="transition bg-white border-none shadow-lg hover:cursor-pointer hover:scale-110"> 
                                                <DeleteIcon className="w-8 h-8"/>
                                            </button>
                                        </div>
                                    </div>
                                )  
                            )  
                        }
                        
                    </div>

                    <div>
                        <button type="submit"> Save </button>
                    </div> 
                </div>
            </form>
        </section>
    )
}