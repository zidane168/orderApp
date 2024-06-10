import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
    return (
        <> 
            <section className="hero mt-4">
                <div className="py-12">
                    <h1 className="text-4xl font-semibold "> 
                        Everything <br /> 
                        is better<br /> 
                        with a 
                        <span className="text-primary"> Pizza </span> 
                    </h1> 
                    <p className="my-6 text-gray-500"> Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life </p>
                    <div className="flex gap-4 mt-4 items-center">
                        <button className="bg-primary text-white px-8 py-2 items-center rounded-full uppercase flex gap-2 text-sm"> Order now <Right /> </button>
                        <button className="flex gap-2 text-gray-600 font-semibold"> Learn more <Right /> </button>
                    </div>
                </div>
                <div className="relative">
                    <Image src={'/pizza2.png'} layout={'fill'} alt={'pizza'} objectFit={'contain'}/>
                </div>
            </section>
        </>
    )
}