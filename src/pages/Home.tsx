import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getHomePageVideos } from '../store/reducers/getHomePageVideos'

type Props = {}

const Home = (props: Props) => {
  const dispatch = useAppDispatch()
  const videos = useAppSelector((state) => state.youtubeApp.videos)

  useEffect(() => {
    dispatch(getHomePageVideos(false))
    // console.log(videos)
    // compare com o console.log(items) em getHomePageVideos, aqui os dados estão tratados
  }, [dispatch])

  return (
    <div className="max-h-screen overflow-hidden">
      <div className="h-[7.5vh]">
        <Navbar />
      </div>
      <div className="flex h-[92.5vh]">
        <Sidebar />
      </div>
    </div>
  )
}

export default Home
