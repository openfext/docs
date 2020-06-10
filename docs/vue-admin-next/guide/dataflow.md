# 数据处理

## Dataflow

接下来我们**重点了解**一下 Vue Admin Next 中的数据处理流程。在中后台系统中，与服务器端的数据交互是项目中的重中之重。为了避免将大量业务逻辑耦合在视图层中，Vue Admin Next 设计了一套基于 **DAO**（Data Access Object，数据访问对象）、**Model**（模型）、**Service**（服务）的数据处理流程，同时还可以通过 **Log**（日志）模块打印关键信息至控制台或上报至日志服务器。Vue Admin Next 将这个流程命名为 **Dataflow**。

## Log

Log 类提供打印日志的基础功能。底层引用了 [consola](https://github.com/nuxt/consola) 类库，可自定义不同的 `Reporter`，默认采用全局 `console` 模块进行打印。

详细代码参见 `src/base/log/index.js`。

### 日志格式

项目中约定采用以下格式打印日志：

```js
this.$logger.log('[methodName]', '[label1]', value1, '[label2]', value2)
```

第一个参数为方法名，使用括号 `[]` 标注。其后应该是成对的名称（label）+ 值（value）的组合，名称同样使用括号 `[]` 标注。

## DAO

DAO 用于从服务器端获取原始数据，定义了接口访问的 URL、请求方式、参数格式等。

::: tip
一般情况下 DAO 都需要结合 Model 及 Service 进行使用。但是如果数据非常简单明确并且无需处理，则可以直接调用 DAO。
:::

### DAO 基类

DAO 默认封装了 `axios` 和 `checkCode` 方法，可根据不同的接口提供方在业务类中进行修改或覆盖。

详细代码参见 `src/base/dao/index.js`。

### DAO 业务类

```js
import Dao from '@/base/dao'

class UserDao extends Dao {
  async login(options = {}) {
    // 记录日志
    this.$logger.log('[login]', '[options]', options)

    return this.axios({
      url: '/api/login',
      method: 'post',
      ...options,
    })
  }
}

export default UserDao
```

## Model

Model 用于定义数据模型，提供基于字段的格式化方法等操作。本项目封装了 `Collection` 和 `Entity` 两种常用的数据处理模型。

详细代码参见

- `src/base/model/collection.js`
- `src/base/model/entity.js`

简单 `Entity` 定义示例：

```js
import { merge } from 'lodash'
import { Entity } from '@/base/model'

const defaultOptions = {
  formatters: {
    name(value) {
      return `${value}${Math.random().toFixed(2)}`
    },
  },
}

class User extends Entity {
  constructor(data = {}, options = {}) {
    options = merge({}, defaultOptions, options)
    super(data, options)
  }
}

export default User
```

简单 `Collection` 定义示例：

```js {24}
import { merge } from 'lodash'
import { Entity, Collection } from '@/base/model'

const defaultOptions = {
  formatters: {
    title(value) {
      return `V - ${value || 'Unknown'}`
    },
  },
}

class ExampleEntity extends Entity {
  constructor(data, options = {}) {
    options = merge({}, defaultOptions, options)
    super(data, options)
  }
}

class ExampleList extends Collection {
  constructor(list = [], entity = ExampleEntity, options = {}) {
    super(list, entity, options)
  }
}

export default ExampleList
```

## Service

Service 用于整合整体流程并处理业务逻辑。一般情况下，DAO 的调用和 Model 的创建都是在 Service 中进行的；此外，它可能会包含以下几种操作：

- 对模型进行附加处理，如添加字段、拆分字段、整合字段、异步处理等
- 将一个复杂模型拆分为几个子模型
- 将几个子模型合并为一个复杂模型
- 封装同时调用多个接口的逻辑（如一次保存操作包含多方接口调用）

### Service 基类

详细代码参见 `src/base/service/index.js`。

### Service 业务类

```js {10,28}
import Service from '@/base/service'

class SomeService extends Service {
  someEntity = null

  // set 操作，初始化为 Model 并执行附加格式化等
  async setSomeEntity(entity) {
    const { SomeEntity } = this.dataflow.models

    this.someEntity = new SomeEntity(entity)

    this.formatSomeEntity()

    return this.someEntity
  }

  getSomeEntity() {
    return this.someEntity.get()
  }

  formatSomeEntity() {
    // 附加的数据处理方法
  }

  async fetchSomeEntity(options) {
    const { someDao } = this.dataflow.dao

    const response = await someDao.getSomeEntity(options)

    this.setSomeEntity(response.data)

    // 记录日志
    this.$logger.log('[fetchSomeEntity]', '[data]', this.getSomeEntity())

    return this.getSomeEntity()
  }
}

export default SomeService
```

## 使用方式

虽然 Dataflow 从源码组织形式上分为了 `dao`，`models`，`services` 三个目录，但是为了更加高效便捷地使用，Vue Admin Next 通过插件将其整合到了 `src/dataflow.js` 中。这样，就可以直接在需要的地方进行如下调用：

```js
// DAO
dataflow.dao.CommonDao
// Model
dataflow.models.UserModel
// Service
dataflow.services.AuthService
```

::: tip
注意文件名应该与类名相同，并采用大驼峰式命名法。
:::

在实践过程中，DAO 和 Service 大部分情况下并不需要持久化的数据，因此可以采用单例模式。dataflow 也自动创建了它们的实例。例如：

```js
// 调用 DAO 实例方法
dataflow.dao.commonDao.login()
// 调用 Service 实例方法
dataflow.services.authService.hasAuth()
```

::: tip
无法使用单例的场景下，可以自己创建实例。
:::

### 在组件中使用

参考了 Vuex、VueRouter 的实现方式，Dataflow 也向每个组件实例中注入了 `$dao` 及 `$services` 方法。

例如：

```vue {14}
<template>
  <div class="login-box">
    <!-- login form -->
  </div>
</template>

<script>
export default {
  name: 'login-page',

  methods: {
    login() {
      // 简单接口，无需 Service 直接调用 DAO
      await this.$dao.commonDao.login()
    }
  }
};
</script>
```

### 在 Vuex 中使用

Vue 框架从设计上来说，更加关注视图层的渲染和更新。Vuex 的引入，让大型应用的状态管理更加集中，无需在组件之间层层传递。虽然它提供了可以执行异步操作的 Action，但是如果把所有数据处理、业务逻辑都放在 Action 里面，整个 Vuex 的组织会非常臃肿和复杂。

因此 Vue Admin Next 推荐的方式是：**当 Vuex 需要调用接口、处理数据时，统一使用 Dataflow 提供的方法。**

具体如何实现？在创建 Vuex Store 实例时，通过 Vuex 的插件机制在 Store 上添加了 `dataflow` 属性，这样，就可以在 Action 中通过以下方式进行调用了：

```js {8}
{
  async removeGlobalAppData({ commit }) {
    const { dataflow } = this;

    commit(types.SET_GLOBAL_APP_DATA, {});

    // 调用 dataflow 提供的方法
    await dataflow.dao.commonDao.logout();
  }
}
```

此外，还有一些关于 Vuex 的其他使用建议，可以查看 [通用开发模式 - 状态管理](./practice.md#状态管理);
