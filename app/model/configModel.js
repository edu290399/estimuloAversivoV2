module.exports.configurar = function(app,req,res){ 
  
 
    

    //var sujeito = req.body;
    var db = require('../../config/connection');
    db.conectar.serialize(() => {
      db.conectar.each("DELETE FROM config","INSERT INTO config ('difOn','difMin') VALUES ('"
       + sujeito.nome + "', '" + sujeito.idade + "', '" + sujeito.sexo + "' );",
      console.log("DifOn:  " + sujeito.nome + "  /   DifMin: " + sujeito.sexo ),
      db.conectar.close,console.log("--> Conexao encerrada <--"),
       (err, row) => {
        if (err) {
          console.error(err.message);
          return;
        }
      }),res.render('config');
    });

}