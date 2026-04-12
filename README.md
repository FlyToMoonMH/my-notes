# Tony Note Replica

一个适合新手的 `MkDocs + Material for MkDocs` 模板。

它参考了 TonyCrane 笔记站那种“技术文档 / 个人笔记站”的观感，但保留了更容易维护的结构：

- 你平时主要只需要改 `docs/` 里的 Markdown
- 你可以用 `GitHub Desktop` 提交和上传
- 推送到 GitHub 后，GitHub Pages 会自动发布
- 不需要你自己买服务器

## 先回答你的那个问题

我不能 100% 确认 TonyCrane 平时是不是用 `GitHub Desktop`。

但从他的公开仓库配置看，他大概率更偏向命令行工作流，因为仓库里写了类似下面的发布任务：

- `git add .`
- `git commit`
- `mkdocs gh-deploy`
- `git push`

所以你可以把他理解成“也是 GitHub 上托管的静态站”，只是他本人更像是在用命令行，而你完全可以用 `GitHub Desktop`。

## 你真正要做的事情

### 1. 改这几个地方

- [mkdocs.yml](/Users/mh/Documents/Playground/tony-note-replica/mkdocs.yml)
  把 `YOUR-NAME`、`YOUR-REPO`、站点名字改成你自己的
- [docs/index.md](/Users/mh/Documents/Playground/tony-note-replica/docs/index.md)
  改首页介绍
- [docs/about.md](/Users/mh/Documents/Playground/tony-note-replica/docs/about.md)
  改成你的个人介绍
- [docs/assets/data/site-data.json](/Users/mh/Documents/Playground/tony-note-replica/docs/assets/data/site-data.json)
  改首页右边那几个卡片内容

### 2. 把它传到 GitHub

推荐流程：

1. 在 GitHub 上新建一个仓库
2. 用 `GitHub Desktop` 打开这个项目
3. 提交一次
4. `Push` 到 GitHub

### 3. 打开 GitHub Pages

第一次需要去 GitHub 仓库设置里开一下 Pages：

1. 打开仓库的 `Settings`
2. 打开 `Pages`
3. 在 `Build and deployment` 里选择 `GitHub Actions`

之后每次你 `push`，GitHub 都会自动构建并发布。

## 本地预览

如果你想在自己电脑上先看效果，再上传：

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

然后打开终端里显示的本地网址。

## 你以后主要维护哪些文件

- `docs/`：你的文章和页面
- `mkdocs.yml`：导航、站点标题、仓库地址
- `docs/assets/stylesheets/custom.css`：字体、颜色、排版
- `docs/assets/data/site-data.json`：首页卡片数据

## 一个最简单的日常流程

1. 打开 Markdown 文件修改内容
2. 用 `GitHub Desktop` 提交
3. 点击 `Push origin`
4. 等 GitHub 自动发布完成

## 备注

这个模板是“参考风格”，不是复制原站源码。
