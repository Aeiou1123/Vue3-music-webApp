import { get } from './base'

// 请求歌手页面数据
export function getSingerList() {
  return get('/api/getSingerList')
}

// 请求歌手详情页数据
export function getSingerDetail(singer) {
  return get('/api/getSingerDetail', {
    mid: singer.mid // 歌手的唯一标识
  })
}