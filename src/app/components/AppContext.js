'use client'
import {SessionProvider} from 'next-auth/react'
import { createContext } from 'react'

export const CartContext = createContext({})

export function cartProductPrice(cartProduct){
  let price = cartProduct.basePrice
  if(cartProduct.size){
    price += cartProduct.size.price
  }
  if(cartProduct.extras.length > 0 ){
    for (const extra of cartProduct.extras){
      price += extra.price
    }
    
  }
  return price
}


export function AppProvider({children}){
  const [cartProducts, setCartProducts] = useState([])




const ls = typeof window !== 'undefined' ? window.localStorage : null

useEffect(() => {
  if(ls && ls.getItem('cart')){
    setCartProducts(JSON.parse(ls.getItem('cart')))
  }
}, [])


function saveCartProductToLocalStorage(cartProducts){
  if(ls){
    ls.setItem('cart', JSON.stringify(cartProducts))
  }
}

function clearCart(){
  setCartProducts([])
  saveCartProductToLocalStorage([])
}
function removeCart(indexToDelete){
  setCartProducts(prevCartProduct=>{
    const newCartProduct = prevCartProduct.filter((v,index)=> index !== indexToDelete)
    saveCartProductToLocalStorage(newCartProduct)
    return newCartProduct
  })
}



function addToCart(product, size=null, extras=[]){
  setCartProducts(prevProducts=> {
    const cartProduct = {...product, size, extras}
    const newProduct = [...prevProducts, cartProduct]
    saveCartProductToLocalStorage(newProduct)
    return newProduct
  })
}


  return(
    <SessionProvider>
      <CartContext.Provider value={{
        cartProducts, setCartProducts,
        addToCart, removeCart, clearCart
      }}>
      {children}
      </CartContext.Provider>
      </SessionProvider>
  )
}