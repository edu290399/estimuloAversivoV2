module.exports = function(app){
	app.get('/index',function(req,res){
		app.app.controllers.render.index(app,req,res);
	});

	app.get('/fim',function(req,res){
		app.app.controllers.render.fim(app,req,res);
	});

	app.get('/',function(req,res){
		app.app.controllers.cadastro.cadastro(app,req,res);
	});

	app.post('/intro',function(req,res){
		app.app.controllers.render.intro(app,req,res);
	});

	app.get('/exp',function(req,res){
		app.app.controllers.render.exp(app,req,res);
	});

	app.get('/expForc',function(req,res){
		app.app.controllers.render.expForc(app,req,res);
	});
}