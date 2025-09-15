import path from 'node:path'
import Vue from '@vitejs/plugin-vue'

import UnoCSS from 'unocss/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },

  plugins: [
    Vue(),

    // https://github.com/posva/unplugin-vue-router
    // 自动解析并生成路由
    VueRouter({
      extensions: ['.vue', '.md'],
      routesFolder: 'src/pages/', // 匹配pages目录作为路由
      dts: 'src/types/typed-router.d.ts',
    }),

    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      dirs: ['src/components', 'src/views'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
        IconsResolver({
          prefix: 'Iconify', // 图标组件前缀
          enabledCollections: ['ep', 'ri'], // 启用ep、ri图标集
        }),
      ],
      dts: 'src/types/components.d.ts',
    }),
    Icons({
      autoInstall: true, // 自动安装图标集
      compiler: 'vue3', // 指定编译器
    }),
    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
