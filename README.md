# 🍩 Donut Clicker

Tema 1: Game Simples

## Integrantes

- **Felipe Bresciani Janz**
- **Pedro Augusto Stabach**
- **Vinicius Machado de Moura**
- **Vinicius Robaskievicz Marinho**

---

## Sobre o jogo

**Donut Clicker** é um jogo casual de clique inspirado no Cookie Clicker. O objetivo é produzir **50.000 donuts** clicando no donut da tela e comprando melhorias na loja para aumentar sua produção.

### Telas
- **Tela de Início** — apresenta o jogo e o botão para começar
- **Tela de Jogo** — gameplay principal com donut clicável e loja de upgrades
- **Tela de Game Over** — tela de vitória ao atingir 50.000 donuts, com pontuação final

---

## Como jogar

1. Clique em **JOGAR** na tela inicial
2. **Clique no donut** para ganhar donuts manualmente
3. Use os donuts acumulados para comprar itens na **loja** (painel direito):
   - **Produção Automática** — compre fornos, padarias e fábricas para produzir donuts automaticamente por segundo
   - **Melhorias de Clique** — compre melhorias para ganhar mais donuts a cada clique manual
4. Chegue a **50.000 donuts** para vencer!

---

## Como executar
### Abrir direto no navegador
Basta abrir o arquivo `index.html` em qualquer navegador (Chrome, Firefox, Edge).

## Estrutura do projeto

```
donut-clicker/
├── index.html        # Página principal que carrega o jogo
├── style.css         # Estilo da página (fundo, centralização do canvas)
├── README.md         # Este arquivo
└── js/
    ├── dados.js      # Variáveis globais e dados dos upgrades/melhorias
    ├── desenho.js    # Funções responsáveis por desenhar telas e elementos
    ├── logica.js     # Lógica de cliques, compras e produção automática
    ├── utilidades.js # Funções auxiliares: formatarNumero e partículas
    └── sketch.js     # Ponto de entrada do p5.js (setup e draw)
```

## Tecnologias utilizadas

- [p5.js](https://p5js.org/) — biblioteca JavaScript para criação de jogos e animações
- JavaScript puro (sem frameworks adicionais)

---

## Critérios técnicos atendidos

| Critério | Como foi implementado |
|---|---|
| Variáveis | `totalDonuts`, `donutsGanhosPorClique`, `producaoAutomaticaPorSegundo`, `telaAtual`, etc. |
| Condicionais | verificação de compra (`podeComprar`), detecção de clique, seleção de tela |
| Repetição | laços `for` em `listaUpgrades`, `listaMelhorias` e `listaParticulas` |
| Funções | uma função por responsabilidade: `desenharTelaJogo`, `tratarCliqueNosUpgrades`, `executarProducaoAutomatica`, etc. |
| Organização | código separado em 5 arquivos por responsabilidade |
| Comentários | todos os arquivos comentados explicando variáveis e funções |
| Tela de início | ok |
| Tela de game over | ok |
| Contagem de pontos | ok contador de donuts + barra de progresso |
| Feito em p5.js | ok |