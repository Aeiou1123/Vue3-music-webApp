# vue3-music-webapp

## 项目介绍

一个使用vue3全家桶实现的音乐app。



### 技术栈

[vue: ^3.0.11 ](https://img.shields.io/badge/vue-^3.0.11-green) 

 [vue-router: ^4.0.0-0 ](https://img.shields.io/badge/vue--router-^4.0.0--0-yellow)        

[vuex: ^4.0.0-0 ](https://img.shields.io/badge/vuex-^4.0.0--0-yellow)        

 [axios: ^0.21.1 ](https://img.shields.io/badge/axios-^0.21.1-yellow)

[vue3-lazy: ^1.0.0-alpha.1 ](https://img.shields.io/badge/vue3--lazy-^1.0.0--alpha.1-yellow)

[lyric-parser: ^1.0.1 ](https://img.shields.io/badge/lyric--parser-^1.0.1-yellow)

[core-js: ^3.6.5 ](https://img.shields.io/badge/core--js-^3.6.5-yellow)

轮播图使用了BetterScroll插件。地址：https://better-scroll.github.io/docs/zh-CN/guide/     图片懒加载使用了vue3-lazy插件。地址：https://github.com/ustbhuangyi/vue3-lazy


### 实现功能

- 推荐列表
- 歌手列表
- 榜单列表
- 搜索功能
- 收藏功能
- 历史播放列表
- 最近播放列表
- 歌词 / CD 切换
- 添加歌曲功能
- 歌曲切换
- 控制播放时长
- ..........



## 目录结构

```
vue3-music-webapp
├── README.md
├── babel.config.js
├── backend
│   ├── prod.server.js
│   ├── router.js
│   └── sign.js
├── jsconfig.json
├── package-lock.json
├── package.json
├── project.txt
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets   // 基础样式及逻辑
│   │   ├── fonts
│   │   │   ├── music-icon.eot
│   │   │   ├── music-icon.svg
│   │   │   ├── music-icon.ttf
│   │   │   └── music-icon.woff
│   │   ├── images
│   │   │   └── default.png
│   │   ├── js
│   │   │   ├── array-store.js
│   │   │   ├── constant.js
│   │   │   ├── create-detail-component.js
│   │   │   ├── create-loading-like-directive.js
│   │   │   ├── dom.js
│   │   │   └── util.js
│   │   └── scss
│   │       ├── base.scss
│   │       ├── icon.scss
│   │       ├── index.scss
│   │       ├── mixin.scss
│   │       ├── reset.scss
│   │       └── variable.scss
│   ├── components    // base目录下是基础组件，其他目录下是业务组件。
│   │   ├── add-song  // 添加歌曲到列表组件
│   │   │   └── add-song.vue
│   │   ├── base  
│   │   │   ├── confirm  // 确认组件
│   │   │   │   └── confirm.vue
│   │   │   ├── index-list
│   │   │   │   ├── index-list.vue
│   │   │   │   ├── use-fixed.js
│   │   │   │   └── use-shortcut.js
│   │   │   ├── loading // 加载组件
│   │   │   │   ├── directive.js
│   │   │   │   ├── loading.gif
│   │   │   │   └── loading.vue
│   │   │   ├── message    // 消息弹窗组件
│   │   │   │   └── message.vue
│   │   │   ├── no-result  // 无结果组件
│   │   │   │   ├── directive.js
│   │   │   │   ├── no-result.vue
│   │   │   │   ├── no-result@2x.png
│   │   │   │   └── no-result@3x.png
│   │   │   ├── scroll    // 滚动组件
│   │   │   │   ├── scroll.vue
│   │   │   │   └── use-scroll.js
│   │   │   ├── search-list // 搜索列表组件
│   │   │   │   └── search-list.vue
│   │   │   ├── slider    // 滑块组件
│   │   │   │   ├── slider.vue
│   │   │   │   └── use-slider.js
│   │   │   ├── song-list // 歌曲列表组件
│   │   │   │   ├── first@2x.png
│   │   │   │   ├── first@3x.png
│   │   │   │   ├── second@2x.png
│   │   │   │   ├── second@3x.png
│   │   │   │   ├── song-list.vue
│   │   │   │   ├── third@2x.png
│   │   │   │   └── third@3x.png
│   │   │   └── switches // 选择组件
│   │   │       └── switches.vue
│   │   ├── header  // 头部组件
│   │   │   ├── header.vue
│   │   │   ├── logo@2x.png
│   │   │   └── logo@3x.png
│   │   ├── music-list  // 歌曲列表组件
│   │   │   └── music-list.vue
│   │   ├── player  // 播放器组件
│   │   │   ├── mini-player.vue
│   │   │   ├── player.vue
│   │   │   ├── playlist.vue
│   │   │   ├── progress-bar.vue
│   │   │   ├── progress-circle.vue
│   │   │   ├── use-animation.js
│   │   │   ├── use-cd.js
│   │   │   ├── use-favorite.js
│   │   │   ├── use-lyric.js
│   │   │   ├── use-middle-interactive.js
│   │   │   ├── use-mini-slider.js
│   │   │   ├── use-mode.js
│   │   │   └── use-play-history.js
│   │   ├── search  // 搜索组件
│   │   │   ├── search-input.vue
│   │   │   ├── suggest.vue
│   │   │   └── use-search-history.js
│   │   ├── tab  // 标签组件
│   │   │   └── tab.vue
│   │   └── wrap-scroll  // 高级滚动组件
│   │       └── index.js
│   ├── main.js
│   ├── router
│   │   └── index.js
│   ├── service  // 主业务逻辑
│   │   ├── base.js
│   │   ├── recommend.js
│   │   ├── search.js
│   │   ├── singer.js
│   │   ├── song.js
│   │   └── top-list.js
│   ├── store
│   │   ├── actions.js
│   │   ├── getters.js
│   │   ├── index.js
│   │   ├── mutations.js
│   │   └── state.js
│   └── views
│       ├── album.vue
│       ├── recommend.vue
│       ├── search.vue
│       ├── singer-detail.vue
│       ├── singer.vue
│       ├── top-detail.vue
│       ├── top-list.vue
│       └── user-center.vue
└── vue.config.js
```



## 效果展示

- 推荐页面：[recommend.png](https://gitee.com/Aeiou-YuShang/img/raw/master/recommend.png)
- 歌手页面：[singer.png](https://gitee.com/Aeiou-YuShang/img/raw/master/singer.png)
- 排行页面：[toplist.png](https://gitee.com/Aeiou-YuShang/img/raw/master/toplist.png)
- 搜索页面：[search.png](https://gitee.com/Aeiou-YuShang/img/raw/master/search.png)
- 歌手详情页面：[singerdetail.png](https://gitee.com/Aeiou-YuShang/img/raw/master/singerdetail.png)
- 用户中心页面：[usercenter.png](https://gitee.com/Aeiou-YuShang/img/raw/master/usercenter.png)



## 项目运行

```
1、下载项目
git clone https://gitee.com/Aeiou-YuShang/vue3-music-webapp.git  or  git clone https://github.com/Aeiou1123/vue3-music-webapp.git
2、安装依赖
npm install
3、项目运行
npm run serve
4、打包
npm run build
```



## 联系作者

如果本项目对你有帮助，或者你想提出对本项目的修改意见可以联系作者哦~

QQ邮箱：1946937742@qq.com          
