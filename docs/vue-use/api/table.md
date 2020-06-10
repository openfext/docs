# useTable

## `useTable([options])`

- **参数**：

  - `{object} options`
    - `{string} uniqueKey` 选择数据时每行的唯一标志，默认为 `id`
    - `{object} sortKeys` 排序字段配置
      - `{string} order` 排序方式键名，默认 `order`
      - `{string} orderBy` 排序字段键名，默认 `orderBy`
      - `{string} asc` 升序常量值，默认 `asc`
      - `{string} desc` 降序常量值，默认 `desc`

- **返回**：

  - `{object}`
    - `{object} state` 响应式状态
      - `{object} page` 当前翻页参数
        - `{number} pageNo` 当前页码
        - `{number} pageSize` 当前每页行数
        - `{string} orderBy` 当前排序字段
        - `{string} order` 当前排序方式
      - `{object} filter` 当前过滤条件
      - `{object} list` 当前表格数据（包含列表、总条数等信息）
      - `{object[]} selection` 当前选择项，通过 `options.uniqueKey` 滤重
      - `{object[]} crossPageSelection` 跨页选择项，通过 `options.uniqueKey` 滤重
    - `{object} customPageSorter` 根据 `options.sortKeys` 转换得到的排序参数方式和字段
    - `{function} setList` 更新表格的数据方法
    - `{function} setPage` 更新翻页参数方法
    - `{function} resetPage` 重置翻页参数方法
    - `{function} setInitialPage` 设置 `state.initialPage`
    - `{function} setFilter` 更新过滤条件方法
    - `{function} resetFilter` 重置过滤条件方法
    - `{function} setInitialFilter` 设置 `state.initialFilter`
    - `{function} setPageSort` 设置 `state.page.order` 及 `state.page.orderBy`
    - `{function} setPageSize` 设置每页行数
    - `{function} setPageNo` 设置当前页码
    - `{function} setSelection` 设置当前页选择项
    - `{function} addCrossPageSelection` 添加跨页选择的数据
    - `{function} removeCrossPageSelection` 移除跨页选择的数据
    - `{function} clearCrossPageSelection` 清空跨页选择的数据
    - `{function} triggerUpdate` 手动触发通过 `watchUpdate` 注册的回调
    - `{function} watchUpdate` 注册在设置翻页参数、过滤条件时触发的回调方法

- **用法**：

管理列表页中翻页参数、过滤条件、表格数据、选择项等状态。

```js
const table = useTable({
  uniqueKey: 'uuid',
  sortKeys: {
    order: 'order',
    orderBy: 'prop',
    asc: 'ascending',
    desc: 'descending',
  },
})

const fetchList = async function(page, filter) {
  // remote api
}

const doSomething = async function(list) {
  // do something with selected list
}

// 设置初始翻页、排序参数
table.setInitialPage({
  pageNo: 1,
  pageSize: 10,
  orderBy: 'id',
  order: 'asc',
})

// 设置初始查询条件
table.setInitialFilter({
  GT_time: '2020-02-02 20:20:20',
})

// 设置初始查询条件
table.setInitialFilter({
  GT_time: '2020-02-02 20:20:20',
})

// 监听翻页参数、查询条件的变化，重新请求列表数据
table.watchUpdate(() => {
  const { page, filter } = table.state

  fetchList(page, filter).then((list) => {
    table.setList(list)
  })
})

// 设置页码
table.setPageNo(2)

// 设置每页条数
table.setPageSize(50)

// 设置查询条件
table.setFilter({
  GT_time: '2020-01-01 00:00:00',
  LT_time: '2020-04-01 00:00:00',
})

// 更新查询条件之后，需要手动触发 watchUpdate 注册的回调
table.triggerUpdate()

// 设置当前页已选择的数据
table.setSelection([{ id: 1, name: 'A' }])

// 使用已选择的数据
doSomething(table.state.selection)

// 清空当前页已选择的数据
table.setSelection([])

// 多次添加已选择的数据，可以用于跨页选择等场景
table.addCrossPageSelection([
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
])
table.addCrossPageSelection([{ id: 25, name: 'Y' }])

// 使用跨页选择的数据
doSomething(table.state.crossPageSelection)
```

- **参考**
  - [Vue Admin Next - useTable](../../vue-admin-next/guide/table.md#usetable)
