<!-- 歌曲进度条组件 -->
<template>
  <div class="progress-bar" @click="onClick">
    <div class="bar-inner">
      <div
        class="progress"
        :style="progressStyle"
        ref="progress"
      ></div>
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  const progressBtnWidth = 16

  export default {
    name: 'progress-bar',
    emits: ['progress-changing', 'progress-changed'],
    props: {
      progress: { // 歌曲播放进度
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        offset: 0 // 进度条偏移量
      }
    },
    computed: {
      // 黄色进度条
      progressStyle() {
        return `width:${this.offset}px`
      },
      // 进度滑块
      btnStyle() {
        return `transform:translate3d(${this.offset}px,0,0)`
      }
    },
    watch: {
      progress(newProgress) {
        this.setOffset(newProgress)
      }
    },
    created() {
      // 为什么touch不定义在data中，而要定义在created中？因为touch数据只是为了在函数中共享(在组件上下文中共享)，
      // 并不在页面上渲染， 不用定义为响应式的数据。如果在data中定义为响应式数据会造成性能的浪费。
      this.touch = {}
    },
    methods: {
      onTouchStart(e) {
        // 开始点击的x值
        this.touch.x1 = e.touches[0].pageX
        // 初始的黄色进度条宽度
        this.touch.beginWidth = this.$refs.progress.clientWidth
      },
      onTouchMove(e) {
        // 偏移的横向位移(往后移是正，往前移是负)
        const delta = e.touches[0].pageX - this.touch.x1
        // 拖动时进度条的宽度
        const tempWidth = this.touch.beginWidth + delta
        const barWidth = this.$el.clientWidth - progressBtnWidth
        // 计算拖动时的播放进度
        const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))
        this.offset = barWidth * progress
        this.$emit('progress-changing', progress)
      },
      onTouchEnd() {
        const barWidth = this.$el.clientWidth - progressBtnWidth
        // 拖动后的播放进度
        const progress = this.$refs.progress.clientWidth / barWidth
        this.$emit('progress-changed', progress)
      },
      // 点击进度条实现播放进度改变
      onClick(e) {
        // rect是进度条最左边到页面左侧的距离
        const rect = this.$el.getBoundingClientRect()
        // 计算点击的那个点到进度条最左边的距离，即点击进度条时滑块的偏移量
        const offsetWidth = e.pageX - rect.left
        const barWidth = this.$el.clientWidth - progressBtnWidth
        const progress = offsetWidth / barWidth
        this.$emit('progress-changed', progress)
      },
      setOffset(progress) {
        // 总的进度条宽度等于progress-bar的宽度减去进度滑块的宽度
        const barWidth = this.$el.clientWidth - progressBtnWidth
        this.offset = barWidth * progress
      }
    }
  }
</script>

<style lang="scss" scoped>
  .progress-bar {
    height: 30px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        height: 100%;
        background: $color-theme;
      }
      .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn {
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid $color-text;
          border-radius: 50%;
          background: $color-theme;
        }
      }
    }
  }
</style>