// =========================================
// MONTAGEM DE MOTOR — minijogo de montar peça por peça
// A arte é por ARQUITETURA de motor, não por modelo: um mesmo
// desenho serve para dezenas de motores do catálogo.
// =========================================

const arquiteturas = {

  // ---------- BOXER REFRIGERADO A AR (visto de cima) ----------
  boxerAr: {
    titulo: 'Boxer 4 cilindros refrigerado a ar',
    viewBox: '0 0 600 340',
    pecas: [
      {
        id: 'carter', nome: 'Cárter', dica: 'Por onde tudo começa: a caixa que sustenta o motor inteiro.',
        aoEncaixar: 'É a estrutura central, feita em duas metades de liga leve, que abriga e alinha tudo.',
        seErrar: 'Sem o cárter não existe onde apoiar nenhuma outra peça.',
        svg: `<rect x="230" y="110" width="140" height="120" rx="10" fill="#cbd5e1" stroke="#334155" stroke-width="3"/>
              <line x1="300" y1="110" x2="300" y2="230" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4"/>`
      },
      {
        id: 'virabrequim', nome: 'Virabrequim', dica: 'O que transforma o sobe-e-desce dos pistões em giro?',
        aoEncaixar: 'Fica no eixo central do cárter e converte o movimento linear dos pistões em rotação.',
        seErrar: 'O virabrequim precisa entrar antes de qualquer coisa que se apoie nele.',
        svg: `<rect x="292" y="118" width="16" height="104" rx="8" fill="#64748b" stroke="#1e293b" stroke-width="2"/>
              <circle cx="300" cy="140" r="11" fill="#94a3b8" stroke="#1e293b" stroke-width="2"/>
              <circle cx="300" cy="200" r="11" fill="#94a3b8" stroke="#1e293b" stroke-width="2"/>`
      },
      {
        id: 'comando', nome: 'Árvore de comando', dica: 'Quem manda nas válvulas abrirem e fecharem na hora certa.',
        aoEncaixar: 'Gira na metade da rotação do virabrequim e comanda a abertura das válvulas.',
        seErrar: 'O comando fica dentro do cárter, junto ao virabrequim — precisa entrar antes de fechar o motor.',
        svg: `<rect x="246" y="126" width="11" height="88" rx="5" fill="#78716c" stroke="#1e293b" stroke-width="2"/>
              <circle cx="251" cy="150" r="7" fill="#a8a29e" stroke="#1e293b" stroke-width="1.5"/>
              <circle cx="251" cy="190" r="7" fill="#a8a29e" stroke="#1e293b" stroke-width="1.5"/>`
      },
      {
        id: 'bielas', nome: 'Bielas e pistões', dica: 'A dupla que recebe a explosão e empurra o virabrequim.',
        aoEncaixar: 'A biela liga o pistão ao virabrequim. No boxer, os pistões se movem em sentidos opostos.',
        seErrar: 'Os pistões se prendem ao virabrequim — ele tem que estar montado primeiro.',
        svg: `<rect x="196" y="146" width="34" height="30" rx="4" fill="#e2e8f0" stroke="#334155" stroke-width="2.5"/>
              <rect x="370" y="146" width="34" height="30" rx="4" fill="#e2e8f0" stroke="#334155" stroke-width="2.5"/>
              <line x1="230" y1="161" x2="292" y2="150" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
              <line x1="370" y1="161" x2="308" y2="190" stroke="#475569" stroke-width="5" stroke-linecap="round"/>`
      },
      {
        id: 'cilindros', nome: 'Cilindros', dica: 'O tubo por onde o pistão corre — aqui ele é individual e aletado.',
        aoEncaixar: 'No motor a ar cada cilindro é uma peça separada, cheia de aletas para dissipar calor.',
        seErrar: 'O cilindro envolve o pistão: ele só entra depois que o pistão estiver no lugar.',
        svg: `<rect x="120" y="138" width="80" height="46" rx="5" fill="#94a3b8" stroke="#1e293b" stroke-width="2.5"/>
              <rect x="400" y="138" width="80" height="46" rx="5" fill="#94a3b8" stroke="#1e293b" stroke-width="2.5"/>
              <g stroke="#475569" stroke-width="2">
                <line x1="132" y1="138" x2="132" y2="184"/><line x1="146" y1="138" x2="146" y2="184"/>
                <line x1="160" y1="138" x2="160" y2="184"/><line x1="174" y1="138" x2="174" y2="184"/>
                <line x1="188" y1="138" x2="188" y2="184"/>
                <line x1="412" y1="138" x2="412" y2="184"/><line x1="426" y1="138" x2="426" y2="184"/>
                <line x1="440" y1="138" x2="440" y2="184"/><line x1="454" y1="138" x2="454" y2="184"/>
                <line x1="468" y1="138" x2="468" y2="184"/>
              </g>`
      },
      {
        id: 'cabecotes', nome: 'Cabeçotes', dica: 'A tampa dos cilindros, onde ficam as válvulas e a câmara.',
        aoEncaixar: 'Fecha o cilindro e forma a câmara de combustão. Aqui um cabeçote atende dois cilindros.',
        seErrar: 'O cabeçote fecha o cilindro por fora — os cilindros têm que estar montados antes.',
        svg: `<rect x="78" y="128" width="44" height="66" rx="7" fill="#cbd5e1" stroke="#1e293b" stroke-width="3"/>
              <rect x="478" y="128" width="44" height="66" rx="7" fill="#cbd5e1" stroke="#1e293b" stroke-width="3"/>`
      },
      {
        id: 'balancins', nome: 'Varetas e balancins', dica: 'A ligação entre o comando lá embaixo e as válvulas lá em cima.',
        aoEncaixar: 'A vareta empurra o balancim, que por sua vez abre a válvula no cabeçote.',
        seErrar: 'Os balancins ficam sobre o cabeçote — ele precisa estar montado primeiro.',
        svg: `<line x1="240" y1="132" x2="120" y2="126" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round"/>
              <line x1="360" y1="132" x2="480" y2="126" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round"/>
              <rect x="92" y="116" width="26" height="12" rx="5" fill="#f87171" stroke="#7f1d1d" stroke-width="2"/>
              <rect x="482" y="116" width="26" height="12" rx="5" fill="#f87171" stroke="#7f1d1d" stroke-width="2"/>`
      },
      {
        id: 'volante', nome: 'Volante do motor', dica: 'O disco pesado que guarda inércia e segura a embreagem.',
        aoEncaixar: 'Preso na ponta traseira do virabrequim, ele suaviza o giro entre uma explosão e outra.',
        seErrar: 'O volante se aparafusa na ponta do virabrequim, que precisa já estar no lugar.',
        svg: `<circle cx="300" cy="262" r="34" fill="#94a3b8" stroke="#1e293b" stroke-width="3"/>
              <circle cx="300" cy="262" r="14" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>`
      },
      {
        id: 'ventoinha', nome: 'Ventoinha e polia', dica: 'Num motor a ar, é ela que faz o papel do radiador.',
        aoEncaixar: 'Sopra ar forçado sobre cilindros e cabeçotes — sem ela o motor funde em minutos.',
        seErrar: 'A ventoinha é acionada pela polia do virabrequim, que precisa estar montado.',
        svg: `<circle cx="300" cy="78" r="28" fill="#e2e8f0" stroke="#1e293b" stroke-width="3"/>
              <g stroke="#475569" stroke-width="3" stroke-linecap="round">
                <line x1="300" y1="56" x2="300" y2="100"/><line x1="278" y1="78" x2="322" y2="78"/>
                <line x1="284" y1="62" x2="316" y2="94"/><line x1="316" y1="62" x2="284" y2="94"/>
              </g>`
      },
      {
        id: 'distribuidor', nome: 'Distribuidor', dica: 'Manda a faísca para o cilindro certo, no instante certo.',
        aoEncaixar: 'Distribui a alta tensão da bobina para cada vela na ordem de ignição do motor.',
        seErrar: 'O distribuidor é acionado pela árvore de comando — ela tem que estar montada antes.',
        svg: `<rect x="336" y="86" width="26" height="34" rx="5" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
              <circle cx="349" cy="84" r="9" fill="#334155" stroke="#0f172a" stroke-width="2"/>`
      },
      {
        id: 'velas', nome: 'Velas de ignição', dica: 'A fagulha que detona a mistura dentro da câmara.',
        aoEncaixar: 'Rosqueadas no cabeçote, produzem a centelha que inicia a combustão.',
        seErrar: 'As velas se rosqueiam no cabeçote — ele precisa estar montado primeiro.',
        svg: `<g fill="#facc15" stroke="#713f12" stroke-width="2">
                <rect x="72" y="140" width="12" height="9" rx="2"/><rect x="72" y="172" width="12" height="9" rx="2"/>
                <rect x="516" y="140" width="12" height="9" rx="2"/><rect x="516" y="172" width="12" height="9" rx="2"/>
              </g>`
      },
      {
        id: 'carburador', nome: 'Carburador', dica: 'Onde ar e combustível se misturam antes de entrar no motor.',
        aoEncaixar: 'Dosa a mistura ar-combustível. Foi substituído pela injeção eletrônica nos motores modernos.',
        seErrar: 'O carburador alimenta os cabeçotes pelo coletor — monte primeiro a parte de baixo do motor.',
        svg: `<rect x="272" y="118" width="56" height="26" rx="5" fill="#a16207" stroke="#422006" stroke-width="2.5"/>
              <rect x="288" y="104" width="24" height="16" rx="4" fill="#ca8a04" stroke="#422006" stroke-width="2"/>`
      },
    ]
  },

  // ---------- 4 CILINDROS EM LINHA (visto de lado) ----------
  linha4: {
    titulo: '4 cilindros em linha, refrigerado a água',
    viewBox: '0 0 600 340',
    pecas: [
      {
        id: 'bloco', nome: 'Bloco do motor', dica: 'A peça-base, onde ficam furados os cilindros.',
        aoEncaixar: 'Estrutura principal do motor: abriga os cilindros e sustenta o virabrequim.',
        seErrar: 'O bloco é a base de tudo — nada se monta antes dele.',
        svg: `<rect x="150" y="130" width="300" height="110" rx="8" fill="#cbd5e1" stroke="#334155" stroke-width="3"/>
              <g fill="#94a3b8" stroke="#475569" stroke-width="2">
                <rect x="172" y="140" width="54" height="92" rx="4"/><rect x="240" y="140" width="54" height="92" rx="4"/>
                <rect x="308" y="140" width="54" height="92" rx="4"/><rect x="376" y="140" width="54" height="92" rx="4"/>
              </g>`
      },
      {
        id: 'virabrequim', nome: 'Virabrequim', dica: 'O que transforma o sobe-e-desce dos pistões em giro?',
        aoEncaixar: 'Apoiado na base do bloco, converte o movimento dos pistões em rotação para o câmbio.',
        seErrar: 'O virabrequim se apoia no bloco — ele precisa vir primeiro.',
        svg: `<line x1="165" y1="252" x2="435" y2="252" stroke="#64748b" stroke-width="12" stroke-linecap="round"/>
              <g fill="#94a3b8" stroke="#1e293b" stroke-width="2">
                <circle cx="199" cy="252" r="12"/><circle cx="267" cy="252" r="12"/>
                <circle cx="335" cy="252" r="12"/><circle cx="403" cy="252" r="12"/>
              </g>`
      },
      {
        id: 'pistoes', nome: 'Pistões e bielas', dica: 'Recebem a explosão e empurram o virabrequim.',
        aoEncaixar: 'Cada pistão desce empurrado pela combustão e gira o virabrequim através da biela.',
        seErrar: 'As bielas se prendem ao virabrequim, que ainda não está montado.',
        svg: `<g fill="#e2e8f0" stroke="#334155" stroke-width="2.5">
                <rect x="176" y="146" width="46" height="30" rx="4"/><rect x="244" y="160" width="46" height="30" rx="4"/>
                <rect x="312" y="146" width="46" height="30" rx="4"/><rect x="380" y="160" width="46" height="30" rx="4"/>
              </g>
              <g stroke="#475569" stroke-width="5" stroke-linecap="round">
                <line x1="199" y1="176" x2="199" y2="240"/><line x1="267" y1="190" x2="267" y2="240"/>
                <line x1="335" y1="176" x2="335" y2="240"/><line x1="403" y1="190" x2="403" y2="240"/>
              </g>`
      },
      {
        id: 'carteroleo', nome: 'Cárter de óleo', dica: 'A bacia lá embaixo, onde o óleo se acumula.',
        aoEncaixar: 'Fecha o motor por baixo e serve de reservatório para o óleo lubrificante.',
        seErrar: 'O cárter fecha a parte de baixo — o virabrequim tem que estar montado antes.',
        svg: `<path d="M158 268 L442 268 L420 300 L180 300 Z" fill="#64748b" stroke="#1e293b" stroke-width="3"/>
              <rect x="286" y="296" width="28" height="12" rx="3" fill="#334155"/>`
      },
      {
        id: 'junta', nome: 'Junta do cabeçote', dica: 'A vedação fininha que separa bloco e cabeçote.',
        aoEncaixar: 'Veda a compressão e impede que óleo e água se misturem. Quando queima, dá muita dor de cabeça.',
        seErrar: 'A junta fica entre o bloco e o cabeçote — não dá para montá-la antes do bloco.',
        svg: `<rect x="150" y="122" width="300" height="9" rx="3" fill="#dc2626" stroke="#7f1d1d" stroke-width="2"/>`
      },
      {
        id: 'cabecote', nome: 'Cabeçote', dica: 'A tampa do bloco, onde ficam válvulas e câmara de combustão.',
        aoEncaixar: 'Fecha os cilindros e abriga as válvulas, as velas e os dutos de admissão e escape.',
        seErrar: 'O cabeçote assenta sobre a junta, que ainda não foi colocada.',
        svg: `<rect x="150" y="78" width="300" height="46" rx="7" fill="#cbd5e1" stroke="#1e293b" stroke-width="3"/>`
      },
      {
        id: 'comando', nome: 'Comando de válvulas', dica: 'Quem abre e fecha as válvulas na hora exata.',
        aoEncaixar: 'Os ressaltos do comando empurram as válvulas conforme o motor gira.',
        seErrar: 'O comando se apoia sobre o cabeçote — monte o cabeçote primeiro.',
        svg: `<line x1="162" y1="92" x2="438" y2="92" stroke="#78716c" stroke-width="9" stroke-linecap="round"/>
              <g fill="#a8a29e" stroke="#1e293b" stroke-width="1.5">
                <ellipse cx="199" cy="92" rx="11" ry="7"/><ellipse cx="267" cy="92" rx="11" ry="7"/>
                <ellipse cx="335" cy="92" rx="11" ry="7"/><ellipse cx="403" cy="92" rx="11" ry="7"/>
              </g>`
      },
      {
        id: 'correia', nome: 'Correia dentada', dica: 'Sincroniza o comando com o virabrequim. Se quebrar, o estrago é grande.',
        aoEncaixar: 'Mantém válvulas e pistões em sincronia. Se romper, as válvulas batem nos pistões.',
        seErrar: 'A correia liga o comando ao virabrequim — os dois precisam estar montados.',
        svg: `<path d="M470 92 A28 28 0 1 1 470 91 M470 252 A22 22 0 1 1 470 251" fill="none" stroke="#1e293b" stroke-width="3"/>
              <circle cx="470" cy="92" r="20" fill="#94a3b8" stroke="#1e293b" stroke-width="2.5"/>
              <circle cx="470" cy="252" r="15" fill="#94a3b8" stroke="#1e293b" stroke-width="2.5"/>
              <path d="M452 88 L452 250 M488 88 L488 250" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>`
      },
      {
        id: 'bomba', nome: 'Bomba d\'água', dica: 'Faz o líquido de arrefecimento circular pelo motor.',
        aoEncaixar: 'Empurra o líquido de arrefecimento entre o motor e o radiador, controlando a temperatura.',
        seErrar: 'A bomba é acionada pela correia — ela precisa estar instalada antes.',
        svg: `<circle cx="126" cy="180" r="22" fill="#38bdf8" stroke="#075985" stroke-width="2.5"/>
              <circle cx="126" cy="180" r="8" fill="#7dd3fc" stroke="#075985" stroke-width="2"/>`
      },
      {
        id: 'velas', nome: 'Velas de ignição', dica: 'A fagulha que detona a mistura.',
        aoEncaixar: 'Rosqueadas no cabeçote, produzem a centelha que dá início à combustão.',
        seErrar: 'As velas se rosqueiam no cabeçote, que ainda não foi montado.',
        svg: `<g fill="#facc15" stroke="#713f12" stroke-width="2">
                <rect x="193" y="64" width="12" height="16" rx="3"/><rect x="261" y="64" width="12" height="16" rx="3"/>
                <rect x="329" y="64" width="12" height="16" rx="3"/><rect x="397" y="64" width="12" height="16" rx="3"/>
              </g>`
      },
      {
        id: 'coletor', nome: 'Coletor de admissão', dica: 'O caminho por onde o ar entra até os cilindros.',
        aoEncaixar: 'Distribui o ar da admissão igualmente entre os quatro cilindros.',
        seErrar: 'O coletor se parafusa na lateral do cabeçote — monte o cabeçote antes.',
        svg: `<path d="M150 100 L96 100 L96 60 L150 60" fill="none" stroke="#475569" stroke-width="8" stroke-linecap="round"/>
              <rect x="70" y="48" width="30" height="24" rx="5" fill="#64748b" stroke="#1e293b" stroke-width="2"/>`
      },
      {
        id: 'volante', nome: 'Volante do motor', dica: 'O disco pesado que guarda inércia e recebe a embreagem.',
        aoEncaixar: 'Preso à ponta do virabrequim, suaviza o giro e transmite a força para a embreagem.',
        seErrar: 'O volante se aparafusa na ponta do virabrequim — ele tem que estar no lugar.',
        svg: `<circle cx="516" cy="252" r="30" fill="#94a3b8" stroke="#1e293b" stroke-width="3"/>
              <circle cx="516" cy="252" r="12" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>`
      },
    ]
  },
};

// Quais motores do catálogo abrem qual arquitetura
const montagens = {
  'volkswagen|Motor 1.1 a ar (original)': 'boxerAr',
  'volkswagen|Boxer a ar (1.2 a 1.6)':    'boxerAr',
  'volkswagen|Type 3 (boxer "pancake")':  'boxerAr',
  'volkswagen|Type 4 (boxer 1.7/1.8/2.0)':'boxerAr',
  'porsche|Boxer 4 a ar (356)':           'boxerAr',
  'volkswagen|EA111':                     'linha4',
  'volkswagen|EA827 (motor AP)':          'linha4',
  'volkswagen|EA211':                     'linha4',
  'fiat|FIRE':                            'linha4',
  'fiat|Firefly':                         'linha4',
  'chevrolet|Família I':                  'linha4',
  'ford|Zetec-Rocam':                     'linha4',
  'renault|K4M / K7M':                    'linha4',
  'hyundai|Kappa':                        'linha4',
  'honda|D-series':                       'linha4',
  'toyota|Série NZ':                      'linha4',
};

// helpers usados pelo catálogo (index) e pela página de montagem
function temMontagem(marcaId, nomeFamilia) { return !!montagens[marcaId + '|' + nomeFamilia]; }
function arqDaFamilia(marcaId, nomeFamilia) { return montagens[marcaId + '|' + nomeFamilia]; }
