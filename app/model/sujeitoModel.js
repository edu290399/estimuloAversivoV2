 module.exports.cadastrar = function(app,req,res){ 
  
 
        // open the database

        var sujeito = req.body;
        var db = require('../../config/connection');
        db.conectar.serialize(() => {
          db.conectar.each("INSERT INTO sujeitos ('nome','idade','sexo') VALUES ('"
           + sujeito.nome + "', '" + sujeito.idade + "', '" + sujeito.sexo + "' );",
          console.log("DADOS: nome, idade, sexo ------> " + sujeito.nome + " / " + sujeito.idade + " / " + sujeito.sexo ),
          db.conectar.close,console.log("--> Conexao encerrada <--"),
           (err, row) => {
            if (err) {
              console.error(err.message);
              return;
            }
          }),res.render('index');
        });

    }