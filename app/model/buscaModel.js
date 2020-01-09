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

  module.exports.buscaExpSujeito = function(app,req,res,idSujeito){
    var sqliteSync = require('sqlite-sync');
    sqliteSync.connect("./dataBase/estimuloAversivoV2.db");
    var rows = sqliteSync.run("SELECT * FROM sujeitos where id = ('"+ idSujeito + "')");
    sqliteSync.close;
    res.render('buscaSujeito',{sujeito:rows});
  }

  module.exports.buscaExp = function(app,req,res){
    var sqliteSync = require('sqlite-sync');
    sqliteSync.connect("./dataBase/estimuloAversivoV2.db");
    var rows = sqliteSync.run("SELECT * FROM experimento ORDER BY id desc");
    for(var cont=0;cont<rows.length;cont++){
      if(rows[cont].omissao == 1){
        rows[cont].omissao = "Sim";
      }else{
        rows[cont].omissao = "Não";
      }
    }
    sqliteSync.close;
    res.render('buscaResultado',{experimento:rows});
  }