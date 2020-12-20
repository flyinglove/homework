const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseWebpack = require("./webpack.common.js");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(baseWebpack, {
  mode: "none",
  devtool: "nosources-source-map", // 生产环境sourcemap, 只看行列号就可以了
  output: {
    path: path.join(__dirname, "dist"), // 生产环境打包输出带上hash, 避免缓存
    filename: "[name].[contenthash].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all", // 公共内容提取统一模块， 这里只有一个页面， 没有公共内容， 单纯使用练习
    },
    usedExports: true, // 标记没使用到的esmodule，为treeshaking第一步
    minimizer: [
      new TerserWebpackPlugin(), // 压缩js代码， 主要是手动压缩css时会覆盖js压缩插件
      new OptimizeCssAssetsWebpackPlugin(), // 压缩css
    ],
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 打包前先清理dist目录
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify("production"),
    }),
    new MiniCssExtractPlugin({ // 压缩css时也要带上hash
      filename: "[name].[contenthash].css",
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "My Page",
      inject: "body",
      chunks: "app",
    }),
  ],
});
