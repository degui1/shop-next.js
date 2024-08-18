import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
// import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Stripe from 'stripe'

import { useCart } from '../../hooks/useCart'
import { stripe } from '../../lib/stripe'
import {
  BuyButton,
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const { AddToCart, checkIfAlreadyInCart } = useCart()

  const isAlreadyInCart = checkIfAlreadyInCart(product.id)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: [product.defaultPriceId],
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      // Conectar com uma ferratementa de observabilidade (Datadog/sentry)

      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout')
    }
  }

  function handleAddToCart() {
    AddToCart(product)
  }

  return (
    <>
      {/* <Head>
        <title>{product.name} | Ignite shop</title>
      </Head> */}
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={520} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(product.price)}
          </span>

          <p>{product.description}</p>

          <div>
            <BuyButton
              variant="BUY"
              disabled={isCreatingCheckoutSession}
              onClick={handleBuyProduct}
            >
              Comprar agora
            </BuyButton>

            <BuyButton
              variant="ADDToCart"
              disabled={isAlreadyInCart}
              onClick={handleAddToCart}
            >
              Adicionar a sacola
            </BuyButton>
          </div>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_Qeb5pTO0NxPs1s' } }],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params.id as string

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount / 100,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
