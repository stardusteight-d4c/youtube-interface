import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import { TiMicrophone } from 'react-icons/ti'
import { BsCameraVideo, BsBell } from 'react-icons/bs'
import { HiMenuAlt3 } from 'react-icons/hi'
import { IoAppsSharp } from 'react-icons/io5'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  changeSearchTerm,
  clearSearchTerm,
  clearVideos,
  setOpenMenu,
  setOpenMenuMobile,
} from '../store'
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos'
import { useMediaQuery } from 'react-responsive'

type Props = {}

const Navbar = ({}: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm)

  const handleSearch = () => {
    if (location.pathname !== '/search') navigate('/search')
    else {
      dispatch(clearVideos())
      dispatch(getSearchPageVideos(false))
    }
  }

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <nav className="flex fixed top-0 w-screen justify-between items-center px-4 h-14 bg-[#212121] z-40">
      <div className="flex gap-2 md:gap-8 items-center text-2xl">
        <div>
          <HiMenuAlt3
            className="cursor-pointer hover:opacity-80 duration-200 transition-all"
            onClick={
              isTabletOrMobile
                ? () => dispatch(setOpenMenuMobile())
                : () => dispatch(setOpenMenu())
            }
          />
        </div>
        <Link to="/">
          <div className="flex gap-1 items-center justify-center">
            <img src="/youtube-logo.png" className="w-8 h-6" />
            <span className="hidden md:block text-xl font-medium">YouTube</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-5">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSearch()
          }}
        >
          <div className="flex bg-[#121212] items-center h-10 px-4 pr-0">
            <div className="flex gap-4 items-center pr-5">
              <input
                type="text"
                placeholder="Pesquisar"
                className="w-20 md:w-96 bg-[#121212] outline-none border-none"
                value={searchTerm}
                onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
              />
              <AiOutlineClose
                className={`text-xl cursor-pointer transition duration-500 transform hover:rotate-[360deg] hover:scale-105 ${
                  !searchTerm ? 'invisible' : 'visible'
                }`}
                onClick={() => dispatch(clearSearchTerm())}
              />
            </div>
            <button className="h-10 w-16 flex items-center justify-center bg-zinc-800">
              <AiOutlineSearch className="text-xl cursor-pointer hover:opacity-80 duration-200 transition-all" />
            </button>
          </div>
        </form>
        <div className="text-xl p-3 bg-zinc-900 hidden md:block rounded-full">
          <TiMicrophone className="hidden md:block cursor-pointer hover:opacity-80 duration-200 transition-all" />
        </div>
      </div>
      <div className="flex gap-5 items-center text-xl">
        <BsCameraVideo className="hidden md:block cursor-pointer hover:opacity-80 duration-200 transition-all" />
        <IoAppsSharp className="hidden md:block cursor-pointer hover:opacity-80 duration-200 transition-all" />
        <div className="relative hidden md:block">
          <BsBell className="hidden md:block cursor-pointer hover:opacity-80 duration-200 transition-all" />
          <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
            8+
          </span>
        </div>
        <img
          src="https://github.com/stardusteight-d4c.png"
          alt="user/profile"
          className="w-9 h-9 rounded-full cursor-pointer"
        />
      </div>
    </nav>
  )
}

export default Navbar
