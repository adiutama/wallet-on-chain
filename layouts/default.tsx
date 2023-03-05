import { ReactNode } from 'react'
import { useAccount } from 'wagmi'
import ConnectButton from '@/components/button/connect'
import ClientOnly from '@/components/client-only'

type PublicLayoutProps = {
  children: ReactNode | ReactNode[]
}

export default function DefaultLayout({ children }: PublicLayoutProps) {
  const { isConnected } = useAccount()

  return (
    <div className="bg-base-200">
      <div className="max-w-screen-sm h-screen mx-auto bg-white overflow-x-hidden overflow-y-auto">
        <ClientOnly>
          {
            isConnected
              ? children
              : (
                <div className="h-full flex justify-center items-center">
                  <ConnectButton />
                </div>
              )
          }
        </ClientOnly>
      </div>
    </div>
  )
}