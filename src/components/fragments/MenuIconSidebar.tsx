import React from 'react'
import { icons, IconType } from 'react-icons'

type Props = {
  array: {
    icon: IconType
    name: string
  }[]
}

const MenuIconSidebar = ({ array }: Props) => {
  return (
    <>
      {array.map((item, index) => {
        const Icon = item.icon
        return (
          <li
            key={index}
            className={`pl-6 py-3 hover:bg-[#383838] ${
              item.name == 'Home' && 'bg-[#383838]'
            }`}
          >
            <a href="#" className="flex items-center gap-5">
              <Icon className="text-xl" />
              <span className="text-sm tracking-wider">{item.name}</span>
            </a>
          </li>
        )
      })}
    </>
  )
}

export default MenuIconSidebar
