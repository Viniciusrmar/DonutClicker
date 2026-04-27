// LOGICA.JS
// interação do jogador, prod automatica e reiniciar jogo

// chamada pelo p5.js automaticamente a cada click do mouse
function mousePressed() {
    if (telaAtual === "inicio") tratarClickTelaInicio();
    if (telaAtual === "jogo") tratarClickTelaJogo();
    if (telaAtual === "gameover") tratarClickTelaGameOver();
}

// click na tela de inicio
function tratarClickTelaInicio() {
    let botaoX = width / 2;
    let botaoY = 370;
    let botaoLargura = 200;
    let botaoAltura = 50;

    let mouseEmCima = mouseX > botaoX - botaoLargura / 2 &&
                    mouseX < botaoX + botaoLargura / 2 &&
                    mouseY > botaoY - botaoAltura / 2 &&
                    mouseY < botaoY + botaoAltura / 2;

    if (mouseEmCima) {
        telaAtual = "jogo";
    }
}

// click na tela de jogo
function tratarClickTelaJogo() {
    tratarClickDonut();
    tratarClickUpgrades();
    tratarClickMelhorias();
}

// verifica se o jogador clicou no donut
function tratarClickDonut() {
    let donutCentroX = 140;
    let donutCentroY = 215;
    let donutRaio = 78;

    let clicouNoDonut = dist(mouseX, mouseY, donutCentroX, donutCentroY) < donutRaio;

    if (clicouNoDonut) {
        totalDonuts += donutsPerClick;

        // cria particulas de click
        listaParticulas.push({
            posicaoX: mouseX,
            posicaoY: mouseY,
            velocidadeX: random(-2, 2),
            velocidadeY: random(-4, -1),
            vidaRestante: 60,
            valorExibido: donutsPerClick
        });
    }
}

// verifica se o jogador clicou em algum upgrade e faz o processamento da compra
function tratarClickUpgrades() {
    for (let i = 0; i < listaUpgrades.length; i++) {
        let upgrade = listaUpgrades[i];
        let cardX = 290;
        let cardY = 50 + i * 52;
        let cardLargura = 376;
        let cardAltura = 46;

        let clicouNoCard = mouseX > cardX && mouseX < cardX + cardLargura &&
                            mouseY > cardY && mouseY < cardY + cardAltura;

        // processar compra
        if (clicouNoCard && totalDonuts >= upgrade.custo) {
            totalDonuts -= upgrade.custo;
            donutsPerSecond += upgrade.producaoPerSecond;
            upgrade.quantidadeComprada++;

            // aumenta o custo do upgrade em 15% para a próxima compra
            upgrade.custo = floor(upgrade.custo * 1.15);
        }
    }
}

// verifica se o jogador clicou em alguma melhoria de click e processa a compra
function tratarClickMelhorias() {
    for (let i = 0; i < listaMelhorias.length; i++) {
        let melhoria = listaMelhorias[i];
        let cardX = 290;
        let cardY = 328 + i * 60;
        let cardLargura = 376;
        let cardAltura = 52;

        let clicouNoCard = mouseX > cardX && mouseX < cardX + cardLargura &&
                            mouseY > cardY && mouseY < cardY + cardAltura;

        // so compra se tiver donuts o suficiente e se ainda n tiver comprado
        if (clicouNoCard && totalDonuts >= melhoria.custo && !melhoria.comprada) {
            totalDonuts -= melhoria.custo;
            donutsPerClick += melhoria.bonusPerClick;
            melhoria.comprada = true;
        }
    }
}

// click na tela de game over
function tratarClickTelaGameOver() {
    let botaoX = width / 2;
    let botaoY = 390;
    let botaoLargura = 230;
    let botaoAltura = 52;

    let clicouNoBotao = mouseX > botaoX - botaoLargura / 2 &&
                        mouseX < botaoX + botaoLargura / 2 &&
                        mouseY > botaoY - botaoAltura / 2 &&
                        mouseY < botaoY + botaoAltura / 2;

    if (clicouNoBotao) {
        reiniciarJogo();
    }
}

// produção automatica
// chamada no draw() para add donuts automaticamente com base nos upgrades comprados
function executarProducaoAutomatica() {
    // roda a cada 100ms para suavizar a produção (em vez de somar 1x por segundo de uma vez)
    let intervaloProducao = 100;

    if (millis() - ultimoTempoProducao > intervaloProducao) {
        totalDonuts += donutsPerSecond / 10;
        ultimoTempoProducao = millis();
    }
}

// reiniciar jogo
// reseta todas as variáveis para o estado inicial
function reiniciarJogo() {
    totalDonuts = 0;
    donutsPerClick = 1;
    donutsPerSecond = 0;
    listaParticulas = [];

    listaUpgrades = [
        {nome: "Auto Clicker", custo: 10, producaoPerSecond: 0.1, quantidadeComprada: 0, descricao: "+0.1/s"},
        {nome: "Padaria", custo: 100, producaoPerSecond: 0.5, quantidadeComprada: 0, descricao: "+0.5/s"},
        {nome: "Fábrica", custo: 500, producaoPerSecond: 2, quantidadeComprada: 0, descricao: "+2/s"},
        {nome: "Robo Padeiro", custo: 2000, producaoPerSecond: 10, quantidadeComprada: 0, descricao: "+10/s"},
        {nome: "Mega Industria", custo: 8000, producaoPerSecond: 25, quantidadeComprada: 0, descricao: "+25/s"},
    ];

    listaMelhorias = [
        {nome: "Luvas de Padeiro", custo: 50, bonusPerClick: 1, comprada: false},
        {nome: "Turbo Click", custo: 300, bonusPerClick: 3, comprada: false},
        {nome: "Mãos de Ouro", custo: 1500, bonusPerClick: 10, comprada: false},
    ];

    telaAtual = "inicio";
}
