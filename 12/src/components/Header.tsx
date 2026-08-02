import { Link } from 'react-router-dom'
import {
  Bell,
  Menu2,
  Microphone,
  Search,
  Video,
} from 'tabler-icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { userAvatar } from '@/data/videos'
import { cn } from '@/lib/utils'

type HeaderProps = {
  onMenuClick: () => void
}

export function YouTubeLogo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn('flex items-center gap-0.5 pr-2', className)}
      aria-label="YouTube Home"
    >
      <svg viewBox="0 0 28 20" width="28" height="20" aria-hidden>
        <path
          d="M27.9727 3.12324C27.6435 1.89111 26.6768 0.921515 25.4482 0.593712C23.2178 0 14.2535 0 14.2535 0C14.2535 0 5.28915 0 3.0587 0.593712C1.83014 0.921515 0.863472 1.89111 0.534272 3.12324C0 5.35768 0 10 0 10C0 10 0 14.6423 0.534272 16.8768C0.863472 18.1089 1.83014 19.0785 3.0587 19.4063C5.28915 20 14.2535 20 14.2535 20C14.2535 20 23.2178 20 25.4482 19.4063C26.6768 19.0785 27.6435 18.1089 27.9727 16.8768C28.507 14.6423 28.507 10 28.507 10C28.507 10 28.507 5.35768 27.9727 3.12324Z"
          fill="#FF0000"
        />
        <path d="M11.4257 14.2854L18.8477 10.0004L11.4257 5.71533V14.2854Z" fill="white" />
      </svg>
      <span className="ml-0.5 text-[20px] font-bold tracking-[-0.5px]">YouTube</span>
      <sup className="relative -top-2 ml-0.5 text-[10px] font-normal text-muted-foreground">
        CL
      </sup>
    </Link>
  )
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between bg-background px-2 sm:px-4">
      <div className="flex min-w-0 items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={onMenuClick}
              aria-label="Menu"
            >
              <Menu2 className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Menu</TooltipContent>
        </Tooltip>
        <YouTubeLogo />
      </div>

      <div className="mx-4 hidden max-w-[640px] flex-1 items-center gap-2 md:flex">
        <div className="flex h-10 flex-1 items-center">
          <Input
            type="search"
            placeholder="Search"
            className="h-10 rounded-l-full rounded-r-none border-r-0 px-4 shadow-none focus-visible:z-10 focus-visible:ring-1"
          />
          <Button
            type="button"
            variant="secondary"
            className="h-10 w-16 rounded-l-none rounded-r-full border border-l-0 border-input"
            aria-label="Search"
          >
            <Search className="size-5" />
          </Button>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="rounded-full"
              aria-label="Search with your voice"
            >
              <Microphone className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Search with your voice</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full md:hidden"
          aria-label="Search"
        >
          <Search className="size-5" />
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Create"
            >
              <Video className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Create</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              <Badge className="absolute -top-0.5 right-0 h-4 min-w-4 justify-center rounded-full bg-[var(--yt-red)] px-1 text-[10px] text-white hover:bg-[var(--yt-red)]">
                9+
              </Badge>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>
        <Button variant="ghost" size="icon" className="ml-1 rounded-full" asChild>
          <Link to="/channel/mkbhd" aria-label="Your channel">
            <Avatar className="size-8">
              <AvatarImage src={userAvatar} alt="" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
          </Link>
        </Button>
      </div>
    </header>
  )
}
