# Vue Use

Vue Use 是一个基于 Vue Composition API 的扩展库。封装了很多有用的抽象逻辑，让你专注于业务代码的开发。

[源码仓库 - openfext/vue-use](https://github.com/openfext/vue-use)

## 快速指南

### 安装

```bash
npm i @fext/vue-use
```

### 使用

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

## 设计思路

下面以企业管理系统中场景的表格页面为例，简单描述一下 Vue Use 中 `useTable` 的设计思路。

通常在一个表格页面中，包含以下几个部分:

- 查询表单
- 数据选择、批量操作
- 列表数据展示、字段排序等
- 翻页设置

这些功能在复杂的页面中，会拆分到不同的子组件中：

```vue
<template>
  <div>
    <!-- 查询表单 -->
    <example-query-form></example-query-form>
    <!-- 批量操作 -->
    <example-toolbar></example-toolbar>
    <!-- 表格展示 -->
    <example-table></example-table>
    <!-- 翻页 -->
    <example-query-page></example-query-page>
  </div>
</template>
```

每个组件内部的操作都有可能触发列表数据的刷新，因此互相之间存在一些公共的处理逻辑。

### 思路一

我们可以采用 `mixin` 的方式来封装这些逻辑：

```js
const TableMixin = {
  created() {
    // do something
  },

  methods: {
    updateList() {},
    updatePage() {},
    updateFilter() {},
  },
}
```

在子组件中使用 `TableMixin`：

```js
export default {
  name: 'example-query-form',

  mixins: [TableMixin],

  mounted() {
    // do something
  },
}
```

但是 `mixin` 的方式有两个严重的缺陷：

- 如果有多个 `mixin`，无法知道某个方法/生命周期来自具体哪一个
- 共同的数据状态仍需要借助其他方式管理

### 思路二

借助 Vuex，我们可以采用另外一种方式，将表格的状态及相关方法都封装到 Store 中。

```js
{
  state: {
    list: {},
    page: {},
    filter: {}
  },

  mutations: { /* MUTATIONS */ },

  actions: {
    async updateList() {},
    async updatePage() {}
    async updateFilter() {}
  }
}
```

这种方式在简单的场景下工作得很好，但是当我们的应用有很多个列表的时候，在 Vuex 中维护这么多个相似的 Store 也变得很痛苦。这种方式的几个缺点：

- 每个列表页的 Store 都需要维护一套自己的 state/mutation/action 等
- 单例模式，页面重新加载时需要手动清空 Store
- 无法扩展每个组件的声明周期

### 思路三

终于到了 Vue Composition API 的环节，借助这个特性，我们可以将表格的状态及相关方法都封装到 Composition 里面。在组件每次初始化的时候，会创建一个包含状态和方法的新实例（类似闭包的概念），无需担心 Vuex 单例带来的冲突问题。此外，我们还可以在 Composition 里面定义一些通用的生命周期，达到类似 `mixin` 的效果。

```js
function useTable() {
  onMounted(() => {
    // do something
  })

  return {
    state,

    updateList,
    updatePage,
    updateFilter,
  }
}

export { useTable }
```

在组件 `setup` 时进行组合：

```js
{
  setup(props) {
    const table = useTalbe();
    const {
      state,
      updateList,
    } = table;

    // 仅组合需要使用的状态和方法
    return {
      state,
      updateList,
    }
  }
}
```
