# App 对接接入

## 概述

App 对接文档面向与原生 App 进行混合开发的业务方，覆盖 JSBridge 通信、页面导航、生命周期同步等场景。

<!-- TODO: 补充支持的 App 版本范围与桥接协议版本 -->

## 快速开始

### 1. 注入桥接对象

App 在 webview 内注入全局桥接对象，H5 侧通过它调用原生能力：

```js
// 示例结构，以实际桥接协议为准
window.AppBridge.call('getUserInfo', {}, (res) => {
  console.log(res)
})
```

### 2. 判断宿主环境

```js
// TODO: 确认 UA 约定或注入的环境标识
const isApp = /YourAppUA/.test(navigator.userAgent)
```

### 3. 调用原生能力

TODO: 补充能力清单与调用示例

## 接入步骤清单

- [ ] 与 App 端确认桥接协议版本
- [ ] H5 侧封装桥接调用与降级逻辑（非 App 环境兜底）
- [ ] 联调核心能力（登录态、跳转、分享）
- [ ] 验证异常场景（桥接对象不存在、调用超时）

## 下一步

- [API 说明](/app/api)
- [常见问题](/app/faq)
- [更新日志](/app/changelog)
