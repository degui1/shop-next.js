import axios from 'axios'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { useState } from 'react'

import { useCart } from '../hooks/useCart'
import { theme } from '../styles'
import {
  CartContainer,
  CartItem,
  CloseContainer,
  ImageContainer,
  MenuContainer,
  Resume,
  TotalContainer,
} from '../styles/components/Menu'

interface MenuProps {
  open: boolean
  onClose: () => void
}

export function Menu({ open, onClose }: MenuProps) {
  const variant = open ? 'opened' : 'closed'

  const { cartState, RemoveFromCart } = useCart()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const amount = cartState.products.length

  const totalPrice = cartState.products.reduce((previous, current) => {
    console.log(current.price)
    return (previous += Number(current.price))
  }, 0)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const pricesId = cartState.products.map(
        (product) => product.defaultPriceId,
      )

      const response = await axios.post('/api/checkout', {
        priceId: pricesId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      // Conectar com uma ferratementa de observabilidade (Datadog/sentry)

      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <MenuContainer variant={variant}>
      <CloseContainer>
        <button onClick={() => onClose()}>
          <X size={24} color={theme.colors.gray100.value} />
        </button>
      </CloseContainer>

      <h1>Sacola de compras</h1>

      <CartContainer>
        {cartState.products.map((product) => {
          return (
            <CartItem key={product.id}>
              <ImageContainer>
                <Image src={product.imageUrl} width={95} height={95} alt="" />
              </ImageContainer>

              <div>
                <h2>{product.name}</h2>

                <p>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(product.price)}
                </p>
                <span onClick={() => RemoveFromCart(product.id)}>Remover</span>
              </div>
            </CartItem>
          )
        })}
      </CartContainer>

      <TotalContainer>
        <div>
          <Resume variant={'amount'}>
            Quantidade
            <span>{amount} itens</span>
          </Resume>
          <Resume variant={'total'}>
            Valor total
            <span>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(totalPrice)}
            </span>
          </Resume>
        </div>

        <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
          Finalizar compra
        </button>
      </TotalContainer>
    </MenuContainer>
  )
}
