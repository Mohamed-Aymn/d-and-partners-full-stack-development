import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { channels, videos } from '@/data/videos'
import {
  Bell,
  Settings,
} from 'tabler-icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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


function HeaderNotificationBtn() {
  return (
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
  )
}

export default HeaderNotificationBtn