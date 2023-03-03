import { useAccount, useBalance, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi'
import truncateEthAddress from 'truncate-eth-address'
import ConnectButton from '@/components/button/connect'
import ClientOnly from '@/components/client-only'
import PublicLayout from '@/layouts/public'

export default function Home() {
  const { address, connector, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { chains, switchNetwork } = useSwitchNetwork()
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
              <div className="stat-value">{address ? truncateEthAddress(address) : ''}</div>
              <div className="stat-desc">via {connector?.name}</div>
              <div className="stat-actions">
                <button className="btn" onClick={() => disconnect()}>Disconnect</button>
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Balance</div>
              <div className="stat-value">{data?.formatted} {data?.symbol}</div>
              <div className="stat-actions">
                <select
                  className="select select-bordered w-full max-w-xs"
                  value={chain?.id}
                  onChange={e => switchNetwork?.(Number(e.target.value))}
                >
                  {chains.map((chain, index) => (
                    <option key={index} value={chain.id}>{chain.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </PublicLayout>
      )}
    </ClientOnly>
  )
}
