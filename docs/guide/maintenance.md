# 站点维护说明

这份文档说明如何在本机维护「BanLson 知识库」：新增文章、插入图片、调整导航，以及后续发布到 GitHub Pages。

::: tip 当前状态
本页描述的是本地开发与后续发布步骤。站点文件已在本地完成开发和构建检查，但**尚未提交、尚未推送、尚未开启线上部署**，因此目前还没有正式上线的网站。
:::

## 技术栈与版本

| 项目 | 说明 |
| --- | --- |
| 站点框架 | VitePress **1.6.4**（稳定版） |
| 运行环境 | Node.js 18 及以上；本次开发使用 Node.js 24.13.0 |
| 包管理器 | npm（仓库包含 `package-lock.json`） |
| 搜索 | VitePress 本地搜索（Local Search），无第三方服务 |
| 部署 | GitHub Pages + GitHub Actions |
| 目标地址 | <https://banlson.github.io/> |
| 基础路径 | `/` |

依赖只有 `vitepress`，安装方式：

```bash
npm install
```

如果需要重新生成锁文件，使用 `npm install` 后提交更新后的 `package-lock.json`，不要手工修改它。

## 目录结构

```text
BanLson.github.io/
├─ docs/
│  ├─ .vitepress/
│  │  ├─ config.mts          # 站点配置：导航、侧栏、搜索、页脚
│  │  └─ theme/
│  │     ├─ index.ts         # 使用默认主题
│  │     └─ custom.css       # 颜色、字体和首页样式
│  ├─ public/                # 原样发布的静态资源
│  │  ├─ logo.svg            # 站点图标
│  │  └─ images/             # 全站共用图片
│  ├─ index.md               # 首页
│  ├─ notes/                 # 学习笔记
│  ├─ tools/                 # 工具使用
│  ├─ cases/                 # 实践案例
│  └─ guide/                 # 维护指南
├─ .github/workflows/deploy.yml  # GitHub Pages 自动部署
├─ package.json
└─ README.md
```

`node_modules/`、`docs/.vitepress/dist/` 和 `docs/.vitepress/cache/` 已被 `.gitignore` 忽略，不需要提交。

## 本地开发与预览

### 启动开发服务器

```bash
npm run docs:dev
```

默认地址是 `http://localhost:5173/`。修改 Markdown 或配置后，页面会自动刷新。如果端口被占用，终端会显示实际使用的端口。

### 生产构建

```bash
npm run docs:build
```

构建结果在 `docs/.vitepress/dist/`。构建日志中如果出现死链或渲染错误，应先修复再发布。

### 预览构建结果

```bash
npm run docs:preview
```

默认地址是 `http://localhost:4173/`。预览的是构建后的静态文件，和线上效果更接近。

## 新增文章

### 1. 选择分类并创建文件

文章放在对应分类目录下：

- 学习笔记：`docs/notes/`
- 工具使用：`docs/tools/`
- 实践案例：`docs/cases/`
- 维护说明：`docs/guide/`

文件名建议使用小写英文和短横线，例如 `git-branch-strategy.md`。文件名会出现在 URL 中，发布后尽量不要频繁改名，避免旧链接失效。

### 2. 添加 frontmatter

每篇文章开头用 `---` 包住元信息：

```md
---
title: 文章标题
description: 一句话说明这篇文章解决什么问题
---

# 文章标题

正文从这里开始。
```

`title` 会显示在侧栏和浏览器标题中；`description` 用于页面描述和分享信息。正文中仍需写一次一级标题。

### 3. 在侧栏中登记

打开 `docs/.vitepress/config.mts`，找到对应的 `sidebar` 配置，在 `items` 中增加一条：

```ts
{
  text: '文章标题',
  link: '/notes/your-article'
}
```

`link` 不带 `.md` 后缀，以 `/` 开头。保存后侧栏会自动更新。

### 4. 在分类页加入口

如果希望文章出现在分类首页的「文章列表」中，编辑对应分类的 `index.md`，添加链接：

```md
### [文章标题](./your-article)

一句话介绍这篇文章。
```

### 5. 检查搜索

本地搜索索引在构建时生成。开发服务器通常会随文件变化更新索引；如果搜索不到新文章，重新执行一次 `npm run docs:build` 再预览。

## 插入图片

### 文章专用图片（推荐）

在文章同级创建 `images/` 目录，例如：

```text
docs/notes/
├─ example-study-note.md
└─ images/
   └─ note-structure.svg
```

在 Markdown 中使用相对路径：

```md
![笔记结构示意](./images/note-structure.svg)
```

VitePress 会处理这些图片并带上正确的资源路径，移动文章时只要保持相对位置即可。

### 全站共用图片

放到 `docs/public/images/`，引用时使用以 `/` 开头的路径：

```md
![站点示意图](/images/shared-image.png)
```

`public` 中的文件会原样复制到构建结果根目录。注意：这种写法依赖 `base` 为 `/`；如果以后把站点部署到子路径，需要同步调整。

### 图片建议

- 使用有意义的英文文件名，避免空格和中文标点
- 为图片写清楚的 `alt` 文本，方便无障碍阅读
- 截图注意遮挡账号、邮箱、密钥等私密信息
- 大图先压缩，优先使用 SVG 或 WebP
- 深色模式下也要检查图片是否清晰
- 图片说明可以写在图片下方，用斜体或普通文字补充

## 调整导航

### 顶部导航

编辑 `config.mts` 中的 `themeConfig.nav`：

```ts
nav: [
  { text: '首页', link: '/' },
  { text: '学习笔记', link: '/notes/', activeMatch: '^/notes/' },
  { text: '工具使用', link: '/tools/', activeMatch: '^/tools/' },
  { text: '实践案例', link: '/cases/', activeMatch: '^/cases/' },
  { text: '维护指南', link: '/guide/maintenance', activeMatch: '^/guide/' }
]
```

- `text` 是显示文字，`link` 是目标路径。
- `activeMatch` 用于在进入某个分类后高亮对应导航项。
- 导航项不要过多，优先放最常用的分类。

### 左侧分类目录

`sidebar` 按路径前缀配置。例如新增一篇文章：

```ts
'/notes/': [
  {
    text: '学习笔记',
    items: [
      { text: '分类说明', link: '/notes/' },
      { text: '示例：用四步法整理主题笔记', link: '/notes/example-study-note' },
      { text: '新文章标题', link: '/notes/your-article' }
    ]
  }
]
```

`items` 中的顺序就是侧栏显示顺序。需要分组时，可以在数组中增加多个带 `text` 和 `items` 的对象。

### 本页目录

右侧「本页目录」默认抓取二级和三级标题：

```ts
outline: {
  level: [2, 3],
  label: '本页目录'
}
```

如果某篇文章不需要右侧目录，可以在该文章 frontmatter 中写：

```yaml
---
aside: false
---
```

### 社交链接与编辑入口

- `socialLinks` 中的 GitHub 地址指向 <https://github.com/BanLson/BanLson.github.io>。
- `editLink.pattern` 决定「在 GitHub 上编辑此页」跳转到哪里。默认分支改名后，需要同步修改 `main`。

## 修改站点信息

以下配置都在 `docs/.vitepress/config.mts`：

| 配置 | 当前值 | 说明 |
| --- | --- | --- |
| `title` | `BanLson 知识库` | 浏览器标题和站点名称 |
| `description` | 站点简介 | 搜索摘要和分享描述 |
| `base` | `/` | 部署在根路径 |
| `themeConfig.logo` | `/logo.svg` | 顶部标志和图标 |
| `themeConfig.footer` | 页脚文案 | 版权与说明文字 |

如果以后换成自定义域名，且站点仍部署在域名根路径，`base` 保持 `/`。如果部署到 `https://example.com/docs/` 这样的子路径，则需要把 `base` 改为 `/docs/`，并重新检查图片和链接。

## 发布更新

::: warning 本轮未执行
以下步骤是后续发布时使用的流程。本轮只完成本地开发、构建检查和预览，**没有执行提交、推送或线上部署**。
:::

### 1. 发布前本地检查

```bash
git status
npm run docs:build
npm run docs:preview
```

确认：

- 构建没有报错
- 预览页面可以正常打开
- 导航、侧栏、图片、搜索都正常
- `git status` 中没有密码、密钥、客户资料等敏感文件

### 2. 提交并推送

```bash
git add .
git commit -m "更新知识库内容"
git push origin main
```

提交信息建议说明改动范围，例如「新增：Git 分支策略笔记」。

### 3. 开启 GitHub Pages（首次发布）

在 GitHub 仓库页面进入：

```text
Settings → Pages → Build and deployment → Source
```

选择 **GitHub Actions**。仓库中的 `.github/workflows/deploy.yml` 会在推送到 `main` 后自动执行：

1. 检出代码
2. 安装 Node.js 和依赖
3. 执行 `npm run docs:build`
4. 上传构建产物
5. 部署到 GitHub Pages

首次部署完成后，在 Actions 页面可以看到部署地址。目标地址是：

```text
https://banlson.github.io/
```

### 4. 后续更新

之后每次向 `main` 推送提交，都会自动重新构建和部署。也可以在 Actions 页面手动触发 `workflow_dispatch`。

如果部署失败，先看 Actions 日志中的构建步骤；常见原因是依赖锁文件不一致、Node.js 版本不兼容或文章中有无法解析的链接。

## 发布前检查清单

- ☐ `npm run docs:build` 通过
- ☐ `npm run docs:preview` 页面正常
- ☐ 新增文章已加入侧栏和分类页
- ☐ 图片路径正确，且不包含隐私信息
- ☐ 顶部导航没有死链
- ☐ 搜索可以找到新增文章
- ☐ 手机宽度下排版正常
- ☐ 浅色和深色模式都检查过
- ☐ `git status` 中没有敏感文件
- ☐ 已确认 GitHub Pages 的 Source 为 GitHub Actions

## 常见问题

### 搜索不到新内容

先重新构建。索引在构建阶段生成，开发服务器和构建结果的索引可能不同步。

### 页面出现 404

检查：

- `link` 是否以 `/` 开头
- 链接路径是否和文件名一致
- 是否误写了 `.md` 后缀（站内链接通常不需要）
- 分类目录是否存在 `index.md`

### 图片不显示

- 相对图片：确认图片与文章的相对位置正确
- `public` 图片：确认路径以 `/images/` 开头
- 文件名大小写在 Linux 构建环境中是否一致

### 端口被占用

开发服务器会自动尝试下一个端口，以终端输出为准。也可以显式指定：

```bash
npm run docs:dev -- --port 5174
```

### 构建失败但开发模式正常

开发模式对链接和资源的检查更宽松。以 `npm run docs:build` 的输出为准，逐条修复报错信息中的文件和行号。

## 安全与隐私

- 不要在 Markdown、配置或图片中写入账号、密码、Token、数据库地址等私密信息。
- 截图前先遮挡个人信息。
- 不要把 `.env`、密钥文件或本地日志提交到仓库。
- 发布前用 `git diff --cached` 检查即将提交的内容。
- 如果误提交了密钥，应立即在对应平台撤销或轮换，而不只是删除文件。

## 版本记录

| 日期 | 变更 |
| --- | --- |
| 2026-11-06 | 初始化 VitePress 1.6.4 站点，加入三个示例分类、本地搜索、深浅色模式和 GitHub Pages 部署配置 |
