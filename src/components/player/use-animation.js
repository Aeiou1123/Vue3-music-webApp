import { ref } from 'vue'
import animations from 'create-keyframe-animation'

// cd缩放动画相关逻辑
export default function useAnimation() {
  const cdWrapperRef = ref(null)
  let entering = false
  let leaving = false

  // 进入cd页面的动画
  function enter(el, done) {
    if (leaving) {
      afterLeave()
    }
    const { x, y, scale } = getPosAndScale()
    entering = true

    // 先把大cd图偏移到左下角mini播放器小cd图的位置，再用动画过渡到中间。
    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      },
      100: {
        transform: 'translate3d(0, 0, 0) scale(1)'
      }
    }

    // 通过animations动态注册动画
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 600,
        easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
      }
    })
    // 结束动画
    animations.runAnimation(cdWrapperRef.value, 'move', done)
  }

  // 清理动画
  function afterEnter() {
    entering = false
    animations.unregisterAnimation('move')
    cdWrapperRef.value.animation = ''
  }

  function leave(el, done) {
    if (entering) {
      afterEnter()
    }
    leaving = true
    const { x, y, scale } = getPosAndScale()
    const cdWrapperEl = cdWrapperRef.value

    cdWrapperEl.style.transition = 'all .6s cubic-bezier(0.45, 0, 0.55, 1)'
    cdWrapperEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    cdWrapperEl.addEventListener('transitionend', next)

    // transition结束之后解绑事件并且结束动画
    function next() {
      cdWrapperEl.removeEventListener('transitionend', next)
      done()
    }
  }

  // 清理动画
  function afterLeave() {
    leaving = false
    const cdWrapperEl = cdWrapperRef.value
    cdWrapperEl.style.transition = ''
    cdWrapperEl.style.transform = ''
  }

  // 计算偏移量和缩放比例
  function getPosAndScale() {
    const targetWidth = 40
    const paddingLeft = 40
    const paddingBottom = 30
    const paddingTop = 80
    const width = window.innerWidth * 0.8 // 大cd图的宽度
    // 计算偏移量
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    // 计算缩放比(小cd除以大cd图)
    const scale = targetWidth / width

    return {
      x,
      y,
      scale
    }
  }

  return {
    cdWrapperRef,
    enter,
    afterEnter,
    leave,
    afterLeave
  }
}