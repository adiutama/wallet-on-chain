import { ReactEventHandler, ReactNode } from "react"
import { createPortal } from "react-dom"

type ModalProps = {
  selector?: string,
  children: ReactNode,
  onClose?: ReactEventHandler,
  className?: string,
  backdropClassName?: string,
  wrapperClassName?: string,
}

export default function Modal({ selector = "body", children, onClose, className, backdropClassName, wrapperClassName }: ModalProps) {
  const element = document.querySelector(selector)!

  return createPortal(
    <div className={`absolute top-0 left-0 w-screen h-screen flex justify-center items-center ${wrapperClassName}`}>
      <div className={`absolute w-full h-full bg-black bg-opacity-10 ${backdropClassName}`} onClick={onClose} />
      <div className={`rounded-lg border shadow-md bg-white z-10 overflow-hidden ${className}`}>
        {children}
      </div>
    </div>,
    element
  )
}