import moment from "moment"
import { useTranslations } from 'next-intl';

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
    invoice_id: number, 
    total_price: number, 
    created: string,
    carts: ICart[],
}

export default function OrderDetail({ invoice_id, total_price, created, carts }: IOrderDetail) {

    const to = useTranslations('OrderPage');
    return (
        <div className="p-4 mt-2 mb-4 rounded-md shadow-lg">
            <div className="mt-4 mb-2 italic text-gray-500">
                { to('orderDate')  }:  { moment(created).format('YYYY-MM-DD HH:mm:ss') }
            </div>
            <div className="flex justify-between">
                <div className="p-2 font-bold text-white rounded-md bg-primary"> Invoice Id: { invoice_id } </div>
                <div  className="text-2xl font-bold text-primary"> { to('subTotal') }:  { total_price } </div>
            </div>
            <div className="p-2 mt-2 border rounded-md">
                { to('yourPackageAlreadyDeliverySuccessfully') }
            </div>

            <div className="mt-2">
                { to('listProductsPurchase') }
            </div>

            <div className="p-4 bg-gray-100 rounded-md">
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
                                                x{ cart.quantity } 
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
                            { index + 1 < carts.length ? <hr className="mt-4" /> : '' }
                        </div>
                    )) 
                ) } 
            </div>
         
        </div>
    );
}