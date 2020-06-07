# useResize

## useResize([options])

- **参数**：

  - `{Object} options`

- **返回**：

  - `{Object}`
    - `{number} windowInnerWidth` window.innerWidth
    - `{number} windowInnerHeight` window.innerHeight

- **用法**：

监听窗口的 `resize` 事件，并获取 `innerWidth`、`innerHeight` 属性。由于是响应式的数据，因此如果将其绑定到某个元素的样式属性上，就可以动态调整其宽高。

- **示例**：

```vue
<template>
  <div>
    <img src="/foobar.png" :width="windowInnerWidth * 0.8" />
  </div>
</template>

<script>
import { useResize } from '@fext/vue-use'

export default {
  setup() {
    const { windowInnerWidth } = useResize()

    return {
      windowInnerWidth,
    }
  },
}
</script>
```
