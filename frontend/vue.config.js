var webpack = require('webpack');

module.exports = {
  lintOnSave: false,
	configureWebpack: {
		watchOptions: {
			aggregateTimeout: 300,
			poll: true
		}
	}
};
