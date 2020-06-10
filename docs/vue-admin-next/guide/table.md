# 列表示例

列表查询和基于列表数据的操作也是中后台系统的基本功能。Vue Admin Next 的示例模块中，实现了部分列表页通用的开发模式。

完整的源码可参考 `src/modules/table`，以下是功能简介。

## Composition API

这里使用了 [Vue Use](https://github.com/openfext/vue-use) 项目的 `useTable` API。

### useTable

一般列表页中，都会包含表格、翻页、查询表单、快捷查询等组件，这些操作都会触发表格数据的更新。为了简化互相之间的交互，把通用的逻辑都封装在了 `useTable` 组合中，大致实现如下。

```js
import { ref, reactive, computed, watch } from '@vue/composition-api'

function useTable(options = {}) {
  const state = reactive({
    // 初始翻页参数 pageNo pageSize orderBy order(asc|desc)
    initialPage: {},
    // 初始过滤条件
    initialFilter: {},
    // 当前翻页参数
    page: {},
    // 当前过滤条件
    filter: {},
    // 当前表格的数据
    list: {},
    // 当前表格选中的数据
    selection: [],
    // 当前表格跨页选择的数据
    crossPageSelection: [],
  })

  // 此处省略实现逻辑

  return {
    // 响应式数据
    state,
    // 转化为自定义格式的初始排序方式
    customPageSorter,

    // 更新表格的数据
    setList,

    // 更新翻页参数
    setPage,
    // 重置翻页参数
    resetPage,
    // 设置初始翻页参数
    setInitialPage,

    // 更新过滤条件
    setFilter,
    // 重置过滤条件
    resetFilter,
    // 设置初始过滤条件
    setInitialFilter,

    // 设置排序方式
    setPageSort,
    // 设置每页数据条数
    setPageSize,
    // 设置当前页数
    setPageNo,

    // 设置当前选择项
    setSelection,
    // 添加跨页选择项
    addCrossPageSelection,
    // 移除跨页选择项
    removeCrossPageSelection,
    // 清空跨页选择项
    clearCrossPageSelection,

    // 发送更新消息
    triggerUpdate,
    // 监听更新消息，接收回调函数（发起请求等）
    watchUpdate,
  }
}

export { useTable }
```

#### 基本使用方法

以下为部分源码展示，详细信息可参考 `src/modules/table/pages/basic`。

外层组件 `example-basic-list`，用于组合各个子组件，同时调用 `useTable` 获取状态和方法。

```vue
<template>
  <div>
    <el-card>
      <example-query-form :table="table"></example-query-form>
    </el-card>

    <el-card>
      <example-table :table="table"></example-table>
      <example-query-page :table="table"></example-query-page>
    </el-card>
  </div>
</template>

<script>
import { useTable } from '@fext/vue-use'
import TableComponents from './components'

export default {
  name: 'example-basic-list',

  components: {
    ...TableComponents,
  },

  setup() {
    const table = useTable({
      uniqueKey: 'id',
      sortKeys: {
        order: 'order',
        orderBy: 'prop',
        asc: 'ascending',
        desc: 'descending',
      },
    })
    const { state, setInitialPage } = table

    return {
      table,

      state,

      setInitialPage,
    }
  },

  created() {
    this.setInitialPage({
      pageNo: 1,
      pageSize: 10,
      orderBy: 'id',
      order: 'asc',
    })
  },
}
</script>
```

查询表单组件 `example-query-form` 用于输入过滤条件，同时可以手动触发表格数据更新：

```vue
<template>
  <el-form size="medium" @keyup.native.enter="search">
    <!-- 表单元素，直接绑定到 state.filter.id -->
    <example-query-id v-model="state.filter.id"></example-query-id>
    <el-button size="medium" type="primary" @click="search">搜索</el-button>
    <el-button size="medium" @click="reset" title="RESET">重置</el-button>
  </el-form>
</template>

<script>
export default {
  name: 'example-query-form',

  props: {
    // 外层组件传递的 useTable 生成的状态空间
    table: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const {
      state,
      setPage,
      setFilter,
      resetFilter,
      setInitialFilter,
      triggerUpdate,
    } = props.table

    return {
      state,
      setPage,
      setFilter,
      resetFilter,
      setInitialFilter,
      triggerUpdate,
    }
  },

  created() {
    // 设置初始过滤条件
    this.setInitialFilter(this.getInitialValues())
  },

  methods: {
    getInitialValues() {
      return {
        id: '',
      }
    },

    // 重置为初始过滤条件，并触发查询
    reset() {
      this.resetFilter()
      this.search()
    },

    // 查询操作，当前页码设置为 1
    search() {
      this.setPage({
        pageNo: 1,
      })
      // 触发更新
      this.triggerUpdate()
    },
  },
}
</script>
```

翻页组件 `example-query-page` 用于设置当前页码和每页的条数，也会触发表格数据的更新：

```vue
<template>
  <div>
    <!-- 将翻页组件的状态和事件处理方法绑定至 useTable 生成的状态空间 -->
    <el-pagination
      background
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="setPageSize"
      @current-change="setPageNo"
      :current-page="state.page.pageNo"
      :page-size="state.page.pageSize"
      :total="state.list.totalCount"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'example-query-page',

  props: {
    // 外层组件传递的 useTable 生成的状态空间
    table: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { state, setPageSize, setPageNo } = props.table

    return {
      state,
      setPageSize,
      setPageNo,
    }
  },

  data() {
    return {
      pageSizes: [5, 10, 20, 40, 80],
    }
  },
}
</script>
```

最后是主角 `example-table`，用于展示最终查询得到的表格数据：

```vue
<template>
  <div>
    <!-- 将表格数据、排序方式、选择数据等操作绑定至 useTable 生成的状态空间 -->
    <el-table
      :data="state.list.result"
      :default-sort="customPageSorter"
      @sort-change="setPageSort"
      @selection-change="setSelection"
    >
      <!-- columns -->
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'example-table',

  props: {
    // 外层组件传递的 useTable 生成的状态空间
    table: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const {
      state,
      customPageSorter,
      setPageSort,
      setList,
      setSelection,
      watchUpdate,
    } = props.table

    return {
      state,
      customPageSorter,
      setPageSort,
      setList,
      setSelection,
      watchUpdate,
    }
  },

  // 通过计算属性将 page 和 filter 整合为接口所需的查询格式
  computed: {
    query() {
      const { page, filter } = this.state
      return {
        page,
        filter,
      }
    },
  },

  created() {
    // 监听其它组件发生的更新信号，执行拉取数据操作
    this.watchUpdate(() => {
      this.fetchList()
    })
  },

  methods: {
    async fetchList() {
      // 调用远程服务
      return this.$services.exampleListService
        .getList({
          data: this.query,
        })
        .then((list) => {
          // 更新表格数据
          this.setList(list)
        })
    },
  },
}
</script>
```

## 快捷查询

用户通常有把几个过滤条件的值组合到一起一键查询的操作。通过 Composition API 提供的方法，可以非常便捷地实现该功能。以下是 `example-quick-query` 组件部分源码参考：

```vue
<template>
  <el-form>
    <ul class="list-inline vertical-space-10 horizontal-space-10">
      <li>
        <span>常用查询：</span>
      </li>
      <!-- 展示所有快捷查询条件，点击时触发查询 -->
      <li v-for="query in queries" :key="query.name">
        <a @click="updateQuery(query)">{{ query.name }}</a>
      </li>
    </ul>
  </el-form>
</template>

<script>
export default {
  name: 'example-quick-query',

  props: {
    // 外层组件传递的 useTable 生成的状态空间
    table: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { state, setFilter, triggerUpdate } = props.table

    return {
      state,

      setFilter,
      triggerUpdate,
    }
  },

  data() {
    return {
      // 可以保存至数据库、LocalStorage 等
      queries: [
        {
          name: 'ID - 1000',
          filter: {
            id: 1000,
          },
        },
        {
          name: '标题 - Next',
          filter: {
            q: 'Next',
          },
        },
      ],
    }
  },

  methods: {
    updateQuery(query) {
      // 更新过滤条件
      this.setFilter(query.filter || {}, {
        merge: false,
      })
      // 触发数据更新操作
      this.triggerUpdate()
    },
  },
}
</script>
```

## 数据选择和批量操作

一般情况下，通过 `useTable` 的 `selection` 状态就可以获取到当前页选择的数据。但是某些情况下，可能会存在需要从不同的查询结果中挑选一些数据进行批量操作，因此为了解决跨页选择的问题，`useTable` 内部维护了一个 `crossPageSelection` 的状态和对应的更新方法，但是并没有可视化的交互组件。由于这个功能比较通用，Vue Admin Next 将其封装成了一个通用的组件，放在了 `src/common/components/extend/table-selection-ultimate` 目录。

下面演示一下它的基础使用方法：

```vue
<template>
  <el-form>
    <!-- 需要传递 useTable 生成的状态空间 -->
    <table-selection-ultimate
      ref="ultimateSelection"
      :table="table"
    ></table-selection-ultimate>
  </el-form>
</template>

<script>
import { TableSelectionUltimate } from '@/common/components/extend/table-selection-ultimate'

export default {
  name: 'example-toolbar',

  components: {
    TableSelectionUltimate,
  },

  props: {
    // 外层组件传递的 useTable 生成的状态空间
    table: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { state } = props.table

    return {
      state,
    }
  },

  methods: {
    async getSelection() {
      // 1. 仅返回当前页选择的数据（不需要 table-selection-ultimate 组件）
      return this.state.selection

      // 2. 返回跨页选择的数据
      return this.state.crossPageSelection

      // 3. 都存在的情况下可以由用户进行选择
      return this.$refs.ultimateSelection.use()
    },
  },
}
</script>
```

基于选择的数据，你就可以进行任意的批量操作了。

::: tip
`table-selection-ultimate` 的 `use` 方法会进行如下判断：1）若仅存在当前页数据则直接使用当前页数据；2）若仅存在跨页数据则直接使用跨页数据；3）**若当前页和跨页数据都存在，则需要用户进行选择。**
:::

## 导出表格数据

Vue Admin Next 中通过 [json2csv](https://github.com/zemirco/json2csv) 将 JSON 数据转换为 CSV 文件并下载。此功能封装到了工具函数 `src/common/utils/export.js` 中。

使用方法参考示例模块的代码：`src/modules/table/pages/basic/components/ExampleToolbar.vue`。导出操作同样也使用到了数据选择的功能。

## 显示更多查询项

在比较复杂的模块中，随着业务的不断迭代，可能会有几十个表单查询项。如果全部都默认展示的话，使用体验较差。因此 Vue Admin Next 示例模块中通过 `popover` 和 `tab` 来展示不常有的查询项，节省页面空间。

源码参考：

- `src/modules/table/pages/basic/components/ExampleQueryForm.vue`
- `src/modules/table/pages/basic/components/form/advanced`

## 显示更多数据详情

在部分列表页场景下，用户关心的数据维度较多，在屏幕宽度有限的情况下，无法全部展示。虽然 `el-table` 通过 `expand` 列提供了展开收起的功能。但是依然不够便捷。Vue Admin Next 采用了 `popover` 的形式，在鼠标移动到每行 “更多数据” 链接的时候，就可以展示当前行需要的全部数据。

源码参考：

- `src/modules/table/pages/basic/components/ExampleTable.vue`
- `src/modules/table/pages/basic/components/table/ExampleMoreColumn.vue`

::: tip
为了避免渲染过多 `popover`，组件 `example-table` 通过设置 `currentRow` 并判断是否当前列来优化。
:::

## 显示更多操作项

在部分列表页场景下，用户需要的操作非常多，一列的空间无法摆放。因此 Vue Admin Next 采用了 `popover` 和 `tab` 的形式，在鼠标移动到每行 “更多操作” 链接的时候，就可以展示所有操作按钮。

源码参考：

- `src/modules/table/pages/basic/components/ExampleTable.vue`
- `src/modules/table/pages/basic/components/table/ExampleMoreLink.vue`

::: tip
为了避免渲染过多 `popover`，组件 `example-table` 通过设置 `currentRow` 并判断是否当前列来优化。
:::
