---
title: 示例：在 VitePress 中启用本地全文搜索
description: VitePress 本地搜索的配置方式、中文分词思路与构建后的验证方法。
---

# 示例：在 VitePress 中启用本地全文搜索

<div class="example-notice">
  <strong>示例文章</strong>
  <span>本文用于展示工具类文章的写作与排版方式，内容为通用配置说明，不代表 BanLson 的个人经历。</span>
</div>

VitePress 内置了本地搜索（Local Search），不需要接入第三方搜索服务，也不需要 API Key。构建时它会扫描 Markdown 页面并生成索引，浏览器端再按需加载索引完成搜索。

本站使用的版本是 **VitePress 1.6.4**，搜索方案如下。

## 本地搜索的工作方式

大致流程可以分成三步：

1. 构建阶段读取每个 Markdown 页面，按标题和小节切分。
2. 使用 MiniSearch 为标题、小节标题和正文建立倒排索引。
3. 浏览器打开搜索框时，加载对应语言的索引并执行查询。

因此，本地搜索的索引会随站点一起发布，适合个人知识库和中小型文档站。

## 基础配置

在 `.vitepress/config.mts` 中指定 `provider: 'local'`：

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        detailedView: true
      }
    }
  }
})
```

只写这些，搜索已经可以工作。`detailedView` 控制是否显示更详细的匹配结果列表，可以设为 `true`、`false` 或 `'auto'`。

## 为中文配置分词

MiniSearch 默认按空白和标点切分。中文句子通常没有空格，如果不做处理，一整段中文可能被当成一个词，导致搜索命中率很低。

可以给 MiniSearch 传入自定义 `tokenize` 函数。下面是一个基于 `Intl.Segmenter` 的实现：

```ts
function tokenize(text: string): string[] {
  const normalized = String(text).toLowerCase()

  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' })
    const tokens: string[] = []
    for (const part of segmenter.segment(normalized)) {
      if (part.isWordLike) tokens.push(part.segment)
    }
    return tokens
  }

  return normalized.split(/[^\p{L}\p{N}]+/u).filter(Boolean)
}
```

然后把它放进 `miniSearch.options`：

```ts
search: {
  provider: 'local',
  options: {
    detailedView: true,
    miniSearch: {
      options: {
        tokenize
      },
      searchOptions: {
        fuzzy: 0.15,
        prefix: true,
        boost: {
          title: 4,
          text: 2,
          titles: 1
        }
      }
    }
  }
}
```

几个参数的作用：

| 参数 | 作用 |
| --- | --- |
| `tokenize` | 自定义分词，构建索引和查询时都会使用 |
| `fuzzy` | 允许少量拼写差异，过高会带来误匹配 |
| `prefix` | 支持前缀匹配，输入部分词语时也能命中 |
| `boost` | 提高标题、正文等字段的权重 |

::: warning 函数不能引用外部变量
VitePress 会把搜索配置序列化到浏览器端。`tokenize` 需要是自包含函数，不要在函数里引用模块中定义的其他变量，否则浏览器端可能拿不到这些变量。
:::

## 旧浏览器怎么办

`Intl.Segmenter` 在现代浏览器中已经可用，但不是所有旧版本都支持。上面的实现做了降级：不支持时按字母、数字和标点切分，搜索仍能工作，只是中文分词效果会弱一些。

如果需要覆盖更老的浏览器，可以引入专门的中文分词库，或者把中文按单字和二元组切分。代价是索引体积会增加，需要根据内容规模权衡。

## 构建后如何验证

配置完成后，建议按下面的顺序检查：

1. 执行 `npm run docs:build`，确认没有构建错误。
2. 执行 `npm run docs:preview`，打开预览地址。
3. 点击顶部搜索框，分别搜索一个英文词、一个中文词和文章标题。
4. 打开浏览器控制台，确认没有索引加载或脚本错误。
5. 检查搜索结果是否能跳转到正确的小节。

如果中文搜索没有结果，先确认是否重新执行了构建。索引是在构建阶段生成的，只改配置不重新构建，预览页面仍然使用旧索引。

## 常见问题

### 搜索结果太少

可能是分词粒度过粗，或者查询词与正文用词不一致。可以尝试：

- 用更短的词查询
- 检查标题和小节标题是否包含关键词
- 适当提高 `prefix` 或降低 `fuzzy`

### 搜索结果太多、排序不理想

可以调整 `boost`，让标题权重更高；也可以降低 `fuzzy`，减少模糊匹配带来的噪声。

### 索引文件会不会很大

索引按语言和内容规模切分，VitePress 会按需加载。文章数量较多时，建议：

- 避免在正文中堆砌与主题无关的关键词
- 保持标题简洁明确
- 定期删除过时页面

### 能不能搜索代码块

本地搜索主要面向页面文本。代码块中的标识符是否命中，取决于最终索引内容，不建议把搜索当作代码检索工具。需要检索代码时，使用编辑器或代码托管平台更合适。

## 适用范围与限制

本地搜索的优点是零外部依赖、无需付费、部署简单，适合个人知识库。它也有边界：

- 不支持搜索行为分析
- 不支持同义词、拼写纠错等高级能力
- 内容量非常大时，索引体积和构建时间会增加
- 搜索质量依赖标题、正文结构和分词配置

对个人笔记来说，这些限制通常不是问题。真正影响体验的，往往不是搜索算法，而是文章标题是否清楚、分类是否合理。

## 相关阅读

- [工具使用分类说明](./index.md)
- [示例：文档型知识库搭建流程](../cases/example-knowledge-base.md)
- [站点维护说明](../guide/maintenance.md)
