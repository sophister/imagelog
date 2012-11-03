/**
 * single page app to illustrate the statistic of image
 * @author Jess
 * @date 2012-11-02
 */

var express = require('express');
var ejs = require('ejs');
var config = require('./conf/config');
var control = require('./control/control');
var path = require('path');

/////////////////////////////////////////server config/////////
var host = config.get('host'), 
	port = config.get('port'), 
	tplEngine = config.get('teplateEngine'), 
	viewDir = config.get('viewDir'), 
	pagesFile = config.get('pagesPath'), 
	itemsFile = config.get('itemsPath'), 
	staticDir = config.get('staticDir');

tplEngine = 'ejs';


var app = express();


app.set('view engine', tplEngine);
app.engine('html', ejs.renderFile);
app.set('views', viewDir);
app.use(express.bodyParser());
app.use(express.static(staticDir));

//首页
app.get('/', function(req, res){
	control.index(req, res);
	//res.render('index.html', {year: new Date().getFullYear()});
});

//显示新增统计数据的页面
app.get('/item/add', function(req, res){
	control.addItem(req, res);
	//res.render('statisticViews/add-statistic.html', {year: new Date().getFullYear(), pages : []});
});

//接受新增统计数据的POST请求
app.post('/item/doAdd', function(req, res){
	control.saveItem(req, res);
	//res.render('statisticViews/add-statistic.html', {year: new Date().getFullYear(), pages : []});
});

//显示所有的统计项
app.get('/item/show', function(req, res){
	control.showItem(req, res);
});

//关于页面
app.get('/about', function(req, res){
	control.showAbout(req, res);
});

app.use(function(req, res, next){
	control.index(req, res);
});

app.listen(port);

console.log('server running at ' + port);
