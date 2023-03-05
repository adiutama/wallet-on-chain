import { useAccount, useBalance, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi'
import truncateEthAddress from 'truncate-eth-address'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Icon } from '@iconify/react'
import Davatar from '@davatar/react'
import DefaultLayout from '@/layouts/default'

export default function Home() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { chains, switchNetwork } = useSwitchNetwork()
  const { data } = useBalance({ address })
  const { disconnect } = useDisconnect()

  return (
    <DefaultLayout>
      <div className="mb-8">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-outline m-4 text-lg">
            <Icon icon="mdi:internet" />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li className="menu-title">
              <span>Networks</span>
            </li>

            {chains.map((item, index) => (
              <li key={index}>
                <a className={[item.id === chain?.id && 'active'].join(' ')} onClick={() => switchNetwork?.(item.id)}>{item.name}</a>
              </li>
            ))}

            <li className="menu-title">
              <span>Action</span>
            </li>

            <li>
              <a onClick={() => disconnect()}>Disconnect</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="avatar py-6">
          <Davatar size={64} address={`${address}`} />
        </div>
        <div className="flex flex-row text-base-content">
          <div>{truncateEthAddress(`${address}`)}</div>
          <CopyToClipboard text={`${address}`}>
            <button className="btn btn-ghost btn-xs">
              <Icon icon="bx:copy" />
            </button>
          </CopyToClipboard>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Balance</div>
          <div className="stat-value">{`${data?.formatted} ${data?.symbol}`}</div>
        </div>
      </div>
    </DefaultLayout>
  )
}
