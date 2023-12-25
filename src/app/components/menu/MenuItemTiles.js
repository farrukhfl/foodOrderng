export default function MenuItemTiles({onAddToCart, ...item}){

const {image, name, description, basePrice, sizes, extraIngridiectPrices} = item

  return(
    <div className="bg-gray-200 rounded-lg p-4 text-center group hover:bg-white hover:shadow-md hover:shadow-black/25">
      <div className="text-center">
          <img src="/pizza.png" alt="pizza" className="max-h-auto max-h-24 block mx-auto"/>
          </div>
          <h4 className="font-semibold text-xl my-3">Pepperoni Pizza</h4>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            nihil.
          </p>
          <button type="button" onClick={onAddToCart} className="bg-primary rounded-full mt-4 text-white px-8 py-2 ">
            {(sizes?.length > 0 || extraIngridiectPrices?.length > 0) ? (
              <span>From ${basePrice}</span>
            ) : (
              <span>
                Add to Cart ${basePrice}
              </span>
            )

          }
            Add to Cart $12
          </button>
        </div>
  )
}