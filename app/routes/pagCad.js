module.exports = function(app){

    app.post('/cadastrar',function(req,res){
        app.app.model.sujeitoModel.cadastrar(app,req,res);
    });

    app.post('/config',function(req,res){
        app.app.model.configModel.lastConfig(app,req,res);
    });

    app.post('/configurar',function(req,res){
        app.app.model.configModel.configurar(app,req,res);
    });

}