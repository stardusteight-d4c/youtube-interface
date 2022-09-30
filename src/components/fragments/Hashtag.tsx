import React from 'react'

type Props = {
  title: string
}

const Hashtag = ({ title }: Props) => {
  return (
    <div className="text-white !mx-4 flex items-center justify-center mt-[10px] group cursor-pointer">
      <div
        className={`${
          title == 'All' && '!bg-white !text-black'
        } bg-[#373737] group-hover:brightness-125 transition-all ease-in-out rounded-full border border-[#aaaaaa]/20 px-4 py-1`}
      >
        {title}
      </div>
    </div>
  )
}

export default Hashtag
