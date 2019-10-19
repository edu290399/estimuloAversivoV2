module.exports = function(app){

	app.post('/intro',function(req,res){
		app.app.controllers.index.intro(app,req,res);
	});

	app.get('/index',function(req,res){
		app.app.controllers.index.index(app,req,res);
	});

	app.get('/',function(req,res){
		app.app.controllers.index.index(app,req,res);
	});



}