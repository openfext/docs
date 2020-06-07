# 自定义表单组件

支持 v-model 的自定义组件均可用于渲染。但是为了更好的支持配置化，表单元素内部也得根据需要支持 `FormBuilder` 传递的各项配置[（参考表单适配器）](../api/component.md#formadaptor)。

以下为封装一个 Element UI 自定义表单组件的示例代码：

```vue
<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <el-form-item :size="size" :required="isRequired" :error="errors[0]">
      <template v-slot:label>
        <span>{{ label }}</span>
        <span v-if="tooltip">
          <el-tooltip :content="tooltip" placement="top">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </span>
      </template>
      <el-input
        :value="localValue"
        @input="updateLocalValue"
        type="text"
        placeholder="标题"
      >
      </el-input>
      <div class="tip" v-if="tip">{{ tip }}</div class="tip">
    </el-form-item>
  </validation-provider>
</template>

<script>
import { useFormElement } from '@/common/components/composition/form'

export default {
  name: 'example-field',

  // 根据需要接收 FormBuilder 传递的配置
  props: {
    name: String,
    label: String,
    tip: String,
    tooltip: String,
    rules: {
      type: [String, Object],
    },
    extend: Object,
    metadata: Object,
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
      updateLocalValue,
    } = useFormElement(props, context)

    return {
      isRequired,
      localValue,
      updateLocalValue,
    }
  },

  created() {
    if (this.extend.someMode) {
      // do something
    }
  },
}
</script>
```
