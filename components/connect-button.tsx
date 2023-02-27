import { useState } from "react"
import { Icon } from "@iconify/react"
import Modal from "./modal"

export default function ConnectButton() {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <button className="btn" onClick={() => setExpanded(!expanded)}>Connect Wallet</button>

      {expanded && (
        <Modal className="w-72" onClose={() => setExpanded(false)}>
          <div className="p-4 flex flex-row justify-between items-center">
            <h2 className="font-bold">Connect a Wallet</h2>
            <button className="btn btn-circle btn-outline btn-ghost btn-xs" onClick={() => setExpanded(false)}>
              <Icon icon="material-symbols:close" />
            </button>
          </div>

          <ul className="menu">
            <li>
              <a href="#" onClick={e => e.preventDefault()}>
                <Icon icon="logos:metamask-icon" /> Metamask
              </a>
            </li>
          </ul>
        </Modal>
      )}
    </>
  )
}