module.exports = function(app){

    app.post('/cadastrar',function(req,res){
        app.app.model.sujeitoModel.cadastrar(app,req,res);
    });
    
}