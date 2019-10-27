
const sqlite3 = require('sqlite3').verbose();
module.exports.conectar = new sqlite3.Database('./dataBase/estimuloAversivoV2.db', sqlite3.OPEN_READWRITE,
console.log('Connected to the estimuloAversivoV2 database.'),
 (err) => {
    if (err) {
        console.error(err.message); 
    }
  });



 
