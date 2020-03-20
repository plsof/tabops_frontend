# tabops_frontend

  <a href="https://github.com/plsof/tabops_frontend/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>


## 简介

[tabops_frontend](https://github.com/plsof/tabops_frontend) 是后台tabops_api前端的实现，它基于 [vue-element-admin](https://panjiachen.github.io/vue-element-admin)实现。

- [后端项目](https://github.com/plsof/tabops_api)

- [前端项目](https://github.com/plsof/tabops_frontend)



## 功能

```
- 登录
- 退出

- 首页
- 资产管理
   - 机房
   - 机柜
   - 机架
   - 宿主机
   - 主机
- 业务架构
   - 具体业务系统
      - 架构图
      - 部署信息
- 业服类型
   - 业务类型
   - 服务类型
- 认证授权
   - 用户管理
- 系统设置
   - 图片上传

```

## 开发

```bash
# 克隆项目
git clone https://github.com/plsof/tabops_frontend.git

# 进入项目目录
cd tabops_frontend

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```


## 截图


## License

[MIT](https://github.com/plsof/tabops_frontend/blob/master/LICENSE)

Copyright (c) 2020 plsof