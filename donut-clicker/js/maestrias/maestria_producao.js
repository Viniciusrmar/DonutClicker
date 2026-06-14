// MAESTRIA_PRODUCAO.JS
// Maestria da Produção: sobe de nível conforme a produção automática
// (donuts por segundo) aumenta, e dá mais produção por segundo

let maestriaProducao = new Maestria({
    nome: "Maestria da Produção",
    emoji: "🏭",
    cor: [120, 170, 90],
    nivelMaximo: 5,
    metas: [1, 5, 15, 40, 100], // produção por segundo para cada nível
    descricao: "+2 donuts por segundo a cada nível",

    // mede o progresso: produção automática atual
    medirProgresso: function () {
        return donutsPerSecond;
    },

    // bônus aplicado a cada nível
    aoSubirNivel: function () {
        donutsPerSecond += 2;
    }
});

registrarMaestria(maestriaProducao);