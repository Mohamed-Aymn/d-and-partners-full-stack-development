import { useState } from 'react'
import { categories, videos } from '@/data/videos'
import { VideoCard } from '@/components/pages/common/VideoCard'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export function HomePage() {
  const [active, setActive] = useState('All')

  const videoCategories = new Set(videos.map((v) => v.category))
  const tags = categories.filter((cat) => cat === 'All' || videoCategories.has(cat))

  const shown =
    active === 'All' ? videos : videos.filter((v) => v.category === active)

  return (
    <div className="px-4 pb-10 pt-3 sm:px-6">
      <div className="sticky top-14 z-30 -mx-4 mb-4 bg-background px-4 py-3 sm:-mx-6 sm:px-6">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3 pb-1">
            {tags.map((cat) => (
              <Button
                key={cat}
                type="button"
                size="sm"
                variant={active === cat ? 'default' : 'secondary'}
                className={cn('shrink-0 rounded-lg', active === cat && 'font-medium')}
                onClick={() => setActive(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}
