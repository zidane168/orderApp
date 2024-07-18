import Link from "next/link"
import DeleteIcon from "../icons/DeleteIcon"
import { Button } from "@nextui-org/react"
import swal from 'sweetalert' 
import toast from 'react-hot-toast' 
import { productApi } from "@/app/api/product/product.api" 
import { useRouter } from "next/navigation"
interface IMenuItem {
    id: number,
    path: string, 
    name: string,
    description: string, 
    basePrice: number, 
    isAddToCart: boolean, 
}

export default function MenuItem({ id, path, name, description, basePrice, isAddToCart = true } : IMenuItem) {
  
    const { redirect } = useRouter();
    async function handleDeleteProduct(ev: React.ChangeEvent<HTMLFormElement>) {
        ev.preventDefault()

        const confirmed = await swal({
            title: "Are you sure?",
            text: 'You will not be able to recover this one after confirm Delete!',
            icon: 'warning',
            buttons: ['No, cancel it', 'Yes, I am sure'],
            dangerMode: true,
        })

        if (confirmed) {
            const { remove } = productApi()
            const res = await remove({
                id
            })

            if (res.data.status === 200) {
                await toast.promise(Promise.resolve(), {
                    loading: 'Deleting ...',
                    success: res.data.message,
                })

                redirect ('menu-items' )
            } else {
                await toast.promise(Promise.reject(res.data.message), {
                    error: res.data.messsage
                }) 
            }
        }
    }

    return (
        <>
            <div className="p-4 text-center transition-all bg-gray-200 rounded-lg hover:bg-white hover:cursor-pointer hover:shadow-2xl">
                <div className="text-center">
                    <img src={ path } alt="pizza" className="block mx-auto max-h-auto max-h-24" />
                </div>
                <h4 className="my-3 text-xl font-semibold"> ({id}) { name } </h4>
                <div className="text-sm text-gray-500 truncate max-h-16" dangerouslySetInnerHTML={{ __html: description }} />
                
                { isAddToCart === true && (
                    <button className="px-6 py-2 mt-2 text-white rounded-full bg-primary"> Add to cart ${ basePrice } </button>
                )}

                { isAddToCart === false && (
                    <div className="flex items-center gap-4 mt-2">
                        <div className="grow">
                            <Link href={ '/menu-items/edit/' + id }>
                                <button className="mt-2 text-white transition rounded-full hover:scale-110 bg-secondary"> 
                                    Update ${ basePrice }
                                </button>
                            </Link>
                        </div>

                        <div className="mt-2"> 
                            <Button className="p-1 bg-white " onClick={ ev => handleDeleteProduct(ev) }>
                                <DeleteIcon className="w-8 h-8"/>
                            </Button>
                        </div>
                   </div>
                )} 

            </div> 
        </>
    )
}