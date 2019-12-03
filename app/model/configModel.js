
module.exports.configurar = function(app,req,res){ 
    var config = req.body;
    var mensagem = config.difOn;
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
      db.conectar.each("INSERT INTO config ('difOn','difMin') VALUES ('"
       + ligadoDB + "', '" + tempoDB + "')",
      console.log("DifOn:  " + ligadoDB + "  /   DifMin: " + config.difMin ),
      db.conectar.close,console.log("--> Conexao encerrada <--"),
       (err, row) => {
        if (err) {
          console.error(err.message);
          return;
        }}),res.render('config',{difOnTd:ligadoRender,difMinTd:tempoRender});
    });
}

module.exports.lastConfig = function(app,req,res){ 
  var db = require('../../config/connection');
  db.conectar.serialize(() => {
    db.conectar.all("SELECT * FROM config ORDER BY idConfig desc limit 1",[],
    (err,rows) => {
      
      var difMinDB;
      var difOnDB;
      rows.forEach((row) => {
      difMinDB = row.difMin;
      difOnDB = row.difOn;
      });
      if(difOnDB == 1){
        difOnDB = "sim";
      }else{
        difOnDB = "não";
        difMinDB = " - "
      };
      res.render('config',{difOnTd:difOnDB,difMinTd:difMinDB});

    }),db.conectar.close,console.log("--> Conexao encerrada config <--");
  });
}

module.exports.lastConfigJS = function(){ 

  var sqliteSync = require('sqlite-sync');
  sqliteSync.connect("./dataBase/estimuloAversivoV2.db");
  var rows = sqliteSync.run("SELECT * FROM config ORDER BY idConfig desc limit 1;");
  difMinExpo = (rows[0].difMin);
  difOnExpo = (rows[0].difOn);
  return module.exports.vars =  {difOnExpo,difMinExpo};
}


