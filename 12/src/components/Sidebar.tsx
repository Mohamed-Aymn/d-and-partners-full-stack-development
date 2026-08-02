import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { DeviceTv, Home, Movie, User } from 'tabler-icons-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SidebarProps = {
  collapsed: boolean
  mini?: boolean
}

function SidebarItem({
  to,
  icon,
  label,
  size = 'large',
  end,
}: {
  to: string
  icon: ReactNode
  label: string
  size?: 'large' | 'small'
  end?: boolean
}) {
  const isLarge = size === 'large'

  return (
    <Button
      variant="ghost"
      className={cn(
        'font-normal',
        isLarge
          ? 'h-10 w-full justify-start gap-6 rounded-lg px-3'
          : 'h-auto w-16 flex-col gap-1 rounded-lg py-4 text-[10px]',
      )}
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
        <span className={isLarge ? `truncate` : 'max-w-full px-1'}>
          {label}
        </span>
      </NavLink>
    </Button>
  )
}

export function Sidebar({ collapsed, mini = false }: SidebarProps) {
  const isMini = mini || collapsed

  const items = [
    { to: '/', label: 'Home', icon: <Home />, end: true },
    { to: '/shorts', label: 'Shorts', icon: <Movie /> },
    {
      to: '/subscriptions',
      label: isMini ? 'Subs' : 'Subscriptions',
      icon: <DeviceTv />,
    },
    { to: '/channel/mkbhd', label: 'You', icon: <User /> },
  ]

  return (
    <aside
      className={cn(
        'fixed bottom-0 left-0 top-14 z-40 hidden flex-col bg-background md:flex',
        isMini ? 'w-[72px] items-center py-1' : 'w-60 px-3 py-3',
      )}
    >

      {items.map((item) => (
        <SidebarItem
          key={item.to}
          to={item.to}
          label={item.label}
          icon={item.icon}
          size={isMini ? 'small' : 'large'}
          end={item.end}
        />
      ))}
    </aside>
  )
}
