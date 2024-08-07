export default function InfoBox( { children } : { children : React.ReactNode } ) {
    return (
        <div className="p-4 text-center bg-blue-200 border-4 border-blue-500 rounded-lg"> 
            { children } 
        </div>
    )
   
}