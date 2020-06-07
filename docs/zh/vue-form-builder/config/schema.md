# 表单配置

`FormBuilder` 采用了分组配置的形式，每个分组需要一个包裹组件，同时通过 `fields` 指定当前分组下的表单元素列表。例如：

```js
const formConfig = [
  {
    component: 'div',
    fields: [
      {
        name: 'foo',
        component: 'FooComponent',
      },
    ],
  },
  {
    component: 'div',
    fields: [
      {
        name: 'bar',
        component: 'BarComponent',
      },
    ],
  },
]
```

## 分组配置

配置格式如下：

```js
{
  /* 组件名 */
  component: 'Card',

  /* 组件的 props */
  props: {
    title: 'First Group'
  },

  /* 表单元素列表 */
  fields: []
}
```

其中 `fields` 中的每个元素配置参加下一节。

## 组件配置

配置格式如下：

```js
{
  /* 组件名 */
  component: 'AwesomeAddressComponent',

  /* 表单键名，用于从整体表单模型中获取当前表单的数据 */
  name: 'address',

  /* 表单展示名称 */
  label: 'Address',

  /* 表单展示名称的工具提示 */
  tooltip: '',

  /* 块级提示语 */
  tip: '',

  /* 是否隐藏 */
  hide: true,

  /* 校验规则，参见 Vee Validate */
  rules: {
    required: true
  },

  /* 多选组件的子元素 */
  items: [
    {
      /* 选项展示名称 */
      text: 'Beijing',

      /* 选项值 */
      value: 1
    }
  ],

  /* 绑定至组件的 props，也会以对象形式传递给组件内部 */
  props: {},

  /* 不绑定至组件 props 的扩展属性，可用于在组件内部进行逻辑判断 */
  extend: {}
}
```

## 组件适配器

针对内置的不同框架的表单适配器组件，配置与普通组件相比会稍有不同。组件名应固定为适配器组件，如使用 Element UI 时组件名应为 `ElFormAdaptor`。此时，通过 `extend` 配置来指定实际的表单组件：

```js
{
  component: 'ElFormAdaptor'

  extend: {
    component: 'ElDatePicker'
  }
}
```
