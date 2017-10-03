const baseConfig = require('webpack-focus/config/base')(process.env);
const envParser = require('webpack-focus/webpack-utilities/env-parser');
module.exports = baseConfig.toWebpackConfig(envParser(process.env));
