# 用户权限

Vue Admin Next 的用户信息及应用权限通过全局状态 `src/common/store/state.js` 进行管理。初始化时，首先会尝试从服务器端渲染的 `__INITIAL_STATE__` 中获取，若没有则通过接口 `dataflow.dao.commonDao.getAppUserInfo` 方法获取。默认的格式如下：

```js {3,4,5,6,7}
{
  global: {
    user: {             // 用户信息
      id: 1000,
      name: 'Admin',
    },
    auth: []            // 权限列表，格式参考 Auth Service
  }
}
```

实际开发过程中，还需要对用户信息和应用权限进行很多判断操作，Vue Admin Next 将其封装成了两个独立的 Service：`UserService` 及 `AuthService`。

## UserService

在 UserService 中可以根据用户信息提供通用的服务，例如获取名称、ID，判断用户类型等。

详细源码参见 `src/common/services/UserService.js`。

## AuthService

在获取到用户的权限列表之后，权限判断的基础服务均由 `AuthService` 提供（可基于该 Service 提供权限组件、权限指令等扩展）。

Vue Admin Next 默认基于资源进行鉴权，将每个 URL、链接、按钮等均看成一个资源，分别进行鉴权。虽然这种方式比较灵活，能够满足绝大部分需求，但是配置较为复杂，所以实际项目开发中，你也**可以根据需要改为基于其它方式的鉴权**。

应用内路由资源格式参考：

```js
;[
  // 路由权限，以 / 开头，支持正则表达式
  '/',
  '/form/basic/new/?$',
  '/form/basic/\\d+/?$',
  '/table/basic/query/?$',
]
```

外部链接（别名）、导航、操作等资源格式参考：

```js
;[
  // 导航外部链接权限
  'AUTH_alias_github_repo', // 代替 https://github.com/openfext/vue-admin-next

  // 导航菜单权限，AUTH_nav_ 为前缀标识
  'AUTH_nav_dashboard',
  'AUTH_nav_example',
  'AUTH_nav_example_basic',
  'AUTH_nav_example_auth',

  // 操作权限（如按钮等），AUTH_action_ 为前缀标识
  'AUTH_action_example_publish',
  'AUTH_action_example_offline',
]
```

AuthService 根据以上几种不同的资源格式，分别提供了 `hasURIAuth`，`hasAliasAuth`，`hasNavAuth`，`hasActionAuth` 等方法，你可根据实际情况进行扩展。

详细源码参见 `src/common/services/AuthService.js`。

实际使用场景参考：[导航权限判断](./navigation.md#导航权限判断)、[路由拦截器](./router.md#内置拦截器)、[操作权限判断](./practice.md#操作权限判断)。
