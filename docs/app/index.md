# App 对接

商城 H5 嵌入 App 时，前端统一使用 `@zan/embed-bridge` 管理宿主识别、登录状态和原生能力调用。这个包不替代商城或 Ucenter 的后台接口、登录态存储、下单与查单逻辑。

> 版本状态：`0.1.0-canary.2` 已提交北仑 CP2 登录、分享、定位和扫码能力。两类接入的通用底座与现有 App 消息 v0 适配仍在开发中，尚未提交、发布或接入业务项目；下文会分别标明，不应把开发中接口当作线上合同。

## 接入方向

| 类型 | 对接方式 | 当前状态 |
|---|---|---|
| 商城适配 App（`host-owned`） | App 有自己的桥协议，商城编写适配器调用它；北仑使用 CP2 | 北仑已有 canary 基线；通用能力探测开发中 |
| App 适配商城（`mall-owned`） | App 消费商城 H5 发出的既有消息，前端按 App 实际协议编码和发送 | UniApp、UniAppX、Modern Native 的包级 v0 底座开发中，尚未在 Mall/Ucenter 启用 |

两类都必须完成后台验证的商城登录。检测到 App、注入了桥对象或传入 `hostApp` 参数，只能说明是候选宿主，不能证明用户已登录。历史已上线的 App 桥接路径应保持运行，逐场景联调后再迁移。

## 北仑接入快速开始（已提交基线）

进入商城页面时传入站点 ID 和接入方标识：

```text
/mall/?siteId=<站点ID>&hostApp=<接入方key>
```

`hostApp` 用于识别候选宿主，不是登录 token。商城还要确认真实 CP2 Bridge 可用，然后调用宿主登录，并由商城后台交换为商城会话。仅凭 URL 参数不应清除普通浏览器的已有登录态。

```js
const { createZanBridge, createCp2Adapter } = require('@zan/embed-bridge')

const bridge = createZanBridge({
  apps: [{
    key: 'example-host',
    adapter: 'cp2',
    siteIds: [/* 与前端确认的站点 ID */],
    sdkUrl: '<宿主 SDK 地址>',
    globalName: 'CP2',
    capabilities: ['login', 'share', 'scan', 'location']
  }],
  adapters: { cp2: createCp2Adapter() },
  getSiteId: () => window.siteId,
  exchangeLogin: async ({ siteId, credential }) => {
    const session = await verifyWithMallBackend(siteId, credential)
    // canary.2 由业务项目负责写入自己的商城会话。
    saveProjectSession(session)
    return session
  }
})

const result = await bridge.login()
if (result.matched && result.active) enableEmbeddedFeatures()
else if (!result.matched) continueWebsiteFlow()
```

上例的后台验证和会话存储函数由业务项目实现，不能把宿主凭据直接当作商城 token。Mall 和 Ucenter 各自写入自己的认证存储；跨项目页面跳转可用 `bridge.appendContext(url)` 传递接入标识，不在 URL 中传递登录 token。

登录成功后，北仑 CP2 已有以下能力：

| 公共包方法 | 用途 | 结果语义 |
|---|---|---|
| `share(payload)` | 微信分享 | 等待 CP2 真实回调，不以固定 8 秒超时判断失败 |
| `scan()` | 扫一扫 | 返回 `{ text }`；明确取消时抛 `SCAN_CANCELLED` |
| `location()` | 定位 | 返回归一后的定位数据 |

扫码文本如何解析、分享落地页如何跳转，由商城业务处理。支付下单、预支付、小程序拉起后的查单也不属于这个 canary 版本的公共包能力。

## 现有 App 消息标准化（开发中）

下一版包级底座计划保留 App 已消费的 v0 消息格式，由项目登记真实 `type` 和数据结构，不要求 App 为第一步迁移先升级协议。单向消息只表示「已发送到 App 通道」，不代表用户已完成分享或支付；支付结果必须由业务项目向后台确认。

开发中的统一入口包括 `navigate(intent)` 和 `launchPayment(intent)`，但实际 App 消息映射、可信登录凭证来源、后台验证与消费端接入尚未完成。未来若需要确定的原生回调，可与 App 联合设计带 requestId/握手的 v1 协议；v0 不应假定已有此能力。

## 联调检查清单

- [ ] 确认接入方向、目标站点和宿主识别证据
- [ ] 确认登录凭据来源、后台验证及会话写入责任
- [ ] 确认真实分享、扫码、导航与支付消息/回调合同
- [ ] 验证浏览器、微信、小程序环境不会误认 App
- [ ] 验证 Mall ↔ Ucenter 跳转、分享落地和异常恢复
- [ ] 支付成功以后台查单为准，不以 App 消息投递为准

侧栏中的旧版 API、FAQ 页面仍有模板占位内容；联调前应以当前包版本和业务项目的真实接入合同为准。
