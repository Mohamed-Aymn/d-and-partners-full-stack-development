import {
  Menu2,
  Search,
} from 'tabler-icons-react'
import { IconBrandYoutubeFilled } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import HeaderCreateBtn from './HeaderCreateBtn'
import HeaderNotificationBtn from './HeaderNotificationBtn'
import HeaderProfileBtn from './HeaderProfileBtn'

type HeaderProps = {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between bg-background px-2 sm:px-4">
      {/* left-hand side */}
      <div className="flex min-w-0 items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={onMenuClick}
          aria-label="Menu"
        >
          <Menu2 className="size-5" />
        </Button>
        <IconBrandYoutubeFilled size={28} color="red" />
      </div>

      {/* center */}
      <div className="mx-4 hidden max-w-[640px] flex-1 items-center gap-2 md:flex">
        <div className="flex h-10 flex-1 items-center">
          <Input
            type="search"
            placeholder="Search"
            className="h-10 rounded-l-full rounded-r-none border-r-0 px-4 shadow-none focus-visible:z-10 focus-visible:ring-1"
          />
          <Button
            type="button"
            variant="secondary"
            className="h-10 w-16 rounded-l-none rounded-r-full border border-l-0 border-input"
            aria-label="Search"
          >
            <Search className="size-5" />
          </Button>
        </div>
      </div>

      {/* right-hand side */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full md:hidden"
          aria-label="Search"
        >
          <Search className="size-5" />
        </Button>


        <HeaderCreateBtn />

        <HeaderNotificationBtn />

        <HeaderProfileBtn />
      </div>
    </header>
  )
}
