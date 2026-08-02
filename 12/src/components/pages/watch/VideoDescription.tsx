import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { useState } from "react"

interface Props {
  views: string;
  uploaded: string;
  description: string;
}

function VideoDescription({ views, uploaded, description }: Props) {
  const [descOpen, setDescOpen] = useState(false)

  return (
    <Button
      type="button"
      variant="secondary"
      className="mt-3 h-auto w-full flex-col items-start gap-1 rounded-xl p-3 text-left font-normal whitespace-normal hover:bg-secondary"
      onClick={() => setDescOpen((v) => !v)}
    >
      <span className="text-sm font-medium">
        {views} views · {uploaded}
      </span>
      <span
        className={cn(
          'w-full text-sm leading-5 whitespace-pre-wrap',
          !descOpen && 'line-clamp-2',
        )}
      >
        {description}
      </span>
      <span className="text-sm font-medium">
        {descOpen ? 'Show less' : '...more'}
      </span>
    </Button>
  )
}

export default VideoDescription