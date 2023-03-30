import { useStore } from 'vuex'
import { computed } from 'vue'
import { save, remove } from '@/assets/js/array-store'
import { FAVORITE_KEY } from '@/assets/js/constant'

// 歌曲收藏相关逻辑
export default function useFavorite() {
  const store = useStore()
  const favoriteList = computed(() => store.state.favoriteList)
  const maxLen = 100 // 默认最大收藏数量

  // 切换收藏图标
  function getFavoriteIcon(song) {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }

  // 歌曲收藏或者移除收藏
  function toggleFavorite(song) {
    let list
    if (isFavorite(song)) {
      // 移除收藏
      list = remove(FAVORITE_KEY, compare)
    } else {
      // 添加收藏,maxLen可传可不传
      list = save(song, FAVORITE_KEY, compare, maxLen)
    }
    store.commit('setFavoriteList', list)

    function compare(item) {
      return item.id === song.id
    }
  }

  // 判断歌曲是否在收藏列表中
  function isFavorite(song) {
    return favoriteList.value.findIndex((item) => {
      return item.id === song.id
    }) > -1
  }

  return {
    getFavoriteIcon,
    toggleFavorite
  }
}