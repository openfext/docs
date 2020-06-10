# 工厂函数

## createFormBuilder(definition)

- **参数**
  - `{object} [definition]` 格式同 Vue 组件选项

- **用法**

基于内置的组件创建定制化的 `FormBuilder`。例如为其提供一些局部注册的表单组件：

```js
const customFormBuilder = createFormBuilder({
  components: {
    /* ... */
  }
});
```

- **参考**
  - [组件注册](https://cn.vuejs.org/v2/guide/components-registration.html)
