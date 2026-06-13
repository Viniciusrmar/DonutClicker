// MAESTRIA_CLIQUE.JS
// Maestria do Clique: sobe de nível conforme o jogador clica no donut
// e aumenta os donuts ganhos por clique

let maestriaClique = {
    nome: "Maestria do Clique",
    emoji: "👆",
    cor: [230, 120, 60],

    nivel: 0,
    nivelMaximo: 5,

    // cliques necessários para cada nível
    metas: [25, 100, 300, 700, 1500],

    valorAtual: 0,
    descricao: "+1 donut por clique a cada nível",

    // mede o progresso e sobe de nível
    atualizar: function () {
        this.valorAtual = totalCliques;

        while (this.nivel < this.nivelMaximo && this.valorAtual >= this.metas[this.nivel]) {
            this.nivel++;
            donutsPerClick += 1; // bônus: +1 por clique a cada nível
        }
    }
};

registrarMaestria(maestriaClique);
