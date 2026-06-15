// MAESTRIA_RIQUEZA.JS
// Maestria da Riqueza: sobe de nível conforme o recorde de donuts
// acumulados, e aumenta os donuts ganhos por clique

let maestriaRiqueza = new Maestria({
    nome: "Maestria da Riqueza",
    emoji: "💰",
    cor: [210, 175, 55],
    nivelMaximo: 5,
    metas: [1000, 5000, 12000, 25000, 45000], // recorde de donuts para cada nível
    descricao: "+2 donuts por clique a cada nível",

    // mede o progresso: usa "this.recorde" para guardar o maior total já alcançado
    // (totalDonuts cai quando você compra, por isso guardamos o recorde)
    medirProgresso: function () {
        if (this.recorde === undefined) this.recorde = 0;
        if (totalDonuts > this.recorde) this.recorde = totalDonuts;
        return this.recorde;
    },

    // bônus aplicado a cada nível
    aoSubirNivel: function () {
        donutsPerClick += 2;
    }
});

registrarMaestria(maestriaRiqueza);