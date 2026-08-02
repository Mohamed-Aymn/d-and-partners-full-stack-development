import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getChannel,
  getChannelVideos,
  videos as allVideos,
} from '@/data/videos'
import { VideoCard } from '@/components/pages/common/VideoCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function ChannelPage() {
  const { channelId = 'mkbhd' } = useParams()
  const channel = getChannel(channelId) ?? getChannel('mkbhd')!
  const channelVideos = getChannelVideos(channel.id)
  const displayVideos = channelVideos.length ? channelVideos : allVideos.slice(0, 8)
  const [subscribed, setSubscribed] = useState(false)
  const [sort, setSort] = useState('Latest')

  return (
    <div className="pb-10">
      <div className="px-4 pt-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl">
          <img
            src={channel.banner}
            alt=""
            className="aspect-[6/1] w-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-start sm:px-6 lg:px-8">
        <Avatar className="mx-auto size-28 sm:mx-0 sm:size-40">
          <AvatarImage src={channel.avatar} alt="" />
          <AvatarFallback className="text-3xl">{channel.name[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 text-center sm:pt-2 sm:text-left">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-bold sm:justify-start sm:text-[36px] sm:leading-10">
            {channel.name}
            <Badge variant="secondary" className="size-5 rounded-full p-0 text-[10px]">
              ✓
            </Badge>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="text-foreground">{channel.handle}</span>
            {' · '}
            {channel.subscribers} subscribers
            {' · '}
            {channel.videoCount} videos
          </p>
          <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">
            {channel.description}{' '}
            <Button type="button" variant="link" className="h-auto p-0 font-medium text-foreground">
              ...more
            </Button>
          </p>
          {channel.links.length > 0 ? (
            <p className="mt-1 text-sm">
              <Link to="#" className="font-medium text-blue-600">
                {channel.links[0].label}
              </Link>
              {channel.links.length > 1 ? (
                <span className="text-muted-foreground">
                  {' '}
                  and {channel.links.length - 1} more links
                </span>
              ) : null}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <Button
              type="button"
              className="rounded-full"
              variant={subscribed ? 'secondary' : 'default'}
              onClick={() => setSubscribed((v) => !v)}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
            <Button type="button" variant="secondary" className="rounded-full">
              Join
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex gap-2">
          {['Latest', 'Popular', 'Oldest'].map((option) => (
            <Button
              key={option}
              type="button"
              size="sm"
              variant={sort === option ? 'default' : 'secondary'}
              className="rounded-lg"
              onClick={() => setSort(option)}
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayVideos.map((video) => (
            <VideoCard key={video.id} video={video} layout="channel" />
          ))}
        </div>
      </div>
    </div>
  )
}
