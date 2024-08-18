import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

import { stripe } from '../../lib/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { priceId } = req.body

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' })
  }

  // if (!priceId) {
  //   res.status(400).json({ error: 'Price not found.' })
  // }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  if (!Array.isArray(priceId)) {
    res.status(400).json({ error: 'Expected an array of prices' })
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = (
    priceId as Array<string>
  ).map((id) => {
    return {
      price: id,
      quantity: 1,
    }
  })

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: lineItems,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
