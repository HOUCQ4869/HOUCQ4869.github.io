# HOUCQ's Blog

个人博客源码仓库，托管于 [GitHub Pages](https://houcq4869.github.io)。

- 框架：[Astro](https://astro.build/) 7
- 主题：[AstroPaper](https://github.com/satnaing/astro-paper)（MIT License）
- 样式：Tailwind CSS 4
- 部署：push 到 `main` 后由 GitHub Actions（`.github/workflows/deploy.yml`）自动构建并发布
- 搜索：Pagefind 本地全文搜索
- 数学公式：KaTeX（`remark-math` + `rehype-katex`）
- 历史：本站由 Hexo 6 + hexo-theme-matery 迁移而来，后从 Fuwari 迁移至 AstroPaper；旧文章 URL 通过 `public/` 下的静态跳转页保持可用

## 本地开发

要求 Node.js ≥ 22.12。

```bash
pnpm install
pnpm run dev       # 本地预览 http://localhost:4321
pnpm run build     # 构建（含 astro check + pagefind 索引）
pnpm run preview   # 预览生产构建
```

## 目录说明

- `src/content/posts/` — 文章 Markdown
- `src/content/pages/about.md` — 关于页内容
- `astro-paper.config.ts` — 站点信息、导航、个人资料等配置
- `src/i18n/` — 界面文案（默认 `zh-CN`）
- `public/` — 静态资源（文章图片、封面图、favicon、旧 URL 跳转页）

## 写文章

在 `src/content/posts/` 下新建 `.md` 文件，frontmatter 字段如下：

```yaml
---
title: 文章标题
author: HOUCQ               # 可省略，默认取站点 author
pubDatetime: 2024-01-01T12:00:00+08:00
modDatetime: 2024-01-02T12:00:00+08:00  # 可省略，更新日期
description: 文章摘要（必填）
ogImage: /images/covers/xxx.webp   # 可省略，社交分享图
tags: [标签1, 标签2]
draft: false
featured: false            # 可省略，置顶展示
---
```

更多配置见 [AstroPaper 文档](https://github.com/satnaing/astro-paper#readme)。