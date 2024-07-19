import Link from "next/link"
import DeleteIcon from "../icons/DeleteIcon"
import { Button } from "@nextui-org/react"
import swal from 'sweetalert' 
import toast from 'react-hot-toast' 
import { productApi } from "@/app/api/product/product.api" 
import { useRouter } from "next/navigation"
import { IProductExtra, IProductSize } from "@/app/api/product"
import { useContext, useState } from "react"
import { CartContext } from "../AppContext"
import Image from "next/image"
interface IMenuItem {
    id: number,
    path: string, 
    name: string,
    description: string, 
    basePrice: number, 
    isAddToCart: boolean, 
    sizes?: IProductSize[],
    extras?: IProductExtra[],
}

export default function MenuItem({ id, path, name, description, basePrice, isAddToCart = true,
    sizes, extras 
} : IMenuItem) {
  
    const [ showPopup, setShowPopup ] = useState<boolean>(false);
    const router = useRouter();
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
                window.location.reload()
              
            } else {
                await toast.promise(Promise.reject(res.data.message), {
                    error: res.data.messsage
                }) 
            }
        }
    }

    const { addToCart } = useContext(CartContext)

    function handleAddToCartButtonClick() {
        if (sizes?.length === 0 && extras?.length === 0) {
            addToCart(id, 1, sizes, extras);
            toast.success('Added to cart');
        } else {
            setShowPopup(true)
        }
    }

    return (
        <>
            {
                showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/80">
                    <div className="max-w-md max-h-screen p-4 overflow-scroll bg-white rounded-lg"> 
                        <Image 
                            src={ path }
                            alt={ name } 
                            width={300} height={300}
                            className="mx-auto"
                        />
                        <h2 className="mb-2 text-lg font-bold text-center"> { name }  </h2>
                        <div className="mb-2 text-sm text-justify leading-[20px] text-gray-500" dangerouslySetInnerHTML={{ __html: description }} />
                          { sizes?.length > 0 && (
                            <div className="p-2 bg-gray-300 rounded-md">
                                <h3> Pick your size </h3>
                                { sizes?.map (size => (
                                    <label className="block p-2 py-2 mb-1 border rounded-md"> 
                                        <input type="radio" name="size"/> { size.name } + <span className="font-semibold text-primary"> ${ size.price } </span>
                                    </label>
                                ))}
                            </div>
                        )}

                        { extras?.length > 0 && (
                            <div className="p-2 mt-4 bg-gray-300 rounded-md">
                                <h3> Pick your Extras </h3>
                                { extras?.map (extra => (
                                    <label className="block p-2 py-2 mb-1 border rounded-md"> 
                                        <input type="checkbox" name="extra"/> { extra.name } +<span className="font-semibold text-primary"> ${ extra.price } </span>
                                    </label>
                                ))}
                            </div>
                        )}

                        <Button className="mt-4 text-white bg-primary" type="button">
                            Add to cart "Selected price"
                        </Button>
                    </div>
                </div>
                )
            }
            <div className="p-4 text-center transition-all bg-gray-200 rounded-lg hover:bg-white hover:cursor-pointer hover:shadow-2xl">
                <div className="text-center">
                    <img src={ path } alt="pizza" className="block mx-auto max-h-auto max-h-24" />
                </div>
                <h4 className="my-3 text-xl font-semibold"> { id ? "(" + id + ")" : ''}  { name } </h4>
                <div className="text-sm text-gray-500 truncate max-h-16" dangerouslySetInnerHTML={{ __html: description }} />
                
                { isAddToCart === true && (
                    <button className="px-6 py-2 mt-2 text-white rounded-full bg-primary"
                        onClick={ handleAddToCartButtonClick }
                    > 
                        Add to cart ${ basePrice } 
                    </button>
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