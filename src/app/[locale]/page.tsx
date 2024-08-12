import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders"; 
import {useTranslations} from 'next-intl';

export default  function Home() { 
 
  const th = useTranslations('HomePage');
  return (
   <> 
    <Hero />
    <HomeMenu />
    <section className="my-16 text-center" id="about">
      <SectionHeaders 
        subHeader={ th('ourStory') }
        mainHeader={ th('about') }
      />
      <div className="flex flex-col max-w-md gap-4 mx-auto mt-4 text-gray-500">
        <p className="">
          🍕 { th('aboutUsStory1') }
        </p>
        <p> 
          { th('aboutUsStory2') }
        </p>
      </div>
    </section>

    <section className="my-8 text-center" id="contact">
      <SectionHeaders subHeader={ th('dontHesitate') }
      mainHeader={ th('contactUs') } /> 
      <div className="mt-8">
        <a className="text-4xl text-gray-500 underline" href="tel: +084906440368"> +084906440368 </a>
      </div>
    </section>

   </>
  );
}
  