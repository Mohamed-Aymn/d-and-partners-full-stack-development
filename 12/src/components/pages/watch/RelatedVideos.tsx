import { getRelatedVideos } from "@/data/videos"
import { VideoCard } from "../common/VideoCard"

interface Props {
  videoId: string
}

function RelatedVideos({ videoId }: Props) {
  const related = getRelatedVideos(videoId)
  return (
    <aside className="w-full shrink-0 px-3 sm:px-4 lg:w-[402px] lg:px-0">
      <div className="flex flex-col gap-3">
        {related.map((v) => (
          <VideoCard key={v.id} video={v} layout="row" />
        ))}
      </div>
    </aside>
  )
}

export default RelatedVideos