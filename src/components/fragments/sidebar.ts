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
    Icon: MdHomeFilled,
    name: 'Home',
  },
  {
    Icon: FaRegCompass,
    name: 'Explore',
  },
  {
    Icon: MdOutlineSlowMotionVideo,
    name: 'Shorts',
  },
  {
    Icon: BsCollectionPlay,
    name: 'Subscriptions',
  },
]

export const secondaryLinks = [
  {
    Icon: MdOutlineVideoLibrary,
    name: 'Library',
  },
  {
    Icon: MdHistory,
    name: 'History',
  },
  {
    Icon: MdOutlineSmartDisplay,
    name: 'Your Videos',
  },
  {
    Icon: MdOutlineWatchLater,
    name: 'Watch Later',
  },
  {
    Icon: MdThumbUpOffAlt,
    name: 'Liked Videos',
  },
]

export const subscriptionLinks = [
  {
    Icon: TbMusic,
    name: 'Music',
  },
  {
    Icon: MdOutlineSportsVolleyball,
    name: 'Sport',
  },
  {
    Icon: TbDeviceGamepad2,
    name: 'Gaming',
  },
  {
    Icon: GiFilmStrip,
    name: 'Films',
  },
]

export const helpLinks = [
  {
    Icon: MdSettings,
    name: 'Settings',
  },
  {
    Icon: MdOutlinedFlag,
    name: 'Report history',
  },
  {
    Icon: MdOutlineHelpOutline,
    name: 'Help',
  },
  {
    Icon: MdOutlineFeedback,
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
