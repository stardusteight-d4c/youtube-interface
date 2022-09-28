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
import { mockData } from '../../mockData'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {}

// Mocka estes dados!!! Se não a api vai atingir a cota!! pega os primeiros dados que vir da api

const Home = (props: Props) => {
  const [openMenu, setOpenMenu] = useState(true)

  const dispatch = useAppDispatch()
  // const videos = useAppSelector((state) => state.youtubeApp.videos)
  const videos = mockData

  // useEffect(() => {
  //   dispatch(getHomePageVideos(false))
  //   // console.log(videos)
  // }, [dispatch])

  useEffect(() => {
    return () => {
      dispatch(clearVideos())
    }
  }, [dispatch])

  console.log(openMenu)

  return (
    <div className="max-h-screen">
      <div className="h-[7.5vh]">
        <Navbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>
      <Sidebar openMenu={openMenu} />
      <motion.div
        layout
        transition={{ duration: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-12"
      >
        {videos.length ? (
          // <InfiniteScroll
          //   dataLength={videos.length}
          //   next={() => dispatch(getHomePageVideos(true))}
          //   hasMore={videos.length < 500}
          //   loader={<Spinner />}
          //   height={650}
          // >
          <motion.div
            layout
            className={`md:grid md:col-start-3 ${
              !openMenu && '!col-start-1 !col-span-12 mx-auto 2xl:w-[1500px]'
            } col-span-1 md:col-span-10  gap-y-14 gap-x-8 2xl:gap-x-0 grid-cols-4 p-8`}
          >
            {videos.map((item: HomePageVideos, index) => {
              return <Card data={item} key={index} />
            })}
          </motion.div>
        ) : (
          // </InfiniteScroll>
          <Spinner />
        )}
      </motion.div>
    </div>
  )
}

export default Home
