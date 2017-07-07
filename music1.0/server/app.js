var express = require('express');
var path = require('path');
var bodyParser = require("body-parser"); // 解析提交内容

var apiRoutes = require("./router/apiRoutes");

var port = 3001;
var app = express();

// app.use(express.static(path.join(__dirname, '../build')));
app.set("views", path.join(__dirname, "/public"));
app.set("view engine", "ejs");

// 中间件解析form提交
app.use(bodyParser.json({
	limit: '50mb'
}));

app.use('/api', apiRoutes);
app.use('*', function(req, res) {
	res.render('index.html');
});
app.use(function(req, res) {
	if (!res.headersSent) {
		res.status(404).render('404', {
			title: 'Music 1.0'
		});
	}
});

app.listen(port, function() {
	console.log(`listen on port ${port} **************`);
})