import Tip from './tip'

function clearEvent (el) {
  if (el._tipHandler) {
    el.removeEventListener('click', el._tipHandler)
    el.removeEventListener('mouseenter', el._tipHandler)
  }
  if (el._tipMouseleaveHandler) {
    el.removeEventListener('mouseleave', el._tipMouseleaveHandler)
  }
  delete el._tipHandler
  delete el._tipMouseleaveHandler
  delete el._tipOptions
  delete el._tipInstance
}
/**
 *
 * @param {info, dark, danger, err, error, warning, warn, success, primary} theme
 * @function 自定义主题
 * @description info, danger, warning, success  default general
 */
function cusTheme(theme) {
  if (theme.info || theme.dark) {
    return 'info';
  } else if (theme.danger || theme.err || theme.error) {
    return 'danger'
  } else if (theme.warning || theme.warn) {
    return 'warning'
  } else if (theme.success) {
    return 'success'
  } else if (theme.primary) {
    return 'primary'
  } else {
    return 'general'
  }
}

export default {
  install (Vue, options) {
    options = options || {}
    // 自定义指令的名字，默认为 tip
    const name = options.directiveName || 'tip'
    // tip 的展示方向
    const allPlacements = ['top', 'right', 'bottom', 'left']

    Vue.directive(name, {
      bind (el, binding) {
        clearEvent(el)
        const { click, info, dark, danger, err, error, warning, warn, success, primary, transition, multiple } = binding.modifiers
        const limitPlacementQueue = allPlacements.filter(placement => binding.modifiers[placement])
        el._tipOptions = binding.value
        el._tipHandler = function tipHandler (e) {
          e.stopPropagation();
          if (this._tipOptions == null) return
          const options = this._tipOptions
          const placements = limitPlacementQueue.length
            ? limitPlacementQueue : allPlacements
          const mix = {
            multiple,
            placements,
            transition,
            theme: cusTheme({info, dark, danger, err, error, warning, warn, success, primary})
          }
          // 一般情况为 v-tip 绑定需要显示的内容
          // 需要配置时可以直接绑定一个配置对象
          const tipOptions = typeof options === 'object'
            ? Object.assign(mix, options, { target: this })
            : Object.assign(mix, { content: String(options), target: this })
          this._tipInstance = Tip(tipOptions)
        }
        el._tipMouseleaveHandler = function tipMouseleaveHandler () {
          if (this._tipInstance) {
            this._tipInstance.hiddenTip()
          }
        }
        // 默认触发方式为 hover 触发
        if (click) {
          el.addEventListener('click', el._tipHandler)
        } else {
          el.addEventListener('mouseenter', el._tipHandler)
        }
        el.addEventListener('mouseleave', el._tipMouseleaveHandler)
      },

      update (el, { value, oldValue }) {
        if (value === oldValue) return
        el._tipOptions = value
      },

      unbind (el) {
        const instance = el._tipInstance
        if (instance && instance.destroy) {
          instance.destroy()
        }
        clearEvent(el)
      }
    })
  }
}
