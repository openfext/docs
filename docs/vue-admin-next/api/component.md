# Component Usage

Vue Admin Next 内置组件 API 参考。

## table-selection-ultimate

- **src**：`src/common/components/extend/table-selection-ultimate/TableSelectionUltimate.vue`

- **props**：

  - `{Object} table` 通过 [useTable](https://github.com/openfext/vue-use) 返回的状态空间
  - `{string} btnText` 按钮文案
  - `{string} btnSize` 按钮大小
  - `{string} btnType` 按钮类型
  - `{boolean} btnPlain` 朴素形式
  - `{Array<Object>} columns` 需要在弹出框展示的列名
    - `{string> prop` 列的 Key
    - `{string} label` 列的展现名称

- **实例方法**：

  - `use`：让用户选择使用当前页的数据或跨页选择的数据

- **用法**：

结合 [useTable](https://github.com/openfext/vue-use) 提供跨页数据选择的功能。

- **参考**：[指南 - 数据选择和批量操作](../guide/table.md#数据选择和批量操作)

## table-with-pager

- **src**：`src/common/components/extend/table-with-pager/TableWithPager.vue`

- **props**：

  - `{Array<Object>} data` 列表数据
  - `{number} defaultPageSize` 列表每页行数，默认 `10`
  - `{Array<number> pageSizes` 翻页组件支持切换的每页行数，默认 `[5, 10, 20, 40, 80]`
  - `{string} pageLayout` 翻页组件布局，参考组件 [Pagination](https://element.eleme.io/#/zh-CN/component/pagination)
  - `{Array<Object>} columns` 需要在弹出框展示的列名
    - `{string> prop` 列的 Key
    - `{string} label` 列的展现名称

### slots

可通过 slot 完全自定义 table 和 pager 组件，同时通过插槽作用域提供的方法，可以很方便地实现两者之间的交互。

```vue {8,19,20,21,22,23,24,25,26}
<template>
  <table-with-pager :data="data" :columns="columns">
    <template v-slot:default>
      <el-button>
        默认插槽
      </el-button>
    </template>
    <template v-slot:table="{ data: currentPageList, columns }">
      <el-table :data="currentPageList" style="width: 100%">
        <el-table-column
          v-for="col in columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
        ></el-table-column>
      </el-table>
    </template>
    <template
      v-slot:pager="{
        updatePageSize,
        updatePageNo,
        pageSize,
        pageSizes,
        pageLayout,
        totalCount,
      }"
    >
      <el-pagination
        background
        @size-change="updatePageSize"
        @current-change="updatePageNo"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :layout="pageLayout"
        :total="totalCount"
      >
      </el-pagination>
    </template>
  </table-with-pager>
</template>
```

:::tip
组件 [table-selection-ultimate](#table-selection-ultimate) 在展示已选择数据时用到了 table-with-pager，可供参考。
:::

## clipboard-text

- **src**：`src/common/components/ui/clipboard-text/ClipboardText.vue`

- **用法**：

通过默认插槽包裹一段文本，提供复制功能。

- **参考**：[指南 - 一键复制文本](../guide/practice.md#一键复制文本)

## form-action

- **src**：`src/common/components/ui/form-action/FormAction.vue`

- **props**：

  - `{number} offset` 缩进的栅格数，默认为 6

- **用法**：

用于包裹表单页最下方的提交、或取消等按钮，提供基本布局和醒目效果。

- **示例**：

```vue
<template>
  <el-form>
    <el-card header="基础信息"> </el-card>
    <el-card header="高级编目"> </el-card>

    <app-form-action>
      <el-button type="primary" @click="save">
        提交
      </el-button>
    </app-form-action>
  </el-form>
</template>
```

## form-error

- **src**：`src/common/components/ui/form-error/FormError.vue`

- **props**：

  - `{string} error` 错误文本

- **用法**：

用于展示表单项的错误信息，提供样式和动效。

- **示例**：

```vue
<template>
  <el-form-item label="标题" size="medium">
    <el-input type="text" placeholder="标题"></el-input>
    <app-form-error :error="message"></app-form-error>
  </el-form-item>
</template>
```

## form-tip

- **src**：`src/common/components/ui/form-tip/FormTip.vue`

- **slot#default**：文本信息

- **用法**：

用于展示表单项的静态提示。支持放置多个，若有错误提示，建议放在 `form-error` 之后。

- **示例**：

```vue
<template>
  <el-form-item label="标题" size="medium">
    <el-input type="text" placeholder="标题"></el-input>
    <app-form-tip>提示信息一</app-form-tip>
    <app-form-tip>提示信息二</app-form-tip>
  </el-form-item>
</template>
```
