
module.exports.configurar = function(app,req,res){ 
    var config = req.body;
    var mensagem = config.difOn;
    var txt01 = config.txtguia01;
    var txt02 = config.txtguia02;
    var ligadoDB;
    var ligadoRender;
    var tempoDB = config.difMin;
    var tempoRender;
    if( mensagem == "on" ){
      ligadoDB = 1;
      ligadoRender = "sim";
      tempoRender = tempoDB;
    }else{
      ligadoDB = 0;
      ligadoRender = "não";
      tempoRender = " - ";
    }
    var db = require('../../config/connection');
    db.conectar.serialize(() => {
      db.conectar.each("INSERT INTO config ('difOn','difMin','txt01', 'txt02') VALUES ('"
       + ligadoDB + "', '" + tempoDB + "', '" + txt01 + "', '" + txt02 + "')",
      console.log("DifOn:  " + ligadoDB + "  /   DifMin: " + config.difMin ),
      db.conectar.close,console.log("--> Conexao encerrada <--"),
       (err, row) => {
        if (err) {
          console.error(err.message);
          return;
        }}),res.render('config',{difOnTd:ligadoRender,difMinTd:tempoRender,txtTd01:txt01,txtTd02:txt02});
    });
}

module.exports.lastConfig = function(app,req,res){ 
  var sqliteSync = require('sqlite-sync');
  sqliteSync.connect("./dataBase/estimuloAversivoV2.db");
  var rows = sqliteSync.run("SELECT * FROM config ORDER BY idConfig desc limit 1;");    
  var difMinDB;
  var difOnDB;
  var txtDb01;
  var txtDb02;
      difMinDB = rows[0].difMin;
      difOnDB = rows[0].difOn;
      txtDb01 = rows[0].txt01;
      txtDb02 = rows[0].txt02
      if(difOnDB == 1){
        difOnDB = "sim";
      }else{
        difOnDB = "não";
        difMinDB = " - "
      };
      res.render('config',{difOnTd:difOnDB,difMinTd:difMinDB,txtTd01:txtDb01,txtTd02:txtDb02});
      sqliteSync.close;
}

module.exports.lastConfigJS = function(){ 

  var sqliteSync = require('sqlite-sync');
  sqliteSync.connect("./dataBase/estimuloAversivoV2.db");
  var rows = sqliteSync.run("SELECT * FROM config ORDER BY idConfig desc limit 1;");
  difMinExpo = (rows[0].difMin);
  difOnExpo = (rows[0].difOn);
  txtDb01 = (rows[0].txt01);
  txtDb02 = (rows[0].txt02);
  sqliteSync.close;
  return module.exports.vars =  {difOnExpo,difMinExpo,txtDb01,txtDb02};
}


