const path = require("path")
const webpack = require("webpack")

const DIST_DIR = path.resolve(__dirname, "dist")
const SRC_DIR = path.resolve(__dirname, "src")
const PUBLIC_DIR = path.resolve(__dirname, "public")

module.exports = {
	entry: SRC_DIR + "/index.js",
	output: {
		path: DIST_DIR,
		filename: "bundle.js",
		// Virtual path that maps to the output.path.
		publicPath: "/dist/",
	},
	devServer: {
		// Directory of the static public (non-webpack) content.
		contentBase: PUBLIC_DIR,
		port: 3000,
		// Enable HMR without page refresh as fallback in case of build failures.
		hotOnly: true,
		// No rewrite on 404 errors. Enable if redirection is needed upon 404.
		historyApiFallback: false,
	},
	resolve: {
		// Import modules without needing to add their extensions.
		extensions: ["*", ".js", ".jsx"]
	},
	module: {
		rules: [
			// Invoke babel compiler.
			{
				test: /\.(js|jsx)$/,
				include: SRC_DIR,
				loader: "babel-loader",
				options: {
					// 'env' for ES6 -> ES5, 'react' for JSX -> ES5 transpiling.
					presets: ["@babel/env", "@babel/react"]
				}
			},
			{
				test: /\.css$/,
				// 'css-loader' requires 'style-loader'.
				use: ["style-loader", "css-loader"]
			}
		]
	},
	// Needed to enable HMR.
	plugins: [new webpack.HotModuleReplacementPlugin()]
}
