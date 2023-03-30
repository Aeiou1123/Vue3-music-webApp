import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/util'

// 顺序播放
export function selectPlay({ commit }, { list, index }) {
  commit('setPlayMode', PLAY_MODE.sequence)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true) // 点击歌曲的时候展开歌曲播放页
  commit('setPlaylist', list)
  commit('setCurrentIndex', index)
}

// 随机播放
export function randomPlay({ commit }, list) {
  commit('setPlayMode', PLAY_MODE.random)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlaylist', shuffle(list)) // 对原列表进行洗牌
  commit('setCurrentIndex', 0) // 播放第一首歌曲
}

// 切换播放模式
export function changeMode({ commit, state, getters }, mode) {
  const currentId = getters.currentSong.id // 取到当前播放歌曲的id

  if (mode === PLAY_MODE.random) { // 如果是随机播放模式就对顺序播放列表进行洗牌
    commit('setPlaylist', shuffle(state.sequenceList))
  } else { // 是顺序或者循环播放模式就不用洗牌
    commit('setPlaylist', state.sequenceList)
  }
  // 此时的playlist是经过切换模式后新的歌曲列表了，然后找到列表中的当前播放歌曲
  const index = state.playlist.findIndex((song) => {
    return song.id === currentId
  })

  commit('setCurrentIndex', index) // 让新的歌曲列表先播放当前歌曲，这样切换模式之后会先把当前歌曲播放完，而不会切换到下一首歌。
  commit('setPlayMode', mode)
}

// 删除歌曲
export function removeSong({ commit, state }, song) {
  const sequenceList = state.sequenceList.slice()
  const playlist = state.playlist.slice()

  const sequenceIndex = findIndex(sequenceList, song)
  const playIndex = findIndex(playlist, song)
  if (sequenceIndex < 0 || playIndex < 0) {
    return
  }

  sequenceList.splice(sequenceIndex, 1)
  playlist.splice(playIndex, 1)

  let currentIndex = state.currentIndex
  if (playIndex < currentIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit('setSequenceList', sequenceList)
  commit('setPlaylist', playlist)
  commit('setCurrentIndex', currentIndex)
  if (!playlist.length) {
    commit('setPlayingState', false)
  }
}

// 清空歌单
export function clearSongList({ commit }) {
  commit('setSequenceList', [])
  commit('setPlaylist', [])
  commit('setCurrentIndex', 0)
  commit('setPlayingState', false)
}

// 添加歌曲到播放列表
export function addSong({ commit, state }, song) {
  const playlist = state.playlist.slice()
  const sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  // 查找歌曲是否已经在播放列表中，如果已经存在就修改播放索引。不在的话就添加歌曲到当前播放列表
  const playIndex = findIndex(playlist, song)
  if (playIndex > -1) {
    currentIndex = playIndex
  } else {
    playlist.push(song)
    currentIndex = playlist.length - 1
  }

  const sequenceIndex = findIndex(sequenceList, song)
  if (sequenceIndex === -1) {
    sequenceList.push(song)
  }

  commit('setSequenceList', sequenceList)
  commit('setPlaylist', playlist)
  commit('setCurrentIndex', currentIndex)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
}

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}