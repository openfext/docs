function getVueAdminNextSidebar(groups = []) {
  return [
    {
      title: groups[0],
      sidebarDepth: 0,
      collapsable: false,
      children: ['intro', 'faq'],
    },
    {
      title: groups[1],
      sidebarDepth: 1,
      collapsable: false,
      children: [
        'guide/start',
        'guide/dataflow',
        'guide/user',
        'guide/plugin',
        'guide/layout',
        'guide/navigation',
        'guide/router',
        'guide/module-files',
        'guide/form',
        'guide/table',
        'guide/practice',
        'guide/theme',
        'guide/deploy',
      ],
    },
    {
      title: groups[2],
      sidebarDepth: 1,
      collapsable: false,
      children: ['api/component'],
    },
  ]
}

function getVueFormBuilderSidebar(groups = []) {
  return [
    {
      title: groups[0],
      sidebarDepth: 0,
      collapsable: false,
      children: ['intro'],
    },
    {
      title: groups[1],
      sidebarDepth: 2,
      collapsable: false,
      children: [
        'guide/start',
        'guide/shares',
        'guide/metadata',
        'guide/event',
        'guide/custom',
      ],
    },
    {
      title: groups[2],
      sidebarDepth: 2,
      collapsable: false,
      children: ['api/component', 'api/factory'],
    },
    {
      title: groups[3],
      sidebarDepth: 2,
      collapsable: false,
      children: ['config/schema'],
    },
  ]
}

module.exports = {
  base: '/docs/',
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'FEXT Docs',
      description:
        'Next-generation front-end development technologies in action',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'FEXT Docs',
      description: '下一代前端开发技术实战',
    },
  },

  themeConfig: {
    logo: '/images/logo.png',

    repo: 'https://github.com/openfext/docs',
    repoLabel: 'Github',
    docsDir: 'docs',
    lastUpdated: true,
    editLinks: true,
    smoothScroll: true,
    displayAllHeaders: true,

    locales: {
      '/': {
        editLinkText: 'Edit this page on GitHub',
        selectText: 'Languages',
        label: 'English',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh',
          },
        },
        nav: [
          {
            text: 'Vue Use',
            link: '/vue-use/intro.html',
          },
          {
            text: 'Vue Form Builder',
            link: '/vue-form-builder/intro.html',
          },
          {
            text: 'Vue Admin Next',
            link: '/vue-admin-next/intro.html',
          },
          { text: 'FEXT', link: 'https://github.com/openfext' },
        ],
        // sidebarDepth: 1,
        // sidebar: {
        //   '/vue-admin-next/': getVueAdminNextSidebar([
        //     'Introduction',
        //     'Guide',
        //     'API Reference',
        //   ]),
        // },
      },
      '/zh/': {
        editLinkText: '在 GitHub 上编辑此页',
        selectText: '选择语言',
        label: '简体中文',
        serviceWorker: {
          updatePopup: {
            message: '站点内容有更新',
            buttonText: '刷新',
          },
        },
        nav: [
          {
            text: 'Vue Use',
            link: '/zh/vue-use/intro.html',
          },
          {
            text: 'Vue Form Builder',
            link: '/zh/vue-form-builder/intro.html',
          },
          {
            text: 'Vue Admin Next',
            link: '/zh/vue-admin-next/intro.html',
          },
          { text: 'FEXT', link: 'https://github.com/openfext' },
        ],
        sidebarDepth: 2,
        sidebar: {
          '/zh/vue-admin-next/': getVueAdminNextSidebar([
            '介绍',
            '指南',
            'API Reference',
          ]),
          '/zh/vue-form-builder/': getVueFormBuilderSidebar([
            '介绍',
            '指南',
            'API Reference',
            'Config Reference',
          ]),
        },
      },
    },
  },

  plugins: [
    ['@vuepress/active-header-links', true],
    ['@vuepress/back-to-top', true],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/nprogress', true],
    ['@vuepress/register-components', true],
    [
      '@vuepress/search',
      {
        searchMaxSuggestions: 10,
      },
    ],
  ],
}
