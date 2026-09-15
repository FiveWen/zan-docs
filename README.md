# zan-docs

团队前端文档站，基于 [VitePress](https://vitepress.dev/) 构建，部署于 GitHub Pages。

线上地址：https://fivewen.github.io/zan-docs/

## 本地开发

```bash
npm install
npm run docs:dev   # http://localhost:5173
```

## 构建

```bash
npm run docs:build    # 产物在 docs/.vitepress/dist
npm run docs:preview  # 本地预览构建产物
```

## 发布

推送到 `main` 分支后，GitHub Actions 自动构建并发布到 GitHub Pages。

首次使用需在仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。

## 目录约定

| 目录 | 内容 |
|---|---|
| `docs/guide/` | 总览指南 |
| `docs/live-sdk/` | 直播小程序 SDK 接入 |
| `docs/h5-mall/` | H5 商城对接 |
| `docs/app/` | App 对接接入 |
| `docs/team/` | 团队技术（规范/分享/工具链） |

新增文档类别：建目录 + 在 `docs/.vitepress/config.ts` 的 `sidebar` 加一段。
