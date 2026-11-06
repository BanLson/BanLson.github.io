# BanLson.github.io

Ban的个人知识库，记录学习笔记、工具使用与实践经验。

站点名称：**BanLson 知识库** · 目标地址：<https://banlson.github.io/>

## 技术栈

- [VitePress](https://vitepress.dev/) **1.6.4**（稳定版）
- Node.js 18+（本地开发使用 24.13.0，GitHub Actions 使用 22）
- VitePress 本地全文搜索
- GitHub Pages + GitHub Actions 部署

## 本地开发

```bash
npm install
npm run docs:dev      # http://localhost:5173/
npm run docs:build    # 构建到 docs/.vitepress/dist
npm run docs:preview  # 预览构建结果，默认 http://localhost:4173/
```

## 内容结构

```text
docs/
├─ .vitepress/config.mts   # 导航、侧栏、搜索、页脚
├─ .vitepress/theme/       # 外观定制
├─ public/                 # 静态资源
├─ notes/                  # 学习笔记
├─ tools/                  # 工具使用
├─ cases/                  # 实践案例
└─ guide/maintenance.md    # 中文维护说明
```

新增文章、插入图片、调整导航和发布步骤，见[站点维护说明](https://banlson.github.io/guide/maintenance.html)（本地预览路径为 `/guide/maintenance.html`）。

## 当前状态

- 已完成本地开发与构建检查。
- 尚未提交、尚未推送 GitHub，尚未开启线上部署。
- `main` 分支推送后，`.github/workflows/deploy.yml` 会在 GitHub Pages 的 Source 设置为 **GitHub Actions** 后自动构建部署。
- 三个分类中的示例文章均已明确标注为示例，不代表个人经历。

## 说明

`node_modules/`、`docs/.vitepress/dist/` 和 `docs/.vitepress/cache/` 由 `.gitignore` 忽略，不需要提交。
