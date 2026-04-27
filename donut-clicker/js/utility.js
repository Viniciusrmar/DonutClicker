// UTILITY.JS
// funçoes auxiliares reutilizaveis

// formata numeros grandes para ser mais legivel
function formatarNumero(numero) {
    if (numero >= 1000000) return (numero / 1000000).toFixed(1) + "M";
    if (numero >= 1000) return (numero / 1000).toFixed(1) + "K";
    return str(numero);
}

// atualiza e desenha todas as particulas visuais de click
// cada uma sobre meio q flutuando e some gradualmente
function atualizarParticulas() {
    for (let i = listaParticulas.length - 1; i >= 0; i--) {
        let particula = listaParticulas[i];

        // move a particula conforme a velocidade
        particula.posicaoX += particula.velocidadeX;
        particula.posicaoY += particula.velocidadeY;
        particula.vidaRestante--;

        // opacidade diminui conforme a vida da particula acaba
        let opacidadeParticula = map(particula.vidaRestante, 0, 60, 0, 220);

        fill(180, 80, 20, opacidadeParticula);
        noStroke();
        textAlign(CENTER);
        textSize(13);
        text("+" + particula.valorExibido, particula.posicaoX, particula.posicaoY);

        // remove a particula se a vida acabar
        if (particula.vidaRestante <= 0) {
            listaParticulas.splice(i, 1);
        }
    }
}