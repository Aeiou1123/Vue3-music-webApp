import { ref } from 'vue'

// cd与lyric切换逻辑
export default function useMiddleInteractive() {
  // currShow在拖动过程中就会发生变化，currentView只有在手指松开后才会变化
  const currentShow = ref('cd') // 默认显示cd视图层
  const middleLStyle = ref(null)
  const middleRStyle = ref(null)

  const touch = {}
  let currentView = 'cd' // 拖动完成后显示的视图层

  function onMiddleTouchStart(e) {
    touch.startX = e.touches[0].pageX
    touch.startY = e.touches[0].pageY
    touch.directionLocked = '' // 方向锁
  }

  function onMiddleTouchMove(e) {
    const deltaX = e.touches[0].pageX - touch.startX // 手指横向滑动距离
    const deltaY = e.touches[0].pageY - touch.startY // 手指纵向滑动距离
    // Math.abs是取绝对值
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    // 如果横向偏移大于纵向偏移，就让他锁定横向滑动，否则就纵向滑动。
    if (!touch.directionLocked) {
      touch.directionLocked = absDeltaX >= absDeltaY ? 'h' : 'v'
    }
    if (touch.directionLocked === 'v') {
      return
    }

    // 到边框的距离,lyric距左边框一个屏幕宽度
    const left = currentView === 'cd' ? 0 : -window.innerWidth
    // 偏移量(限制在0到-window.innerWidth)
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
    // lyric的偏移比例
    touch.percent = Math.abs(offsetWidth / window.innerWidth)

    // 当从cd拖动到lyric时，拖动比例超过30%，就更改显示图层。
    if (currentView === 'cd') {
      if (touch.percent > 0.3) {
        currentShow.value = 'lyric'
      } else {
        currentShow.value = 'cd'
      }
    } else { // 当从lyric拖动到cd时，拖动比例小于70%，就更改显示图层。
      if (touch.percent < 0.7) {
        currentShow.value = 'cd'
      } else {
        currentShow.value = 'lyric'
      }
    }

    middleLStyle.value = {
      opacity: 1 - touch.percent,
      transitionDuration: '0ms'
    }
    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px,0,0)`,
      transitionDuration: '0ms'
    }
  }

  function onMiddleTouchEnd() {
    let offsetWidth // cd层的偏移量
    let opacity // cd层的透明度

    if (currentShow.value === 'cd') {
      currentView = 'cd'
      offsetWidth = 0
      opacity = 1
    } else {
      currentView = 'lyric'
      offsetWidth = -window.innerWidth
      opacity = 0
    }

    const duration = 300
    middleLStyle.value = {
      opacity,
      transitionDuration: `${duration}ms`
    }
    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px,0,0)`,
      transitionDuration: `${duration}ms`
    }
  }

  return {
    currentShow,
    middleLStyle,
    middleRStyle,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd
  }
}