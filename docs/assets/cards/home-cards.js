const siteRoot =
  window.__md_scope && typeof window.__md_scope.href === "string"
    ? new URL(window.__md_scope.href)
    : new URL("./", window.location.href);

const cards = [
  {
    eyebrow: "FlyToMoonMH",
    title: "笔记目录",
    desc: "从这里进入我的文档型笔记分区。",
    url: "notes/",
    darkImage: "assets/cards/system.png",
    lightImage: "assets/cards/system.light.png",
  },
  {
    eyebrow: "Notes / Shell",
    title: "Shell 备忘",
    desc: "一些关于终端和命令行的零散记录。",
    url: "notes/Shell/",
    darkImage: "assets/cards/tools.png",
    lightImage: "assets/cards/tools.light.png",
  },
  {
    eyebrow: "Notes / Camera",
    title: "认识相机",
    desc: "用最直观的方式整理焦距、画幅和镜头基础。",
    url: "notes/认识相机/",
    darkImage: "assets/cards/unicode.png",
    lightImage: "assets/cards/unicode.light.png",
  },
  {
    eyebrow: "Theme / Setup",
    title: "搭站指南",
    desc: "把这套文档站继续改成你自己的工作台。",
    url: "setup/first-steps/",
    darkImage: "assets/cards/riscv.png",
    lightImage: "assets/cards/riscv.light.png",
  },
  {
    eyebrow: "Git / Changelog",
    title: "最近更新",
    desc: "自动根据 Git 提交生成的更新记录时间轴。",
    url: "changelog/",
    darkImage: "assets/cards/writeups.png",
    lightImage: "assets/cards/writeups.light.png",
  },
  {
    eyebrow: "Links / Friends",
    title: "朋友链接",
    desc: "一些我常用、也常看的工具与站点。",
    url: "links/",
    darkImage: "assets/cards/regex.png",
    lightImage: "assets/cards/regex.light.png",
  },
];

function resolveUrl(path) {
  if (!path) return "#";
  return new URL(path.replace(/^\//, ""), siteRoot).toString();
}

function randomIndex(except = -1) {
  if (cards.length <= 1) return 0;
  let index = Math.floor(Math.random() * cards.length);
  while (index === except) {
    index = Math.floor(Math.random() * cards.length);
  }
  return index;
}

function mountHomeCard() {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <div class="showcase">
      <a class="showcase-card" href="#">
        <div class="showcase-card__frame">
          <img class="showcase-card__image showcase-card__image--light" alt="" />
          <img class="showcase-card__image showcase-card__image--dark" alt="" />
          <div class="showcase-card__shine"></div>
          <div class="showcase-card__glare"></div>
          <div class="showcase-card__overlay">
            <span class="showcase-card__eyebrow"></span>
            <span class="showcase-card__title"></span>
            <span class="showcase-card__desc"></span>
          </div>
        </div>
      </a>
      <div class="showcase-card__controls">
        <button class="showcase-card__next" type="button">换一张</button>
      </div>
    </div>
  `;

  const link = app.querySelector(".showcase-card");
  const frame = app.querySelector(".showcase-card__frame");
  const glare = app.querySelector(".showcase-card__glare");
  const lightImage = app.querySelector(".showcase-card__image--light");
  const darkImage = app.querySelector(".showcase-card__image--dark");
  const eyebrow = app.querySelector(".showcase-card__eyebrow");
  const title = app.querySelector(".showcase-card__title");
  const desc = app.querySelector(".showcase-card__desc");
  const nextButton = app.querySelector(".showcase-card__next");

  let currentIndex = randomIndex();

  function render(index) {
    const card = cards[index];
    currentIndex = index;
    link.href = resolveUrl(card.url);
    lightImage.src = resolveUrl(card.lightImage);
    darkImage.src = resolveUrl(card.darkImage);
    eyebrow.textContent = card.eyebrow;
    title.textContent = card.title;
    desc.textContent = card.desc;
  }

  function resetTilt() {
    frame.style.setProperty("--card-rx", "0deg");
    frame.style.setProperty("--card-ry", "0deg");
    frame.style.setProperty("--card-lift", "0px");
    frame.style.setProperty("--card-mx", "50%");
    frame.style.setProperty("--card-my", "50%");
    glare.style.setProperty("--card-glare", "-24%");
  }

  link.addEventListener("pointermove", (event) => {
    const rect = frame.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * 18;
    const ry = (px - 0.5) * 22;
    frame.style.setProperty("--card-rx", `${rx.toFixed(2)}deg`);
    frame.style.setProperty("--card-ry", `${ry.toFixed(2)}deg`);
    frame.style.setProperty("--card-lift", "-6px");
    frame.style.setProperty("--card-mx", `${(px * 100).toFixed(2)}%`);
    frame.style.setProperty("--card-my", `${(py * 100).toFixed(2)}%`);
    glare.style.setProperty("--card-glare", `${(px - 0.5) * 36}%`);
  });

  link.addEventListener("pointerleave", resetTilt);
  nextButton.addEventListener("click", () => render(randomIndex(currentIndex)));

  render(currentIndex);
  resetTilt();
}

document.addEventListener("DOMContentLoaded", mountHomeCard);
