// MAESTRIA_CORE.JS
// Base do sistema de maestria: a classe Maestria, a lista de maestrias,
// os contadores e o desenho da tela de maestria

// Classe que representa uma maestria. Cada maestria recebe na criação:
//   nome, emoji, cor, nivelMaximo, metas, descricao
//   medirProgresso() -> função que devolve o progresso atual
//   aoSubirNivel()   -> função que aplica o bônus quando sobe de nível
class Maestria {
    constructor(config) {
        this.nome = config.nome;
        this.emoji = config.emoji;
        this.cor = config.cor;
        this.nivelMaximo = config.nivelMaximo;
        this.metas = config.metas;
        this.descricao = config.descricao;
        this.medirProgresso = config.medirProgresso;
        this.aoSubirNivel = config.aoSubirNivel;

        this.nivel = 0;
        this.valorAtual = 0;
    }

    // mede o progresso e sobe de nível enquanto bater as metas
    atualizar() {
        this.valorAtual = this.medirProgresso();

        while (this.nivel < this.nivelMaximo && this.valorAtual >= this.metas[this.nivel]) {
            this.nivel++;
            this.aoSubirNivel();
            tocarSomNivel(); // som ao subir de nível
        }
    }

    // volta a maestria para o estado inicial
    reiniciar() {
        this.nivel = 0;
        this.valorAtual = 0;
        if (this.recorde !== undefined) this.recorde = 0; // usado pela maestria da riqueza
    }
}

// lista com todas as maestrias registradas
let listaMaestrias = [];

// contadores usados pelas maestrias
let totalCliques = 0;            // quantas vezes o jogador clicou no donut
let totalUpgradesComprados = 0;  // quantos upgrades de produção foram comprados

// adiciona uma maestria na lista
function registrarMaestria(maestria) {
    listaMaestrias.push(maestria);
}

// atualiza o progresso de todas as maestrias (chamada no draw)
function atualizarMaestrias() {
    for (let i = 0; i < listaMaestrias.length; i++) {
        listaMaestrias[i].atualizar();
    }
}

// zera todas as maestrias (chamada ao reiniciar o jogo)
function reiniciarMaestrias() {
    totalCliques = 0;
    totalUpgradesComprados = 0;
    for (let i = 0; i < listaMaestrias.length; i++) {
        listaMaestrias[i].reiniciar();
    }
}

// tela de maestria: titulo, lista de barras e botão de voltar
function desenharTelaMaestria() {
    background(250, 240, 230);

    // titulo
    noStroke();
    fill(120, 60, 20);
    textAlign(CENTER);
    textSize(30);
    textStyle(BOLD);
    text("🏆 MAESTRIAS", width / 2, 45);

    textStyle(NORMAL);
    textSize(13);
    fill(150, 100, 50);
    text("Continue jogando para subir de nível e ganhar bônus permanentes", width / 2, 70);

    // desenha cada maestria, uma embaixo da outra
    let x = 40;
    let y = 110;
    for (let i = 0; i < listaMaestrias.length; i++) {
        desenharBarraMaestria(listaMaestrias[i], x, y);
        y += 95;
    }

    // botão de voltar
    desenharBotao("VOLTAR", width / 2, 490, 200, 46);
}

// desenha uma maestria: nome, nível, barra de progresso e descrição
function desenharBarraMaestria(m, x, y) {
    let largura = 600;
    let alturaBarra = 18;

    // nome + nível
    noStroke();
    fill(80, 40, 10);
    textAlign(LEFT);
    textSize(16);
    textStyle(BOLD);
    text(m.emoji + " " + m.nome, x, y);

    textAlign(RIGHT);
    textSize(14);
    text("Nível " + m.nivel + " / " + m.nivelMaximo, x + largura, y);
    textStyle(NORMAL);

    // progresso dentro do nível atual
    let barraY = y + 10;
    let progresso;
    let textoBarra;

    if (m.nivel >= m.nivelMaximo) {
        progresso = 1;
        textoBarra = "MÁXIMO!";
    } else {
        let metaAtual = m.metas[m.nivel];
        let metaAnterior = m.nivel > 0 ? m.metas[m.nivel - 1] : 0;
        progresso = constrain((m.valorAtual - metaAnterior) / (metaAtual - metaAnterior), 0, 1);
        textoBarra = floor(m.valorAtual) + " / " + metaAtual;
    }

    // fundo da barra
    fill(200, 180, 150);
    rect(x, barraY, largura, alturaBarra, 9);

    // preenchimento na cor da maestria
    fill(m.cor[0], m.cor[1], m.cor[2]);
    rect(x, barraY, largura * progresso, alturaBarra, 9);

    // texto dentro da barra
    fill(70, 40, 10);
    textAlign(CENTER);
    textSize(11);
    text(textoBarra, x + largura / 2, barraY + 13);

    // descrição do bônus
    textAlign(LEFT);
    fill(120, 80, 40);
    textSize(12);
    text(m.descricao, x, barraY + alturaBarra + 16);
}

// botão pequeno que abre a tela de maestria (aparece na tela de jogo)
function desenharBotaoMaestria() {
    desenharBotao("🏆 MAESTRIAS", 140, 340, 180, 38);
}

// trata o clique no botão "MAESTRIAS" durante o jogo
function tratarClickBotaoMaestria() {
    let botaoX = 140, botaoY = 340, botaoLargura = 180, botaoAltura = 38;
    let emCima = mouseX > botaoX - botaoLargura / 2 && mouseX < botaoX + botaoLargura / 2 &&
                 mouseY > botaoY - botaoAltura / 2 && mouseY < botaoY + botaoAltura / 2;
    if (emCima) telaAtual = "maestria";
}

// trata o clique na tela de maestria (botão voltar)
function tratarClickTelaMaestria() {
    let botaoX = width / 2, botaoY = 490, botaoLargura = 200, botaoAltura = 46;
    let emCima = mouseX > botaoX - botaoLargura / 2 && mouseX < botaoX + botaoLargura / 2 &&
                 mouseY > botaoY - botaoAltura / 2 && mouseY < botaoY + botaoAltura / 2;
    if (emCima) telaAtual = "jogo";
}
