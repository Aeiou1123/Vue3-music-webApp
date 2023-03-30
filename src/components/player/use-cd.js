// 唱片相关逻辑
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'

export default function useCd() {
  const cdRef = ref(null)
  const cdImageRef = ref(null)

  const store = useStore()
  const playing = computed(() => store.state.playing)

  // 正在播放就给唱片添加旋转的样式
  const cdCls = computed(() => {
    return playing.value ? 'playing' : ''
  })

  // 当暂停播放的时候同步唱片图片和外层div的旋转角度
  watch(playing, (newPlaying) => {
    if (!newPlaying) {
      syncTransform(cdRef.value, cdImageRef.value)
    }
  })

  // 同步外层盒子和内层图片的旋转角度
  function syncTransform(wrapper, inner) {
    // 拿到外层盒子的旋转角度，一开始是没有的，当第二次暂停的时候外层盒子就有了第一次暂停时的同步角度。
    const wrapperTransform = getComputedStyle(wrapper).transform
    // 拿到内层图片的旋转角度
    const innerTransform = getComputedStyle(inner).transform
    // 同步cd图片外层div的旋转角度。如果外层盒子有旋转就要叠加内层图片的旋转角度
    wrapper.style.transform = wrapperTransform === 'none' ? innerTransform
    : innerTransform.concat('', wrapperTransform)
  }

  return {
    cdCls,
    cdRef,
    cdImageRef
  }
}