import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionHeader from "./components/layout/SectionHeader";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />

      <section className="text-center my-16" id="about">
    <SectionHeader subHeader={'Our story'} mainHeader={'About us'} />
    <div className="text-gray-500 mx-auto max-w-md mt-4 flex flex-col gap-4">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quod deserunt sapiente qui nihil, quas esse natus rem ab nam excepturi pariatur praesentium rerum corporis nostrum? Tempore dolore dolores itaque, qui quaerat, minima sequi nesciunt, nisi culpa aliquam totam esse doloremque odit. Facilis corrupti hic vero animi obcaecati expedita quos!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quod deserunt sapiente qui nihil, quas esse natus rem ab nam excepturi pariatur praesentium rerum corporis nostrum? Tempore dolore dolores itaque, qui quaerat, minima sequi nesciunt, nisi culpa aliquam totam esse doloremque odit. Facilis corrupti hic vero animi obcaecati expedita quos!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem earum illum doloribus voluptatum expedita, porro maiores, tenetur suscipit inventore ipsam accusantium commodi. Tempore, ut nemo?
    </p>

    </div>
      </section>
    <section className="text-center my-8" id="contact">
    <SectionHeader subHeader={'Dont Hesitate'} mainHeader={'Contact Us'} />
    <div className="mt-8">
    <a className="text-4xl underline text-gray-500" href="tel:+92 305253535">
    92 305 253 535
    </a>
    </div>
    </section>


    </>
  )
}
