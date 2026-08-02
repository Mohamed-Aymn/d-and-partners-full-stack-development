import { Button } from "@/components/ui/button"

interface Props {
  views: string;
  uploaded: string;
  description: string;
}

function VideoDescription({ views, uploaded, description }: Props) {

  return (
    <Button
      type="button"
      variant="secondary"
      className="mt-3 h-auto w-full flex-col items-start gap-1 rounded-xl p-3 text-left font-normal whitespace-normal hover:bg-secondary"
    >
      <span className="text-sm font-medium">
        {views} views · {uploaded}
      </span>
      <span
        className={
          'line-clamp-2'
        }
      >
        {description}
      </span>
      {/* <span className="text-sm font-medium">
      ...more
      </span> */}
    </Button>
  )
}

export default VideoDescription