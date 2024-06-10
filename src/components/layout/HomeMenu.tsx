import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

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
              <SectionHeaders subHeader={'check out'} mainHeader={'Menu'} />
            </div>


            <div className="grid grid-cols-3 gap-4 my-4">
               <MenuItem />
               <MenuItem />
               <MenuItem />
               <MenuItem />
               <MenuItem />
               <MenuItem />
            </div>
        </section>
    )
}