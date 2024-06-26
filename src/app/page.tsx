import Header from "@/components/layout/Header"; 
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
   <>
   
    <Hero />
    <HomeMenu />
    <section className="text-center my-16">
      <SectionHeaders 
        subHeader={'Our story'}
        mainHeader={'About us'}
      />
      <div className="max-w-md mx-auto mt-4 text-gray-500 mt-4 flex flex-col gap-4">
        <p className="">
          🍕 Pizza, a dish of Italian origin, consists of a flattened disk of bread dough topped with a delightful combination of olive oil, oregano, tomatoes, olives, mozzarella (or other cheese), and various other ingredients. It’s baked quickly, often in a wood-fired oven heated to a very high temperature, resulting in a crispy crust and gooey cheese. From the classic Margherita—topped with tomatoes, mozzarella, and basil—to creative variations like California-style pizza, this beloved food has conquered taste buds worldwide. Whether you prefer pepperoni or arugula, pizza remains a universal favorite
        </p>
        <p> 
        Pizza Hut’s fragrance adventure took an unexpected turn when they introduced their limited edition Eau de Pizza Hut in 2012. The scent was initially launched in Canada and later made its way to the United States for a Valentine’s Day promotion. But here’s the twist: it didn’t smell like pizza at all! Instead, lucky recipients described it as having the warm and pleasing aroma of cinnamon rolls
        </p>
      </div>
    </section>

    <section className="text-center my-8">
      <SectionHeaders subHeader={'Don\'t hesitate'}
      mainHeader={'Contact us'} /> 
      <div className="mt-8">
        <a className="text-4xl underline text-gray-500" href="tel: +084906440368"> +084906440368 </a>
      </div>
    </section>

   </>
  );
}
