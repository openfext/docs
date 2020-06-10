# 快速开始

## 前置依赖

搭建开发环境需要安装 node、npm 及 git。项目开发需要了解 ES6+、Vue.js、[Vue Composition API](https://github.com/vuejs/composition-api)、[Element UI](https://github.com/ElemeFE/element)、[VeeValidate](https://github.com/logaretm/vee-validate)、[Sass](https://github.com/sass/sass) 等类库。此外了解 [Vue CLI](https://cli.vuejs.org/zh/)、 [Webpack](https://webpack.js.org/)、[Babel](https://babeljs.io/)、[ESLint](https://eslint.org/)、[Prettier](https://prettier.io/)、[CommitLint](https://commitlint.js.org/)、[Jest](https://jestjs.io/) 等工具会大大提高开发效率。

### 开发环境

推荐使用 [VSCode](https://code.visualstudio.com/) 编辑器并安装 ESLint、Prettier、Vetur 插件，常用配置如下：

```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "prettier.singleQuote": true,
  "prettier.endOfLine": "lf",
  "javascript.preferences.quoteStyle": "single",
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.js": "prettier-eslint",
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "singleQuote": true
    }
  }
}
```

## 下载项目

目前通过手动下载项目仓库的方式：

```bash
# 下载项目
$ git clone git@github.com:openfext/vue-admin-next.git
```

> CLI 工具开发中，敬请期待。

## 目录结构

此项目通过 Vue CLI 创建，根目录结构如下：

```bash {2}
├── public                  # 静态资源文件
├── src                     # 项目源码，详情参考下一节
├── tests                   # 项目测试用例
│   └── unit                # 单元测试
├── .browserslistrc         # 浏览器兼容性配置
├── .editorconfig           # 代码编辑器通用配置
├── .eslintignore           # ESLint 忽略文件配置
├── .eslintrc.js            # ESLint 代码校验配置
├── .gitignore              # Git 忽略文件配置
├── .postcssrc.js           # PostCSS 配置（autoprefixer 等）
├── .prettierrc             # Prettier 代码格式化配置
├── babel.config.js         # Babel ES6+ 编译配置
├── commitlint.config.js    # Git Log 规范配置
├── jest.config.js          # Jest 单元测试配置
├── package.json
├── README.md
└── vue.config.js           # Vue CLI 扩展配置
```

## 源码划分

下面主要看一下源码目录 `src` 的结构。由于后台系统功能复杂，为了便于维护，Vue Admin Next 采用了**单页面多模块**的组织方式。源码主要分为以下几个目录：

- **base** - 用于继承的基类
- **common** - 各模块之间公共的功能
- **modules** - 业务模块
- **static** - 可以内嵌至 JS 代码的小型图片文件等
- **themes** - 样式文件

详细目录树如下：

```bash
├── base                   # 项目基类，用于继承
│   ├── dao                    # 远程接口访问基类
│   ├── log                    # 日志打印基类，同时提供静态方法
│   ├── router                 # 路由基类，协助创建 Vue Router
│   └── service                # 数据处理服务基类
├── common                 # 应用内公共模块
│   ├── components             # 公共的可复用组件（Composition、UI）
│   ├── config                 # 公共的配置（常量、导航等）
│   ├── dao                    # 公共的接口（用户、权限等）
│   ├── entry                  # 核心模块引入（Vuex、Vue Router 等）
│   ├── layout                 # 应用布局组件
│   ├── models                 # 公共的模型（用户等）
│   ├── plugins                # 应用内自定义插件（权限、日志等）
│   ├── router                 # 公共路由功能（权限拦截、页面标题、加载进度）
│   ├── services               # 公共的服务（权限判断）
│   ├── store                  # 应用全局状态仓库（布局形态、标签管理等）
│   ├── utils                  # 公共的工具函数
│   └── index.js               # 公共模块索引文件
├── modules                # 业务模块目录
│   ├── [moduleName]           # 任意模块
│   │   ├── components             # 模块内各页面公共组件
│   │   ├── config                 # 模块内配置（常量、枚举等）
│   │   ├── dao                    # 模块内接口
│   │   ├── models                 # 模块内数据模型
│   │   ├── pages                  # 模块内页面
│   │   │   └── [pageName]             # 任意页面
│   │   │       └── components             # 页面内组件
│   │   ├── router                 # 模块内路由配置
│   │   ├── services               # 模块内数据处理服务
│   │   ├── store                  # 模块内状态仓库
│   │   ├── utils                  # 模块内工具函数
│   │   └── index.js               # 单个模块索引文件
│   └── home                   # 首页模块（包含首页、登录页、错误页等页面）
├── static                 # 应用内静态文件
│   └── images                 # 小型图片，可转换为 Base64，无需单独部署
├── themes                 # 应用内样式文件
│   ├── animation              # 动画过渡效果（如淡入淡出等）
│   ├── common                 # 全局样式、字体、辅助类
│   ├── components             # 应用内公共组件的样式
│   ├── functions              # Sass Function
│   ├── mixins                 # Sass Mixin
│   ├── modules                # 业务模块内部通用样式
│   │   └── [moduleName]           # 任意模块
│   ├── variables              # Sass 变量（自定义主题颜色等）
│   └── vendors                # 第三方样式库（Element UI、NProgress）
├── App.vue                # 应用根组件
├── dataflow.js            # 应用 Dataflow（整合各模块 Service/Dao/Model）
├── index.js               # 应用入口文件（引入 router、store、dataflow 等）
├── plugins.js             # 插件注册文件
├── router.js              # 应用路由
└── store.js               # 应用状态仓库
```

## 启动项目

```bash
# 安装依赖
$ npm install
# 启动工程
$ npm run serve
```

根据控制台提示，打开浏览器即可进行预览。
