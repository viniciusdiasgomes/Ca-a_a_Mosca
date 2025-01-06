var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 10;

var nivel = window.location.search;
nivel = nivel.replace('?', '');

if (nivel === 'normal') {
    var criaMoscaTempo = 1500;
} else if (nivel === 'dificil') {
    var criaMoscaTempo = 1000;
} else if (nivel === 'chucknorris') {
    var criaMoscaTempo = 750;
} else {
    var criaMoscaTempo = 1500; // valor padrão se nenhum nível for selecionado
}

function ajusTamanhoPalcoJogo() {
    altura = window.innerHeight;  
    largura = window.innerWidth;   
}

ajusTamanhoPalcoJogo();

var cronometro = setInterval(function() {
    tempo -= 1;

    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criaMosca);
        window.location.href = 'vitoria.html'; // Redireciona ao fim do jogo se o tempo acabar
    } else {
        document.getElementById('cronometro').innerHTML = tempo; // Atualiza o cronômetro
    }
}, 1000);

var criaMosca = setInterval(function() {
    posicaoRandomica();
}, criaMoscaTempo);

function posicaoRandomica() { 
    var moscaAnterior = document.getElementById('mosca');
    if (moscaAnterior) {
        moscaAnterior.remove();
        if (vidas >= 4) {
            window.location.href = 'fim_de_jogo.html';
        } else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png";
            vidas++;
        }
    }
    
    var posicaoX = Math.floor(Math.random() * largura) - 90;  
    var posicaoY = Math.floor(Math.random() * altura) - 90;    

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    var mosca = document.createElement('img');
    mosca.src = 'imagens/mosca.png';
    mosca.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosca.style.left = posicaoX + 'px';
    mosca.style.top = posicaoY + 'px';
    mosca.style.position = 'absolute';
    mosca.id = 'mosca';
    mosca.onclick = function() {
        this.remove();
    };

    document.body.appendChild(mosca);
}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3);
    switch (classe) {
        case 0: return 'mosca1';
        case 1: return 'mosca2';
        case 2: return 'mosca3';
    }
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2);
    switch (classe) {
        case 0: return 'ladoA';
        case 1: return 'ladoB';
    }
}