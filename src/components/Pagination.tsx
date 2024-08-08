import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate"; 
import { useTranslations } from "next-intl";

interface IPagination {
  itemsPerPage: number,
  total: number,
  offset: number, 
  handleClickSearch: any,
}


export const PaginatedItems = ({ 
  itemsPerPage = 0,
  total = 0,
  offset = 0, 
  handleClickSearch  
}: IPagination) => {
 
    const t = useTranslations('CommonPage')
    
    const [ pageCount, setPageCount ] = useState(0)

    useEffect(() => {
        const endOffset = offset + itemsPerPage
        setPageCount(Math.ceil(total / itemsPerPage))
    }, [offset, itemsPerPage, total])

    const handlePageClick  = (e: any) => {
        handleClickSearch(e, e.selected + 1)
    } 
  
    return (
      <> 
        <ReactPaginate
            key={offset}
          breakLabel="..."
          nextLabel={ t('next') }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={ t('previous') } 
          activeLinkClassName="bg-orange-500 p-4 rounded-md text-white"
          className="flex justify-center mt-8 space-x-4" 
        />
      </>
    );
  }