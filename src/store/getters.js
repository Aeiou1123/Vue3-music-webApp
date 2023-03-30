export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {} // 取到当前播放歌曲
}