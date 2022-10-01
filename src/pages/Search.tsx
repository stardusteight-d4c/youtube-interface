import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import SearchCard from '../components/SearchCard'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Spinner from '../components/fragments/Spinner'
import { clearVideos } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { HomePageVideos } from '../Types'
import { useNavigate } from 'react-router-dom'
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos'
import { mockDataSearchTerm } from '../../mockData'
import { motion } from 'framer-motion'

export default function Search() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const videosAPI = useAppSelector((state) => state.youtubeApp.videos)
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm)
  const openMenu = useAppSelector((state) => state.youtubeApp.initialOpenMenu)

  const videos = videosAPI.length !== 0 ? videosAPI : mockDataSearchTerm

  useEffect(() => {
    dispatch(clearVideos())
    if (searchTerm === '') navigate('/')
    else {
      dispatch(getSearchPageVideos(false))
    }
  }, [dispatch, navigate, searchTerm])

  return (
    <>
      <div className="h-screen overflow-hidden">
        <div className="h-[5.4vh] md:h-[7.5vh]">
          <Navbar />
        </div>
        <Sidebar />
        <div className="flex h-[92.5vh] mt-5 md:mt-0 overflow-hidden">
          <motion.div
            layout
            transition={{ duration: 0.1 }}
            className="h-screen scrollbar-hide overflow-hidden grid grid-cols-1 md:grid-cols-12"
          >
            {videos.length ? (
              <motion.div
                layout
                className={`${
                  !openMenu && '!col-start-1'
                } md:py-8 md:pl-8 md:grid col-start-3 col-span-12 gap-5 w-screen`}
              >
                <InfiniteScroll
                  dataLength={videos.length}
                  next={() => dispatch(getSearchPageVideos(true))}
                  hasMore={videos.length < 500}
                  loader={<Spinner />}
                  height="95vh"
                  className="scrollbar-hide overflow-visible"
                >
                  {videos.map((item: HomePageVideos) => {
                    return (
                      <div className="my-5 max-w-xs md:max-w-none mx-auto">
                        <SearchCard data={item} key={item.videoId} />
                      </div>
                    )
                  })}
                </InfiniteScroll>
              </motion.div>
            ) : (
              <Spinner />
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}
