var db = require('../../config/connection');
var sqliteSync = require('sqlite-sync');
module.exports.configurar = function(app,req,res){ 
    var config = req.body;
    var mensagem = config.difOn;
    var txt01 = config.txtguia01;
    var txt02 = config.txtguia02;
    var som = config.som;
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
    db.conectar.serialize(() => {
      db.conectar.each("INSERT INTO config ('difOn','difMin','txt01', 'txt02' , 'som') VALUES ('"
       + ligadoDB + "', '" + tempoDB + "', '" + txt01 + "', '" + txt02 + "', '" + som + "')",
      console.log("DifOn:  " + ligadoDB + "  /   DifMin: " + config.difMin + " /  SOM: " + som ),
      db.conectar.close,console.log("--> Conexao encerrada <--"),
       (err, row) => {
        if (err) {
          console.error(err.message);
          return;
        }}),res.render('config',{difOnTd:ligadoRender,difMinTd:tempoRender,txtTd01:txt01,txtTd02:txt02,somTd:som});
    });
}

module.exports.lastConfig = function(app,req,res){ 
  sqliteSync.connect("./dataBase/estimuloAversivoV2.db");
  var rows = sqliteSync.run("SELECT * FROM config ORDER BY idConfig desc limit 1;");
  if(rows.length > 0){    
    var difMinDB;
    var difOnDB;
    var txtDb01;
    var txtDb02;
    var somDb;
    difMinDB = rows[0].difMin;
    difOnDB = rows[0].difOn;
    txtDb01 = rows[0].txt01;
    txtDb02 = rows[0].txt02;
    somDb = rows[0].som;
    if(difOnDB == 1){
      difOnDB = "sim";
    }else{
      difOnDB = "não";
      difMinDB = " - "
    };
    res.render('config',{difOnTd:difOnDB,difMinTd:difMinDB,txtTd01:txtDb01,txtTd02:txtDb02, somTd:somDb});
    sqliteSync.close;
  }else{
    res.render('config',{difOnTd:"Não configurado",difMinTd:"Não configurado",somTd: "Não configurado",txtTd01:"Não configurado",txtTd02:"Não configurado"});
  }
}

module.exports.lastConfigJS = function(){ 
  sqliteSync.connect("./dataBase/estimuloAversivoV2.db");
  var rows = sqliteSync.run("SELECT * FROM config ORDER BY idConfig desc limit 1;");
  difMinExpo = (rows[0].difMin);
  difOnExpo = (rows[0].difOn);
  txtDb01 = (rows[0].txt01);
  txtDb02 = (rows[0].txt02);
  somDb = (rows[0].som);
  sqliteSync.close;
  return module.exports.vars =  {difOnExpo,difMinExpo,txtDb01,txtDb02,somDb};
}


