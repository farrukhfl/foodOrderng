'use client'

import { useContext } from "react"
import { CartContext, cartProductPrice } from "../components/AppContext"
import SectionHeader from "../components/layout/SectionHeader"
import Image from "next/image"
import AddressInputs from "../components/layout/AddressInput"
import { UseProfile } from "../components/UseProfile"

export default function CartPage() {
  const {cartProducts, removeCart }= useContext(CartContext)
  const [address, setaddress] = useState({})
  const {data: profileData} = UseProfile()

  useEffect(() => {
      if(profileData?.city){
        const {phone, setaddress, city, postalCode, country} = profileData
        const addressFromProfile = {phone, setaddress, city, postalCode, country} 
        setaddress(addressFromProfile)
      }
  }, [profileData])
  

  let total = 0
  for (const p of cartProducts){
    total += cartProductPrice(p)
  }

function handleAddressChange(propName, value){
  setaddress(prevAddress=> ({...prevAddress, [propName]:value}))
}

  return(
    <section className="mt-8">
      <div className="text-center">
    <SectionHeader mainHeader={Cart} />
      </div>
    <div className="mt-4 grid gap-4 grid-cols-2">
    <div>
    {cartProducts?.length === 0 && (
      <div>No Product Found in shopping cart</div>
    )}
    {cartProducts.length > 0 && cartProducts.map((product, index) => (
      <div className="flex items-center gap-4 mb-2 border-b py-2">
        <div className="w-24">
      <Image src={product.image} width={240} height={240} alt="Pizza" />
        </div>
        <div>
<h3> {product.name}</h3>
{product.size && (
  <div className="text-sm">
    Size: <span>{product.size.name}</span>
  </div>
)}
{product.extras?.length > 0 && (
  <div className="text-sm text-gray-500">
{product.extras.map(extra => (
  <div>{extra.name} ${extra.price}</div>
) )}

  </div>
)}
        </div>

        <div className="text-lg font-semibold">
      {cartProductPrice(product)}
        </div>
        <div className="ml-2 ">
  <button type="button" onClick={()=> removeCart(index)}>Remove</button>
        </div>
       
      </div>
    ))}
    <div className="py-4 text-right pr-16">
      <span className="text-gray-500">Subtotal</span>
      <span className="text-lg font-semibold pl-2">
      ${total}
      </span>
    
    </div>
    </div>


    <div className="bg-gray-100 p-4 rounded-lg">
  <h2>Checkout</h2>
  <form>
    <label>Address</label>  
    <AddressInputs addressProps={address} setAddressProp={handleAddressChange} />
    <button type="submit">Pay {total}</button>
  </form>

    </div>
    </div>

    </section>
  )
}