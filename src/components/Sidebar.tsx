import React, { useEffect } from 'react'
import {
  mainLinks,
  secondaryLinks,
  subscriptionLinks,
  helpLinks,
} from './fragments/sidebar'
import { textLinks } from './fragments/sidebar'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppSelector } from '../store/hooks'
import MenuIconSidebar from './fragments/MenuIconSidebar'
import { useMediaQuery } from 'react-responsive'
import { useLocation, useParams } from 'react-router-dom'

type Props = {}

const Sidebar = ({}: Props) => {
  const location = useLocation()
  const initialOpenMenu = useAppSelector(
    (state) => state.youtubeApp.initialOpenMenu
  )
  const initialCloseMenu = useAppSelector(
    (state) => state.youtubeApp.initialCloseMenu
  )
  const menuItemsArrayLists = [
    mainLinks,
    secondaryLinks,
    subscriptionLinks,
    helpLinks,
  ]

  const isWatchPage = location.pathname.includes('watch')
  // initial state of the menu is changed according to the view port
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const menuState =
    isTabletOrMobile || isWatchPage ? initialCloseMenu : initialOpenMenu

  return (
    <AnimatePresence>
      {menuState && (
        <motion.aside
          initial={{ x: -1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          exit={{ x: -1000, opacity: 0 }}
          className="md:w-2/12 w-1/2 z-50 border-r border-t overflow-y-scroll border-[#aaaaaa]/20 max-h-screen overflow-x-hidden scrollbar-hide fixed top-14 bg-[#0a0c0d] pb-8"
        >
          {menuItemsArrayLists.map((arrayList, index) => (
            <ul className="flex cursor-pointer flex-col border-b border-[#aaaaaa]/20">
              <MenuIconSidebar array={arrayList} key={index} />
            </ul>
          ))}
          <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400">
            {textLinks[0].map((name, index) => {
              return (
                <li className="cursor-pointer hover:text-white/80" key={index}>
                  {name}
                </li>
              )
            })}
          </ul>
          <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400">
            {textLinks[1].map((name, index) => {
              return (
                <li className="cursor-pointer hover:text-white/80" key={index}>
                  {name}
                </li>
              )
            })}
          </ul>
          <span className="px-4 text-sm text-zinc-400">&copy; 2022 Google</span>
          <br />
          <p className="px-4 pt-3 text-sm text-zinc-400 pb-8">
            This clone is for educational purpose only.
          </p>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
