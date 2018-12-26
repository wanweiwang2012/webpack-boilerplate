const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const commonConfig = require("./webpack.common");

module.exports = (env, argv) => {
  // 环境变量
  const envConfig = require("./env")[env.NODE_ENV];

  // 生产配置
  const prodConfig = {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: "commons",
            chunks: "initial",
            minChunks: 2,
            reuseExistingChunk: true,
          },
          vendors: {
            test: /node_modules/,
            chunks: "all",
            name: "vendors",
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
      runtimeChunk: "single",
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true, // 使用多进程并行运行来提高构建速度
          sourceMap: true, // 生成源码映射文件
          uglifyOptions: {
            warnings: false,
            output: {
              beautify: false, // 默认true, 美化代码（会大量增加文件大小）
              comments: false, // 默认false, 保留注释
            },
            compress: {
              warnings: false, // 默认false, 删除无用代码时显示警告
              drop_console: true, // 默认false, 删除console语句
              collapse_vars: true, // 默认true, 内嵌定义了但是只用到一次的变量
              reduce_vars: true, // 默认true, 提取出出现多次但是没有定义成变量去引用的静态值
            },
          },
        }),
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        ENV_CONFIG: JSON.stringify(envConfig),
      }),
    ],
  };

  const mergeConfig = merge(commonConfig(env, argv), prodConfig);
  console.log("mergeConfig: ", mergeConfig);
  return mergeConfig;
};
