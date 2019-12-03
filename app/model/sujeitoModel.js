 module.exports.cadastrar = function(app,req,res){ 
  
 
        // open the database

        var sujeito = req.body;
        var lastConfig;
        var db = require('../../config/connection');
        db.conectar.serialize(() => {
          db.conectar.all("SELECT idConfig FROM config ORDER BY idConfig desc limit 1",[],
          (err,rows) => {
            rows.forEach((row) => {
              lastConfig = row.idConfig;
              console.log("LAST ID CONFIG ----> " + lastConfig);
              db.conectar.each("INSERT INTO sujeitos ('nome','idade','sexo','config') VALUES ('"
              + sujeito.nome + "', '" + sujeito.idade + "', '" + sujeito.sexo + "', '" + lastConfig +  "' );",
              console.log("DADOS: nome, idade, sexo ------> " + sujeito.nome + " / " + sujeito.idade + " / " + sujeito.sexo ),
              db.conectar.close,console.log("--> Conexao encerrada <--"),
              (err, row) => {
                if (err) {
                  console.error(err.message);
                return;
                }
              }),res.render('index');
            });
          });
        })
 }
    