export interface InitialState {
  videos: HomePageVideos[]
  currentPlaying: CurrentPlaying | null
  searchTerm: string
  searchResults: []
  nextPageToken: string | null
  recommendedVideos: RecommendedVideos[]
}

export interface HomePageVideos {
  videoId: string
  videoTitle: string
  videoDescription: string
  videoThumbnail: string
  videoLink: string
  videoDuration: string
  videoViews: string
  videoAge: string
  channelInfo: {
    id: string
    image: string
    name: string
  }
}
export interface CurrentPlaying {}
export interface RecommendedVideos {}
