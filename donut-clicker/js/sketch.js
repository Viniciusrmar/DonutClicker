// SKETCH.JS
// Ponto de entrada do p5.js

// executa uma unica vez ao iniciar
function setup() {
    createCanvas(680, 520);
    textFont("monospace")
}

// executa ~60 vezes por segundo (loop principal)
function draw() {
    background(250, 240, 230);

    // produção automatica de donuts (roda a cada 100ms internamente)
    executarProducaoAutomatica();

    // atualiza o progresso das maestrias (sistema de maestria)
    atualizarMaestrias();

    // desenha a tela correspondente ao estado atual do jogo
    if (telaAtual === "inicio") desenharTelaInicio();
    if (telaAtual === "jogo") desenharTelaJogo();
    if (telaAtual === "gameover") desenharTelaGameOver();
    if (telaAtual === "maestria") desenharTelaMaestria();

    // atualiza e desenha as particulas visuais de click
    atualizarParticulas();
}