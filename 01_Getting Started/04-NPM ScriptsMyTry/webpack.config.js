const path = require('path')
module.exports = {
	entry: './a.js',
	output: {
		filename: 'output.js',
		path: path.resolve(__dirname)
		// ,
		// 尝试了，不成功
		// publicPath: path.resolve(__dirname, 'a')
	}
}