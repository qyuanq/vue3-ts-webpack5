# sanlie-h5
基于vue3+ts+webpack5+vant3搭建的移动端H5应用

## 功能

```
- 全局功能
  - 国际化多语言
  - Svg Sprite 图标
```
## 目录

```
|-- undefined
    |-- .browserslistrc         - 浏览器兼容
    |-- .editorconfig           - ide,操作系统不同代码风格一致性
    |-- .env.development        - 开发环境变量
    |-- .env.production         - 生产环境变量
    |-- .eslintrc.js            - 代码规范
    |-- .gitignore
    |-- .prettierignore
    |-- .prettierrc             - 代码格式化
    |-- babel.config.js         - babel配置
    |-- commitlint.config.js    - 提交信息规范
    |-- package-lock.json
    |-- package.json
    |-- postcss.config.js       - 配置css转换
    |-- README.md
    |-- tsconfig.json           - ts配置文件
    |-- vue.config.js           - webpack配置文件
    |-- .husky                  - git hooks 拦截
    |   |-- commit-msg
    |   |-- pre-commit
    |   |-- _
    |       |-- .gitignore
    |       |-- husky.sh
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |-- src
        |-- App.vue
        |-- main.ts
        |-- shims-vue.d.ts
        |-- api
        |   |-- index.ts
        |-- assets
        |   |-- logo.png
        |-- components
        |   |-- HelloWorld.vue
        |   |-- SvgIcon         - svg组件
        |       |-- index.ts
        |       |-- index.vue
        |-- global              - 全局组件
        |   |-- index.ts
        |-- icons
        |   |-- index.ts
        |   |-- svg
        |       |-- red.svg
        |-- lang                 - 国际化
        |   |-- en.ts
        |   |-- es.ts
        |   |-- index.ts
        |   |-- zh.ts
        |-- router               - 路由
        |   |-- index.ts
        |-- store                - vuex状态管理
        |   |-- index.ts
        |   |-- type.ts
        |   |-- user
        |       |-- index.ts
        |       |-- type.ts
        |-- style                - 样式文件
        |   |-- index.less
        |   |-- variables.less
        |-- utils                
        |   |-- index.ts         - 公共方法
        |   |-- cache            - 缓存
        |   |   |-- index.ts
        |   |-- directives       - 指令
        |   |   |-- index.ts
        |   |-- request          - 封装 axios
        |       |-- index.ts
        |       |-- request.ts
        |       |-- type.ts
        |-- views
            |-- About.vue
            |-- Home.vue

```


## 项目下载和运行

```
git clone https://github.com/qyuanq/vue-ts-webpack5.git
cd vue-ts-webpack5
```

### 安装依赖

```
npm install
```

### 开发模式运行

```
npm run serve
```

### 打包项目

```
npm run build
```

### 代码格式检查

```
npm run lint
```

### 代码格式化

```
  npm run prettier
```
## 规范

git遵循husky,提交信息使用Commitizen，利用`npm run commit`代替`git commit`
