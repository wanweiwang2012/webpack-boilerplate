### ESLint

1.  ESLint 是一个可组装、开源的 JavaScript & JSX 代码检查工具
2.  代码检查是一种静态分析，常用于寻找有问题的模式或代码，并且不依赖于具体的编码风格
3.  应用于开发（编码）过程中而不是执行过程中
4.  所有规则都被设计成可插入的
5.  使用 Node.js 编写

### ESLint 交互式的生成配置文件.eslintrc.\*

```
// 本地安装时(类似于生成npm init -y 生成package.json)
./node_modules/.bin/eslint --init
// 全局安装
eslint --init
```

### Configuring ESLint

#### 配置方式

- JavaScript - .eslintrc.js 输出一个配置对象
- YAML - .eslintrc.yaml | .eslintrc.yml 定义配置结构
- JSON - .eslintrc.json
- (弃用) - .eslintrc, 可使用 JSON 或 YAML
- package.json 中 eslintConfig 配置

#### 多个配置文件时的优先级

1.  使用 JavaScript 注释把配置信息嵌入到源代码中
2.  .eslintrc.js
3.  .eslintrc.yaml | .eslintrc.yml
4.  .eslintrc.json
5.  .eslintrc
6.  在 package.json 文件的 eslintConfig 字段中配置

```
// .eslintrc.js
module.exports = {
  // 在根目录中查找配置信息
  root: true,
  // 继承规则, 后面继承前面
  extends: [
    "airbnb-base",
    "plugin:vue/recommended",
  ],
  // 指定解析器: 默认值"esprima", 可自定义为babel-eslint(需单独安装包)
  "parser": "esprima",
  // 解析器选项
  parseOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    esmaFeatures: {
      impliedStrict: true, // 启用全局strict mode
      jsx: true, // 对jsx语法的支持；对React支持需要eslint-plugin-react
    },
  },
  // 解析器(会被传入parseOptions), 默认"esprima"
  // why use babel-eslint: You only need to use babel-eslint if you are using types (Flow) or experimental features not supported in ESLint itself yet. Otherwise try the default parser (you don't have to use it just because you are using Babel).
  parser: 'babel-eslint',
  // 指定环境: 一个环境指定了一组预定义的全局变量
  env: {
    "browser": true,
    "node": true,
    "es6": true, // 启用除modules外的全部es6特性（全局变量支持）（会自动设置ecmaVersion: 6）
  },
  // 指定全局变量：当源文件中访问未定义的变量
  globals: {
    "_": true,
  }
  // 插件(插件名称可省略前缀: eslint-plugin)
  plugins: [
    "vue",
    "eslint-plugin-plugin2"
  ],
  // Configuring Rules
  // 规则级别："off"|0-关闭 "warn"|1-警告 "error"|2-错误
  rules: {
    "quotes": "error", // or 2
    "quotes": ["error", "double"],
    "vue/html-indent": 4, // 定义插件规则:插件名/规则名称
  },
  // Shared Settings: ESLint支持在配置文件中添加共享设置, 它将提供给每一个将被执行的规则
  settings: {
    "sharedData": "Hello"
  }

}
```

### 集成配置规则：共享配置包、插件配置

#### 共享配置包

1.  esling-config-包名：standard, prettier...
2.  输出一个配置对象
3.  配置实例

```
{
  extends: [
    "standard",
    "prettier
  ]
}
```

### 插件配置

1.  eslint-plugin-包名：vue, react
2.  通常输出规则，一些插件也可以输出一个或多个命名的配置
3.  配置实例

- plugins 属性值：可省略前缀 eslint-plugin-
- extends 属性值组成："plugin:[包名]/[配置名]"

```
{
  "plugins": ["react"],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "rules": {
    "no-set-state": "off"
  }
}
```

### 忽略文件和目录

1.  在项目根目录新建文件.eslintignore 来指定要忽略的文件和目录
2.  路径相对于.eslintignore 的位置或当前工作目录
3.  默认忽略：/node_modules/\* 和 /bower_components/\*
4.  在 package.json 中配置 eslintIgnore 键来忽略文件
