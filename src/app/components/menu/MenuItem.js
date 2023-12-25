import { useContext, useState } from "react"
import { CartContext } from "../AppContext"
import toast from "react-hot-toast"
import MenuItemTiles from "./MenuItemTiles"
import Image from "next/image"

export default function MenuItem(menuItem){
const {image, name, description, basePrice,sizes, extraIngredientPrices,
} = menuItem
const [showPopup, setShowPopup] = useState(false)
const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null)
const [selectedExtras, setselectedExtras] = useState([])

function handleAddtoCartButton(){
const hasOptions = sizes.length > 0 || extraIngredientPrices > 0

if(hasOptions && !showPopup){
setShowPopup(true)
return;
}
addToCart(menuItem, selectedSize, selectedExtras)

setShowPopup(false)
toast.success('Added to Cart')
}

function handleExtraThingClick(ev, extraThing){
  const checked = ev.target.checked;
  if(checked){
    setSelectedSize(prev => [...prev , extraThing])
  }else {
    setselectedExtras(prev => {
return prev.filter(e => e.name !== extraThing.name) 
    })
  }
}

let selectedPrice = basePrice;
if(selectedSize){
  selectedPrice += selectedSize.price
}
if(selectedExtras?.length > 0){
  for(const extra of selectedExtras){
    selectedPrice += extra.price
  }
}

const {addToCart} = useContext(CartContext)
  return(
    <>
    {
      showPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center" onClick={()=> setShowPopup(false)}>
          <div onClick={ev => ev.stopPropagation()} className=" my-8bg-white p-4 ronded-lg max-w-md">

            <div className="overflow-y-scroll p-2"
            style={{maxHeight: 'calc(100vh - 100px)'}}
            >

            
        <Image src={image} alt={name} width={300} height={200} className="mx-auto" />
          <h3 className="text-lg font-bold text-center">{name}</h3>
          <p className="">{description}</p>
          {sizes.length > 0 &&(
            <div className="py-2">
              <h3 className="text-center text-gray-800">Pick your sizes</h3>
{sizes.map((size)=> (
  <label className="flex item-center gap-2 p-4 border rounded-md mb-1">
    <input type="radio" name="size" onClick={()=> setSelectedSize(size)}checked={selectedSize?.name === size.name}/>
    {size.name} ${basePrice + size.price}
  </label>
))}
            </div>
          )}

          {extraIngredientPrices?.length > 0 && (
            <div className="py-2">
              <h3 className="text-center text-gray-800">Pick your sizes</h3>
{extraIngredientPrices.map(extraThing=> (
  <label className="flex item-center gap-2 p-4 border rounded-md mb-1">
    <input type="checkBox" name={extraThing.name} onClick={ev => handleExtraThingClick(ev, extraThing)}/>
    {extraThing.name} + ${extraThing.price}
  </label>
))}
            </div>
          )}
          <button onClick={handleAddtoCartButton} type="button" className="primary">
          Add to cart ${selectedPrice}
          </button>
          <button onClick={()=> setShowPopup(false)}>
            Cancel
          </button>
          </div>
          </div>
        </div>
      )
    }
    <MenuItemTiles onAddToCart={handleAddtoCartButton}{...menuItem} />
    
        </>
  )
  }