# 北仑 CP2 参考实现

北仑是“我方适配平台型 App”的一个参考实例。商城加载北仑 CP2 SDK，并将其登录、分享、扫码和定位映射到 `@zan/embed-bridge`。

> 当前发布基线：`@zan/embed-bridge@0.1.0-canary.2`。本文只描述已验证的公共包能力；商城支付属于业务项目集成，不等同于公共包支付 API。

## 能力映射

| 商城能力 | CP2 方法 | 说明 |
|---|---|---|
| 登录 | `showLogin({ refresh: 0 })` | 返回平台账号与 session，由商城后台验证 |
| 微信分享 | `showShare(payload)` | 等待 CP2 真实回调，不使用固定 8 秒判定失败 |
| 扫码 | `showScanQr({ needResult: 1 })` | 成功归一为 `{ text }`，明确取消为 `SCAN_CANCELLED` |
| 定位 | `getLocation()` | 归一后交给业务页面使用 |

## 配置示例

```js
const { createZanBridge, createCp2Adapter } = require('@zan/embed-bridge')

const bridge = createZanBridge({
  apps: [{
    key: 'beilun',
    adapter: 'cp2',
    siteIds: [/* 接入站点 */],
    sdkUrl: '<CP2 SDK 地址>',
    globalName: 'CP2',
    capabilities: ['login', 'share', 'scan', 'location']
  }],
  adapters: { cp2: createCp2Adapter() },
  getSiteId: () => window.siteId,
  exchangeLogin: verifyBeilunCredentialWithMallBackend
})
```

`siteIds` 由我方在接入时配置，不是平台方页面参数。后台交换函数和 Mall/Ucenter 会话写入属于业务项目实现。

## 页面与分享上下文

商城入口携带 `hostApp=beilun`。Mall 跳转 Ucenter 时继续携带该非敏感标识。分享链接必须移除 token、session 等认证参数；是否保留 `hostApp` 取决于链接是否需要重新回到北仑 App 场景。

## 回归重点

- 浏览器中手动拼接 `hostApp=beilun` 不能触发清会话；
- CP2 缺失或登录失败不能进入 ACTIVE；
- 分享和扫码等待真实回调，取消后页面可再次操作；
- Mall/Ucenter 往返保持正确宿主上下文；
- 微信、小程序和历史 App 原有流程保持不变。
