import { useParams } from 'react-router-dom'
import {
  comments,
  getChannel,
  getVideo,
  userAvatar,
} from '@/data/videos'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import RelatedVideos from '@/components/pages/watch/RelatedVideos'
import CommentsSection from '@/components/pages/watch/CommentsSection'
import VideoDescription from '@/components/pages/watch/VideoDescription'
import VideoDetails from '@/components/pages/watch/VideoDetails'
import VideoPlayer from '@/components/pages/watch/VideoPlayer'

export function WatchPage() {
  const { videoId = 'v1' } = useParams()
  const video = getVideo(videoId) ?? getVideo('v1')!
  const channel = getChannel(video.channelId)!

  return (
    <div className="mx-auto flex max-w-[1800px] flex-col gap-6 px-0 pb-10 pt-6 lg:flex-row lg:px-6">

      {/* left-hand side */}
      <div className="min-w-0 flex-1 lg:max-w-[calc(100%-420px)]">
        <VideoPlayer thumbnail={video.thumbnail} duration={video.duration} />

        <VideoDetails video={video} channel={channel} />

        <VideoDescription
          views={video.views}
          uploaded={video.uploaded}
          description={video.description}
        />

        {/* comments area */}
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

          <CommentsSection />
        </div>
      </div>

      {/* right-hand side */}
      <RelatedVideos videoId={videoId} />
    </div>
  )
}
