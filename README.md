### 使用指南

#### 全局安装cli
```
$ npm install -g @tarojs/cli
```

#### 开发
```
$ npm run dev
```

#### 发布
```
$ npm run build
```

#### 环境配置
- 文件：/src/services/config.ts
- 开发环境: export const ENV = 'dev'
- 开发环境: export const ENV = 'prod'

#### 功能页面
- 路径：/src/pages
- home/index.tsx: 首页
- index.tsx: 分享页
- editor/index.tsx: 普通玩法，本地生成图片
- segment/index.tsx: 一键抠图，本地生成图片
- dynamic/index.tsx: 动态背景：服务端生成视频
- filter/index.tsx: 夹层滤镜：服务端生成视频

