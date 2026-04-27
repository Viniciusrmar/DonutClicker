// DATA.JS
// Variáveis globais e dados dos upgrades

let totalDonuts = 0; //total acumulado
let donutsPerClick = 1; //ganho por click
let donutsPerSecond = 0; //produção autommatica
let ultimoTempoProducao = 0; //ultima vez q a produção automatica rodou

// Game State
// Tela de exibição atual: "Inicio", "Jogo", "Gameover"
let telaAtual = "inicio";

// Animação donut
let anguloRotacao = 0; //ângulo de rotação do donut

// Particulas de click
let listaParticulas = []; // Array para guardar as particulas q aparecem ao clicar

// Upgrades Prdução automática
// Cada ubgrade quando comprado add 'producaoPerSecond' ao total automatico
// O custo sobe 15% a cada compra do mesmo upgrade
let listaUpgrades = [
    {
        nome: "Auto Clicker",
        custo: 10,
        producaoPerSecond: 0.1,
        quantidadeComprada: 0,
        descricao: "+0.1/s"
    },
        {
        nome: "Padaria",
        custo: 100,
        producaoPerSecond: 0.5,
        quantidadeComprada: 0,
        descricao: "+0.5/s"
    },
        {
        nome: "Fábrica",
        custo: 500,
        producaoPerSecond: 2,
        quantidadeComprada: 0,
        descricao: "+2/s"
    },
        {
        nome: "Robo Padeiro",
        custo: 2000,
        producaoPerSecond: 10,
        quantidadeComprada: 0,
        descricao: "+10/s"
    },
        {
        nome: "Mega Industria",
        custo: 8000,
        producaoPerSecond: 25,
        quantidadeComprada: 0,
        descricao: "+25/s"
    },
]

// Melhorias de click
// melhorias de compra unica, n acumulativa (aumenta donutPerClick)
let listaMelhorias = [
    {
        nome: "luvas de Padeiro",
        custo: 50,
        bonusPerClick: 1,
        comprada: false
    },
        {
        nome: "Turbo Click",
        custo: 300,
        bonusPerClick: 3,
        comprada: false
    },
        {
        nome: "Mãos de Ouro",
        custo: 1500,
        bonusPerClick: 10,
        comprada: false
    },
]

//Meta para vencer o jogo
const META_DONUTS = 50000; //quantidade necessaria para vencer
