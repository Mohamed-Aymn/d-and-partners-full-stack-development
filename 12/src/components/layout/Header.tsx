import { Link } from 'react-router-dom'
import {
  Bell,
  BrandYoutube,
  Broadcast,
  Edit,
  Help,
  Keyboard,
  Language,
  Logout,
  Menu2,
  Microphone,
  Moon,
  Search,
  Settings,
  SwitchHorizontal,
  Upload,
  User,
  Video,
} from 'tabler-icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { channels, userAvatar, videos } from '@/data/videos'
import { cn } from '@/lib/utils'

type HeaderProps = {
  onMenuClick: () => void
}

const notifications = videos.slice(0, 5).map((video, i) => {
  const channel = channels[video.channelId]
  return {
    id: video.id,
    avatar: channel.avatar,
    text: `${channel.name} uploaded: ${video.title}`,
    time: video.uploaded,
    unread: i < 3,
  }
})

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
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="rounded-full"
          aria-label="Search with your voice"
        >
          <Microphone className="size-5" />
        </Button>
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Create"
            >
              <Video className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
            <DropdownMenuItem>
              <Upload className="size-5" />
              Upload video
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Broadcast className="size-5" />
              Go live
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="size-5" />
              Create post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[360px] p-0" sideOffset={8}>
            <DropdownMenuLabel className="flex items-center justify-between px-4 py-3 font-normal">
              <span className="text-base font-medium">Notifications</span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="rounded-full"
                aria-label="Notification settings"
              >
                <Settings className="size-5" />
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="m-0" />
            <div className="max-h-[420px] overflow-y-auto py-1">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  asChild
                  className="h-auto cursor-pointer items-start gap-3 rounded-none px-4 py-3"
                >
                  <Link to={`/watch/${notification.id}`}>
                    <Avatar className="mt-0.5 size-10 shrink-0">
                      <AvatarImage src={notification.avatar} alt="" />
                      <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="line-clamp-2 text-sm leading-5 whitespace-normal">
                        {notification.text}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                    {notification.unread ? (
                      <span className="mt-2 size-2 shrink-0 rounded-full bg-blue-600" />
                    ) : null}
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 rounded-full"
              aria-label="Account menu"
            >
              <Avatar className="size-8">
                <AvatarImage src={userAvatar} alt="" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 p-0" sideOffset={8}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-start gap-3 px-4 py-3">
                <Avatar className="size-10">
                  <AvatarImage src={userAvatar} alt="" />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">You</p>
                  <p className="truncate text-sm text-muted-foreground">@you</p>
                  <Link
                    to="/channel/mkbhd"
                    className="mt-1 inline-block text-sm text-blue-600 hover:text-blue-700"
                  >
                    View your channel
                  </Link>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="m-0" />

            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem asChild>
                <Link to="/channel/mkbhd">
                  <User className="size-5" />
                  Your channel
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BrandYoutube className="size-5" />
                YouTube Studio
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SwitchHorizontal className="size-5" />
                Switch account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Logout className="size-5" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="m-0" />

            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem>
                <Moon className="size-5" />
                Appearance: Device theme
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Language className="size-5" />
                Language: English
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-5" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="m-0" />

            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem>
                <Help className="size-5" />
                Help
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard className="size-5" />
                Keyboard shortcuts
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
