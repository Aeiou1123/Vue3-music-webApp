import { get } from './base'

// 获取搜索页面数据
export function getHotKeys() {
  return get('/api/getHotKeys')
}

// 获取搜索后内容
export function search(query, page, showSinger) {
  return get('/api/search', {
    query,
    page,
    showSinger
  })
}
