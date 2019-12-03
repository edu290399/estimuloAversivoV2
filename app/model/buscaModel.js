module.exports.buscaConfigDefinida = function(app,req,res,idConfig){
    var sqliteSync = require('sqlite-sync');
    sqliteSync.connect("./dataBase/estimuloAversivoV2.db");
    var rows = sqliteSync.run("SELECT * FROM config where idConfig = ('"+ idConfig + "')");
    if(rows[0].difOn == 1){
        rows[0].difOn = "Sim";
    }else{
        rows[0].difOn = "Não";
        rows[0].difMin = " - ";
    }
    sqliteSync.close;
    res.render('buscaConfig',{config:rows});
  }