# 事件处理

为了满足实际项目中的业务逻辑，`FormBuilder` 也提供了几种处理表单事件的方式。

## 表单事件

在某些场景下，你可能需要在表单元素内部触发整体页面的事件，此时，可以通过 `FormBuilder` 定义的事件 `command` 来实现该功能。

表单元素触发事件示例：

```js
// component `foo`
{
  someAction() {
    this.$emit('command', 'doSomething', 123456);
  }
};
```

整体页面处理事件示例：

```html
<form-builder @command="handleCommand"></form-builder>
```

```js
{
  handleCommand(cmd, ...args) {
    // cmd: doSomething
    // args: [123456]
  }
};
```

## 组件联动

不同的表单元素之间，通常有某些联动关系。在 `FormBuilder` 中，由于我们把整个表单的数据模型 `formValues` 传递给了每个表单元素，因此可以通过这个它来监听其它组件的变化。

```js
// component `foo`
{
  watch: {
    'formValues.bar': {
      handler() {
        // do something when the value of `bar` changes
      },
      deep: true
    }
  },
}
```
