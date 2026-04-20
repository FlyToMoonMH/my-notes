---
description: 把模板改成你自己站点的第一步
tags:
  - setup
  - mkdocs
---

# 第一步：改成你自己的站

这一步只改最关键的地方。

## 1. 改站点名字

打开 `mkdocs.yml`，修改这些值：

- `site_name`
- `site_url`
- `repo_name`
- `repo_url`

## 2. 改首页

打开 `docs/index.md`，换成你自己的介绍。

## 3. 改关于页

打开 `docs/about.md`，写上你的简介。

## 4. 改首页卡片

打开 `docs/assets/data/site-data.json`，你会看到 3 组数据：

- `stats`：站点统计卡片
- `updates`：最近更新
- `friends`：友链或推荐链接

这一步改完，网站就已经很像“你自己的站”了。
