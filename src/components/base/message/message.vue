<template>
  <teleport to="body">
    <transition name="slide-down">
      <div class="message" v-show="visible" @click="hide">
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
  export default {
    name: 'message',
    props: {
      delay: {
        type: Number,
        default: 1000
      }
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      show() {
        this.visible = true
        clearTimeout(this.timer) // 在使用定时器前先清除定时器，防止定时器叠加。
        this.timer = setTimeout(() => {
          this.hide()
        }, this.delay)
      },
      hide() {
        clearTimeout(this.timer)
        this.visible = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .message {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 400;
    background: $color-dialog-background;

    &.slide-down-enter-active, &.slide-down-leave-active {
      transition: all 0.3s
    }

    &.slide-down-enter-from, &.slide-down-leave-to {
      transform: translate3d(0, -100%, 0)
    }
  }
</style>
