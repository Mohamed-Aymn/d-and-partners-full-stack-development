import { Link } from 'react-router-dom'
import {
  Bell,
  BrandYoutube,
  Help,
  Keyboard,
  Language,
  Logout,
  Moon,
  Settings,
  SwitchHorizontal,
  User,
} from 'tabler-icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { userAvatar } from '@/data/videos'

function HeaderProfileBtn() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="ml-1 rounded-full"
          aria-label="Account menu"
        >
          <Avatar className="size-8">
            <AvatarImage src={userAvatar} alt="" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-0" sideOffset={8}>
        <DropdownMenuLabel className="p-0 font-normal">
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
              >
                View your channel
              </Link>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="m-0" />

        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem asChild>
            <Link to="/channel/mkbhd">
              <User className="size-5" />
              Your channel
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BrandYoutube className="size-5" />
            YouTube Studio
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SwitchHorizontal className="size-5" />
            Switch account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Logout className="size-5" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="m-0" />

        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem>
            <Moon className="size-5" />
            Appearance: Device theme
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Language className="size-5" />
            Language: English
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="size-5" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="m-0" />

        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem>
            <Help className="size-5" />
            Help
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className="size-5" />
            Keyboard shortcuts
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default HeaderProfileBtn