const webpack = require("webpack");
const merge = require("webpack-merge");

module.exports = (env, argv) => {
  // 通用配置
  const commonConfig = require("./webpack.common")(env, argv);

  // 环境变量
  const envConfig = require("./env")[env.NODE_ENV];
  const urlObject = new URL(envConfig.url);
  // 开发环境添加api前缀
  envConfig.url = "/api";

  // 开发配置
  const devConfig = {
    devServer: {
      contentBase: commonConfig.output.path,
      publicPath: commonConfig.output.publicPath,
      https: true,
      host: "0.0.0.0", // 开启本地ip访问
      disableHostCheck: true, // 可授受任意host请求，默认只接受本地请求
      port: 9000,
      open: true,
      compress: true,
      hot: true,
      inline: true,
      historyApiFallback: true, // 任意路由指向index.html
      overlay: {
        // 显示编译时的错误或警告
        warnings: true,
        errors: true,
      },
      proxy: {
        "/api": {
          target: `${urlObject.protocol}//${urlObject.host}`, // protocol + host(含端口)
          pathRewrite: {
            // '^/api': '/api/v1',
            "^/api": urlObject.pathname,
          },
          secure: false, // 默认true, 不接受运行在https上且使用了无效证书的后端服务器
          changeOrigin: true, // name-based virtual hosted sites
        },
      },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        ENV_CONFIG: JSON.stringify(envConfig), // 手动个性过api url
      }),
    ],
  };

  const mergeConfig = merge.smart(commonConfig, devConfig);
  console.log("mergeConfig: ", mergeConfig.module.rules);
  return mergeConfig;
};
