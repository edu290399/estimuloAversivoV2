module.exports = function(app){

    app.post('/cadastrar',function(req,res){
        app.app.model.sujeitoModel.cadastrar(app,req,res);
    });

    app.post('/config',function(req,res){
        app.app.controllers.render.configRender(app,req,res);
    });
    
}