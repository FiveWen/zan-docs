# API 说明

<!-- TODO: 以下为文档结构示例，对接前请与前端团队确认真实约定 -->

## 页面跳转

| 页面 | 路径 | 参数 |
|---|---|---|
| 商城首页 | `/` | TODO |
| 商品详情 | `/goods/:id` | TODO |
| 订单列表 | `/order/list` | TODO |

## JSBridge 调用

若宿主 App 提供桥接能力，商城页面通过以下方式调用：

```js
// 示例结构，以实际桥接协议为准
bridge.call('methodName', params, callback)
```

详见 [App 对接文档](/app/api)。

## 消息通信

| 方向 | 方式 | 说明 |
|---|---|---|
| 宿主 → 商城页 | TODO | TODO |
| 商城页 → 宿主 | TODO | TODO |
