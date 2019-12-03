module.exports.intro = function(app, req, res){
	res.render('intro');
	var lastConfigModel = require("../model/configModel");
	lastConfigModel.lastConfigJS();
}

module.exports.index = function(app, req, res){
	res.render('index');
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
