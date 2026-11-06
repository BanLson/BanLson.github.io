---
title: 'Pi（命令行 AI 编程 Agent）教程整理 · Windows 版'
description: 'Pi 在 Windows 上的安装、模型配置、会话管理、插件与 Skills 整理，内容依据视频语音转写，第三方数据未独立核实。'
---

# Pi（命令行 AI 编程 Agent）教程整理 · Windows 版

> 来源：抖音视频 `https://www.douyin.com/video/7674590359871065370`（约 44 分 38 秒）
> 说明：本文只保留 **Windows** 上可照做的路径、命令和快捷键；Mac 版见《Pi agent 教程整理-Mac 版》。
> 依据：视频语音转写。视频作者全程在 Windows 上演示，Windows 部分对应度最高；文中第三方测试数字均为作者引用，未独立核实。

---

## 0. 背景：为什么强调"极简"

视频开篇给出的对比（作者说法）：

- Pi 里说一句"你好"，上传 token 约 1100，占上下文 0.4%。
- Codex 里打个招呼约 18000 token，等于什么都没干就吃掉 7% 上下文窗口。
- Composio 上月测试：Pi 完成编程任务比其他 code agent 快 1.5–2 倍，成本也更低。
- Databricks（口播为 "data breaks"）在百万行代码仓库测试：横轴任务成本、纵轴代码质量，Pi 在多数场景优于 Claude Code 和 Codex，质量最高点是 **Pi + Claude Opus 4.8**。

设计取向：核心只有 4 个工具、系统提示词约 1000 token，其余能力靠插件和 Skill 组装。

---

## 1. 安装（Windows）

1. 桌面右键 → **在终端中打开**（Windows 11），进入 Windows PowerShell 控制台。作者用一台全新 Windows 电脑测试，装 Pi **不需要任何准备工作**。
2. 打开 Pi 官网，复制 **PowerShell 一键安装命令**，粘贴到控制台，回车。
3. Pi 检测到本机没有 Node.js → 输入 `y`，回车，先装 Node.js。
4. 下一步仍然输入 `y`，回车，安装 Pi 的依赖。
5. Pi 使用 **Git Bash** 作为命令行运行环境。若本机没装 Git，会提示选择，建议输入 `w`，让 Pi 先把 Git 装好。
6. 安装结束 → **关闭当前命令行窗口**，右键重新打开一个终端，输入 `pi` 启动。
7. 能正常显示对话窗口，即安装完成。

> 常见卡点：装完不关窗口直接 `pi` 可能找不到命令，重开终端即可。

---

## 2. 配置模型

启动 `pi` 后输入 `/login`。两条路：**API Key** 或 **模型订阅**。

### 2.1 API Key（在 Pi 内操作，与系统无关）
1. `/login` → 选 API Key → 支持 40 多家供应商。
2. 示例 DeepSeek：输入关键词筛选 → 回车。
3. 浏览器打开 DeepSeek 官网 → **API 开放平台** → 确认有额度 → **API keys** → 创建 key（名字随意）→ 复制。
4. 回到 Pi 粘贴 key，回车，打个招呼验证有回复即成功。

### 2.2 订阅登录
1. `/login` → 选 `Sign in with account`。
2. 示例：`OpenAI Codex` → 选第一项，走浏览器登录。
3. 浏览器里登录 OpenAI 账号，完成后回到 Pi。
4. 按 `Ctrl + L`，模型列表里出现 ChatGPT 模型。

### 2.3 切换与思考强度（Windows 快捷键）
- `/model` 切换模型；默认 DeepSeek V4 Pro，可切 V4 Flash。
- `Shift + Tab` 切换思考强度。
- `Ctrl + L` 快速打开模型选择器。

---

## 3. 第一个项目

1. 新建项目文件夹，进入后右键**在终端中打开**，输入 `pi` 启动。
2. 窗口会显示当前文件夹，后续代码就写进这个目录。
3. 示例：用 React 做宠物洗护店网页。
4. 多行提示词两种写法：
   - `Shift + Enter` 换行（直接回车是发送）；
   - `Ctrl + G` 打开记事本编辑，保存关闭后内容自动同步回 Pi。
5. 回车执行。作者体感：同样用 GPT 模型，Pi 写代码比 Codex 快约一倍。

---

## 4. 读懂底部状态栏

| 字段 | 含义 |
| --- | --- |
| `↑` 输入 token | 当前 session 累计输入 |
| `↓` 输出 token | 累计输出（作者示例约 1.1 万） |
| `R` cache rate | 整个 session 的缓存命中比例 |
| `CH` cache hit rate | **最近一次**请求的缓存命中率 |
| 预估成本 | 走订阅时前缀显示 `sub`，金额仅供参考 |
| 百分比 | 上下文占用率 / 模型总窗口（口播称 GPT 系列 272k） |
| `auto` | 上下文自动压缩策略 |
| 末尾 | 供应商 + 模型名 + 思考强度 |

Session = 一段连续对话的全部工作记录；`/new` 新开即清空上下文。

---

## 5. 启动开发服务器

- 代码完成后 Pi 会提示 `npm run dev`。
- 在 Pi 窗口输 **`!`**（英文叹号）再接命令 → 临时执行，**过程和结果 AI 能看到**。
- 输 **`!!`** 再接命令 → 执行但 **AI 看不到**。

---

## 6. 查看并修改 AI 做的网页

- 打开链接预览；截图用 `Win + Shift + S`，然后在 Pi 里 `Ctrl + V` 粘贴 → 说明问题（示例："浮动卡片数量太少了"）→ Pi 读图后修改。
- 输入 `@` 选择文件/目录（示例：`src` 下某个 js 文件），要求"不要把代码都放一个文件里，拆分成模块"。

---

## 7. Steering（打方向盘）与 Follow up（排队）

### 7.1 Steering
AI 正在跑时，直接在对话框输入新指令并回车，消息前会标 `steering`，AI 立即改变方向。
示例：AI 想用 Express 做后端，用户中途要求"用 Next.js，数据库用 SQLite"，Pi 立刻转去装 Next.js 依赖。

### 7.2 Follow up
不影响当前这一轮，排队等 AI 把手头工作做完才读取执行。

**Windows 必须先解决快捷键冲突**：
1. 右键 PowerShell 标题栏 → 设置（属性）→ 操作。
2. 找到 `Alt + Enter`（全屏化）这一组快捷键。
3. **删除**，点右下角保存（它和 Pi 默认的 follow up 快捷键冲突）。
4. 回到 Pi，输入指令后按 `Alt + Enter`，消息前显示 `follow up`，即进入排队。
5. 排队中按 `Alt + ↑` 把指令取回重编辑，改完再 `Alt + Enter` 送回队列。

### 7.3 原理：双层循环
- **内层循环**：调模型 → 按模型指令调工具 → 工具结果回给模型 → 判断是否完成，未完成进入下一轮；**进入下一轮时把 steering 消息注入上下文**，所以能实时响应。
- **外层循环**：follow up 消息在外层，等内层全部结束才读取；发现有 follow up 就再开外层循环继续。

### 7.4 非交互模式
`pi -p "指令"`：后台静默执行，中间过程不可见，完成后输出结果。
示例：查今天天气并在桌面写 `weather.txt`。适合把 Pi 当一次性 CLI 命令用。

---

## 8. Session 管理与对话树

### 8.1 基本
- 连续三轮对话（加苹果、加香蕉、加橘子）= 一个 session；`/new` 开新 session（加茄子、芹菜、白菜）。
- 关闭窗口后：`pi -c` 继续最近一次；`pi -r` 从列表挑一个恢复。

### 8.2 `/tree` 对话树
- 每个 session 是树状而非线性；`/tree` 进入对话树。
- 选中历史节点回车、再回车，即回退到该状态，可在此创建**分支**（示例：一条线继续加蔬菜，另一条线加海鲜）。
- **限制**：只回退**对话历史**，不回退**代码**。代码回退配合 Git：
  1. `/tree` 选中"新增茄子"那次对话，回车回退对话；
  2. 复制对应 commit id；
  3. Pi 里执行 `!git reset --hard <commit id>`；
  4. 打开代码确认只剩茄子。

### 8.3 回退时的三个选项
- **不总结**：彻底丢弃后续历史。
- **总结**：让 AI 对被丢弃的分支做总结，回退后仍保留大致印象。
- **告诉 AI 怎么总结**：自定义要求。
- 注意：总结只覆盖**当前分支**，不会总结其他分支；`Ctrl + O` 展开查看总结。

### 8.4 三个会话命令
| 命令 | 作用 |
| --- | --- |
| `/clone` | 把当前 session 整棵复制成新 session |
| `/fork` | 从某个对话节点复制出新 session（只带该节点之前的历史） |
| `/compact` | 手动压缩上下文（示例占用从 18.1% 降到约 10%） |

### 8.5 一条经验
**"清空好于压缩"**：任务做完直接 `/new`，历史越少 AI 越专注、越省 token。

---

## 9. 核心工具与设计哲学

- 默认只有 **4 个工具**：读文件、写文件、改文件、运行命令（bash）。
- bash 就是万能工具：可调 `find` 搜文件、`grep` 检索代码、`ls` 看目录。
- 除 4 个核心工具外，只支持 **Agent Skills**。
- 原生没有：MCP、subagent、plan mode、todo、btw。
- 哲学：核心越小越干净，模型发挥更好，组装权交给用户——"让工具适应你的工作流，而不是你适应工具"。

---

## 10. 插件扩展（Windows 安装方式）

入口：Pi 官网 → `package` 插件列表，复制一键命令到 **Windows 控制台（PowerShell）** 执行；卸载把命令里的 `install` 改成 `uninstall`。

**全局 vs 项目级**：默认装到全局目录（所有项目生效）；命令后加空格 + `-l` 只装到当前项目 `.pi` 目录。项目级首次启动会问是否**信任当前目录**，选信任。

| 插件 | 能力 | Windows 注意点 |
| --- | --- | --- |
| `pi-web-access` | 联网搜索、提取网页 | 零配置，接 Exa MCP，无需 API Key；装完直接问"青岛天气"验证 |
| `pi-sub-agents` | 并行子代理 | `/pi-sub-agents` 让 5 个 worker 并行做 5 种风格网页并审查修复；可 `-l` 项目级 |
| `pi-mcp-adapter` | 补上 MCP 能力 | 自动读项目下 `.mcp.json`；示例配高德地图 MCP，替换官网申请的 key |
| `btw` 类 | 旁路对话 | `/btw` 开子窗口提问不打断主任务，`Ctrl + C` 退出子对话 |
| `pi-plan-mode` | 计划模式 | `/planmode` 开启后只出计划（写入 `plan.md`），对齐后关闭再执行 |
| `pi-go` | 目标驱动多轮迭代 | `/go` 给大目标（示例 HTML 坦克大战，`iterations` 看迭代） |
| `pi-dynamic-workflows` | 动态工作流 | 关键字 `workflows` 触发，可并行几十上百个子代理；`/workflows` 看后台 |
| `pi-wechat-assistant` | 微信连接 | `/wechatlogin` 手机扫码配对，`/wechatstart` 启动 |

> 每装一个插件都会加系统提示词；用不到就 `-l` 只装当前项目，别给模型加负担。

---

## 11. Agent Skills（Windows 路径）

### 11.1 项目级：playwright-cli（浏览器自动化）
1. 用命令本地安装 `playwright-cli`。
2. 从源码仓库下载 zip。
3. 项目目录新建 `.agents` 文件夹，把源码里的 `skills` 目录复制进去。
4. 确认结构：`.agents\skills\playwright-cli\SKILL.md`。
5. 启动 `pi`，`skills` 里出现该技能；下指令"打开谷歌搜索并进入 Pi agent 官网"，可看到它操作 Chrome 完成。

### 11.2 全局级
把 `skills` 文件夹放到：`C:\Users\<你的用户名>\.agents\skills\`，任意项目启动都能加载。

### 11.3 SkillHub 装技能
- 示例 `markdown-convert`：可下 zip 放目录，也可把技能页安装提示词直接粘给 Pi。
- 本例提示缺 `uvx`，让 Pi 装好后，成功把 PDF 档案转成 Markdown。

### 11.4 第三方 Web UI
- 社区 star 最高（口播约 4200，作者"第四种黑猩猩"）的网页 UI：按 GitHub Quick Start 的 `npx` 命令执行 → 自动打开网页界面。
- 左上角切项目/自定义本地路径；左下文件浏览器；左下配模型（示例 Kimi：provider `moonshot-ai`，填 Kimi 后台的 API Key）。
- 左下管理技能和插件，均分 `project` / `global`，可开关（关掉不进提示词，省 token）；可搜索添加技能（示例 `edge-tts` 免费文本转语音）。
- 中间面板支持 `/` 命令、`@` 选文件、`Ctrl + V` 粘截图、调思考强度；任务后显示 token 与花费。

---

## 12. 跨 Session 记忆（Windows 路径）

### 12.1 项目级 `AGENTS.md`
- 项目根目录新建 `AGENTS.md`（视频口播/转写记为 "agent.json.md"，通用文件名实为 `AGENTS.md`，Codex 等工具同样通用）。
- 这是 AI 每次对话必读的指南。示例写入称呼、擅长语言、"对前端一窍不通，网页问题用大白话解释"。
- 验证：新开 `pi` 问"我叫什么、擅长什么"，能答出。
- 也可让 Pi 通读项目源码和配置，自己把项目知识写进 `AGENTS.md`；复杂项目必备。

### 12.2 全局提示词
- 全局 `AGENTS.md`：`C:\Users\<你的用户名>\.pi\agent\AGENTS.md`，对所有项目生效。
- 作者加的安全条款示例：**禁止批量删除文件或目录，只能按明确路径单个删除；需要批量删除时停止并请用户手动处理。**
- 更强的方式：同目录新建 `APPEND_SYSTEM.md`（口播/转写为 "append_system.json.md"），内容直接追加进系统提示词，优先级更高；一般用 `AGENTS.md` 足够。

---

## 13. 安全机制（Windows 场景）

- 唯一基础机制：在含插件或 Skill 的陌生目录启动时，询问是否**信任该目录**。
- 一旦运行：**无安全限制**，始终最高权限，编辑文件、执行命令自动进行、不询问；**无沙箱**（开发者有意为之）。
- Windows 上两种加固方案：
  1. **官方推荐：容器/虚拟机**。如 **WSL**（Windows 上的 Linux 虚拟机）、**Hyper-V**、**Docker**。环境搞坏只需删掉重建，不影响宿主机；因轻量、启动快、内存占用低，也适合 Docker/K8s 批量部署。
  2. **权限插件**：装 `pi-permission-system`，敏感操作弹审批框（类似 Claude Code 权限系统）。作者嫌拖慢效率没装。

---

## 14. 自己写插件

Pi 内置插件开发知识，可以**让 Pi 给自己写插件**。项目级放 `.pi\extensions\`（TypeScript 文件），改完 `/reload` 生效；要全局生效就把 `extensions` 文件夹复制到 `~\.pi\agent\`。

三个示例（作者称用 GPT-5.6 一次跑通）：

1. **定制 UI**：按 IP 查坐标 → 按坐标查当地天气 → 显示在对话窗口上方。
2. **保护文件**：禁止 AI 编辑/读取受保护的 `.env`，尝试操作直接拦截。
3. **危险命令拦截**：AI 执行 `rm` 前弹窗询问；选 `no` 文件保留，选 `yes` 才删除。

---

## 15. 源码架构与 SDK

GitHub 仓库 `packages` 下四个核心包：

| 包 | 职责 |
| --- | --- |
| `agent`（pi-ai） | 模型调用层：几十家厂商统一成一套调用规范 |
| `agent-loop` | 双层循环机制 |
| `coding-agent` | 4 个基础工具、系统提示词、Skills 与插件机制 |
| `tui` | 命令行界面全部功能 |

- 已封装 SDK：
  - `pi-ai`：`npm install` 后引用 `createModel`，可接入任意模型对话。
  - `pi-coding-agent`：`npm install` 后创建 session，直接给 agent 任务。

---

## 附 A：Windows 命令速查

| 命令 | 作用 |
| --- | --- |
| `pi` | 启动 |
| `pi -c` | 继续最近一次 session |
| `pi -r` | 选择 session 恢复 |
| `pi -p "指令"` | 非交互一次性执行 |
| `/login` | 配置模型 |
| `/model` | 切换模型 |
| `/new` | 新建 session（清空上下文） |
| `/tree` | 对话树，回退/分支 |
| `/clone` | 复制整个 session |
| `/fork` | 从某节点复制新 session |
| `/compact` | 手动压缩上下文 |
| `/reload` | 重新加载插件 |
| `/btw` | 旁路对话（需插件） |
| `/planmode` | 计划模式开关（需插件） |
| `/go` | 目标驱动迭代（需插件） |
| `/wechatlogin`、`/wechatstart` | 微信配对/启动（需插件） |
| `!命令` | 临时执行，AI 可见 |
| `!!命令` | 临时执行，AI 不可见 |

## 附 B：Windows 快捷键

| 快捷键 | 作用 | 备注 |
| --- | --- | --- |
| `Shift + Enter` | 提示词换行 | 直接回车是发送 |
| `Ctrl + G` | 打开记事本编辑提示词 | 保存关闭后自动回填 |
| `Ctrl + L` | 模型选择器 | |
| `Shift + Tab` | 切换思考强度 | |
| `Ctrl + V` | 粘贴截图 | 截图用 `Win + Shift + S` |
| `Alt + Enter` | Follow up 排队 | **需先删除 PowerShell 的 Alt+Enter 全屏快捷键** |
| `Alt + ↑` | 取回排队中的指令 | |
| `Ctrl + O` | 展开回退时的总结 | |
| `Ctrl + C`（两下） | 退出 Pi | |

---

## 附 C：Windows 路径一览

| 用途 | 路径 |
| --- | --- |
| Pi 全局配置目录 | `C:\Users\<你的用户名>\.pi\` |
| 全局 `AGENTS.md` / `APPEND_SYSTEM.md` | `C:\Users\<你的用户名>\.pi\agent\` |
| 全局插件（自研） | `C:\Users\<你的用户名>\.pi\agent\extensions\` |
| 全局 Skills | `C:\Users\<你的用户名>\.agents\skills\` |
| 项目插件 | `<项目>\.pi\extensions\` |
| 项目 Skills | `<项目>\.agents\skills\` |

---

## 附 D：三条实践建议

1. 复杂项目必写 `AGENTS.md`，或让 Pi 通读后自己生成。
2. 一轮任务做完就 `/new`，比 `/compact` 更干净。
3. 优先在 WSL / Hyper-V / Docker 里跑，因为它运行后无沙箱、命令自动执行。
