
interface IExtra {
    name: string,
}

interface ICart {
    name: string,
    price: number,
    description: string,
    size: string,
    quantity: number,
    extras: IExtra[];
}

export interface IOrderDetail {
    id: number, 
    total_price: number, 
    carts: ICart[],
}

export default function OrderDetail({ id, total_price, carts }: IOrderDetail) {
    return (
        <div className="mb-4">
            <div className="flex justify-between mt-4">
                <div className="p-2 font-bold text-white rounded-md bg-primary"> Invoice Id: { id } </div>
                <div  className="text-2xl font-bold text-primary">  { total_price } </div>
            </div>
            <div className="p-2 mt-2 border rounded-md">
                Your package already delivery successfully
            </div>

            <div className="mt-2">
                List products purchase:
            </div>

            { carts.length > 0 && (
                carts.map((cart, index) => (
                    <div className="mt-4 mb-4">
                        <div key={ index }>
                            <div className="flex gap-4">
                                <div className="w-[200px]">
                                    <div> { cart.name }  </div>
                                    <div className="font-bold text-primary"> { cart.price }   </div>
                                </div>
                                <div className="grow">  
                                    <div className="w-[600px]">
                                        <div className="text-sm text-gray-600 truncate max-h-16" dangerouslySetInnerHTML={{ __html: cart.description }} />
                                    </div>
                
                                    <div className="flex justify-between">
                                        <div className="text-gray-400"> 
                                            { cart.size } 
                                        </div>
                                        <div className="text-gray-400"> 
                                            { cart.quantity } 
                                        </div>
                                    </div>  
                                
                                    { cart.extras.length > 0 && (
                                        cart.extras.map((extra, index2) => (
                                            <div key={index2} className="text-gray-500"> 
                                                { extra.name }
                                            </div>
                                        ))
                                    )} 
                                </div>
                            </div>
                        </div>  
                        <hr className="mt-4" />
                    </div>
                )) 
            ) } 
         
        </div>
    );
}