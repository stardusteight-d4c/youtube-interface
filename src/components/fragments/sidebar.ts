import {
  MdHomeFilled,
  MdOutlineSlowMotionVideo,
  MdOutlineVideoLibrary,
  MdHistory,
  MdOutlineSmartDisplay,
  MdOutlineWatchLater,
  MdThumbUpOffAlt,
  MdSettings,
  MdOutlinedFlag,
  MdOutlineHelpOutline,
  MdOutlineFeedback,
  MdOutlineSportsVolleyball,
} from 'react-icons/md'
import { TbMusic, TbDeviceGamepad2 } from 'react-icons/tb'
import { FaRegCompass } from 'react-icons/fa'
import { GiFilmStrip } from 'react-icons/gi'
import { BsCollectionPlay } from 'react-icons/bs'

export const mainLinks = [
  {
    icon: MdHomeFilled,
    name: 'Home',
  },
  {
    icon: FaRegCompass,
    name: 'Explore',
  },
  {
    icon: MdOutlineSlowMotionVideo,
    name: 'Shorts',
  },
  {
    icon: BsCollectionPlay,
    name: 'Subscriptions',
  },
]

export const secondaryLinks = [
  {
    icon: MdOutlineVideoLibrary,
    name: 'Library',
  },
  {
    icon: MdHistory,
    name: 'History',
  },
  {
    icon: MdOutlineSmartDisplay,
    name: 'Your Videos',
  },
  {
    icon: MdOutlineWatchLater,
    name: 'Watch Later',
  },
  {
    icon: MdThumbUpOffAlt,
    name: 'Liked Videos',
  },
]

export const subscriptionLinks = [
  {
    icon: TbMusic,
    name: 'Music',
  },
  {
    icon: MdOutlineSportsVolleyball,
    name: 'Sport',
  },
  {
    icon: TbDeviceGamepad2,
    name: 'Gaming',
  },
  {
    icon: GiFilmStrip,
    name: 'Films',
  },
]

export const helpLinks = [
  {
    icon: MdSettings,
    name: 'Settings',
  },
  {
    icon: MdOutlinedFlag,
    name: 'Report history',
  },
  {
    icon: MdOutlineHelpOutline,
    name: 'Help',
  },
  {
    icon: MdOutlineFeedback,
    name: 'Send feedback',
  },
]

export const textLinks = [
  [
    'About',
    'Press',
    'Copyright',
    'Contact us',
    'Creator',
    'Advertise',
    'Developers',
  ],
  [
    'Terms',
    'Privacy',
    'Policy & Safety',
    'How YouTube works',
    'Test new features',
  ],
]

export const tags = [
  'All',
  'Live',
  'Game',
  'Lofi',
  'Music',
  'Trailer',
  'Linux',
  'Anime',
  'React',
  'Films',
  'Python',
  'Blender',
  'Shorts',
]
