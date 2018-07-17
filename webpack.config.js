const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

config = {
	//entry: path.resolve(__dirname, "src/js/index.js"), 
	entry: path.resolve(__dirname, "src", "js", "index.js"), 
	output: {
		path: path.resolve(__dirname, "dist"), 
		filename: "bundle.js",
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		//hot: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
          'babel-loader',
          'eslint-loader'
        ],
				exclude: [
					/node_modules/
				]
      },
      {
        test: /(htm|html|xhtml|hbs|handlebars|php|ejs)$/,
        loader: 'htmllint-loader',
        exclude: /(node_modules)/,
      },
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader'],
			},
			{
				test: /\.html$/, 
				use: ['html-loader'],
      }
		],	
	},
	plugins: [
		//new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html"), 
			inject: 'body'
    })
		//new UglifyJSPlugin(),
		//new webpack.HotModuleReplacementPlugin(),
	],
}

if(fs.existsSync(path.resolve(__dirname, "src", "static"))) {
	config.plugins.push(
		new CopyWebpackPlugin([
			{ from: 'src/static', to: 'static'}	
		]),
	);
}

module.exports = config
