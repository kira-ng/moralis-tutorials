import Moralis from 'moralis'

const future = new Date()
future.setDate(future.getDate() + 30)

const config = {
  domain: process.env.APP_DOMAIN,
  statement: 'Please sign this message to confirm your identity.',
  uri: process.env.NEXTAUTH_URL,
  expirationTime: future.toISOString(),
  timeout: 60,
}

export default async function handler(req, res) {
  // reading  address, chain and network params from the request
  const { address, chain, network } = req.body
  // starting the Moralis SDK
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })

  try {
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      network,
      ...config,
    })

    res.status(200).json(message)
  } catch (error) {
    res.status(400).json({ error })
    console.error(error)
  }
}
