// DESENHO.JS
// Funções relacionadas ao desenho das telas e dos elementos do jogo

// Tela de Inicio
function desenharTelaInicio() {
    // Circulo decoratico de fundo
    fill(210, 160, 80, 60);
    noStroke();
    ellipse(width / 2, height / 2, 400, 400);

    // Emoji e titulo
    fill(120, 60, 20);
    textAlign(CENTER);
    textSize(52);
    text("🍩", width / 2, 150);

    textSize(36);
    textStyle(BOLD);
    text("DONUT CLICKER", width / 2, 210);

    //Instruções rapidas
    textStyle(NORMAL);
    textSize(15);
    text("Clique no donut para ganhar mais donuts!", width / 2, 255);
    text("Compre upgrades para produzir mais.", width / 2, 278);
    text("Meta: " +formatarNumero(META_DONUTS) + " donuts para vencer!", width / 2, 300);

    // Botões
    desenharBotao("JOGAR", width / 2, 370, 200, 50);
    desenharBotao("SOBRE", width / 2, 435, 200, 46);
}

// Tela de Sobre: mostra os integrantes do grupo
function desenharTelaSobre() {
    background(250, 240, 230);

    // circulo decorativo
    fill(210, 160, 80, 60);
    noStroke();
    ellipse(width / 2, height / 2, 420, 420);

    // titulo
    fill(120, 60, 20);
    textAlign(CENTER);
    textSize(30);
    textStyle(BOLD);
    text("SOBRE", width / 2, 80);

    textSize(40);
    text("🍩", width / 2, 140);

    // nome do jogo
    textStyle(NORMAL);
    textSize(16);
    fill(100, 60, 20);
    text("Donut Clicker — Final Challenge", width / 2, 185);

    // integrantes
    textSize(14);
    fill(130, 80, 40);
    text("Integrantes:", width / 2, 230);

    textSize(15);
    fill(90, 50, 15);
    text("Felipe Bresciani Janz", width / 2, 265);
    text("Pedro Augusto Stabach", width / 2, 295);
    text("Vinicius Machado de Moura", width / 2, 325);
    text("Vinicius Robaskievicz Marinho", width / 2, 355);

    // botão de voltar
    desenharBotao("VOLTAR", width / 2, 440, 200, 46);
}

// Tela de Jogo
function desenharTelaJogo() {
    desenharPainelEsquerdo();
    desenharPainelDireito();

    if (totalDonuts >= META_DONUTS) { // Verificar condição de vitória
        telaAtual = "gameover";
    }
}

// Painel esquerdo: Donut e stats
function desenharPainelEsquerdo() {
    // Fundo painel
    fill(255, 248, 230);
    stroke(200, 170, 120);
    strokeWeight(1);
    rect(0, 0, 280, height);

    // Titulo e contador
    noStroke();
    fill(100, 60, 20);
    textAlign(CENTER);
    textSize(13);
    text("DONUTS", 140, 28);

    textSize(26);
    textStyle(BOLD);
    text(formatarNumero(floor(totalDonuts)), 140, 58);

    // Info produção
    textStyle(NORMAL);
    textSize(12);
    fill(150, 100, 50);
    text("por segundo: " +donutsPerSecond.toFixed(1), 140, 78);
    text("por click: " +donutsPerClick, 140, 94);

    // Donut animado central
    let donutCentralX = 140;
    let donutCentralY = 215;
    desenharDonutAnimado(donutCentralX, donutCentralY, 78);
    anguloRotacao += 0.012;

    // Instrução click
    fill(150, 100, 50);
    textSize(11);
    text("CLIQUE NO DONUT!", donutCentralX, donutCentralY + 100);

    // Botão que abre a tela de maestrias (sistema de maestria)
    desenharBotaoMaestria();

    // Barra de progresso
    desenharBarraProgresso();
}

// Função da barra de progresso
function desenharBarraProgresso() {
    let progresso = constrain(totalDonuts / META_DONUTS, 0, 1);
    let barraX = 20;
    let barraY = height - 45;
    let barraLargura = 240;
    let barraAltura = 14;

    // Fundo da barra
    fill(200, 180, 150);
    noStroke();
    rect(barraX, barraY, barraLargura, barraAltura, 7);

    // Preenchimento do progresso
    fill(220, 160, 60);
    rect(barraX, barraY, barraLargura * progresso, barraAltura, 7);

    // Texto de progresso
    fill(100, 60, 20);
    textSize(10);
    text(formatarNumero(floor(totalDonuts)) + " / " + formatarNumero(META_DONUTS), 140, height -28);
}

// Painel Direito: loja de ubgrade e melhorias
function desenharPainelDireito() {
    // Fundo do painel
    fill(245, 230, 200);
    stroke(200, 170, 120);
    strokeWeight(1);
    rect(280, 0, 400, height);

    // Titulo
    noStroke();
    fill(120, 60, 20);
    textAlign(CENTER);
    textSize(14);
    textStyle(BOLD);
    text("LOJA DE UPGRADES", 480, 22);
    textStyle(NORMAL);

    // Upgrades de prod automatica
    textAlign(LEFT);
    textSize(10);
    fill(130, 80, 30);
    text("▼ PRODUÇÃO AUTOMÁTICA", 295, 42);

    for (let i = 0; i < listaUpgrades.length; i++) {
        let posicaoY = 50 + i * 52; // Espaçamento entre os upgrades
        desenharCardUpgrade(listaUpgrades[i], 290, posicaoY);
    }

    // Melhorias de click
    textAlign(LEFT);
    fill(130, 80, 30);
    textSize(10);
    text("▼ MELHORIAS DE CLICK", 295, 320);

    for (let i = 0; i < listaMelhorias.length; i++) {
        let posicaoY = 328 + i * 60; // Espaçamento entre as melhorias
        desenharCardMelhoria(listaMelhorias[i], 290, posicaoY);
    }
}

// Card de upgrade de prod automatica
function desenharCardUpgrade(upgrade, cardX, cardY) {
    let cardLargura = 376;
    let cardAltura = 46;

    let mouseEmCima = mouseX > cardX && mouseX < cardX + cardLargura && // Verificar se o mouse está dentro dos limites do card
                      mouseY > cardY && mouseY < cardY + cardAltura;
    let podeComprar = totalDonuts >= upgrade.custo;

    // cor do card dependendo do estado
    fill(mouseEmCima && podeComprar ? color(255, 220, 150) :
        podeComprar ? color(255, 240, 200) : color(220, 210, 190));

    stroke(200, 170, 120);
    strokeWeight(0.5);
    rect(cardX, cardY, cardLargura, cardAltura, 6);

    // Nome do upgrade
    noStroke();
    fill(podeComprar ? color(80, 40, 10) : color(160, 140, 120));
    textSize(12);
    textStyle(BOLD);
    textAlign(LEFT);
    text(upgrade.nome, cardX + 10, cardY + 16);

    // Descriçao + quantidade comprada
    textStyle(NORMAL);
    textSize(10);
    fill(120, 80, 40);
    text(upgrade.descricao + " | comprados: " + upgrade.quantidadeComprada, cardX + 10, cardY + 31);

    // Custo do upgrade
    textAlign(RIGHT);
    textSize(11);
    fill(podeComprar ? color(150, 80, 0) : color(180, 160, 140));
    text("🍩 " + formatarNumero(upgrade.custo), cardX + cardLargura - 8, cardY + 16);
}

// Card de melhoria de click
function desenharCardMelhoria(melhoria, cardX, cardY) {
    let cardLargura = 376;
    let cardAltura = 52;

    let mouseEmCima = mouseX > cardX && mouseX < cardX + cardLargura && // Verificar se o mouse está dentro dos limites do card
                      mouseY > cardY && mouseY < cardY + cardAltura;
    let podeComprar = totalDonuts >= melhoria.custo && !melhoria.comprada;

    // cor do card dependendo do estado
    fill(melhoria.comprada ? color(200, 190, 170) :
        mouseEmCima && podeComprar ? color(255, 220, 150) :
        podeComprar ? color(255, 240, 200) : color(220, 210, 190));

    stroke(200, 170, 120);
    strokeWeight(0.5);
    rect(cardX, cardY, cardLargura, cardAltura, 6);

    // Nome da melhoria
    noStroke();
    fill(melhoria.comprada ? color(60, 120, 60) :
        podeComprar ? color(80, 40, 10) : color(160, 140, 120));

    textSize(12);
    textStyle(BOLD);
    textAlign(LEFT);
    text(melhoria.nome + (melhoria.comprada ? " ✓" : ""), cardX + 10, cardY + 18);

    // descrição do bonus
    textStyle(NORMAL);
    textSize(10);
    fill(100, 50, 50);
    text(melhoria.comprada ? "Já comprado" : "+" + melhoria.bonusPerClick + " donuts por click", cardX + 10, cardY + 34);

    // custo (so mostra se não comprado)
    if (!melhoria.comprada) {
        textAlign(RIGHT);
        textSize(11);
        fill(podeComprar ? color(150, 80, 0) : color(180, 160, 140));
        text("🍩 " + formatarNumero(melhoria.custo), cardX + cardLargura - 8, cardY + 18);
    }
}

// Função para desenhar o donut animado
function desenharDonutAnimado(donutCentroX, donutCentroY, tamanho) {
    let donutRaio = tamanho;
    push();
    translate(donutCentroX, donutCentroY);
    rotate(anguloRotacao);

    // sombra
    fill(200, 150, 80, 60);
    noStroke();
    ellipse(4, 4, donutRaio * 2, donutRaio * 2);

    // corpo (massa)
    fill(200, 130, 50);
    stroke(150, 90, 20);
    strokeWeight(2);
    ellipse(0, 0, donutRaio * 2, donutRaio * 2);

    // cobertura
    fill(230, 80, 120);
    noStroke();
    ellipse(0, 0, donutRaio * 1.6, donutRaio * 1.6);

    // buraco do donut
    fill(250, 240, 220);
    noStroke();
    strokeWeight(1);
    ellipse(0, 0, donutRaio * 0.55, donutRaio * 0.55);

    // granulados
    noStroke();
    let coresGranulados = [
        color(255, 230, 0), // amarelo
        color(100, 200, 255), // azul
        color(255, 100, 150), // rosa
        color(100, 255, 150), // verde
    ];

    for (let i = 0; i < 12; i++) {
        let anguloGranulado = (TWO_PI / 12) * i + anguloRotacao * 0.5; // girar os granulados mais rápido que o donut
        let distanciaDoCentro = donutRaio * 0.8;
        fill(coresGranulados[i % coresGranulados.length]);
        ellipse(cos(anguloGranulado) * distanciaDoCentro,
                sin(anguloGranulado) * distanciaDoCentro, 6, 3);
    }

    pop();
}

// tela de gameover
function desenharTelaGameOver() {
    background(250, 240, 220);

    // circulo decorativo
    fill(210, 160, 80, 80);
    noStroke();
    ellipse(width / 2, height / 2, 500, 500);

    // emoji e circulo de vitoria
    textAlign(CENTER);
    textSize(60);
    text("🍩", width / 2, 148);

    fill(80, 40, 10);
    textSize(34);
    textStyle(BOLD);
    text("VOCÊ VENCEU!", width / 2, 205);

    // mensagem e pontuação final
    textStyle(NORMAL);
    textSize(17);
    fill(120, 70, 20);
    text("Você produziu " + formatarNumero(META_DONUTS) + " donuts!", width / 2, 248);
    text("Sua padaria dominou o mercado!", width / 2, 272);

    textSize(14);
    fill(150, 80, 40);
    text("Pontuação final: " + formatarNumero(floor(totalDonuts)) + " donuts", width / 2, 315);

    // botao JOGAR NOVAMENTE
    desenharBotao("JOGAR NOVAMENTE", width / 2, 390, 230, 52);
}

// função de botao generico
function desenharBotao(textoBotao, botaoX, botaoY, botaoLargura, botaoAltura) {
    let mouseEmCima = mouseX > botaoX - botaoLargura / 2 && mouseX < botaoX + botaoLargura / 2 &&
                      mouseY > botaoY - botaoAltura / 2 && mouseY < botaoY + botaoAltura / 2;

    fill(mouseEmCima ? color(200, 120, 40) : color(230, 150, 50));
    stroke(180, 100, 20);
    strokeWeight(2);
    rect(botaoX - botaoLargura / 2, botaoY - botaoAltura / 2, botaoLargura, botaoAltura, 12);

    fill(255);
    noStroke();
    textSize(mouseEmCima ? 19 : 18);
    textStyle(BOLD);
    textAlign(CENTER);
    text(textoBotao, botaoX, botaoY + 7);
}
