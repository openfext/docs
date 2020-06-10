# 共享配置

当所有组件都需要配置某个属性时，可以考虑使用共享配置 `shares`。

```js
export default {
  /* ... */

  data() {
    return {
      /* ... */

      formShares: {
        size: 'medium',

        props: {
          clearable: true
        }
      }
    }
  }
}
```

```vue
<form-builder :form="form" :config="formConfig" :shares="formShares"></form-builder>
```
