<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <scroll class="search-content" ref="scrollRef">
      <div>
        <div class="hot-keys" v-show="!query">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li
              class="item"
              v-for="item in hotKeys"
              :key="item.id"
              @click="addQuery(item.key)"
            >
            <span>{{ item.key }}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="!query && searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <confirm
            ref="confirmRef"
            text="是否清空搜索历史"
            confirm-btn-text="清空"
            @confirm="clearSearch"
          ></confirm>
          <search-list
            :searches="searchHistory"
            @select="addQuery"
            @delete="deleteSearch"
          ></search-list>
        </div>
        <div class="search-result" v-show="query">
          <suggest
            :query="query"
            @select-song="selectSong"
            @select-singer="selectSinger"
          ></suggest>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import SearchInput from '@/components/search/search-input.vue'
  import Suggest from '@/components/search/suggest'
  import Scroll from '@/components/wrap-scroll'
  import Confirm from '@/components/base/confirm/confirm.vue'
  import SearchList from '@/components/base/search-list/search-list.vue'
  import { ref, watch, computed, nextTick } from 'vue'
  import { useStore } from 'vuex'
  import useSearchHistory from '@/components/search/use-search-history'
  // import { getHotKeys } from '@/service/search'

  export default {
    name: 'search',
    components: {
      SearchInput,
      Suggest,
      Scroll,
      Confirm,
      SearchList
    },
    setup() {
      const query = ref('')
      const confirmRef = ref(null)
      const scrollRef = ref(null)
      const hotKeys = [
        {
          key: '时代少年团',
          id: 1
        },
        {
          key: '薛之谦',
          id: 2
        },
        {
          key: '周杰伦',
          id: 3
        },
        {
          key: '张杰',
          id: 4
        },
        {
          key: '房东的猫',
          id: 5
        },
        {
          key: '邓紫棋',
          id: 6
        },
        {
          key: '桥边姑娘',
          id: 7
        },
        {
          key: '任然',
          id: 8
        },
        {
          key: '王靖雯不胖',
          id: 9
        }
      ]

      const store = useStore()
      const searchHistory = computed(() => store.state.searchHistory)
      const { saveSearch, deleteSearch, clearSearch } = useSearchHistory()

      // getHotKeys().then((result) => {
      //   // hotKeys.value = result.hotKeys
      //   // console.log(result)
      // })

      watch(query, async (newQuery) => {
        if (!newQuery) {
          await nextTick()
          refreshScroll()
        }
      })

      function refreshScroll() {
        scrollRef.value.scroll.refresh()
      }

      function addQuery(s) {
        query.value = s
      }

      function selectSinger(singer) {
        saveSearch(singer)
      }

      function selectSong(song) {
        saveSearch(`${song.singer}-${song.name}`)
      }

      function showConfirm() {
        confirmRef.value.show()
      }

      return {
        query,
        scrollRef,
        confirmRef,
        hotKeys,
        addQuery,
        searchHistory,
        selectSinger,
        selectSong,
        deleteSearch,
        showConfirm,
        clearSearch
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .search-input-wrapper {
      margin: 20px;
    }
    .search-content {
      flex: 1;
      overflow: hidden;
      .hot-keys {
        margin: 2px 20px 15px 20px;
        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
      .search-history {
        position: relative;
        margin: 0 20px;
        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;
          .text {
            flex: 1;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
    .search-result {
      flex: 1;
      overflow: hidden;
    }
  }
</style>