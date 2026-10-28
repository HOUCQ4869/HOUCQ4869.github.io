function initTocHighlight(): void {
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>("article h2[id], article h3[id]"),
  );
  if (headings.length === 0) return;

  const tocLinks = new Map<string, HTMLElement>();
  for (const link of document.querySelectorAll<HTMLElement>(
    "aside nav a[href^='#']",
  )) {
    const id = (link as HTMLAnchorElement).getAttribute("href")?.slice(1);
    if (id) tocLinks.set(id, link);
  }
  if (tocLinks.size === 0) return;

  let activeId: string | null = null;

  const setActive = (id: string): void => {
    if (id === activeId) return;
    activeId = id;
    for (const [linkId, link] of tocLinks) {
      link.classList.toggle("toc-active", linkId === id);
    }
  };

  const thresholdPx = 180;

  const update = (): void => {
    const line = window.scrollY + thresholdPx;
    let current = headings[0];
    for (const heading of headings) {
      if (heading.offsetTop <= line) current = heading;
      else break;
    }
    setActive(current.id);
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

initTocHighlight();

document.addEventListener("astro:after-swap", initTocHighlight);
