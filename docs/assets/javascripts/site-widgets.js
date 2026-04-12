const siteRoot =
  window.__md_scope && typeof window.__md_scope.href === "string"
    ? new URL(window.__md_scope.href)
    : new URL("/", window.location.origin);

const dataUrl = new URL("assets/data/site-data.json", siteRoot);

async function loadSiteData() {
  const response = await fetch(dataUrl);
  if (!response.ok) return null;
  return response.json();
}

function resolveUrl(path) {
  if (!path) return "#";
  if (/^https?:\/\//.test(path)) return path;
  return new URL(path.replace(/^\//, ""), siteRoot).toString();
}

function renderList(container, items) {
  if (!container || !items) return;
  container.innerHTML = items
    .map(
      (item) => `
        <a class="list-item" href="${resolveUrl(item.url)}">
          <span class="list-item__title">${item.title || item.name}</span>
          <span class="list-item__meta">${item.date || item.desc || ""}</span>
        </a>
      `
    )
    .join("");
}

function renderStats(container, stats) {
  if (!container || !stats) return;
  container.innerHTML = stats
    .map(
      (item) => `
        <div class="stat-card">
          <div class="stat-card__value">${item.value}</div>
          <div class="stat-card__label">${item.label}</div>
        </div>
      `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await loadSiteData();
  if (!data) return;

  renderList(document.querySelector("#recent-updates"), data.updates);
  renderList(document.querySelector("#friend-links"), data.friends);
  renderList(document.querySelector("#links-page"), data.friends);
  renderList(document.querySelector("#changelog-feed"), data.updates);
  renderStats(document.querySelector("#site-stats"), data.stats);
});
