'use client'  
import { useSession } from "next-auth/react"; 
import { redirect } from "next/navigation"; 
import { useEffect, useState } from "react";
import { memberCartApi } from "../api/member-carts";
import OrderDetail, { IOrderDetail } from "@/components/orderDetail/OrderDetail";
import { PaginatedItems } from "@/components/Pagination";

export default function OrdersPage() {
    const session = useSession();   
    const { status } = session
    const [ orders, setOrders ] = useState<IOrderDetail[]>([]);
    const [ limit, setLimit ] = useState(2);            // limit display on this page (10, 20, 50)
    const [ page, setPage ] = useState(1);              // current page showing 
    const [ offset, setOffset ] = useState(page * 2)
    const [ total, setTotal ] = useState<number>(0)

    useEffect(() => {
        fetchAllInvoices();
    }, [ limit, page ]) 

    async function fetchAllInvoices() {
        const { getAllInvoicePagination } = memberCartApi();
        const res = await getAllInvoicePagination({ limit: limit, page: page });
       
        
        if (res.data.status === 200) {

            console.log(res.data)
            setTotal(res.data.params.total)
            setLimit(res.data.params.limit)
            setPage(res.data.params.page)
            setOrders(res.data.params.result)
        } else {
            console.log(res.data.message)
        }
    }


    const handleClickSearch = async(e, pageIndex = 1) => {
        if (e?.preventDefault) {
          e?.preventDefault()
        }
    
        setPage(pageIndex);
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
                <OrderDetail key={ index } 
                    created={ order.created }
                    invoice_id={ order.invoice_id } total_price={ order.total_price } carts={ order.carts } />
            ))}

            <PaginatedItems
                itemsPerPage={ limit }
                total={ total }
                offset={ offset }
                handleClickSearch={ handleClickSearch }
                
            />
         
        </section> 
    )
}