# 内置组件

## FormBuilder

- **属性**
  - `form` - object，用于管理表单状态的 Form Composition API
  - `config` - object[]，表单配置，详情参考文档
  - `shares` - object，所有组件共享的配置
  - `metadata` - object，自定义表单元素依赖的渲染元数据

- **事件**

- `command` - 用于处理表单组件内部的发出的事件

- **用法**

基础用法：

```vue
<form-builder :form="form" :config="formConfig">
</form-builder>
```

- **参考**
  - [表单配置](../config/schema.md)
  - [渲染元数据](../guide/metadata.md)
  - [表单事件处理](../guide/event.md)

## FormAdaptor

内置的 `ElFormAdaptor`，`ViewFormAdaptor`，`AntFormAdaptor` 均采用相同的设计。

- **属性**
  - `name` - string，表单键名
  - `value` - any，表单数据模型
  - `label` - string，表单标题
  - `tooltip` - string，表单标题工具提示
  - `tip` - string，块级提示语
  - `size` - string，表单大小
  - `rules` - object，Vee Validate 校验规则
  - `items` - string，多选组件的子选项
  - `props` - string，绑定至组件的 props
  - `extend` - string，不属于 props 的其他扩展属性
  - `metadata` - string，自定义表单元素依赖的渲染元数据
  - `formValues` - string，整体表单的数据模型

- **用法**

用于在 `FormBuilder` 内部根据配置渲染各框架内置的表单组件如 `Input`，`Select`，`DatePicker` 等。

- **参考**
  - [表单配置](../config/schema.md)
  - [适配器配置](../config/adaptor.md)
  - [渲染元数据](../guide/metadata.md)
  - [表单事件处理](../guide/event.md)
