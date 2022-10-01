import React from 'react'
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline'

type Props = {}

const Comment = (props: Props) => {
  return (
    <div className="w-full relative">
      <div className="flex gap-4">
        <img
          src="https://github.com/stardusteight-d4c.png"
          alt="user/avatar"
          className="rounded-full w-12 h-12"
        />
        <span className="font-semibold text-sm">Gabriel Sena</span>
        <span className="text-xs text-gray-500 mt-[2px]">7 months ago</span>
      </div>
      <p className="max-w-[625px] absolute text-sm top-5 left-16 line-clamp-4">
        Brother, let me just say - I have little personal interest in the app...
        but your presentation is captivating and motivates me to want to work
        more on my own projects. You have a great sense of aesthetics. Never
        stop.
      </p>
      <div className="flex items-center gap-x-4 cursor-pointer absolute -bottom-20 md:-bottom-14 left-16">
        <HandThumbUpIcon width={16} />
        <HandThumbDownIcon width={16} />
        <span className="text-gray-500 hover:text-white/90 transition-all duration-200 text-sm uppercase">reply</span>
      </div>
    </div>
  )
}

export default Comment
