var webpack = require('webpack');

module.exports = {
  lintOnSave: false,
	configureWebpack: {
		watchOptions: {
			aggregateTimeout: 300,
			poll: true
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					'API_URL': JSON.stringify(process.env.API_URL)
				}
			})
		],
	}
};
