import React from 'react'

type Props = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  name: string
}

const MenuIconSidebar = ({ Icon, name }: Props) => {
  return (
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
  )
}

export default MenuIconSidebar
