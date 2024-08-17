import { AppProps } from 'next/app'

import { HeaderComponent } from '../components/Header'
import { CartProvider } from '../context/CartContext'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Container>
        <CartProvider>
          <HeaderComponent />

          <Component {...pageProps} />
        </CartProvider>
      </Container>
    </>
  )
}
