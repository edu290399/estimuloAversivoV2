var contPasso = 1;
var contRepet = 5;
var contBloco = 1;
var difAtraso = new Array(5);
var tempoFuga = 10000;
var flag = 0;
var contA = 0;
var contB = 0;
var atrasoA = 5;
var atrasoB = 10;
var maior = 0;
var maiorPos = 0;
var menor = 0;
var menorPos = 0;

function reinicia(){
	var contPasso = 1;
	var contRepet = 5;
	var contBloco = 1;
	var tempoFuga = 10000;
	var flag = 0;
	var contA = 0;
	var contB = 0;
	var atrasoA = 5;
	var atrasoB = 10;
	var maior = 0;
	var maiorPos = 0;
	var menor = 0;
	var menorPos = 0;
	console.log("Reiniciando variaveis...")
}

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
			tempoFuga = 10 * 1000;
			flag = 1 - flag;
			setTimeout(contTempoFuga,atrasoA * 1000);
			setTimeout(function(){
				if(flag == 1){
					res.render('aguarde',{ITI:(40 * 1000)});
					flag = 0;
					contPasso = 1;
					contRepet++;
					tempoFuga = 10000;

					if(contRepet>2){
						contA += 1;
					}

					console.log("Repet: "+contRepet);
					console.log("Contador A: "+contA);
					console.log("Contador B: "+contB);
					console.log("------>TEMPO COMPLETO<------");
					return;
				}else{
					return;
				}
			},(10 + atrasoA) * 1000)
		}	


	if (contPasso==3){
		flag = 0;
		res.render('aguarde',{ITI: (25000 + tempoFuga )});
		contPasso = 1;
		contRepet++;
		console.log("RENDENRIZANDO: 25 +"+tempoFuga/1000);
		console.log("Repet: "+contRepet);


		if(contRepet>2){
			contA += 1;
			console.log("Contador A: "+contA);
			console.log("Contador B: "+contB);
		}else{
			console.log("Contador A: "+contA);
			console.log("Contador B: "+contB);
		}
	}

}

module.exports.envExpB = function(app, req, res){
	//Verifica qual o atual passo do teste
	console.log("Passo Antes: "+contPasso);
	contPasso++;
	console.log("Passo Agora: "+contPasso);
	if(contPasso==2){
		tempoFuga = 15 * 1000;
		flag = 1 - flag;
		setTimeout(contTempoFuga,atrasoB * 1000);
		setTimeout(function(){
			if(flag == 1){
				res.render('aguarde',{ITI:(40 * 1000)});
				flag = 0;
				contPasso = 1;
				contRepet++;
				tempoFuga = 15000;
				
				if(contRepet>2){
					contB += 1;
				}

				console.log("Repet: "+contRepet);
				console.log("Contador A: "+contA);
				console.log("Contador B: "+contB);
				console.log("------>TEMPO COMPLETO<------");
				return;
			}else{
				return;
			}
		},(15 + atrasoB) * 1000)
	}

	if (contPasso==3){
		flag = 0;
		res.render('aguarde',{ITI: (15000 + tempoFuga )});
		contPasso = 1;
		contRepet++;
		
		console.log("RENDENRIZANDO: 15 +"+tempoFuga/1000);
		console.log("Repet: "+contRepet);


		if(contRepet>2){
			contB += 1;		
			console.log("Contador A: "+contA);
			console.log("Contador B: "+contB);
		}else{
			console.log("Contador A: "+contA);
			console.log("Contador B: "+contB);
		}
	}

}

module.exports.continuar = function(app, req, res){
	if(contRepet<2){
		res.render('expForc',{atrasoB: atrasoB});
	}else if(contRepet>=2 && contRepet<6){
		res.render('exp',{atrasoB: atrasoB});
	}
	//Verifica se o teste acabou
	else if(contRepet==6){
		if(contBloco < 10){
			if(contA > contB){
				console.log("Atraso B antes: "+atrasoB);
				atrasoB--;
				console.log("Atraso B depois: "+atrasoB);
			}else if(contB > contA){
				console.log("Atraso B antes: "+atrasoB);
				atrasoB++;
				console.log("Atraso B depois: "+atrasoB);

			}

			// res.render('expForc',{atrasoB : atrasoB});
			
			console.log("Fim do Bloco "+ contBloco);
			difAtraso[contBloco] = atrasoB - 10;

			console.log("Posicao do vetor: " + (contBloco) );
			console.log("Diferenca do atraso: " + difAtraso[contBloco] );

			if( (difAtraso[contBloco] - maior) > 0){
				maior  = difAtraso[contBloco];
				maiorPos = contBloco	 
			}

			if( (difAtraso[contBloco] - menor) < 0){
				menor  = difAtraso[contBloco];
				menorPos = contBloco;	 
			}

			console.log("MENOR: " + menor);
			console.log("MAIOR: " + maior);
			console.log("Posicao do MAIOR: " + maiorPos );
			console.log("Posicao do MENOR:  " + menorPos );

			if (contBloco >=5){
				if( (maior - menor) <= 2 && ( (maiorPos - menorPos) < 5 || (maiorPos - menorPos) > -5   ) ){
					console.log("Fim CONDICIONAL I do experimento");
					reinicia();
					return res.render('fim') ;

				}else if( (maiorPos == contBloco && menorPos == (contBloco - 4) ) || (maiorPos == (contBloco - 4) && menorPos == contBloco) ) {
					console.log("Fim CONDICIONAL II do experimento");
					reinicia();
					return res.render('fim') ;
				}else{
					res.render('exp',{atrasoB : atrasoB});
					contBloco++;
				}
			}else{
				res.render('exp',{atrasoB : atrasoB});
				contBloco++;
			}

			contRepet=5;
			contA = 0;
			contB = 0;
		}
		else{
			res.render('fim');
			console.log("Fim do experimento");
			reinicia();
		}
	}

}

