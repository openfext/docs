# 插件注册

[Vue Plugin](https://cn.vuejs.org/v2/guide/plugins.html) 是扩展 Vue 的一个重要方式。在 Vue Admin Next 中，官方的 Vue Router、Vuex、Vue Composition API 及第三方的 Element UI、VeeValidate 等都是通过插件提供的。在 Vue Admin Next 中也会抽取部分功能（**全局组件、指令、Mixin 等**）作为 Vue Plugin 形式的插件，放在 `src/common/plugins` 目录中，并统一通过 `src/plugins.js` 进行配置和注册。

## 基础插件示例

以下为项目中的 logger 插件的源码，通过 `src/base/log` 为每个组件实例创建属于自己的 `$logger` 对象。

```js
import Log from '@/base/log'

const install = function(Vue, options) {
  Vue.mixin({
    beforeCreate: function() {
      const vm = this
      const loggerName = vm.$options._componentTag || 'vm'

      vm.$logger = Log.createLogger({
        tag: loggerName,
      })
    },
  })
}

export default {
  // 插件名称，注册插件时可根据名称传递配置
  name: 'logger',

  install,
}
```
