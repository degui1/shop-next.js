import { createContext, useState } from 'react'

type CartContextProps = {
  amount: number
  setAmount: React.Dispatch<React.SetStateAction<number>>
}

export const CartContext = createContext({} as CartContextProps)

type CartProviderProps = {
  children: React.ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [amount, setAmount] = useState(0)

  return (
    <CartContext.Provider value={{ amount, setAmount }}>
      {children}
    </CartContext.Provider>
  )
}
