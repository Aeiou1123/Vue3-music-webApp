import { useStore } from 'vuex'
import { computed } from 'vue'
import { PLAY_MODE } from '@/assets/js/constant'

// 切换播放模式相关逻辑
export default function useMode() {
  const store = useStore()
  const playMode = computed(() => store.state.playMode)

  const modeIcon = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence ? 'icon-sequence'
    : playModeVal === PLAY_MODE.random ? 'icon-random' : 'icon-loop'
  })

  function changeMode() {
    const mode = (playMode.value + 1) % 3 // 让mode的值是0到3
    store.dispatch('changeMode', mode) // 派发一个changeMode的action
  }

  return {
    modeIcon,
    changeMode
  }
}