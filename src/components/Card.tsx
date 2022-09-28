import React from 'react'
import { HomePageVideos } from '../Types'
import { Link } from 'react-router-dom'

type Props = {
  data: HomePageVideos
}

const Card = ({ data }: Props) => {
  return (
    <div className="flex gap-3 2xl:w-80 flex-col transform hover:scale-105 duration-500 transition-all">
      <div className="relative">
        <span className="absolute bottom-1 right-1 text-sm bg-black/80 rounded-sm px-1 py-0.5 z-10">
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            className="min-w-64 min-h-36 2xl:w-80 2xl:h-40"
            alt="thumbnail/img"
          />
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="min-w-fit">
          <a href="#">
            <img
              src={data.channelInfo.image}
              alt="channel/img"
              className="w-9 h-9 rounded-full"
            />
          </a>
        </div>
        <div>
          <h3>
            <a href="#" className="line-clamp-2">
              {data.videoTitle}
            </a>
          </h3>
          <div className="text-sm text-gray-400">
            <div className="div">
              <a href="" className="hover:text-white">
                {data.channelInfo.name}
              </a>
            </div>
            <div>
              <span className='after:content-["•"] after:mx-1'>
                {data.videoViews} views
              </span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
