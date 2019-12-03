module.exports = function(app){

    app.post('/buscaSujeito',function(req,res){
		app.app.model.sujeitoModel.buscaSujeito(app,req,res);
	});

    app.post('/buscaConfigDefinida',function(req,res){
		var IdConfig = req.body.IdConfig;
		app.app.model.buscaModel.buscaConfigDefinida(app,req,res,IdConfig);
	});
    
}