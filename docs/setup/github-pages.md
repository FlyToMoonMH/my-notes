# 发布到 GitHub Pages

这是最适合新手的发布方式。

## 你需要做什么

1. 在 GitHub 新建仓库
2. 用 GitHub Desktop 把这个项目发布上去
3. 在仓库里启用 GitHub Pages

## Pages 设置

打开 GitHub 仓库后：

1. 进入 `Settings`
2. 点击 `Pages`
3. 在 `Build and deployment` 里选择 `GitHub Actions`

本模板已经带了自动部署文件：

- `.github/workflows/deploy.yml`

以后每次你把改动 `push` 到 `main` 分支，GitHub 都会自动构建并更新网站。

## 网站地址长什么样

通常会是：

`https://你的用户名.github.io/你的仓库名/`

所以你还需要把 `mkdocs.yml` 里的 `site_url` 改成你自己的真实地址。
