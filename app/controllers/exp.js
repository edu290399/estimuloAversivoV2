//Contador para determinar se a opcao foi selecionada ou enviada
var contPasso = 1;
//Contador para determinar a tentativa
var contRepet = 0;
//Contador para determinar o bloco
var contBloco = 0;
//Array com as diferencas de atraso em relacao ao inicial de B (10s)
var difAtraso = new Array(5);
//Contador de tempo para escolha
var escolha = 0;
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
	contPasso = 1;
	contRepet = 0;
	contBloco = 0;
	tempoFuga = 10000;
	flag = 0;
	contA = 0;
	contB = 0;
	atrasoA = 5;
	atrasoB = 10;
	maior = 0;
	maiorPos = 0;
	menor = 0;
	menorPos = 0;
	console.log("Reiniciando variaveis...")
}

function organiza(args,callback){
	var aux;
	for (cont=4; cont >= 0; cont --){
		aux = args[cont];
		args[cont] = args[cont-1];
		console.log(args[cont-1] + " --> "+aux );
	}
	return callback
}

function comparar(args){
	difAtraso[0] = atrasoB - 10;
	menor = args[0];
	maior = args[0];
	for (var cont = 0; cont < 5; cont++){
		if( (args[cont] - maior) > 0 ){
			maior = args[cont];
			maiorPos = cont;
		}else if((args[cont] - menor) < 0){
			menor = args[cont];
			menorPos = cont;
		}
	}
	console.log("Maior: "+maior);
	console.log("Posicao do Maior: "+maiorPos);
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
	},85);
}

//Funcao para determinar o tempo de escolha
function contTempoEscolha(fase) {
	if(contPasso == 1 && contRepet>=2){
		setTimeout(function(){
				if(escolha < (2 * 60 * 1000) ){
					console.log("ESCOLHA--> "+escolha);
					escolha += 100;
					return contTempoEscolha(fase);
				}
				else if (escolha >= (2 * 60 * 1000) && escolha < (4 * 60 * 1000 )){
					console.log("ESCOLHA--> "+escolha);
					omissao = 1;
					escolha += 100;
					return contTempoEscolha(fase);
				}
				else{
					console.log("Fim do experimento");
					var lastConfigModel = require("../model/expModel");
					lastConfigModel.enviarDbVazio(contBloco,contRepet,atrasoB,fase,escolha,omissao);
					return reinicia();
				}
		},85);
	}
	else{
		return;
	}
	
}

//Envio da opcao A
module.exports.envExpA = function(app, req, res, fase){
	
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
					res.render('aguarde',{ITI:(25 * 1000),  fase: fase});
					
					if(contRepet>=2){
						app.app.model.expModel.enviarDbA(contBloco,contRepet,25,atrasoB,fase,escolha,omissao);
						contA += 1;
					}else{
						app.app.model.expModel.enviarDbA(contBloco,contRepet,25,atrasoB,fase,0,0);
					}
					flag = 0;
					contPasso = 1;
					contRepet++;
					tempoFuga = 10000;
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
		res.render('aguarde',{ITI: (25000 + tempoFuga ),  fase: fase});
		console.log("RENDENRIZANDO: 25 +"+tempoFuga/1000);
		console.log("Repet: "+contRepet);

		//verifica se eh o momento de contar a quantidade de opcoes A ou B escolhidas
		if(contRepet>=2){
			app.app.model.expModel.enviarDbA(contBloco,contRepet,(25 + tempoFuga / 1000),atrasoB,fase,escolha,omissao);
			//incrementa opcoes A escolhidas
			contA += 1;
			console.log("Contador A: "+contA);
			console.log("Contador B: "+contB);
		}else{
			app.app.model.expModel.enviarDbA(contBloco,contRepet,(25 + tempoFuga / 1000),atrasoB,fase,0,0);
			console.log("Contador A: "+contA);
			console.log("Contador B: "+contB);
		}
		contPasso = 1;
		contRepet++;
	}

}

module.exports.envExpB = function(app, req, res , fase){
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
				res.render('aguarde',{ITI:(25 * 1000 - (atrasoB * 1000)),  fase: fase});
				
				if(contRepet>=2){
					app.app.model.expModel.enviarDbB(contBloco,contRepet,25-atrasoB,atrasoB,fase,escolha,omissao);
					contB += 1;
				}else{
					app.app.model.expModel.enviarDbB(contBloco,contRepet,25-atrasoB,atrasoB,fase,0,0);
				}
				flag = 0;
				contPasso = 1;
				contRepet++;
				tempoFuga = 15000;
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
		res.render('aguarde',{ITI: (25000 + tempoFuga - (atrasoB * 1000)), fase: fase});
		
		//reincia o passo
		console.log("RENDENRIZANDO: 15 +"+tempoFuga/1000);
		console.log("Repet: "+contRepet);

		//verifica se eh o momento de contar a quantidade de opcoes A ou B escolhidas
		if(contRepet>=2){
			app.app.model.expModel.enviarDbB(contBloco,contRepet,(15 + tempoFuga / 1000),atrasoB,fase,escolha,omissao);
			//incrementa a opcao escolhida
			contB += 1;		
			console.log("Contador A: "+contA);
			console.log("Contador B: "+contB);
		}else{
			app.app.model.expModel.enviarDbB(contBloco,contRepet,(15 + tempoFuga / 1000),atrasoB,fase,0,0);
			console.log("Contador A: "+contA);
			console.log("Contador B: "+contB);
		}
		contPasso = 1;
		contRepet++;
	}

}



//continuacao da tela de espera
module.exports.continuar = function(app,req,res,fase){
	escolha = 0;
	omissao = 0;
	var lastConfigModel = require("../model/configModel");
	console.log("DIF MIN EXPO ---> "+lastConfigModel.vars.difMinExpo);
	console.log("DIF ON EXPO ----> "+lastConfigModel.vars.difOnExpo);
	var difOn = lastConfigModel.vars.difOnExpo;
	var difMin = lastConfigModel.vars.difMinExpo;
	//verifica se ainda esta na etapa forcada
	if(contRepet<2){
		console.log("ContRepet < 2");
		res.render('expForc',{atrasoB: atrasoB});
	}else if(contRepet>=2 && contRepet<6){
		console.log("ContRepet >= 2 e < 6");
		res.render('exp',{atrasoB: atrasoB});
	}
	//Verifica se o bloco acabou acabou
	else if(contRepet==6){
		console.log("ContRepet >= 6");
		//verifica se o teste acabou
		if(contBloco < 10 && fase == "TREINO"){

			console.log("Fim do Bloco "+ (contBloco+1));
			
			console.log("ON --->" + difOn);
			console.log("MIN --->" + difMin);

			if(difOn == 1){
				console.log("COMPARANDO BLOCOS... CRITERIO ---> " + difMin +" segundos");
				//verifica se ja eh possivel comparar os conjuntos de blocos
				if (contBloco < 5){
					//salva a diferenca de atraso de B no bloco, em relacao ao valor de referencia
					difAtraso[4-contBloco] = atrasoB - 10;
					console.log("Posicao do vetor: " + (4-contBloco) );
					console.log("Diferenca do atraso: " + difAtraso[4-contBloco] );
					res.render('expForc',{atrasoB : atrasoB});
					contBloco++;
				}
				else{
					if(contBloco > 5){
						organiza(difAtraso, comparar());
					}



					console.log("Atraso[0]: "+difAtraso[0]);


					//verifica se a diferenca do maior e do menor num intervalo de 5 blocos eh menor ou igual a 2 e se os extremos do conjunto de blocos sao maior-menor ou menor-maior	
					if( (maior - menor) <= difMin  && !( (maiorPos == contBloco && menorPos == (contBloco - 4) ) || (maiorPos == (contBloco - 4) && menorPos == contBloco) ) ){
						console.log("Fim CONDICIONAL da fase de Treino");
						 contPasso = 1;
						 contRepet = 0;
						 contBloco = 0;
						 flag = 0;
						return 	(res.render('expForcTeste'),console.log("Mudando para o modo >>>TESTE<<<"));
					}else{
						res.render('expForc',{atrasoB : atrasoB});
						contBloco++;
					}
				}
			}else{
				console.log("COMPARACAO ENTRE BLOCOS DESLIGADA");
				res.render('expForc',{atrasoB : atrasoB});
				contBloco++;
			}
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
			else{
				console.log("Atraso em B mantido");
			}
			contRepet=0;
			contA = 0;
			contB = 0;
		}
		else if (fase == "TESTE"){
			res.render('fim');
			console.log("Fim do experimento");
			reinicia();
		}
		else{
			res.render('descanso');
			console.log("Descansando...");

		}	

	}
	contTempoEscolha(fase);
}

