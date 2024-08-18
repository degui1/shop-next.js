import { createContext, useReducer } from 'react'

import { CartReducer, CartState, Product } from './reducer/cart'

type CartContextProps = {
  cartState: CartState
  AddToCart: (product: Product) => void
  RemoveFromCart: (productID: Product['id']) => void
  checkIfAlreadyInCart: (productID: Product['id']) => boolean
}

export const CartContext = createContext({} as CartContextProps)

type CartProviderProps = {
  children: React.ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartState, DispatchCartState] = useReducer(CartReducer, {
    products: [],
  })

  const AddToCart = (product: Product) => {
    DispatchCartState({
      type: 'ADD_TO_CART',
      payload: {
        product,
      },
    })
  }

  const RemoveFromCart = (productID: Product['id']) => {
    DispatchCartState({
      type: 'REMOVE_FROM_CART',
      payload: {
        productID,
      },
    })
  }

  function checkIfAlreadyInCart(productId: Product['id']) {
    return cartState.products.some((product) => product.id === productId)
  }

  return (
    <CartContext.Provider
      value={{ cartState, AddToCart, RemoveFromCart, checkIfAlreadyInCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
