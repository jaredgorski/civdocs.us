const withOffline = require('next-offline')
const withSourceMaps = require('@zeit/next-source-maps')

const getApiEndpoint = () => {
  switch (process.env.NODE_ENV) {
    case'development':
      return 'http://localhost:7687'
      break;
    case 'production':
    default:
      return 'http://api.civdocs.us'
      break;
  }
};

const config = {
  env: {
    apiEndpoint: getApiEndpoint(),
  },
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest),
  generateInDevMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
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
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};

module.exports = withSourceMaps(withOffline(config));
