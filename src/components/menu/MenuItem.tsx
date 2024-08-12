import Link from "next/link"
import DeleteIcon from "../icons/DeleteIcon" 
import swal from 'sweetalert' 
import toast from 'react-hot-toast' 
import { productApi } from "@/app/[locale]/api/product/product.api" 
import { useRouter } from "next/navigation"
import { IProductExtra, IProductSize } from "@/app/[locale]/api/product"
import { useContext, useState } from "react"
import { CardContextType, CartContext } from "../AppContext"
import Image from "next/image"
import ShoppingCartIcon from "../icons/ShoppingCartIcon"
import FlyingButton from "react-flying-item"
import { useTranslations } from 'next-intl'
interface IMenuItem {
    id: number,
    path: string, 
    name: string,
    description: string, 
    basePrice: number, 
    isAddToCart?: boolean, 
    sizes?: IProductSize[],
    extras?: IProductExtra[],
}

export default function MenuItem({ id, path, name, description, basePrice, isAddToCart = true,
    sizes, extras 
} : IMenuItem) {

  
    const [ showPopup, setShowPopup ] = useState<boolean>(false);
    
    const [ selectedSize, setSelectedSize ] = useState<IProductSize>(
        sizes && sizes.length > 0 ?   
            { id: sizes[0].id, name: sizes[0].name, price: sizes[0].price } : 
            { id: 0, name: '', price: 0 }
        );  // init first sizes value
    const [ selectedExtras, setSelectedExtras ] = useState<IProductExtra[]>([]);

    const tc = useTranslations("CommonPage");  
    const tcp = useTranslations('CartPage')

    const router = useRouter();
    async function handleDeleteProduct(ev: React.MouseEvent<Element>) {
        ev.preventDefault()

        const confirmed = await swal({
            title: tc('areYouSure'),   // "Are you sure?",
            text: tc('youWillNotBeAbleToRecoverThisOneAfterConfirmDelete'), // 
            icon: 'warning',
            buttons: [tc('noCancelIt'), tc('yesIamSure')],
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
                    error: '',
                })
                window.location.reload()
              
            } else {
                await toast.promise(Promise.reject(res.data.message), {
                    loading: ' ',
                    success: '',
                    error: res.data.message
                }) 
            }
        }
    }

    const { addToCart } = useContext(CartContext) as CardContextType

    async function handleAddToCartButtonClick() { 

        const hasOptions = sizes && sizes.length > 0 && extras && extras.length > 0
        if (hasOptions && !showPopup) {
            setShowPopup(true)
            return
        }  
   
        let newSelectedExtras:number[] = [];
        selectedExtras.map((index, value) => (
            newSelectedExtras.push(index.id)
        ))  

        addToCart(  {product_id: id, quantity: 1, product_size_id: selectedSize.id, product_extra_ids: newSelectedExtras} ); 
        await new Promise(resolve => setTimeout(resolve, 1000)) // It then waits for a 1-second delay and call setShowPopup later
        setShowPopup(false) 
    }

    function handleExtraThingClick(ev: React.ChangeEvent<HTMLInputElement>, extraThing: IProductExtra) {
 
        const checkbox = ev.target as HTMLInputElement
        const checked = checkbox.checked;
        if (checked) {
            setSelectedExtras(prev => [...prev, extraThing])        // luc init useState thi no phải là array moi su dung dc: const [ selectedExtras, setSelectedExtras ] = useState<IProductExtra[]>([]);
        } else {
            setSelectedExtras(prev => (
                prev.filter(e => e.name != extraThing.name )
            ))
        }
    }

    let selectedPrice:number =  Number(basePrice)
    if (selectedPrice) {
        selectedPrice += Number(selectedSize.price)
    }

    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += Number(extra.price)
        }
    } 

    return (
        <>  
            {
                showPopup && (
                <div 
                    onClick={ () => setShowPopup(false) }
                    className="fixed inset-0 flex items-center justify-center bg-black/80">
                    <div 
                        onClick={ev => ev.stopPropagation() }
                        className="max-w-lg p-2 bg-white rounded-lg"> 
                        <div  
                            className="p-4 my-8">
                            <div 
                                className="max-h-screen overflow-y-auto">
                                <Image 
                                    src={ path }
                                    alt={ name } 
                                    width={300} height={300}
                                    className="mx-auto"
                                />
                                <h2 className="mb-2 text-lg font-bold text-center"> { name }  </h2>
                                <div className="mb-2 text-sm text-justify leading-[20px] text-gray-500" dangerouslySetInnerHTML={{ __html: description }} />
                                
                               
                                { sizes && sizes.length > 0 && (
                                    <div className="p-2 bg-gray-300 rounded-md">
                                        <h3> Pick your size </h3>
                                        { sizes?.map (size => (
                                            <label className="block p-2 py-2 mb-1 border rounded-md" key={ size.id }> 
                                                <input 
                                                    type="radio" 
                                                    onChange={ () => setSelectedSize(size) }  
                                                    checked={ selectedSize.name === size.name }
                                                    name="size"/> { size.name } + <span className="font-semibold text-primary"> ${ size.price } </span>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                { extras && extras.length > 0 && (
                                    <div className="p-2 mt-4 bg-gray-300 rounded-md">
                                        <h3> Any Extras? </h3>
                                        { /* This line is show debug state */ } 
                                        { /*  JSON.stringify(selectedExtras) */ } 
                                        { extras?.map (extra => (
                                            <label className="block p-2 py-2 mb-1 border rounded-md" key={ extra.id }> 
                                                <input
                                                    onChange={ (ev) => handleExtraThingClick(ev, extra) } 
                                                    type="checkbox" name="extra"/> { extra.name } +<span className="font-semibold text-primary"> ${ extra.price } </span>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                <div className="flying-button-parent"  onClick={ handleAddToCartButtonClick }>
                                    <FlyingButton 
                                        src={ path }
                                        targetLeft={'80%'}
                                        targetTop={'5%'}
                                       
                                        className="sticky mt-4 text-white bg-primary bottom-2" type="button">
                                        { tcp('addToCart') } ${selectedPrice} 
                                    </FlyingButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
            <div   className="p-4 text-center transition-all bg-gray-200 rounded-lg hover:bg-white hover:cursor-pointer hover:shadow-2xl">
                <div className="text-center">
                    <img src={ path } alt="pizza" className="block mx-auto max-h-auto max-h-24" />
                </div>
                <h4 className="my-3 text-xl font-semibold text-primary "> { /* id ? "(" + id + ")" : '' */ }  { name } </h4>
                <div className="text-sm text-gray-500 truncate max-h-16" dangerouslySetInnerHTML={{ __html: description }} />
                
                 
                      
                { isAddToCart === true && (  
                    (extras && extras.length > 0) ?  
                        <button 
                            className="px-6 py-2 mt-2 text-white rounded-full bg-primary"
                            onClick={ handleAddToCartButtonClick }
                            >    
                            <div className="flex items-center gap-2 justify-evenly"> 
                                <div className="flex">
                                    <div> { tcp('addTo') }  </div>
                                    <ShoppingCartIcon className="w-6 h-6"/> 
                                </div>
                                <div> ({ tcp('from') } ${basePrice}) </div> 
                            </div>
                        </button>
                        :  
                        <div className="flying-button-parent"  onClick={ handleAddToCartButtonClick }> 
                            <FlyingButton  
                                targetTop={'5%'}
                                targetLeft={'80%'}
                                src={ path }
                               
                                >    
                                <div className="flex items-center gap-2 justify-evenly"> 
                                    <div className="flex">
                                        <div> Add to </div>
                                        <ShoppingCartIcon className="w-6 h-6"/> 
                                    </div>
                                    <div> ( ${basePrice}) </div> 
                                </div>
                            </FlyingButton> 
                        </div>
                    )
                }

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
                            <button type="button" className="p-1 bg-white " onClick={ ev => handleDeleteProduct(ev) }>
                                <DeleteIcon className="w-8 h-8"/>
                            </button>
                        </div>
                   </div>
                )} 

            </div> 
        </>
    )
}   