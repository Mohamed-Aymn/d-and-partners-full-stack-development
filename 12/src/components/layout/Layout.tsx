import { Outlet } from 'react-router-dom'
import { Header } from '@/components/layout/Header/Header'
import { Sidebar } from '@/components/layout/Sidebar'

export function Layout() {

  return (
    <div className="min-h-svh bg-background text-foreground">
      <Header />
      <Sidebar />
      <main
        className={'pt-14'}
      >
        <Outlet />
      </main>
    </div>
  )
}
