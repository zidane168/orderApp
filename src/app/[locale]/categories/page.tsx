'use client'
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/Tabs" 
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { categoryApi } from "../api/categories/category.api";
import { ICategory } from "../api/categories/category.api.types"; 
import DeleteIcon from "@/components/icons/DeleteIcon";
import swal from "sweetalert"; 
import { useTranslations } from 'next-intl'
  
export default function Categories(): any {

    const { loading: profileLoading , data: profileData } = useProfile(); // tra
    const [ categoryName, setCategoryName ] = useState<string>('')
    const [ categories, setCategories ] = useState<ICategory[]>([]);
    const [ editCategory, setEditCategory ] = useState<ICategory>({id: 0, name: ''});


    const t = useTranslations("CategoryPage"); 
    const tc = useTranslations("CommonPage");

    useEffect(() => {
        fetchCategories();
    }, [])

    async function fetchCategories() {

        const { getAll } = categoryApi();
        const res = await getAll(); 
 
        if (res.data.status === 200) {
            setCategories(res.data.params)  
        }
    }

    if (profileLoading) {
        return tc('loadingUserInfo')
    }  

    if (profileData) {
        if (!profileData.is_admin) {
            return tc('notAnAdmin')
        }
    }
   

    async function handleDelete(ev: React.MouseEvent<Element>, id: number) {
        ev.preventDefault()

        const confirmed = await swal({
            title: tc('areYouSure'),   // "Are you sure?",
            text: tc('youWillNotBeAbleToRecoverThisOneAfterConfirmDelete'), // 
            icon: 'warning',
            buttons: [tc('noCancelIt'), tc('yesIamSure')],
            dangerMode: true,
        })

        if (confirmed) {
            
            try {
                const { remove } = categoryApi()
                let res = await remove({
                    id: id
                })
    
                if (res.data.status === 200) {
                    fetchCategories(); 
                    await toast.promise(Promise.resolve(), {
                        loading: tc('deleting'),
                        success: t('categoryDeletedSuccessfully'),
                        error:'',
                    }) 
                } else { 

                    await toast.promise(Promise.reject(res.data.message), {
                        loading: ' ',
                        success: ' ',
                        error: t('errorDeletedCategory')
                    })
                   
                } 
            } catch (error) {
                
            }
           
        } 

      
    }


    async function handleNewCategorySubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        const creationPromise = new Promise(async(resolve, reject) => {  
            const { create, update } = categoryApi() 
            
            let res:any = null;
            if (editCategory && editCategory.id > 0) { 
                res = await update({
                    id: editCategory.id,
                    name: categoryName,
                    
                })   
            
                
            } else {
                res = await create({
                    name: categoryName
                }) 
            } 

            if (res.data.status === 200) { 
                setCategoryName('')
                fetchCategories();
                setEditCategory({id: 0, name: ''});  // fix bug when edit xong se con luu lai va them moi vo tinh se edit
                await toast.promise(Promise.resolve(), {
                    loading: editCategory?.id > 0 ?  t('updatingCategory')  : t('creatingCategory') ,
                    success: editCategory?.id > 0 ? t('updateCategorySuccessfully') : t('createCategorySuccessfully') ,
                    error: '',
                }) 
            }
            else {
                await toast.promise(Promise.reject(res.data.message), {
                    loading:  '', 
                    success: '',
                    error: t('errorWhileCreatingCategory'),
                   
                }) 
            }
             
        }) 
    }
    
    return (
        <div className="mt-6">
            <UserTabs isAdmin={ true } /> 
            <section className="max-w-lg mx-auto mt-8"> 
            
                <form className="mt-8" onSubmit={ handleNewCategorySubmit }>
                    <div className="flex items-end gap-2">
                        <div className="grow">
                            <label> 
                                { editCategory?.id > 0 ? t('updateCategory') : t('newCategoryName') } 
                                { editCategory && (
                                    <>
                                        : <b> { editCategory.name } </b>
                                    </>
                                )}
                            </label>
                            <input type="text" 
                                value={ categoryName } 
                                onChange={ ev => setCategoryName(ev.target.value) }/>
                        </div>
                        <div  className="pb-2">
                            <button type="submit" > { editCategory?.id > 0 ? tc('update') : tc('create') } </button>
                        </div>
                    </div> 
                </form>

                <div>
                    <h2 className="mt-8 text-sm text-gray-500"> { t('editCategory') } </h2>
                    {categories?.length > 0 && categories.map(c =>  
                        
                        <div className="relative" key={ c.id }>
                            <button   
                                onClick={() => {
                                    setEditCategory(c);
                                    setCategoryName(c.name)
                                }}
                                className="flex gap-1 p-2 px-4 mb-1 bg-gray-300 cursor-pointer rounded-xl">
                                <span> { c.name } </span>
                            </button>
                            <div 
                                onClick={ ev =>  handleDelete(ev, c.id) }
                                className="border rounded-md bg-white shadow-lg absolute transition cursor-pointer hover:scale-[115%] top-1 right-2"> 
                                <DeleteIcon className="w-8 h-8"/> 
                            </div>
                        </div>
                    )}
                </div>
            </section> 
        </div>
    )
}