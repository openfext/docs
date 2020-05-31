# 布局

项目默认的布局采用了侧边栏（左） + 操作栏（顶部） + 抽屉面板（右）的形式。同时加入了支持单页面路由切换的标签页。

若需要扩展内置布局的功能，可修改 `src/common/layout` 中相应的组件。

## 初始状态及个性化配置

布局的状态使用 `src/common/store/state.js` 进行管理。需要关心的主要有 `ui` 及 `preference`，可以通过修改对应的选项，来改变默认布局的展现形态。

```js
{
  // 布局的展示状态
  ui: {
    // 应用名称
    appName: 'Vue Admin Next',
    // 左侧边栏是否收起
    isAsideCollapsed: false,
    // 右抽屉面板是否展开
    isDrawerVisible: false
  },

  // 用户的个人首选项（可支持通过页面进行个性化配置）
  preference: {
    // 是否使用面包屑
    useBreadcrumb: true,
    // 是否开启标签页视图
    useTabView: true,
    // 是否使用亮色模式
    themeLightMode: false
  }
}
```

## 使用自定义布局

某些情况下，你可能不需要内置的布局或部分页面需要特定的布局，此时你可以新增自定义的布局组件，实现自己的布局样式：

```vue {6}
<template>
  <div class="my-custom-app-layout">
    <my-custom-app-aside></my-custom-app-aside>
    <my-custom-app-header></my-custom-app-header>
    <my-custom-app-content>
      <router-view />
      <!-- 路由组件，展示内容部分 -->
    </my-custom-app-content>
    <my-custom-app-footer></my-custom-app-footer>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'my-custom-app-layout',
}
</script>
```

以下是在不同页面中使用不同布局的路由示例：

```javascript {4,20}
// default layout component
import AppLayout from '@/common/layout';
// my custom layout component
import { MyCunstomAppLayout } from '@/common/layout';

import FoobarComponent from '/path/to/foobar';

const routes = [
  {
    path: '/foo',
    component: AppLayout, // layout
    children: [
      {
        path: 'default-layout',
        component: FoobarComponent
      }
  },
  {
    path: '/bar',
    component: MyCunstomAppLayout, // layout
    children: [
      {
        path: 'custom-layout',
        component: FoobarComponent
      }
    ]
  }
];
```
