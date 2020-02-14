var importExp = require("../controllers/exp");
var importAtrasoB;
var som;
var importConfig = require("../model/configModel");
var lastConfigModel = require("../model/configModel");

module.exports.intro = function(app, req, res){
	res.render('intro',{txt02:lastConfigModel.vars.txtDb02 });
}

module.exports.fim = function(app, req, res){
	res.render('fim');
}

module.exports.index = function(app, req, res){
	res.render('index',{txt01:lastConfigModel.vars.txtDb01 });
}

module.exports.exp = function(app, req, res){
	som = importConfig.vars.somDb;
	importAtrasoB = importExp.atrasoB;
	res.render('exp',{atrasoB : importAtrasoB , som: som});
}

module.exports.expForc = function(app, req, res){
	som = importConfig.vars.somDb;
	importAtrasoB = importExp.atrasoB;
	res.render('expForc',{atrasoB: importAtrasoB , som : som});
	console.log("SOM: "+som);
	console.log("Atraso de B DESCANSO: ",importAtrasoB);
}

module.exports.configRender = function(app, req, res){
	res.render('config');
}

module.exports.buscaSujeito = function(app, req, res){
	res.render('buscaSujeito');
}


