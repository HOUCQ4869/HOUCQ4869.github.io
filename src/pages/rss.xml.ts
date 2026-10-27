import rss from "@astrojs/rss";
import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import { getCollection } from "astro:content";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import config from "@/config";

export async function GET() {
  const posts = await getCollection("posts");
  const sortedPosts = getSortedPosts(posts);
  const renderer = await createMarkdownProcessor();

  const items = await Promise.all(
    sortedPosts.map(async ({ body, data, id, filePath }) => {
      const { code } = await renderer.render(body ?? "");
      return {
        link: getPostUrl(id, filePath, config.site.lang),
        title: data.title,
        description: data.description,
        content: code,
        pubDate: new Date(data.modDatetime ?? data.pubDatetime),
        categories: data.tags,
      };
    }),
  );

  return rss({
    title: config.site.title,
    description: config.site.description,
    site: config.site.url,
    trailingSlash: false,
    items,
  });
}
