import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { cn } from '@/lib/utils'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const isWatch = location.pathname.startsWith('/watch')

  return (
    <div className="min-h-svh bg-background text-foreground">
      <Header onMenuClick={() => setSidebarOpen((v) => !v)} />
      <Sidebar collapsed={!sidebarOpen || isWatch} mini={isWatch || !sidebarOpen} />
      <main
        className={cn('pt-14', isWatch || !sidebarOpen ? 'md:pl-[72px]' : 'md:pl-60')}
      >
        <Outlet />
      </main>
    </div>
  )
}
