const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: isProd ? '/vue-gantt' : '/',
  outputDir: 'docs',
  filenameHashing: false,
  productionSourceMap: false,
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
};
