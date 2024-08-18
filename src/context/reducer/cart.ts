export type Product = {
  id: string
  name: string
  imageUrl: string
  price: number
  description: string
  defaultPriceId: string
}

type AddAction = {
  type: 'ADD_TO_CART'
  payload: {
    product: Product
  }
}

type RemoveAction = {
  type: 'REMOVE_FROM_CART'
  payload: {
    productID: Product['id']
  }
}

export type CartState = {
  products: Product[]
}

export type CartActions = AddAction | RemoveAction

export function CartReducer(state: CartState, action: CartActions): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const productAlreadyInCart =
        state.products.findIndex(
          (product) => product.id === action.payload.product.id,
        ) !== -1

      if (productAlreadyInCart) {
        return state
      }

      return {
        products: [...state.products, action.payload.product],
      }
    }

    case 'REMOVE_FROM_CART': {
      const filteredProducts = state.products.filter(
        (product) => product.id !== action.payload.productID,
      )

      return {
        products: filteredProducts,
      }
    }

    default: {
      return state
    }
  }
}
