# API 说明

<!-- TODO: 以下为文档结构示例，对接前请与 App 端确认真实桥接协议 -->

## 桥接调用约定

```ts
AppBridge.call(method: string, params: object, callback: (res: BridgeResult) => void)
```

| 参数 | 类型 | 说明 |
|---|---|---|
| `method` | `string` | 能力方法名 |
| `params` | `object` | 入参 |
| `callback` | `function` | 回调，`res.code === 0` 表示成功 |

## 能力清单

| 方法 | 说明 | 最低 App 版本 |
|---|---|---|
| `getUserInfo` | 获取当前用户信息 | TODO |
| `navigateTo` | 原生页面跳转 | TODO |
| `share` | 调起分享 | TODO |
| `closeWebview` | 关闭当前 webview | TODO |

## 回调结果结构

```ts
interface BridgeResult {
  code: number   // 0 成功，非 0 失败，错误码表 TODO
  msg: string
  data?: object
}
```
