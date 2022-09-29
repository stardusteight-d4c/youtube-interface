import React from 'react'
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

type Props = {}

const Sidebar = ({}: Props) => {
  const openMenu = useAppSelector((state) => state.youtubeApp.openMenu)
  const openMenuMobile = useAppSelector((state) => state.youtubeApp.openMenuMobile)
  const menuItemsArrayLists = [
    mainLinks,
    secondaryLinks,
    subscriptionLinks,
    helpLinks,
  ]

  // initial state of the menu is changed according to the view port
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const menuState = isTabletOrMobile ? openMenuMobile : openMenu

  console.log('openMenu:', openMenu, 'openMenuMobile:', openMenuMobile);
  
  console.log('menuState:', menuState);
  
  return (
    <AnimatePresence>
      {menuState && (
        <motion.aside
          initial={{ x: -1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          exit={{ x: -1000, opacity: 0 }}
          className="md:w-2/12 w-1/2 z-20 h-screen overflow-y-scroll scrollbar-hide fixed top-14 bg-[#212121] pb-8 sidebar"
        >
          {menuItemsArrayLists.map((arrayList, index) => (
            <ul className="flex flex-col border-b border-gray-700 border-dashed">
              <MenuIconSidebar array={arrayList} key={index} />
            </ul>
          ))}
          <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400">
            {textLinks[0].map((name, index) => {
              return <li key={index}>{name}</li>
            })}
          </ul>
          <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400">
            {textLinks[1].map((name, index) => {
              return <li key={index}>{name}</li>
            })}
          </ul>
          <span className="px-4 text-sm text-zinc-400">&copy; 2022 Google</span>
          <br />
          <p className="px-4 pt-3 text-sm text-zinc-400">
            This clone is for educational purpose only.
          </p>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
