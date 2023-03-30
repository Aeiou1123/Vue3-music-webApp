// 创建像loading一样的自定义指令
import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeCls = 'g-relative'

// createLoadingLikeDirective的作用：把Loading组件动态生成的dom动态插入到loading作用的dom上。
// 就是当loading为true时，插入；loading更新后，移除。接收一个参数Comp，是指令名称。
export default function createLoadingLikeDirective(Comp) {
  return {
    // 指令挂载的时候执行的钩子函数：
    mounted(el, binding) {
      // 创建一个app实例，他的根组件是Loading组件
      const app = createApp(Comp)
      const instance = app.mount(document.createElement('div'))
      const name = Comp.name // 取到指令名称
      if (!el[name]) {
        el[name] = {}
      }
      el[name].instance = instance // 根据指令名称把instance存储到不同的指令中,防止不同的指令作用到用一个元素中出现instance覆盖的现象。

      const title = binding.arg // 通过动态参数设置标题
      if (typeof title !== 'undefined') {
        instance.setTitle(title)
      }
      if (binding.value) {
        append(el)
      }
    },
    // 指令更新的时候执行的钩子函数：
    updated(el, binding) {
      const title = binding.arg // 通过动态参数设置标题
      const name = Comp.name
      if (typeof title !== 'undefined') {
        el[name].instance.setTitle(title)
      }
      // loading为true挂载dom，false移除dom
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }

  // 挂载函数
  function append(el) {
    const name = Comp.name
    const style = getComputedStyle(el) // 拿到el的style
    // 如果el没有定位，就给他添加定位
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
      addClass(el, relativeCls)
    }

    // 将el对象挂载到loading作用的dom
    el.appendChild(el[name].instance.$el)
  }

  // 移除函数
  function remove(el) {
    const name = Comp.name
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }
}
