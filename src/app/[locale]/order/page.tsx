'use client'  
import { useSession } from "next-auth/react"; 
import { redirect } from "next/navigation"; 
import { useEffect, useState } from "react";
import { memberCartApi } from "../api/member-carts";
import OrderDetail, { IOrderDetail } from "@/components/orderDetail/OrderDetail";
import { PaginatedItems } from "@/components/Pagination";
import { useTranslations } from 'next-intl'
import ComboBox, { IListItem } from "@/components/Combobox";
import Combobox from "@/components/Combobox";
 

export default function OrdersPage() {
    const session = useSession();   
    const { status } = session
    const [ orders, setOrders ] = useState<IOrderDetail[]>([]);
    const [ limit, setLimit ] = useState(0);            // limit display on this page (10, 20, 50)
    const [ page, setPage ] = useState(0);              // current page showing 
    const [ totalPage, setTotalPage ] = useState(0); 
    const [ offset, setOffset ] = useState(page * 2)
    const [ total, setTotal ] = useState<number>(0)
    const [ filter, setFilter ] = useState<IListItem[]>([]); 
    const [ selectedItem, setSelectedItem ] = useState<IListItem>();  

    const tc = useTranslations('CommonPage') 
         
    useEffect(() => {   
        const itemFilter = [ 
            { name: "3", id: 1 },
            { name: "10", id: 2 },
            { name: "50", id: 3 },
            { name: "100", id: 4 }
        ];
        
        setFilter(() => { 
            return itemFilter;
        })  
        
        setLimit(Number(itemFilter[0].name))
        setPage(1)
        setTotalPage(1)
        setSelectedItem(itemFilter[0]) // init combobox init first time load
    }, [])

    
    useEffect(() => {  
        if (selectedItem) {
            const lm = getLimitByComboboxId(selectedItem?.id)
            const pg = page; 
            fetchAllInvoices(Number(lm), Number(pg));   // chon limit, page when have choose new limit: 1, 10, 50, 100
        } else {
            fetchAllInvoices(limit, page);              // 
        }    
    }, [ limit, page, selectedItem ]) 

  
    function getLimitByComboboxId(id: number) {
        for(const obj of filter) { 
            if (selectedItem && obj.id === selectedItem.id) {
                return obj.name
            }
        }
        return 1;
    }

    async function fetchAllInvoices(limit: number, page: number) {
        const { getAllInvoicePagination } = memberCartApi();
        const res = await getAllInvoicePagination({ limit: limit, page: page });
       
        
        if (res.data.status === 200) {  
            setTotal(res.data.params.total)
            setLimit(res.data.params.limit)
            setPage(res.data.params.page)
            setOrders(res.data.params.result)  
            setTotalPage(Math.ceil(res.data.params.total / res.data.params.limit))
          
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
            <div className="w-[200px]">  
                <div>  <Combobox 
                            isRequired={ true } 
                            name={ tc('filter') } 
                            list={ filter ?? [] } 
                            setSelectedItem={ setSelectedItem } 
                        /> </div>
            </div>

            <hr className="mt-4"/>
            <div className="p-2"> { tc('page') }: { page }/{ totalPage }, { tc('display') }: { orders.length } rows </div>
            <hr className="mb-4"/>

            <PaginatedItems
                itemsPerPage={ limit }
                total={ total }
                offset={ offset }
                handleClickSearch={ handleClickSearch }
                
            />

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