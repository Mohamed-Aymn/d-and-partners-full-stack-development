import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowDown,
  Dots,
  Download,
  PlayerPlay,
  Share,
  ThumbDown,
  ThumbUp,
} from 'tabler-icons-react'
import {
  comments,
  getChannel,
  getRelatedVideos,
  getVideo,
  userAvatar,
} from '@/data/videos'
import { VideoCard } from '@/components/VideoCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export function WatchPage() {
  const { videoId = 'v1' } = useParams()
  const video = getVideo(videoId) ?? getVideo('v1')!
  const channel = getChannel(video.channelId)!
  const related = getRelatedVideos(video.id)
  const [subscribed, setSubscribed] = useState(false)
  const [descOpen, setDescOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [relatedFilter, setRelatedFilter] = useState('All')

  return (
    <div className="mx-auto flex max-w-[1800px] flex-col gap-6 px-0 pb-10 pt-6 lg:flex-row lg:px-6">
      <div className="min-w-0 flex-1 lg:max-w-[calc(100%-420px)]">
        <div className="relative aspect-video overflow-hidden bg-black lg:rounded-xl">
          <img
            src={video.thumbnail}
            alt=""
            className="size-full object-cover opacity-90"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              type="button"
              size="icon-lg"
              className="size-16 rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80"
              aria-label="Play"
            >
              <PlayerPlay className="ml-0.5 size-9 fill-current" />
            </Button>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 text-white">
            <span className="text-xs tabular-nums">0:00 / {video.duration}</span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
              <div className="h-full w-[8%] rounded-full bg-[var(--yt-red)]" />
            </div>
          </div>
        </div>

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

          <Button
            type="button"
            variant="secondary"
            className="mt-3 h-auto w-full flex-col items-start gap-1 rounded-xl p-3 text-left font-normal whitespace-normal"
            onClick={() => setDescOpen((v) => !v)}
          >
            <span className="text-sm font-medium">
              {video.viewsExact} views · {video.uploadedExact}
            </span>
            <span className={cn('text-sm leading-5', !descOpen && 'line-clamp-2')}>
              {video.description}
            </span>
            <span className="text-sm font-medium">
              {descOpen ? 'Show less' : '...more'}
            </span>
          </Button>

          <div className="mt-6">
            <div className="mb-6 flex items-center gap-8">
              <h2 className="text-base font-bold">{comments.length * 312} Comments</h2>
              <Button type="button" variant="ghost" size="sm">
                Sort by
              </Button>
            </div>

            <div className="mb-6 flex gap-4">
              <Avatar className="size-10">
                <AvatarImage src={userAvatar} alt="" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <Input
                type="text"
                placeholder="Add a comment..."
                className="rounded-none border-0 border-b border-input bg-transparent px-0 shadow-none focus-visible:border-foreground focus-visible:ring-0"
              />
            </div>

            <div className="flex flex-col gap-5">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar className="size-10 shrink-0">
                    <AvatarImage src={comment.avatar} alt="" />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium">
                        @{comment.author.replace(/\s/g, '')}
                      </span>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="mt-1 text-sm leading-5">{comment.text}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs">
                      <Button type="button" variant="ghost" size="sm" className="h-8 gap-1.5 px-2">
                        <ThumbUp className="size-4" />
                        {comment.likes}
                      </Button>
                      <Button type="button" variant="ghost" size="icon-sm" aria-label="Dislike">
                        <ThumbDown className="size-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" className="rounded-full">
                        Reply
                      </Button>
                    </div>
                    {comment.replies ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="mt-2 rounded-full text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <ArrowDown className="size-4" />
                        {comment.replies} replies
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <aside className="w-full shrink-0 px-3 sm:px-4 lg:w-[402px] lg:px-0">
        <ScrollArea className="mb-3 w-full whitespace-nowrap">
          <div className="flex gap-2 pb-1">
            {['All', 'From related', 'For you'].map((chip) => (
              <Button
                key={chip}
                type="button"
                size="sm"
                variant={relatedFilter === chip ? 'default' : 'secondary'}
                className="shrink-0 rounded-lg"
                onClick={() => setRelatedFilter(chip)}
              >
                {chip}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="flex flex-col gap-3">
          {related.map((v) => (
            <VideoCard key={v.id} video={v} layout="row" />
          ))}
        </div>
      </aside>
    </div>
  )
}
