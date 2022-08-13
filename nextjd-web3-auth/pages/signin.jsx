import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi'
import { signIn, useSession } from 'next-auth/react'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useRouter } from 'next/router'
import axios from 'axios'

function SignIn() {
  const { connectAsync } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { data } = useSession()
  const { push } = useRouter()

  const handleAuth = async () => {
    //disconnects the web3 provider if it's already active
    if (isConnected) {
      await disconnectAsync()
    }
    // enabling the web3 provider metamask
    const { account, chain } = await connectAsync({ connector: new InjectedConnector() })

    const userData = { address: account, chain: chain.id, network: 'evm' }
    // making a post request to our 'request-message' endpoint
    const { data } = await axios.post('/api/auth/request-message', userData, {
      headers: {
        'content-type': 'application/json',
      },
    })

    const message = data.message
    // signing the received message via metamask
    const signature = await signMessageAsync({ message })

    // redirect user after success authentication to '/user' page
    const { url } = await signIn('credentials', {
      message,
      signature,
      redirect: false,
      callbackUrl: '/user',
    })
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    push(url)
  }

  return (
    <div>
      <h3>Web3 Authentication</h3>
      <button onClick={() => handleAuth()}>Authenticate via Metamask</button>
    </div>
  )
}

export default SignIn
