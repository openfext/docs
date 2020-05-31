# 路由配置

在 Vue Admin Next 中，除了配置路由和组件的对应关系之外，还通过 `meta` 信息描述了页面的面包屑、是否需要鉴权等：

```js
import AppLayout from '@/common/layout'

const ExampleList = () =>
  import(/* webpackChunkName: "examples" */ '../pages/list/ExampleList').then(
    (ExampleList) => ExampleList
  )

const exampleRootModule = {
  text: '示例模块',
  link: '/examples',
}

const routes = [
  {
    path: '/examples',
    component: AppLayout,
    children: [
      {
        path: '',
        component: ExampleList,
        meta: {
          // 面包屑配置
          breadcrumbs: [exampleRootModule, '标准列表'],
          // 用于默认布局的 router-view 进行缓存，需要与组件的 name 一致
          name: 'example-list',
          // 是否需要登录权限
          requiresAuth: true,
          // 是否需要 URL 权限
          requiresURIAuth: true,
        },
      },
    ],
  },
]

export default routes
```

## 面包屑

默认布局在启用面包屑（`preference.useBreadcrumb`）的情况下，可以通过元信息 `meta.breadcrumbs` 配置当前路由的面包屑。格式如下：

```js
const breadcrumb = [
  {
    text: '一级模块',
    link: '/foo',
  },
  {
    text: '二级模块',
    link: '/foo/bar',
  },
  '页面名称',
]
```

## 路由组件缓存

默认布局在启用标签管理（`preference.useTabView`）的情况下，需要 `<router-view>` 对组件进行缓存才有比较好的体验。因此务必为每个路由添加 `meta.name` 元信息，且必须与组件声明的 `name` 一致。

元信息配置示例：

```js
{
  meta: {
    name: 'example-list'
  }
}
```

组件声明示例：

```vue
<script>
export default {
  name: 'example-list',

  data() {
    return {}
  },
}
</script>
```

## 懒加载

具体方式参考 [官方文档](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)，需要注意的是，同一个模块内使用同一个 `webpackChunkName` 即可。

## 内置拦截器

由于 Vue Admin Next 采用了前端路由，为了进行页面权限的判断，基于路由守卫实现了两个内置的拦截器。

### 登录拦截器

判断用户是否登录（全局用户状态中存在用户 ID），若未登录则跳转到登录页。每个路由配置中通过 `meta.requiresAuth` 启用。

源码目录：`src/common/router/interceptors/AuthInterceptor.js`。

### 路由权限拦截器

通过 `authService.hasURIAuth` 判断用户是否具有当前路由的权限。每个路由配置中通过 `meta.requiresURIAuth` 启用。

源码目录：`src/common/router/interceptors/URIInterceptor.js`。

::: tip
单个路由在启用 URIInterceptor 的情况下必须同时启用 AuthInterceptor，否则无法获取用户及权限信息。
:::
