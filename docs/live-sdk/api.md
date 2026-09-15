# API 说明

<!-- TODO: 以下为文档结构示例，接入前请与前端团队确认真实 API 签名 -->

## 初始化

```ts
new LiveSDK(options: LiveSDKOptions)
```

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `appId` | `string` | 是 | TODO |
| `userId` | `string` | 是 | TODO |

## 进入直播间

```ts
sdk.enterRoom(params: EnterRoomParams): Promise<void>
```

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `roomId` | `number` | 是 | 直播间 ID |

## 事件监听

| 事件名 | 触发时机 | 回调参数 |
|---|---|---|
| `ready` | SDK 初始化完成 | - |
| `error` | 发生错误 | `Error` |

## 错误码

| 错误码 | 含义 | 处理建议 |
|---|---|---|
| TODO | TODO | TODO |
