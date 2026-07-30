import { IconBrandYoutubeFilled, IconSearch } from '@tabler/icons-react';
import { Input } from './ui/input';
import { Button } from './ui/button';


export default function Navbar() {
  return (
    <nav className="flex justify-between py-4 px-2">

      {/* left hand side */}
      <div className="flex gap-2 items-center">
        <IconBrandYoutubeFilled size={38} className='text-red-500' stroke={5} />

        <div className='flex gap-1'>
          <span className="font-bold">YouTube</span>
          <div className="self-start text-xs">EG</div>
        </div>
      </div>



      {/* center */}
      <div className='w-1/2 flex'>
        <Input
          placeholder='Search'
          className=" rounded-r-none"
        />
        <Button variant={"outline"} className="rounded-l-none border-l-0">
          <IconSearch />
        </Button>
      </div>

      {/* right hand side */}
      <Button>Create</Button>
    </nav>
  )
}