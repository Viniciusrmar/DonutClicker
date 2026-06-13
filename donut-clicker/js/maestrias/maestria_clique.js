// MAESTRIA_CLIQUE.JS
// Maestria do Clique: sobe de nível conforme o jogador clica no donut
// e aumenta os donuts ganhos por clique

let maestriaClique = new Maestria({
    nome: "Maestria do Clique",
    emoji: "👆",
    cor: [230, 120, 60],
    nivelMaximo: 5,
    metas: [25, 100, 300, 700, 1500], // cliques necessários para cada nível
    descricao: "+1 donut por clique a cada nível",

    // mede o progresso: total de cliques no donut
    medirProgresso: function () {
        return totalCliques;
    },

    // bônus aplicado a cada nível
    aoSubirNivel: function () {
        donutsPerClick += 1;
    }
});

registrarMaestria(maestriaClique);
