import thumbnail from '@/assets/thumbnail.jpg'
import channelsJson from './channels.json'
import videosJson from './videos.json'
import commentsJson from './comments.json'
import categoriesJson from './categories.json'
import userJson from './user.json'

const palette = [
  ['#0f2027', '#203a43', '#2c5364'],
  ['#1a2a6c', '#b21f1f', '#fdbb2d'],
  ['#134e5e', '#71b280'],
  ['#4b6cb7', '#182848'],
  ['#c31432', '#240b36'],
  ['#0f0c29', '#302b63', '#24243e'],
  ['#373b44', '#4286f4'],
  ['#232526', '#414345'],
  ['#1d4350', '#a43931'],
  ['#141e30', '#243b55'],
  ['#3a1c71', '#d76d77', '#ffaf7b'],
  ['#000428', '#004e92'],
  ['#200122', '#6f0000'],
  ['#1e3c72', '#2a5298'],
  ['#42275a', '#734b6d'],
  ['#000000', '#e74c3c'],
]

function svgDataUri(seed: string, w: number, h: number) {
  const idx = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length
  const colors = palette[idx]
  const stops = colors
    .map((c, i) => `<stop offset="${(i / (colors.length - 1)) * 100}%" stop-color="${c}"/>`)
    .join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">${stops}</linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function escapeXml(s: string) {
  return s.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!,
  )
}

function avatarUri(seed: string, initials: string) {
  const idx = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length
  const color = palette[idx][0]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="176" height="176" viewBox="0 0 176 176">
    <rect width="176" height="176" fill="${color}"/>
    <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Arial,sans-serif" font-size="64" font-weight="700">${escapeXml(initials)}</text>
  </svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export type Channel = {
  id: string
  name: string
  handle: string
  subscribers: string
  videoCount: number
  description: string
  avatar: string
  banner: string
  joined: string
  location: string
  links: { label: string; url: string }[]
}

export type Video = {
  id: string
  title: string
  channelId: string
  views: string
  viewsExact: string
  uploaded: string
  uploadedExact: string
  duration: string
  thumbnail: string
  description: string
  likes: string
  category: string
}

export type Comment = {
  id: string
  author: string
  avatar: string
  text: string
  likes: string
  time: string
  replies?: number
}

export const channels: Record<string, Channel> = Object.fromEntries(
  channelsJson.map(({ avatarInitial, ...channel }) => [
    channel.id,
    {
      ...channel,
      avatar: avatarUri(channel.id, avatarInitial),
      banner: svgDataUri(`${channel.id}-banner`, 2560, 423),
    },
  ]),
)

export const videos: Video[] = videosJson.map((video) => ({
  ...video,
  thumbnail,
}))

export const categories: string[] = categoriesJson

export const comments: Comment[] = commentsJson.map(({ avatarInitial, ...comment }) => ({
  ...comment,
  avatar: avatarUri(comment.id, avatarInitial),
}))

export const userAvatar = avatarUri('user-avatar', userJson.avatarInitial)

export function getVideo(id: string) {
  return videos.find((v) => v.id === id)
}

export function getChannel(id: string) {
  return channels[id]
}

export function getChannelVideos(channelId: string) {
  return videos.filter((v) => v.channelId === channelId)
}

export function getRelatedVideos(videoId: string) {
  return videos.filter((v) => v.id !== videoId).slice(0, 12)
}
