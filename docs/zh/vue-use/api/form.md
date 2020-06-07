# useForm

## `useForm([options])`

- **参数**：

  - `{Object} options`

- **返回**：

  - `{Object}`
    - `{Object} formValues` 表单数据模型
    - `{Function} setInitialFormValues` 设置表单初始数据模型
    - `{Function} resetFormValues` 重置表单数据模型
    - `{Function} updateFormValues` 更新表单数据模型

- **用法**

管理整个表单的响应式数据模型。

- **参考**
  - [Vue Admin Next - useForm](../../vue-admin-next/guide/form.md#useform)

## `useFormElement(props, context, [options])`

- **参数**：

  - `{object} props` 由 setup 方法获取的 props
  - `{vnode} context` 由 setup 方法获取的 context
  - `{object} options`
    - `{string} requiredKey` 必填校验规则名，以竖线分割，如 `required|my-required`

- **返回**：

  - `{object}`
    - `{any} localValue` 组件内部的模型
    - `{boolean} dirty` 是否通过 `updateLocalValue` 修改过
    - `{boolean} isRequired` 根据 VeeValidate `rules` 判断是否必填
    - `{function} watchPropValue` 观察组件外部模型（`v-model`）的变化
    - `{function} setInitialValue` 设置初始值
    - `{function} resetLocalValue` 重置表单值
    - `{function} updateLocalValue` 更新组件内部的模型

- **用法**：

管理单个自定义表单组件的数据模型，快速实现支持 `v-model` 的自定义表单组件。

- **参考**：
  - [Vue Admin Next - useFormElement](../../vue-admin-next/guide/form.md#useformelement)
