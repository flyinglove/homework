# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性


ToDo:
一、还原vue-cli原有能力
    开发阶段：
        [] babel
        [] ts
        [] lint
        [] 支持scss, sass, less, stylus编译
        [] postcss
        [] 支持加载图片，字体
        [] hmr
    生产：
        [] 代码压缩
        [] TreeShaking
        [] 分包
        [] 动态加载
    其他：
        [] 配置文件

二、自定义loader, plugin

三、git hook集成

拓展：
.env文件
