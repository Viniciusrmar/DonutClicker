// UTILITY.JS
// funções auxiliares, a classe Particula e os sons do jogo

// formata numeros grandes para ser mais legivel
function formatarNumero(numero) {
    if (numero >= 1000000) return (numero / 1000000).toFixed(1) + "M";
    if (numero >= 1000) return (numero / 1000).toFixed(1) + "K";
    return str(numero);
}

// Classe que representa uma partícula "+valor" que sobe e some ao clicar
class Particula {
    constructor(x, y, valor) {
        this.posicaoX = x;
        this.posicaoY = y;
        this.velocidadeX = random(-2, 2);
        this.velocidadeY = random(-4, -1);
        this.vidaRestante = 60;
        this.valorExibido = valor;
    }

    // move a partícula e diminui a vida
    atualizar() {
        this.posicaoX += this.velocidadeX;
        this.posicaoY += this.velocidadeY;
        this.vidaRestante--;
    }

    // desenha o "+valor" com a opacidade diminuindo conforme a vida acaba
    desenhar() {
        let opacidade = map(this.vidaRestante, 0, 60, 0, 220);
        fill(180, 80, 20, opacidade);
        noStroke();
        textAlign(CENTER);
        textSize(13);
        text("+" + this.valorExibido, this.posicaoX, this.posicaoY);
    }

    // true quando a partícula já deve ser removida
    terminou() {
        return this.vidaRestante <= 0;
    }
}

// atualiza e desenha todas as particulas, removendo as que acabaram
function atualizarParticulas() {
    for (let i = listaParticulas.length - 1; i >= 0; i--) {
        let particula = listaParticulas[i];
        particula.atualizar();
        particula.desenhar();

        if (particula.terminou()) {
            listaParticulas.splice(i, 1);
        }
    }
}

// ---- SONS -------------------------------------------------------------
// Os sons são gerados pela Web Audio API (não precisam de arquivo).
// O contexto de áudio é criado no primeiro clique do jogador.

let contextoAudio = null;

// toca um "bip" que desliza da frequência inicial para a final
function tocarSom(freqInicial, freqFinal, duracao) {
    if (contextoAudio === null) {
        contextoAudio = new (window.AudioContext || window.webkitAudioContext)();
    }

    let oscilador = contextoAudio.createOscillator();
    let volume = contextoAudio.createGain();

    oscilador.type = "triangle";
    oscilador.frequency.setValueAtTime(freqInicial, contextoAudio.currentTime);
    oscilador.frequency.exponentialRampToValueAtTime(freqFinal, contextoAudio.currentTime + duracao);

    volume.gain.setValueAtTime(0.2, contextoAudio.currentTime);
    volume.gain.exponentialRampToValueAtTime(0.001, contextoAudio.currentTime + duracao);

    oscilador.connect(volume);
    volume.connect(contextoAudio.destination);

    oscilador.start();
    oscilador.stop(contextoAudio.currentTime + duracao);
}

function tocarSomClique() { tocarSom(600, 200, 0.12); } // som ao clicar no donut
function tocarSomCompra() { tocarSom(400, 800, 0.15); } // som ao comprar na loja
function tocarSomNivel()  { tocarSom(500, 1000, 0.25); } // som ao subir uma maestria
