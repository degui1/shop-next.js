import Image from 'next/image'
import { X } from 'phosphor-react'

import Camisa from '../assets/camisa.png'
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

  return (
    <MenuContainer variant={variant}>
      <CloseContainer>
        <button onClick={() => onClose()}>
          <X size={24} color={theme.colors.gray100.value} />
        </button>
      </CloseContainer>

      <h1>Sacola de compras</h1>

      <CartContainer>
        <CartItem>
          <ImageContainer>
            <Image src={Camisa.src} width={95} height={95} alt="" />
          </ImageContainer>

          <div>
            <h2>Camiseta x</h2>

            <p>R$ 79,90</p>
            <span>Remover</span>
          </div>
        </CartItem>
        <CartItem>
          <ImageContainer>
            <Image src={Camisa.src} width={95} height={95} alt="" />
          </ImageContainer>

          <div>
            <h2>Camiseta x</h2>

            <p>R$ 79,90</p>
            <span>Remover</span>
          </div>
        </CartItem>
        <CartItem>
          <ImageContainer>
            <Image src={Camisa.src} width={95} height={95} alt="" />
          </ImageContainer>

          <div>
            <h2>Camiseta x</h2>

            <p>R$ 79,90</p>
            <span>Remover</span>
          </div>
        </CartItem>
      </CartContainer>

      <TotalContainer>
        <div>
          <Resume variant={'amount'}>
            Quantidade
            <span>3 itens</span>
          </Resume>
          <Resume variant={'total'}>
            Valor total
            <span>R$270,00</span>
          </Resume>
        </div>
        <button>Finalizar compra</button>
      </TotalContainer>
    </MenuContainer>
  )
}
