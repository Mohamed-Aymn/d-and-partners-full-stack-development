import thumbnail from '@/assets/thumbnail.jpg'

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

function svgDataUri(seed: string, w: number, h: number, label = '') {
  const idx = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length
  const colors = palette[idx]
  const stops = colors
    .map((c, i) => `<stop offset="${(i / (colors.length - 1)) * 100}%" stop-color="${c}"/>`)
    .join('')
  const text = label
    ? `<text x="50%" y="52%" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="Arial,sans-serif" font-size="${Math.round(w / 18)}" font-weight="700">${escapeXml(label)}</text>`
    : ''
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">${stops}</linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <circle cx="${w * 0.82}" cy="${h * 0.22}" r="${Math.min(w, h) * 0.12}" fill="rgba(255,255,255,0.08)"/>
    <circle cx="${w * 0.18}" cy="${h * 0.78}" r="${Math.min(w, h) * 0.18}" fill="rgba(0,0,0,0.15)"/>
    ${text}
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

export const channels: Record<string, Channel> = {
  veritasium: {
    id: 'veritasium',
    name: 'Veritasium',
    handle: '@veritasium',
    subscribers: '16.2M',
    videoCount: 412,
    description:
      'An element of truth — videos about science, education, and anything else I find interesting.',
    avatar: avatarUri('veritasium', 'V'),
    banner: svgDataUri('veritasium-banner', 2560, 423),
    joined: 'Jul 21, 2010',
    location: 'United States',
    links: [
      { label: 'Website', url: '#' },
      { label: 'Twitter', url: '#' },
    ],
  },
  mkbhd: {
    id: 'mkbhd',
    name: 'Marques Brownlee',
    handle: '@MKBHD',
    subscribers: '19.8M',
    videoCount: 1680,
    description:
      'MKBHD: Quality Tech Videos | YouTuber | Geek | Consumer Electronics | Tech Head',
    avatar: avatarUri('mkbhd', 'M'),
    banner: svgDataUri('mkbhd-banner', 2560, 423),
    joined: 'Mar 21, 2008',
    location: 'United States',
    links: [
      { label: 'Website', url: '#' },
      { label: 'Twitter', url: '#' },
    ],
  },
  kurzgesagt: {
    id: 'kurzgesagt',
    name: 'Kurzgesagt – In a Nutshell',
    handle: '@kurzgesagt',
    subscribers: '23.1M',
    videoCount: 248,
    description:
      'Animation videos explaining things with optimistic nihilism. Made with love in Munich.',
    avatar: avatarUri('kurzgesagt', 'K'),
    banner: svgDataUri('kurzgesagt-banner', 2560, 423),
    joined: 'Jul 9, 2013',
    location: 'Germany',
    links: [{ label: 'Shop', url: '#' }],
  },
  linus: {
    id: 'linus',
    name: 'Linus Tech Tips',
    handle: '@LinusTechTips',
    subscribers: '16.5M',
    videoCount: 7120,
    description: 'Tech reviews, tech humor, and more from Linus Sebastian and the LTT team.',
    avatar: avatarUri('linus', 'L'),
    banner: svgDataUri('linus-banner', 2560, 423),
    joined: 'Nov 24, 2008',
    location: 'Canada',
    links: [{ label: 'Floatplane', url: '#' }],
  },
  fireship: {
    id: 'fireship',
    name: 'Fireship',
    handle: '@Fireship',
    subscribers: '3.4M',
    videoCount: 620,
    description:
      'High-intensity code tutorials and tech news to help you ship your app faster.',
    avatar: avatarUri('fireship', 'F'),
    banner: svgDataUri('fireship-banner', 2560, 423),
    joined: 'Aug 29, 2017',
    location: 'United States',
    links: [{ label: 'Pro', url: '#' }],
  },
  vsauce: {
    id: 'vsauce',
    name: 'Vsauce',
    handle: '@Vsauce',
    subscribers: '22.4M',
    videoCount: 430,
    description: 'Our World is Amazing. Mind-blowing educational videos by Michael Stevens.',
    avatar: avatarUri('vsauce', 'V'),
    banner: svgDataUri('vsauce-banner', 2560, 423),
    joined: 'Jul 30, 2010',
    location: 'United States',
    links: [{ label: 'Website', url: '#' }],
  },
  travis: {
    id: 'travis',
    name: 'Travis Neilson',
    handle: '@travisneilson',
    subscribers: '412K',
    videoCount: 186,
    description: 'Design, creativity, and the craft of making things for the web.',
    avatar: avatarUri('travis', 'T'),
    banner: svgDataUri('travis-banner', 2560, 423),
    joined: 'Jan 12, 2012',
    location: 'United States',
    links: [],
  },
  mrbeast: {
    id: 'mrbeast',
    name: 'MrBeast',
    handle: '@MrBeast',
    subscribers: '320M',
    videoCount: 820,
    description: 'SUBSCRIBE FOR A COOKIE!',
    avatar: avatarUri('mrbeast', 'M'),
    banner: svgDataUri('mrbeast-banner', 2560, 423),
    joined: 'Feb 20, 2012',
    location: 'United States',
    links: [{ label: 'Feastables', url: '#' }],
  },
}

export const videos: Video[] = [
  {
    id: 'v1',
    title: 'The Most Dangerous Element',
    channelId: 'veritasium',
    views: '14M',
    viewsExact: '14,203,441',
    uploaded: '2 weeks ago',
    uploadedExact: 'Jul 18, 2026',
    duration: '18:42',
    thumbnail,
    description:
      'What makes an element dangerous? In this video we explore radioactivity, chemical reactivity, and the surprising ways everyday materials can become hazardous. Sponsored by Brilliant.',
    likes: '512K',
    category: 'Science',
  },
  {
    id: 'v2',
    title: 'iPhone 17 Pro Review: Worth the Upgrade?',
    channelId: 'mkbhd',
    views: '8.4M',
    viewsExact: '8,412,903',
    uploaded: '5 days ago',
    uploadedExact: 'Jul 28, 2026',
    duration: '14:07',
    thumbnail,
    description:
      'The iPhone 17 Pro is here. Camera, battery, display, and the big question — should you upgrade from last year?',
    likes: '312K',
    category: 'Tech',
  },
  {
    id: 'v3',
    title: 'What If We Nuke a City?',
    channelId: 'kurzgesagt',
    views: '21M',
    viewsExact: '21,004,112',
    uploaded: '1 month ago',
    uploadedExact: 'Jun 28, 2026',
    duration: '11:28',
    thumbnail,
    description:
      'A careful look at nuclear weapons, fallout, and what humanity would face after a detonation. Made with love.',
    likes: '890K',
    category: 'Science',
  },
  {
    id: 'v4',
    title: 'I Built a $50,000 Gaming PC',
    channelId: 'linus',
    views: '5.1M',
    viewsExact: '5,102,441',
    uploaded: '3 days ago',
    uploadedExact: 'Jul 30, 2026',
    duration: '22:15',
    thumbnail,
    description:
      'We went all-out on the ultimate gaming machine. Specs, thermals, and whether it was actually worth it.',
    likes: '198K',
    category: 'Tech',
  },
  {
    id: 'v5',
    title: 'React in 100 Seconds',
    channelId: 'fireship',
    views: '3.2M',
    viewsExact: '3,210,554',
    uploaded: '1 year ago',
    uploadedExact: 'Aug 2, 2025',
    duration: '2:18',
    thumbnail,
    description:
      'Learn the fundamentals of React in 100 seconds. Hooks, components, and the virtual DOM — lightning fast.',
    likes: '142K',
    category: 'Coding',
  },
  {
    id: 'v6',
    title: 'The Banach–Tarski Paradox',
    channelId: 'vsauce',
    views: '32M',
    viewsExact: '32,441,002',
    uploaded: '8 years ago',
    uploadedExact: 'Mar 12, 2018',
    duration: '24:14',
    thumbnail,
    description:
      'How can you cut a ball into pieces and reassemble them into two balls the same size as the original?',
    likes: '1.2M',
    category: 'Science',
  },
  {
    id: 'v7',
    title: 'Designing for Delight',
    channelId: 'travis',
    views: '184K',
    viewsExact: '184,221',
    uploaded: '2 months ago',
    uploadedExact: 'Jun 1, 2026',
    duration: '16:03',
    thumbnail,
    description:
      'A deep dive into interaction design principles that make products feel intentional and joyful.',
    likes: '9.4K',
    category: 'Design',
  },
  {
    id: 'v8',
    title: 'I Spent 50 Hours Buried Alive',
    channelId: 'mrbeast',
    views: '98M',
    viewsExact: '98,112,440',
    uploaded: '4 months ago',
    uploadedExact: 'Apr 2, 2026',
    duration: '19:44',
    thumbnail,
    description: 'SUBSCRIBE FOR A COOKIE! Surviving underground for 50 hours.',
    likes: '4.1M',
    category: 'Entertainment',
  },
  {
    id: 'v9',
    title: 'How Electricity Actually Works',
    channelId: 'veritasium',
    views: '45M',
    viewsExact: '45,882,100',
    uploaded: '3 years ago',
    uploadedExact: 'Nov 4, 2023',
    duration: '19:26',
    thumbnail,
    description:
      'Does electricity travel at the speed of light? We set up a thought experiment and a real one.',
    likes: '1.8M',
    category: 'Science',
  },
  {
    id: 'v10',
    title: 'Dope Tech: Foldable Future',
    channelId: 'mkbhd',
    views: '2.1M',
    viewsExact: '2,104,330',
    uploaded: '1 week ago',
    uploadedExact: 'Jul 26, 2026',
    duration: '12:51',
    thumbnail,
    description: 'Hands-on with the latest foldables and whether they are ready for everyday use.',
    likes: '88K',
    category: 'Tech',
  },
  {
    id: 'v11',
    title: 'The Egg — A Short Story',
    channelId: 'kurzgesagt',
    views: '28M',
    viewsExact: '28,441,200',
    uploaded: '5 years ago',
    uploadedExact: 'Sep 1, 2021',
    duration: '7:55',
    thumbnail,
    description: 'An animated take on a short story about life, death, and what it all might mean.',
    likes: '1.1M',
    category: 'Science',
  },
  {
    id: 'v12',
    title: 'Framework Laptop Deep Dive',
    channelId: 'linus',
    views: '1.8M',
    viewsExact: '1,802,441',
    uploaded: '6 days ago',
    uploadedExact: 'Jul 27, 2026',
    duration: '28:33',
    thumbnail,
    description: 'We tear down and rebuild the Framework Laptop to see if repairable PCs are the future.',
    likes: '72K',
    category: 'Tech',
  },
  {
    id: 'v13',
    title: 'TypeScript in 100 Seconds',
    channelId: 'fireship',
    views: '2.7M',
    viewsExact: '2,701,200',
    uploaded: '2 years ago',
    uploadedExact: 'May 12, 2024',
    duration: '2:31',
    thumbnail,
    description: 'TypeScript explained at breakneck speed — types, interfaces, and why it matters.',
    likes: '98K',
    category: 'Coding',
  },
  {
    id: 'v14',
    title: 'How Much Does a Shadow Weigh?',
    channelId: 'vsauce',
    views: '12M',
    viewsExact: '12,004,880',
    uploaded: '6 years ago',
    uploadedExact: 'Jan 20, 2020',
    duration: '16:02',
    thumbnail,
    description: 'Shadows, photons, and the surprising physics of darkness.',
    likes: '440K',
    category: 'Science',
  },
  {
    id: 'v15',
    title: 'UI Motion That Feels Right',
    channelId: 'travis',
    views: '96K',
    viewsExact: '96,441',
    uploaded: '3 weeks ago',
    uploadedExact: 'Jul 12, 2026',
    duration: '13:44',
    thumbnail,
    description: 'Timing, easing, and choreography tips for interfaces people love to use.',
    likes: '5.2K',
    category: 'Design',
  },
  {
    id: 'v16',
    title: 'I Gave Away an Island',
    channelId: 'mrbeast',
    views: '112M',
    viewsExact: '112,441,000',
    uploaded: '1 year ago',
    uploadedExact: 'Aug 15, 2025',
    duration: '15:22',
    thumbnail,
    description: 'A competition so big we gave away a private island.',
    likes: '5.8M',
    category: 'Entertainment',
  },
]

export const categories = [
  'All',
  'Music',
  'Gaming',
  'Live',
  'Mixes',
  'News',
  'Cooking',
  'Recently uploaded',
  'Watched',
  'New to you',
  'Science',
  'Tech',
  'Coding',
  'Design',
]

export const comments: Comment[] = [
  {
    id: 'c1',
    author: 'Alex Rivera',
    avatar: avatarUri('c1', 'A'),
    text: 'This completely changed how I think about the topic. Incredible production quality too.',
    likes: '24K',
    time: '2 days ago',
    replies: 128,
  },
  {
    id: 'c2',
    author: 'Sam Chen',
    avatar: avatarUri('c2', 'S'),
    text: 'The part at 8:42 blew my mind. Instantly shared this with my friends.',
    likes: '8.1K',
    time: '5 days ago',
    replies: 42,
  },
  {
    id: 'c3',
    author: 'Jordan Lee',
    avatar: avatarUri('c3', 'J'),
    text: 'Been waiting for this video all week. Never disappoints.',
    likes: '3.4K',
    time: '1 week ago',
    replies: 19,
  },
  {
    id: 'c4',
    author: 'Taylor Brooks',
    avatar: avatarUri('c4', 'T'),
    text: 'Can someone explain the graph at 12:10? Still wrapping my head around it.',
    likes: '1.2K',
    time: '1 week ago',
    replies: 56,
  },
]

export const userAvatar = avatarUri('user-avatar', 'Y')

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
