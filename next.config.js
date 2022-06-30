/* eslint-disable @typescript-eslint/no-var-requires */

/** @typedef {import('next').NextConfig} NextConfig */
/** @typedef {import('webpack').Configuration} WebpackConfiguration */

const { PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER } = require('next/constants');

const APP_ENV = process.env.APP_ENV || 'development';

const GLOBALS = {
  __DEV__: APP_ENV === 'development',
  __TEST__: APP_ENV === 'test',
  __ACC__: APP_ENV === 'acceptance',
  __PROD__: APP_ENV === 'production',
};

/**
 * Set up our Next environment based on build phase
 * @param {string} phase
 * @param {NextConfig} config
 * @returns {NextConfig}
 */
const config = (phase, config) => {
  /** @type {NextConfig} */
  let cfg = {
    ...config,
    // Remove x-powered-by header to remove information about the server
    poweredByHeader: false,
    reactStrictMode: false,
    basePath: '',
    devIndicators: {
      buildActivity: true,
      buildActivityPosition: 'bottom-left',
    },
    experimental: {
      newLinkBehavior: true,
      images: {
        allowFutureImage: true,
      },
    },
  };

  /**
   * BUILD CONFIG
   * This config will run in every build phase, but NOT when starting the production server
   */
  if (phase !== PHASE_PRODUCTION_SERVER) {
    // Important that we import dev dependencies only in build phases
    const webpack = require('webpack');

    cfg = {
      ...cfg,
      /** @param {WebpackConfiguration} config */
      webpack: (config, { isServer }) => {
        /**
         * WEBPACK CONFIG
         * Your regular Webpack configuration, except we have to work with an already existing
         * Webpack configuration from Next. When changing anything, keep in mind to preserve the
         * config of Next (unless you are trying to overwrite something) or things might break.
         */

        /** @type {import('webpack').ModuleOptions['rules']} */
        const rules = [
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
        ];

        // Add our rules
        if (!config.module) {
          config.module = {
            rules: [],
          };
        }

        config.module.rules = [...config.module.rules, ...rules];

        // Add plugins
        if (!config.plugins) {
          config.plugins = [];
        }

        config.plugins = [...config.plugins, new webpack.DefinePlugin(GLOBALS)];

        // Add tsconfig paths to webpack
        if (!config.resolve) {
          config.resolve = {
            plugins: [],
          };
        }

        config.resolve.plugins = [...config.resolve.plugins];

        return config;
      },
    };
  }

  /**
   * PRODUCTION BUILD CONFIG
   * This is the config for production builds in addition to the previous build phase
   */
  if (phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = require('next-pwa');

    // Add service worker to our production build with Workbox
    cfg = withPWA({
      ...cfg,
      pwa: {
        dest: 'public',
        skipWaiting: true,
        clientsClaim: true,
        include: [/\.html$/, /\.js$/, /\.png$/],
        scope: '/',
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'https-calls',
              networkTimeoutSeconds: 15,
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
        ],
      },
    });

    // Add Bundle Analyzer if requested by script
    if (process.env.BUNDLE_ANALYZE) {
      const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: !!process.env.BUNDLE_ANALYZE,
      });

      cfg = withBundleAnalyzer({
        ...cfg,
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: 'static',
            reportFilename: '../bundle_analytics/server.html',
          },
          browser: {
            analyzerMode: 'static',
            reportFilename: '../bundle_analytics/client.html',
          },
        },
      });
    }
  }

  return cfg;
};

module.exports = config;
