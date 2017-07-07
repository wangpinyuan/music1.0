const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	devtool: "#eval-source-map", // 生成source map
	entry: {
		app: './src/main.js'
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		publicPath: '/',
		filename: "js/[name]-[hash].js"
	},
	// contentBase 	默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）
	// port 	设置默认监听端口，如果省略，默认为”8080“
	// inline 	设置为true，当源文件改变时会自动刷新页面
	// historyApiFallback 	在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
	devServer: {
		port: 80,
		inline: true,
		historyApiFallback: true,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:3001'
			}
		}
	},
	// test：一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
	// loader：loader的名称（必须）
	// include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
	// query：为loaders提供额外的设置选项（可选）
	module: {
		rules: [{
				test: /\.json$/,
				loader: "json-loader"
			}, {
				test: /\.js$/,
				exclude: path.resolve(__dirname + '/node_modules/'),
				include: path.resolve(__dirname + '/src'),
				loader: 'babel-loader?presets[]=es2015&presets[]=react',
				query: {
					presets: ['react', 'es2015'],
					plugins: ['react-html-attrs'], //添加组件的插件配置
				}
			}, {
				test: /\.css$/,
				loader: "style-loader!css-loader",
			}, {
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			}, {
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader'
			},
			// 处理图片
			{
				test: /\.(png|jpg|gif|svg)$/i,
				loaders: [
					// 'file-loader?name=images/[name]-[hash:5].[ext]',
					"url-loader"
				]
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin('This file is created by wpy'),
		// 这个插件的作用是依据一个简单的模板，帮你生成最终的Html5文件，这个文件中自动引用了你打包后的JS文件。每次编译都在文件名中插入一个不同的哈希值。
		// title: 用来生成页面的 title 元素
		// filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
		// template: 模板文件路径，支持加载器，比如 html!./index.html
		// inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
		// favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。
		// minify: {} | false , 传递 html-minifier 选项给 minify 输出
		// hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
		// cache: true | false，如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。
		// showErrors: true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
		// chunks: 允许只添加某些块 (比如，仅仅 unit test 块)
		// chunksSortMode: 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
		// excludeChunks: 允许跳过某些块，(比如，跳过单元测试的块) 
		new HtmlWebpackPlugin({
			title: 'Music 1.0',
			inject: true,
			filename: 'index.html',
			template: 'index.html'

		}),
		new webpack.HotModuleReplacementPlugin(), //热加载插件
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"development"'
		})
	],
	resolve: {
		//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
		extensions: ['.js', '.json', '.less'],
		//模块别名定义，方便后续直接引用别名，无须多写长长的地址
		alias: {
			'src': path.resolve(__dirname, './src'),
			'components': path.resolve(__dirname, './src/components'),
			'public': path.resolve(__dirname, './src/public')
		}
	}
}