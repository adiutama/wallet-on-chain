import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useConnect } from 'wagmi'
import Modal from '../modal'

export default function ConnectButton() {
  const { connect, connectors } = useConnect()

  return (
    <>
      <label htmlFor="connect" className="btn" >Connect Wallet</label>
      <Modal id="connect" title="Connect a Wallet" className="w-72">
        <div className="flex flex-col gap-4">
          {connectors.map((connector, index) => (
            <button key={index} className="btn btn-outline btn-block gap-2" onClick={e => connect({ connector })}>
              <Icon icon="logos:metamask-icon" />
              {connector.name}
            </button>
          ))}
        </div>
      </Modal>
    </>
  )
}