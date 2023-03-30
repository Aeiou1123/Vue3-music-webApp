import { PLAY_MODE, SEARCH_KEY, PLAY_KEY } from '@/assets/js/constant'
import { load } from '@/assets/js/array-store'

const state = {
  sequenceList: [], // 顺序播放列表
  playlist: [], // 当前正在播放的列表
  playing: false, // 是否正在播放
  playMode: PLAY_MODE.sequence, // 默认顺序播放
  currentIndex: 0, // 当前播放索引
  fullScreen: false, // 当前播放状态(全屏/收缩)
  favoriteList: [], // 收藏歌曲列表
  searchHistory: load(SEARCH_KEY), // 历史搜索列表
  playHistory: load(PLAY_KEY) // 最近播放列表
}

export default state