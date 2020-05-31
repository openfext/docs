# 主题样式

Vue Admin Next 的样式统一通过 Sass 维护在 `src/themes/default` 目录下。各文件夹的详细功能如下：

- `variables`：统一定义应用内部及第三方组件库的基础变量
- `animation`：定义 Vue [Transition](https://cn.vuejs.org/v2/guide/transitions.html) 过渡类或其他交互动效
- `common`：应用内全局样式（字体等）或辅助样式
- `components`：应用内通用组件的样式
- `functions`、`mixins`：Sass 扩展工具
- `modules`：各模块专属样式
- `vendors`：第三方组件库、样式库（如 Element UI、NProgress）

## 定制主题

通过修改 `src/themes/default/variables/index.scss` 中定义的变量，即可在应用内任意地方引用。

以下将主题色从绿色 `#42b983` 更改为蓝色 `#409eff`，并覆盖 Element UI 的样式：

```scss
// $--color-primary: #42b983;

$--color-primary: #409eff;

$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import '~element-ui/packages/theme-chalk/src/common/var';
```

Element UI 内置变量参考: [ElemeFE/element](https://github.com/ElemeFE/element/blob/dev/packages/theme-chalk/src/common/var.scss)

在组件在引入：

```vue
<template>
  <a class="foobar">链接</a>
</template>

<style lang="scss" scoped>
@import 'src/themes/default/variables/index';

a.foobar:hover {
  color: $--color-primary;
}
</style>
```

在其他样式文件中引入如 `src/themes/default/common/_content.scss`：

```scss
@import '../variables/index';

a {
  color: $--color-primary;
}
```

## 辅助样式类

Vue Admin Next 开发过程中，添加了部分用于快速布局的辅助样式。

### 添加上下边距

快速添加 `padding-top` 或 `padding-bottom`：

```scss
.padding-top-10 {
  padding-top: 10px;
}

.padding-bottom-10 {
  padding-bottom: 10px;
}

.padding-top-20 {
  padding-top: 20px;
}

.padding-bottom-20 {
  padding-bottom: 20px;
}

.padding-top-bottom-10 {
  padding-top: 10px;
  padding-bottom: 10px;
}

.padding-top-bottom-20 {
  padding-top: 20px;
  padding-bottom: 20px;
}

.margin-top-10 {
  margin-top: 10px;
}

.margin-bottom-10 {
  margin-bottom: 10px;
}

.margin-top-20 {
  margin-top: 20px;
}

.margin-bottom-20 {
  margin-bottom: 20px;
}

.margin-top-bottom-10 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.margin-top-bottom-20 {
  margin-top: 20px;
  margin-bottom: 20px;
}
```

### 设置子元素边距

为了避免行内子元素过于拥挤，子元素之间统一添加 `padding-left` 或者 `padding-bottom`，即便在自动换行的情况下依然可以保持一致的间距。一般情况下与 `list-inline` 配合使用。

```scss
.list-inline {
  padding-left: 0;
  list-style: none;

  & > li {
    display: inline-block;
    vertical-align: top;
  }
}

.vertical-space-10 {
  margin-bottom: -10px;

  > * {
    padding-bottom: 10px;
  }
}

.horizontal-space-10 {
  margin-left: -10px;

  > * {
    padding-left: 10px;
  }
}

.vertical-space-15 {
  margin-bottom: -15px;

  > * {
    padding-bottom: 15px;
  }
}

.horizontal-space-15 {
  margin-left: -15px;

  > * {
    padding-left: 15px;
  }
}

.vertical-space-20 {
  margin-bottom: -20px;

  > * {
    padding-bottom: 20px;
  }
}

.horizontal-space-20 {
  margin-left: -20px;

  > * {
    padding-left: 20px;
  }
}
```

使用示例：

```vue
<ul class="list-inline vertical-space-10 horizontal-space-10">
  <li>
    <span>条目一</span>
    <span>条目二</span>
    <span>条目三</span>
  </li>
</ul>
```
