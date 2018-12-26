const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { getAbsolutePath } = require("./helper");

// 构建目录
const buildDir = getAbsolutePath("dist");

module.exports = function(env, argv) {
  // 是否生产环境标志（测试、预发、生产）
  const isProd = env.NODE_ENV !== "development";

  // 通用配置
  const config = {
    target: "web",
    mode: !isProd ? "development" : "production",
    devtool: !isProd ? "source-map" : "source-map",
    entry: {
      app: getAbsolutePath("src/index.js"),
    },
    output: {
      filename: !isProd ? "js/[name].bundle.js" : "js/[name].[chunkhash:8].bundle.js",
      chunkFilename: !isProd ? "js/[name].chunk.js" : "js/[name].[chunkhash:8].chunk.js",
      path: buildDir,
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: getAbsolutePath("src"),
          exclude: [getAbsolutePath("src/libs")],
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[name]__[local]__[hash:6]",
                importLoaders: 1,
                camelCase: true,
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 2048,
              name: "[name].[hash:8].[ext]",
              outputPath: "images/",
            },
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[hash:8].[ext]",
              outputPath: "fonts/",
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".json", ".jsx"],
      alias: {
        "@": getAbsolutePath("src"),
      },
      mainFields: ["jsnext:main", "browser", "main", "module"],
    },
    plugins: [
      new CleanWebpackPlugin([buildDir], {
        // the default is the webpack configuration file directory, please specify this project root directory
        root: getAbsolutePath(),
        // default: ture, write logs to console
        verbose: true,
        // default: false, remove files
        dry: false,
      }),
      new HtmlWebpackPlugin({
        title: "小智在线",
        filename: "index.html",
        template: getAbsolutePath("src/index.html"),
        // adds the given favicon path to the output HTML
        favicon: getAbsolutePath("src/favicon.ico"),
        // true if mode is 'production', otherwise false
        // minify: false,
        // inject: true,
        // hash: false,
        // cache: true,
      }),
    ],
  };

  return config;
};
