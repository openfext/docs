# 模块文件组织

在 [项目源码说明](./start.md#项目源码说明) 中已经展示了每个模块的目录结构，下面主要说明在新增一个模块时，需要注意哪些事项。

## 模块索引文件

由于整个项目采用的是单页面多模块的结构，因此需要我们在每个模块中通过 `index.js` 统一导出模块内的 `dataflow`（包含 `dao`，`models`，`services`）、`router`、`store` 等功能，然后由应用根目录 `src` 的相应文件分别进行整合。

代码示例：

```js
import * as dao from './dao'
import * as services from './services'
import * as models from './models'
import * as stores from './store'
import routes from './router'

const dataflow = {
  models,
  dao,
  services,
}

export default { routes, stores, dataflow }
```

## 页面及组件目录

### 页面

模块内的页面统一放在 `[moduleName]/pages` 目录下，且每个页面都应该有自己单独的目录。

### 组件

对于某个页面独有的组件，需要放置在对应页面的组件目录下： `[moduleName]/pages/[pageName]/components`；对于当前模块通用的组件，则放置在模块通用组件目录下： `[moduleName]/components`。

此外还有整个应用通用的组件，可以放在 `src/common/components` 目录。
