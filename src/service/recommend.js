import { get } from './base'

// 请求推荐页面数据
export function getRecommend() {
  return get('/api/getRecommend')
}

// 请求专辑(歌单详情页)数据
export function getAlbum(album) {
  return get('/api/getAlbum', {
    id: album.id
  })
}