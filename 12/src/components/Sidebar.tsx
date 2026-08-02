import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Clock,
  DeviceTv,
  History,
  Home,
  Movie,
  Playlist,
  ThumbUp,
  User,
} from 'tabler-icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { channels } from '@/data/videos'
import { cn } from '@/lib/utils'

type SidebarProps = {
  collapsed: boolean
  mini?: boolean
}

function NavItem({
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
      className="h-10 w-full justify-start gap-6 rounded-lg px-3 font-normal"
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
        <span className="truncate">{label}</span>
      </NavLink>
    </Button>
  )
}

function StaticItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Button
      type="button"
      variant="ghost"
      className="h-10 w-full justify-start gap-6 rounded-lg px-3 font-normal"
    >
      <span className="flex size-6 shrink-0 items-center justify-center [&_svg]:size-5">
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </Button>
  )
}

function MiniItem({
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
      className="h-auto w-16 flex-col gap-1 rounded-lg py-4 text-[10px] font-normal"
      asChild
    >
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) => cn(isActive && 'font-medium')}
      >
        <span className="flex size-6 items-center justify-center [&_svg]:size-5">
          {icon}
        </span>
        <span className="truncate px-1">{label}</span>
      </NavLink>
    </Button>
  )
}

function MiniStatic({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Button
      type="button"
      variant="ghost"
      className="h-auto w-16 flex-col gap-1 rounded-lg py-4 text-[10px] font-normal"
    >
      <span className="flex size-6 items-center justify-center [&_svg]:size-5">
        {icon}
      </span>
      <span className="truncate px-1">{label}</span>
    </Button>
  )
}

export function Sidebar({ collapsed, mini = false }: SidebarProps) {
  const subs = Object.values(channels).slice(0, 5)

  if (mini || collapsed) {
    return (
      <aside className="fixed bottom-0 left-0 top-14 z-40 hidden w-[72px] flex-col items-center bg-background py-1 md:flex">
        <MiniItem to="/" end label="Home" icon={<Home />} />
        <MiniStatic label="Shorts" icon={<Movie />} />
        <MiniStatic label="Subs" icon={<DeviceTv />} />
        <MiniItem to="/channel/mkbhd" label="You" icon={<User />} />
      </aside>
    )
  }

  return (
    <aside className="fixed bottom-0 left-0 top-14 z-40 w-60 bg-background">
      <ScrollArea className="h-full px-3 py-3">
        <nav className="flex flex-col gap-0.5">
          <NavItem to="/" end label="Home" icon={<Home />} />
          <StaticItem label="Shorts" icon={<Movie />} />
          <StaticItem label="Subscriptions" icon={<DeviceTv />} />
        </nav>

        <Separator className="my-3" />

        <nav className="flex flex-col gap-0.5">
          <Button
            variant="ghost"
            className="h-10 w-full justify-start gap-2 rounded-lg px-3 text-base font-medium"
            asChild
          >
            <NavLink to="/channel/mkbhd">
              You
              <span className="text-lg leading-none">›</span>
            </NavLink>
          </Button>
          <NavItem to="/channel/mkbhd" label="Your channel" icon={<User />} />
          <StaticItem label="History" icon={<History />} />
          <StaticItem label="Playlists" icon={<Playlist />} />
          <StaticItem label="Watch later" icon={<Clock />} />
          <StaticItem label="Liked videos" icon={<ThumbUp />} />
        </nav>

        <Separator className="my-3" />

        <div>
          <h3 className="px-3 pb-1 text-base font-medium">Subscriptions</h3>
          <nav className="flex flex-col gap-0.5">
            {subs.map((channel) => (
              <Button
                key={channel.id}
                variant="ghost"
                className="h-10 w-full justify-start gap-6 rounded-lg px-3 font-normal"
                asChild
              >
                <NavLink
                  to={`/channel/${channel.id}`}
                  className={({ isActive }) => cn(isActive && 'bg-accent font-medium')}
                >
                  <Avatar className="size-6">
                    <AvatarImage src={channel.avatar} alt="" />
                    <AvatarFallback>{channel.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{channel.name}</span>
                </NavLink>
              </Button>
            ))}
          </nav>
        </div>

        <Separator className="my-3" />

        <div className="px-3 pb-6 text-xs leading-5 text-muted-foreground">
          <p>About Press Copyright</p>
          <p>Contact us Creators</p>
          <p>Advertise Developers</p>
          <p className="mt-3">Terms Privacy Policy & Safety</p>
          <p className="mt-4">© 2026 YouTube Clone</p>
        </div>
      </ScrollArea>
    </aside>
  )
}
