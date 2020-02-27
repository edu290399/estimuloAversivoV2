module.exports = function(app){

app.post('/envExpA',function(req,res){
    app.app.controllers.exp.envExpA(app,req,res,"TREINO");
    console.log(req.body);
});

app.post('/envExpB',function(req,res){
    app.app.controllers.exp.envExpB(app,req,res,"TREINO");
    console.log(req.body);
});

app.post('/envExpATeste',function(req,res){
    app.app.controllers.exp.envExpA(app,req,res,"TESTE");
});

app.post('/envExpBTeste',function(req,res){
    app.app.controllers.exp.envExpB(app,req,res,"TESTE");
});

// app.post('/envExpBComp',function(req,res){
//     app.app.controllers.exp.envExpBComp(app,req,res,"TREINO");
// });



app.get('/continuar',function(req,res){
    app.app.controllers.exp.continuar(app,req,res,"TREINO");
});

app.get('/continuarTeste',function(req,res){
    app.app.controllers.exp.continuar(app,req,res,"TESTE");
});

app.get('/sairDescanso',function(req,res){
    app.app.controllers.render.sairDescanso(app,req,res);
});

}