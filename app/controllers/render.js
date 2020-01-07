module.exports.intro = function(app, req, res){
	var lastConfigModel = require("../model/configModel");
	res.render('intro',{txt02:lastConfigModel.vars.txtDb02 });
	
}

module.exports.index = function(app, req, res){
	var lastConfigModel = require("../model/configModel");
	res.render('index',{txt01:lastConfigModel.vars.txtDb01 });
}

module.exports.exp = function(app, req, res){
	res.render('exp',{atrasoB : 10});
}

module.exports.expVariavel = function(app, req, res,atrasoB){
	res.render('exp',{atrasoB : atrasoB});
}

module.exports.expForc = function(app, req, res){
	res.render('expForc',{atrasoB: 10});
}

module.exports.configRender = function(app, req, res){
	res.render('config');
}

module.exports.buscaSujeito = function(app, req, res){
	res.render('buscaSujeito');
}