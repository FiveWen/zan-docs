# WebView 与环境约定

## 基本要求

- 支持 HTTPS、JavaScript、Cookie、LocalStorage 和 SessionStorage；
- iOS 与 Android 使用一致的商城 URL 和协议版本；
- WebView 允许访问双方确认的商城、图片及支付相关域名；
- 页面前进、后退、刷新和外部链接策略由双方联调确认；
- App 切换前后台或销毁 WebView 时，不保留失效回调。

## 宿主识别

当前新 App 兼容路径要求 User-Agent 包含 `JUBAOZAN`，并在入口 URL 携带已分配的 `hostApp`。最终是否激活 App 链路，还会校验真实消息通道；任一条件缺失时商城应保留普通网页逻辑。

> `JUBAOZAN` 是当前实现约定。正式协议发布时将同时声明协议版本；App 方不得使用商家 ID 或模糊 UA 作为长期识别方案。

## H5 向 App 发送消息

原生 WebView 当前兼容以下任一注入方式，推荐使用首项：

### iOS WKWebView

```js
window.webkit.messageHandlers.postMessage.postMessage(message)
```

### Android

```js
window.Android.postMessage(JSON.stringify(message))
```

兼容的 handler 名称依次为 `postMessage`、`Android`、`NativeApp`、`JSBridge`。新接入应固定一个双方确认的名称，不应同时注入多个不同实现。

UniApp 当前包装为 `{ type: 'message', data: message }`；UniAppX 当前包装为 `{ data: message }`。这些是历史运行时兼容格式，新 App 必须在联调表中明确实际采用哪一种传输。

## App 向 H5 发送消息

当前兼容入口为：

```js
window.onAppMessage(message)
```

App 应传入 JavaScript 对象。若原生层只能传 JSON 字符串，需先在注入脚本中安全解析，再调用该函数。页面尚未初始化完成时不得提前发送回调。

## 安全要求

- 只加载双方确认的 HTTPS 域名；
- Bridge 只向可信商城页面注入；
- 消息不得包含长期商城 token 或无关用户隐私；
- 不执行 H5 下发的任意脚本，只处理白名单 `type`；
- URL 跳转需校验 scheme、host 和允许的页面范围。
