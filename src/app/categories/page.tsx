'use client'
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/Tabs"
import Log from "@/utils/log";
import { ReactHTMLElement, useEffect, useState } from "react"
import toast from "react-hot-toast";

export default function Categories(): any {

    const { loading: profileLoading , data: profileData } = useProfile(); // tra
    const [ categoryName, setCategoryName ] = useState<string>('')
    const [ categories, setCategories ] = useState([]);
    const [ editCategory, setEditCategory ] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, [])

    async function fetchCategories() {
        await fetch('api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }

    if (profileLoading) {
        return "Loading user info ..."
    }

    if (!profileData.admin) {
        return 'Not an admin';
    }

    async function handleNewCategorySubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        const creationPromise = new Promise(async(resolve, reject) => {

            const data = { name: categoryName }
            if (editCategory) {
                data._id = editCategory._id;
            }
 
            const response = await fetch('api/categories', { 
                method: editCategory ? 'PUT' : 'POST',
                headers: {'Content-Type': 'application/json'},  // chú ý hoa thuong Content-Type nha, viết sai ko call dc api
                body: JSON.stringify(data),
            })

            setCategoryName('')
            fetchCategories();
            setEditCategory(null);  // fix bug when edit xong se con luu lai va them moi vo tinh se edit

            if (response.ok) resolve()
            else reject()  
        })
 

        await toast.promise(creationPromise, {
            loading: editCategory ?  'Updating category' : 'Creating your new category ...',
            error: 'Error while creating category!',
            success: editCategory ? 'Congrats, Category updated succeed' : 'Congrats, Category created succeed!',
        })
      
    }
    
    return (
        <section className="max-w-lg mx-auto mt-8"> 
            <UserTabs isAdmin={ true } />
            
            <form className="mt-8" onSubmit={ handleNewCategorySubmit }>
                <div className="flex items-end gap-2">
                    <div className="grow">
                        <label> 
                            { editCategory ? 'Update Category' : 'New Category Name' } 
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
                        <button type="submit" > { editCategory ? 'Update' : 'Create'} </button>
                    </div>
                </div> 
            </form>

            <div>
                <h2 className="mt-8 text-sm text-gray-500"> Edit Category: </h2>
                {categories?.length > 0 && categories.map(c =>  
                    <button  
                        onClick={() => {
                            setEditCategory(c);
                            setCategoryName(c.name)
                        }}
                        className="flex gap-1 p-2 px-4 mb-1 bg-gray-300 cursor-pointer rounded-xl">
                        <span> { c.name } </span>
                    </button>
                )}
            </div>
        </section>
    )
}