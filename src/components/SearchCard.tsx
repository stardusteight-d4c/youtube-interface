import React from 'react'
import { HomePageVideos } from '../Types'
import { Link } from 'react-router-dom'

export default function SearchCard({ data }: { data: HomePageVideos }) {
  return (
    <Link to={`/watch/${data.videoId}`} className="cursor-pointer">
      <div className="md:flex gap-3 mb-14 md:mb-0">
        <div className="relative">
          <span className="absolute bottom-1 right-1 text-sm bg-black/80 rounded-sm px-1 py-0.5 z-10">
            {data.videoDuration}
          </span>
          <img
            src={data.videoThumbnail}
            className="w-full h-full"
            alt="thumbnail"
          />
        </div>
        <div className="flex gap-1 flex-col p-2 md:p-0">
          <h3 className="max-w-2xl">
            <a href="#" className="line-clamp-2 text-xl font-semibold">
              {data.videoTitle}
            </a>
          </h3>
          <div className="text-xs text-grap-400">
            <div>
              <div>
                <span className="after:content-['•'] after:mx-1">
                  {data.videoViews} views
                </span>
                <span>{data.videoAge}</span>
              </div>
            </div>
          </div>
          <div className="min-w-fit my-2">
            <a
              href="#"
              className="flex items-center gap-2 text-xs text-gray-400"
            >
              <img
                src={data.channelInfo.image}
                alt="channel"
                className="h-9 w-9 rounded-full"
              />
              <span>{data.channelInfo.name}</span>
            </a>
          </div>
          <div className="max-w-2xl line-clamp-2 text-sm text-gray-400">
            <p>{data.videoDescription}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
