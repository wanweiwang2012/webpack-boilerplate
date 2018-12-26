## webpack 环境变量

### webpack4 mode

> 提供 mode 配置选项，告知 webpack 使用相应模式的内置优化

1.  用法(如果未指定时，默认使用'production')

```
// 配置文件
module.exports = {
  mode: 'production', // 'development' | 'production' | 'none'
}
// 命令行
webapck --mode=production
```

2.  通过 mode 设置，process.env.NODE_ENV 会被注入到构建的代码中（非配置中）, 所以不再需要通过 DefinePlugin 来注入环境变量（其它变量注入仍需要此插件，如：api url）

3.  注意事项

* 设置 NODE_ENV 值并不会自动设置 mode

### 插件

### 环境变量
