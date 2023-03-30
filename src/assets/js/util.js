// 洗牌函数
export function shuffle(source) {
  const arr = source.slice() // 使用数组的slice方法得到一个新数组，这样不会改变原数组
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(i)
    swap(arr, i, j)
  }
  return arr
}

// 随机获取从0到max之间的函数
function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1))
}

// 交换函数
function swap(arr, i, j) {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

// 格式化歌曲播放时间
export function formatTime(interval) {
  interval = interval | 0
  const minute = ((interval / 60 | 0) + '').padStart(2, '0')
  const second = (interval % 60 + '').padStart(2, '0')
  return `${minute}:${second}`
}