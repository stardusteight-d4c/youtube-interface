import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from '../components/Card'
import Spinner from '../components/fragments/Spinner'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { clearVideos } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getHomePageVideos } from '../store/reducers/getHomePageVideos'
import { HomePageVideos } from '../Types'

type Props = {}

const Home = (props: Props) => {
  const dispatch = useAppDispatch()
  const videos = useAppSelector((state) => state.youtubeApp.videos)

  useEffect(() => {
    dispatch(getHomePageVideos(false))
    // console.log(videos)
    // compare com o console.log(items) em getHomePageVideos, aqui os dados já estão tratados
  }, [dispatch])

  useEffect(() => {
    return () => {
      dispatch(clearVideos())
    }
  }, [dispatch])

  return (
    <div className="max-h-screen overflow-x-hidden">
      <div className="h-[7.5vh]">
        <Navbar />
      </div>
      <div className="flex h-[92.5vh]">
        <Sidebar />
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
              {videos.map((item: HomePageVideos) => {
                return <Card data={item} key={item.videoId} />
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

export default Home
