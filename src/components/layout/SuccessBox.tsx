export default function SuccessBox( { children } : { children : String } ) {
    return (
        <div className="text-center bg-green-200 p-4 rounded-lg border-4 border-green-500"> 
            { children } 
        </div>
    )
   
}