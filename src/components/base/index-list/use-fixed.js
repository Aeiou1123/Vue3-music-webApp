import { ref, watch, nextTick, computed } from 'vue'

export default function useFixed(props) {
 // 拿到整个歌手列表dom
  const groupRef = ref(null)
  // listHeights用来记录每一个歌手列表的高度区间
  const listHeights = ref([])
  const scrollY = ref(0) // 滚动的Y距离
  const currentIndex = ref(0) // 当前渲染的歌手列表组的索引
  const distance = ref(0) // 当前组的下一个组的顶部距离容器顶部的距离
  const TITLE_HEIGHT = 30 // 固定标题盒子的高度

  // 通过索引拿到当前组的标题
  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return ''
    }
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  // 标题偏移动画
  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    // 计算偏移量，当distanceVal大于0且小于固定标题盒子的高度时，满足偏移条件
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
    return { transform: `translate3d(0,${diff}px,0)` }
  })

  // 当数据发生变化时，执行计算函数
  watch(() => props.data, async () => {
    await nextTick()
    calculate()
  })

  // 监听滚动,判断滚动到了哪个区间
  watch(scrollY, (newY) => {
    const listHeightsVal = listHeights.value
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      const heightTop = listHeightsVal[i] // 单个歌手列表的顶部
      const heightBottom = listHeightsVal[i + 1] // 单个歌手列表的底部
      // 判断是否滚动到此区间，并且拿到此组的索引
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i
        distance.value = heightBottom - newY
      }
    }
  })

  // 计算每个列表高度
  function calculate() {
    // list是groupRef里面的每一个歌手列表
    const list = groupRef.value.children
    const listHeightsVal = listHeights.value
    let height = 0

    listHeightsVal.length = 0
    listHeightsVal.push(height)

    // 遍历歌手列表，计算出每一个列表的高度
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }

  function onScroll(pos) {
    scrollY.value = -pos.y // 通过pos.y拿到滚动的Y值
  }

  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle,
    currentIndex
  }
}