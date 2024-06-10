import Image from "next/image";

export default function HomeMenu() {
    return (
        <section className="">
            <div className="absolute left-0 right-0 w-full">
                <div className="absolute -left-12 ">
                    <Image src={'/pizza2.png'} width={'182'}  height={'182'} alt="salad" objectFit={'contain'}/>
                </div>
                <div className="h-48 w-48 absolute -top-24 right-0 -z-10">
                    <Image src={'/pizza2.png'} layout={'fill'} alt="salad" objectFit={'contain'}/>
                </div>
            </div>
            <div className="text-center mt-4"> 
                <h3 className="uppercase text-gray-600 font-semibold leading-4"> Check out </h3>
                <h2 className="text-primary font-bold text-4xl italic"> Menu </h2>
            </div>
        </section>
    )
}