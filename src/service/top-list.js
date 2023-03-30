import { get } from './base'

// 请求排行榜列表数据
export function getTopList() {
  return get('/api/getTopList')
}

// 请求榜单详情数据
export function getTopDetail(top) {
  return get('/api/getTopDetail', {
    id: top.id,
    period: top.period
  })
}