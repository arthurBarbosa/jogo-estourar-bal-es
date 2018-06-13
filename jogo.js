var timerId = null // variavel principal da contagem do tempo do cronometro
function iniciaJogo(){

	var url = window.location.search;
	
	var nivel_jogo = url.replace("?","");

	
	var tempo_segundos = 0;

	if(nivel_jogo == 1) {//facil 120segundos
		tempo_segundos = 120;
	}

	if(nivel_jogo == 2) {//medio 60 segundos
		tempo_segundos = 60;
	}

	if(nivel_jogo == 3) {//dificil 30segundos
		tempo_segundos = 30;
	}

	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML = tempo_segundos;
	
	//quantidades de baloes
	var qtde_baloes = 20;

	criaBaloes(qtde_baloes);

	//imprimir a quantidades de baloes
	document.getElementById('balao_inteiro').innerHTML = qtde_baloes;

	document.getElementById('balao_estourado').innerHTML = 0;

	contagem_tempo(tempo_segundos + 1)
}


//função do relogio para contar o tempo 
function contagem_tempo(segundos){
	segundos = segundos -1;
	if(segundos == -1){
		clearTimeout(timerId);
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function game_over(){
	alert("Fim do jogo, voçe nao estourou todos baloes!");
}

//função do para criar baloes
function criaBaloes(qtde_baloes){
		for(var i = 1; i <= qtde_baloes; i++){


			var balao = document.createElement("img");
			balao.src = 'imagens/balao_azul_pequeno.png';
			balao.style.margin = '10px';
			balao.id = 'b' +i;
			balao.onclick=function(){estourar(this);}

			document.getElementById('cenario').appendChild(balao);

		}
	}
	//estourar balao
	function estourar(e){

		var id_balao = e.id;
		
		document.getElementById(id_balao).setAttribute("onclick",""); //limpando o evento para nao estourar o balao varias vezes e pontuar com o mesmo balao
		
		document.getElementById(id_balao).src='imagens/balao_azul_pequeno_estourado.png';

		pontuacao(-1);
	}

	//pontuacao
	function pontuacao(acao){

		var balao_inteiro = document.getElementById('balao_inteiro').innerHTML;
		var balao_estourado = document.getElementById('balao_estourado').innerHTML;

		balao_inteiro = parseInt(balao_inteiro);
		balao_estourado =  parseInt(balao_estourado);

		balao_inteiro = balao_inteiro + acao;
		balao_estourado =  balao_estourado - acao;

		document.getElementById('balao_inteiro').innerHTML = balao_inteiro;
		document.getElementById('balao_estourado').innerHTML = balao_estourado;

		situacao_jogo(balao_inteiro);

	}

	//sistuacao do jogo
	function situacao_jogo(balao_inteiro){
		if(balao_inteiro == 0){
			alert("Parabens vc estourou todos os baloes vc é TOP");
			pararJogo();
		}
	}

	function pararJogo(){
		clearTimeout(timerId);
	}