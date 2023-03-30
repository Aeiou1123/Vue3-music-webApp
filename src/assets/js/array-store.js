// 本地存储数据
import storage from 'good-storage'

// 判断val是否在arr中,在的话就不用重复插入，不在就插入arr数组
function inertArray(arr, val, compare, maxLen) {
  // compare是一个外部定义的方法，用来判断传入的数据是否在数组中已经存在
  const index = arr.findIndex(compare)
  if (index === 0) { // 如果歌曲已经存在并且是第一首歌就什么都不做
    return
  }
  if (index > 0) { // 如果歌曲存在但是不是第一首歌，就先把它删掉，
    arr.splice(index, 1) // 下面再通过unshift添加为第一首歌。
  }
  arr.unshift(val)

  // 如果超过最大长度，就把最先插进来的弹出去
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

// 移除函数
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 保存
export function save(item, key, compare, maxLen) {
  const items = storage.get(key, []) // 取到key是__favorite__的storage里面的数据，没有的话就给空数组
  inertArray(items, item, compare, maxLen)
  storage.set(key, items) // 将修改后的数据存储到storage中
  return items
}

// 移除
export function remove(key, compare) {
  const items = storage.get(key, [])
  deleteFromArray(items, compare)
  storage.set(key, items)
  return items
}

// 从本地存储拿数据
export function load(key) {
  return storage.get(key, [])
}

// 清空数据
export function clear(key) {
  storage.remove(key)
  return []
}

// 存储数据
export function saveAll(items, key) {
  storage.set(key, items)
}