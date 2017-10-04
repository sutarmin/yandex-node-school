const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
	entry: './src/client/index.js',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.css$/,
				loaders: [
                    {
						loader: "file-loader",
						options: {
							name: 'build/[hash].[ext]'
						} 
                    },
                    {
                        loader: "extract-loader",
					},
                    {
                        loader: "css-loader",
					},
                ],
			}
		]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "index.html",
			inject: "body"
		}),
	],
	watch: false
},
// ssr build 
{
	entry: './src/libs/ssr.js',
	target: 'node',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loaders: [
                    {
						loader: "file-loader",
						options: {
							name: 'build/[hash].[ext]'
						} 
                    },
                    {
                        loader: "extract-loader",
					},
                    {
                        loader: "css-loader",
					},
                ],
			}
		]
	},
	output: {
		filename: 'ssr.build.js',
		path: path.resolve(__dirname, './src/libs/'),
		libraryTarget: 'commonjs2',
	}
}];