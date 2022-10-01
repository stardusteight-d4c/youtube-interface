import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

type Props = {}

const Spinner = (props: Props) => {
  const location = useLocation()
  const initialOpenMenu = useAppSelector(
    (state) => state.youtubeApp.initialOpenMenu
  )
  const initialCloseMenu = useAppSelector(
    (state) => state.youtubeApp.initialCloseMenu
  )

  const isWatchPage = location.pathname.includes('watch')
  // initial state of the menu is changed according to the view port
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const menuState =
    isTabletOrMobile || isWatchPage ? initialCloseMenu : initialOpenMenu

  return (
    <>
        <div className={`${menuState && 'ml-[57%]'} flex items-center w-12 mx-auto justify-center py-3`}>
          <div className="w-10 h-10 border-2 border-[#ff0000] border-solid rounded-full animate-spin border-t-transparent" />
        </div>
     
    </>
  )
}

export default Spinner
