export default function MenuItem() {
    return (
        <>
            <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:cursor-pointer hover:shadow-2xl">
                <div className="text-center">
                    <img src="/pizza2.png" alt="pizza" className="max-h-auto max-h-24 block mx-auto" />
                </div>
                <h4 className="font-semibold text-xl my-3"> Pepperoni Pizza</h4>
                <p className="text-gray-500 text-sm"> This pizza is making by pepper and salt and cheese, so the smelt is very good!</p>
                <button className="bg-primary text-white rounded-full px-6 py-2 mt-2"> Add to cart $15 </button>
            </div> 
        </>
    )
}