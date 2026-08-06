// =========================================
// PÁGINA DO MOTOR EM 3D
// Mostra o motor já montado. Dá para girar, aproximar,
// abrir em vista explodida e ver o nome de cada peça.
// Qual motor abrir vem pela URL:
//   motor3d.html?arq=boxerAr&motor=Volkswagen%201.1%20a%20ar
// =========================================
// montagem3d.js é um módulo e só executa depois dos scripts clássicos,
// por isso esperamos o DOM ficar pronto antes de procurar o window.Motor3D.
function iniciarPagina() {
  const q = new URLSearchParams(location.search);
  const pedida = q.get('arq');
  const arqId = arquiteturas[pedida] ? pedida : 'boxerAr';
  const nomeMotor = q.get('motor') || '';
  const arq = arquiteturas[arqId];

  const el = id => document.getElementById(id);
  const canvas = el('canvas3d');
  const camadaRotulos = el('rotulos');

  let explodido = false, ligado = false, nomes = false, selecionada = null;

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
    window.Motor3D.iniciar(canvas, arqId);          // já entra montado
    window.Motor3D.aoZoom(p => el('lbl-zoom').textContent = p + '%');
    window.Motor3D.aoProjetar(posicionarRotulos);
    return true;
  }

  const tem3D = iniciar3D();
  window.addEventListener('resize', () => { if (tem3D) window.Motor3D.ajustar(canvas); });

  // ---------- rótulos que seguem as peças ----------
  const divsRotulo = arq.pecas.map(p => {
    const d = document.createElement('div');
    d.className = 'rotulo';
    d.textContent = p.nome;
    camadaRotulos.appendChild(d);
    return d;
  });

  const larguras = [];   // largura de cada rótulo, medida uma vez só

  function posicionarRotulos(pontos) {
    const mostrar = nomes || explodido;
    const visiveis = [];

    pontos.forEach(pt => {
      const d = divsRotulo[pt.i];
      if (!d) return;
      const visivel = mostrar && pt.visivel && (selecionada === null || selecionada === pt.i);
      d.style.display = visivel ? 'block' : 'none';
      d.classList.toggle('rotulo--ativo', selecionada === pt.i);
      if (visivel) {
        if (!larguras[pt.i]) larguras[pt.i] = d.offsetWidth || 80;
        visiveis.push({ d, x: pt.x, y: pt.y, w: larguras[pt.i] });
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

  // ---------- painel e lista de peças ----------
  function pintar() {
    const p = selecionada !== null ? arq.pecas[selecionada] : null;
    el('hud-msg').innerHTML = p
      ? `<span class="hud__peca">${p.nome}</span>${p.aoEncaixar}`
      : `${arq.pecas.length} peças. Toque numa peça da lista para destacar, ou abra a vista explodida.`;

    el('btn-explodir').textContent = explodido ? '🔧 Juntar as peças' : '💥 Vista explodida';
    el('btn-explodir').classList.toggle('peca--ativo', explodido);
    el('btn-ligar').textContent = ligado ? '⏸ Desligar motor' : '▶ Ligar o motor';
    el('btn-ligar').classList.toggle('peca--ativo', ligado);
    el('btn-nomes').classList.toggle('peca--ativo', nomes);

    el('bandeja').innerHTML = arq.pecas.map((pe, i) =>
      `<button class="peca${selecionada === i ? ' peca--ativo' : ''}" data-peca="${i}">${pe.nome}</button>`
    ).join('');

    // no celular a lista rola de lado: traz a peça escolhida para a vista
    const ativo = el('bandeja').querySelector('.peca--ativo');
    if (ativo) ativo.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }

  function selecionar(i) {
    selecionada = (selecionada === i) ? null : i;
    if (tem3D) window.Motor3D.destacar(selecionada);
    pintar();
  }

  el('bandeja').addEventListener('click', e => {
    const b = e.target.closest('[data-peca]');
    if (b) selecionar(Number(b.dataset.peca));
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
