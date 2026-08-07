// =========================================
// PÁGINA DO MOTOR EM 3D
// Dois modos:
//   EXPLORAR — o motor já vem montado, com vista explodida e nomes
//   MONTAR   — o palco começa vazio e você encaixa peça por peça, na ordem
// Qual motor abrir vem pela URL:
//   montagem.html?arq=boxerAr&motor=Volkswagen%201.1%20a%20ar
// =========================================
// montagem3d.js é um módulo e só executa depois dos scripts clássicos,
// por isso esperamos o DOM ficar pronto antes de procurar o window.Motor3D.
function iniciarPagina() {
  const q = new URLSearchParams(location.search);
  const pedida = q.get('arq');
  const arqId = arquiteturas[pedida] ? pedida : 'boxerAr';
  const nomeMotor = q.get('motor') || '';
  const arq = arquiteturas[arqId];
  const total = arq.pecas.length;

  const el = id => document.getElementById(id);
  const canvas = el('canvas3d');
  const camadaRotulos = el('rotulos');

  let modo = 'explorar';          // 'explorar' ou 'montar'
  let passo = 0;                  // peças já encaixadas, no modo montar
  let erro = null;                // peça clicada fora de hora
  let explodido = false, ligado = false, nomes = false, selecionada = null;

  const completo = () => passo >= total;

  el('topo-titulo').textContent = nomeMotor || arq.titulo;
  el('hud-nome').textContent = nomeMotor || arq.titulo;
  el('hud-tipo').textContent = arq.titulo;
  document.title = (nomeMotor ? nomeMotor + ' — ' : '') + 'Motor 3D | MecânicaPro';

  // ---------- 3D ----------
  function iniciar3D() {
    if (!window.Motor3D || !window.Motor3D.suportado()) {
      canvas.style.display = 'none';
      document.querySelector('.palco').insertAdjacentHTML('beforeend',
        `<div class="sem-webgl">Seu navegador não tem suporte a 3D (WebGL).<br>
         Tente abrir em um navegador mais recente.</div>`);
      return false;
    }
    montarCena();
    return true;
  }

  // atePasso indefinido = motor inteiro; 0 = palco vazio
  function montarCena() {
    window.Motor3D.iniciar(canvas, arqId, modo === 'montar' ? passo : undefined);
    window.Motor3D.aoZoom(p => el('lbl-zoom').textContent = p + '%');
    window.Motor3D.aoProjetar(posicionarRotulos);
    el('lbl-zoom').textContent = window.Motor3D.percentual() + '%';
  }

  const tem3D = iniciar3D();
  window.addEventListener('resize', () => { if (tem3D) window.Motor3D.ajustar(canvas); });

  // ---------- rótulos que seguem as peças ----------
  // o número é a ordem em que a peça entra no motor: 1 é a primeira a ser montada
  const divsRotulo = arq.pecas.map((p, i) => {
    const d = document.createElement('div');
    d.className = 'rotulo';
    d.innerHTML = `<span class="num">${i + 1}</span><span class="txt">${p.nome}</span>`;
    camadaRotulos.appendChild(d);
    return d;
  });

  // largura de cada rótulo, medida uma vez em cada modo (só o número / número + nome)
  const larguras = [[], []];

  function posicionarRotulos(pontos) {
    // o número aparece sempre; o nome só na vista explodida ou com "nomes" ligado
    const comNome = nomes || explodido;
    const largo = comNome ? 1 : 0;
    const visiveis = [];

    // peça que ainda não entrou na cena não vem em "pontos": some com o rótulo dela
    divsRotulo.forEach(d => { d.style.display = 'none'; });

    pontos.forEach(pt => {
      const d = divsRotulo[pt.i];
      if (!d) return;
      // com o motor montado, a bolinha só aparece na peça que dá para ver;
      // com os nomes ligados mostra todas, inclusive as de dentro
      const visivel = pt.visivel && (selecionada === null || selecionada === pt.i)
                      && (comNome || !pt.tapada);
      d.style.display = visivel ? 'block' : 'none';
      d.classList.toggle('rotulo--so-num', !comNome);
      d.classList.toggle('rotulo--ativo', selecionada === pt.i);
      if (visivel) {
        if (!larguras[largo][pt.i]) larguras[largo][pt.i] = d.offsetWidth || 80;
        visiveis.push({ d, x: pt.x, y: pt.y, w: larguras[largo][pt.i] });
      }
    });

    // rótulos que caem quase no mesmo ponto se empurram para baixo,
    // senão a vista explodida vira um bolo de texto no meio da tela
    const ALTURA = 22;
    visiveis.sort((a, b) => a.y - b.y);
    visiveis.forEach((r, i) => {
      for (let j = 0; j < i; j++) {
        const o = visiveis[j];
        const encosta = Math.abs(r.x - o.x) < (r.w + o.w) / 2 + 6;
        if (encosta && r.y - o.y < ALTURA) r.y = o.y + ALTURA;
      }
    });

    // e nada de rótulo saindo pela borda da tela
    const largura = camadaRotulos.clientWidth, altura = camadaRotulos.clientHeight;
    visiveis.forEach(r => {
      const meia = r.w / 2 + 4;
      const x = Math.max(meia, Math.min(largura - meia, r.x));
      const y = Math.max(14, Math.min(altura - 14, r.y));
      r.d.style.transform = `translate(-50%,-50%) translate(${x}px, ${y}px)`;
    });
  }

  // ---------- painel ----------
  function textoDoPainel() {
    if (modo === 'montar') {
      if (erro !== null) {
        const pe = arq.pecas[erro];
        return `<span class="hud__peca hud__peca--erro"><span class="num">${erro + 1}</span>${pe.nome}</span>` +
               `<span class="hud__erro">Ainda não é a hora dessa peça.</span> ${pe.seErrar}`;
      }
      if (completo()) {
        return `<span class="hud__peca hud__peca--ok">✔ Motor completo</span>` +
               `As ${total} peças estão no lugar. Agora dá para ligar o motor ou abrir a vista explodida.`;
      }
      const pe = arq.pecas[passo];
      return `<span class="hud__peca"><span class="num">${passo + 1}</span>${pe.nome}</span>${pe.dica}`;
    }

    const p = selecionada !== null ? arq.pecas[selecionada] : null;
    return p
      ? `<span class="hud__peca"><span class="num">${selecionada + 1}</span>${p.nome}</span>${p.aoEncaixar}`
      : `${total} peças, numeradas na ordem em que entram no motor. Toque numa peça da lista para destacar, ou abra a vista explodida.`;
  }

  function pintar() {
    const montando = modo === 'montar';
    const travado = montando && !completo();     // sem explodir/ligar antes de terminar

    el('hud-msg').innerHTML = textoDoPainel();

    el('hud-passo').textContent = montando
      ? (completo() ? `${total} de ${total} peças` : `Peça ${passo + 1} de ${total}`)
      : '';
    el('hud-passo').style.display = montando ? 'block' : 'none';
    el('hud-barra-caixa').style.display = montando ? 'block' : 'none';
    el('hud-barra').style.width = (passo / total * 100) + '%';

    el('btn-modo').textContent = montando ? '👁 Ver motor montado' : '🔧 Montar peça por peça';
    el('btn-modo').classList.toggle('peca--ativo', montando);

    el('btn-explodir').textContent = explodido ? '🧲 Juntar as peças' : '💥 Vista explodida';
    el('btn-explodir').classList.toggle('peca--ativo', explodido);
    el('btn-ligar').textContent = ligado ? '⏸ Desligar motor' : '▶ Ligar o motor';
    el('btn-ligar').classList.toggle('peca--ativo', ligado);
    el('btn-nomes').classList.toggle('peca--ativo', nomes);
    el('btn-explodir').disabled = travado;
    el('btn-ligar').disabled = travado;

    el('bandeja').innerHTML = arq.pecas.map((pe, i) => {
      let classe = '';
      if (montando) {
        if (i < passo) classe = ' peca--ok';
        else if (i === passo) classe = ' peca--vez';
        if (i === erro) classe += ' peca--erro';
      } else if (selecionada === i) {
        classe = ' peca--ativo';
      }
      return `<button class="peca${classe}" data-peca="${i}">` +
             `<span class="num">${i + 1}</span>${pe.nome}</button>`;
    }).join('');

    // no celular a lista rola de lado: traz a peça da vez para o campo de visão
    const foco = el('bandeja').querySelector('.peca--vez, .peca--ativo');
    if (foco) foco.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }

  // ---------- clique numa peça da lista ----------
  function selecionar(i) {
    selecionada = (selecionada === i) ? null : i;
    if (tem3D) window.Motor3D.destacar(selecionada);
    pintar();
  }

  function encaixar(i) {
    if (i < passo) return;                      // já está no motor
    if (i !== passo) {                          // fora de ordem: a peça não vai
      erro = i;
      pintar();
      setTimeout(() => { erro = null; pintar(); }, 1800);
      return;
    }
    erro = null;
    if (tem3D) window.Motor3D.encaixar(arqId, passo);
    passo++;
    pintar();
  }

  el('bandeja').addEventListener('click', e => {
    const b = e.target.closest('[data-peca]');
    if (!b) return;
    const i = Number(b.dataset.peca);
    if (modo === 'montar' && !completo()) encaixar(i);
    else selecionar(i);
  });

  // ---------- botões ----------
  el('btn-modo').addEventListener('click', () => {
    modo = (modo === 'montar') ? 'explorar' : 'montar';
    passo = 0; erro = null; selecionada = null;
    explodido = false; ligado = false;
    if (tem3D) montarCena();
    pintar();
  });

  el('btn-explodir').addEventListener('click', () => {
    explodido = window.Motor3D.explodir(!explodido);
    pintar();
  });
  el('btn-ligar').addEventListener('click', () => {
    ligado = window.Motor3D.ligar(!ligado);
    pintar();
  });
  el('btn-nomes').addEventListener('click', () => { nomes = !nomes; pintar(); });

  // ---------- zoom ----------
  el('btn-mais').addEventListener('click',  () => el('lbl-zoom').textContent = window.Motor3D.zoom(.82) + '%');
  el('btn-menos').addEventListener('click', () => el('lbl-zoom').textContent = window.Motor3D.zoom(1.22) + '%');
  el('btn-centro').addEventListener('click',() => {
    el('lbl-zoom').textContent = window.Motor3D.centralizar() + '%';
    selecionada = null; if (tem3D) window.Motor3D.destacar(null);
    pintar();
  });

  setTimeout(() => {
    const d = el('dica-uso');
    if (d) { d.style.transition = 'opacity .8s'; d.style.opacity = '0'; }
  }, 7000);

  pintar();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarPagina);
} else {
  iniciarPagina();
}
