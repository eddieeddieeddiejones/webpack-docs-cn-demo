const path = require('path')

module.exports = {
	entry: './src/index.js',
	// output: path.resolve(__dirname, '/dest')
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
