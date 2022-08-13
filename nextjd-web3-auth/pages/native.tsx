import React, { FC } from 'react'
import Moralis from 'moralis'
import { EvmChain } from '@moralisweb3/evm-utils'

const Native: FC = ({ nativeBalance, address }: any) => {
  return (
    <div>
      <h3>Wallet: {address}</h3>
      <h3>Native Balance: {nativeBalance} ETH</h3>
    </div>
  )
}

// This gets called on every page render
export async function getServerSideProps() {
  // reads the api key from .env.local and starts Moralis SDK
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })

  const address = process.env.ADDRESS || ''

  const chain = EvmChain.ROPSTEN

  const nativeBalance = await Moralis.EvmApi.account.getNativeBalance({
    address,
    chain,
  })

  return {
    props: {
      address,
      // Return the native balance formatted in ether via the .ether getter
      nativeBalance: nativeBalance.result.balance.ether,
    },
  }
}

export default Native
