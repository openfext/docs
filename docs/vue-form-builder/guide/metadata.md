# 渲染元数据

在某些组件中，你的选项可能来自于实时请求的后台接口，因此无法直接配置在 JSON Schema 中。此时可以通过 `FormBuilder` 的 `metadata` 属性传递这些远程的数据。

## 远程数据

在外层组件中请求渲染元数据并将其传递给 `FormBuilder` 组件：

```html
<form-builder @metadata="renderMetadata"></form-builder>
```

```js
{
  data() {
    return {
      renderMetadata: null
    }
  },

  created() {
    this.fetchMetadata().then(data => {
      this.renderMetadata = data;
    });
  },

  methods: {
    // remote api
    fetchMetadata() {}
  }
};
```

在自定义表单元素中使用：

```js
// component `foo`
{
  computed: {
    list() {
      return this.metadata.fooList || [];
    }
  }
}
```

```html
<select name="foo">
  <option v-for="item in list" :key="item.id" :value="item.id">
    <span>{{ ch.name }} - {{ ch.id }}</span>
  </option>
</select>
```
