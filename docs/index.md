---
template: home.html
home: true
title: 首页
hide:
  - date
  - footer
statistics: true
---

# o(〃'▽'〃)o Hi!

这里是 FlyToMoonMH 的个人笔记本。

这个站点主要用来整理课程学习、技术踩坑、工具记录和一些长期可复用的文档。

[:material-clock-time-two-outline: 最近更新](changelog.md) /
[:octicons-link-16: 朋友链接](links.md) /
[:material-book-open-page-variant-outline: 笔记目录](notes/index.md) /
[:material-account-outline: 关于](about.md) /
[:material-chart-line: 站点统计](javascript:toggle_statistics();)

<div id="statistics" class="card home-card" markdown="1" style="opacity: 0;">
<div class="card-body" markdown="1">
页面总数：{{ pages }}  
总字数：{{ words }}  
代码块行数：{{ codes }}  
图片数量：{{ images }}  
网站运行时间：<span id="web-time"></span>
</div>
</div>

<script>
function updateTime() {
  const now = Date.now();
  const start = new Date("2026/04/12 22:49:00").getTime();
  let diff = now - start;
  const y = Math.floor(diff / (365 * 24 * 3600 * 1000));
  diff -= y * 365 * 24 * 3600 * 1000;
  const d = Math.floor(diff / (24 * 3600 * 1000));
  const h = Math.floor((diff / (3600 * 1000)) % 24);
  const m = Math.floor((diff / (60 * 1000)) % 60);
  const label = y === 0
    ? `${d}<span class="heti-spacing"> </span>天<span class="heti-spacing"> </span>${h}<span class="heti-spacing"> </span>小时<span class="heti-spacing"> </span>${m}<span class="heti-spacing"> </span>分钟`
    : `${y}<span class="heti-spacing"> </span>年<span class="heti-spacing"> </span>${d}<span class="heti-spacing"> </span>天<span class="heti-spacing"> </span>${h}<span class="heti-spacing"> </span>小时<span class="heti-spacing"> </span>${m}<span class="heti-spacing"> </span>分钟`;
  document.getElementById("web-time").innerHTML = label;
  setTimeout(updateTime, 1000 * 60);
}

function toggle_statistics() {
  const statistics = document.getElementById("statistics");
  statistics.style.opacity = statistics.style.opacity === "1" ? "0" : "1";
}

updateTime();
</script>
