const path = require('path')
module.exports = {
	entry: './a.js',
	output: {
		filename: 'output.js',
		path: path.resolve(__dirname)
	}
}