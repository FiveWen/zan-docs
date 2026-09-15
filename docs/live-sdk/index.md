# 直播小程序 SDK 接入

## 概述

直播小程序 SDK 提供在小程序内接入直播观看能力的一整套方案，覆盖直播间播放、互动消息、商品列表等场景。

<!-- TODO: 补充真实的能力清单与适用端（微信小程序 / 其他小程序平台） -->

## 环境要求

- 小程序基础库版本：TODO（确认后填写）
- 已开通直播权限的小程序账号

## 快速开始

### 1. 引入 SDK

```bash
# TODO: 确认 SDK 分发方式（npm 包 / miniprogram_npm / 直接引入文件）
npm install @sesun/live-sdk
```

### 2. 初始化

```js
// 示例结构，具体参数以实际 SDK 为准
import LiveSDK from '@sesun/live-sdk'

const sdk = new LiveSDK({
  appId: 'your-app-id', // TODO: 确认参数
  userId: 'current-user-id'
})
```

### 3. 拉起直播间

```js
// TODO: 补充真实调用方式
sdk.enterRoom({ roomId: 12345 })
```

## 接入步骤清单

- [ ] 获取 SDK 与接入凭证
- [ ] 小程序后台配置域名白名单（TODO: 补充域名列表）
- [ ] 集成 SDK 并初始化
- [ ] 联调直播间播放
- [ ] 验证异常场景（断网、后台切前台）

## 下一步

- [API 说明](/live-sdk/api)
- [常见问题](/live-sdk/faq)
- [更新日志](/live-sdk/changelog)
