# 快速开始

## 安装

由于 FormBuilder 通过 Vue Use 提供的 [useForm](../../vue-use/api/form.md) Composition API 来管理表单状态，同时依赖 [vee-validate](https://github.com/logaretm/vee-validate) 来进行表单校验，因此需要一起进行安装：

```bash
npm i @fext/vue-form-builder @fext/vue-use vee-validate
```

## 默认组件

若需要进行动态配置的表单组件已经全局注册，则可以直接使用内置的 `FormBuilder` 组件。

### 引入方式

直接引入 `FormBuilder` 组件：

```js
import { FormBuilder } from '@fext/vue-form-builder';
```

此外，你也可以通过插件将 `FormBuilder` 注册为全局组件：

```js
import FormBuilderPlugin from '@fext/vue-form-builder';

Vue.use(FormBuilderPlugin);
```

### 使用方式

在父级组件中，需要先通过 `useForm` 创建表单的 Composition API，并提供表单的 JSON 配置：

```js
import { useForm } from '@fext/vue-use';
import { FormBuilder } from '@fext/vue-form-builder';

export default {
  name: 'awesome-form'

  components: {
    FormBuilder
  },

  setup() {
    // Form Composition API
    const form = useForm();
    const { formValues, updateFormValues } = form;

    return {
      form

      /* 表单数据模型 */
      formValues,

      /* 手动更新表单数据模型 */
      updateFormValues
    };
  },

  data() {
    return {
      formConfig: [/* JSON Schema */]
    }
  }
}
```

模板结构：

```vue
<div>
  <form-builder :form="form" :config="formConfig"></form-builder>
</div>
```

## 工厂函数

很多情况下，我们并不希望将所有的表单组件都注册到全局。此时我们可以使用工厂函数 `createFormBuilder` 构建一个定制化的 `FormBuilder`。

```js
import { useForm } from '@fext/vue-use';
import { createFormBuilder } from '@fext/vue-form-builder';
import ExampleFormComponents from 'path/to/components';

export default {
  name: 'awesome-form'

  components: {
    FormBuilder: createFormBuilder({
      components: {
        ...ExampleFormComponents
      }
    })
  }

  /* ... */
}
```

## 框架适配器

在一些流行的 UI 框架中，已经实现了很多表单基础组件，为了让你能够快速使用这些组件，我们提供了几种适配器。

实际开发过程中，你也可以根据需要封装自己的适配器。

### Element UI

组件 `ElFormAdaptor` 引入方式：

```js
import ElFormAdaptor from '@fext/vue-form-builder/lib/adaptor/element';
```

或全局注册：

```js
import ElFormAdaptorPlugin from '@fext/vue-form-builder/lib/adaptor/element';

Vue.use(ElFormAdaptorPlugin);
```

### View UI

组件 `ViewFormAdaptor` 引入方式：

```js
import ViewFormAdaptor from '@fext/vue-form-builder/lib/adaptor/element';
```

或全局注册：

```js
import ViewFormAdaptorPlugin from '@fext/vue-form-builder/lib/adaptor/view';

Vue.use(ViewFormAdaptorPlugin);
```

### Ant Design Vue

```js
import AntFormAdaptor from '@fext/vue-form-builder/lib/adaptor/element';
```

或全局注册：

组件 `AntFormAdaptor` 引入方式：

```js
import AntFormAdaptorPlugin from '@fext/vue-form-builder/lib/adaptor/antd';

Vue.use(AntFormAdaptorPlugin);
```

## 完整示例

下面我们通过工厂函数和 Element UI 适配器演示一下实际用法：

```vue
<el-form>
  <form-builder :form="form" :config="formConfig"></form-builder>
</el-form>
```

```js
import { useForm } from '@fext/vue-use';
import { createFormBuilder } from '@fext/vue-form-builder';
import ElFormAdaptor from '@fext/vue-form-builder/lib/adaptor/element';

export default {
  components: {
    FormBuilder: createFormBuilder({
      components: {
        ElFormAdaptor
      }
    })
  },

  setup() {
    const form = useForm();
    const { formValues, updateFormValues } = form;

    return {
      form,

      /* 表单数据模型 */
      formValues,

      /* 手动更新表单数据模型 */
      updateFormValues
    };
  },

  data() {
    return {
      formConfig: [
        {
          component: 'el-card',
          props: {
            header: 'Basic Group'
          },
          fields: [
            {
              name: 'comment',
              component: 'ElFormAdaptor',
              label: 'Description',
              rules: {
                required: true
              },
              props: {
                type: 'textarea',
                rows: 5,
                placeholder: 'Use adaptor and render with default(el-input) component'
              }
            }
          ]
        }
      ]
    };
  }
};
```
