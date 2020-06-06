# 表单示例

表单是中后台系统中非常常见的应用场景。Vue Admin Next 的示例模块中，实现了部分表单页通用的开发模式。

完整的源码可参考 `src/modules/form`，以下是功能简介。

## Composition API

这里使用了 [Vue Use](https://github.com/openfext/vue-use) 项目的 `useForm` 和 `useFormElement` 两个 API。

### useForm

组合 `useForm` 用于管理整个表单的数据状态。

示例模块 `src/modules/form/pages/basic/ExampleBasicForm.vue` 部分源码如下：

```vue
<template>
  <div>
    <el-form class="app-basic-form" label-width="200px">
      <!-- 表单元素 v-model 直接绑定到 formValues.name  -->
      <example-name v-model="formValues.name"></example-name>
    </el-form>
  </div>
</template>

<script>
// 引入 Form Composition API
import { useForm } from '@fext/vue-use'

export default {
  name: 'example-form',

  // 从 useForm 中获取 formValues 及更新方法
  setup() {
    const { formValues, updateFormValues } = useForm()

    return {
      formValues,
      updateFormValues,
    }
  },

  created() {
    this.getFormValues()
  },

  methods: {
    getFormValues() {
      // 从服务器端获取数据并通过 updateFormValues 更新 formValues
    },

    async save() {
      // 将 formValues 保存到服务器
    },
  },
}
</script>
```

### useFormElement

组合 `useFormElement` 用于管理每个[**自定义表单组件**](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)的状态，可以很方便地通过 `v-model` 来实现数据的双向绑定。

某些情况下，由于 `v-model` 传进来的数据可能是一个复杂的数据结构，无法直接绑定到表单元素上。因此 `useFormElement` 提供了监听 `model` 变化和更新 `model` 的通用方法，使得你可以专注于表单内部的逻辑而无需关心 `v-model` 的交互。

除此之外，`useFormElement` 还提供了 `isRequired`、`dirty` 等有用的响应式属性。

#### 基础表单组件的封装

仅需定义 `props` 规则，v-model 相关的逻辑都由 `useFormElement` 提供。

```vue
<template>
  <el-form-item label="标题" size="medium" :required="isRequired">
    <el-input :value="localValue" @input="updateLocalValue"></el-input>
  </el-form-item>
</template>

<script>
import { useFormElement } from '@fext/vue-use'

export default {
  name: 'example-name',

  props: {
    rules: {
      type: [String, Object],
    },
    // v-model prop
    value: {
      required: false,
    },
  },

  setup(props, context) {
    const { isRequired, localValue, updateLocalValue } = useFormElement(
      props,
      context
    )

    return {
      isRequired,
      localValue,
      updateLocalValue,
    }
  },
}
</script>
```

#### 组合表单组件的封装

自定义表单组件内部可能包含多个多个表单元素，或者其它复杂的形式，可以把这种组件统称为**组合表单组件**。此时需要利用 `watchPropValue` 方法来监听 `v-model` 的变化，实现数据的同步。组件内部则需要实现自己的 `getValue`，`setValue` 方法。

```vue
<template>
  <div>
    <el-form-item label="人物" size="medium" :required="isRequired">
      <el-input v-model="actor.director">
        <template slot="prepend">导演</template>
      </el-input>
    </el-form-item>
    <el-form-item size="medium">
      <el-input v-model="actor.protagonist">
        <template slot="prepend">主演</template>
      </el-input>
    </el-form-item>
  </div>
</template>

<script>
import { useFormElement } from '@fext/vue-use'

export default {
  name: 'example-actor-complex',

  props: {
    name: String,
    rules: {
      type: [String, Object],
    },
    value: {
      required: false,
    },
    formValues: {
      type: Object,
      required: false,
    },
  },

  setup(props, context) {
    const {
      isRequired,
      localValue,
      watchPropValue,
      updateLocalValue,
    } = useFormElement(props, context)

    return {
      dirty,
      isRequired,
      localValue,
      watchPropValue,
      updateLocalValue,
    }
  },

  data() {
    return {
      actor: {
        director: '',
        protagonist: '',
      },
    }
  },

  watch: {
    actor: {
      handler() {
        // 监听组件内部数据并更新至 v-model
        this.updateLocalValue(this.getActorValue())
      },
      deep: true,
    },
  },

  created() {
    // 监听 v-model 变化并更新组件内部数据
    this.watchPropValue((value) => {
      this.setActorValue(value)
    })
  },

  methods: {
    // 组件内部自己的 getValue 方法
    getActorValue() {
      const { director, protagonist } = this.actor
      if (!director || !protagonist) {
        return []
      }
      return [director, protagonist]
    },

    // 组件内部自己的 setValue 方法
    setActorValue(value = []) {
      const [director = '', protagonist = ''] = value
      this.actor = { director, protagonist }
    },
  },
}
</script>
```

## 表单校验

Vue Admin Next 中通过 [VeeValidate](https://github.com/logaretm/vee-validate) 进行表单校验。它的优点是支持任意表单组件的校验，基于模板语法，可配置性高。

[VeeValidate](https://github.com/logaretm/vee-validate) 提供了两个核心的 Renderless 组件：

- `validation-observer`：提供整个表单的校验状态、方法
- `validation-provider`：提供单个表单组件的校验状态、方法

### 基本校验示例

下面的示例中，外层 `form` 组件通过 `validation-observer` 提供整个表单的校验方法`validate` 和状态 `invalid`。组件 `example-name` 的传递校验规则通过 `rules` 属性传递。

```vue
<template>
  <div>
    <!-- 通过 ref 提供实例方法，通过 slot 提供内部状态 -->
    <validation-observer ref="observer" v-slot="{ invalid }">
      <el-form class="app-basic-form" label-width="200px">
        <!-- 通过 rules 传递规则 -->
        <example-name
          :rules="{ required: true, max: 20, min: 5 }"
          v-model="formValues.shortName"
        ></example-name>
      </el-form>
    </validation-observer>
  </div>
</template>

<script>
import { useForm } from '@fext/vue-use'
import ExampleFormComponents from './components'

export default {
  name: 'example-form',

  components: {
    ...ExampleFormComponents,
  },

  setup() {
    const { formValues, updateFormValues } = useForm()

    return {
      formValues,
      updateFormValues,
    }
  },

  methods: {
    async save() {
      // 根据 observer 实例的 validate 方法判断是否校验通过
      const valid = await this.$refs.observer.validate()

      if (!valid) {
        this.$message({
          type: 'error',
          message: '部分表单填写错误，请检查！',
        })
        return
      }

      // save data...
    },
  },
}
</script>
```

`example-name` 组件内部接收传入的 `rules` 属性，并通过 `validation-provider` 进行校验。

源码参考：

```vue
<template>
  <validation-provider :rules="rules">
    <template v-slot="{ errors }">
      <el-form-item label="标题" size="medium" :required="isRequired">
        <el-input :value="localValue" @input="updateLocalValue"></el-input>
        <app-form-error :error="errors[0]"></app-form-error>
      </el-form-item>
    </template>
  </validation-provider>
</template>

<script>
import { useFormElement } from '@fext/vue-use'

export default {
  name: 'example-name',

  props: {
    name: String,
    rules: {
      type: [String, Object],
    },
    value: {
      required: false,
    },
    formValues: {
      type: Object,
      required: false,
    },
  },

  setup(props, context) {
    const { isRequired, localValue, updateLocalValue } = useFormElement(
      props,
      context
    )

    return {
      isRequired,
      localValue,
      updateLocalValue,
    }
  },
}
</script>
```

### 自定义校验规则

除了 VeeValidate 提供的[内置规则](https://logaretm.github.io/vee-validate/guide/rules.html#importing-the-rules)，你也可以添加项目内的自定义规则。

Vue Admin Next 的自定义规则统一放在 `src/common/plugins/validate/rules` 下，下面是一个自定义时间校验的规则示例：

```js
import { extend } from 'vee-validate/dist/vee-validate.full'

// 大于当前时间（可选秒数：大于当前时间多少秒）
extend('afterNow', {
  params: ['seconds'],
  validate(value, { seconds = 0 }) {
    try {
      const ms = seconds * 1000
      const now = Date.now()
      const date = new Date(value).getTime()

      if (date > now + ms) {
        return true
      }
    } catch (e) {
      return false
    }
    return false
  },

  message(value, { seconds }) {
    const sec = seconds > 0 ? ` ${seconds} 秒` : ''

    return `必须大于当前时间${sec}`
  },
})
```

使用方法如下：

```vue
<!-- 必须大于当前时间 30 秒 -->
<example-time
  :rules="{ required: true, afterNow: 30 }"
  v-model="formValues.time"
>
</example-time>
```

### 动态校验

由于校验规则是通过 `props` 动态绑定的，因此也支持动态校验，示例如下：

```vue
<!-- required 依赖于 formValues.recommended 的值 -->
<example-tag
  :rules="{ required: !!formValues.recommended }"
  v-model="formValues.tag"
>
</example-tag>
```

## 表单联动

多个表单元素进行联动的场景非常常见。由于采用了组件化的开发方式，为了保证每个组件的独立性和复用性，应该避免直接修改其它组件的状态。大部分情况下，如果组件 A 的操作会对 B 产生影响，应该用 B 组件在自己内部监听 A 组件的数据模型变化，来实现相关的逻辑。

### 隐藏与显示

外部组件传入 `formValues`：

```vue
<template>
  <el-form>
    <!-- 传入 formValues 表单模型 -->
    <example-recommend-rate
      :formValues="formValues"
      v-model="formValues.recommendRate"
    >
    </example-recommend-rate>
  </el-form>
</template>
```

组件内部根据 `formValues.recommended` 进行显示与隐藏：

```vue
<template>
  <transition name="fade">
    <!-- 根据 formValues.recommended 进行判断 -->
    <div v-show="!!formValues.recommended">
      <el-input-number
        :value="localValue"
        @input="updateLocalValue"
      ></el-input-number>
    </div>
  </transition>
</template>

<script>
import { useFormElement } from '@fext/vue-use'

export default {
  name: 'example-recommend-rate',

  props: {
    name: String,
    rules: {
      type: [String, Object],
    },
    value: {
      required: false,
    },
    // 获取整个表单组件的状态
    formValues: {
      type: Object,
      required: false,
    },
  },

  setup(props, context) {
    const { isRequired, localValue, updateLocalValue } = useFormElement(
      props,
      context
    )

    return {
      isRequired,
      localValue,
      updateLocalValue,
    }
  },
}
</script>
```

### 自动复制其它表单值

假设需求是 B 组件在自身没有修改值的情况下，希望自动复制 A 组件的值。这种情况下，我们需要监听 A 组件值的变化，然后在 B 组件内部判断有无手动修改过，最后进行同步。

下面我们通过 `useFormElement` 提供的 `localValue`，`updateLocalValue`，`dirty`，`setInitialValue` 这几个属性和方法来实现这个功能。

```vue
<template>
  <el-form-item label="短标题" size="medium" :required="isRequired">
    <!-- 手动输入会调用 updateLocalValue，并自动将 dirty 设为 true -->
    <el-input :value="localValue" @input="updateLocalValue"></el-input>
  </el-form-item>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use'

export default {
  name: 'example-short-name',

  props: {
    name: String,
    rules: {
      type: [String, Object],
    },
    value: {
      required: false,
    },
    formValues: {
      type: Object,
      required: false,
    },
  },

  setup(props, context) {
    const {
      dirty,
      isRequired,
      localValue,
      setInitialValue,
      updateLocalValue,
    } = useFormElement(props, context)

    return {
      dirty,
      isRequired,
      localValue,
      setInitialValue,
      updateLocalValue,
    }
  },

  watch: {
    // 监听 formValues.name
    'formValues.name'(value, oldValue) {
      // 若组件内部未修改过且是新建的场景
      const canDoSync = !(this.dirty || this.formValues.id)

      if (canDoSync) {
        // 重新设置未修改过的初始值
        this.setInitialValue(value)
      }
    },
  },
}
</script>
```

## 表单数据处理

对于复杂表单来说，数据处理是整个业务需求中最重要的部分。合理的处理方式可以大大降低视图层的复杂度，提高可维护性。Vue Admin Next 中，使用上文介绍的 [Dataflow](./dataflow.md) 来统一进行数据处理。

### 模型定义

由于通常表单页包含保存和回填两个流程，服务器端的数据格式和客户端的数据格式有所不同，因此 `form` 模块中也分别定义了两个数据模型。

详细代码参见：

- ExampleClientEntity - `src/modules/form/models/ExampleClientEntity.js`
- ExampleServerEntity - `src/modules/form/models/ExampleServerEntity.js`

### 处理服务

详细代码参见 `src/modules/form/services/ExampleEntityService.js`。
