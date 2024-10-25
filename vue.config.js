const { defineConfig } = require('@vue/cli-service');
const SitemapPlugin = require('sitemap-webpack-plugin').default;

// Paths from your router
const paths = [
  { path: '/', lastmod: new Date().toISOString(), priority: 1.0 },
  { path: '/cancel', lastmod: new Date().toISOString(), priority: 0.8 },
  { path: '/dashboard', lastmod: new Date().toISOString(), priority: 0.8 },
  { path: '/feedback', lastmod: new Date().toISOString(), priority: 0.8 },
  { path: '/pricing', lastmod: new Date().toISOString(), priority: 0.8 },
  { path: '/profile', lastmod: new Date().toISOString(), priority: 0.8 },
  { path: '/roadmap', lastmod: new Date().toISOString(), priority: 0.8 },
  { path: '/success', lastmod: new Date().toISOString(), priority: 0.8 },
  { path: '/login', lastmod: new Date().toISOString(), priority: 0.7 },
  { path: '/about', lastmod: new Date().toISOString(), priority: 0.7 }
];

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new SitemapPlugin({ base: 'https://simplevig.com', paths })
    ],
  },
});
