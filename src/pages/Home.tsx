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
import { motion, AnimatePresence } from 'framer-motion'

// production: const videos = useAppSelector((state) => state.youtubeApp.data)
// development: const videos = mockData

type Props = {}

const Home = (props: Props) => {
  const dispatch = useAppDispatch()
  // const videos = useAppSelector((state) => state.youtubeApp.videos)
  const videos = mockDataHome
  const openMenu = useAppSelector((state) => state.youtubeApp.openMenu)


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

  return (
    <div className="h-screen overflow-hidden">
      <div className="h-[7.5vh]">
        <Navbar />
      </div>
      <Sidebar />
      {videos.length ? (
        <InfiniteScroll
          dataLength={videos.length}
          next={() => dispatch(getHomePageVideos(true))}
          hasMore={videos.length < 500}
          loader={<Spinner />}
          height="100vh"
        >
          <motion.div
            layout
            transition={{ duration: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-12"
          >
            <motion.div
              layout
              className={`${style.openMenuLayout} ${
                !openMenu && style.notOpenMenuLayout
              }`}
            >
              {videos.map((item: HomePageVideos, index) => {
                return <Card data={item} key={index} />
              })}
            </motion.div>
          </motion.div>
        </InfiniteScroll>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default Home
