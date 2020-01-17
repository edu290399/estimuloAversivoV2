module.exports.enviarDbA = function(bloco,tentativa,ITI,atrasoB,fase,escolha,omissao){ 
    var ultimoId;
    var lastConfig;
    var db = require('../../config/connection');
    db.conectar.serialize(() => {
        db.conectar.all("SELECT id,config FROM sujeitos ORDER BY id desc limit 1",[],
        (err,rows) => {
          rows.forEach((row) => {
            ultimoId = row.id;
            lastConfig = row.config
            console.log("ULTIMO ID ----> " + ultimoId);
            db.conectar.each("INSERT INTO experimento ('idSujeito','bloco','tentativa','opcao','ITI','atrasoB','fase','config','escolha','omissao') VALUES ('"
            + ultimoId + "', '" + (bloco+1) + "', '" + (tentativa+1) + "', '" + "A" + "', '" + ITI + "', '" + atrasoB + "', '" + fase + "', '" + lastConfig + "', '" + (escolha/1000) + "', '" + omissao + "' );",
            db.conectar.close,console.log("--> Conexao encerrada <--"),
            (err, row) => {
                if (err) {
                    console.error(err.message);
                return;
                }
            });
         });  
        });
    });

}



module.exports.enviarDbB = function(bloco,tentativa,ITI,atrasoB,fase,escolha,omissao){ 
    var ultimoId;
    var lastConfig;
    var db = require('../../config/connection');
    db.conectar.serialize(() => {
        db.conectar.all("SELECT id,config FROM sujeitos ORDER BY id desc limit 1",[],
        (err,rows) => {
          rows.forEach((row) => {
            ultimoId = row.id;
            lastConfig = row.config
            console.log("ULTIMO ID ----> " + ultimoId);
            db.conectar.each("INSERT INTO experimento ('idSujeito','bloco','tentativa','opcao','ITI','atrasoB','fase','config','escolha','omissao') VALUES ('"
            + ultimoId + "', '" + (bloco+1) + "', '" + (tentativa+1) + "', '" + "B" + "', '" + ITI + "', '" + atrasoB + "', '" + fase + "', '" + lastConfig + "', '" + (escolha/1000) + "', '" + omissao +  "' );",
            db.conectar.close,console.log("--> Conexao encerrada <--"),
            (err, row) => {
                if (err) {
                    console.error(err.message);
                return;
                }
            });
         });  
        });
    });

}

module.exports.enviarDbVazio = function(bloco,tentativa,atrasoB,fase,escolha,omissao){ 
    var ultimoId;
    var lastConfig;
    var db = require('../../config/connection');
    db.conectar.serialize(() => {
        db.conectar.all("SELECT id,config FROM sujeitos ORDER BY id desc limit 1",[],
        (err,rows) => {
          rows.forEach((row) => {
            ultimoId = row.id;
            lastConfig = row.config
            console.log("ULTIMO ID ----> " + ultimoId);
            db.conectar.each("INSERT INTO experimento ('idSujeito','bloco','tentativa','opcao','ITI','atrasoB','fase','config','escolha','omissao') VALUES ('"
            + ultimoId + "', '" + (bloco+1) + "', '" + (tentativa+1) + "', '" + "-" + "', '" + 0 + "', '" + atrasoB + "', '" + fase + "', '" + lastConfig + "', '" + (escolha/1000) + "', '" + omissao +  "' );",
            db.conectar.close,console.log("--> Conexao encerrada <--"),
            (err, row) => {
                if (err) {
                    console.error(err.message);
                return;
                }
            });
         });  
        });
    });

}
