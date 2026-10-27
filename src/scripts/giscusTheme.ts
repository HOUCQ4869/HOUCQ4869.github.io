function syncGiscusTheme(): void {
  const iframe = document.querySelector<HTMLIFrameElement>(
    "iframe.giscus-frame",
  );
  if (!iframe?.contentWindow) return;

  const theme =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";

  iframe.contentWindow.postMessage(
    { giscus: { setConfig: { theme } } },
    "https://giscus.app",
  );
}

new MutationObserver(syncGiscusTheme).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"],
});

document.addEventListener("astro:after-swap", syncGiscusTheme);
