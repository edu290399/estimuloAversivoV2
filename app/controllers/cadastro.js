module.exports.condicao = function(app,req,res){ 
    var sujeito = req.body;
    
    req.assert('nome','Inserir nome').notEmpty();
    req.assert('idade','Inserir idade').notEmpty();
    req.assert('sexo','Inserir sexo').notEmpty();


    var connection  = app.config.connection();
    var sujeitoModel = app.app.models.sujeitoModel;
    if (sujeito.condicao11){
    sujeito.condicao = 1.1;
    delete sujeito.condicao11;
    sujeitoModel.cadastro11(sujeito, connection, function(error, result){
        res.render('condicao11',{ validacao: [], err: ''});
    });      
    }
    if(sujeito.condicao12){
        sujeito.condicao = 1.2;
        delete sujeito.condicao12;
        sujeitoModel.cadastro12(sujeito, connection, function(error, result){
            res.render('condicao12',{ validacao: [], err: ''});
        });
    }
    if(sujeito.condicao21){
        sujeito.condicao = 2.1;
        delete sujeito.condicao21;
        sujeitoModel.cadastro21(sujeito, connection, function(error, result){
            res.render('condicao21',{ validacao: [], err: ''});
        });
    }
    if(sujeito.condicao22){
        sujeito.condicao = 2.2;
        delete sujeito.condicao22;
        sujeitoModel.cadastro22(sujeito, connection, function(error, result){
            res.render('condicao22',{ validacao: [], err: ''});
        });
    }         
}
module.exports.cadastro1= function(app,req,res){
    var sujeito = req.body;
        req.assert('nome','Inserir nome').notEmpty();
        req.assert('idade','Inserir idade').notEmpty();
        req.assert('sexo','Inserir sexo').notEmpty();
       
        var erros = req.validationErrors();
        if(erros){
            res.render('cadastro',{validacao: erros, cadastro: sujeito});
            return;
        }

        var connection  = app.config.connection();
        var sujeitoModel = app.app.models.sujeitoModel;

        sujeitoModel.cadastro1(sujeito, connection, function(error, result){
            res.redirect('info1');
        });
}

module.exports.cadastro2= function(app,req,res){
    var sujeito = req.body;
        req.assert('nome','Inserir nome').notEmpty();
        req.assert('idade','Inserir idade').notEmpty();
        req.assert('sexo','Inserir sexo').notEmpty();
       
        var erros = req.validationErrors();
        if(erros){
            res.render('cadastro',{validacao: erros, cadastro: sujeito});
            return;
        }

        var connection  = app.config.connection();
        var sujeitoModel = app.app.models.sujeitoModel;

        sujeitoModel.cadastro2(sujeito, connection, function(error, result){
            res.redirect('info2');
        });
}

module.exports.cadastro = function(app, req, res){
	res.render('cadastro');
}

module.exports.cadastrar = function(app, req, res){
	res.render('index');
}