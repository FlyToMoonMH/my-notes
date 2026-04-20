---
comment: true
---

# Pokemon Cards CSS 效果

这是一个用纯 CSS 实现的宝可梦卡片全息效果演示。

鼠标悬停在卡片上，移动鼠标，可以看到 3D 倾斜和彩虹光泽。

<style>
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.pokemon-card {
  perspective: 1200px;
  cursor: pointer;
}

.pokemon-card__frame {
  position: relative;
  aspect-ratio: 734 / 1024;
  border-radius: 4.55% / 3.5%;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
  box-shadow:
    0 20px 40px rgba(0,0,0,0.3),
    0 6px 12px rgba(0,0,0,0.2);
}

.pokemon-card__frame:hover {
  box-shadow:
    0 30px 60px rgba(0,0,0,0.4),
    0 10px 24px rgba(0,0,0,0.25);
}

.pokemon-card__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  user-select: none;
  -webkit-user-drag: none;
}

/* 全息光泽层 */
.pokemon-card__shine {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  mix-blend-mode: color-dodge;
  background:
    radial-gradient(
      farthest-corner circle at var(--pointer-x, 50%) var(--pointer-y, 50%),
      rgba(255,255,255,0.9) 0%,
      rgba(255,255,255,0.5) 12%,
      transparent 30%
    ),
    conic-gradient(
      from calc(var(--pointer-angle, 0deg) + 45deg) at var(--pointer-x, 50%) var(--pointer-y, 50%),
      hsl(0, 100%, 70%),
      hsl(60, 100%, 65%),
      hsl(120, 100%, 65%),
      hsl(180, 100%, 70%),
      hsl(240, 100%, 70%),
      hsl(300, 100%, 70%),
      hsl(360, 100%, 70%)
    );
  filter: brightness(1.3) contrast(1.2);
}

.pokemon-card__frame:hover .pokemon-card__shine {
  opacity: 1;
}

/* 白色眩光层 */
.pokemon-card__glare {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(
    115deg,
    transparent 25%,
    rgba(255,255,255,0.5) 48%,
    transparent 52%
  );
  background-size: 250% 250%;
  background-position: var(--glare-pos, 0% 0%);
  mix-blend-mode: overlay;
}

.pokemon-card__frame:hover .pokemon-card__glare {
  opacity: 1;
}

/* 边缘发光 */
.pokemon-card__frame::after {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: conic-gradient(
    from var(--pointer-angle, 0deg),
    hsl(0,100%,70%), hsl(60,100%,65%), hsl(120,100%,65%),
    hsl(180,100%,70%), hsl(240,100%,70%), hsl(300,100%,70%), hsl(360,100%,70%)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.pokemon-card__frame:hover::after {
  opacity: 0.7;
}

/* 卡片名称 */
.pokemon-card__name {
  text-align: center;
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--md-typeset-color);
  opacity: 0.8;
}
</style>

<div class="pokemon-grid">

<div class="pokemon-card">
  <div class="pokemon-card__frame">
    <img class="pokemon-card__image" src="https://images.pokemontcg.io/base1/58.png" alt="皮卡丘" loading="lazy">
    <div class="pokemon-card__shine"></div>
    <div class="pokemon-card__glare"></div>
  </div>
  <div class="pokemon-card__name">皮卡丘</div>
</div>

<div class="pokemon-card">
  <div class="pokemon-card__frame">
    <img class="pokemon-card__image" src="https://images.pokemontcg.io/base1/4.png" alt="喷火龙" loading="lazy">
    <div class="pokemon-card__shine"></div>
    <div class="pokemon-card__glare"></div>
  </div>
  <div class="pokemon-card__name">喷火龙</div>
</div>

<div class="pokemon-card">
  <div class="pokemon-card__frame">
    <img class="pokemon-card__image" src="https://images.pokemontcg.io/base1/10.png" alt="超梦" loading="lazy">
    <div class="pokemon-card__shine"></div>
    <div class="pokemon-card__glare"></div>
  </div>
  <div class="pokemon-card__name">超梦</div>
</div>

<div class="pokemon-card">
  <div class="pokemon-card__frame">
    <img class="pokemon-card__image" src="https://images.pokemontcg.io/base1/2.png" alt="水箭龟" loading="lazy">
    <div class="pokemon-card__shine"></div>
    <div class="pokemon-card__glare"></div>
  </div>
  <div class="pokemon-card__name">水箭龟</div>
</div>

</div>

<script>
(function() {
  document.querySelectorAll('.pokemon-card').forEach(card => {
    const frame = card.querySelector('.pokemon-card__frame');
    const shine = card.querySelector('.pokemon-card__shine');
    const glare = card.querySelector('.pokemon-card__glare');

    function reset() {
      frame.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
      frame.style.setProperty('--pointer-x', '50%');
      frame.style.setProperty('--pointer-y', '50%');
      frame.style.setProperty('--pointer-angle', '0deg');
      frame.style.setProperty('--glare-pos', '0% 0%');
    }

    card.addEventListener('mousemove', (e) => {
      const rect = frame.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      // 3D 倾斜
      const rx = (0.5 - py) * 28;
      const ry = (px - 0.5) * 32;
      frame.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(16px)`;

      // 光泽位置
      const xPct = (px * 100).toFixed(1) + '%';
      const yPct = (py * 100).toFixed(1) + '%';
      frame.style.setProperty('--pointer-x', xPct);
      frame.style.setProperty('--pointer-y', yPct);

      // 彩虹旋转角度
      const angle = (px * 360).toFixed(0) + 'deg';
      frame.style.setProperty('--pointer-angle', angle);

      // 眩光位置
      const gx = ((1 - px) * 100).toFixed(0);
      const gy = ((1 - py) * 100).toFixed(0);
      frame.style.setProperty('--glare-pos', `${gx}% ${gy}%`);
    });

    card.addEventListener('mouseleave', reset);
  });
})();
</script>

---

## 原理：只用 CSS 为什么能做出这种效果？

pokemon-cards-css 这个项目没有任何 WebGL、Canvas 或复杂图形库。它的秘密是**多层叠加 + 混合模式**。

### 1. 3D 倾斜（Perspective + Rotate）

```css
.pokemon-card {
  perspective: 1200px;          /* 透视深度 */
  transform-style: preserve-3d; /* 子元素保持 3D */
}

.pokemon-card__frame {
  transform: rotateX(var(--rx)) rotateY(var(--ry)) translateZ(16px);
}
```

- `perspective` 决定"眼睛离卡片多远"，值越大越扁平，越小越夸张
- `rotateX` 控制上下倾斜，`rotateY` 控制左右倾斜
- `translateZ` 让卡片朝你"浮起来"
- JS 根据鼠标位置实时计算 `--rx` 和 `--ry`

### 2. 彩虹光泽（Conic Gradient + Color Dodge）

```css
.pokemon-card__shine {
  mix-blend-mode: color-dodge;  /* 关键！让颜色像光一样叠加 */
  background:
    radial-gradient(...),       /* 中心白光 */
    conic-gradient(...);         /* 环形彩虹 */
}
```

这是整个效果最核心的部分：

- **`conic-gradient`**：从中心向外发散的锥形渐变，一圈彩虹色
- **`radial-gradient`**：叠加一个白色光斑，模拟光源中心
- **`mix-blend-mode: color-dodge`**：混合模式，让亮部更亮，暗部透出底层图片
- **`filter: brightness(1.3) contrast(1.2)`**：进一步提升对比度，让光泽更"闪"

### 3. 白色眩光（Overlay Glare）

```css
.pokemon-card__glare {
  mix-blend-mode: overlay;
  background: linear-gradient(115deg, transparent 25%, white 48%, transparent 52%);
}
```

一条倾斜的白色渐变带，随着鼠标移动划过卡片表面，模拟塑料卡片的反光。

### 4. 边缘发光（Conic Border）

```css
.pokemon-card__frame::after {
  background: conic-gradient(from var(--angle), ...);
  -webkit-mask: ...;  /* 只保留边框 */
}
```

用 `conic-gradient` 做彩虹边框，再用 mask 裁成只有边缘显示。鼠标移动时 `--angle` 旋转，边框颜色跟着变。

---

## 如果你想做自己的卡片

### 需要准备什么

| 素材 | 说明 |
|------|------|
| **卡片正面图** | 一张 734×1024 左右的 PNG，最好是圆角卡片形状 |
| **（可选）纹理遮罩** | 如果想做出"只有图片某些区域反光"的效果，需要一张黑白遮罩图 |
| **（可选）全息底纹** | 星空/网格/ glitter 纹理图，用于更复杂的效果 |

### 最简单的制作流程

1. **找一张你喜欢的卡片图**（游戏王、炉石、自己的设计都可以）
2. **把上面的 CSS 复制过去**
3. **换掉 `src` 里的图片地址**
4. **调整 `aspect-ratio` 匹配你的图片比例**

### 图片资源从哪来

- **宝可梦官方**：`https://images.pokemontcg.io/{系列}/{编号}.png`
  - 系列代码：`base1`（初代）、`swsh1`（剑盾）等
  - 编号：卡片在系列里的序号
- **游戏王**：项目 YGOPro 或各种 wiki 有高清卡图
- **自己设计**：用 Figma / PS 做一张 734×1024 的卡片，导出 PNG

### 进阶玩法

| 效果 | 怎么实现 |
|------|---------|
| 只有特定区域反光 | 加一张 `mask` 图片，用 `mask-image` 控制光泽显示范围 |
| 星空/银河纹理 | 在 shine 层再叠加一张 `glitter.png`，`background-blend-mode: overlay` |
| 卡片背面 | 加 `transform: rotateY(180deg)` 的背面层，点击翻转 |
| 多张卡片扇形展开 | `nth-child` 给每张卡片不同的 `rotateZ` 和 `translateX` |

---

## 参考

- [pokemon-cards-css 原项目](https://github.com/simeydotme/pokemon-cards-css)
- [在线演示](https://poke-holo.simey.me/)
- [CSS-Tricks 原文章](https://css-tricks.com/)
