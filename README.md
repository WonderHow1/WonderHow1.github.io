# 王昊的个人作品集

采用像素风复古桌面，免费部署到 GitHub Pages。

## 预览

运行 `node scripts/build.mjs` 生成网站，然后运行 `python3 -m http.server 4173 --bind 127.0.0.1`，打开 `http://127.0.0.1:4173/site/`。

## 发布

将项目放入公开仓库 `WonderHow1.github.io`，在仓库 Settings → Pages 中将 Source 选择为 GitHub Actions。推送到 main 后，Publish portfolio 工作流会生成并发布 site 目录。

## 日常更新

1. 打开 [Pages CMS](https://app.pagescms.org/)，使用 GitHub 登录。
2. 安装 Pages CMS GitHub App，只选择作品集仓库 `WonderHow1.github.io`。
3. 打开「网站设置」修改署名和 GitHub 链接，或在「作品管理」添加、编辑、排序和删除作品。上传封面可替换项目图片，在「介绍视频」上传 MP4 可让作品卡片直接播放，封面会作为视频播放前的画面。
4. 保存后内容写回仓库，GitHub Actions 随后发布更新。可在仓库 Actions 查看是否成功。

项目详情可在「项目经历」中分别维护主要工作和项目成果，两部分支持分条填写，已有的普通详情也可继续使用。

每项作品使用唯一的小写英文 id，例如 `my-new-project`。项目详情可通过 `#project-my-new-project` 分享。关闭「发布到网站」可从网站中移除该作品。「私有仓库」用于隐藏仓库链接，项目中填写的介绍和封面仍会展示。避免把未准备公开的内容写入作品集。

后台首次登录和仓库授权由账号所有者完成。配置已依据 [Pages CMS 官方文档](https://pagescms.org/docs/configuration/content/)编写。

## 内容文件

`content/site.json` 保存网站设置，`content/projects.json` 保存作品和排序，`site/media/` 保存上传图片。`src/` 保存网页模板、样式和交互。网站构建使用 Node.js 内置功能，无需安装 npm 依赖。
