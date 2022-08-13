import { getSession } from 'next-auth/react'
import Moralis from 'moralis'
import { EvmChain } from '@moralisweb3/evm-utils'

function Protected({ content, nftList }) {
  return (
    <div>
      <h3>Protected content</h3>
      <p>{content}</p>
      <pre>{JSON.stringify(nftList, null, 2)}</pre>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { user } = await getSession(context)

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })

  const chain = EvmChain.ROPSTEN

  const nftList = await Moralis.EvmApi.account.getNFTs({
    address: user.address,
    chain, // NFT contract you want to use for NFT gating
  })

  return {
    props: {
      content:
        // if user has at least one NFT he will get protected content
        nftList.raw.total > 0
          ? "You have our NFT. So you can get my secret now - I'm a mage"
          : 'To see protected content you need to be logged in and have our NFT',
      nftList: nftList.raw.result,
    },
  }
}

export default Protected
