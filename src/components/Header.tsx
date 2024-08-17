import Image from 'next/image'
import { Handbag } from 'phosphor-react'
import { useContext, useState } from 'react'

import logoImage from '../assets/logo.svg'
import { CartContext } from '../context/CartContext'
import { theme } from '../styles'
import { CartButton, Header } from '../styles/pages/app'
import { Menu } from './Menu'

export function HeaderComponent() {
  const [openMenu, setOpenMenu] = useState(false)
  const { amount } = useContext(CartContext)
  return (
    <>
      <Header>
        <Image src={logoImage} alt="" />

        <CartButton
          variant={'filled'}
          onClick={() => {
            setOpenMenu((state) => !state)
          }}
        >
          <span>{amount}</span>
          <Handbag size={24} color={theme.colors.gray400.value} />
        </CartButton>
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
