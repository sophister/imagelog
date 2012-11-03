/**
 * 每一个统计项class
 * @author Jess
 * @date 2012-11-02
 */

 'use strict';

 function StatisticItem(arg){
 	for(var i in arg){
 		if(arg.hasOwnProperty(i)){
 			this[i] = arg[i];
 		}
 	}
 }

 StatisticItem.prototype = {
 	getID : function(){
 		return this.id;
 	}, 
 	getName : function(){
 		return this.name;
 	}, 
 	getDescription : function(){
 		return this.description;
 	}, 
 	getAuthorName : function(){
 		return this.author;
 	}, 
 	getCreateDate : function(){
 		return this.createDate;
 	}, 
 	getUpdateData : function(){
 		return this.updateDate;
 	},
 	getPageIndex : function() {
 		return this.pageIndex;
 	}, 
 	setName : function(name){
 		this.name = name;
 	}, 
 	setDescription : function(d){
 		this.description = d;
 	}, 
 	setAuthorName : function(a){
 		this.author = a;
 	}, 
 	setCreateDate : function(d){
 		this.createDate = d;
 	}, 
 	setUpdateData : function(d){
 		this.updateDate = d;
 	},
 	setPageIndex : function(i) {
 		this.pageIndex = i;
 	}
 };

 exports.Statistic = StatisticItem;