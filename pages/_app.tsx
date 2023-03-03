import '@/styles/globals.css'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { goerli, polygonMumbai } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import type { AppProps } from 'next/app'

const { chains, provider } = configureChains(
  [goerli, polygonMumbai],
  [publicProvider()]
)
 
const client = createClient({
  autoConnect: true,
  provider,
  connectors: [
    new MetaMaskConnector({ chains })
  ]
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
