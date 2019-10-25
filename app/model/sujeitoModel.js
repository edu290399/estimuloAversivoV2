 module.exports.cadastrar = function(app,req,res){ 
  
        const sqlite3 = require('sqlite3').verbose();
        var sujeito = req.body;
        // open the database
        let db = new sqlite3.Database('./dataBase/estimuloAversivoV2.db', sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
            console.error(err.message); 
          }
          console.log('Connected to the estimuloAversivoV2 database.');
        });
         
        db.serialize(() => {
          db.each("INSERT INTO sujeitos ('nome','idade','sexo') VALUES ('"
           + sujeito.nome + "', '" + sujeito.idade + "', '" + sujeito.sexo + "' );",
    
          console.log("INSERIDO: nome, idade, sexo ------> " + sujeito.nome + " / " + sujeito.idade + " / " + sujeito.sexo ),
           (err, row) => {
            if (err) {
              console.error(err.message);
            }
    
          });
        });
         
        db.close((err) => {
          if (err) {
            console.error(err.message);
          }
          console.log('Close the database connection.');
        });
    
        res.redirect('index');
    }