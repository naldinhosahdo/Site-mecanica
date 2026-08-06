// =========================================
// PÁGINA DE MONTAGEM — controla a tela cheia
// Recebe qual motor montar pela URL:
//   montagem.html?arq=boxerAr&motor=Motor%201.1%20a%20ar
// =========================================
// montagem3d.js é um módulo e só executa depois dos scripts clássicos,
// por isso esperamos o DOM ficar pronto antes de procurar o window.Motor3D.
function iniciarPagina() {
  const q = new URLSearchParams(location.search);
  const arqId = q.get('arq') || 'boxerAr';
  const nomeMotor = q.get('motor') || '';
  const arq = arquiteturas[arqId] || arquiteturas.boxerAr;

  const el = id => document.getElementById(id);
  const canvas = el('canvas3d');

  let passo = 0, erros = 0, ligado = false, explodido = false, pronto = false;

  // bandeja embaralhada, para ser um quebra-cabeça de verdade
  const ordem = arq.pecas.map((_, i) => i);
  for (let i = ordem.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
  }

  el('topo-titulo').textContent = nomeMotor ? `Montagem — ${nomeMotor}` : 'Montagem de motor';
  el('hud-nome').textContent = nomeMotor || arq.titulo;
  document.title = (nomeMotor ? nomeMotor + ' — ' : '') + 'Montagem | MecânicaPro';

  // ---------- 3D ----------
  function iniciar3D() {
    if (!window.Motor3D || !window.Motor3D.suportado()) {
      canvas.style.display = 'none';
      document.querySelector('.palco').insertAdjacentHTML('beforeend',
        `<div class="sem-webgl">Seu navegador não tem suporte a 3D (WebGL).<br>
         Tente abrir em um navegador mais recente.</div>`);
      return false;
    }
    window.Motor3D.iniciar(canvas, arqId, 0);
    window.Motor3D.aoZoom(p => el('lbl-zoom').textContent = p + '%');
    return true;
  }

  const tem3D = iniciar3D();

  // mantém a cena no tamanho certo ao girar o aparelho
  window.addEventListener('resize', () => { if (tem3D) window.Motor3D.ajustar(canvas); });

  // ---------- painel ----------
  function pintar(feedback) {
    const total = arq.pecas.length;
    el('hud-passo').textContent = pronto ? 'Motor completo' : `Peça ${passo + 1} de ${total}`;
    el('hud-barra').style.width = ((passo / total) * 100) + '%';

    const msg = el('hud-msg');
    if (pronto) {
      msg.innerHTML = `<span class="hud__ok">✔ Motor montado!</span>` + (erros === 0
        ? 'Você acertou todas as peças de primeira.'
        : `Você errou ${erros}${erros === 1 ? ' vez' : ' vezes'} pelo caminho.`);
    } else {
      const ok = feedback && feedback.tipo === 'ok'
        ? `<span class="hud__ok">✔ ${feedback.peca.nome}: ${feedback.peca.aoEncaixar}</span>` : '';
      const er = feedback && feedback.tipo === 'erro'
        ? `<span class="hud__erro">✘ Ainda não dá para montar ${feedback.peca.nome}.</span> ${feedback.peca.seErrar}`
        : `<strong>Próxima peça:</strong> ${arq.pecas[passo].dica}`;
      msg.innerHTML = ok + er;
    }

    const bandeja = el('bandeja');
    if (pronto) {
      bandeja.innerHTML = `
        <button class="peca peca--acao${ligado ? ' peca--ativo' : ''}" data-ligar>${ligado ? '⏸ Desligar motor' : '▶ Ligar o motor'}</button>
        <button class="peca peca--acao${explodido ? ' peca--ativo' : ''}" data-explodir>${explodido ? '🔧 Juntar as peças' : '💥 Vista explodida'}</button>
        <button class="peca" data-remontar>↺ Montar de novo</button>
        <a class="peca" href="index.html#motores">← Outros motores</a>`;
    } else {
      bandeja.innerHTML = ordem.map(i => {
        const p = arq.pecas[i], feito = i < passo;
        return `<button class="peca${feito ? ' peca--ok' : ''}" data-peca="${i}" ${feito ? 'disabled' : ''}>${p.nome}</button>`;
      }).join('');
    }
  }

  // ---------- jogo ----------
  function tentar(i) {
    i = Number(i);
    const p = arq.pecas[i];
    if (i === passo) {
      if (tem3D) window.Motor3D.encaixar(arqId, i);
      passo++;
      if (passo >= arq.pecas.length) { pronto = true; pintar(); }
      else pintar({ tipo: 'ok', peca: p });
    } else {
      erros++;
      pintar({ tipo: 'erro', peca: p });
      const btn = document.querySelector(`[data-peca="${i}"]`);
      if (btn) { btn.classList.remove('peca--erro'); void btn.offsetWidth; btn.classList.add('peca--erro'); }
    }
  }

  document.getElementById('bandeja').addEventListener('click', e => {
    const bp = e.target.closest('[data-peca]');
    if (bp) return tentar(bp.dataset.peca);

    if (e.target.closest('[data-ligar]'))    { ligado = window.Motor3D.ligar(!ligado); return pintar(); }
    if (e.target.closest('[data-explodir]')) { explodido = window.Motor3D.explodir(!explodido); return pintar(); }
    if (e.target.closest('[data-remontar]')) {
      passo = 0; erros = 0; ligado = false; explodido = false; pronto = false;
      if (tem3D) { window.Motor3D.iniciar(canvas, arqId, 0); window.Motor3D.aoZoom(p => el('lbl-zoom').textContent = p + '%'); }
      return pintar();
    }
  });

  // ---------- controles de zoom ----------
  el('btn-mais').addEventListener('click',  () => el('lbl-zoom').textContent = window.Motor3D.zoom(.82) + '%');
  el('btn-menos').addEventListener('click', () => el('lbl-zoom').textContent = window.Motor3D.zoom(1.22) + '%');
  el('btn-centro').addEventListener('click',() => el('lbl-zoom').textContent = window.Motor3D.centralizar() + '%');

  // a dica de uso some depois de um tempo
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
