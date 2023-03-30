import { get } from './base'

export function processSongs(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }

  // 请求歌曲播放地址
  return get('./api/getSongsUrl', {
    mid: songs.map((song) => {
      return song.mid
    })
  }).then((result) => {
    const map = result.map
    return songs.map((song) => {
      song.url = map[song.mid]
      return song
    }).filter((song) => {
      return song.url.indexOf('vkey') > -1
    })
  })
}

const lyricMap = {} // 存放请求过的歌词
// 根据歌曲请求歌词
export function getLyric(song) {
  // 如果歌曲本身已经有歌词，就不用重复请求歌词了
  if (song.lyric) {
    return Promise.resolve(song.lyric)
  }
  const mid = song.mid
  const lyric = lyricMap[mid]
  // 不同的歌单歌曲对应同一个mid，如果同一个mid有歌词的话也不要再次请求歌词了。
  if (lyric) {
    return Promise.resolve(lyric)
  }

  return get('./api/getLyric', {
    mid
  }).then((result) => {
    const lyric = result ? result.lyric : '[00:00:00]该歌曲暂时无法获取歌词'
    lyricMap[mid] = lyric // 将歌曲存到lyricMap中
    return lyric
  })
}