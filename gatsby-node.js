const path = require('path')
var webpack = require('webpack')
exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions }) => {
	// enable sourcemaps on dev
	// https: //github.com/gatsbyjs/gatsby/issues/6278
	if (stage === 'develop') {
		actions.setWebpackConfig({
			devtool: 'cheap-module-source-map',
		})
	}

	actions.setWebpackConfig({
		resolve: {
			modules: [path.join(__dirname, 'src'), 'node_modules'],
			alias: {
				'~components': path.resolve(__dirname, 'src/components'),
				'~utils': path.resolve(__dirname, 'src/utils'),
			},
		},
		node: {
			fs: 'empty',
			tls: 'empty',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					include: /node_modules\/rc\/index.js/,
					loader: 'shebang-loader',
				},
			],
		},
		plugins: [
			plugins.define({
				__DEVELOPMENT__: stage === `develop` || stage === `develop-html`,
			}),
			new webpack.NormalModuleReplacementPlugin(/^mqtt$/, 'mqtt/dist/mqtt.js'),
		],
	})
}
