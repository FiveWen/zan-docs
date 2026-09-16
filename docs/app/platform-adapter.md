# 平台 Adapter 规范

Adapter 是平台 SDK 与商城统一能力之间的边界。它只处理协议差异，不读取 Vuex、不请求商城业务接口，也不直接写 Mall/Ucenter 登录态。

## 基本接口

```ts
interface PlatformAdapter {
  detect?(context): boolean | Promise<boolean>
  prepare?(context): Promise<void>
  probe?(context): boolean | {
    confirmed: boolean
    capabilities?: string[]
  }
  login(): Promise<HostCredential>
  share?(payload): Promise<unknown>
  scan?(): Promise<{ text: string }>
  location?(): Promise<unknown>
  navigate?(payload): Promise<unknown>
  launchPayment?(payload): Promise<unknown>
  dispose?(): void
}
```

## 方法要求

| 方法 | 要求 |
|---|---|
| `detect` | 基于可靠宿主证据识别候选平台；不得只看宽泛 UA |
| `prepare` | 加载 SDK 或等待 Bridge 注入；重复调用应安全 |
| `probe` | 确认 Bridge 真实可用，并返回实际能力交集 |
| `login` | 只返回平台临时凭据，不生成商城 token |
| 能力方法 | 归一平台响应；明确区分成功、失败与取消 |
| `dispose` | 移除监听、回调和平台实例，允许重复执行 |

## 业务项目注入

```js
const bridge = createZanBridge({
  apps,
  adapters,
  exchangeLogin: verifyCredentialWithMallBackend,
  validateSession: validateMallSession,
  commitSession: commitProjectSession
})
```

后台交换、会话校验与存储由业务项目实现。Adapter 不能接触商城 token。`commitSession` 应同步检查当前登录尝试仍然有效，再一次性提交项目会话。

## 错误原则

- Bridge 缺失：接入状态降级，不进入平台能力；
- 能力缺失：`supports` 返回 false，页面不得调用；
- 用户取消：使用可识别的取消错误，业务页面可静默恢复；
- 无原生回调：不得用短超时推断用户操作失败或成功；
- 多宿主同时匹配：停止自动选择并记录配置错误。

新增 Adapter 必须包含协议归一、错误、取消、重复初始化和清理测试。
