var contPasso = 1;
var contRepet = 0;
var tempoFuga = 10000;
var flag = 0;
var contA = 0;
var contB = 0;

function sleep(time) {
	return new Promise(function sleeper(resolve) {
	  setTimeout(resolve, time)
	})
  }


 function contTempoFuga() {
	
	setTimeout(function(){
		if(tempoFuga>0 && flag == 1){
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
	console.log("Passo Antes: "+contPasso);
	contPasso++;
	console.log("Passo Agora: "+contPasso);
	if(contPasso==2){
			flag = 1 - flag;
			contTempoFuga();
			setTimeout(function(){
				if(flag == 1){
					res.render('aguarde',{ITI:(40 * 1000)});
					contPasso = 1;
					contRepet++;
					tempoFuga = 10000;
					contA += 1;
					console.log("Repet: "+contRepet);
					console.log("------>TEMPO COMPLETO<------");
					return;
				}else{
					return;
				}
			},10 * 1000)
		}	


	if (contPasso==3){
		flag = 0;
		res.render('aguarde',{ITI: (25000 + tempoFuga )});
		contPasso = 1;
		contRepet++;
		contA += 1;
		console.log("RENDENRIZANDO: 25 +"+tempoFuga/1000);
		console.log("Repet: "+contRepet);
		tempoFuga = 10 * 1000;
	}

	//Verifica qual a atual repeticao do teste
	if(contRepet==6){
		console.log("fim do experimento");
		contRepet=0;
		contA = 0;
		contB = 0;
	}


}

module.exports.envExpB = function(app, req, res){
	contB += 1; 
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
		contA = 0;
		contB = 0;
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

