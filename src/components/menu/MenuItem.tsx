interface IMenuItem {
    image: string, 
    name: string,
    description: string, 
    basePrice: number, 
}

export default function MenuItem({ path, name, description, basePrice } : IMenuItem) {
    return (
        <>
            <div className="p-4 text-center transition-all bg-gray-200 rounded-lg hover:bg-white hover:cursor-pointer hover:shadow-2xl">
                <div className="text-center">
                    <img src={ path } alt="pizza" className="block mx-auto max-h-auto max-h-24" />
                </div>
                <h4 className="my-3 text-xl font-semibold"> { name } </h4>
                <div className="text-sm text-gray-500 truncate max-h-16" dangerouslySetInnerHTML={{ __html: description }} />
                <button className="px-6 py-2 mt-2 text-white rounded-full bg-primary"> Add to cart ${ basePrice } </button>
            </div> 
        </>
    )
}