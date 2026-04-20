const siteRoot =
  window.__md_scope && typeof window.__md_scope.href === "string"
    ? new URL(window.__md_scope.href)
    : new URL("./", window.location.href);

const cards = [
  { label: "打开 Guides", url: "setup/", darkImage: "assets/cards/guides.dark.svg", lightImage: "assets/cards/guides.light.svg" },
  { label: "打开 Tools", url: "tools/", darkImage: "assets/cards/tools.dark.svg", lightImage: "assets/cards/tools.light.svg" },
  { label: "打开 Camera", url: "camera/", darkImage: "assets/cards/camera.dark.svg", lightImage: "assets/cards/camera.light.svg" },
  { label: "打开 Writing", url: "writing/", darkImage: "assets/cards/writing.dark.svg", lightImage: "assets/cards/writing.light.svg" },
  { label: "查看 Updates", url: "changelog/", darkImage: "assets/cards/updates.dark.svg", lightImage: "assets/cards/updates.light.svg" },
];

function resolveUrl(path) {
  if (!path) return "#";
  return new URL(path.replace(/^\//, ""), siteRoot).toString();
}

function randomIndex(except = -1) {
  if (cards.length <= 1) return 0;
  let index = Math.floor(Math.random() * cards.length);
  while (index === except) index = Math.floor(Math.random() * cards.length);
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
        </div>
      </a>
      <div class="showcase-card__controls">
        <button class="showcase-card__next" type="button">换个入口</button>
      </div>
    </div>
  `;

  const link = app.querySelector(".showcase-card");
  const frame = app.querySelector(".showcase-card__frame");
  const lightImage = app.querySelector(".showcase-card__image--light");
  const darkImage = app.querySelector(".showcase-card__image--dark");
  const nextButton = app.querySelector(".showcase-card__next");

  let currentIndex = randomIndex();
  let isHovering = false;

  // Spring 物理动画状态
  const state = {
    rx: 0, ry: 0, lift: 0,
    mx: 50, my: 50, angle: 0,
    glareX: 0, glareY: 0,
    shine: 0, border: 0
  };
  const target = {
    rx: 0, ry: 0, lift: 0,
    mx: 50, my: 50, angle: 0,
    glareX: 0, glareY: 0,
    shine: 0, border: 0
  };

  function animate() {
    const speed = 0.1;     // 跟随速度（越小惯性越强）
    for (const key in state) {
      state[key] += (target[key] - state[key]) * speed;
    }

    frame.style.setProperty("--card-rx", `${state.rx.toFixed(2)}deg`);
    frame.style.setProperty("--card-ry", `${state.ry.toFixed(2)}deg`);
    frame.style.setProperty("--card-lift", `${state.lift.toFixed(2)}px`);
    frame.style.setProperty("--card-mx", `${state.mx.toFixed(1)}%`);
    frame.style.setProperty("--card-my", `${state.my.toFixed(1)}%`);
    frame.style.setProperty("--card-angle", `${state.angle.toFixed(0)}deg`);
    frame.style.setProperty("--glare-pos", `${state.glareX.toFixed(0)}% ${state.glareY.toFixed(0)}%`);
    frame.style.setProperty("--card-shine", state.shine.toFixed(3));
    frame.style.setProperty("--card-border", state.border.toFixed(3));

    requestAnimationFrame(animate);
  }
  animate();

  function render(index) {
    const card = cards[index];
    currentIndex = index;
    link.href = resolveUrl(card.url);
    link.setAttribute("aria-label", card.label);
    link.title = card.label;
    lightImage.src = resolveUrl(card.lightImage);
    darkImage.src = resolveUrl(card.darkImage);
  }

  function resetTarget() {
    target.rx = 0;
    target.ry = 0;
    target.lift = 0;
    target.mx = 50;
    target.my = 50;
    target.angle = 0;
    target.glareX = 0;
    target.glareY = 0;
    target.shine = 0;
    target.border = 0;
    isHovering = false;
  }

  link.addEventListener("pointerenter", () => {
    isHovering = true;
    target.shine = 0.85;
    target.border = 0.6;
  });

  link.addEventListener("pointermove", (event) => {
    if (!isHovering) return;
    const rect = frame.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    // 3D 倾斜
    target.rx = (0.5 - py) * 28;
    target.ry = (px - 0.5) * 32;
    target.lift = 14;

    // 光泽位置
    target.mx = px * 100;
    target.my = py * 100;

    // 彩虹旋转
    target.angle = px * 360;

    // 眩光位置（反向移动）
    target.glareX = (1 - px) * 100;
    target.glareY = (1 - py) * 100;
  });

  link.addEventListener("pointerleave", resetTarget);
  nextButton.addEventListener("click", () => render(randomIndex(currentIndex)));

  render(currentIndex);
  resetTarget();
}

document.addEventListener("DOMContentLoaded", mountHomeCard);
