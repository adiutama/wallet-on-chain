import { useAccount, useBalance, useDisconnect } from 'wagmi'
import ConnectButton from '@/components/button/connect'
import ClientOnly from '@/components/client-only'
import PublicLayout from '@/layouts/public'

export default function Home() {
  const { address, connector, isConnected } = useAccount()
  const { data } = useBalance({ address })
  const { disconnect } = useDisconnect()

  return (
    <ClientOnly>
      {!isConnected ? (
        <PublicLayout>
          <ConnectButton />
        </PublicLayout>
      ): (
        <PublicLayout>
          <div className="stats">
            <div className="stat">
              <div className="stat-title">Connected to</div>
              <div className="stat-value">{connector?.name}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Balance</div>
              <div className="stat-value">{data?.formatted} {data?.symbol}</div>
            </div>
          </div>

          <div className="mt-8">
            <button className="btn" onClick={() => disconnect()}>Disconnect</button>
          </div>
        </PublicLayout>
      )}
    </ClientOnly>
  )
}
