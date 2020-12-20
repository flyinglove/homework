const path = require("path");

// 基础webpack配置， 开发和生产都需要执行
module.exports = {
    // 指定打包的环境，目的是处理 webpack5中hmr失效的问题
  target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
  // 指定打包的入口
  entry: {
    app: "./src/main.js",
  },
  // loader配置
  module: {
    rules: [
      {
        test: /\.vue$/, // 使用vue-loader处理vue文件， 后续拆分出的js, style会分别走相关的loader
        use: "vue-loader",
      },
      {
        test: /\.js$/, // 针对js，  先eslint校验， 再babel转换
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "eslint-loader",
          },
        ],
      },
      {
        test: /\.png$/, // 加载图片
        use: {
          loader: "url-loader",
          options: {
            esModule: false,
          },
        },
      },
    ],
  },
  // 指定结果输出位置
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
};
