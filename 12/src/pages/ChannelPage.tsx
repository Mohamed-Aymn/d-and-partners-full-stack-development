import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Search } from 'tabler-icons-react'
import {
  getChannel,
  getChannelVideos,
  videos as allVideos,
} from '@/data/videos'
import { VideoCard } from '@/components/pages/common/VideoCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

const tabs = ['Home', 'Videos', 'Shorts', 'Live', 'Podcasts', 'Playlists', 'Posts', 'About'] as const

export function ChannelPage() {
  const { channelId = 'mkbhd' } = useParams()
  const channel = getChannel(channelId) ?? getChannel('mkbhd')!
  const channelVideos = getChannelVideos(channel.id)
  const displayVideos = channelVideos.length ? channelVideos : allVideos.slice(0, 8)
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Videos')
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

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as (typeof tabs)[number])}
        className="gap-0"
      >
        <div className="sticky top-14 z-20 border-b bg-background px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <TabsList className="h-auto flex-1 justify-start gap-0 overflow-x-auto rounded-none bg-transparent p-0 scrollbar-none">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm text-muted-foreground shadow-none data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 rounded-full"
              aria-label="Search channel"
            >
              <Search className="size-5" />
            </Button>
          </div>
        </div>

        <div className="px-4 pt-6 sm:px-6 lg:px-8">
          <TabsContent value="About" className="mt-0">
            <AboutPanel channel={channel} />
          </TabsContent>

          <TabsContent value="Home" className="mt-0 space-y-8">
            <section>
              <h2 className="mb-4 text-base font-bold">For you</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayVideos.slice(0, 4).map((video) => (
                  <VideoCard key={video.id} video={video} layout="channel" />
                ))}
              </div>
            </section>
            <section>
              <h2 className="mb-4 text-base font-bold">Videos</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayVideos.map((video) => (
                  <VideoCard key={video.id} video={video} layout="channel" />
                ))}
              </div>
            </section>
          </TabsContent>

          {tabs
            .filter((t) => t !== 'About' && t !== 'Home')
            .map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-0">
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
              </TabsContent>
            ))}
        </div>
      </Tabs>
    </div>
  )
}

function AboutPanel({
  channel,
}: {
  channel: NonNullable<ReturnType<typeof getChannel>>
}) {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_300px]">
      <div>
        <h2 className="mb-3 text-base font-bold">Description</h2>
        <p className="whitespace-pre-wrap text-sm leading-6">{channel.description}</p>
        {channel.links.length > 0 ? (
          <>
            <h2 className="mb-3 mt-8 text-base font-bold">Links</h2>
            <ul className="space-y-2">
              {channel.links.map((link) => (
                <li key={link.label}>
                  <a href={link.url} className="text-sm font-medium text-blue-600">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
      <div>
        <h2 className="mb-3 text-base font-bold">Stats</h2>
        <ul className="text-sm">
          <li className="py-3">Joined {channel.joined}</li>
          <Separator />
          <li className="py-3">
            {(channel.videoCount * 1_240_000).toLocaleString()} views
          </li>
          <Separator />
          <li className="py-3">{channel.location}</li>
        </ul>
      </div>
    </div>
  )
}
