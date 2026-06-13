# 🎬 Roteiro do Vídeo — Donut Clicker (Final Challenge)

Duração alvo: **7 a 9 minutos**. Todos os 4 integrantes precisam aparecer e falar.
O vídeo é teste de autoria: além de mostrar o jogo, **cada um explica o código que fez**.

Dica de gravação: abram o jogo (`Index.html`) e o VS Code lado a lado. Quem está falando
mostra o trecho de código dele e demonstra a parte funcionando no jogo.

---

## Ordem e tempo

| Bloco | Quem | Tempo |
|---|---|---|
| 1. Abertura + visão geral + telas | Vinicius R. Marinho | ~2:00 |
| 2. Clique no donut, donut animado e partículas | Felipe | ~1:45 |
| 3. Loja: produção automática | Pedro | ~1:45 |
| 4. Melhorias, progresso e game over | Vinicius M. de Moura | ~1:45 |
| 5. Sistema de maestria (cada um fala da sua) | Todos | ~1:30 |
| 6. Fechamento | Vinicius R. Marinho | ~0:30 |

---

## Bloco 1 — Vinicius Robaskievicz Marinho (abertura + estrutura)

**Mostrar:** tela de início, botão SOBRE com os nomes, e os arquivos do projeto.

Falar:
- Apresentar o grupo e o jogo: "Donut Clicker, um clicker onde o objetivo é produzir 50.000 donuts."
- Mostrar a **tela de início** e a **tela de sobre** com os integrantes (atende a regra do menu de abertura).
- Explicar a estrutura: o jogo usa **p5.js**, com `setup()` (roda uma vez) e `draw()` (roda ~60x por segundo) — arquivo `sketch.js`.
- Explicar o controle de telas: a variável `telaAtual` decide o que desenhar ("inicio", "sobre", "jogo", "gameover", "maestria"). Mostrar os `if (telaAtual === ...)` no `draw()`.
- Explicar a **organização em arquivos por responsabilidade**: `data.js` (variáveis), `desenho.js` (telas), `logica.js` (cliques e compras), `utility.js` (auxiliares, partículas e sons), `sketch.js` (entrada) e a pasta `maestrias/`.

**Código-chave para mostrar:** `sketch.js` inteiro e `desenharTelaSobre()` em `desenho.js`.

---

## Bloco 2 — Felipe Bresciani Janz (clique, donut animado e partículas)

**Mostrar:** clicar no donut e as partículas "+valor" subindo; ouvir o som do clique.

Falar:
- Como o clique é detectado: `mousePressed()` chama `tratarClickDonut()`, que usa `dist()` para ver se o mouse caiu dentro do raio do donut.
- O que acontece ao clicar: soma `donutsPerClick` em `totalDonuts` e toca o som (`tocarSomClique()`).
- A **classe Particula** (em `utility.js`): explicar o `constructor` (posição, velocidade, vida) e os métodos `atualizar()`, `desenhar()` e `terminou()`. Mostrar que cada clique cria `new Particula(...)`.
- O **donut animado**: função `desenharDonutAnimado()` — uso de `push/pop`, `translate`, `rotate` e o `for` que desenha os granulados girando.

**Código-chave:** `class Particula` e `atualizarParticulas()` (utility.js), `tratarClickDonut()` (logica.js), `desenharDonutAnimado()` (desenho.js).

---

## Bloco 3 — Pedro Augusto Stabach (loja de produção automática)

**Mostrar:** comprar upgrades e ver o "por segundo" subir; ouvir o som da compra.

Falar:
- A lista `listaUpgrades` em `data.js`: cada upgrade é um objeto com `nome`, `custo`, `producaoPerSecond`, `quantidadeComprada`.
- A compra: `tratarClickUpgrades()` percorre a lista com um `for`, checa se o mouse clicou no card e se há donuts suficientes (`condicional`), desconta o custo, soma a produção e **aumenta o custo em 15%** (`upgrade.custo * 1.15`).
- A **produção automática**: `executarProducaoAutomatica()` roda a cada 100ms (usando `millis()`) e soma `donutsPerSecond / 10` para deixar a produção suave.
- Como os cards são desenhados: `desenharCardUpgrade()` muda a cor conforme dá pra comprar ou não.

**Código-chave:** `listaUpgrades` (data.js), `tratarClickUpgrades()` e `executarProducaoAutomatica()` (logica.js), `desenharCardUpgrade()` (desenho.js).

---

## Bloco 4 — Vinicius Machado de Moura (melhorias, progresso e game over)

**Mostrar:** comprar uma melhoria de clique, a barra de progresso enchendo e a tela de vitória.

Falar:
- As **melhorias de clique** (`listaMelhorias` em `data.js`): compra única (`comprada: true/false`), aumentam `donutsPerClick`. Explicar `tratarClickMelhorias()`.
- A **barra de progresso**: `desenharBarraProgresso()` usa `constrain(totalDonuts / META_DONUTS, 0, 1)` para calcular quanto encher.
- A **condição de vitória**: quando `totalDonuts >= META_DONUTS`, `telaAtual` vira "gameover". Mostrar `desenharTelaGameOver()`.
- O **reinício**: `reiniciarJogo()` zera todas as variáveis e as maestrias (`reiniciarMaestrias()`).
- A formatação dos números: `formatarNumero()` (transforma 1500 em "1.5K").

**Código-chave:** `listaMelhorias` (data.js), `tratarClickMelhorias()` e `reiniciarJogo()` (logica.js), `desenharBarraProgresso()` e `desenharTelaGameOver()` (desenho.js).

---

## Bloco 5 — Sistema de maestria (cada um fala ~20s da sua)

**Mostrar:** abrir a tela 🏆 MAESTRIAS e mostrar as 4 barras subindo; ouvir o som de subir de nível.

Primeiro, **Vinicius R. Marinho** explica a base:
- A **classe `Maestria`** (em `maestria_core.js`): recebe os dados + duas funções (`medirProgresso` e `aoSubirNivel`); o método `atualizar()` sobe de nível enquanto bate as `metas` e aplica o bônus.
- A lista `listaMaestrias` e como o `core` desenha todas as barras automaticamente.

Depois, cada um fala da sua (mostrando o próprio arquivo):
- **Vinicius R. Marinho — Maestria do Clique** (`maestria_clique.js`): progresso = total de cliques; bônus = +1 por clique.
- **Felipe — Maestria da Produção** (`maestria_producao.js`): progresso = donuts por segundo; bônus = +2/s.
- **Pedro — Maestria do Comércio** (`maestria_comercio.js`): progresso = nº de compras; bônus = +500 donuts.
- **Vinicius M. de Moura — Maestria da Riqueza** (`maestria_riqueza.js`): progresso = recorde de donuts; bônus = +2 por clique.

---

## Bloco 6 — Fechamento (Vinicius R. Marinho)

- Recapitular rapidinho: menu com sobre, progressão (score, barra, maestrias), funções e classes, sons e animações.
- Agradecer e encerrar.

---

## Checklist antes de gravar

- [ ] Jogo abrindo sem erro no navegador (testar `Index.html`).
- [ ] Os 4 arquivos de maestria preenchidos e commitados por cada um.
- [ ] Todos com microfone funcionando e o código aberto.
- [ ] Depois de subir o vídeo no YouTube (não listado), colar o link no `README.md`.
