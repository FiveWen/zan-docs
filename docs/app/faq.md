# 常见问题

## `AppBridge` 未定义？

1. 确认页面运行在 App webview 内（浏览器/微信内打开没有桥接对象）
2. 确认桥接注入时机 —— 建议监听 `DOMContentLoaded` 后再调用，或使用 ready 事件（TODO: 确认协议）
3. 非 App 环境务必走降级逻辑

## 调用无回调？

1. 确认 method 名拼写与协议一致
2. 确认 App 版本支持该能力（见[能力清单](/app/api#能力清单)）
3. 建议封装调用超时兜底

---

没找到答案？[提 issue](https://github.com/FiveWen/zan-docs/issues)。
