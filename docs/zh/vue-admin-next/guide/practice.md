# 通用开发模式

## 状态管理

关于 Vuex 的使用场景，可以参考一下这两个问题：

### 是否真的需要 Vuex？

经过实践，在后台系统常见的表格查询、表单填写页面中，Vuex 并不是必需的。主要有以下两点原因：

- 通常情况下，一个容器组件 + 若干子组件就能满足需求，建议尽量减少组件层级，将状态维护在父组件中即可
- 切换路由时，由于 Vuex 中的状态是单例的，因此使用相同组件的页面（如表单新建页、表单回填页）需要手动重置 Vuex 的状态

### 什么时候使用 Vuex？

一般建议当状态跨越多个组件层级，或不同的模块/页面时使用：

- 某个状态可能被应用中的多个组件依赖，例如用户信息
- 跨页面、跨模块的数据，例如分别从页面 A 和页面 B 选择数据，然后统一进行的批量操作

## 操作权限判断

在实际应用中，通常有需要根据用户权限才出现的按钮、链接等页面元素。Vue Admin Next 基于公共的 [AuthService](./user.md#AuthService) 封装了用于判断权限的 Renderless 组件。源码在 `src/common/plugins/auth/provider/AuthProvider.js`。

使用方式参考，可通过插槽作用域提供的 `provider` 调用 AuthService 的方法：

```vue
<!-- 需要权限 AUTH_action_example_offline -->
<auth-provider v-slot="{ provider }">
  <el-button :disabled="!provider.hasActionAuth('example_offline')">
    下线
  </el-button>
</auth-provider>
```

## Loading

大部分前端页面都存在很多异步的交互，如保存数据、获取数据。由于存在一定等待时间，为了防止重复操作、提升用户感知，应该尽量有明确的过渡效果。Element UI 组件库就提供了通用的 [Loading](https://element.eleme.io/#/zh-CN/component/loading) 动效，通过 `v-loading` 指令可以很方便地实现任意组件的过渡效果（`el-button` 通过单独的 `loading` 属性控制）。

唯一存在的问题是，在每个需要 Loading 地方，你都需要手动维护一个状态，略显繁琐。因此，Vue Admin Next 使用了 [Vue Use](https://github.com/openfext/vue-use) 的 `useLoaing` 的 Composition API，可以很方便地为异步操作提供 `loading` 状态，示例如下：

```html
<template>
  <div>
    <!-- 为 el-form 添加 loading 效果 -->
    <el-form label-width="200px" v-loading="loading">
      <!-- loading 时禁用保存按钮 -->
      <el-button :disabled="loading" @click="save">
        提交
      </el-button>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
  import { useLoading } from '@fext/vue-use'

  export default {
    name: 'example-form',

    setup() {
      const { loading, withLoading } = useLoading()

      return {
        loading,
        withLoading,
      }
    },

    methods: {
      async save() {
        // 通过 withLoading 包裹异步操作，自动设置 loading 状态
        this.withLoading(async () => {
          // await 调用或返回  Promise
        })
      },
    },
  }
</script>
```

## 一键复制文本

为了简化文本复制的操作，项目中使用 [copy-text-to-clipboard](https://github.com/sindresorhus/copy-text-to-clipboard) 插件封装了文本组件 `clipboard-text`（源码：`src/common/components/ui/clipboard-text/ClipboardText.vue`）。

在使用该插件展示文本的地方，单击鼠标左键即可复制文本。使用方法：

```vue
<clipboard-text>单击复制我</clipboard-text>
```
