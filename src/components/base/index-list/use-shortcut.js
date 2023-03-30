import { ref, computed } from 'vue'

export default function useShortcut(props, groupRef) {
  const ANCHOR_HEIGHT = 18
  const scrollRef = ref(null)

  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  const touch = {}

  // 点击侧边栏实现跳转
  function onShortcutTouchStart(e) {
    const anchorIndex = parseInt(e.target.dataset.index) // 拿到目标索引
    scrollTo(anchorIndex)

    touch.y1 = e.touches[0].pageY // 拿到一开始的纵坐标
    touch.anchorIndex = anchorIndex
  }

  // 按住侧边栏拖动实现跳转
  // 实现逻辑：用移动完的纵坐标减去一开始的纵坐标得到移动的距离除以
  // 每个字母的高度18px得到移动了多少个字母，然后通过原字母加上移动的字母计算出目标字母
  function onShortcutTouchMove(e) {
    touch.y2 = e.touches[0].pageY // 拿到移动完的纵坐标
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    // 计算目标索引:初始索引加上偏移量
    const anchorIndex = touch.anchorIndex + delta
    scrollTo(anchorIndex)
  }

  // 根据索引进行滚动跳转的逻辑：
  function scrollTo(index) {
    if (isNaN(index)) {
      return
    }
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index)) // 把index限制在区块内部
    const targetEl = groupRef.value.children[index] // 拿到对应要滚动到的组的dom
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0) // 跳转
  }

  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}