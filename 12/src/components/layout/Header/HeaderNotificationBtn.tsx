import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { channels, videos } from '@/data/videos'
import { Bell } from 'tabler-icons-react'

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
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="relative rounded-full"
        aria-label="Notifications"
        aria-haspopup="menu"
      >
        <Bell className="size-5" />
        <Badge className="absolute -top-0.5 right-0 h-4 min-w-4 justify-center rounded-full bg-[var(--yt-red)] px-1 text-[10px] text-white hover:bg-[var(--yt-red)]">
          9+
        </Badge>
      </Button>

      {/* <div
          role="menu"
          className="absolute top-full right-0 z-50 mt-2 w-[360px] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
        >
          <div className="flex items-center justify-between px-4 py-3">
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
          </div>
          <div className="h-px bg-border" />
          <div className="max-h-[420px] overflow-y-auto py-1">
            {notifications.map((notification) => (
              <Link
                key={notification.id}
                to={`/watch/${notification.id}`}
                role="menuitem"
                className="flex h-auto cursor-pointer items-start gap-3 px-4 py-3 outline-hidden hover:bg-accent hover:text-accent-foreground"
                onClick={close}
              >
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
            ))}
          </div>
        </div> */}

    </div>
  )
}

export default HeaderNotificationBtn
