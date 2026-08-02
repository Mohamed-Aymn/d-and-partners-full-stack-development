// import { Broadcast, Edit, Upload, Video } from 'tabler-icons-react'
import { Video } from 'tabler-icons-react'
import { Button } from '@/components/ui/button'


function HeaderCreateBtn() {
  return (
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-label="Create"
        aria-haspopup="menu"
      >
        <Video className="size-5" />
      </Button>

      {/* <div
          role="menu"
          className="absolute top-full right-0 z-50 mt-2 w-56 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        >
          <button type="button" role="menuitem" className={menuItemClass} onClick={close}>
            <Upload className="size-5" />
            Upload video
          </button>
          <button type="button" role="menuitem" className={menuItemClass} onClick={close}>
            <Broadcast className="size-5" />
            Go live
          </button>
          <button type="button" role="menuitem" className={menuItemClass} onClick={close}>
            <Edit className="size-5" />
            Create post
          </button>
        </div> */}
    </div>
  )
}

export default HeaderCreateBtn
