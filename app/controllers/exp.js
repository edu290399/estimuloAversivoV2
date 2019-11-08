var contPasso = 1;
var contRepet = 5;
var contBloco = 1;
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
			tempoFuga = 10 * 1000;
			flag = 1 - flag;
			setTimeout(contTempoFuga,5 * 1000);
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
			},15 * 1000)
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
		setTimeout(contTempoFuga,10 * 1000);
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
		},25 * 1000)
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
		res.render('expForc');
	}else if(contRepet>2 && contRepet<6){
		res.render('exp');
	}
	//Verifica se o teste acabou
	else if(contRepet==6){
		if(contBloco < 10){
			res.render('expForc');
			console.log("Fim do Bloco");
			contRepet=0;
			contA = 0;
			contB = 0;
		}
		else{
		res.render('fim');
		console.log("Fim do experimento");
		contRepet=0;
		contA = 0;
		contB = 0;
		}
	}

}

