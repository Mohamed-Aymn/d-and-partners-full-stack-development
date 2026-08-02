import { Link } from 'react-router-dom'
import { DotsVertical } from 'tabler-icons-react'
import type { Video } from '@/data/videos'
import { channels } from '@/data/videos'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type VideoCardProps = {
  video: Video
  layout?: 'grid' | 'row' | 'channel'
}

function DurationBadge({ duration }: { duration: string }) {
  return (
    <Badge
      variant="secondary"
      className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 text-xs font-medium text-white hover:bg-black/80"
    >
      {duration}
    </Badge>
  )
}

export function VideoCard({ video, layout = 'grid' }: VideoCardProps) {
  const channel = channels[video.channelId]

  if (layout === 'row') {
    return (
      <Link to={`/watch/${video.id}`} className="group flex gap-2">
        <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-[168px]">
          <img
            src={video.thumbnail}
            alt=""
            className="size-full object-cover transition group-hover:scale-[1.02]"
            loading="lazy"
          />
          <DurationBadge duration={video.duration} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-medium leading-5">{video.title}</h3>
          <p className="mt-1 truncate text-xs text-muted-foreground">{channel?.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {video.views} views · {video.uploaded}
          </p>
        </div>
      </Link>
    )
  }

  if (layout === 'channel') {
    return (
      <Link to={`/watch/${video.id}`} className="group flex flex-col gap-2">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
          <img
            src={video.thumbnail}
            alt=""
            className="size-full object-cover transition group-hover:scale-[1.02]"
            loading="lazy"
          />
          <DurationBadge duration={video.duration} />
        </div>
        <div>
          <h3 className="line-clamp-2 text-sm font-medium leading-5">{video.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {video.views} views · {video.uploaded}
          </p>
        </div>
      </Link>
    )
  }

  return (
    <article className="group flex flex-col gap-3">
      <Link
        to={`/watch/${video.id}`}
        className="relative block aspect-video overflow-hidden rounded-xl bg-muted"
      >
        <img
          src={video.thumbnail}
          alt=""
          className="size-full object-cover transition group-hover:scale-[1.02]"
          loading="lazy"
        />
        <DurationBadge duration={video.duration} />
      </Link>
      <div className="flex gap-3">
        <Link to={`/channel/${video.channelId}`} className="shrink-0">
          <Avatar className="size-9">
            <AvatarImage src={channel?.avatar} alt="" />
            <AvatarFallback>{channel?.name[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex gap-2">
            <Link to={`/watch/${video.id}`} className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-sm font-medium leading-5">{video.title}</h3>
            </Link>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className={cn('mt-0.5 opacity-0 group-hover:opacity-100')}
              aria-label="More actions"
            >
              <DotsVertical className="size-5" />
            </Button>
          </div>
          <Link
            to={`/channel/${video.channelId}`}
            className="mt-1 block truncate text-xs text-muted-foreground hover:text-foreground"
          >
            {channel?.name}
          </Link>
          <p className="text-xs text-muted-foreground">
            {video.views} views · {video.uploaded}
          </p>
        </div>
      </div>
    </article>
  )
}
