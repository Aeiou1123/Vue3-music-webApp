import { useStore } from 'vuex'
import { computed, watch, ref } from 'vue'
import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser' // lyric-parser是一个第三方库，可以对歌词进行解析

// 歌词相关逻辑
export default function useLyric({ songReady, currentTime }) {
  const currentLyric = ref(null) // 当前歌曲歌词
  const currentLineNum = ref(0) // 当前显示行号
  const pureMusicLyric = ref('') // 纯音乐歌词提示文本
  const playingLyric = ref('') // 当前正在播放的歌词
  const lyricScrollRef = ref(null)
  const lyricListRef = ref(null)

  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)

  // 当歌曲发生变化(切歌)时请求歌词
  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return
    }
    // 当切歌时，应该暂停播放歌曲，并且把当前歌词、当前行号、纯文本和当前正在播放歌词等重置，
    // 防止getLyric异步过程还没完成而让他们指向前一首歌。
    stopLyric()
    currentLyric.value = null
    currentLineNum.value = 0
    pureMusicLyric.value = ''
    playingLyric.value = ''

    const lyric = await getLyric(newSong)
    // console.log(lyric)
    // 给当前这首歌添加歌词
    store.commit('addSongLyric', {
      song: newSong,
      lyric
    })
    // 如果请求到的歌词和当前歌曲歌词不一致就不再进行下面的逻辑(即在请求歌词的过程中又切歌)
    if (currentSong.value.lyric !== lyric) {
      return
    }

    currentLyric.value = new Lyric(lyric, handleLyric)
    const hasLyric = currentLyric.value.lines.length // 判断有没有歌词(是否是纯音乐)
    // console.log(hasLyric)
    if (hasLyric) {
      if (songReady.value) { // 当歌曲准备好后播放歌词
        playLyric()
      }
    } else {
      playingLyric.value = pureMusicLyric.value = lyric.replace(/\[(\d{2}):(\d{2}):(\d{2})\]/g, '')
    }
  })

  // 播放歌词
  function playLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }

  // 停止播放歌词
  function stopLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }

  // 每次换行都会执行handleLyric
  function handleLyric({ lineNum, txt }) {
    currentLineNum.value = lineNum
    playingLyric.value = txt
    const scrollComp = lyricScrollRef.value
    const listEl = lyricListRef.value
    if (!listEl) {
      return
    }
    // 如果播放到第五行，就让后面的歌词保持在第五行的位置
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5]
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000)
    }
  }

  return {
    currentLyric,
    currentLineNum,
    pureMusicLyric,
    playingLyric,
    lyricScrollRef,
    lyricListRef,
    playLyric,
    stopLyric
  }
}