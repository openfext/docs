# useLoading

## `useLoading([options])`

- **参数**：

  - `{object} options`

- **返回**：

  - `{object}`
    - `{boolean} loading` 是否加载中
    - `{function} setLoading` 设置加载状态
    - `{function} withLoading` 执行异步任务的方法并设置 `loading` 状态

- **用法**：

为异步操作添加统一的加载状态。

**withLoading** 方法参数：

- `{function} task` 需要执行的异步操作任务
- `{object} options`

  - `{boolean} autocomplete` 执行完成后是否自动将 `loading` 设置为 `false`

以下是一个基础用法示例，在请求接口时，为 `div` 元素添加 `is-loading` 类：

```vue
<template>
  <div :class="{ 'is-loading': loading }">Content</div>
</template>

<script>
import { useLoading } from '@fext/vue-use'

export default {
  setup() {
    const { loading, withLoading } = useLoading()

    return {
      loading,
      withLoading,
    }
  },

  created() {
    this.withLoading(() => {
      return this.fetchList()
    })
  },

  methods: {
    async fetchList() {
      // remote api
    },
  },
}
</script>
```

- **参考**：[指南 - Loading](../../vue-admin-next/guide/practice.md#loading)
