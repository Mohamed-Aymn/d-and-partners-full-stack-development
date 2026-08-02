import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { DeviceTv, Home, Movie, User } from 'tabler-icons-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function SidebarItem({
  to,
  icon,
  label,
  end,
}: {
  to: string
  icon: ReactNode
  label: string
  end?: boolean
}) {

  return (
    <Button
      variant="ghost"
      className={`
        font-normal
        h-auto w-16 flex-col gap-1 rounded-lg py-4 text-[10px]
      `}
      asChild
    >
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) => cn(isActive && 'bg-accent font-medium')}
      >
        <span className="flex size-6 shrink-0 items-center justify-center [&_svg]:size-5">
          {icon}
        </span>
        <span className={"max-w-full px-1"}>
          {label}
        </span>
      </NavLink>
    </Button>
  )
}

export function Sidebar() {

  const items = [
    { to: '/', label: 'Home', icon: <Home />, end: true },
    { to: '/shorts', label: 'Shorts', icon: <Movie /> },
    {
      to: '/subscriptions',
      label: 'Subs',
      icon: <DeviceTv />,
    },
    { to: '/channel/mkbhd', label: 'You', icon: <User /> },
  ]

  return (
    <aside
      className={
        'fixed bottom-0 left-0 top-14 z-40 hidden flex-col bg-background md:flex'
      }
    >

      {items.map((item) => (
        <SidebarItem
          key={item.to}
          to={item.to}
          label={item.label}
          icon={item.icon}
          end={item.end}
        />
      ))}
    </aside>
  )
}
