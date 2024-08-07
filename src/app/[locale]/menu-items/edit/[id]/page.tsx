'use client'
import EditableImage from "@/components/EditableImage"
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/Tabs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { productApi } from "@/app/[locale]/api/product/product.api"
import { ISize } from "@/app/[locale]/api/product"
import Combobox, { IListItem } from "@/components/Combobox"
import { categoryApi } from "@/app/[locale]/api/categories/category.api"
import { ICategory } from "@/app/[locale]/api/categories" 
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps" 
import QuillTextEditor2 from '@/components/AppQuillTextEditor2'
import RightIcon from "@/components/icons/RightIcon"
import Link from "next/link" 
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from 'next-intl'
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
    
    const tc = useTranslations('CommonPage')
    const t = useTranslations('MenuItemPage')
      
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
                    success: tc('dataIsSaved'),
                    loading: tc('saving'),
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
        return tc('loaingUserInfo')
    }

    if (data) {
        if (!data.is_admin) {
            return tc('notAnAdmin')
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
                        isRequired={ true} 
                        name={ 'Category' } 
                        list={ category ?? [] } 
                        setSelectedItem={ setSelectedItem } 
                        defaultItem={ {id: categoryId, 'name':categoryName} } />
                    <div className="grow">
                        <label> {t('itemName')}  </label>
                        <input type="text" value={ name } onChange={ ev => setName(ev.target.value)}  />
                        <label> {t('description')} </label> 
                        <QuillTextEditor2 setValue={setDescription} value={description || ''} />
                        
                        <label>{t('basePrice')} </label>
                        <input type="number"  step="0.01" className="form-control" value={ basePrice } onChange={ ev => setBasePrice(Number(ev.target.value))}  />

                    </div>

                    <MenuItemPriceProps props={ sizes } setProps={ setSizes } labelText={ t('sizes')  } buttonText={ t('addNewSizes') }/>

                    <MenuItemPriceProps props={ extras } setProps={ setExtras } labelText={ t('extrasIngredients') } buttonText={ t('addNewExtras') }/>

                    <div>
                        <button type="submit"> { tc('saved') } </button>
                    </div> 
                </div>
            </form>
        </section>
    )
}