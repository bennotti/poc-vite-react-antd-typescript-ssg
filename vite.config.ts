/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import loadVersion from 'vite-plugin-package-version';
import EnvironmentPlugin from "vite-plugin-environment";
import dns from 'dns';
import path from 'path';

dns.setDefaultResultOrder('verbatim');

export const plugins = [
  react(),
  // loadVersion(),
  EnvironmentPlugin('all', { prefix: 'REACT_APP_' }),
  EnvironmentPlugin('all', { prefix: 'VITE_APP_' })
];

const build = {
  chunkSizeWarningLimit: 600,
  rollupOptions: {
    output: {
    },
  },
};

export const resolve = {
  alias: [
    { find: '@', replacement: path.resolve(__dirname, './src') },
    { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
    { find: '@layouts', replacement: path.resolve(__dirname, './src/layouts') },
    { find: '@infra', replacement: path.resolve(__dirname, './src/infraestrutura') },
    { find: '@infraestrutura', replacement: path.resolve(__dirname, './src/infraestrutura') },
    { find: '@funcionalidades', replacement: path.resolve(__dirname, './src/funcionalidades') },
    { find: '@modulos', replacement: path.resolve(__dirname, './src/funcionalidades') },
    { find: '@componentes', replacement: path.resolve(__dirname, './src/componentes') }
  ],
};

export default defineConfig(({ command, mode }) => {
  console.log(mode);
  if (command == 'serve') {
    const customBuild = {
      minify: false,
      ...build,
    };
    return {
      server: {
        host: 'localhost',
        open: mode !== 'webe2e' && mode !== 'webe2emock' ? '/' : undefined,
        disableHostCheck: true,
        hot: true,
        port: 3000
      },
      resolve,
      customBuild,
      plugins,
    };
  }

  return {
    base: './',
    build,
    resolve,
    plugins,
  };
});


// export default defineConfig({
//   plugins: [react()],
//   build: {
//     minify: false
//   }
// })
