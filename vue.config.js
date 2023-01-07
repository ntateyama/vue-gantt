const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: isProd ? 'https://github.com/ntateyama/vue-gantt.git' : '/',
  outputDir: 'docs',
  filenameHashing: false,
  productionSourceMap: false,
};
