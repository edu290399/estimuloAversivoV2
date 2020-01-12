var importExp= require("../controllers/exp");
var importAtrasoB = importExp.atrasoB;

module.exports.intro = function(app, req, res){
	var lastConfigModel = require("../model/configModel");
	res.render('intro',{txt02:lastConfigModel.vars.txtDb02 });
}

module.exports.fim = function(app, req, res){
	res.render('fim');
}

module.exports.index = function(app, req, res){
	var lastConfigModel = require("../model/configModel");
	res.render('index',{txt01:lastConfigModel.vars.txtDb01 });
}

module.exports.exp = function(app, req, res){
	res.render('exp',{atrasoB : importAtrasoB});
}

module.exports.expForc = function(app, req, res){
	res.render('expForc',{atrasoB: importAtrasoB});
}

module.exports.sairDescanso= function(app, req, res){
	console.log("Exp Forc apos descanso, com atrasoB = "+importAtrasoB);
	res.render('expForc',{atrasoB: importAtrasoB});
}

module.exports.configRender = function(app, req, res){
	res.render('config');
}

module.exports.buscaSujeito = function(app, req, res){
	res.render('buscaSujeito');
}


