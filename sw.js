/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2023/01/11/hello-world/index.html","55f99863102183afadcf302021e78293"],["/2023/01/11/test-post/cover.jpg","6c9126b22c63a0c7e00255bbcc9d9b09"],["/2023/01/11/test-post/index.html","dde23b31a4796fb768d0668c27420832"],["/2023/01/16/gui-chen/index.html","74a9ca38db409caa6d02e66372e92563"],["/2023/01/18/linear-list/index.html","75a29a4ccc243cd3783a9bb56c592407"],["/2023/01/19/stack/index.html","aa193143abf3fca1bdc5c34ccfe393c3"],["/2023/01/20/queue/index.html","f2dddf092ae7bbd77b48787eb70bf955"],["/2023/01/20/string/index.html","cff000cf4c7982c30eca93fa7cf2166a"],["/404/index.html","27b3cc6d528691b3c415214ed037b0b3"],["/about/index.html","6d228b3a957eebb26f8c75e99de781e5"],["/archives/2023/01/index.html","d872be0eedf2ddc164ca16a1f7465c6d"],["/archives/2023/index.html","7cef0bb829094a330f17b3aa6612acf4"],["/archives/index.html","5412aea682db25b29081cb87c426680a"],["/categories/Web/index.html","8c882b096d6da5ad6550956c4c856789"],["/categories/index.html","6cf949d96f9e910c4978773efe44da02"],["/categories/lives/index.html","981cc5131aa33ad03de6531de6de8ee6"],["/categories/数据结构/index.html","5c35f69a794badfd3622a4a942d986d6"],["/contact/index.html","a6100779229f6d5a4df26b6c233c8c2c"],["/css/bb.css","93b97d7666cfd55a1b83c580889173fc"],["/css/gitment.css","28f246235bb1361466ca6c31064a3830"],["/css/hbe.style.css","98fb8da9de5616b0ac5ef411b3211cf7"],["/css/matery.css","5b5901b4663c8c8c7b76e22b5128da76"],["/css/my-gitalk.css","579d155a7c258c0a8087769e93725326"],["/css/my.css","d41d8cd98f00b204e9800998ecf8427e"],["/favicon.png","bb44feefd80d6541316f0a21cb5cb824"],["/friends/index.html","652ba0bbe200a1114c652ef522635209"],["/index.html","ea49e64115d1f950ede275567942cc9b"],["/js/matery.js","c97bfce9263ad84be971300fc1af3806"],["/js/search.js","c75f268465b5441df726fa8742bdc32a"],["/lib/hbe.js","11b87df3174154c9df0c7478b46bffab"],["/libs/animate/animate.min.css","02835fa6939f2b38e6bed6237a0dfa4f"],["/libs/aos/aos.css","7c25ecfb8ec235201fa94b6117f533a1"],["/libs/aos/aos.js","b75892653a6eeb32b40e46cfea9c37d7"],["/libs/aplayer/APlayer.min.css","41261cec5af2bcc3ae7f92f35324d9cd"],["/libs/aplayer/APlayer.min.js","ef08249bd29b9e03e0f1133acdacfe3c"],["/libs/awesome/css/all.css","a9f021db6fac4b312b5ff210a8361eb7"],["/libs/awesome/webfonts/fa-brands-400.eot","451b51d8700fb035bcaaa9e8710b384a"],["/libs/awesome/webfonts/fa-brands-400.svg","8528edfd60e8bc4274c0eadf6b121a3c"],["/libs/awesome/webfonts/fa-brands-400.ttf","189c0326f75931886d5b60cde8b5628f"],["/libs/awesome/webfonts/fa-brands-400.woff","85b063debeb5d5f079776ac1a9c924cb"],["/libs/awesome/webfonts/fa-brands-400.woff2","0425d661f34ffa46604c9dfa344c03bb"],["/libs/awesome/webfonts/fa-regular-400.eot","b6579220162705be426ad4db0dc43f6b"],["/libs/awesome/webfonts/fa-regular-400.svg","ec9318dc8ba3ec3cbb379f2d40f300cb"],["/libs/awesome/webfonts/fa-regular-400.ttf","9230982faf6ed4d1dab07babfb813777"],["/libs/awesome/webfonts/fa-regular-400.woff","14f22fbed8146dbf3b497bb32d8491b0"],["/libs/awesome/webfonts/fa-regular-400.woff2","772a0f14c850c8b0dfe283a95857583e"],["/libs/awesome/webfonts/fa-solid-900.eot","1898ebd2e3162e7ca8627073d865b893"],["/libs/awesome/webfonts/fa-solid-900.svg","f331e75b803f42d96aaba8540f29d3b3"],["/libs/awesome/webfonts/fa-solid-900.ttf","b1161bce5381a5fa7aacc073e1a01dd3"],["/libs/awesome/webfonts/fa-solid-900.woff","db525089f5101b59a66184d109e6f917"],["/libs/awesome/webfonts/fa-solid-900.woff2","4cc04a31c42f2f9d951547bbce75960b"],["/libs/background/canvas-nest.js","e75faf9047a9ae2b2da304d5f2e196f5"],["/libs/background/ribbon-dynamic.js","6c400a8f246c96f58ee7698b0b927f43"],["/libs/background/ribbon-refresh.min.js","b3cdd57b1b72988f3beab459a6297a46"],["/libs/background/ribbon.min.js","a78538c3005a73828082e5839db6577e"],["/libs/codeBlock/codeBlockFuction.js","ca6d40fbadf87d69c24eb662c38b37dc"],["/libs/codeBlock/codeCopy.js","0f1f221cc9672770376013c4d5185ca6"],["/libs/codeBlock/codeLang.js","32a2e820487d3c55685af9097a3cd559"],["/libs/codeBlock/codeShrink.js","0649e8c79e62bff308b79317a5243a42"],["/libs/cryptojs/crypto-js.min.js","0833c006e6d4731cf978b313d412d147"],["/libs/dplayer/DPlayer.min.css","dbd3507575bf0763906678043dceedbd"],["/libs/dplayer/DPlayer.min.js","be4cd9fb623b368b17921598e8b89ba3"],["/libs/echarts/echarts.min.js","79594f051ef89bb49c5e25dc5942956d"],["/libs/gitalk/gitalk.css","3f4c74f4b3fb9a5a43e8d9ffaa02279c"],["/libs/gitalk/gitalk.min.js","8e26dbee6925342c588629366befdba6"],["/libs/gitment/gitment-default.css","47c452478342051b60e0d349e0ab9663"],["/libs/gitment/gitment.js","44dfbc4401f57a16dddb04b9dd4b4c9b"],["/libs/instantpage/instantpage.js","bf3d880ae11db073905f220d65752b13"],["/libs/jqcloud/jqcloud-1.0.4.min.js","ff57d5ff6bec2d6e468b7429329fae03"],["/libs/jqcloud/jqcloud.css","6cc58ed609ff008db0bf3799a40ddc04"],["/libs/jquery/jquery.min.js","3b3f6acabb1e31a0c35cc39513234bb8"],["/libs/lightGallery/css/lightgallery.min.css","a94c4de3d8028fc56b148e8f66524e59"],["/libs/lightGallery/fonts/lg.eot","ecff11700aad0000cf3503f537d1df17"],["/libs/lightGallery/fonts/lg.svg","4cf7d0890238750cf9fd18878fea096f"],["/libs/lightGallery/fonts/lg.ttf","4fe6f9caff8b287170d51d3d71d5e5c6"],["/libs/lightGallery/fonts/lg.woff","5fd4c338c1a1b1eeeb2c7b0a0967773d"],["/libs/lightGallery/img/loading.gif","bbdac9cda255c54bfd809110aff87898"],["/libs/lightGallery/img/video-play.png","d672259b56b5dd1abdff3a98d87864e8"],["/libs/lightGallery/img/vimeo-play.png","a951123e4f7cb5d037a6a872f001a8af"],["/libs/lightGallery/img/youtube-play.png","6267452d4f9c32c7550cec6587f985d3"],["/libs/lightGallery/js/lightgallery-all.min.js","8e9dbfc5cbefb116ae170a309f39c3d0"],["/libs/masonry/masonry.pkgd.min.js","0809aedce974d4a28054fbb796eb72b1"],["/libs/materialize/materialize.min.css","e172c56f70883d3cdace52556c52addd"],["/libs/materialize/materialize.min.js","2018eaf2cad912711080fa5409cfb498"],["/libs/minivaline/MiniValine.js","74454c20239b5d0b6158d33b1ca38d82"],["/libs/others/busuanzi.pure.mini.js","fe678d1293b68256c959e1a7948d8eab"],["/libs/others/clicklove.js","83f7ad2f3ac2c29a5208ec952f9f7937"],["/libs/others/snow.js","18863a94902ddeb644e1f9544c6edf4e"],["/libs/prism/prism.css","93bb1f846906ab54d3e4d1131e0887ff"],["/libs/scrollprogress/scrollProgress.min.js","c27d1a51b29b835ca0c5bfca7ff53934"],["/libs/share/css/share.min.css","6ce46f70ebdf51a54b4c7b95b3e01c94"],["/libs/share/fonts/iconfont.eot","e83ffaa95463f987abe5db5bbbe303cc"],["/libs/share/fonts/iconfont.svg","6b3cbfae255ab1f2c1e8e8bfc80754d4"],["/libs/share/fonts/iconfont.ttf","9ac2cc5ae8616eb50c033525dc14a5eb"],["/libs/share/fonts/iconfont.woff","bf0fc2ec6e2a614635e0ab6e81d059ef"],["/libs/share/js/jquery.share.min.js","8a3eae3c8ef8d5eb098c4ebb767c002b"],["/libs/share/js/social-share.min.js","7930b81741afe0a002a62b4e97d98d91"],["/libs/tocbot/tocbot.css","32e9a20a149c13c1f2c2e3d24b93d2bd"],["/libs/tocbot/tocbot.min.js","14a3dd446da6137fc54242398d25c0ea"],["/libs/valine/Valine.min.js","f608bd424773a70113abc2ac08386867"],["/libs/valine/av-min.js","3366ae1df9f80bcd9460ba633190b804"],["/medias/avatar.jpg","62c605356c0c515be10014054bae5f04"],["/medias/banner/0.jpg","2fa58c3610a80ff2758a7ad3072fb946"],["/medias/banner/1.jpg","6c9126b22c63a0c7e00255bbcc9d9b09"],["/medias/banner/2.jpg","01c540cfa781106fba0f1e1bdf2ef2dd"],["/medias/banner/3.jpg","fd3e6ca2dbe232371ecde5987980bcd6"],["/medias/banner/4.jpg","9f13997c670a2167bab8fc14f253d944"],["/medias/banner/5.jpg","2292c8b85ef07d21db75501d5b1d38f7"],["/medias/banner/6.jpg","1b835e6b8d3a951191dbabdaf6f04dbc"],["/medias/banner/7.jpg","6bc4cfaeff09ac07d7c828377adc8f30"],["/medias/comment_bg.png","04208f25e34b8f29f072efbb2e212c86"],["/medias/contact.png","05f80f75317895d4d6a5c0b39c18236e"],["/medias/cover.jpg","8490548006f81e1470c4eb40858b505b"],["/medias/featureimages/0.jpg","8f8ea348fe2b79b7dc5f84cc8c93aba9"],["/medias/featureimages/1.jpg","54184908524d82d855de251c5fe06739"],["/medias/featureimages/10.jpg","ce127679875eb91d79a576c16e2cd82d"],["/medias/featureimages/11.jpg","0256adcb632ddfa6ed5b0dfef260ca5c"],["/medias/featureimages/12.jpg","4e4f6286e637009a28ddccb68edea11b"],["/medias/featureimages/13.jpg","6b5f4b842bb7c3f117c627ea6a2b7f75"],["/medias/featureimages/14.jpg","4354d455db90dc52e65f27272c31d25a"],["/medias/featureimages/15.jpg","bb43e02402eb0e1f80deabb187ca8702"],["/medias/featureimages/16.jpg","bd026f6fcfbfeb18b63a2c196a1eb0e5"],["/medias/featureimages/17.jpg","940aa5faf5f1596c2b8728eb465e4414"],["/medias/featureimages/18.jpg","9ce8eb3388bd6f45439d813d15614ac8"],["/medias/featureimages/19.jpg","fbc7a47693ed47d06a220f01c0acd732"],["/medias/featureimages/2.jpg","5633407491eb05cf3c9cc57e8dd1b4c5"],["/medias/featureimages/20.jpg","ed6127837fc706de6a03e688e4129e83"],["/medias/featureimages/21.jpg","386d91eca51fa36aed5c61710ecc98a3"],["/medias/featureimages/22.jpg","cee5b8f3c2318f208a88ce0b6314163f"],["/medias/featureimages/23.jpg","9117f5a4936e24abc61967216f68f7ff"],["/medias/featureimages/24.jpg","1d5e559593e307165242ddd10740139a"],["/medias/featureimages/25.jpg","063114bc06a838b8139a31291adfd207"],["/medias/featureimages/26.jpg","a15d78ca3e59914126e658fea811251c"],["/medias/featureimages/27.jpg","ca462fa43bdf8f4db4ca5b1156cfd7a4"],["/medias/featureimages/28.jpg","b1db6aa184addef7beed015bc3d991b8"],["/medias/featureimages/29.jpg","5a329d59fb56f95c5bd8cc1bd8ce43d1"],["/medias/featureimages/3.jpg","9af81e255c683f97bf4947283a16a247"],["/medias/featureimages/4.jpg","a51acb57758ea9ebecf821d29cc049c9"],["/medias/featureimages/5.jpg","e28fa9517ab7b8ea5bd6e376ff65f139"],["/medias/featureimages/6.jpg","80fe77756db489eb65194060a43eed49"],["/medias/featureimages/7.jpg","b7b6cc726ed9649213e316b812c42b43"],["/medias/featureimages/8.jpg","e7e98ecb15ae0851a41df81f9bc2888d"],["/medias/featureimages/9.jpg","3177ae142bef3f98046502cd2881cd49"],["/medias/icp.png","60aa047315ba11596d9f954900c86fdb"],["/medias/logo.png","6fd306e0fb239e42ec8f82793e6ae6ee"],["/medias/music/cover1.jpg","ce127679875eb91d79a576c16e2cd82d"],["/medias/reward/alipay.jpg","b1bdc028cca24a9be02b0a31f7e91301"],["/medias/reward/wechat.png","460893e75a7585852b54ce82a4fef89b"],["/sw-register.js","a7ceb8c635009efab63d685287f0f0f3"],["/tags/C/index.html","f5cf6ecde5e84c0b3896e86c5cd24e3a"],["/tags/Web/index.html","ee73475983a7779b95527dce04d41c54"],["/tags/index.html","2b4a434c5a65c3983577131437bdb39a"],["/tags/lives/index.html","53e8da04a41a6362d62ed20fa2b1de86"],["/tags/数据结构/index.html","dc6739377fee7e5db9013d93e16e01e8"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
