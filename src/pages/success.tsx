import { GetServerSideProps } from 'next'
// import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

import { stripe } from '../lib/stripe'
import {
  ImageContainer,
  ImageSection,
  SuccessContainer,
} from '../styles/pages/success'

interface SuccessProps {
  customerName: string
  products: {
    name: string
    imageUrl: string
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const amountProducts = products.length

  return (
    <>
      {/* <Head>
        <title>Compra efetuada | Ignite shop</title>

        <meta name="robots" content="noindex" />
      </Head> */}
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageSection>
          {products.map((product) => {
            return (
              <ImageContainer key={product.imageUrl}>
                <Image src={product.imageUrl} width={120} height={110} alt="" />
              </ImageContainer>
            )
          })}
        </ImageSection>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de
          <strong> {amountProducts} camiseta(s)</strong> já está a caminho da
          sua casa.
        </p>

        <Link href="/">Voltar ao catágolo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      // notFound: true,
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details.name

  const products = session.line_items.data.map((items) => {
    const product = items.price.product as Stripe.Product
    return {
      name: product.name,
      imageUrl: product.images[0],
    }
  })

  return {
    props: {
      customerName,
      products,
    },
  }
}
