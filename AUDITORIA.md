# Auditorias do MecânicaPro

Para rodar tudo de uma vez:

```
node auditoria-tudo.js
```

São três auditorias, que olham coisas diferentes. Nenhuma substitui a outra —
cada bug que escapou até hoje escapou porque não havia ninguém olhando
*aquele* ângulo.

| arquivo | o que olha | precisa de |
|---|---|---|
| `auditoria.js` | o que está **escrito** | nada, só Node |
| `auditoria-3d.js` | o que se **vê** | navegador |
| `auditoria-interface.js` | o que **acontece ao clicar** | navegador |

Para as duas últimas:

```
npm i playwright-core && npx playwright install chromium
```

Se você já tem um Chrome instalado, dá para apontar para ele:
`CHROMIUM=/caminho/do/chrome node auditoria-tudo.js`

**Erro** é coisa quebrada, para consertar. **Aviso** é coisa para olhar e
decidir — buraco na linha do tempo de uma marca, uma peça com dois nomes
diferentes de propósito. Aviso não é necessariamente defeito.

---

## 1. `auditoria.js` — o conteúdo

- **Estrutura**: grupo apontando para marca que não existe, marca em dois
  grupos, marca sem grupo, logo faltando.
- **Datas**: período ilegível, fim antes do começo, ano impossível, famílias
  fora de ordem cronológica, motor anterior à fundação da marca.
- **Duplicatas**: família repetida dentro da marca, variante repetida.
- **Variantes**: variante que começa antes ou termina depois da família.
- **Lacunas**: buraco de mais de 18 anos na linha do tempo de uma marca.
- **Marcas citadas no texto** que não existem no site.
- **Cobertura do 3D**: toda família tem que cair numa arquitetura que existe;
  toda arquitetura precisa de título, peças suficientes e ids únicos.
- **Componente incompatível** (a peça que não existe naquele motor):
  diesel com vela de ignição, motor a ar com bomba d'água, correia dentada
  em motor anterior a 1962, dois tempos com comando de válvulas, híbrido
  classificado como elétrico puro.
- **Nomes e textos das peças**: dois nomes iguais na mesma lista, nome em
  minúscula, nome comprido demais para caber no rótulo, texto curto demais,
  sobra de rascunho (`TODO`, `FIXME`), texto idêntico em duas peças
  diferentes, mesma peça com nomes diferentes entre arquiteturas.

## 2. `auditoria-3d.js` — a geometria

Mede as 86 arquiteturas, peça por peça, sem depender de ninguém olhar.

- **Peça vazia**: fábrica que quebra, que não devolve objeto, que devolve
  objeto sem malha ou sem volume nenhum.
- **Coordenada inválida**: NaN ou infinito na posição.
- **Entrada da vista explodida** ausente, inválida ou `[0,0,0]`.
- **Órbita** — *gira fora do próprio eixo*. Peça que só roda tem que manter o
  centro parado. Se o centro passeia, ela está girando em torno de um eixo que
  não passa por ela, e na tela faz uma volta em vez de girar no lugar.
  Peças em que a órbita é o funcionamento certo do motor (o rotor e o
  excêntrico do Wankel) se declaram com `excentrico: true`.
- **Repouso**: com o motor desligado (`animar(obj, 0)`) a peça tem que voltar
  exatamente à pose de origem, senão fica torta parada.
- **Arranjo circular inconsistente** — *as pás comidas*. Cópias da mesma
  geometria distribuídas em roda e igualmente espaçadas têm que ser o mesmo
  sólido girado. O teste mede, de cada cópia, o quanto ela avança no eixo da
  roda e a que distância do eixo fica: dois números que não mudam quando a
  cópia gira em volta desse eixo. Se as cópias dão números diferentes, elas
  estão tortas umas em relação às outras e o conjunto parece deformado
  girando.
- **Peça solta** no espaço, sem encostar em nenhuma outra.
- **Peça miúda** demais para ser vista.
- **Duas peças** no mesmo lugar e do mesmo tamanho.
- **Enquadramento**: motor longe da origem nasce descentralizado na tela.

## 3. `auditoria-interface.js` — o comportamento

Abre o site num navegador de verdade e clica em tudo.

- **Nomes das peças**: liga, desliga, e — o caso que já escapou uma vez —
  liga e desliga **dentro da vista explodida**.
- **Vista explodida**: afasta as peças, o motor cresce, o botão troca de
  texto, e ao juntar todas voltam exatamente ao lugar. Avisa quando alguma
  peça continua escondida atrás das outras mesmo explodida.
- **Ligar o motor**: mexe enquanto ligado, para de vez quando desligado,
  o botão troca de texto.
- **Zoom**: começa em 100%, `+` aproxima, `−` afasta, centralizar volta a 100%.
- **Modo montar**: começa na peça 1 com o palco vazio, explodir e ligar
  travados; peça fora de ordem avisa e não entra; peça certa entra e avança;
  no fim avisa que está completo e destrava os botões.
- **Selecionar peça**: destaca na lista, o painel fala dela, as outras peças
  apagam, e clicar de novo desfaz.
- **Rótulos** não podem vazar para fora da área do desenho.
- **Passeio por várias arquiteturas** caçando erro de script, contagem de
  peças diferente da lista e falta de suporte a 3D.
- **Página inicial**: grade de grupos e glossário preenchidos, busca
  filtrando, aviso de "nada encontrado", âncoras do menu existindo.
- **Links para o 3D**: toda família tem que cair numa arquitetura que existe.
- **Mapa mental** abre com conteúdo.
- **Aplicativo (PWA)**: manifest com nome, janela própria, ícones existindo
  (inclusive o *maskable*), service worker sem prometer arquivo que não
  existe, e todas as páginas registrando o service worker e apontando para o
  manifest.
- **Versões (`?v=N`)**: arquivo pedido com versões diferentes em páginas
  diferentes (uma delas serviria código velho), arquivo que não existe,
  arquivo carregado sem `?v=`.
- Em todas as páginas: **erro de script** e **arquivo 404**. Coisa de fora
  (fonte do Google, foto do Unsplash) vira aviso, não erro, porque só dá para
  conferir com internet.

---

## Como estas auditorias nasceram

Cada teste aqui existe por causa de um bug que passou. Vale lembrar quais,
porque o padrão se repete:

1. **A ventoinha do boxer a ar estava fora do eixo.** Todas as peças dela
   estavam 0,15 acima da linha do virabrequim, e a animação girava o grupo em
   torno de y = 0 — ela orbitava. → teste de **órbita**, que achou mais quatro
   peças com o mesmo defeito (comando e volante de quase todos os motores).

2. **As pás dessa ventoinha pareciam comidas.** O passo e a posição no relógio
   estavam como dois ângulos no mesmo objeto, e o Three resolve os dois na
   ordem XYZ: o passo acabava aplicado em torno do Y do mundo e cada pá
   inclinava diferente. → teste de **arranjo circular**, que achou o mesmo
   defeito na ventoinha dos motores em linha a ar.

3. **O botão "Nomes das peças" não desligava nada na vista explodida.** O
   código era `nomes || explodido`, então explodir forçava os nomes e o botão
   não tinha como apagá-los. → **auditoria de interface** inteira.

A lição: auditoria de dado não pega defeito de forma, e auditoria de forma não
pega defeito de comportamento. Quando aparecer um bug que nenhuma das três
pegaria, o conserto não está completo enquanto não existir o teste que o pega.

## Uma armadilha ao escrever testes aqui

Em software (sem placa de vídeo), o 3D roda a uns **2 quadros por segundo**.
Teste que clica e lê a tela 600 ms depois lê o quadro *anterior* e acusa erro
que não existe — já aconteceu, e quase me fez "desfazer" um conserto que
estava certo. Por isso:

- as leituras esperam `QUADRO = 3000 ms`;
- a vista explodida chega ao fim por aproximação (12% do que falta por
  quadro, uns 55 quadros), então o teste **pergunta** se acabou
  (`Motor3D._interno().explode`) em vez de cronometrar.
