import {
  Broadcast,
  Edit,
  Upload,
  Video,
} from 'tabler-icons-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function HeaderCreateBtn() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Create"
        >
          <Video className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
        <DropdownMenuItem>
          <Upload className="size-5" />
          Upload video
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Broadcast className="size-5" />
          Go live
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="size-5" />
          Create post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default HeaderCreateBtn