// MAESTRIA_COMERCIO.JS
// Maestria do Comércio: sobe de nível conforme o jogador compra upgrades
// de produção, e dá um bônus de donuts a cada nível

let maestriaComercio = new Maestria({
    nome: "Maestria do Comércio",
    emoji: "🛒",
    cor: [90, 150, 200],
    nivelMaximo: 5,
    metas: [5, 15, 30, 50, 80], // nº de compras para cada nível
    descricao: "+500 donuts de bônus a cada nível",

    // mede o progresso: total de upgrades comprados
    medirProgresso: function () {
        return totalUpgradesComprados;
    },

    // bônus aplicado a cada nível: donuts grátis na hora
    aoSubirNivel: function () {
        totalDonuts += 500;
    }
});

registrarMaestria(maestriaComercio);