import React from "react";

export default function SuccessBox( { children } : { children : React.ReactNode } ) {
    return (
        <div className="p-4 text-center bg-green-200 border-4 border-green-500 rounded-lg"> 
            { children } 
        </div>
    )
   
}