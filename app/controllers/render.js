module.exports.intro = function(app, req, res){
	res.render('intro');
}

module.exports.index = function(app, req, res){
	res.render('index');
}

module.exports.exp = function(app, req, res){
	res.render('exp',{atrasoB : 10});
}

module.exports.expForc = function(app, req, res){
	res.render('expForc',{atrasoB: 10});
}

module.exports.configRender = function(app, req, res){
	res.render('config');
}
