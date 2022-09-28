import React from 'react'
import {
  mainLinks,
  secondaryLinks,
  subscriptionLinks,
  helpLinks,
} from './fragments/sidebar'
import { textLinks } from './fragments/sidebar'
import MenuIconSidebar from './fragments/MenuIconSidebar'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  openMenu: boolean
}

const Sidebar = ({ openMenu }: Props) => {
  return (
    <AnimatePresence>
      {openMenu && (
        <motion.aside
          initial={{ x: -1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          exit={{ x: -1000, opacity: 0 }}
          className="md:w-2/12 w-1/2 z-20 max-h-screen overflow-y-scroll scrollbar-thin fixed top-14 bg-[#212121] pb-8 sidebar"
        >
          <ul className="flex flex-col border-b border-gray-700 border-dashed">
            {mainLinks.map(({ icon, name }, index) => (
              <MenuIconSidebar Icon={icon} name={name} key={index} />
            ))}
          </ul>
          <ul className="flex flex-col border-b border-gray-700 border-dashed">
            {secondaryLinks.map(({ icon, name }, index) => (
              <MenuIconSidebar Icon={icon} name={name} key={index} />
            ))}
          </ul>
          <ul className="flex flex-col border-b border-gray-700 border-dashed">
            {subscriptionLinks.map(({ icon, name }, index) => (
              <MenuIconSidebar Icon={icon} name={name} key={index} />
            ))}
          </ul>
          <ul className="flex flex-col border-b border-gray-700">
            {helpLinks.map(({ icon, name }, index) => (
              <MenuIconSidebar Icon={icon} name={name} key={index} />
            ))}
          </ul>
          <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400">
            {textLinks[0].map((name) => {
              return <li key={name}>{name}</li>
            })}
          </ul>
          <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400">
            {textLinks[1].map((name) => {
              return <li key={name}>{name}</li>
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
