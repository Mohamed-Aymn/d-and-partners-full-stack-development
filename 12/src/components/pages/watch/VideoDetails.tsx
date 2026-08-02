import { Link } from 'react-router-dom'
import {
  Dots,
  Download,
  Share,
  ThumbDown,
  ThumbUp,
} from 'tabler-icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface Props {
  video: {
    title: string
    likes: string
  }
  channel: {
    id: string
    name: string
    avatar: string
    subscribers: string
  }
}

function VideoDetails({ video, channel }: Props) {

  const [subscribed, setSubscribed] = useState(false)
  const [liked, setLiked] = useState(false)
  return (
    <div className="px-3 pt-3 sm:px-4 lg:px-0">
      <h1 className="text-xl font-bold leading-7">{video.title}</h1>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link to={`/channel/${channel.id}`} className="shrink-0">
            <Avatar className="size-10">
              <AvatarImage src={channel.avatar} alt="" />
              <AvatarFallback>{channel.name[0]}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="min-w-0">
            <Link
              to={`/channel/${channel.id}`}
              className="flex items-center gap-1 text-base font-medium"
            >
              {channel.name}
              <Badge
                variant="secondary"
                className="size-3.5 rounded-full p-0 text-[8px]"
              >
                ✓
              </Badge>
            </Link>
            <p className="text-xs text-muted-foreground">
              {channel.subscribers} subscribers
            </p>
          </div>
          <Button
            type="button"
            className={cn(
              'ml-2 rounded-full',
              subscribed && 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            )}
            variant={subscribed ? 'secondary' : 'default'}
            onClick={() => setSubscribed((v) => !v)}
          >
            {subscribed ? 'Subscribed' : 'Subscribe'}
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex overflow-hidden rounded-full bg-secondary">
            <Button
              type="button"
              variant="ghost"
              className="rounded-none px-4 hover:bg-accent"
              onClick={() => setLiked((v) => !v)}
            >
              <ThumbUp className={cn('size-5', liked && 'fill-current')} />
              {liked ? '513K' : video.likes}
            </Button>
            <Separator orientation="vertical" className="my-2 h-auto" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-none px-4 hover:bg-accent"
              aria-label="Dislike"
            >
              <ThumbDown className="size-5" />
            </Button>
          </div>
          <Button type="button" variant="secondary" className="rounded-full">
            <Share className="size-5" />
            Share
          </Button>
          <Button type="button" variant="secondary" className="rounded-full">
            <Download className="size-5" />
            Download
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="rounded-full"
            aria-label="More"
          >
            <Dots className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VideoDetails