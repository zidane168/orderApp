'use client'
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/Tabs" 
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { categoryApi } from "../api/categories/category.api";
import { ICategory } from "../api/categories/category.api.types"; 
import DeleteIcon from "@/components/icons/DeleteIcon";
import swal from "sweetalert"; 
import { useTranslation } from 'next-i18next'
  
export default function Categories(): any {

    const { loading: profileLoading , data: profileData } = useProfile(); // tra
    const [ categoryName, setCategoryName ] = useState<string>('')
    const [ categories, setCategories ] = useState<ICategory[]>([]);
    const [ editCategory, setEditCategory ] = useState<ICategory>({id: 0, name: ''});


    const { t } = useTranslation();
    

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
        return "Loading user info ..."
    }  

    if (profileData) {
        if (!profileData.is_admin) {
            return 'Not an admin';
        }
    }
   

    async function handleDelete(ev: React.MouseEvent<Element>, id: number) {
        ev.preventDefault()

        const confirmed = await swal({
            title: t('hello'),   // "Are you sure?",
            text: 'You will not be able to recover this one after confirm Delete!',
            icon: 'warning',
            buttons: ['No, cancel it', 'Yes, I am sure'],
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
                        loading: 'Deleting ...',
                        success: 'Category deleted successfully',
                        error:'',
                    }) 
                } else { 

                    await toast.promise(Promise.reject(res.data.message), {
                        loading: ' ',
                        success: ' ',
                        error: 'Error delete category!',
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
                    loading: editCategory?.id > 0 ?  'Updating category' : 'Creating your new category ...',
                    error: 'Error while creating category!',
                    success: '',
                }) 
            }
            else {
                await toast.promise(Promise.reject(res.data.message), {
                    loading:  '',
                    error: '',
                    success: editCategory?.id > 0 ? 'Congrats, Category updated succeed' : 'Congrats, Category created succeed!',
                }) 
            }
             
        })
 

        await toast.promise(creationPromise, {
            loading: editCategory?.id > 0 ?  'Updating category' : 'Creating your new category ...',
            error: 'Error while creating category!',
            success: editCategory?.id > 0 ? 'Congrats, Category updated succeed' : 'Congrats, Category created succeed!',
        }) 
    }
    
    return (
        <section className="max-w-lg mx-auto mt-8"> 
            <UserTabs isAdmin={ true } />
            
            <form className="mt-8" onSubmit={ handleNewCategorySubmit }>
                <div className="flex items-end gap-2">
                    <div className="grow">
                        <label> 
                            { editCategory?.id > 0 ? 'Update Category' : 'New Category Name' } 
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
                        <button type="submit" > { editCategory?.id > 0 ? 'Update' : 'Create'} </button>
                    </div>
                </div> 
            </form>

            <div>
                <h2 className="mt-8 text-sm text-gray-500"> Edit Category: </h2>
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
    )
}