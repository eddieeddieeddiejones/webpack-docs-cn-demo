import _ from 'lodash'
import './style.css'

/*在webpack之前，前端开发人员将使用诸如咕哝和吞咽这样的工具来处理这些资产，并将它们从/src文件夹转移到/或/构建目录中。同样的想法也被用于JavaScript模块，但是像webpack这样的工具将会动态地打包所有依赖项(创建所谓的依赖图)。这很好，因为现在每个模块都明确地声明了它的依赖关系，我们将避免绑定不使用的模块。*/
/*最酷的webpack特性之一是，除了JavaScript之外，您还可以包含任何其他类型的文件，其中有一个装入器。这意味着JavaScript(如显式的依赖关系)所列的相同的好处可以应用于构建网站或web应用程序的所有东西上，让我们从CSS开始，因为您可能已经熟悉了这个设置。*/

/*开放指数。在你的浏览器中再次使用html，你应该看到Hello webpack现在是红色的。要查看webpack做了什么，请检查页面(不要查看页面源代码，因为它不会显示结果)，并查看页面的头部标记。它应该包含我们在index.js中导入的样式块。*/
function component () {
	var element = document.createElement('div')
	// Lodash, now imported by this script
	element.innerHTML = _.join(['Hello', 'webpack'], ' ')
	element.classList.add('hello')
	return element
}

document.body.appendChild(component())