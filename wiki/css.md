## webpack css

- style-loader
- css-loader
- postcss-loader(位置：在 style-loader 和 css-loader 之后，但在预处理器（less/sass）之前)
- less/sass

### style-loader

1.  将样式抽取到 html 文件 head 中，包裹在 style 标签中

### css-loader

1.  解析 css 中的@import/url()，需要 file-loader 和 url-loader 配合  处理 url

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [],
        exclude: [],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              root: '/', // default
              url: true, // 启用|禁用url()处理
              alias: {}, // 创建别名来导入模块
              import: true, // 启用|禁用@import处理
              importLoaders: 0, // 在css-loader前应用的loader数量
              modules: false, // 启用|禁用css模块
              localIndentName: '[hash:base64]', // 配置生成的标识符
              sourceMap: false, // 启用或禁用Sourcemap
              camelCase: false, // 以驼峰化式全名导出类名
              minimize: false, // 启用或禁用压缩，基于cssnano, 新版本已移到postcss处理
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      }
    ]
  }
}
```

- 开启 css 模块化功能

### postcss-loader

- postcss-loader 本身并不处理@import 语法，需要配合 css-loader 或 post-css 插件来处理
- postcss 插件：cssnext | cssnano | modules

#### cssnext

1.  用来使用最新 css 语法的插件
2.  包含 autoprefixer 插件的功能

#### cssnano

1.  压缩|优化 css 文件的大小
2.  采用 Node.js 编写的 postcss 插件
3.  通常用于生产环境
4.  cssnano 与 css-loader 已经捆绑，但也可以在 postcss-loader 中显式使用
5.  可自定义配置规则

### less-loader

### 抽取样式（[Extract CSS]|[ExtractPlugin]）

```
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              },
            },
            'postcss-loader',
            'less-loader',
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css'),
    disable: mode === 'development',
  ],
}
```

\*\*\* normalize.css 使用

```
// in css
// 必须添加~，webpack中解析为从node_modules中查找模块
@import '~normalize.css'; // true
@import 'normalize.css'; // wrong
```

```
// in js
import 'normalize.css'; // true
import '~normalize.css'; // wrong
```

### mini-css-extract-plugin(webpack4 样式提取插件)

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // modules: true,
              // localIdentName: '[name]__[local]--[hash:6]',
              importLoaders: 2,
              minimize: true,
            },
          },
          'postcss-loader',
          'less-loader','
        ]
      }
    ],
  },
}
```

1.  基础配置
