import {
  ArrowDown,
  ThumbDown,
  ThumbUp,
} from 'tabler-icons-react'
import {
  comments,
} from '@/data/videos'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

function CommentsSection() {
  return (
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
  )
}

export default CommentsSection