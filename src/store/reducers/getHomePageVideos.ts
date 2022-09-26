import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { HomePageVideos } from '../../Types'
import { parseData } from '../../utils'
import { YOUTUBE_API_URL } from '../../utils/constants'
import { RootState } from '../index'

const API_KEY = import.meta.env.VITE_APP_YOUTUBE_DATA_API_KEY

export const getHomePageVideos = createAsyncThunk(
  'youtubeApp/homePageVideos',
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?maxResults=20&q="react projects"&key=${API_KEY}&part=snippet&type=video`
    )
    // console.log(items)
    const parsedData: HomePageVideos[] = await parseData(items)
    return { parsedData: [...videos, ...parsedData], nextPageToken }
  }
)
