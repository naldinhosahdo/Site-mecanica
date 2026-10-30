// =========================================
// AUDITORIA DA INTERFACE
//
// As outras duas auditorias olham os dados (auditoria.js) e a geometria
// (auditoria-3d.js). Esta abre o site num navegador de verdade, clica em
// tudo e confere se cada botão faz o que promete.
//
// Ela nasceu do bug do botão "Nomes das peças", que na vista explodida
// não desligava nada. Nenhuma auditoria pegava aquilo, porque o defeito
// não estava no dado nem na forma: estava no comportamento.
//
// Como rodar:   node auditoria-interface.js
// Precisa de:   playwright-core + um Chromium, e o site servido em
//               http://localhost:8832 (ou PORTA=xxxx node auditoria-interface.js)
// =========================================
const { chromium } = require('playwright-core');
const fs = require('fs');

const PORTA   = process.env.PORTA || 8832;
const BASE    = `http://localhost:${PORTA}`;
const CHROMIU = process.env.CHROMIUM || '/opt/pw-browsers/chromium';

// Em software o 3D roda a poucos quadros por segundo. Quem lê a tela logo
// depois de clicar lê o quadro ANTERIOR e acusa um erro que não existe —
// já aconteceu aqui. Por isso toda leitura espera de verdade.
const QUADRO = 3000;

const E = [], W = [];
const erro  = m => E.push(m);
const aviso = m => W.push(m);
const ok    = (cond, m) => { if (!cond) erro(m); return cond; };

(async () => {
  const navegador = await chromium.launch({
    executablePath: CHROMIU,
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });
  const ctx = await navegador.newContext({ viewport: { width: 1100, height: 800 } });

  // ---------------------------------------------------------------
  // toda página é vigiada: erro de script e arquivo que não existe
  // ---------------------------------------------------------------
  let paginaAtual = '';
  const vigiar = p => {
    p.on('pageerror', e => erro(`[js] erro de script em ${paginaAtual}: ${e.message}`));
    p.on('console', m => {
      if (m.type() === 'error' && !/favicon/i.test(m.text()))
        aviso(`[console] ${paginaAtual}: ${m.text().slice(0, 160)}`);
    });
    p.on('response', r => {
      if (r.status() < 400) return;
      // arquivo do próprio site que falta é erro; coisa de fora (fonte do
      // Google, foto do Unsplash) só pode ser conferida com internet
      if (r.url().startsWith(BASE))
        erro(`[404] ${paginaAtual} pede um arquivo que não existe: ` +
             `${r.url().replace(BASE, '')} (${r.status()})`);
      else
        aviso(`[externo] ${paginaAtual} depende de ${new URL(r.url()).host} (${r.status()})`);
    });
    p.on('requestfailed', r => {
      if (!r.url().startsWith(BASE))
        aviso(`[externo] ${paginaAtual} não conseguiu carregar de ${new URL(r.url()).host}`);
      else erro(`[rede] ${paginaAtual} falhou ao carregar ${r.url().replace(BASE, '')}`);
    });
  };

  const pagina = await ctx.newPage();
  vigiar(pagina);

  const abrirMotor = async arq => {
    paginaAtual = `montagem.html?arq=${arq}`;
    await pagina.goto(`${BASE}/${paginaAtual}`, { waitUntil: 'networkidle' });
    await pagina.waitForTimeout(QUADRO);
  };

  // quantos rótulos estão à mostra, e quantos deles mostram o nome da peça
  const lerRotulos = () => pagina.evaluate(() => {
    const vis = [...document.querySelectorAll('#rotulos .rotulo')]
      .filter(d => d.style.display !== 'none');
    return {
      visiveis: vis.length,
      comNome: vis.filter(d => !d.classList.contains('rotulo--so-num')).length,
    };
  });

  // posição de cada peça no mundo 3D, para saber se algo de fato se mexeu
  const lerPosicoes = () => pagina.evaluate(() =>
    window.Motor3D._interno().pecas.map(p =>
      [+p.obj.position.x.toFixed(3), +p.obj.position.y.toFixed(3), +p.obj.position.z.toFixed(3)]));

  const mexeu = (a, b) => a.some((p, i) => b[i] && p.some((v, k) => Math.abs(v - b[i][k]) > 1e-3));

  // A vista explodida chega ao fim por aproximação (12% do que falta por
  // quadro), e em software o 3D roda a poucos quadros por segundo. Cronometrar
  // um tempo fixo aqui dá erro falso: o certo é esperar as peças pararem.
  const esperarParar = async (limite = 60000) => {
    try {
      await pagina.waitForFunction(() => {
        const e = window.Motor3D._interno();
        return Math.abs(e.explode.alvo - e.explode.atual) <= .001 && !e.animando;
      }, null, { timeout: limite, polling: 400 });
      return true;
    } catch (e) { return false; }
  };

  // =================================================================
  // 1. BOTÃO "NOMES DAS PEÇAS"
  //    o bug original: na vista explodida ele não desligava nada
  // =================================================================
  await abrirMotor('linha4');

  {
    const inicio = await lerRotulos();
    ok(inicio.visiveis > 0, '[rotulo] nenhum rótulo aparece com o motor montado');
    ok(inicio.comNome === 0,
       `[nomes] os nomes já começam ligados sem ninguém pedir (${inicio.comNome} à mostra)`);

    await pagina.click('#btn-nomes');
    await pagina.waitForTimeout(QUADRO);
    const ligado = await lerRotulos();
    ok(ligado.comNome > 0, '[nomes] ligar "Nomes das peças" não mostrou nome nenhum');

    await pagina.click('#btn-nomes');
    await pagina.waitForTimeout(QUADRO);
    const desligado = await lerRotulos();
    ok(desligado.comNome === 0,
       `[nomes] desligar "Nomes das peças" deixou ${desligado.comNome} nomes na tela`);

    // ---- e agora o caso que escapou: dentro da vista explodida ----
    await pagina.click('#btn-explodir');
    await pagina.waitForTimeout(QUADRO);
    const exp = await lerRotulos();
    ok(exp.comNome > 0, '[nomes] a vista explodida devia acender os nomes e não acendeu');

    await pagina.click('#btn-nomes');
    await pagina.waitForTimeout(QUADRO);
    const expDesl = await lerRotulos();
    ok(expDesl.comNome === 0,
       `[nomes] NA VISTA EXPLODIDA o botão não desliga os nomes (${expDesl.comNome} ficaram) ` +
       '— foi exatamente este o bug relatado');

    await pagina.click('#btn-nomes');
    await pagina.waitForTimeout(QUADRO);
    ok((await lerRotulos()).comNome > 0,
       '[nomes] na vista explodida o botão desliga mas não liga de volta');
  }

  // =================================================================
  // 2. VISTA EXPLODIDA: as peças se afastam e voltam
  // =================================================================
  {
    await abrirMotor('linha4');
    const juntas = await lerPosicoes();

    await pagina.click('#btn-explodir');
    ok(await esperarParar(), '[explodir] as peças não param de se afastar nunca');
    const abertas = await lerPosicoes();
    ok(mexeu(juntas, abertas), '[explodir] clicar em "Vista explodida" não afastou peça nenhuma');

    // tem que separar de verdade: o motor inteiro fica maior
    const cresceu = await pagina.evaluate(() => {
      const { THREE, pecas } = window.Motor3D._interno();
      const c = new THREE.Box3();
      pecas.forEach(p => c.expandByObject(p.obj));
      return c.getSize(new THREE.Vector3()).length();
    });

    ok((await pagina.textContent('#btn-explodir')).includes('Juntar'),
       '[explodir] o botão continua escrito "Vista explodida" depois de explodir');

    await pagina.click('#btn-explodir');
    ok(await esperarParar(), '[explodir] as peças não param de voltar nunca');
    const voltaram = await lerPosicoes();
    const longe = voltaram.filter((p, i) =>
      p.some((v, k) => Math.abs(v - juntas[i][k]) > .05)).length;
    ok(longe === 0, `[explodir] ao juntar de volta, ${longe} peças não voltaram ao lugar`);

    const depois = await pagina.evaluate(() => {
      const { THREE, pecas } = window.Motor3D._interno();
      const c = new THREE.Box3();
      pecas.forEach(p => c.expandByObject(p.obj));
      return c.getSize(new THREE.Vector3()).length();
    });
    ok(cresceu > depois * 1.15,
       '[explodir] a vista explodida mal separa as peças (o motor quase não cresce)');
  }

  // =================================================================
  // 2b. EXPLODIDO, TODA PEÇA DEVIA FICAR À MOSTRA
  //     peça que continua escondida atrás de outra perde a bolinha
  //     quando os nomes estão desligados
  // =================================================================
  for (const arq of ['linha4', 'v8', 'boxerAr', 'w12', 'rotativo2']) {
    await abrirMotor(arq);
    await pagina.click('#btn-explodir');
    await esperarParar();
    await pagina.waitForTimeout(QUADRO);           // a medição de oclusão roda a cada 5 quadros
    const escondidas = await pagina.evaluate(x => {
      const nomes = arquiteturas[x].pecas.map(p => p.nome);
      return window.Motor3D._interno().pecas
        .map((p, i) => p.tapada ? nomes[i] : null).filter(Boolean);
    }, arq);
    if (escondidas.length)
      aviso(`[explodir] ${arq}: mesmo explodido, ${escondidas.length} peça(s) continuam ` +
            `escondidas atrás das outras: ${escondidas.join(', ')}`);
  }

  // =================================================================
  // 3. LIGAR O MOTOR: mexe enquanto ligado, para quando desligado
  // =================================================================
  {
    await abrirMotor('linha4');
    const quieto = await pagina.evaluate(() => {
      const { pecas } = window.Motor3D._interno();
      return pecas.map(p => p.obj.children.map(c => +c.position.y.toFixed(4)));
    });

    await pagina.click('#btn-ligar');
    await pagina.waitForTimeout(QUADRO);
    const girando = await pagina.evaluate(() => {
      const { pecas } = window.Motor3D._interno();
      return pecas.map(p => p.obj.children.map(c => +c.position.y.toFixed(4)));
    });
    const mudou = quieto.some((p, i) => p.some((v, k) => girando[i] && girando[i][k] !== v));
    ok(mudou, '[ligar] o motor ligou mas nada se mexeu');
    ok((await pagina.textContent('#btn-ligar')).includes('Desligar'),
       '[ligar] o botão não vira "Desligar motor" com o motor ligado');

    await pagina.click('#btn-ligar');
    await pagina.waitForTimeout(QUADRO);
    const a = await lerPosicoes();
    await pagina.waitForTimeout(1500);
    const b = await lerPosicoes();
    ok(!mexeu(a, b), '[ligar] desliguei o motor e ele continua se mexendo');
  }

  // =================================================================
  // 4. ZOOM E CENTRALIZAR
  // =================================================================
  {
    await abrirMotor('linha4');
    const ler = () => pagina.textContent('#lbl-zoom');
    const inicial = await ler();
    ok(inicial === '100%', `[zoom] o zoom não começa em 100% (está em ${inicial})`);

    await pagina.click('#btn-mais');
    await pagina.waitForTimeout(500);
    const perto = await ler();
    ok(perto !== inicial, '[zoom] o botão de aproximar não mudou o zoom');
    ok(parseInt(perto) > parseInt(inicial), '[zoom] o botão "+" está afastando em vez de aproximar');

    await pagina.click('#btn-menos'); await pagina.click('#btn-menos');
    await pagina.waitForTimeout(500);
    ok(parseInt(await ler()) < parseInt(perto), '[zoom] o botão "−" não afasta');

    await pagina.click('#btn-centro');
    await pagina.waitForTimeout(500);
    ok(await ler() === '100%', '[zoom] "centralizar" não devolve o zoom para 100%');
  }

  // =================================================================
  // 5. MODO MONTAR: ordem, erro fora de hora, e conclusão
  // =================================================================
  {
    await abrirMotor('linha4');
    await pagina.click('#btn-modo');
    await pagina.waitForTimeout(QUADRO);

    const total = await pagina.evaluate(() => document.querySelectorAll('[data-peca]').length);
    ok(total > 0, '[montar] a bandeja de peças ficou vazia no modo montar');
    ok(await pagina.isDisabled('#btn-explodir'),
       '[montar] dá para explodir um motor que ainda não foi montado');
    ok(await pagina.isDisabled('#btn-ligar'),
       '[montar] dá para ligar um motor que ainda não foi montado');
    ok((await pagina.textContent('#hud-passo')).includes('1 de'),
       '[montar] o modo montar não começa na peça 1');

    const naCena = () => pagina.evaluate(() => window.Motor3D._interno().pecas.length);
    ok(await naCena() === 0, '[montar] o palco devia começar vazio e já tem peça nele');

    // clicar fora de ordem: avisa e não monta
    await pagina.click('[data-peca="4"]');
    await pagina.waitForTimeout(600);
    ok((await pagina.textContent('#hud-msg')).includes('Ainda não é a hora'),
       '[montar] clicar numa peça fora de ordem não avisou nada');
    ok(await naCena() === 0, '[montar] a peça entrou no motor mesmo estando fora de ordem');

    // na ordem certa: monta
    await pagina.waitForTimeout(1900);               // o aviso some sozinho
    await pagina.click('[data-peca="0"]');
    await pagina.waitForTimeout(QUADRO);
    ok(await naCena() === 1, '[montar] a peça da vez não entrou no motor');
    ok((await pagina.textContent('#hud-passo')).includes('2 de'),
       '[montar] montar a peça 1 não avançou para a peça 2');

    // monta o resto
    for (let i = 1; i < total; i++) {
      await pagina.click(`[data-peca="${i}"]`);
      await pagina.waitForTimeout(260);
    }
    await pagina.waitForTimeout(QUADRO);
    ok(await naCena() === total,
       `[montar] no fim faltaram peças: ${await naCena()} de ${total}`);
    ok((await pagina.textContent('#hud-msg')).includes('Motor completo'),
       '[montar] o motor ficou completo e não avisou');
    ok(!(await pagina.isDisabled('#btn-explodir')),
       '[montar] motor completo e a vista explodida continua travada');
    ok(!(await pagina.isDisabled('#btn-ligar')),
       '[montar] motor completo e o botão de ligar continua travado');

    await pagina.click('#btn-modo');
    await pagina.waitForTimeout(QUADRO);
    ok((await pagina.textContent('#btn-modo')).includes('Montar'),
       '[montar] o botão de modo não voltou a oferecer "Montar peça por peça"');
  }

  // =================================================================
  // 6. SELECIONAR UMA PEÇA NA LISTA
  // =================================================================
  {
    await abrirMotor('v8');
    await pagina.click('[data-peca="2"]');
    await pagina.waitForTimeout(QUADRO);
    ok(await pagina.evaluate(() =>
         document.querySelector('[data-peca="2"]').classList.contains('peca--ativo')),
       '[selecionar] clicar numa peça da lista não a destaca');

    const nome = await pagina.evaluate(() => arquiteturas.v8.pecas[2].nome);
    ok((await pagina.textContent('#hud-msg')).includes(nome),
       `[selecionar] o painel não fala da peça escolhida ("${nome}")`);

    // a peça destacada fica opaca e as outras apagam
    const op = await pagina.evaluate(() => window.Motor3D._interno().pecas
      .map(p => +(p.materiais[0] ? p.materiais[0].opacity : 1).toFixed(2)));
    ok(op.filter(o => o > .9).length >= 1 && op.filter(o => o < .5).length >= 1,
       '[selecionar] destacar uma peça não apaga as outras');

    await pagina.click('[data-peca="2"]');
    await pagina.waitForTimeout(QUADRO);
    ok(!(await pagina.evaluate(() =>
         document.querySelector('[data-peca="2"]').classList.contains('peca--ativo'))),
       '[selecionar] clicar de novo na mesma peça não desfaz a seleção');
  }

  // =================================================================
  // 7. OS RÓTULOS NÃO PODEM VAZAR PARA FORA DA TELA
  // =================================================================
  {
    await abrirMotor('w16');
    await pagina.click('#btn-explodir');
    await pagina.click('#btn-nomes');
    await pagina.waitForTimeout(QUADRO + 2500);
    const vazando = await pagina.evaluate(() => {
      const caixa = document.getElementById('rotulos').getBoundingClientRect();
      return [...document.querySelectorAll('#rotulos .rotulo')]
        .filter(d => d.style.display !== 'none')
        .filter(d => { const r = d.getBoundingClientRect();
                       return r.left < caixa.left - 2 || r.right > caixa.right + 2 ||
                              r.top < caixa.top - 2  || r.bottom > caixa.bottom + 2; })
        .map(d => d.textContent);
    });
    ok(vazando.length === 0,
       `[rotulo] ${vazando.length} rótulos saem da área do desenho: ${vazando.slice(0,3).join(', ')}`);
  }

  // =================================================================
  // 8. UM PASSEIO POR VÁRIAS ARQUITETURAS, CAÇANDO ERRO DE SCRIPT
  // =================================================================
  for (const arq of ['boxerAr', 'rotativo2', 'eletrico', 'doisTempos2', 'linha6d', 'v12g', 'w8']) {
    await abrirMotor(arq);
    const n = await pagina.evaluate(() => ({
      cena: window.Motor3D._interno().pecas.length,
      lista: document.querySelectorAll('[data-peca]').length,
      semWebgl: document.querySelectorAll('.sem-webgl').length,
    }));
    ok(n.semWebgl === 0, `[3d] ${arq}: a página disse que não tem suporte a 3D`);
    ok(n.cena === n.lista,
       `[3d] ${arq}: a lista mostra ${n.lista} peças mas o motor tem ${n.cena}`);
    await pagina.click('#btn-ligar');
    await pagina.waitForTimeout(QUADRO);
    await pagina.click('#btn-explodir');
    await pagina.waitForTimeout(QUADRO);
  }

  // =================================================================
  // 9. A PÁGINA INICIAL
  // =================================================================
  {
    paginaAtual = 'index.html';
    await pagina.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
    await pagina.waitForTimeout(1200);

    const grupos = await pagina.evaluate(() =>
      document.querySelectorAll('#grupos-grid > *').length);
    ok(grupos > 0, '[home] a grade de grupos de marcas ficou vazia');

    const glossario = await pagina.evaluate(() =>
      document.querySelectorAll('#glossario-grid > *').length);
    ok(glossario > 0, '[home] o glossário ficou vazio');

    // a busca do glossário filtra mesmo?
    await pagina.fill('#busca-glossario', 'virabrequim');
    await pagina.waitForTimeout(700);
    const filtrado = await pagina.evaluate(() =>
      [...document.querySelectorAll('#glossario-grid > *')]
        .filter(e => e.offsetParent !== null).length);
    ok(filtrado > 0 && filtrado < glossario,
       `[home] a busca do glossário não filtra (${glossario} antes, ${filtrado} depois)`);

    await pagina.fill('#busca-glossario', 'zzzzqqqq');
    await pagina.waitForTimeout(700);
    ok(await pagina.evaluate(() => {
         const v = document.getElementById('glossario-vazio');
         return v && v.offsetParent !== null;
       }), '[home] busca sem resultado nenhum e o aviso de "nada encontrado" não aparece');
    await pagina.fill('#busca-glossario', '');

    // as âncoras do menu existem de verdade?
    const quebrados = await pagina.evaluate(() =>
      [...document.querySelectorAll('#nav a[href^="#"]')]
        .map(a => a.getAttribute('href'))
        .filter(h => h.length > 1 && !document.querySelector(h)));
    ok(quebrados.length === 0, `[home] o menu aponta para seções que não existem: ${quebrados}`);
  }

  // =================================================================
  // 10. TODO LINK PARA O 3D TEM QUE CAIR NUMA ARQUITETURA QUE EXISTE
  // =================================================================
  {
    const ruins = await pagina.evaluate(() => {
      const fora = [];
      for (const [id, m] of Object.entries(marcas))
        for (const mo of m.motores) {
          const a = arqDaFamilia(id, mo);
          if (!a || !arquiteturas[a]) fora.push(`${m.nome} / ${mo.nome} -> ${a}`);
        }
      return fora;
    });
    ok(ruins.length === 0, `[3d] famílias apontando para arquitetura inexistente: ${ruins.slice(0,5)}`);
  }

  // =================================================================
  // 11. O MAPA MENTAL
  // =================================================================
  {
    paginaAtual = 'mapa-mental.html';
    await pagina.goto(`${BASE}/mapa-mental.html`, { waitUntil: 'networkidle' });
    await pagina.waitForTimeout(1500);
    const conteudo = await pagina.evaluate(() =>
      document.body.innerText.trim().length + document.querySelectorAll('svg, canvas').length * 500);
    ok(conteudo > 400, '[mapa] a página do mapa mental abriu praticamente vazia');
  }

  // =================================================================
  // 12. O APLICATIVO (PWA)
  // =================================================================
  {
    const man = JSON.parse(fs.readFileSync('./manifest.json', 'utf8'));
    ok(!!man.name && !!man.short_name, '[pwa] o manifest está sem nome');
    ok(man.display === 'standalone', '[pwa] o app não abre em janela própria (display)');
    ok((man.icons || []).length >= 2, '[pwa] o app tem menos de dois ícones');
    ok((man.icons || []).some(i => (i.purpose || '').includes('maskable')),
       '[pwa] falta o ícone "maskable", que é o que o Android recorta direito');
    (man.icons || []).forEach(i => {
      if (!fs.existsSync('./' + i.src.replace(/^\.\//, '')))
        erro(`[pwa] o manifest aponta para um ícone que não existe: ${i.src}`);
    });

    const sw = fs.readFileSync('./sw.js', 'utf8');
    const cache = (sw.match(/const CACHE = '([^']+)'/) || [])[1];
    ok(!!cache, '[pwa] não achei o nome do cache no service worker');

    // todo arquivo que o service worker promete guardar tem que existir
    const lista = (sw.match(/const ESSENCIAL = \[([\s\S]*?)\]/) || [])[1] || '';
    lista.split(',').map(s => s.trim().replace(/['"]/g, '')).filter(s => s.startsWith('./'))
      .forEach(f => {
        const caminho = './' + f.replace(/^\.\//, '');
        if (f !== './' && !fs.existsSync(caminho))
          erro(`[pwa] o service worker tenta guardar um arquivo que não existe: ${f}`);
      });

    // e o registro do service worker tem que estar em todas as páginas
    ['index.html', 'montagem.html', 'mapa-mental.html'].forEach(f => {
      const h = fs.readFileSync('./' + f, 'utf8');
      if (!/serviceWorker\s*\.\s*register/.test(h))
        erro(`[pwa] ${f} não registra o service worker — o app não funciona offline por ela`);
      if (!/rel="manifest"/.test(h))
        erro(`[pwa] ${f} não aponta para o manifest — o Chrome não oferece instalar por ela`);
    });
  }

  // =================================================================
  // 13. VERSÃO DOS ARQUIVOS (?v=N): o que mudou tem que ter versão nova
  // =================================================================
  {
    const refs = new Map();
    ['index.html', 'montagem.html', 'mapa-mental.html'].forEach(f => {
      const h = fs.readFileSync('./' + f, 'utf8');
      for (const m of h.matchAll(/(?:src|href)="([\w.-]+\.(?:js|css))\?v=(\d+)"/g)) {
        if (!fs.existsSync('./' + m[1])) erro(`[versao] ${f} pede um arquivo que não existe: ${m[1]}`);
        const anterior = refs.get(m[1]);
        if (anterior && anterior.v !== m[2])
          erro(`[versao] ${m[1]} está pedido com ?v=${anterior.v} em ${anterior.f} e ` +
               `?v=${m[2]} em ${f} — uma das páginas vai servir código velho`);
        refs.set(m[1], { v: m[2], f });
      }
      for (const m of h.matchAll(/(?:src|href)="([\w.-]+\.(?:js|css))"/g))
        if (!/vendor|^https?:/.test(m[1]))
          aviso(`[versao] ${f} carrega ${m[1]} sem ?v= — o celular pode ficar com a versão velha`);
    });
  }

  await navegador.close();

  console.log('==== AUDITORIA DA INTERFACE ====');
  console.log('');
  console.log(`### ERROS (${E.length})`);
  E.forEach(x => console.log(' - ' + x));
  console.log('');
  console.log(`### AVISOS (${W.length})`);
  W.forEach(x => console.log(' - ' + x));

  process.exit(E.length ? 1 : 0);
})();
