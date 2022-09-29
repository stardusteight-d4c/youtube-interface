import React from 'react'
// import { MenuIcon } from '../../Types'

type Props = {}

const MenuIconSidebar = (array): Any => {
  console.log(array)

  return (
    <ul className="flex flex-col border-b border-gray-700 border-dashed">
      {array.map(({ Icon, name }) => (
        <li
          key={name}
          className={`pl-6 py-3 hover:bg-[#383838] ${
            name == 'Home' && 'bg-[#383838]'
          }`}
        >
          <a href="#" className="flex items-center gap-5">
            <Icon className="text-xl" />
            <span className="text-sm tracking-wider">{name}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default MenuIconSidebar
