/**
 * control of the app
 * @author Jess
 * @date 2012-11-03
 */

'use strict';

var pageModel = require('../model/PagesModel');
var StatisticModel = require('../model/StatisticModel');
var config = require('../conf/config');


var pagesFile = config.get('pagesPath');		//所有页面数据保存文件地址
var itemsFile = config.get('itemsPath');		//所有统计数据保存文件地址
var year = new Date().getFullYear();

var pagesManager = pageModel.getInstance({
	pagesFile : pagesFile
});

var itemsManager = StatisticModel.getInstance({
	itemsFile : itemsFile
});

//显示首页
exports.index = function(req, res){
	res.render('index.html', {
		year: year, 
		uri : '/'
	});
};

//GET增加一条统计数据
exports.addItem = function(req, res, calback){
	var pages = pagesManager.getAllPages();
	res.render('statisticViews/add-statistic.html', {
		year: year, 
		uri : '/item/add', 
		pages : pages
	});
};

//POST 保存一条记录到model中，持久化
exports.saveItem = function(req, res, callback){
	var pageIndex = req.body.page, 
		name = req.body.name, 
		desc = req.body.desc,
		calc = req.body.calc;
	var outcome = function(result){
		if(result.status){
			//save succeed
			res.send('save succeed ' + name);
		}else{
			res.send(result.msg);
		}
	};
	var result = itemsManager.addItem({
		name : name, 
		description : desc, 
		pageIndex : pageIndex, 
		calc : calc, 
		author : 'Jess', 
	}, outcome);
	outcome(result);
};

//显示所有的统计项列表
exports.showItem = function(req, res, callback){
	var pages = pagesManager.getAllPages(), 
		items = itemsManager.getAllItems();
	res.render('statisticViews/item-show.html', {
		year : year, 
		uri : '/item/show', 
		pages : JSON.stringify(pages), 
		items : JSON.stringify(items)
	});
};

//about pages
exports.showAbout = function(req, res){
	res.render('about.html', {
		year : year, 
		uri : '/about'
	});
};