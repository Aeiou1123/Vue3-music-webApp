import MusicList from '@/components/music-list/music-list'
import storage from 'good-storage'
import { processSongs } from '@/service/song'

// 创建详情组件函数
export default function createDetailComponent(name, key, fetch) {
  return {
    name,
    components: { MusicList },
    props: {
      data: Object
    },
    data() {
      return {
        songs: [],
        loading: true
      }
    },
    computed: {
      computedData() {
        let ret = null
        const data = this.data
        if (data) { // 如果有data数据，即是通过歌手列表点进歌手详情页的
          ret = data
        } else { // 没有data就从缓存里面取，如果取到的data的mid和当前路由的id一样，即从当前页面重新渲染，就把data数据赋值给ret
          const cached = storage.session.get(key)
          if (cached && (cached.mid || cached.id + '') === this.$route.params.id) {
            ret = cached
          }
        }
        return ret
      },
      pic() {
        const data = this.computedData
        return data && data.pic
      },
      title() {
        const data = this.computedData
        return data && (data.name || data.title)
      }
    },
    async created() {
      // 如果当前路径和当前页面路由不匹配，就回到上一个页面
      const data = this.computedData
      if (!data) {
        const path = this.$route.matched[0].path
        this.$router.push({
          path
        })
        return
      }
      const result = await fetch(data)
      // console.log(result)
      this.songs = await processSongs(result.songs)
      this.loading = false
    }
  }
}
