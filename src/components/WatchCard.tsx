import React from 'react'
import { RecommendedVideos } from '../Types'
import { Link } from 'react-router-dom'

type Props = {
  data: RecommendedVideos
}

const WatchCard = ({ data }: Props) => {
  return (
    <Link to={`/watch/${data.videoId}`}>
      <div className="flex gap-3 max-w-sm 2xl:max-w-md scrollbar-hide">
        <div className="relative min-w-fit">
          <span className="absolute bottom-1 right-1 text-[12px] font-semibold bg-black/80 rounded-sm px-1 py-0.5 z-10">
            {data.videoDuration}
          </span>
          <img
            src={data.videoThumbnail}
            className="w-[170px] h-[95px]"
            alt="thumbnail"
          />
        </div>
        <div className="flex gap-1 flex-col">
          <h4 className="text-sm">
            <a href="#" className="line-clamp-2 text-white font-semibold">
              {data.videoTitle}
            </a>
          </h4>
          <div className="text-xs text-gray-400">
            <div>
              <a href="#" className="hover:text-white/80">
                {data.channelInfo.name}
              </a>
            </div>
            <div>
              <div>
                <span className="after:content-['•'] after:mx-1">
                  {data.videoViews} views
                </span>
                <span>{data.videoAge}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default WatchCard
