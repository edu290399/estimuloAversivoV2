module.exports = function(){

    this.getSujeito = function(connection, callback){
        connection.query('select * from sujeitos ORDER BY nome',callback);
    }

    this.cadastro11 = function(sujeito, connection, callback){
        connection.query('insert into sujeitos set ?', sujeito);
        connection.query('insert into sujeitos set condicao', "1.1",callback);
    }
    this.cadastro12 = function(sujeito, connection, callback){
        connection.query('insert into sujeitos set ?', sujeito);
        connection.query('insert into sujeitos set condicao', "1.2",callback);
    }
    this.cadastro21 = function(sujeito, connection, callback){
        connection.query('insert into sujeitos set ?', sujeito);
        connection.query('insert into sujeitos set condicao', "2.1",callback);
    }

    this.cadastro22 = function(sujeito, connection, callback){
        connection.query('insert into sujeitos set ?', sujeito);
        connection.query('insert into sujeitos set condicao', "2.2",callback);
    }

   

    return this;
  
}