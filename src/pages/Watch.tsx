import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getRecommendedVideos } from '../store/reducers/getRecommendedVideos'
import { getVideoDetails } from '../store/reducers/getVideoDetails'
import Sidebar from '../components/Sidebar'
import WatchCard from '../components/WatchCard'
import {
  mockDaraRecommededVideos,
  mockDataCurrentPlaying,
} from '../../mockData'

import { BsThreeDots } from 'react-icons/bs'
import {
  ShareIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ScissorsIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import Comment from '../components/Comment'
import { HandThumbUpIcon as HandThumbUpIconSolid } from '@heroicons/react/24/solid'
import { handleInitialCloseMenu } from '../store'
import { AnimatePresence, motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

type Props = {}

const Watch = (props: Props) => {
  const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false)
  const [likedVideo, setLikedVideo] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const { id } = useParams()
  const initialCloseMenu = useAppSelector(
    (state) => state.youtubeApp.initialCloseMenu
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // const currentPlaying = useAppSelector(
  //   (state) => state.youtubeApp.currentPlaying
  // )
  // const recommendedVideos = useAppSelector(
  //   (state) => state.youtubeApp.recommendedVideos
  // )
  const currentPlaying = mockDataCurrentPlaying // id: LlLdzOHDfJo
  const recommendedVideos = mockDaraRecommededVideos

  // useEffect(() => {
  //   if (id) {
  //     dispatch(getVideoDetails(id))
  //     setShowMoreStatus(false)
  //   } else {
  //     navigate('/')
  //   }
  // }, [id, navigate, dispatch])

  // useEffect(() => {
  //   if (currentPlaying && id) dispatch(getRecommendedVideos(id))
  // }, [currentPlaying, dispatch, id])

  const menuState = initialCloseMenu
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  console.log('menuState WatchPage:', menuState)

  return (
    <>
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className="max-h-screen scrollbar-hide text-white/90 antialiased max-w-full mx-auto overflow-hidden">
          <AnimatePresence>
            {menuState && (
              <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-black/40 absolute inset-0 z-40 w-screen h-auto overflow-y-hidden"
                onClick={() => dispatch(handleInitialCloseMenu())}
              />
            )}
          </AnimatePresence>
          <div className="h-[7.5vh]">
            <Navbar />
          </div>
          <Sidebar />
          <div className="flex w-full h-[92.5vh] overflow-y-scroll scrollbar-hide">
            <div className="flex flex-col md:flex-row scrollbar-hide max-w-[1300px] gap-x-5 2xl:mx-auto md:p-7 md:mx-20 mr-0 w-full">
              <div className="max-w-[700px]">
                <div>
                  <iframe
                    className="md:w-[700px] md:h-[395px] h-[200px] w-full"
                    src={`https://www.youtube.com/embed/${id}?autoplay-1`}
                    frameBorder="0"
                    allowFullScreen
                    title="Youtube video player"
                  />
                  <div className="mt-5 p-2 md:p-0 border-b border-[#aaaaaa]/20">
                    <p className="text-2xl font-semibold py-2 -mt-4">
                      {currentPlaying.videoTitle}
                    </p>
                    <div className="flex flex-col md:flex-row justify-between mt-1">
                      <div className="text-base py-4 md:py-0 text-gray-400 font-light">
                        <span className="after:content-['•'] after:mx-1">
                          {currentPlaying.videoViews} views
                        </span>
                        <span> {currentPlaying.videoAge} ago</span>
                      </div>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-1 cursor-pointer">
                          {!likedVideo ? (
                            <HandThumbUpIcon
                              className="w-5"
                              onClick={() => setLikedVideo(!likedVideo)}
                            />
                          ) : (
                            <HandThumbUpIconSolid
                              className="w-5"
                              onClick={() => setLikedVideo(!likedVideo)}
                            />
                          )}
                          <span className='hidden md:block'>{currentPlaying.videoLikes}</span>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <HandThumbDownIcon className="w-5" />
                          <span className='hidden md:block'>Dislike</span>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <ShareIcon className="w-5" />
                          <span>Share</span>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <ScissorsIcon className="w-5" />
                          <span>Clip</span>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <SparklesIcon className="w-5" />
                          <span>Save</span>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BsThreeDots className="text-xl" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 border-t border-[#aaaaaa]/20 flex-col my-5 pb-3 border-l-transparent border-r-transparent">
                      <div className="flex items-center gap-5 mr-5 mt-4">
                        <div className='w-28 md:w-14'>
                          <img
                            src={currentPlaying.channelInfo.image}
                            alt="channel/img"
                            className="rounded-full h-12 w-12"
                          />
                        </div>
                        <div className="w-5/6">
                          <h5 className="text-sm">
                            <span>{currentPlaying.channelInfo.name}</span>
                          </h5>
                          <h6 className="text-gray-400 text-xs">
                            {currentPlaying.channelInfo.subscribers} subscribers
                          </h6>
                        </div>
                        <div>
                          <button className="uppercase bg-[#cc0000] font-medium rounded-sm p-2 text-sm tracking-wider">
                            subscribe
                          </button>
                        </div>
                      </div>
                      <div
                        className={`${
                          !showMoreStatus
                            ? 'max-h-16 overflow-hidden !text-gray-400'
                            : '!text-white/90'
                        } text-sm w-11/12`}
                      >
                        <pre className="whitespace-pre-wrap font-roboto">
                          {currentPlaying.videoDescription}
                        </pre>
                      </div>
                      <div>
                        <button
                          className="uppercase font-bold text-blue-600 text-sm cursor-pointer"
                          onClick={() => setShowMoreStatus(!showMoreStatus)}
                        >
                          Show {showMoreStatus ? 'less' : 'more'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <section>
                  <div className="space-x-14 px-3 md:px-0 font-semibold pt-2 flex items-center justify-start">
                    <span>329 comments</span>
                    <span className="uppercase flex items-center gap-x-2">
                      <AdjustmentsHorizontalIcon className="w-6" />
                      order by
                    </span>
                  </div>
                  <div className="mb-4 px-2 md:px-0">
                    <div className="flex gap-4 mt-4">
                      <img
                        src="https://github.com/stardusteight-d4c.png"
                        alt="user/avatar"
                        className="rounded-full w-12 h-12"
                      />
                      <textarea
                        className="bg-transparent h-8 outline-none resize-none w-full border-b border-white"
                        placeholder="Add a comment"
                        onChange={(event) =>
                          setComment(event.currentTarget.value)
                        }
                      />
                    </div>
                    <div className="w-full flex items-center justify-end">
                      <button
                        disabled={!comment.trim()}
                        className="text-black/90 disabled:bg-gray-100/90 disabled:cursor-not-allowed uppercase bg-white px-4 py-1 rounded-full"
                      >
                        submit
                      </button>
                    </div>
                  </div>
                  <div className="space-y-28 md:space-y-20 px-2 md:px-0">
                    <Comment />
                    <Comment />
                    <Comment />
                  </div>
                </section>
              </div>
              <div className="flex flex-col space-y-2 mt-28 pt-8 md:mt-0 md:pt-0 md:border-none border-t border-[#aaaaaa]/20 px-2 md:px-0">
                {getRecommendedVideos.length &&
                  recommendedVideos.map((item) => {
                    return <WatchCard data={item} key={item.videoId} />
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Watch
