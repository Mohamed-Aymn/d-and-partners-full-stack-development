import { Button } from "@/components/ui/button"
import { PlayerPlay } from "tabler-icons-react"

interface Props {
  thumbnail: string
  duration: string
}

function VideoPlayer({ thumbnail, duration }: Props) {
  return (
    <div className="relative aspect-video overflow-hidden bg-black lg:rounded-xl">
      <img
        src={thumbnail}
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
        <span className="text-xs tabular-nums">0:00 / {duration}</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
          <div className="h-full w-[8%] rounded-full bg-[var(--yt-red)]" />
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer