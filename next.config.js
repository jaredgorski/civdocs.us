const withCSS = require('@zeit/next-css');

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
};

module.exports = withCSS(config);
