# HOUCQ's Blog

个人博客源码仓库，托管于 [GitHub Pages](https://houcq4869.github.io)。

- 框架：[Astro](https://astro.build/)
- 主题：[Fuwari](https://github.com/saicaca/fuwari)（MIT License，见 [LICENSE](./LICENSE)）
- 部署：push 到 `main` 后由 GitHub Actions（`.github/workflows/deploy.yml`）自动构建并发布
- 搜索：Pagefind 本地全文搜索
- 评论：giscus（配置见 `src/config.ts`）
- 历史：本站由 Hexo 6 + hexo-theme-matery 迁移而来，旧版构建产物存档于 [`legacy-backup`](https://github.com/HOUCQ4869/HOUCQ4869.github.io/tree/legacy-backup) 分支，旧文章 URL 通过静态跳转页保持可用

## 本地开发

```bash
pnpm install
pnpm run dev      # 本地预览 http://localhost:4321
pnpm run build    # 构建（含 pagefind 索引）
pnpm run new-post -- <filename>   # 新建文章
```

## 目录说明

- `src/content/posts/` — 文章 Markdown
- `src/content/spec/about.md` — 关于页内容
- `src/config.ts` — 站点信息、导航、个人资料、giscus 等配置
- `public/` — 静态资源（文章图片、封面图、旧 URL 跳转页）
- `public/2023/01/16/gui-chen/` — 密码保护的加密页面（密文，明文不在本仓库）
