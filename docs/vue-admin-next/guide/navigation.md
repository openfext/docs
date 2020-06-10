# 导航配置

## 基础格式

Vue Admin Next 的默认布局通过 `src/common/config/nav.js` 配置导航菜单，采用了可任意嵌套的数据格式。数据结构如下:

```js {15}
;[
  {
    key: String, // 唯一标识
    name: String, // 显示名称
    icon: String, // 图标，默认仅一级菜单支持
    links: [
      // 当前层级的链接，默认路由模式
      {
        name: String, // 链接名称
        path: String, // 链接路径
        alias: String, // 可选；用于权限判断，一般用于 path 为外部链接的场景
        target: String, // 可选；存在 target 属性时使用 a 标签
      },
    ],
    children: [SubmenuConfig], // 嵌套的子菜单，格式同最外层配置
  },
]
```

::: tip
默认仅支持两级子菜单的显示，可以通过全局 `store` 中的 `ui.submenuMaxLevel` 进行设置。
:::

配置示例参考 `src/common/config/nav.js`。

### 为什么不通过路由配置自动生成导航？

在大型后台系统中，复杂模块内部通常会包含很多子页面，大部分页面都不需要通过导航进行跳转。通过独立的导航配置可以按需添加，避免让路由配置变得繁琐。

## 导航权限判断

在遍历导航配置时，Vue Admin Next 会根据用户权限进行过滤。判断方式如下：

- 父级菜单，通过 `authService.hasNavAuth(key)` 进行判断
- 路由链接，通过 `authService.hasURIAuth(path) || authService.hasAliasAuth(alias)` 进行判断

::: tip
参加 [用户权限](./user.md)。
:::

参考示例：

```js {4,11,17,18}
;[
  {
    // 需要权限 AUTH_nav_dashboard
    key: 'dashboard',
    name: '控制台',
    icon: 'el-icon-odometer',
    links: [
      {
        name: '示例模块',
        // 需要权限 /examples，支持正则匹配
        path: '/examples',
      },
      {
        name: 'Github',
        target: '_blank',
        // 需要权限 AUTH_alias_github_repo
        alias: 'github_repo',
        path: 'https://github.com/openfext/vue-admin-next',
      },
    ],
  },
]
```
