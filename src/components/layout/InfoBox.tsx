export default function InfoBox( { children } : { children : String } ) {
    return (
        <div className="text-center bg-blue-200 p-4 rounded-lg border-4 border-blue-500"> 
            { children } 
        </div>
    )
   
}