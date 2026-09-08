---
title: "个人博客搭建指南"
published: 2023-01-11 23:11:25
description: "This is my first blog, not just for test."
image: "/images/covers/test-post-1.webp"
tags: ["Web"]
category: "Web"
draft: false
---
Hello, everyone.

注明：本博客搭建借鉴于[xkz](https://xkz0777.github.io/2021/07/19/build-website/)以及[ysy](https://ysy-phoenix.github.io/2021/04052690.html)，还有最初的[godweiyang](https://godweiyang.com/2018/04/13/hexo-blog/)的博客搭建指南，参考注意有先后顺序，避免一些过时的问题。

## 引用图片  
**推荐使用图床上传**，便于加快访问速度  
### 本地资源导入
<img src="/images/posts/test-post/cover.webp" alt="相对路径图片" style="zoom:33%;" />

添加方式：  
在博客根目录下的_config.yml配置文件中，设置  
~~~
post_asset_folder: true
~~~
通过命令hexo new post xxx，在source文件夹中生成xxx.md以及同名资源文件夹，之后如下形式引用：  
~~~
<img src="cover.jpg" alt="相对路径图片" style="zoom:33%;" />
~~~

### 图床上传
![图床照片](/images/posts/test-post/pSKHRX9.webp)

添加方式：  
搜索图床，选择合适的即可，可参考[这里](https://imgse.com/)

## 添加友情链接  
在根目录sourse/_data/friends.json文件下设置，例如：  
~~~
[
  {
    "avatar": "https://ysy-phoenix.github.io/medias/avatar.jpg",
    "name": "ysy",
    "introduction": "ysy",
    "url": "https://ysy-phoenix.github.io/",
    "title": "ysy的博客"
  },
  {
    "avatar": "https://i.loli.net/2021/07/12/zWQo2VrLBstvDEU.jpg",
    "name": "lly",
    "introduction": "lly",
    "url": "http://home.ustc.edu.cn/~liuly0322/blog/",
    "title": "lly的博客"
  }
]
~~~

## 访问速度优化  
### 部署至Coding  
该部分参考于[这篇文章](https://zhuanlan.zhihu.com/p/466268978)  
->首先到[官网](https://coding.net/)上进行注册  
->创建项目(全功能DevOps项目)，项目名可以使github用户名    
->创建代码仓库，仓库名用username.github.io，注意是公开仓库  
->在仓库中将其地址复制至博客根目录下配置文件：
~~~
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
- type: git
  repository: 
    github: https://github.com/HOUCQ4869/HOUCQ4869.github.io
    coding: https://e.coding.net/houcq4869/houcq4869/houcq4869.github.io.git
  branch: main
~~~
->导入外部仓库，即将github仓库导入至coding中  
->修改分支，将默认分支改为main，注意可能要修改github默认分支为main，而不是master，可在\node_modules\hexo-deployer-git\lib\parse_config.js中查找master并改为main  
->hexo clean && hexo g && hexo d验证即可

网上许多方法都已过时，本篇作于2023年初，只具一定参考意义，可能并不会与时俱进，此外Coding Pages似乎也找不到，所以虽然实现了github，coding双线部署，但似乎并没有实现国内Coding，国外Github访问加速的目的，因此未完待续…… (感觉似乎快了些……)

### gulp4压缩静态文件
参考于[这篇博客](https://blog.csdn.net/qq_43625917/article/details/104136304?app_version=5.7.2&code=app_1562916241&csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22104136304%22%2C%22source%22%3A%22unlogin%22%7D&uLinkId=usr1mkqgl919blen&utm_source=app)，如有问题可进一步查询  
**1.安装gulp工具**  
~~~
npm install gulp -g/npm install gulp
~~~

**2.安装gulp插件**  
~~~
npm install gulp-minify-html gulp-minify-css gulp-uglify gulp-imagemin --save
~~~

**3.建立gulpfile.js文件**  
在博客根目录下新建文件gulpfile.js  
~~~
var gulp = require('gulp');

//Plugins模块获取
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
// 压缩 public 目录 css文件
gulp.task('minify-css', function () {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
});

// 压缩 public 目录 html文件
gulp.task('minify-html', function () {
    return gulp.src('./public/**/*.html')
        .pipe(minifyhtml())
        .pipe(gulp.dest('./public'))
});
// 压缩 public/js 目录 js文件，忽略/public/lib/blog-encrypt.js
gulp.task('minify-js', function () {
    //纠错前：return gulp.src('./public/**/*.js')
    return gulp.src(['./public/**/*.js', '!./public/lib/blog-encrypt.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./public'))
});
// 压缩图片
//gulp.task('minify-images', function() {
//    return gulp.src('./public/images/**/*.*')
//        .pipe(imagemin(
//        [imagemin.gifsicle({'optimizationLevel': 3}),
//        imagemin.jpegtran({'progressive': true}),
//        imagemin.optipng({'optimizationLevel': 7}),
//        imagemin.svgo()],
//        {'verbose': true}))
//        .pipe(gulp.dest('./public/images'))
//});
//因为我图片用的第三方图床存放的，所以就没压缩图片。(并且最后测试压缩图片时，发现有点权限问题，


// 分别执行css、heml、js的压缩任务
gulp.task('default', gulp.parallel('minify-css', 'minify-html', 'minify-js'));
~~~
注意上面的public目录是否为你的真实目录，**代表0或多个子目录  

**4.部署执行**  
~~~
hexo clean && hexo g && gulp && hexio d
~~~
如果出现提示未安装成功，再安装一次应该就可以  
除此之外，可以在package.json文件里添加  
~~~
"scripts:"{
    "hexo": "hexo clean && hexo g && gulp && hexo d"
},
~~~
这样就可以直接执行  
~~~
npm run hexo
~~~

### 使用jsDeliver+Github实现加速
本文主要参考于[这篇文章](https://zhuanlan.zhihu.com/p/346643522)  
大体思路为在github上新建仓库专门储存博客部分资源，通过jsDeliver引用资源  
**1.新建仓库，并将需要cdn加速的资源上传到该仓库**，如themes中的source文件夹
~~~
git init
git remote add 名字 连接地址
git remote -v //测试
git add .
git status //查看状态
git commit -m 'inital'
git push -u 名字 分支
~~~
对于git指令操作不熟悉的可参考[这篇文章](https://blog.csdn.net/qq_36667170/article/details/79085301)  

**2.点击右侧creat a new release发布版本**
自定义发布版，如新建tag1.0，下面title填写1.0  

**3.通过jsDeliver引用资源**  
~~~
https://cdn.jsdelivr.net/gh/你的用户名/你的仓库名@发布的版本号/文件路径
~~~
若不使用版本号，默认为最新版本  
可将hexo 中用到静态资源的地方换为cdn加速，如主题配置文件中：  
~~~
# The used front-end library can be replaced with the corresponding CDN address as needed,
# If the specific version is not specified below, you can use the latest version.
# 使用到的前端库，可按需替换成对应的CDN地址，如果下面未指定具体的版本号，使用最新的版本即可.
# 注：jsdelivr可以自动帮你生成.min版的js和css，所以你在设置js及css路径中可以直接写.min.xxx
libs:
  css:
    matery: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/css/matery.css
    mycss: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/css/my.css
    fontAwesome: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/awesome/css/all.css # V5.11.1
    materialize: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/materialize/materialize.min.css # 1.0.0
    aos: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/aos/aos.css
    animate: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/animate/animate.min.css # V3.5.1
    lightgallery: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/lightGallery/css/lightgallery.min.css # V1.6.11
    aplayer: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/aplayer/APlayer.min.css
    dplayer: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/dplayer/DPlayer.min.css
    gitalk: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/gitalk/gitalk.css
    jqcloud: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/jqcloud/jqcloud.css
    tocbot: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/tocbot/tocbot.css
    prism: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/prism/prism.css
  js:
    matery: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/js/matery.js
    jquery: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/jquery/jquery.min.js
    materialize: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/materialize/materialize.min.js # 1.0.0
    masonry: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/masonry/masonry.pkgd.min.js # v4.0.0
    aos: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/aos/aos.js
    scrollProgress: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/scrollprogress/scrollProgress.min.js
    lightgallery: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/lightGallery/js/lightgallery-all.min.js # V1.6.11
    clicklove: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/others/clicklove.js
    busuanzi: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/others/busuanzi.pure.mini.js
    aplayer: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/aplayer/APlayer.min.js
    dplayer: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/dplayer/DPlayer.min.js
    crypto: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/cryptojs/crypto-js.min.js
    echarts: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/echarts/echarts.min.js
    gitalk: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/gitalk/gitalk.min.js
    valine: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/valine/Valine.min.js # 若想保持最新版，请替换为 https://unpkg.com/valine/dist/Valine.min.js  默认为 /libs/valine/Valine.min.js
    minivaline: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/minivaline/MiniValine.js
    jqcloud: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/jqcloud/jqcloud-1.0.4.min.js
    tocbot: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/tocbot/tocbot.min.js
    canvas_nest: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/background/canvas-nest.js
    ribbon: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/background/ribbon.min.js
    ribbonRefresh: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/background/ribbon-refresh.min.js
    ribbon_dynamic: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/background/ribbon-dynamic.js
    instantpage: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/instantpage/instantpage.js
    snow: https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/libs/others/snow.js

# The post featured images that needs to be displayed when there is no image.
# 无文章特色图片时需要显示的文章特色图片.
featureImages:
- https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/medias/featureimages/0.jpg
- https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/medias/featureimages/1.jpg
- https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/medias/featureimages/2.jpg
- https://cdn.jsdelivr.net/gh/HOUCQ4869/mycdn/source/medias/featureimages/3.jpg
……
~~~
**4.最后执行命令，over**
~~~
npm run hexo
~~~
