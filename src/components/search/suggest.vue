<!-- 搜索结果组件 -->
<template>
  <div class="suggest-empty" v-show="!songs.length">抱歉，无搜索结果</div>
  <div
    class="suggest"
    v-loading:[loadingText]="loading"
  >
    <ul class="suggest-list">
      <li
        class="suggest-item"
        v-if="songs.length"
        @click="selectSinger(singer)"
      >
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer }}</p>
        </div>
      </li>
      <li
        class="suggest-item"
        v-for="song in songs"
        :key="song.id"
        @click="selectSong(song)"
      >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">
            {{song.singer}}-{{song.name}}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
// import { processSongs } from '@/service/song'
// import { search } from '@/service/search'
// import { getSingerDetail, getSingerList } from '@/service/singer'

export default {
  name: 'suggest',
  props: {
    query: String, // 搜索框中输入的内容
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  emits: ['select-song', 'select-singer'],
  setup(props, { emit }) {
    const singer = ref(null)
    const songs = ref([])
    const hasMore = ref(true)
    const page = ref(1) // 页码
    const loadingText = ref('')
    const singersdata = [
        {
          singer: '时代少年团',
          name: '渐暖'
        },
        {
          singer: '时代少年团',
          name: '有你的季节'
        },
        {
          singer: '时代少年团',
          name: '理想之途'
        },
        {
          singer: '时代少年团',
          name: '第一天'
        },
        {
          singer: '薛之谦',
          name: '刚刚好'
        },
        {
          singer: '薛之谦',
          name: '演员'
        },
        {
          singer: '薛之谦',
          name: '绅士'
        },
        {
          singer: '薛之谦',
          name: '天外来物'
        },
        {
          singer: '薛之谦',
          name: '认真的雪'
        },
        {
          singer: '薛之谦',
          name: '动物世界'
        },
        {
          singer: '薛之谦',
          name: '暧昧'
        },
        {
          singer: '周杰伦/袁咏琳',
          name: '画沙'
        },
        {
          singer: '周杰伦',
          name: '兰亭序'
        },
        {
          singer: '周杰伦',
          name: '听妈妈的话'
        },
        {
          singer: '周杰伦/方文山',
          name: '晴天'
        },
        {
          singer: '张杰/张碧晨',
          name: '只要平凡'
        },
        {
          singer: '张杰',
          name: '逆战'
        },
        {
          singer: '张杰',
          name: '剑心'
        },
        {
          singer: 'G.E.M. 邓紫棋',
          name: '桃花诺'
        },
        {
          singer: 'G.E.M. 邓紫棋',
          name: '泡沫'
        },
        {
          singer: 'G.E.M. 邓紫棋',
          name: '再见'
        },
        {
          singer: '任然',
          name: '有可能的夜晚'
        },
        {
          singer: '任然',
          name: '你好陌生人'
        },
        {
          singer: '邓丽君',
          name: '甜蜜蜜'
        },
        {
          singer: '邓丽君/刀郎',
          name: '暮雪'
        },
        {
          singer: '林俊杰',
          name: '心墙'
        },
        {
          singer: '林俊杰',
          name: '关键词'
        },
        {
          singer: '林俊杰',
          name: '美人鱼'
        },
        {
          singer: '陈奕迅',
          name: '富士山下'
        },
        {
          singer: '陈奕迅',
          name: '爱情转移'
        },
        {
          singer: '陈奕迅/林俊杰',
          name: '红玫瑰'
        }
      ]

    const loading = computed(() => {
      // return !singer.value && !songs.value.length
      return !songs.value.length
    })

    // 监听输入框内容的变化
    watch(() => props.query, async (newQuery) => {
      if (!newQuery) {
        return
      }
      await searchFirst()
      songs.value = singersdata.filter(item => item.singer.indexOf(newQuery) > -1 || item.name.indexOf(newQuery) > -1)
      singer.value = newQuery
      // const res = await getSingerList()
      // console.log(res)
      // const result = await getSingerDetail(singer) // 这个singer应该是先对比newQuery和getSingerList里面的歌手名，
      // console.log(result) // 如果有值的话就返回那个歌手数据singer(包含歌手名和mid),然后传给getSingerDetail,拿到该歌手的歌手名和歌曲名。

      // console.log(newQuery) // newQuery是输入框中的内容(改变前后)
      // 假如只能输入歌手名，那么把这个newQuery跟getSingerList里面的歌手名做比对，
      // 一样的话就拿到该歌手的mid，再传入getSingerDetail拿到该歌手的歌曲做渲染。
    })

    async function searchFirst() {
      page.value = 1
      songs.value = []
      singer.value = null
      hasMore.value = true

      // const result = await search(props.query, page.value, props.showSinger)
      // console.log(result)
      // songs.value = await processSongs(result.songs)
      // hasMore.value = result.hasMore
      // singer.value = result.singer
    }

    function selectSinger(singer) {
      emit('select-singer', singer)
    }

    function selectSong(song) {
      emit('select-song', song)
    }

    return {
      singer,
      songs,
      loadingText,
      loading,
      selectSinger,
      selectSong
    }
  }
}
</script>

<style lang="scss" scoped>
  .suggest-empty{
    font-size: 18px;
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
  .suggest {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      padding: 0 30px;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        .icon {
          flex: 0 0 30px;
          width: 30px;
          [class^="icon-"] {
            font-size: 14px;
            color: $color-text-d;
          }
        }
        .name {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-d;
          overflow: hidden;
          .text {
            @include no-wrap();
          }
        }
      }
    }
  }
</style>
