module.exports = function(app){

app.post('/envExpA',function(req,res){
    app.app.controllers.exp.envExpA(app,req,res);
});

app.post('/envExpB',function(req,res){
    app.app.controllers.exp.envExpB(app,req,res);
});

}