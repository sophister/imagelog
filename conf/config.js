
var path = require('path');

//var ROOT = path.resolve(__dirname.split(path.sep).join('/') + '/../');			//项目根路径

ROOT = path.resolve(__dirname + '/../');


var appConf = {
	host : 'localhost', 
	port : 9999, 
	staticDir : ROOT + '/public', 				//静态文件目录
	dataDir : ROOT + '/data', 
	modelDir : '/model', 
	viewDir : ROOT + '/views', 
	controlDir : '/control', 
	templateEngine : 'ejs', 
	itemsPath : ROOT + '/data/items.js', 		//存储所有统计项信息的文件地址
	pagesPath : ROOT + '/data/pages.js', 		//存储页面分类信息的文件地址

	/////////develop version
	version : '1.0.0'
};

exports.get = function(name){
		return appConf[name];
};