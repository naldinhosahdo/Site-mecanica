// =========================================
// ARTIGOS — conteúdo completo de cada card
// =========================================
const artigos = {
  motor: {
    cat: 'Motor',
    titulo: 'Como funciona o motor de combustão interna',
    tempo: '8 min de leitura',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
    conteudo: `
      <h3>O que é um motor de combustão interna?</h3>
      <p>O motor de combustão interna (MCI) é o coração de praticamente todo veículo movido a gasolina, etanol ou diesel. Ele converte energia química do combustível em energia mecânica por meio de pequenas explosões controladas dentro de cilindros metálicos.</p>

      <h3>O ciclo de 4 tempos</h3>
      <p>A maioria dos motores de carro usa o ciclo Otto de 4 tempos. Cada "tempo" é um movimento do pistão dentro do cilindro:</p>
      <ul>
        <li><strong>1º Admissão:</strong> O pistão desce e a válvula de admissão abre, sugando a mistura de ar e combustível para dentro do cilindro.</li>
        <li><strong>2º Compressão:</strong> Todas as válvulas fecham e o pistão sobe, comprimindo a mistura. Quanto maior a compressão, mais potência é gerada.</li>
        <li><strong>3º Explosão (expansão):</strong> A vela de ignição produz uma fagulha que detona a mistura. A expansão dos gases empurra o pistão com força para baixo — esse é o único tempo que gera potência.</li>
        <li><strong>4º Escape:</strong> A válvula de escape abre e o pistão sobe novamente, expulsando os gases queimados pelo escapamento.</li>
      </ul>

      <h3>Principais componentes do motor</h3>
      <ul>
        <li><strong>Bloco do motor:</strong> Estrutura principal que abriga os cilindros, onde os pistões se movem.</li>
        <li><strong>Cabeçote:</strong> Tampa do bloco que contém as válvulas, árvore de cames e câmara de combustão.</li>
        <li><strong>Pistões:</strong> Peças que sobem e descem dentro dos cilindros, transmitindo força ao virabrequim.</li>
        <li><strong>Virabrequim:</strong> Converte o movimento linear dos pistões em rotação — é essa rotação que chega às rodas.</li>
        <li><strong>Árvore de cames:</strong> Controla a abertura e fechamento das válvulas no momento exato.</li>
        <li><strong>Correia dentada:</strong> Sincroniza o virabrequim com a árvore de cames. Se quebrar, pode destruir o motor inteiro.</li>
      </ul>

      <h3>Por que o motor aquece?</h3>
      <p>As explosões constantes geram muito calor. Por isso existe o sistema de arrefecimento, que circula líquido refrigerante pelo bloco e pelo radiador para dissipar esse calor. Sem ele, o motor fundiria em minutos.</p>

      <h3>Dica prática</h3>
      <p>Nunca ignore a luz de temperatura no painel. Se o motor superaquecer, desligue-o imediatamente e aguarde esfriar antes de verificar o nível de água — abrir o radiador quente pode causar queimaduras graves.</p>
    `
  },
  freios: {
    cat: 'Freios',
    titulo: 'Freios a disco x freios a tambor: qual a diferença?',
    tempo: '5 min de leitura',
    img: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=700&q=80',
    conteudo: `
      <h3>Como funciona um sistema de freios?</h3>
      <p>Quando você pisa no pedal de freio, você aciona um sistema hidráulico que empurra peças de atrito contra as partes giratórias das rodas, convertendo energia cinética em calor e desacelerando o carro.</p>

      <h3>Freios a disco</h3>
      <p>Usados na maioria dos veículos modernos, principalmente nas rodas dianteiras. Funcionam assim:</p>
      <ul>
        <li>Um <strong>disco metálico</strong> fica preso à roda e gira junto com ela.</li>
        <li>Uma <strong>pinça de freio</strong> abraça o disco com <strong>pastilhas</strong> de ambos os lados.</li>
        <li>Ao frear, a pinça aperta as pastilhas contra o disco, criando atrito.</li>
      </ul>
      <p><strong>Vantagens:</strong> melhor dissipação de calor, desempenho superior em frenagens repetidas, mais fácil de inspecionar visualmente.</p>

      <h3>Freios a tambor</h3>
      <p>Mais antigos e ainda usados nas rodas traseiras de carros populares por serem mais baratos. Funcionam assim:</p>
      <ul>
        <li>Um <strong>tambor cilíndrico</strong> gira junto com a roda.</li>
        <li>Dentro do tambor ficam as <strong>lonas de freio</strong> presas a um suporte fixo.</li>
        <li>Ao frear, as lonas são pressionadas para fora contra a face interna do tambor.</li>
      </ul>
      <p><strong>Vantagens:</strong> custo menor, mais eficientes como freio de estacionamento.</p>

      <h3>Comparação direta</h3>
      <ul>
        <li><strong>Potência de frenagem:</strong> Disco ganha — mais força e controle.</li>
        <li><strong>Resistência ao calor:</strong> Disco ganha — dissipa calor mais rápido.</li>
        <li><strong>Custo de manutenção:</strong> Tambor é mais barato para trocar as lonas.</li>
        <li><strong>Vida útil:</strong> Pastilhas de disco duram em média 30–40 mil km. Lonas de tambor, 40–60 mil km.</li>
      </ul>

      <h3>Quando trocar?</h3>
      <p>Substitua as pastilhas quando estiverem com menos de 3mm de espessura ou ao ouvir um chiado agudo ao frear. Nunca espere até o rangido metálico — nesse ponto o disco já foi danificado.</p>
    `
  },
  suspensao: {
    cat: 'Suspensão',
    titulo: 'O que é suspensão e como ela afeta a dirigibilidade',
    tempo: '6 min de leitura',
    img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=700&q=80',
    conteudo: `
      <h3>Para que serve a suspensão?</h3>
      <p>A suspensão tem duas funções principais: garantir o <strong>conforto</strong> dos ocupantes absorvendo imperfeições da pista, e garantir a <strong>segurança</strong> mantendo os pneus em contato constante com o solo para que os freios e a direção funcionem corretamente.</p>

      <h3>Componentes principais</h3>
      <ul>
        <li><strong>Molas:</strong> Absorvem os impactos. Podem ser helicoidais (espiral), folas de lâmina ou barras de torção.</li>
        <li><strong>Amortecedores:</strong> Controlam o movimento das molas, impedindo que o carro "quique" após um buraco. Quando gasto, o carro oscila em excesso.</li>
        <li><strong>Bandeja (braço de controle):</strong> Liga a roda ao chassi, controlando a geometria do movimento.</li>
        <li><strong>Buchas:</strong> Peças de borracha ou poliuretano que amortecem vibrações nas articulações. Quando desgastadas causam barulhos e folga.</li>
        <li><strong>Barra estabilizadora:</strong> Liga as duas rodas do mesmo eixo para reduzir a inclinação do carro em curvas.</li>
      </ul>

      <h3>Tipos de suspensão</h3>
      <ul>
        <li><strong>MacPherson (dianteira):</strong> Simples e barata. Usada na maioria dos populares. Amortecedor e mola integrados em um único conjunto.</li>
        <li><strong>Multilink:</strong> Mais sofisticada, permite ajuste fino da geometria. Comum em carros médios e premium.</li>
        <li><strong>Eixo rígido (traseira):</strong> As duas rodas traseiras ligadas por um eixo. Robusta e barata, porém menos confortável.</li>
      </ul>

      <h3>Sinais de desgaste</h3>
      <ul>
        <li>Barulho de "batida" ao passar em buracos ou lombadas → buchas ou bandejas desgastadas.</li>
        <li>Carro oscila muito após um buraco → amortecedores gastos.</li>
        <li>Pneu desgastado de forma irregular → problema de geometria (alinhamento).</li>
        <li>Carro puxa para um lado ao frear → diferença de regulagem entre os lados.</li>
      </ul>

      <h3>Com que frequência revisar?</h3>
      <p>Inspecione a suspensão a cada 20.000 km ou uma vez por ano. Amortecedores costumam durar 60.000–80.000 km, mas podem desgastar mais rápido em estradas ruins.</p>
    `
  },
  cambio: {
    cat: 'Câmbio',
    titulo: 'Câmbio manual, automático, CVT e DSG: qual escolher?',
    tempo: '7 min de leitura',
    img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=700&q=80',
    conteudo: `
      <h3>O que o câmbio faz?</h3>
      <p>O câmbio (ou transmissão) adapta a rotação do motor à velocidade das rodas. Sem ele, o motor só conseguiria trabalhar em uma única condição de carga — inviável na prática. As marchas permitem usar a potência do motor de forma eficiente em diferentes situações: arranque, velocidade constante, subidas, etc.</p>

      <h3>Câmbio manual</h3>
      <p>O motorista escolhe a marcha usando a embreagem e o câmbio. É o tipo mais simples mecanicamente.</p>
      <ul>
        <li><strong>Vantagens:</strong> Custo de manutenção menor, maior controle do motorista, geralmente mais econômico.</li>
        <li><strong>Desvantagens:</strong> Exige habilidade, cansativo em trânsito intenso.</li>
        <li><strong>Manutenção:</strong> Trocar o fluido do câmbio a cada 60.000–80.000 km. A embreagem dura entre 60.000 e 150.000 km dependendo do uso.</li>
      </ul>

      <h3>Câmbio automático (torque converter)</h3>
      <p>As marchas trocam sozinhas por meio de um conversor de torque hidráulico e um conjunto de engrenagens planetárias.</p>
      <ul>
        <li><strong>Vantagens:</strong> Conforto total, ideal para trânsito urbano.</li>
        <li><strong>Desvantagens:</strong> Consumo um pouco maior, custo de reparo elevado.</li>
        <li><strong>Manutenção:</strong> Trocar o óleo ATF a cada 40.000–60.000 km. Nunca negligencie — reparos de câmbio automático custam caro.</li>
      </ul>

      <h3>CVT (Variador Contínuo)</h3>
      <p>Em vez de marchas fixas, usa duas polias e uma correia de aço que variam o diâmetro continuamente. O motor sempre trabalha na rotação ideal.</p>
      <ul>
        <li><strong>Vantagens:</strong> Mais eficiente em consumo, aceleração suave.</li>
        <li><strong>Desvantagens:</strong> Sensação de "borrachinha" na aceleração, durabilidade menor sob uso esportivo.</li>
      </ul>

      <h3>DSG / DCT (Dupla Embreagem)</h3>
      <p>Funciona como dois câmbios manuais em paralelo, um para marchas pares e outro para ímpares. Enquanto você está na 3ª, o câmbio já deixa a 4ª engatada, pronta para trocar em milissegundos.</p>
      <ul>
        <li><strong>Vantagens:</strong> Rapidíssimo, eficiente, esportivo.</li>
        <li><strong>Desvantagens:</strong> Pode apresentar solavancos em baixas velocidades, manutenção cara.</li>
      </ul>

      <h3>Qual escolher?</h3>
      <p>Para uso urbano intenso: <strong>automático ou CVT</strong>. Para quem gosta de dirigir e quer economizar na manutenção: <strong>manual</strong>. Para quem quer o melhor dos dois mundos com orçamento elevado: <strong>DSG/DCT</strong>.</p>
    `
  },
  eletrica: {
    cat: 'Elétrica',
    titulo: 'Sistema elétrico do carro: bateria, alternador e motor de arranque',
    tempo: '5 min de leitura',
    img: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=700&q=80',
    conteudo: `
      <h3>O trio que dá vida ao carro</h3>
      <p>Três componentes trabalham juntos para garantir que seu carro ligue toda vez que você gira a chave (ou aperta o botão): a <strong>bateria</strong>, o <strong>motor de arranque</strong> e o <strong>alternador</strong>. Entender como cada um funciona facilita muito o diagnóstico de problemas.</p>

      <h3>Bateria</h3>
      <p>Armazena energia química e a converte em eletricidade. É responsável por alimentar o motor de arranque no momento da partida e manter todos os sistemas eletrônicos funcionando com o motor desligado.</p>
      <ul>
        <li><strong>Tensão nominal:</strong> 12 volts (12,6V totalmente carregada, abaixo de 12V indica descarga).</li>
        <li><strong>Vida útil:</strong> 3 a 5 anos em média.</li>
        <li><strong>Sinal de problema:</strong> Motor gira devagar ou não liga, especialmente no frio.</li>
        <li><strong>Dica:</strong> Se deixar luzes acesas e a bateria descarregar frequentemente, verifique se não há consumo parasita (algo ligado drenando a bateria com o carro desligado).</li>
      </ul>

      <h3>Motor de arranque (starter)</h3>
      <p>Motor elétrico pequeno que usa a energia da bateria para girar o motor de combustão nos primeiros instantes, até que ele consiga funcionar por conta própria.</p>
      <ul>
        <li><strong>Sinal de problema:</strong> Clique seco ao girar a chave (sem o motor girar) indica o motor de arranque com defeito.</li>
        <li><strong>Vida útil:</strong> Geralmente dura mais de 100.000 km, mas pode falhar antes com partidas frequentes.</li>
      </ul>

      <h3>Alternador</h3>
      <p>Gerador acionado pelo motor em funcionamento. Sua função é produzir eletricidade para recarregar a bateria e alimentar todos os sistemas do carro (injeção, ignição, ar-condicionado, luzes) enquanto você dirige.</p>
      <ul>
        <li><strong>Tensão de saída:</strong> Entre 13,5V e 14,8V com o motor ligado.</li>
        <li><strong>Sinal de problema:</strong> Luz da bateria acesa com o motor ligado indica que o alternador não está gerando energia — a bateria vai descarregar em minutos.</li>
        <li><strong>Vida útil:</strong> 80.000 a 150.000 km em geral.</li>
      </ul>

      <h3>Como diagnosticar em casa</h3>
      <p>Com um multímetro simples (menos de R$50 em qualquer loja de ferramentas) você consegue testar os três:</p>
      <ul>
        <li>Motor desligado: meça a bateria. Deve marcar ≥ 12,4V.</li>
        <li>Motor ligado: meça novamente. Deve marcar entre 13,5V e 14,8V (alternador funcionando).</li>
        <li>Se motor ligado marcar ≤ 12,8V, o alternador provavelmente está com defeito.</li>
      </ul>
    `
  }
};

// =========================================
document.addEventListener('DOMContentLoaded', () => {

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Diagnóstico — filtros por categoria
document.getElementById('diag-filtros').addEventListener('click', e => {
  const btn = e.target.closest('.filtro-btn');
  if (!btn) return;

  document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('filtro-btn--ativo'));
  btn.classList.add('filtro-btn--ativo');

  const filtro = btn.dataset.filtro;
  document.querySelectorAll('.diag-card').forEach(card => {
    const mostrar = filtro === 'todos' || card.dataset.categoria === filtro;
    card.classList.toggle('diag-card--hidden', !mostrar);
  });
});

// Glossário — busca em tempo real
document.getElementById('busca-glossario').addEventListener('input', function () {
  const q = this.value.toLowerCase().trim();
  const items = document.querySelectorAll('.glossario-item');
  let visíveis = 0;

  items.forEach(item => {
    const texto = (item.dataset.termo + item.textContent).toLowerCase();
    const show  = texto.includes(q);
    item.style.display = show ? '' : 'none';
    if (show) visíveis++;
  });

  document.getElementById('glossario-vazio').style.display = visíveis === 0 ? 'block' : 'none';
});

// =========================================
// MODAL de artigos
// =========================================
const overlay      = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const modalClose   = document.getElementById('modal-close');

function abrirModal(id) {
  const a = artigos[id];
  if (!a) return;
  modalContent.innerHTML = `
    <img src="${a.img}" alt="${a.titulo}" class="modal__img" />
    <span class="modal__cat">${a.cat}</span>
    <p style="font-size:.8rem;color:var(--gray);margin-bottom:.75rem">${a.tempo}</p>
    <h2>${a.titulo}</h2>
    ${a.conteudo}
  `;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function fecharModal() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-artigo]').forEach(btn => {
  btn.addEventListener('click', () => abrirModal(btn.dataset.artigo));
});

modalClose.addEventListener('click', fecharModal);

overlay.addEventListener('click', e => {
  if (e.target === overlay) fecharModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') fecharModal();
});

// Newsletter form
document.getElementById('newsletter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const msg   = document.getElementById('nl-msg');
  const nome  = document.getElementById('nl-nome').value.trim();
  const email = document.getElementById('nl-email').value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!nome || !emailOk) {
    msg.textContent = 'Por favor, preencha nome e e-mail válido.';
    msg.className = 'newsletter__msg error';
    return;
  }

  const btn = this.querySelector('button');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  setTimeout(() => {
    msg.textContent = '✅ Cadastro realizado! Obrigado, ' + nome + '.';
    msg.className = 'newsletter__msg success';
    this.reset();
    btn.disabled = false;
    btn.textContent = 'Quero receber';
  }, 1000);
});

// Animate on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .categoria-card, .article-card, .diag-card, .glossario-item, .diferencial').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .45s ease, transform .45s ease';
  observer.observe(el);
});

// =========================================
// MAPA MENTAL
// =========================================
const mapaData = [
  { id: 'motor',         icone: '🔥', nome: 'Motor',         cor: '#e63329',
    filhos: ['Pistões', 'Virabrequim', 'Cabeçote', 'Correia dentada', 'Válvulas', 'Velas'] },
  { id: 'cambio',        icone: '⚙️', nome: 'Câmbio',        cor: '#3b82f6',
    filhos: ['Manual', 'Automático', 'CVT', 'DSG/DCT', 'Embreagem', 'Diferencial'] },
  { id: 'suspensao',     icone: '🛞', nome: 'Suspensão',     cor: '#10b981',
    filhos: ['Amortecedores', 'Molas', 'Bandejas', 'Buchas', 'Barra estabiliz.', 'Pneus'] },
  { id: 'freios',        icone: '🛑', nome: 'Freios',        cor: '#f59e0b',
    filhos: ['Pastilhas', 'Discos', 'Lonas', 'Tambores', 'Fluido', 'ABS / ESP'] },
  { id: 'eletrica',      icone: '⚡', nome: 'Elétrica',      cor: '#8b5cf6',
    filhos: ['Bateria', 'Alternador', 'Arranque', 'Fusíveis', 'Sensores', 'ECU'] },
  { id: 'arrefecimento', icone: '💧', nome: 'Arrefecimento', cor: '#06b6d4',
    filhos: ['Radiador', 'Termostato', 'Bomba d\'água', 'Refrigerante', 'Ventoinha', 'Mangueiras'] },
];

function renderMapaDesktop() {
  const layout = document.getElementById('mapa-layout');
  if (!layout) return;

  const W  = layout.offsetWidth;
  const H  = 580;
  const cx = W / 2;
  const cy = H / 2;
  const R  = Math.min(W * 0.38, 210);

  // SVG para as linhas
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('mapa__svg');
  layout.appendChild(svg);

  // Nó central
  const central = document.createElement('div');
  central.className = 'mapa__central';
  central.innerHTML = '<span>⚙</span><p>Mecânica<br>Automotiva</p>';
  central.style.left = cx + 'px';
  central.style.top  = cy + 'px';
  layout.appendChild(central);

  mapaData.forEach((item, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180);
    const nx = cx + R * Math.cos(angle);
    const ny = cy + R * Math.sin(angle);

    // Linha SVG
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', cx); line.setAttribute('y1', cy);
    line.setAttribute('x2', nx); line.setAttribute('y2', ny);
    line.setAttribute('stroke', item.cor);
    line.setAttribute('stroke-width', '2.5');
    line.setAttribute('stroke-dasharray', '6 4');
    line.setAttribute('opacity', '0.5');
    svg.appendChild(line);

    // Nó
    const no = document.createElement('div');
    no.className = 'mapa__no';
    no.style.left        = nx + 'px';
    no.style.top         = ny + 'px';
    no.style.borderColor = item.cor;
    no.style.color       = item.cor;
    no.innerHTML = `<span>${item.icone}</span><p>${item.nome}</p>`;
    layout.appendChild(no);

    // Painel
    const painel = document.createElement('div');
    painel.className = 'mapa__painel';
    painel.style.borderColor = item.cor;

    // Posiciona painel: lado oposto ao centro
    const offsetX = nx > cx ? 55 : -(55 + 180);
    const offsetY = ny < cy + 40 && ny > cy - 40 ? -70 : (ny < cy ? -30 : -120);
    painel.style.left = (nx + offsetX) + 'px';
    painel.style.top  = (ny + offsetY) + 'px';

    painel.innerHTML = `
      <h4 style="color:${item.cor}">${item.icone} ${item.nome}</h4>
      <ul>${item.filhos.map(f => `<li>${f}</li>`).join('')}</ul>
    `;
    layout.appendChild(painel);

    no.addEventListener('click', () => {
      const jaAberto = painel.classList.contains('open');
      layout.querySelectorAll('.mapa__painel').forEach(p => p.classList.remove('open'));
      layout.querySelectorAll('.mapa__no').forEach(n => n.classList.remove('active'));
      if (!jaAberto) {
        painel.classList.add('open');
        no.classList.add('active');
      }
    });
  });

  // Fecha ao clicar fora
  document.addEventListener('click', e => {
    if (!e.target.closest('.mapa__no') && !e.target.closest('.mapa__painel')) {
      layout.querySelectorAll('.mapa__painel').forEach(p => p.classList.remove('open'));
      layout.querySelectorAll('.mapa__no').forEach(n => n.classList.remove('active'));
    }
  });
}

function renderMapaMobile() {
  const section = document.querySelector('.mapa-mental');
  if (!section) return;

  const acordeao = document.createElement('div');
  acordeao.className = 'mapa__acordeao';

  mapaData.forEach(item => {
    const el = document.createElement('div');
    el.className = 'mapa__item';
    el.style.setProperty('--cor', item.cor);
    el.innerHTML = `
      <div class="mapa__item-header">
        <span>${item.icone}</span>
        <span style="flex:1;margin-left:.25rem">${item.nome}</span>
        <span class="mapa__chevron">▼</span>
      </div>
      <div class="mapa__item-body">
        <ul>${item.filhos.map(f => `<li>${f}</li>`).join('')}</ul>
      </div>
    `;
    const header = el.querySelector('.mapa__item-header');
    header.style.borderLeft = `4px solid ${item.cor}`;
    header.addEventListener('click', () => el.classList.toggle('open'));
    acordeao.appendChild(el);
  });

  section.querySelector('.container').appendChild(acordeao);
}

renderMapaDesktop();
renderMapaMobile();

}); // fim DOMContentLoaded
