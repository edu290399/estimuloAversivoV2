module.exports = function(app){

	app.post('/intro',function(req,res){
		app.app.controllers.index.intro(app,req,res);
	});

	app.get('/index',function(req,res){
		app.app.controllers.index.index(app,req,res);
	});

	app.get('/',function(req,res){
		app.app.controllers.cadastro.cadastro(app,req,res);
	});

	app.get('/exp',function(req,res){
		app.app.controllers.index.exp(app,req,res);
	});

	app.post('/cadastrar',function(req,res){
		app.app.controllers.cadastro.cadastrar(app,req,res);
	});





}