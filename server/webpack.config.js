const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
	entry: {
		filename: "./src/index.js",
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "index.js"
	},
	externals: [nodeExternals()],
	module: {
		rules: [{
			test: /\.js$/,
			include: path.join(__filename, "src"),
			exclude: /node_modules/,
			loader: "babel-loader"
		}]
	},
	target: "node",
	plugins: [
		new CleanWebpackPlugin(),
	]
};