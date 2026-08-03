import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { WatchPage } from '@/pages/WatchPage'
import { ChannelPage } from '@/pages/ChannelPage'
import Challenge1 from './pages/Challenge1'
import Challenge2 from './pages/Challenge2'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* other challenges's routes */}
          <Route path="challenge1" element={<Challenge1 />} />
          <Route path="challenge2" element={<Challenge2 />} />

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
