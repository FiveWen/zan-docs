# 工程规范

<!-- TODO: 按团队实际情况补充，公开站注意脱敏 -->

## 代码规范

- ESLint + Prettier 统一校验，配置随脚手架分发
- 提交前 husky + lint-staged 强制检查

## Git 分支约定

| 分支 | 用途 |
|---|---|
| `master` / `develop` | 受保护分支，禁止直接开发 |
| `feature/*` | 功能开发 |
| `fixbug/*` | 缺陷修复 |

- 新分支从 `origin/master` 拉出，使用 `--no-track`，禁止跟踪保护分支
- 合入走 MR，禁止本地直接 merge 到保护分支

## 提交信息

Conventional Commits 格式：

```
feat: 新增拼团活动页
fix: 修复购物车数量越界
```

## Code Review

- MR 描述需包含：改动点、自测情况、影响范围
- 至少 1 人 approve 后合入
