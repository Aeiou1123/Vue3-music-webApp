import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue'

// 注册silde插件
BScroll.use(Slide)

export default function useSlider(wrapperRef) {
  const slider = ref(null)
  const currentPageIndex = ref(0)

  onMounted(() => {
    const sliderVal = slider.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: true, // 开启横向滚动
      scrollY: false,
      momentum: false, // 关闭滚动动画
      bounce: false, // 滚动到边缘没有回弹动画
      probeType: 2, // 仅仅当手指按在滚动区域上，一直派发 scroll 事件
      slide: true
    })

    // 当page改变时会触发slideWillChange事件，从而拿到page
    sliderVal.on('slideWillChange', (page) => {
      currentPageIndex.value = page.pageX
    })
  })

  // 销毁
  onUnmounted(() => {
    slider.value.destroy()
  })

  onActivated(() => {
    slider.value.enable()
    slider.value.refresh()
  })

  onDeactivated(() => {
    slider.value.disable()
  })

  return {
    slider,
    currentPageIndex
  }
}
