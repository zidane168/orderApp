'use client'
import Image from "next/image";
import Right from "../icons/RightIcon";
import { homeApi } from "@/app/[locale]/api/home";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl'

export default function Hero() {

    const th = useTranslations('HomePage');
    const [ title, setTitle ] = useState<string>('');
    const [ description, setDescription ] = useState<string>('');

    useEffect(() => {
        loadData()
    }, [])
    
    async function loadData() {
        
        const { getInfo } = homeApi()
        const res = await getInfo();
        if (res.data.status === 200) {
            setTitle(res.data.params.title);
            setDescription(res.data.params.description);
        }
    }

    return (
        <> 
            <section className="mt-4 hero">
                <div className="py-12"> 
                    <h1 className="text-4xl font-semibold" dangerouslySetInnerHTML={{ __html: title }} />
                    <p className="my-6 text-gray-500"> { description } </p>
                    <div className="flex items-center gap-4 mt-4">
                        <a href="/menu" className="flex items-center gap-2 px-8 py-2 text-sm text-white uppercase rounded-full bg-primary"> { th('orderNow') } <Right /> </a>
                        <a href="/" className="flex items-center gap-2 font-semibold text-gray-600"> { th('learnMore') } <Right /> </a>
                    </div>
                </div>
                <div className="relative">
                    <Image src={'/pizza2.png'} layout={'fill'} alt={'pizza'} objectFit={'contain'}/>
                </div>
            </section>
        </>
    )
}