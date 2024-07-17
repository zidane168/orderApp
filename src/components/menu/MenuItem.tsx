import Link from "next/link"

interface IMenuItem {
    id: number,
    path: string, 
    name: string,
    description: string, 
    basePrice: number, 
    isAddToCart: boolean
}

export default function MenuItem({ id, path, name, description, basePrice, isAddToCart = true } : IMenuItem) {
    return (
        <>
            <div className="p-4 text-center transition-all bg-gray-200 rounded-lg hover:bg-white hover:cursor-pointer hover:shadow-2xl">
                <div className="text-center">
                    <img src={ path } alt="pizza" className="block mx-auto max-h-auto max-h-24" />
                </div>
                <h4 className="my-3 text-xl font-semibold"> { name } </h4>
                <div className="text-sm text-gray-500 truncate max-h-16" dangerouslySetInnerHTML={{ __html: description }} />
                
                { isAddToCart === true && (
                    <button className="px-6 py-2 mt-2 text-white rounded-full bg-primary"> Add to cart ${ basePrice } </button>
                )}

                { isAddToCart === false && (
                    <Link href={ '/menu-items/edit/' + id }>
                        <button className="px-6 py-2 mt-2 text-white transition rounded-full hover:scale-110 bg-secondary"> 
                            Update ${ basePrice }
                        </button>
                    </Link>
                )} 

            </div> 
        </>
    )
}