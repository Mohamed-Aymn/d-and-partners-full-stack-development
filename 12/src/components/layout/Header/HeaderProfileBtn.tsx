import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { userAvatar } from '@/data/videos'


function HeaderProfileBtn() {

  return (
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="ml-1 rounded-full"
        aria-label="Account menu"
        aria-haspopup="menu"
      >
        <Avatar className="size-8">
          <AvatarImage src={userAvatar} alt="" />
          <AvatarFallback>Y</AvatarFallback>
        </Avatar>
      </Button>
      {/* 
        <div
          role="menu"
          className="absolute top-full right-0 z-50 mt-2 w-72 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
        >
          <div className="flex items-start gap-3 px-4 py-3">
            <Avatar className="size-10">
              <AvatarImage src={userAvatar} alt="" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">You</p>
              <p className="truncate text-sm text-muted-foreground">@you</p>
              <Link
                to="/channel/mkbhd"
                className="mt-1 inline-block text-sm text-blue-600 hover:text-blue-700"
                onClick={close}
              >
                View your channel
              </Link>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="p-1">
            <Link
              to="/channel/mkbhd"
              role="menuitem"
              className={menuItemClass}
              onClick={close}
            >
              <User className="size-5" />
              Your channel
            </Link>
            <button type="button" role="menuitem" className={menuItemClass} onClick={close}>
              <BrandYoutube className="size-5" />
              YouTube Studio
            </button>
            <button type="button" role="menuitem" className={menuItemClass} onClick={close}>
              <SwitchHorizontal className="size-5" />
              Switch account
            </button>
            <button type="button" role="menuitem" className={menuItemClass} onClick={close}>
              <Logout className="size-5" />
              Sign out
            </button>
          </div>

          <div className="h-px bg-border" />

          <div className="p-1">
            <button type="button" role="menuitem" className={menuItemClass} onClick={close}>
              <Moon className="size-5" />
              Appearance: Device theme
            </button>
            <button type="button" role="menuitem" className={menuItemClass} onClick={close}>
              <Language className="size-5" />
              Language: English
            </button>
            <button type="button" role="menuitem" className={menuItemClass} onClick={close}>
              <Settings className="size-5" />
              Settings
            </button>
          </div>

          <div className="h-px bg-border" />

          <div className="p-1">
            <button type="button" role="menuitem" className={menuItemClass} onClick={close}>
              <Help className="size-5" />
              Help
            </button>
            <button type="button" role="menuitem" className={menuItemClass} onClick={close}>
              <Keyboard className="size-5" />
              Keyboard shortcuts
            </button>
          </div>
        </div> */}
    </div>
  )
}

export default HeaderProfileBtn
