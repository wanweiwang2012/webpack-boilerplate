## webpack | babel7

### 开发模式构建出来的 chunk 中原代码被包裹在 eval 中

```
// 开启配置后会按正常代码显示
{
  devtool: "source-map"
}
```

### 什么是 Babel

> Babel 是一个 js 编译器, 主要用于在旧的浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容版本的 JavaScript 代码：
> 顺序：plugin(顺序) > presets(逆序)

1. 转换语法
2. Polyfill 实现目标环境中缺少的功能 (通过 @babel/polyfill)
3. 源代码转换 (codemods)
4. 更多

### babel 7 @babel/package scoped packages(范围包)使用的原因

1.  命名困难
2.  官方包与个人或团体包区分

### @babel/polyfill 的 dependencies

```
package.json中的配置项
"dependencies": {
  "core-js": "^2.5.3",
  "regenerator-runtime": "^0.11.1"
}
```

- polyfill 和 runtime 的 dependencies 相同

### babel | @babel/polyfill | @babel/runtime 各自作用范围

浏览器对 js API 的支持情况不一

1.  大家都有，只是 A 语法与 B 语法的区别
    > babel 编译过程处理 - 统一语法, 通过高版本->低版本
2.  不是大家都有：有的有，有的没有
    > @babel/polyfill 扩展浏览器对原生 js api 的支持，不管是全局的，还是原型的, 会污染全局 api
3.  > @babel/runtime 通过添加 helper function 来扩展浏览器对 js api 的支持, 不会造成全局上的污染，但只扩展了 built-in|静态方法，实例方法不能使用

### @babel/polyfill | @babel/runtime | @babel/plugin-transform-runtime

#### @babel/polyfill

1.  在应用入口 import "@babel/polyfill"
2.  为当前环境注入 es6+垫片（实现原生 API），只用引入一次，全局到处可用
3.  文件较大，但配合@babel/preset-env+(配置项 useBuiltIns) , 可以启用一个新插件来替换语句 import "@babel/polyfill"，仅导入基于浏览器环境的个性化需求

#### @babel/runtime | @babel/plugin-transform-runtime 配合使用

1.  @babel/runtime 引用 core-js（js 的组合式标准库）、regenerator-runtime（facebook 出的库，主要实现 generator/yeild|async/await）
2.  @babel/runtime 生产依赖，@babel/plugin-transform-runtime 开发依赖
3.  @babel/runtime 在编译时利用 plugin 自动识别并替换代码中的新特性，不需要在应用中单独导入
4.  可使用 built-in、静态方法，但不能使用实例方法'abc'.includes('a')
5.  @babel/plugin-transform-runtime 的作用：将 babel 编译时在页面插入的 helper function 替换成去引用@babel/runtime 中定义的模块引用

#### 使用对比

1.  @babel/polyfill 在入口手动导入以实现原生 api，文件较大；适合开发较大的应用（可配合@babel/preset-env 以优化使用）；
2.  @babel/runtime 在所有代码中做检测替换，通过 helper function 来引入新功能 API，但是实例方法不支持。适合在开发 library/tool 时使用

### @bable/preset-env 中的配置项 useBuiltIns

> @bable/preset-env 不支持 stage-x plugins

```
useBuiltIns: 'usage' | 'entry' | false
'usage'：针对文件
1. @babel/polyfill不用在全局入口导入
2. babel会基于浏览器环境配置+js文件代码，在当前文件中智能导入需要的polyfill
3. 每个js文件根据代码会单独导入需要的polyfill
'entry'：针对入口
1. @babel/polyfill要在全局js入口中导入
2. babel会基于浏览器环境配置自动导入需要用到的polyfill, 以替换import @babel/polyfill语句
3. 导入文件体积较大，但只需在入口文件导入一次
false：禁用
```

### 参考资料

[babel7 教程](https://blog.zfanw.com/babel-js/)

[你真的会用 babel 吗？](https://juejin.im/post/59b9ffa8f265da06710d8e89)

## webpack4

### 重大更改

1.  环境：Node.js 4 不再支持

2.  用法：必须选择 mode: development | production

- production

  - 启用大量优化来生成 bundles
  - 不支持 watching
  - 启用 module concatenating(Scope Hoisting 范围提升)

- devlopment

  - 启用 comments and hit
  - devtool: 'eval'

- process.env.NODE_ENV 会根据 mode 自动设置
- mode: none，禁用 webpack4 中的新功能

3.  语法
4.  配置

- 不用需要使用的插件

* NoEmitOnErrorsPlugin -> optimization.noEmitOnErrors (on by default in production mode)
* ModuleConcatenationPlugin -> optimization.concatenateModules (on by default in production mode)
* NamedModulesPlugin -> optimization.namedModules (on by default in develoment mode)

- CommonsChunkPlugin 被移除，替代为使用 optimization.splitChunks, optimization.runtimeChunk

5.  json
6.  优化

- Upgrade uglifyjs-webpack-plugin to v1（es2015 support）

### 新特征

1.  新增模块支持
2.  优化

- 新增配置

* optimization.splitChunks
* optimization.minimize 默认 production: true | development: false

- 废代码处理：现在 webpack 自己处理，之前得用 Uglify 插件处理

3.  cli -> webpack-cli

4.  性能

- UglifyJs 默认开启缓存和并行构建{ cache: true, parallel: true }
- 增量构建提升

## filename | chunkFilename output 的输出配置项

1.  [name].[hash:8]|[chunkhash:8].[id].js | "js/[name]/bundle.js"
2.  filename: entry 中指定入口生成的 chunk 文件名配置
3.  chunkFilename: 非入口 chunk 文件名称配置，在 runtime 根据 chunk 发送的请求去生成，场景：CommonChunkPlugin、import('path/to/module')动态加载

## hash | chunkHash | contentHash

> hash 结合缓存使用，通过 webpack 构建之后，生成文件名自动带上对应 md5 值。如果文件内容改变，对应的文件哈希值也会更新，对应 html 文件引用的 url 地址自动更新，进而更新本地缓存

- hash

1.  与整个项目构建相关，只要项目中有文件更改，hash 值就会更新，并且全部文件都共用这个 hash 值。
2.  每次构建 hash 都会改变， 即使文件内容没有改变，这样无法实现缓存

- chunkHash

1.  根据不同的入口文件进行依赖  解析、构建 chunk，生成对应 hash 值
2.  可用于提取项目依赖的第三方库和公共代码
3.  chunkHash 在'css/[name].[chunkHash].bundle.css'中共用

- contentHash

1.  通过 extra-text-webpack-plugin 中的 contentHash 缓存 css 资源
2.  配置[name].[contentHash].bundle.css

## CommonsChunkPlugin（webpack4+后已经被移除）

> 在多入口 chunk 中提取公共模块，生成一个独立的文件，以便缓存
> common 和 verdors 的应用？

## SplitChunksPlugin

1.  默认只对按需加载的模块起作用
2.  默认自动 split chunks 基于以下条件

- 新 chunks 被共享或来自 node_module 文件夹
- 新 chunks 超过 30kb(min+gz 之前)
- 按需加载时最大并行请求数小于或等于 5
- 在初始页面加载时最大请求数小于或等于 3

```
optimization: {
  splitChunks: {
    cacheGroups: {
      commons: {},
      vendor: {}
    }
  }
  runtimeChunk: {
    name: 'mainfest'
  }
}
```

- runtimeChunk: true

1.  webpack 会添加一个只包含运行时（runtime）额外代码块到每一个入口
2.  会导致每个入口都多加载一份运行时代码

## Webpack Plugin

### ProvidePlugin

1.  在代码中可以通过定义的变量来访问模块
2.  自动加载模块，不必到处手动 import | require

```
// 注意：_可正常使用，但是$|jQuery并不能在全局环境console|window.$中使用（代码中可使用）
new webpack.ProvicePlugin({
  _: "lodash",
  $: "jquery",
  jQuery: 'jquery'
})
// 在业务代码中任意位置可使用: _ 、$
_.join(['a', 'b', 'c'], ' ');
$('#app')
```

## loader

### imports-loader：向个人模块的作用域内中注入变量（第三方模块）

```
// 更多用法可参考官方文档
// example.js
$('img').doSomeAwesomeJqueryPluginsStuff();
// loader配置
// 在index.js在使用example.js，通过以下二种方式注入$到example.js顶部
require('import-loader?$=jquery!./example.js');
// 或module.rules
{
  test: require.resolve('example.js'),
  use: 'imports-loader?$=jquery'
}
```

### exports-loader：在个人非模块代码中添加模块化导出语句来使用模块化代码

1.  在文件内部通过添加 exports[...] = ...语句来导出定义的变量，然后通过模块化方式导入使用
2.  使用方式：webpack 配置或源文件中 require("exports-loader?file!./file.js")

```
// src/globals.js
var file = 'blah.txt';
var helpers = {
  test: function() { console.log('test something'); },
  parse: function() { console.log('parse something'); }
}

// webpack.config.js
// require.resolve: node api调用，用来获取模块的绝对路径（与webpack无关）
module: {
  rules: [
    {
      test: require.resolve('globals.js');
      use: 'exports-loader?file,parse=helpers.parse'
    }
  ]
}

// src/index.js
import { file, parse } from './globals.js';
```

### expose-loader: 把第三方模块挂载到全局对象下

1.  添加（暴露）模块到全局对象，方便调试...
2.  模块必须在应用中被 require | import 过，否则将不会被暴露

```
// module.rules
{
  test: require.resolve('jquery'),
  use: [
    {
      loader: 'expose-loader',
      options: '$'
    },
    {
      loader: 'expose-loader',
      options: 'jQuery'
    }
  ]
}
// index.js
import 'jquery';
```

## lodash 导入优化

1.  使用插件 babel-plugin-lodash | lodash-webpack-plugin
2.  babel-plugin-lodash 通过转换导入语法, 以减小 bundle
3.  lodash-webpack-plugin 通过替换 feature set 更进一步减小 bundle

```
// babel-plugin-lodash transform
import { map, filter } from 'lodash';
// to
import map from 'lodash/map';
import filter from 'lodash/filter';

// babel config
{
  plugins: ['lodash']
}
// webpack config
// 此插件在webpack4中使用有报错？故暂不使用
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
module.exports = {
  plugins: [
    new LodashModuleReplacementPlugin(),
  ]
}
```
