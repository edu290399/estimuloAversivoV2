var contPasso = 1;
var contRepet = 0;

function sleep(time) {
	return new Promise(function sleeper(resolve) {
	  setTimeout(resolve, time)
	})
  }


 function contTempoFuga() {
	
	setTimeout(function(){
		if(tempoFuga>0){
			console.log(tempoFuga);
			tempoFuga -= 100;
			return contTempoFuga();
		}
		else{
			return;
		}
	},95);
}

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
	tempoFuga = 10000;
	//Verifica qual o atual passo do teste
	console.log("Passo Antes: "+contPasso);
	contPasso++;
	console.log("Passo Agora: "+contPasso);
	if(contPasso==2){

			contTempoFuga();
			setTimeout(function(){
			res.render('aguarde',{ITI:(40 * 1000)});
			contPasso = 1;
			contRepet++;
			console.log("Repet: "+contRepet);
			console.log("------>TEMPO COMPLETO<------");
			return;
			},10 * 1000)
		}	


	if (contPasso==3){
		res.render('aguarde',{ITI: 25});
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



// module.exports.envExpBComp = function(app, req, res){

// 	//Verifica qual o atual passo do teste
// 	console.log("ENTROU");
// 	contPasso++;

// 	if (contPasso==3){
// 		res.render('aguarde',{ITI:(40 * 1000)});
// 		contPasso = 1;
// 		contRepet++;
// 		console.log("Repet: "+contRepet);
// 		console.log("------>TEMPO COMPLETO<------");
// 	}

// 	//Verifica qual a atual repeticao do teste
// 	if(contRepet==6){
// 		console.log("fim do experimento");
// 		contRepet=0;
// 	}


// }


module.exports.continuar = function(app, req, res){
	if(contRepet<2){
		res.render('expForc');
	}else{
		res.render('exp');
	}

}

