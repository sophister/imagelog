/**
 * 负责对统计项的CRUD操作
 * @author Jess
 * @date 2012-11-02
 */

'use strict';

var fs = require('fs');
var Statistic = require('./StatisticItem').Statistic;


var instance;

function StatisticModel(config){
	this._items = {};
	this._filePath;
	this._init(config);
}

StatisticModel.prototype = {
	_init : function(conf){
		var itemsFile = conf.itemsFile, data, obj;
		this._read(itemsFile);
	}, 
	//从文件中读取数据
	_read : function(itemsFile){
		if(!fs.existsSync(itemsFile)){
			//数据文件不存在，重新创建
			//process.exit(-3);
			var fd = fs.openSync(itemsFile, 'w');
			//fs.writeSync(itemsFile, 'W', JSON.stringify({year:new Date().getFullYear(), data : []}));
			//console.log(fd);
		}
		this._filePath = itemsFile;
		var data = fs.readFileSync(itemsFile), obj;
		try{
			obj = JSON.parse(data);
		}catch(e){
			obj = {year:new Date().getFullYear(), data : []};
		}
		//TODO construct the statistic object array
		this._items = obj;
		var data = obj.data, i, len;
		for(i = 0, len = data.length; i < len; i++){
			data[i] = new Statistic(data[i]);
		}
	}, 
	save : function(callback){
		if(!this._filePath || !fs.existsSync(this._filePath)){
			console.log('data file not exists in ' + __filename);
			process.exit(-4);
		}
		//console.log(11111);
		//save data to file
		fs.writeFileSync(this._filePath, JSON.stringify(this._items));
		//this._read(this._filePath);
		//console.log(this.__filename);
		// fs.writeFile(this._filePath, JSON.stringify(this._items), function(err){
		// 	console.log(err);
		// });
	}, 
	getAllItems : function(){
		return this._items.data.slice(0);
	}, 
	/**
	 * 增加一条统计数据
	 * @param {
		name : '',	//统计项名称
		description : '', //统计项描述
		calc : '', 		//计算方法
		author : '', 	//作者
		pageIndex : 1	//该统计对应的页面ID
	 }
	 */
	addItem : function(param, callback){
		var name = param.name, desc = param.description, 
			pageIndex = param.pageIndex, obj;
		if(name.trim() === '' || desc.trim() === '' || parseInt(pageIndex) < 0){
			//统计项的必填字段不合法
			return {status : false, msg : '统计项名称、描述为空，或者找不到对应页面'} ;
		}
		var id = this._items.data.length;

		obj = new Statistic({
			id : id, 
			name : name, 
			calc : param.calc, 
			description : desc, 
			author : param.author, 
			pageIndex : pageIndex, 
			createDate : new Date, 
			updateDate : 0
		});
		if(this.exists(obj)){
			return {status : false, msg : '该统计项已经存在，不允许有相同的统计项名'};
		}else{
			this._items.data.push(obj);
			//console.log(this._items);
		}
		this.save(callback);
		return {status : true, msg : '保存成功'};
	}, 
	//判断某个统计项是否已经存在
	exists : function(item){
		var exists = false, pageIndex = item.getPageIndex(), name = item.getName(), data = this._items.data, 
			len = data.length - 1, obj;
		while(len >= 0){
			obj = data[len];
			//TODO 此处判断统计项是否相同的条件
			if(pageIndex === obj.getPageIndex() && name === obj.getName()){
				exists = true;
				break;
			}
			len--;
		};
		return exists;
	}
};

exports.getInstance = function(config){
	if(!instance){
		instance = new StatisticModel(config);
	}
	return instance;
};