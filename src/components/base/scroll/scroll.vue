<template>
  <!-- 滚动组件 -->
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
  import useScroll from './use-scroll'
  import { ref } from 'vue'

  export default {
    name: 'scroll',
    props: { // 配置项
      click: {
        type: Boolean,
        default: true // 默认可点击
      },
      probeType: {
        type: Number,
        default: 0 // 默认不派发scroll事件
      }
    },
    emits: ['scroll'], // 自定义scroll事件
    setup(props, { emit }) {
      const rootRef = ref(null)
      const scroll = useScroll(rootRef, props, emit)

      return {
        rootRef,
        scroll
      }
    }
  }
</script>
