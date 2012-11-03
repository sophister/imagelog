/**
 * 负责对页面分类的CRUD操作
 * @author Jess
 * @date 2012-11-02
 */

'use strict';

var fs = require('fs');

var instance;

function PagesModel(config){
	this._items = [];
	this._init(config);
	this._filePath;
}

PagesModel.prototype = {
	_init : function(conf){
		//console.log(conf);
		var pagesFile = conf.pagesFile;
		if(!fs.existsSync(pagesFile)){
			console.log('file' + pagesFile + ' not exists');
			process.exit(-3);
		}
		this._filePath = pagesFile;
		var data = fs.readFileSync(pagesFile);
		var obj = JSON.parse(data);
		//TODO construct the statistic object array
		//console.log(obj);
		this._items = obj;
	}, 
	save : function(){
		if(!this._filePath || !fs.existsSync(this._filePath)){
			console.log('data file not exists in ' + __filename);
			process.exit(-4);
		}
		//save data to file
		fs.writeFileSync(this.__filename, JSON.stringify(this._items));
	}, 
	getAllPages : function(){
		return this._items.data.slice(0);
	}
};

exports.getInstance = function(config){
	if(!instance){
		instance = new PagesModel(config);
	}
	return instance;
};