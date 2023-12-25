import Image from "next/image";
import Right from "../Icons/Right";


export default function Hero(){
  return(
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
    Everything <br /> 
    is better <br /> 
    with a&nbsp; 
    <span className="text-primary">
      Pizza
    </span>
    
        </h1>
        <p className="my-4 text-gray-500 text-sm">
    Pizza is the missing peice that make every day complete, a simple yet delicious joy in life
        </p>
    <div className="flex gap-4">
    <button className="bg-primary flex gap-2 text-white py-2 px-4 rounded-full">
    Order now 
    <Right/>
    </button>

    <button className="text-gray-600 flex gap-2 py-2 font-semibold">
      Learn more
      <Right />
      </button>
    </div>
 
      </div>

      <div className="relative">
    <Image src={'/pizza.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'} />
      </div>
    </section>
  )
}