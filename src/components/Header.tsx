import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import { useState } from 'react'

import logoImage from '../assets/logo.svg'
import { useCart } from '../hooks/useCart'
import { theme } from '../styles'
import {
  ButtonContainer,
  CartButton,
  Header,
  ProductCounter,
} from '../styles/pages/app'
import { Menu } from './Menu'

export function HeaderComponent() {
  const [openMenu, setOpenMenu] = useState(false)
  const { cartState } = useCart()

  const amount = cartState.products.length

  return (
    <>
      <Header>
        <Link href="/">
          <Image src={logoImage} alt="" />
        </Link>

        <ButtonContainer
          onClick={() => {
            setOpenMenu((state) => !state)
          }}
        >
          <CartButton>
            <Handbag
              size={24}
              color={theme.colors.gray400.value}
              weight="bold"
            />
          </CartButton>

          {amount > 0 && <ProductCounter>{amount}</ProductCounter>}
        </ButtonContainer>
      </Header>

      <Menu
        open={openMenu}
        onClose={() => {
          setOpenMenu(false)
        }}
      />
    </>
  )
}
