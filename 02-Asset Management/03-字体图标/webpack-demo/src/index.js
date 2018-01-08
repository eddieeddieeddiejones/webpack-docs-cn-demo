import _ from 'lodash'
import './style.css'
import Icon from './icon.png'
// import './main.scss'

/*Now, when you import MyImage from './my-image.png', that image will be processed and added to your output directory and the MyImage variable will contain the final url of that image after processing. When using the css-loader, as shown above, a similar process will occur for url('./my-image.png') within your CSS. The loader will recognize this is a local file, and replace the './my-image.png' path with the final path to the image in your output directory. The html-loader handles <img src="./my-image.png" /> in the same manner.*/
/*现在，当你从“…/my image”导入MyImage时。该图像将被处理并添加到您的输出目录中，MyImage变量将在处理后包含该图像的最终url。*/
/*在使用CSS加载器时，如上面所示，在您的CSS中也会出现类似的进程('./my-image.png')。加载程序将识别这是一个本地文件，并替换“./my-image”。png在输出目录中的最终路径到图像的路径。html-loader处理小于img src=“./my-image”。以同样的方式。*/
function component () {
	var element = document.createElement('div')
	// Lodash, now imported by this script
	element.innerHTML = _.join(['Hello', 'webpack'], ' ')
	element.classList.add('hello')

	// Add the image to our existing div.
	var myIcon = new Image();
	// <img src="1d1e6d5dd3d9e3c85e249124219b8719.png">
	console.log(myIcon)
	// 1d1e6d5dd3d9e3c85e249124219b8719.png
	console.log(Icon)
	myIcon.src = Icon;
	
	element.appendChild(myIcon);

	return element
}

document.body.appendChild(component())