'use client'  
import { useSession } from "next-auth/react"; 
import { redirect } from "next/navigation"; 
import { useEffect, useState } from "react";
import { memberCartApi } from "../api/member-carts";
import OrderDetail, { IOrderDetail } from "@/components/orderDetail/OrderDetail";

export default function OrdersPage() {
    const session = useSession();   
    const { status } = session
    const [ orders, setOrders ] = useState<IOrderDetail[]>([]);

    useEffect(() => {
        fetchAllInvoices();
    }, []) 

    async function fetchAllInvoices() {
        const { getAllInvoice } = memberCartApi();
        const res = await getAllInvoice();
        if (res.data.status === 200) {
            setOrders(res.data.params)
        }
    }

    if (status === 'loading') {
        return 'Loading ...'
    }

    if (status === 'unauthenticated') {
        return redirect('/login')
    }

    return ( 
        <section className="mt-8">
            <hr />

            { orders.length > 0 && orders.map( (order, index) => (
                <OrderDetail key={ index } invoice_id={ order.invoice_id } total_price={ order.total_price } carts={ order.carts } />
            ))}

         
        </section> 
    )
}