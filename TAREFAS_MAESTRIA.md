# 🏆 Sistema de Maestria — Divisão de Tarefas

Adicionamos um **sistema de maestria** ao Donut Clicker. São **4 maestrias**, uma por pessoa.
Cada maestria sobe de nível conforme o jogador joga e dá um **bônus permanente** (até reiniciar o jogo).

Uma nova tela **"🏆 MAESTRIAS"** mostra o progresso (botão no painel esquerdo, durante o jogo).

---

## Quem faz o quê

| Pessoa | Arquivo | Maestria | Sobe de nível com | Bônus por nível |
|---|---|---|---|---|
| **Vinicius R. Marinho** | `js/maestrias/maestria_clique.js` | 👆 Clique | total de cliques no donut | +1 donut por clique |
| **Felipe B. Janz** | `js/maestrias/maestria_producao.js` | 🏭 Produção | donuts por segundo | +2 por segundo |
| **Pedro A. Stabach** | `js/maestrias/maestria_comercio.js` | 🛒 Comércio | nº de upgrades comprados | +500 donuts de bônus |
| **Vinicius M. de Moura** | `js/maestrias/maestria_riqueza.js` | 💰 Riqueza | recorde de donuts acumulados | +2 donuts por clique |

> A base comum (`js/maestrias/maestria_core.js`) e a fiação no resto do jogo **já estão prontas**.
> Cada pessoa escreve e commita **só o seu arquivo** — assim ninguém dá conflito no Git.

---

## O que cada um precisa fazer

Cada pessoa escreve o seu arquivo de maestria seguindo o padrão (um objeto + a função `atualizar()`):

1. Criar o objeto com os campos: `nome`, `emoji`, `cor`, `nivel`, `nivelMaximo`, `metas`, `valorAtual`, `descricao`.
2. Escrever a função `atualizar()` — mede o progresso e sobe de nível, aplicando o bônus.
3. No final, chamar `registrarMaestria(suaMaestria)`.
4. Testar no navegador: abrir o jogo, jogar e ver a sua barra subir na tela de Maestrias.

---

## Como testar

Abra `donut-clicker/Index.html` no navegador (Chrome, Firefox ou Edge).

1. Clique em **JOGAR**.
2. No painel esquerdo aparece o botão **🏆 MAESTRIAS** — clique para ver as 4 barras.
3. Jogue (clique no donut, compre upgrades) e volte na tela de maestrias para ver o progresso.
4. Cada nível alcançado aplica o bônus na hora (veja "por click" / "por segundo" mudarem).

---

## Estrutura dos arquivos novos

```
donut-clicker/js/maestrias/
├── maestria_core.js       # base comum (lista, tela, barras, contadores) — PRONTO
├── maestria_clique.js     # Vinicius R. Marinho
├── maestria_producao.js   # Felipe B. Janz
├── maestria_comercio.js   # Pedro A. Stabach
└── maestria_riqueza.js    # Vinicius M. de Moura
```

## Como uma maestria conversa com o jogo (resumo técnico)

- Cada maestria é um **objeto** com campos padrão (`nome`, `emoji`, `cor`, `nivel`, `nivelMaximo`, `metas`, `valorAtual`, `descricao`) e uma função `atualizar()`.
- No final do arquivo, chama `registrarMaestria(suaMaestria)` para entrar na lista.
- O `maestria_core.js` percorre a lista todo frame chamando `atualizar()` e desenha as barras automaticamente.
- Contadores prontos para usar: `totalCliques`, `totalUpgradesComprados`, e as globais `donutsPerSecond` e `totalDonuts`.
