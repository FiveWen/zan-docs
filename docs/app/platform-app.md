# 平台型 App 对接

平台型 App 拥有自己的用户体系与原生桥协议，商城 H5 作为被嵌入页面，主动适配该平台的登录、分享、扫码等能力。这类方向在 `@zan/embed-bridge` 中称为 `host-owned`。北仑是目前的 CP2 实例，不是接入类别名称；其他平台可能采用完全不同的桥协议，需单独编写适配器。

> 当前状态：公共包 `0.1.0-canary.2` 已提交北仑 CP2 登录、微信分享、定位和扫码的基线。跨平台的通用能力探测和同步会话提交仍在开发中，尚未发布；不能推断其他平台已由该包支持。

## 标准流程

1. 按站点白名单和接入方标识识别候选平台；排除浏览器、微信和小程序等非目标环境。
2. 加载平台 SDK，确认真实桥对象及所需方法可用。只有 URL 参数不能证明页面确实在平台 App 中。
3. 调用平台登录取得临时凭据，由商城后台验证并交换为商城会话。
4. Mall/Ucenter 分别提交自己的会话；完成后按真实能力开放分享、扫码或定位。
5. 失效或 401 时重新验证，不用未验证的宿主 token 代替商城 token。

### 页面入口

```text
/mall/?siteId=<站点ID>&hostApp=<平台key>
```

`hostApp` 是宿主上下文提示，不是认证凭据。跨 Mall/Ucenter 的链接可用 `bridge.appendContext(url)` 传递它；外部分享落地链接是否携带该参数，应按目标 App 的打开方式和落地规则联调。

### CP2 实例（已提交基线）

```js
const { createZanBridge, createCp2Adapter } = require('@zan/embed-bridge')

const bridge = createZanBridge({
  apps: [{
    key: 'example-platform',
    adapter: 'cp2',
    siteIds: [/* 与商城前端确认的站点 ID */],
    sdkUrl: '<平台 SDK 地址>',
    globalName: 'CP2',
    capabilities: ['login', 'share', 'scan', 'location']
  }],
  adapters: { cp2: createCp2Adapter() },
  getSiteId: () => window.siteId,
  exchangeLogin: async ({ siteId, credential }) => {
    const session = await verifyWithMallBackend(siteId, credential)
    // canary.2 尚无统一提交钩子，由业务项目写入自己的登录态。
    saveProjectSession(session)
    return session
  }
})

const result = await bridge.login()
if (result.matched && result.active) enablePlatformFeatures()
```

示例中的后台验证、会话存储和页面函数由业务项目实现；不应在 URL 中传递商城 token，也不应把平台凭据直接当作商城登录态。

| 方法 | CP2 行为 | 业务项目责任 |
|---|---|---|
| `login()` | 宿主登录并取得凭据 | 后台验证、商城会话写入与 401 恢复 |
| `share(payload)` | 等待真实分享回调，不使用固定 8 秒判断失败 | 分享内容、渠道和落地链接 |
| `scan()` | 返回 `{ text }`，明确取消抛 `SCAN_CANCELLED` | 二维码解析、跳转及错误提示 |
| `location()` | 归一定位响应 | 定位授权后的业务使用 |

下单、预支付、跳转小程序及支付结果确认不属于这个 canary 包的能力。平台支付实现即使已有业务代码，也要按实际预支付返回字段和宿主跳转协议分别联调。

## 扩展到其他平台

复用的是入口、登录验证、状态与能力调度规范；变化部分是平台 SDK、凭据格式、桥方法及响应归一。新增平台应先提供真实协议和后台交换合同，再注册其适配器与站点范围。不能把 CP2 的方法名、成功码或支付规则直接套到其他平台。

返回 [App 对接总览](/app/)。
