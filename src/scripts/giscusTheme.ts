function giscusThemeUrl(): string {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  return new URL(
    isDark ? "/giscus-dark.css" : "/giscus-light.css",
    window.location.origin,
  ).href;
}

function syncGiscusTheme(): void {
  const iframe = document.querySelector<HTMLIFrameElement>(
    "iframe.giscus-frame",
  );
  if (!iframe?.contentWindow) return;

  iframe.contentWindow.postMessage(
    { giscus: { setConfig: { theme: giscusThemeUrl() } } },
    "https://giscus.app",
  );
}

new MutationObserver(syncGiscusTheme).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"],
});

document.addEventListener("astro:after-swap", syncGiscusTheme);
