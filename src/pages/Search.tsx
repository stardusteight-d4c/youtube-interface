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

export default function Search() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // const videos = useAppSelector((state) => state.youtubeApp.videos)
  const videos = mockDataSearchTerm
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm)

  useEffect(() => {
    dispatch(clearVideos())
    if (searchTerm === '') navigate('/')
    else {
      dispatch(getSearchPageVideos(false))
    }
  }, [dispatch, navigate, searchTerm])

  return (
    <>
      <div className="h-[7.5vh]">
        <Navbar />
      </div>
      <Sidebar />
      <div className="flex h-[92.5vh]">
        <div className="max-h-screen overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {videos.length ? (
            <div className="py-8 pl-8 grid col-start-3 col-span-12 gap-5 w-full">
              <InfiniteScroll
                dataLength={videos.length}
                next={() => dispatch(getSearchPageVideos(true))}
                hasMore={videos.length < 500}
                loader={<Spinner />}
                height={600}
              >
                {videos.map((item: HomePageVideos) => {
                  return (
                    <div className="my-5">
                      <SearchCard data={item} key={item.videoId} />
                    </div>
                  )
                })}
              </InfiniteScroll>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  )
}
