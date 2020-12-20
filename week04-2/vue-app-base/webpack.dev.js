const { merge } = require("webpack-merge");
const baseWebpack = require("./webpack.common.js");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
// 开发环境配置
module.exports = merge(baseWebpack, {
  mode: "none", // 正常应该是Development, 这里为了禁用内置配置， 所以设置为none
  devServer: {
    contentBase: ["./public", "./dist"], // devServer提供静态服务的目录
    open: true, // 自动打开浏览器
    hot: true, // 开启hmr
  },
  devtool: "eval-cheap-module-source-map", // 开发环境需要详细的sourcemap
  module: {
    rules: [
      {
        test: /\.less$/, // 处理less, css文件
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // 使用vueLoader
    new HtmlWebpackPlugin({ // 生成的js, css会自动注入htmlWebpackPlugin配置的文件
      template: "./public/index.html",
      title: "My Page",
      inject: "body",
    }),
    new webpack.ProvidePlugin({ // webpack5移除了内置的各类node相关的polyfill, 需要手动引入需要的
      process: "process/browser",
    }),
    new webpack.HotModuleReplacementPlugin(), // hmr
    new webpack.DefinePlugin({ // 设置NODE_ENV
      NODE_ENV: JSON.stringify("development"),
    }),
  ],
});
