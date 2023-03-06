import { EventHandler, MouseEventHandler, ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"

type ModalProps = {
  id: string,
  title?: string,
  children: ReactNode,
  className?: string,
  target?: string,
  onOpen?: () => void,
  onClose?: () => void,
}

export default function Modal({ id, title, children, className, onOpen, onClose, target = "body"}: ModalProps) {
  const [opened, setOpened] = useState(false)
  const element = document.querySelector(target)!

  useEffect(() => {
    if (opened) {
      onOpen?.()
    } else {
      onClose?.()
    }
  }, [opened])

  return createPortal(
    <>
      <input type="checkbox" id={id} onChange={e => setOpened(e.target.checked)} className="modal-toggle" />
      <div className="modal">
        <div className={`modal-box relative ${className}`}>
          <div className="flex flex-row-reverse justify-between mb-6">
            <label htmlFor={id} className="btn btn-xs btn-circle btn-outline">✕</label>
            {title && (
              <h3 className="text-lg font-bold">{title}</h3>
            )}
          </div>

          {children}
        </div>
      </div>
    </>,
    element
  )
}