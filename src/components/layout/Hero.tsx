import Image from "next/image";
import Right from "../icons/RightIcon";

export default function Hero() {
    return (
        <> 
            <section className="mt-4 hero">
                <div className="py-12">
                    <h1 className="text-4xl font-semibold "> 
                        Everything <br /> 
                        is better<br /> 
                        with a 
                        <span className="text-primary"> Pizza </span> 
                    </h1> 
                    <p className="my-6 text-gray-500"> Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life </p>
                    <div className="flex items-center gap-4 mt-4">
                        <button className="flex items-center gap-2 px-8 py-2 text-sm text-white uppercase rounded-full bg-primary"> Order now <Right /> </button>
                        <button className="flex items-center gap-2 font-semibold text-gray-600"> Learn more <Right /> </button>
                    </div>
                </div>
                <div className="relative">
                    <Image src={'/pizza2.png'} layout={'fill'} alt={'pizza'} objectFit={'contain'}/>
                </div>
            </section>
        </>
    )
}