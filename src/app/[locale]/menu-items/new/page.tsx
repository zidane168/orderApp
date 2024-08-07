'use client';
import EditableImage from "@/components/EditableImage"
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/Tabs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { productApi } from "@/app/[locale]/api/product/product.api"
import { IExtra, ISize } from "@/app/[locale]/api/product"
import Combobox, { IListItem } from "@/components/Combobox"
import { categoryApi } from "@/app/[locale]/api/categories/category.api"
import { ICategory } from "@/app/[locale]/api/categories" 
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps" 
import QuillTextEditor2 from '@/components/AppQuillTextEditor2'
import RightIcon from "@/components/icons/RightIcon"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from 'next-intl'

// tao new thu muc cho đường dẫn menu-items/new/page.tsx

export default function MenuItemsNewPage() {
  
    const { push } = useRouter();
    const { loading, data } = useProfile()
    const [ name, setName ] = useState<string>()
    const [ description, setDescription ] = useState<string>('')
    const [ basePrice, setBasePrice ] = useState<number>()

    const [ image, setImage ] = useState<string>('') 
    const [ imageId, setImageId ] = useState<string>('')

    const [ sizes, setSizes ] = useState<ISize[]>([]); 
    const [ extras, setExtras ] = useState<IExtra[]>([]); 

    const [ category, setCategories ] = useState<ICategory[]>();
    
    const tc = useTranslations('CommonPage')
    const t = useTranslations('MenuItemPage')

    const [ selectedItem, setSelectedItem ] = useState<IListItem>({id: 0, name: tc('pleaseSelect')}); 
     
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
                    success: tc('dataIsSaved'),
                    loading: tc('saving'),
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
           
        }
    }

    if (loading) {
        return tc('loadingUserInfo')
    }

    if (data) {
        if (!data.is_admin) {
            return tc('notAnAdmin')
        }
    } 

    const defaultItem = { id: 0, name: tc('pleaseSelect') } 

    return (
        <section className="mt-8">
            <UserTabs isAdmin={ true } /> 

            <div>
                <Link
                    href={ '/menu-items' }
                    className="flex items-center justify-center gap-2 p-2 border-2 rounded-md button"
                >
                    { t('showAllProducts') } 
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
                        defaultItem={ defaultItem }
                        isRequired={ true } 
                        name={ 'Category' } 
                        list={ category ?? [] } 
                        setSelectedItem={ setSelectedItem } />
                    <div className="grow">
                        <label> {t('itemName')} <span className="text-primary">(*) </span></label>
                        <input type="text" value={ name } onChange={ ev => setName(ev.target.value)}  />
                        <label> {t('description')} <span className="text-primary">(*) </span> </label> 
                        {/* <QuillTextEditor onChange={handleEditorChange} value={description || ''} /> */}
                        <QuillTextEditor2   value={description || ''} setValue={ setDescription } />
                        
                        <label> {t('basePrice')} <span className="text-primary">(*) </span> </label>
                        <input type="number" className="form-control" value={ basePrice } onChange={ ev => setBasePrice(Number(ev.target.value))}  />

                    </div>

                    <MenuItemPriceProps props={ sizes } setProps={ setSizes } labelText={ t('sizes') } buttonText={ t('addNewSizes') }/>

                    <MenuItemPriceProps props={ extras } setProps={ setExtras } labelText={ t('extrasIngredients') } buttonText={ t('addNewExtras')}/>

                    <div>
                        <button type="submit"> { tc('saved') } </button>
                    </div> 
                </div>
            </form> 
        </section>
    )
}