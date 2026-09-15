# App 接入商城 H5

此方向由 App 在自己的 WebView 中嵌入商城 H5，并消费商城发出的既有消息。`@zan/embed-bridge` 中称为 `mall-owned`：商城定义业务意图，适配层按目标 App 已有协议编码和发送；首轮 v0 迁移不要求 App 先升级到新桥协议。

> 当前状态：UniApp、UniAppX、Modern Native 的 v0 包级传输底座在本地开发中，尚未提交、发布或接入 Mall/Ucenter。以下是目标规范，不是已经可直接联调的线上能力。

## 标准流程

1. 通过真实注入对象和宿主标识确认目标 App；多个 App 同时匹配时不猜测宿主，并排除微信/小程序环境。
2. 从已确认的来源取得宿主登录凭据，经商城后台验证并建立商城登录态。只有消息通道可用不代表用户已登录。
3. 业务项目生成分享、导航、扫码或支付意图；适配层转换成该 App 当前实际消费的消息格式。
4. 单向发送只确认消息投递；需要最终结果的操作按已验证回调或后台状态处理。

## 现有消息 v0 约定

不同 App 的消息 `type`、`payload`、发送包装和登录凭据来源可能不同。项目必须逐 App 登记真实消息，不能为了统一接口擅自改变 App 已消费的 wire 格式。

```js
// 开发中接口示意；消息类型和数据结构必须替换为目标 App 已联调的合同。
const { createExistingAppAdapter, createUniAppTransport } = require('@zan/embed-bridge')

const adapter = createExistingAppAdapter({
  transport: createUniAppTransport(),
  acquireCredential: getVerifiedHostCredential,
  operations: {
    share: {
      encode: intent => ({ type: '<现有分享消息类型>', data: intent }),
      responseMode: 'oneway'
    }
  }
})
```

`acquireCredential` 必须接入可信来源并由后台验证；缺失时不能将该 App 接入标记为 ACTIVE。示例只展示配置形状，不代表任何 App 已消费所示字段。

| 返回状态 | 含义 | 不能据此宣称 |
|---|---|---|
| `{ status: 'dispatched' }` | 单向消息已发送至 App 通道 | 用户已完成分享、导航或扫码 |
| `{ status: 'pending' }` | 支付拉起请求已发送 | 订单已支付成功 |

支付仍由商城业务项目负责下单、取得预支付数据和后台查单。即使 App 发回“支付完成”消息，最终付款状态也应以后台订单状态为准。未来如需确定的原生回调，可由 App 与 H5 联合设计带 requestId/握手的 v1 协议；现有 v0 不预设此能力。

## 上线前必须确认

- 每个 App 的宿主识别、桥注入时机、真实消息类型及参数
- 宿主凭据如何取得，以及商城后台如何验证、刷新和恢复登录
- Mall ↔ Ucenter 页面跳转时的上下文及会话处理
- 分享落地、扫码取消、支付取消和从 App 返回后的状态确认
- 新旧桥路径如何隔离、灰度和回退

返回 [App 对接总览](/app/)。
