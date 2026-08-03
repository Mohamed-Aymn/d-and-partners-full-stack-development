import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { WatchPage } from '@/pages/WatchPage'
import { ChannelPage } from '@/pages/ChannelPage'
import Challenge1 from './pages/Challenge1'
import Challenge2 from './pages/Challenge2'
import Challenge8 from './pages/Challenge8'
import Challenge7 from './pages/Challenge7'
import Challenge6 from './pages/Challenge6'
import Challenge5 from './pages/Challenge5'
import Challenge4 from './pages/Challenge4'
import Challenge3 from './pages/Challenge3'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* other challenges's routes */}
          <Route path="challenge1" element={<Challenge1 />} />
          <Route path="challenge2" element={<Challenge2 />} />
          <Route path="challenge3" element={<Challenge3 />} />
          <Route path="challenge4" element={<Challenge4 />} />
          <Route path="challenge5" element={<Challenge5 />} />
          <Route path="challenge6" element={<Challenge6 />} />
          <Route path="challenge7" element={<Challenge7 />} />
          <Route path="challenge8" element={<Challenge8 />} />

          {/* youtube routes */}
          <Route index element={<HomePage />} />
          <Route path="watch/:videoId" element={<WatchPage />} />
          <Route path="channel/:channelId" element={<ChannelPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
