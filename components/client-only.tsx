import { ReactNode } from 'react'
import dynamic from 'next/dynamic'

type ClientOnlyProps = {
  children: ReactNode | ReactNode[]
}

function ClientOnly({ children }: ClientOnlyProps) {
  return <>{children}</>
}

export default dynamic(() => Promise.resolve(ClientOnly), { ssr: false })