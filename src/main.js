import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy' // 引入图片懒加载
import loadingDirective from '@/components/base/loading/directive' // 引入loading自定义指令
import noResultDirective from '@/components/base/no-result/directive' // 引入loading自定义指令
import { load, saveAll } from '@/assets/js/array-store'
import { FAVORITE_KEY, PLAY_KEY } from './assets/js/constant'
import { processSongs } from './service/song'

// 引入全局样式文件
import '@/assets/scss/index.scss'

// 从本地存储中拿到收藏的歌曲,更新歌曲播放地址
const favoriteSong = load(FAVORITE_KEY)
if (favoriteSong.length > 0) {
  processSongs(favoriteSong).then((songs) => {
    store.commit('setFavoriteList', songs)
    saveAll(songs, FAVORITE_KEY)
  })
}

// 从本地存储中拿到最近播放的歌曲,更新歌曲播放地址
const historySongs = load(PLAY_KEY)
if (historySongs.length > 0) {
  processSongs(historySongs).then((songs) => {
    store.commit('setPlayHistory', songs)
    saveAll(songs, PLAY_KEY)
  })
}

createApp(App).use(store).use(router).use(lazyPlugin, {
  loading: require('@/assets/images/default.png')
}).directive('loading', loadingDirective).directive('no-result', noResultDirective)
.mount('#app')