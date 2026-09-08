import type {
	ExpressiveCodeConfig,
	GiscusConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "HOUCQ",
	subtitle: "Welcome to HOUCQ's Blog",
	lang: "zh_CN",
	themeColor: {
		hue: 250,
		fixed: false,
	},
	banner: {
		enable: true,
		src: "assets/images/banner.jpg",
		position: "center",
		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},
	toc: {
		enable: true,
		depth: 2,
	},
	favicon: [
		{
			src: "/favicon/favicon.png",
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "归尘",
			url: "/2023/01/16/gui-chen/",
			external: true,
		},
		{
			name: "GitHub",
			url: "https://github.com/HOUCQ4869",
			external: true,
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.jpg",
	name: "HOUCQ",
	bio: "USTC 在读中……",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/HOUCQ4869",
		},
		{
			name: "Email",
			icon: "fa6-solid:envelope",
			url: "mailto:houchaoqun@mail.ustc.edu.cn",
		},
		{
			name: "知乎",
			icon: "fa6-brands:zhihu",
			url: "https://www.zhihu.com/people/houcq-30",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: false,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const giscusConfig: GiscusConfig = {
	enable: false, // TODO: 在仓库开启 Discussions 并安装 giscus App 后，填入 repoId/categoryId 并改为 true
	repo: "HOUCQ4869/HOUCQ4869.github.io",
	repoId: "", // 从 https://giscus.app 获取（repository node_id）
	category: "Announcements",
	categoryId: "", // 从 https://giscus.app 获取
	mapping: "pathname",
	lang: "zh-CN",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};
