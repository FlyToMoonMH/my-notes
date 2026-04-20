# FlyToMoonMH 的笔记本

个人知识站，基于 [MkDocs](https://www.mkdocs.org/) + [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) 构建。

风格参考 [TonyCrane 的笔记站](https://note.tonycrane.cc/)。

## 在线地址

<https://FlyToMoonMH.github.io/my-notes/>

## 本地预览

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

## 主要目录

- `docs/` — 笔记与页面内容
- `docs/css/` — 自定义样式
- `overrides/` — 主题模板覆盖
- `hooks/` — 构建钩子

## 技术栈

- MkDocs + Material for MkDocs
- 中文排版：heti、霞鹜文楷
- 代码字体：JetBrains Mono
- 部署：GitHub Pages（GitHub Actions 自动构建）
