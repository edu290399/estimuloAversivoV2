//Contador para determinar se a opcao foi selecionada ou enviada
var contPasso = 1;
//Contador para determinar a tentativa
var contRepet = 5;
//Contador para determinar o bloco
var contBloco = 0;
//Array com as diferencas de atraso em relacao ao inicial de B (10s)
var difAtraso = new Array(5);
//Tempo no qual se escuta o som
var tempoFuga = 10000;
//flag para verificar se a opcao foi enviada via click
var flag = 0;
//Contador de vezes que A foi escolhido
var contA = 0;
//Contador de vezes que B foi escolhido
var contB = 0;
//Atraso incial de A (em sengundos)
var atrasoA = 5;
//Atraso incial de B (em sengundos)
var atrasoB = 10;
//Maior diferenca de atraso
var maior = 0;
//Posicao da maior diferenca de atraso
var maiorPos = 0;
//Menor diferenca de atraso
var menor = 0;
//Posicao da menor diferenca de atraso
var menorPos = 0;

//funcao para reiniciar as variaveis
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

function organiza(args){
	var aux;
	for (cont=4; cont >= 0; cont --){
		aux = args[cont];
		args[cont] = args[cont-1];
		console.log(args[cont-1] + " --> "+aux );
	}
}

function maiorFunc(args){

	maior = args[0];
	for (var cont = 0; cont < 5; cont++){
		if( (args[cont] - maior) > 0 ){
			maior = args[cont];
			maiorPos = cont;
		}
	}
	console.log("Maior: "+maior);
	console.log("Posicao do Maior: "+maiorPos);
}

function menorFunc(args){
	menor = args[0];
	for (var cont = 0; cont < 5; cont++){
		if( (args[cont] - menor) < 0 ){
			menor = args[cont];
			menorPos = cont;
		}
	}
	console.log("Menor: "+menor);
	console.log("Posicao do Menor: "+menorPos);

}

//Funcao para determinar o tempo de fuga
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

//Envio da opcao A
module.exports.envExpA = function(app, req, res){
	
	//Verifica qual o atual passo do teste
	console.log("Passo Antes: "+contPasso);
	//incrementa o contador do passo
	contPasso++;
	console.log("Passo Agora: "+contPasso);
	//verifica se o click eh de envio
	if(contPasso==2){
			//reinicia a variavel tempo fuga
			tempoFuga = 10 * 1000;
			//atualiza flag
			flag = 1 - flag;
			//aguarda o atraso antes de iniciar contagem do tempo de fuga
			setTimeout(contTempoFuga,atrasoA * 1000);
			//faz envio automatico apos 5 segundos de som facultativo
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

	//verifica se o click eh de envio
	if (contPasso==3){
		flag = 0;
		res.render('aguarde',{ITI: (25000 + tempoFuga )});
		contPasso = 1;
		contRepet++;
		console.log("RENDENRIZANDO: 25 +"+tempoFuga/1000);
		console.log("Repet: "+contRepet);

		//verifica se eh o momento de contar a quantidade de opcoes A ou B escolhidas
		if(contRepet>2){
			//incrementa opcoes A escolhidas
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
		//reinicia a variavel tempo fuga
		tempoFuga = 15 * 1000;
		//atualiza a flag
		flag = 1 - flag;
		//aguarda o atraso antes de iniciar contagem do tempo de fuga
		setTimeout(contTempoFuga,atrasoB * 1000);
		//faz envio automatico apos 5 segundos de som facultativo
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

	//verifica se o click eh de envio
	if (contPasso==3){
		//seta a flag
		flag = 0;
		res.render('aguarde',{ITI: (15000 + tempoFuga )});
		//reincia o passo
		contPasso = 1;
		contRepet++;
		
		console.log("RENDENRIZANDO: 15 +"+tempoFuga/1000);
		console.log("Repet: "+contRepet);

		//verifica se eh o momento de contar a quantidade de opcoes A ou B escolhidas
		if(contRepet>2){
			//incrementa a opcao escolhida
			contB += 1;		
			console.log("Contador A: "+contA);
			console.log("Contador B: "+contB);
		}else{
			console.log("Contador A: "+contA);
			console.log("Contador B: "+contB);
		}
	}

}
//continuacao da tela de espera
module.exports.continuar = function(app, req, res){
	//verifica se ainda esta na etapa forcada
	if(contRepet<2){
		res.render('expForc',{atrasoB: atrasoB});
	}else if(contRepet>=2 && contRepet<6){
		res.render('exp',{atrasoB: atrasoB});
	}
	//Verifica se o bloco acabou acabou
	else if(contRepet==6){
		//verifica se o teste acabou
		if(contBloco < 10){
			//decrementa atraso de B
			if(contA > contB){
				console.log("Atraso B antes: "+atrasoB);
				atrasoB++;
				console.log("Atraso B depois: "+atrasoB);
			}
			//incrementa atraso de B
			else if(contB > contA){
				console.log("Atraso B antes: "+atrasoB);
				atrasoB--;
				console.log("Atraso B depois: "+atrasoB);

			}
			else
				console.log("Atraso em B mantido");

		
			console.log("Fim do Bloco "+ (contBloco+1));
			//salva a diferenca de atraso de B no bloco, em relacao ao valor de referencia

			if (contBloco < 5){
			difAtraso[4-contBloco] = atrasoB - 10;
			console.log("Posicao do vetor: " + (4-contBloco) );
			console.log("Diferenca do atraso: " + difAtraso[4-contBloco] );
			}


			//verifica se ja eh possivel comparar os conjuntos de blocos
			if (contBloco >=5){
				organiza(difAtraso);
				difAtraso[0] = atrasoB - 10;
				maiorFunc(difAtraso);
				menorFunc(difAtraso);


				console.log("Atraso[0]: "+difAtraso[0]);


				//verifica se a diferenca do maior e do menor num intervalo de 5 blocos eh menor ou igual a 2 e se os extremos do conjunto de blocos sao maior-menor ou menor-maior	
				 if( (maior - menor) <= 2  && ( (maiorPos == contBloco && menorPos == (contBloco - 4) ) || (maiorPos == (contBloco - 4) && menorPos == contBloco) ) ){
				 	console.log("Fim CONDICIONAL do experimento");
				 	reinicia();
				 	//caso seja, encerra o experimento
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

