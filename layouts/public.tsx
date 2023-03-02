import { ReactNode } from 'react'

type PublicLayoutProps = {
  children: ReactNode | ReactNode[]
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  )
}