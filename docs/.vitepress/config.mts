import { defineConfig } from 'vitepress'

//命令集：pnpm add -D vitepress vue @mdit-vue/shared @types/node busuanzi.pure.js canvas-confetti less medium-zoom sass vitepress-plugin-comment-with-giscus xgplayer

import { devDependencies } from '../../package.json'

import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'

export default defineConfig({
  lang: 'zh-CN',
  title: "谷神一",
  description: "谷神一的炒股教程，交易日记，以股入道",

  // #region fav
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
  ],
  // #endregion fav

  base: '/stock/', //网站部署到github的vitepress这个仓库里

  //cleanUrls:true, //开启纯净链接无html

  //启用深色模式
  appearance: 'dark',

  //多语言
  locales: {
    root: {
      label: '简体中文',
      lang: 'Zh_CN',
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
    },
    fr: {
      label: 'French',
      lang: 'fr',
      link: '/fr/',
    }
  },

  //markdown配置
  markdown: {
    //行号显示
    lineNumbers: true,

    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],

    // 开启图片懒加载
    image: {
      lazyLoading: true
    },

    // 组件插入h1标题下
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`; 
          return htmlResult;
      },


      md.use(groupIconMdPlugin) //代码组图标

    }

  },

  vite: { 
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          ts: localIconLoader(import.meta.url, '../public/svg/typescript.svg'), //本地ts图标导入
          md: localIconLoader(import.meta.url, '../public/svg/md.svg'), //markdown图标
          css: localIconLoader(import.meta.url, '../public/svg/css.svg'), //css图标
          js: 'logos:javascript', //js图标
        },
      })
    ],
  },

  lastUpdated: true, //此配置不会立即生效，需git提交后爬取时间戳，没有安装git本地报错可以先注释

  //主题配置
  themeConfig: {
    //左上角logo
    //logo: '/logo.png',
    //logo: 'https://vitejs.cn/vite3-cn/logo-with-shadow.png', //远程引用
    //siteTitle: false, //标题隐藏

    //设置站点标题 会覆盖title
    //siteTitle: 'Hello World',

    //编辑本页
    editLink: {
      pattern: 'https://github.com/Yiov/vitepress-doc/edit/main/docs/:path', // 改成自己的仓库
      text: '在GitHub编辑本页'
    },

    //上次更新时间
    lastUpdated: {
      text: '上次更新时间',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      },
    },


    //导航栏
    nav: [
      { text: '首页', link: '/' },
      {
        text: '🍉道德经全文',
        items: [
              { text: '帛书版', link: '/silk-book-edition' },
              { text: '通行版', link: '/general-edition' },
              { text: '郭店楚简版', link: '/chu-bamboo-edition' },
        ],
      },
      {
              text: '🙏名家注解',
              items: [
                    { text: '白话文翻译', link: '/explain/bai-hua-wen' },
                    { text: '王弼注解', link: '/explain/wang-bi' },
                    { text: '河上公注解', link: '/explain/river-god' },
                    { text: '吕洞宾注解', link: '/explain/lv-dong-bin' },
                    { text: '韩非子解老，喻老', link: '/explain/lv-dong-bin' },
                    { text: '苏澈注解', link: '/explain/lv-dong-bin' },
              ],
            },
      {text: '👀精选文章', link: '/article/'},
      {text: '👽以股入道', link: '/stock-tao.md'},
      {text: '😊交流群', link: '/group.md'},
    ],


    //侧边栏



    //本地搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                },
              },
            },
          },
        },
      },
    },



    //社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Yiov/vitepress-doc' },
      { icon: 'twitter', link: 'https://twitter.com/' },
      { icon: 'discord', link: 'https://chat.vitejs.dev/' },
      {
        icon: {
          svg: '<svg t="1703483542872" class="icon" viewBox="0 0 1309 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6274" width="200" height="200"><path d="M1147.26896 912.681417l34.90165 111.318583-127.165111-66.823891a604.787313 604.787313 0 0 1-139.082747 22.263717c-220.607239 0-394.296969-144.615936-394.296969-322.758409s173.526026-322.889372 394.296969-322.889372C1124.219465 333.661082 1309.630388 478.669907 1309.630388 656.550454c0 100.284947-69.344929 189.143369-162.361428 256.130963zM788.070086 511.869037a49.11114 49.11114 0 0 0-46.360916 44.494692 48.783732 48.783732 0 0 0 46.360916 44.494693 52.090549 52.090549 0 0 0 57.983885-44.494693 52.385216 52.385216 0 0 0-57.983885-44.494692z m254.985036 0a48.881954 48.881954 0 0 0-46.09899 44.494692 48.620028 48.620028 0 0 0 46.09899 44.494693 52.385216 52.385216 0 0 0 57.983886-44.494693 52.58166 52.58166 0 0 0-57.951145-44.494692z m-550.568615 150.018161a318.567592 318.567592 0 0 0 14.307712 93.212943c-14.307712 1.080445-28.746387 1.768001-43.283284 1.768001a827.293516 827.293516 0 0 1-162.394168-22.296458l-162.001279 77.955749 46.328175-133.811485C69.410411 600.858422 0 500.507993 0 378.38496 0 166.683208 208.689602 0 463.510935 0c227.908428 0 427.594322 133.18941 467.701752 312.379588a427.463358 427.463358 0 0 0-44.625655-2.619261c-220.24709 0-394.100524 157.74498-394.100525 352.126871zM312.90344 189.143369a64.270111 64.270111 0 0 0-69.803299 55.659291 64.532037 64.532037 0 0 0 69.803299 55.659292 53.694846 53.694846 0 0 0 57.852923-55.659292 53.465661 53.465661 0 0 0-57.852923-55.659291z m324.428188 0a64.040926 64.040926 0 0 0-69.574114 55.659291 64.302852 64.302852 0 0 0 69.574114 55.659292 53.694846 53.694846 0 0 0 57.951145-55.659292 53.465661 53.465661 0 0 0-57.951145-55.659291z" p-id="6275"></path></svg>'
        },
        link: 'https://weixin.qq.com/',
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: 'wechat'
      }
    ],

    //手机端深浅模式文字修改
    darkModeSwitchLabel: '深浅模式',




    //页脚
/*     footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2023-${new Date().getFullYear()} 备案号：<a href="https://beian.miit.gov.cn/" target="_blank">京****号</a>`,
    }, */


    //侧边栏文字更改(移动端)
    sidebarMenuLabel: '目录',

    //返回顶部文字修改(移动端)
    returnToTopLabel: '返回顶部',


    //大纲显示2-3级标题
    outline: {
      level: [2, 3],
      label: '当前页大纲'
    },


    //自定义上下页名
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

  },



})
