import React from 'react'
import {
  mainLinks,
  secondaryLinks,
  subscriptionLinks,
  helpLinks,
} from './fragments/sidebar'
import { textLinks } from './fragments/sidebar'
import MenuIconSidebar from './fragments/MenuIconSidebar'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <aside className="w-2/12 pt-4 bg-[#212121] pr-5 overflow-auto pb-8 sidebar">
      <ul className="flex flex-col border-b-2 my-2 border-gray-700">
        {mainLinks.map(({ icon, name }) => (
          <MenuIconSidebar Icon={icon} name={name} />
        ))}
      </ul>
      <ul className="flex flex-col border-b-2 my-2 border-gray-700">
        {secondaryLinks.map(({ icon, name }) => (
          <MenuIconSidebar Icon={icon} name={name} />
        ))}
      </ul>
      <ul className="flex flex-col border-b-2 my-2 border-gray-700">
        {subscriptionLinks.map(({ icon, name }) => (
          <MenuIconSidebar Icon={icon} name={name} />
        ))}
      </ul>
      <ul className="flex flex-col border-b-2 my-2 border-gray-700">
        {helpLinks.map(({ icon, name }) => (
          <MenuIconSidebar Icon={icon} name={name} />
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
    </aside>
  )
}

export default Sidebar
