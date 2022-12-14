import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from '../components/Card'
import Spinner from '../components/fragments/Spinner'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { clearVideos } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getHomePageVideos } from '../store/reducers/getHomePageVideos'
import { HomePageVideos } from '../Types'
import { mockDataHome } from '../../mockData'
import { motion } from 'framer-motion'
import Hashtag from '../components/fragments/Hashtag'
import { tags } from '../components/fragments/sidebar'

import { Virtual } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/virtual'

// production: const videos = useAppSelector((state) => state.youtubeApp.data)
// development: const videos = mockData

type Props = {}

const Home = (props: Props) => {
  const dispatch = useAppDispatch()
  const videosAPI = useAppSelector((state) => state.youtubeApp.videos)
  const openMenu = useAppSelector((state) => state.youtubeApp.initialOpenMenu)

  const videos = videosAPI.length !== 0 ? videosAPI : mockDataHome

  useEffect(() => {
    dispatch(getHomePageVideos(false))
  }, [dispatch])

  useEffect(() => {
    return () => {
      dispatch(clearVideos())
    }
  }, [dispatch])

  const style = {
    gridContainer: `grid grid-cols-1 md:grid-cols-12`,
    openMenuLayout: `grid md:col-start-3 grid-cols-1 md:col-span-10 gap-y-14 gap-x-8 md:grid-cols-4 p-8`,
    notOpenMenuLayout: `md:!col-start-1 md:!col-span-12 md:!mx-auto 2xl:w-[1500px]`,
  }

  const slidesPerView = openMenu ? 11 : 12

  return (
    <div className="h-screen overflow-x-hidden scrollbar-hide">
      <div className="h-[5.3vh] md:h-[7.5vh]">
        <Navbar />
      </div>
      <Sidebar />
      <motion.div
        layout
        transition={{ duration: 0.5 }}
        className={`${
          !openMenu && '!w-screen'
        } hidden h-14 px-5 md:flex col-start-3 absolute right-0 top-14 bg-[#0a0c0d] border-y z-40 border-[#aaaaaa]/20 w-[85vw]`}
      >
        <div className="absolute right-0 z-50 w-[100px] h-14 bg-gradient-to-l to-transparent via-[#1f1f1f] from-[#1f1f1f]" />
        <div className="absolute left-1 z-50 w-[50px] h-14 bg-gradient-to-r to-transparent via-[#1f1f1f] from-[#1f1f1f]" />
        <Swiper
          modules={[Virtual]}
          virtual
          spaceBetween={4}
          slidesPerView={slidesPerView}
          className="!min-w-full !w-screen"
        >
          {tags.map((tag, index) => (
            <SwiperSlide key={tag} virtualIndex={index} className="!max-w-fit">
              <Hashtag title={tag} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
      {videos.length ? (
        <InfiniteScroll
          dataLength={videos.length}
          next={() => dispatch(getHomePageVideos(true))}
          hasMore={videos.length < 500}
          loader={<Spinner />}
          height="95vh"
          className="scrollbar-hide overflow-hidden md:mt-16"
        >
          <div className="grid h-auto overflow-hidden grid-cols-1 md:grid-cols-12">
            <div
              className={`${style.openMenuLayout} ${
                !openMenu && style.notOpenMenuLayout
              }`}
            >
              {videos.map((item: HomePageVideos, index) => {
                return <Card data={item} key={index} />
              })}
            </div>
          </div>
        </InfiniteScroll>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default Home
