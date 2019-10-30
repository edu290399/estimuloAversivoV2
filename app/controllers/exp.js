var contPasso = 1;
var contRepet = 0;

module.exports.envExpA = function(app, req, res){

	//Verifica qual o atual passo do teste
	console.log("Passo: "+contPasso);
	contPasso++;

	if (contPasso==3){
		res.render('aguarde');
		contPasso = 1;
		contRepet++;
		console.log("Repet: "+contRepet);
	}
	//Verifica qual a atual repeticao do teste
	if(contRepet==6){
		console.log("fim do experimento");
		contRepet=0;
	}



}




module.exports.envExpB = function(app, req, res){

	//Verifica qual o atual passo do teste
	console.log("Passo: "+contPasso);
	contPasso++;

	if (contPasso==3){
		res.render('aguarde');
		contPasso = 1;
		contRepet++;
		console.log("Repet: "+contRepet);
	}

	//Verifica qual a atual repeticao do teste
	if(contRepet==6){
		console.log("fim do experimento");
		contRepet=0;
	}


}


module.exports.continuar = function(app, req, res){
	if(contRepet<2){
		res.render('expForc');
	}else{
		res.render('exp');
	}

}
