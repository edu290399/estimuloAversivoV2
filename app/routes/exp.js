module.exports = function(app){

app.post('/envExpA',function(req,res){
    app.app.controllers.exp.envExpA(app,req,res);
});

app.post('/envExpB',function(req,res){
    app.app.controllers.exp.envExpB(app,req,res);
});

app.post('/envExpBComp',function(req,res){
    app.app.controllers.exp.envExpBComp(app,req,res);
});


app.get('/continuar',function(req,res){
    app.app.controllers.exp.continuar(app,req,res);
});

}