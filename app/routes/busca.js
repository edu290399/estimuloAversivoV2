module.exports = function(app){

    app.post('/buscaSujeito',function(req,res){
		app.app.model.sujeitoModel.buscaSujeito(app,req,res);
	});

    app.post('/buscaConfigDefinida',function(req,res){
		var IdConfig = req.body.IdConfig;
		app.app.model.buscaModel.buscaConfigDefinida(app,req,res,IdConfig);
	});

	app.post('/buscaExpSujeito',function(req,res){
		var IdSujeito = req.body.IdSujeito;
		app.app.model.buscaModel.buscaExpSujeito(app,req,res,IdSujeito);
	});

	app.post('/buscaExp',function(req,res){
		app.app.model.buscaModel.buscaExp(app,req,res);
	});
    
}