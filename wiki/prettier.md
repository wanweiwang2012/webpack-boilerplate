## Prettier

### 特点

1.  代码格式化工具、支持许多语言（前端+后端）、编辑器集成、配置项少
2.  支持语言：JavaScript, TypeScript, Flow, JSX, Vue, CSS, Less, SCSS, JSON, GraphQL, MarkDown...

### 和 Linters 的对比

1.  Linters 的二类规则: 格式化规则、代码质量规则.

* 格式化规则： max-len, no-mixed-spaces-and-tabs, keyword-spacing..., 适用于：Prettier
* 代码质量规则(eslint, stylelint)：no-unused-vars, no-extra-bind..., 适用于：EsLint, StyleLint

### 关注点

1.  Strings

* 默认使用双引号包含字符串，也可以在配置中更改单引号

2.  Empty lines

* 多个空行合并成一个空行
* 文件顶部空行删除，结尾保留一个空行

3.  Multi-line Objects

* 默认情况下，如果合适，Prettier 的打印语法会在单行上打印表达式
* 如果源代码中为单行，但代码过长时会自动转为多行
* 如果源代码中任何地方都有换行符，则保留为多行

4.  Semicolons 分号

* 在语句末尾自动添加分号

5.  Imports

* 导入单个功能块时单行显示
* 导入多个功能块时根据代码长度自动换行

6.  JSX

### 非关注点

1.  转换单引号或双引号字符串为模板字面量
2.  当为可选时，添加或移除{} | return
3.  转换?:为 if-else 语句
4.  排序和提升 imports

## 在项目中使用 Prettier (以 VS Code 编辑器为例)

1.  安装 VS Code extensions: Prettier - Code formatter
2.  使用

* 快捷键格式化：查看快捷键（首选项-键盘快捷方式-editor.action.formatDocument | editor.action.formatSelection）; 可重新定义
* 保存时格式化：需配置（首选项-设置-"editor.formatOnSave": true）

3.  配置：使用 cosmiconfig 规范

* 配置获取优先级：Prettier 配置文件 -> .editorconfig -> VSCode prettier's settings
* Prettier 配置文件
  3.1 .prettierrc 文件配置(默认书写格式 YAML 或 JSON)，可以指定扩展名.yaml | .yml | .json | .js
  3.2 prettier.config.js file that exports an object
  3.3 package.json 中的"prettier"属性配置

```
// 配置文件：详情参考官网https://prettier.io/docs/en/options.html
{
  "printWidth": 120,
  "parser": "babylon",
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "proseWrap": "preserve"
}
```

4.  解析

* 如果本地安装 prettier，则使用本地依赖
* 如果本地未安装 prettier，则 a copy will be bundled with the extension

5.  插件：

* eslint-plugin-prettier: 将 prettier 作为 ESLint 规则运行，并将差异报告为单个 ESLint 问题。
* eslint-config-prettier: 关闭所有不必要或可能与 prettier 冲突的规则

6.  eslint 中集成 prettier

* 使用 eslint 来运行 prettier

```
// 安装插件
yarn add -D prettier eslint-plugin-prettier
// .eslintrc 配置
{
  "plugins": [
    ...,
    "prettier",
  ],
  "rules": {
    ...,
    "prettier/prettier": "error",
  }
}
```

* 关闭 eslint 的格式化规则(避免 eslint 报相同的格式化错误问题)

```
// 安装插件
yarn add -D prettier eslint-config-prettier
// .eslintrc
{
  "extends": [
    ...,
    "prettier", // put in last, to override other configs
  ]
}
```

* 同时使用二者

```
// 安装插件
yarn add -D --save-exact prettier
yarn add -D eslint-plugin-prettier eslint-config-prettier
// .eslintrc
{
  "extends": [
    ...,
    "plugin:prettier/recommended", // eslint-plugin-prettier公开了一个推荐的配置
  ]
}
```
