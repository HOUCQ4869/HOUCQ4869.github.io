import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://houcq4869.github.io",
    title: "HOUCQ",
    description:
      "HOUCQ 的个人博客，记录数据结构、操作系统等课程学习笔记与生活随笔。",
    author: "HOUCQ",
    profile: "https://github.com/HOUCQ4869",
    ogImage: "default-og.jpg",
    lang: "zh-CN",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 8,
    perIndex: 8,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/HOUCQ4869/HOUCQ4869.github.io/edit/main/",
    },
    search: "pagefind",
    // giscus 评论（repoId/categoryId 由 GitHub GraphQL API 查询获得）
    comments: {
      enabled: true,
      repo: "HOUCQ4869/HOUCQ4869.github.io",
      repoId: "R_kgDOIwV9Ag",
      category: "Announcements",
      categoryId: "DIC_kwDOIwV9As4DFGx8",
    },
    // Cloudflare Web Analytics（token 来自 Cloudflare 控制台）
    analytics: {
      enabled: true,
      token: "b4b92090681548118d4e30b95022de56",
    },
  },
  socials: [
    { name: "github", url: "https://github.com/HOUCQ4869" },
    { name: "mail", url: "mailto:houchaoqun@mail.ustc.edu.cn" },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
