// =========================================
// ARQUITETURAS DE MOTOR — nomes e explicações das peças
// A arte é por ARQUITETURA, não por modelo: um mesmo esquema serve
// para todas as famílias do catálogo que têm aquele desenho.
// As listas são geradas por parâmetro (nº de cilindros, layout),
// e a ordem é a ordem de montagem — o geo3d de montagem3d.js
// devolve as peças exatamente nesta mesma ordem.
// =========================================

const porExtenso = { 1:'um', 2:'dois', 3:'três', 4:'quatro', 5:'cinco', 6:'seis',
                     8:'oito', 10:'dez', 12:'doze', 16:'dezesseis' };
const numero = n => porExtenso[n] || n;

// ---------- EM LINHA (refrigerado a água) ----------
function pecasLinha(n) {
  return [
    { id:'bloco', nome:'Bloco do motor',
      dica:'A peça-base, onde ficam furados os cilindros.',
      aoEncaixar:`É o corpo do motor: ${numero(n)} cilindros furados lado a lado, em linha reta.`,
      seErrar:'Sem o bloco não há onde apoiar nenhuma outra peça.' },
    { id:'virabrequim', nome:'Virabrequim',
      dica:'O que transforma o sobe-e-desce dos pistões em giro?',
      aoEncaixar:'Deita no fundo do bloco e converte o movimento dos pistões em rotação.',
      seErrar:'O virabrequim precisa entrar antes de tudo que se apoia nele.' },
    { id:'pistoes', nome:'Pistões e bielas',
      dica:'Recebem a explosão e empurram o virabrequim.',
      aoEncaixar:'Cada pistão desce no seu cilindro e empurra o virabrequim pela biela.',
      seErrar:'A biela se prende ao virabrequim — ele tem que estar montado primeiro.' },
    { id:'carteroleo', nome:'Cárter de óleo',
      dica:'A bacia lá embaixo, onde o óleo se acumula.',
      aoEncaixar:'Fecha o motor por baixo e guarda o óleo que a bomba manda para todo o conjunto.',
      seErrar:'O cárter fecha a parte de baixo — o virabrequim tem que estar no lugar antes.' },
    { id:'junta', nome:'Junta do cabeçote',
      dica:'A vedação fininha que separa bloco e cabeçote.',
      aoEncaixar:'Veda a pressão da combustão e separa as galerias de óleo e de água.',
      seErrar:'A junta fica entre bloco e cabeçote — entra depois do bloco pronto.' },
    { id:'cabecote', nome:'Cabeçote',
      dica:'A tampa do bloco, onde ficam válvulas e câmara de combustão.',
      aoEncaixar:'Fecha os cilindros por cima e abriga válvulas, câmaras e dutos.',
      seErrar:'O cabeçote só assenta depois da junta.' },
    { id:'comando', nome:'Comando de válvulas',
      dica:'Quem abre e fecha as válvulas na hora exata.',
      aoEncaixar:'Gira na metade da rotação do virabrequim e comanda a abertura das válvulas.',
      seErrar:'O comando se apoia no cabeçote — monte o cabeçote antes.' },
    { id:'correia', nome:'Correia dentada',
      dica:'Sincroniza o comando com o virabrequim. Se quebrar, o estrago é grande.',
      aoEncaixar:'Liga a polia do virabrequim à do comando e mantém os dois em fase.',
      seErrar:'A correia liga virabrequim e comando — os dois precisam estar montados.' },
    { id:'bomba', nome:"Bomba d'água",
      dica:'Faz o líquido de arrefecimento circular pelo motor.',
      aoEncaixar:'Empurra a água pelo bloco e pelo cabeçote, levando o calor até o radiador.',
      seErrar:'A bomba se prende na lateral do bloco — o bloco vem primeiro.' },
    { id:'velas', nome:'Velas de ignição',
      dica:'A fagulha que detona a mistura.',
      aoEncaixar:`Uma vela por cilindro: ${numero(n)} faíscas, cada uma no seu tempo.`,
      seErrar:'A vela rosqueia no cabeçote — ele tem que estar montado.' },
    { id:'coletor', nome:'Coletor de admissão',
      dica:'O caminho por onde o ar entra até os cilindros.',
      aoEncaixar:`Distribui o ar da admissão igualmente entre os ${numero(n)} cilindros.`,
      seErrar:'O coletor se parafusa na lateral do cabeçote — monte o cabeçote antes.' },
    { id:'volante', nome:'Volante do motor',
      dica:'O disco pesado que guarda inércia e recebe a embreagem.',
      aoEncaixar:'Preso à ponta do virabrequim, suaviza o giro e transmite a força para a embreagem.',
      seErrar:'O volante se aparafusa na ponta do virabrequim — ele tem que estar no lugar.' },
  ];
}

// ---------- EM V (e em W) ----------
function pecasV(n, ehW) {
  const bancos = ehW ? 'quatro bancos' : 'dois bancos';
  return [
    { id:'bloco', nome:ehW ? 'Bloco em W' : 'Bloco em V',
      dica:'A peça-base: dois bancos de cilindros inclinados sobre o mesmo virabrequim.',
      aoEncaixar:`${numero(n)} cilindros divididos em ${bancos}, o que encurta muito o motor.`,
      seErrar:'Sem o bloco não há onde apoiar nenhuma outra peça.' },
    { id:'virabrequim', nome:'Virabrequim',
      dica:'O que transforma o sobe-e-desce dos pistões em giro?',
      aoEncaixar:'Fica no vértice do V. Cada moente recebe as bielas dos dois bancos.',
      seErrar:'O virabrequim precisa entrar antes de tudo que se apoia nele.' },
    { id:'pistoes', nome:'Pistões e bielas',
      dica:'Recebem a explosão e empurram o virabrequim.',
      aoEncaixar:'Os pistões dos dois bancos trabalham no mesmo virabrequim, alternando o tempo.',
      seErrar:'A biela se prende ao virabrequim — ele tem que estar montado primeiro.' },
    { id:'carteroleo', nome:'Cárter de óleo',
      dica:'A bacia lá embaixo, onde o óleo se acumula.',
      aoEncaixar:'Fecha o motor por baixo e guarda o óleo de lubrificação.',
      seErrar:'O cárter fecha a parte de baixo — o virabrequim tem que estar no lugar antes.' },
    { id:'juntas', nome:'Juntas dos cabeçotes',
      dica:'A vedação fininha entre bloco e cabeçote — uma para cada banco.',
      aoEncaixar:'Vedam a pressão da combustão nos dois bancos e separam óleo e água.',
      seErrar:'As juntas ficam entre bloco e cabeçotes — entram depois do bloco pronto.' },
    { id:'cabecotes', nome:'Cabeçotes',
      dica:'Motor em V tem dois: um para cada banco de cilindros.',
      aoEncaixar:'Cada banco tem seu cabeçote, com suas válvulas e suas câmaras.',
      seErrar:'Os cabeçotes só assentam depois das juntas.' },
    { id:'comandos', nome:'Comandos de válvulas',
      dica:'Quem abre e fecha as válvulas na hora exata, nos dois bancos.',
      aoEncaixar:'Giram na metade da rotação do virabrequim, comandando as válvulas de cada lado.',
      seErrar:'Os comandos se apoiam nos cabeçotes — monte os cabeçotes antes.' },
    { id:'corrente', nome:'Corrente de comando',
      dica:'Num V é quase sempre corrente, não correia: são muitos comandos para sincronizar.',
      aoEncaixar:'Liga o virabrequim aos comandos dos dois bancos e mantém tudo em fase.',
      seErrar:'A corrente liga virabrequim e comandos — todos precisam estar montados.' },
    { id:'bomba', nome:"Bomba d'água",
      dica:'Faz o líquido de arrefecimento circular pelo motor.',
      aoEncaixar:'Empurra a água pelos dois bancos, levando o calor até o radiador.',
      seErrar:'A bomba se prende na frente do bloco — o bloco vem primeiro.' },
    { id:'velas', nome:'Velas de ignição',
      dica:'A fagulha que detona a mistura.',
      aoEncaixar:`Uma vela por cilindro: ${numero(n)} faíscas distribuídas entre os bancos.`,
      seErrar:'A vela rosqueia no cabeçote — ele tem que estar montado.' },
    { id:'coletor', nome:'Coletor de admissão',
      dica:'Num motor em V, ele mora no vale — o espaço entre os dois bancos.',
      aoEncaixar:'Ocupa o vale do V e leva ar para os dois cabeçotes.',
      seErrar:'O coletor assenta sobre os cabeçotes — monte os cabeçotes antes.' },
    { id:'escape', nome:'Coletores de escape',
      dica:'Saem por fora de cada banco, levando os gases queimados.',
      aoEncaixar:'Recolhem o escape de cada banco e mandam para os dois lados do escapamento.',
      seErrar:'Os coletores se parafusam na lateral dos cabeçotes.' },
    { id:'volante', nome:'Volante do motor',
      dica:'O disco pesado que guarda inércia e recebe a embreagem.',
      aoEncaixar:'Preso à ponta do virabrequim, suaviza o giro e transmite a força.',
      seErrar:'O volante se aparafusa na ponta do virabrequim — ele tem que estar no lugar.' },
  ];
}

// ---------- BOXER (cilindros opostos) ----------
function pecasBoxer(n, ar) {
  if (ar) return [
    { id:'carter', nome:'Cárter',
      dica:'Por onde tudo começa: a caixa que sustenta o motor inteiro.',
      aoEncaixar:'É a estrutura central, feita em duas metades de liga leve, que abriga e alinha tudo.',
      seErrar:'Sem o cárter não existe onde apoiar nenhuma outra peça.' },
    { id:'virabrequim', nome:'Virabrequim',
      dica:'O que transforma o sobe-e-desce dos pistões em giro?',
      aoEncaixar:'Fica no eixo central do cárter e converte o movimento linear dos pistões em rotação.',
      seErrar:'O virabrequim precisa entrar antes de qualquer coisa que se apoie nele.' },
    { id:'comando', nome:'Árvore de comando',
      dica:'Quem manda nas válvulas abrirem e fecharem na hora certa.',
      aoEncaixar:'Gira na metade da rotação do virabrequim e comanda a abertura das válvulas.',
      seErrar:'O comando fica dentro do cárter, junto ao virabrequim — precisa entrar antes de fechar o motor.' },
    { id:'bielas', nome:'Bielas e pistões',
      dica:'A dupla que recebe a explosão e empurra o virabrequim.',
      aoEncaixar:'A biela liga o pistão ao virabrequim. No boxer, os pistões se movem em sentidos opostos.',
      seErrar:'Os pistões se prendem ao virabrequim — ele tem que estar montado primeiro.' },
    { id:'cilindros', nome:'Cilindros',
      dica:'O tubo por onde o pistão corre — aqui ele é individual e aletado.',
      aoEncaixar:'No motor a ar cada cilindro é uma peça separada, cheia de aletas para dissipar calor.',
      seErrar:'O cilindro envolve o pistão: ele só entra depois que o pistão estiver no lugar.' },
    { id:'cabecotes', nome:'Cabeçotes',
      dica:'A tampa dos cilindros, onde ficam as válvulas e a câmara.',
      aoEncaixar:`Fecham os ${numero(n / 2)} cilindros de cada lado e também são cheios de aletas.`,
      seErrar:'O cabeçote fecha o cilindro: ele precisa estar montado antes.' },
    { id:'balancins', nome:'Varetas e balancins',
      dica:'A ligação entre o comando lá embaixo e as válvulas lá em cima.',
      aoEncaixar:'A vareta empurra o balancim, e o balancim abre a válvula no cabeçote.',
      seErrar:'Os balancins ficam em cima do cabeçote — monte o cabeçote primeiro.' },
    { id:'volante', nome:'Volante do motor',
      dica:'O disco pesado que guarda inércia e segura a embreagem.',
      aoEncaixar:'Preso à ponta do virabrequim, suaviza o giro e transmite a força para a embreagem.',
      seErrar:'O volante se aparafusa na ponta do virabrequim — ele tem que estar no lugar.' },
    { id:'ventoinha', nome:'Ventoinha e polia',
      dica:'Num motor a ar, é ela que faz o papel do radiador.',
      aoEncaixar:'Sopra ar forçado sobre as aletas dos cilindros e cabeçotes. Sem ela, o motor cozinha.',
      seErrar:'A ventoinha é acionada pela polia do virabrequim — ele precisa estar montado.' },
    { id:'distribuidor', nome:'Distribuidor',
      dica:'Manda a faísca para o cilindro certo, no instante certo.',
      aoEncaixar:'Recebe o giro do comando e distribui a alta tensão para cada vela na ordem de ignição.',
      seErrar:'O distribuidor é acionado pelo comando — ele tem que estar no lugar.' },
    { id:'velas', nome:'Velas de ignição',
      dica:'A fagulha que detona a mistura dentro da câmara.',
      aoEncaixar:`Uma vela por cilindro: ${numero(n)} faíscas, cada uma no seu tempo.`,
      seErrar:'A vela rosqueia no cabeçote — ele tem que estar montado.' },
    { id:'carburador', nome:'Carburador',
      dica:'Onde ar e combustível se misturam antes de entrar no motor.',
      aoEncaixar:'Dosa a mistura pela depressão da admissão, sem nenhuma eletrônica no meio.',
      seErrar:'O carburador fica em cima do coletor, no alto do motor — falta montar o que vem embaixo.' },
  ];

  return [
    { id:'carter', nome:'Cárter bipartido',
      dica:'No boxer o bloco é uma caixa em duas metades, com o virabrequim no meio.',
      aoEncaixar:'As duas metades se fecham sobre o virabrequim e sustentam os dois bancos.',
      seErrar:'Sem o cárter não existe onde apoiar nenhuma outra peça.' },
    { id:'virabrequim', nome:'Virabrequim',
      dica:'O que transforma o sobe-e-desce dos pistões em giro?',
      aoEncaixar:'Fica no eixo central e converte o movimento dos pistões opostos em rotação.',
      seErrar:'O virabrequim precisa entrar antes de qualquer coisa que se apoie nele.' },
    { id:'bielas', nome:'Bielas e pistões',
      dica:'A dupla que recebe a explosão e empurra o virabrequim.',
      aoEncaixar:'Os pistões opostos avançam ao mesmo tempo: é isso que dá o equilíbrio do boxer.',
      seErrar:'Os pistões se prendem ao virabrequim — ele tem que estar montado primeiro.' },
    { id:'cilindros', nome:'Camisas dos cilindros',
      dica:'O tubo por onde o pistão corre, agora envolvido por água.',
      aoEncaixar:'Refrigerado a água, o cilindro é liso e fica cercado por uma galeria de arrefecimento.',
      seErrar:'O cilindro envolve o pistão: ele só entra depois que o pistão estiver no lugar.' },
    { id:'juntas', nome:'Juntas dos cabeçotes',
      dica:'A vedação fininha entre cilindro e cabeçote.',
      aoEncaixar:'Vedam a pressão da combustão e separam as galerias de água dos dois lados.',
      seErrar:'A junta fica entre cilindro e cabeçote — os cilindros vêm antes.' },
    { id:'cabecotes', nome:'Cabeçotes',
      dica:'A tampa dos cilindros, onde ficam as válvulas e a câmara.',
      aoEncaixar:`Fecham os ${numero(n / 2)} cilindros de cada lado, com suas válvulas e câmaras.`,
      seErrar:'O cabeçote fecha o cilindro: ele precisa estar montado antes.' },
    { id:'comandos', nome:'Comandos de válvulas',
      dica:'Quem abre e fecha as válvulas na hora exata, nos dois lados.',
      aoEncaixar:'No boxer moderno cada cabeçote tem seus comandos, girando por cima das válvulas.',
      seErrar:'Os comandos se apoiam nos cabeçotes — monte os cabeçotes antes.' },
    { id:'correia', nome:'Correia dentada',
      dica:'Sincroniza os comandos dos dois lados com o virabrequim.',
      aoEncaixar:'Liga a polia do virabrequim aos comandos de cada banco, mantendo tudo em fase.',
      seErrar:'A correia liga virabrequim e comandos — todos precisam estar montados.' },
    { id:'bomba', nome:"Bomba d'água",
      dica:'Faz o líquido de arrefecimento circular pelo motor.',
      aoEncaixar:'Empurra a água pelas galerias dos dois bancos até o radiador.',
      seErrar:'A bomba se prende na frente do cárter — ele vem primeiro.' },
    { id:'velas', nome:'Velas de ignição',
      dica:'A fagulha que detona a mistura dentro da câmara.',
      aoEncaixar:`Uma vela por cilindro: ${numero(n)} faíscas, cada uma no seu tempo.`,
      seErrar:'A vela rosqueia no cabeçote — ele tem que estar montado.' },
    { id:'coletor', nome:'Coletor de admissão',
      dica:'No boxer ele passa por cima, entre os dois bancos.',
      aoEncaixar:'Cruza o vão de cima do motor e leva ar para os cabeçotes dos dois lados.',
      seErrar:'O coletor assenta sobre os cabeçotes — monte os cabeçotes antes.' },
    { id:'volante', nome:'Volante do motor',
      dica:'O disco pesado que guarda inércia e recebe a embreagem.',
      aoEncaixar:'Preso à ponta do virabrequim, suaviza o giro e transmite a força.',
      seErrar:'O volante se aparafusa na ponta do virabrequim — ele tem que estar no lugar.' },
  ];
}

// ---------- ROTATIVO (Wankel) ----------
function pecasRotativo(n) {
  return [
    { id:'placaTras', nome:'Placa lateral traseira',
      dica:'O rotativo é montado em camadas, como um sanduíche. Esta é a primeira.',
      aoEncaixar:'Fecha o conjunto por trás e é nela que o eixo se apoia.',
      seErrar:'É a base do sanduíche: nada se monta antes dela.' },
    { id:'eixo', nome:'Excêntrico (eixo)',
      dica:'No rotativo não existe virabrequim: quem faz esse papel é o eixo excêntrico.',
      aoEncaixar:'Os ressaltos excêntricos fazem o rotor girar em torno deles e transmitir força.',
      seErrar:'O eixo atravessa tudo — ele entra logo depois da placa traseira.' },
    { id:'rotores', nome:`Rotor${n > 1 ? 'es' : ''} triangular${n > 1 ? 'es' : ''}`,
      dica:'A peça que substitui o pistão: um triângulo que gira dentro da carcaça.',
      aoEncaixar:`${numero(n)} rotor${n > 1 ? 'es' : ''} em forma de triângulo. Cada face faz admissão, compressão, explosão e escape.`,
      seErrar:'O rotor se monta sobre o excêntrico — o eixo precisa estar no lugar.' },
    { id:'engrenagem', nome:'Engrenagem estacionária',
      dica:'O que obriga o rotor a seguir sempre o mesmo caminho dentro da carcaça.',
      aoEncaixar:'Fixa na placa lateral, ela engrena com o rotor e define a trajetória do triângulo.',
      seErrar:'A engrenagem trabalha com o rotor — o rotor vem primeiro.' },
    { id:'vedacoes', nome:'Vedações de ápice',
      dica:'As três pontinhas do rotor que fazem o papel dos anéis do pistão.',
      aoEncaixar:'Cada ponta do triângulo tem uma lâmina que raspa a carcaça e veda as câmaras.',
      seErrar:'As vedações entram nas pontas do rotor — o rotor precisa estar montado.' },
    { id:'carcaca', nome:'Carcaça trocoide',
      dica:'A "casa" do rotor, com aquele formato de amendoim.',
      aoEncaixar:'Sua parede em curva epitrocoide é o que forma as três câmaras em volta do rotor.',
      seErrar:'A carcaça envolve o rotor: ele tem que estar no lugar antes.' },
    { id:'placaFrente', nome:'Placa lateral dianteira',
      dica:'A tampa que fecha o sanduíche pela frente.',
      aoEncaixar:'Fecha o conjunto e sustenta o outro apoio do eixo excêntrico.',
      seErrar:'É a última camada do sanduíche — a carcaça tem que estar montada.' },
    { id:'admissao', nome:'Lumbreiras de admissão',
      dica:'No rotativo não há válvula: o rotor abre e fecha janelas na parede.',
      aoEncaixar:'A própria borda do rotor descobre a janela na hora certa. Zero válvulas, zero comando.',
      seErrar:'As janelas ficam nas placas laterais — elas precisam estar montadas.' },
    { id:'escape', nome:'Escape',
      dica:'A janela de saída dos gases, do outro lado da carcaça.',
      aoEncaixar:'A saída fica na periferia da carcaça e é destapada pelo rotor a cada volta.',
      seErrar:'O escape sai pela carcaça — monte a carcaça antes.' },
    { id:'velas', nome:'Velas de ignição',
      dica:'O rotativo costuma usar duas velas por câmara.',
      aoEncaixar:'Duas velas por rotor: a câmara é alongada e uma faísca só não queima tudo a tempo.',
      seErrar:'As velas rosqueiam na carcaça — ela precisa estar montada.' },
    { id:'volante', nome:'Volante do motor',
      dica:'O disco pesado que guarda inércia e recebe a embreagem.',
      aoEncaixar:'Vai na ponta do excêntrico e transmite a força para a embreagem.',
      seErrar:'O volante se aparafusa na ponta do eixo — ele tem que estar no lugar.' },
  ];
}

// ---------- ELÉTRICO ----------
function pecasEletrico() {
  return [
    { id:'carcaca', nome:'Carcaça',
      dica:'A casca de alumínio que segura tudo e ainda ajuda a esfriar.',
      aoEncaixar:'Alojam-se nela o estator e os mancais. Costuma ter galerias de água na parede.',
      seErrar:'Sem a carcaça não existe onde apoiar nenhuma outra peça.' },
    { id:'estator', nome:'Estator',
      dica:'A parte que não gira: é o enrolamento que cria o campo magnético.',
      aoEncaixar:'Bobinas de cobre em volta de um pacote de chapas. É aqui que entra a corrente.',
      seErrar:'O estator entra prensado dentro da carcaça — ela vem primeiro.' },
    { id:'eixo', nome:'Eixo',
      dica:'Por onde a força sai do motor.',
      aoEncaixar:'Atravessa o centro e leva o torque do rotor até a redução.',
      seErrar:'O eixo passa pelo meio do estator — monte o estator antes.' },
    { id:'rotor', nome:'Rotor',
      dica:'A parte que gira, arrastada pelo campo do estator.',
      aoEncaixar:'Pacote de chapas montado no eixo. Ele gira perseguindo o campo girante do estator.',
      seErrar:'O rotor se monta sobre o eixo — o eixo tem que estar no lugar.' },
    { id:'imas', nome:'Ímãs permanentes',
      dica:'O que faz o rotor ser puxado pelo campo, sem precisar de corrente nele.',
      aoEncaixar:'Ímãs de terras-raras embutidos no rotor. É o que torna o motor síncrono e eficiente.',
      seErrar:'Os ímãs se alojam no rotor — o rotor precisa estar montado.' },
    { id:'rolamentos', nome:'Rolamentos',
      dica:'Quem sustenta o eixo girando quase sem atrito.',
      aoEncaixar:'Um de cada lado, mantêm o rotor centrado sem encostar no estator.',
      seErrar:'Os rolamentos abraçam o eixo — ele tem que estar montado.' },
    { id:'sensor', nome:'Sensor de posição',
      dica:'O inversor precisa saber exatamente onde o rotor está, o tempo todo.',
      aoEncaixar:'Lê a posição do rotor para o inversor comutar as fases no instante certo.',
      seErrar:'O sensor lê o rotor — o rotor precisa estar montado.' },
    { id:'tampa', nome:'Tampa traseira',
      dica:'Fecha a carcaça e sustenta o mancal de trás.',
      aoEncaixar:'Fecha o motor e sela o conjunto contra água e sujeira.',
      seErrar:'A tampa fecha por último o lado do sensor — ele vem antes.' },
    { id:'inversor', nome:'Inversor',
      dica:'Quem transforma a corrente contínua da bateria em corrente alternada trifásica.',
      aoEncaixar:'É o cérebro: controla frequência e corrente, e com isso a rotação e o torque.',
      seErrar:'O inversor se acopla ao motor fechado — falta fechar a carcaça.' },
    { id:'reducao', nome:'Redução',
      dica:'O motor elétrico gira muito rápido; a redução ajusta isso para a roda.',
      aoEncaixar:'Um único par de engrenagens já resolve: motor elétrico não precisa de câmbio.',
      seErrar:'A redução se acopla na ponta do eixo — ele tem que estar montado.' },
  ];
}

// =========================================
// CATÁLOGO DE ARQUITETURAS
// =========================================
const arquiteturas = {};

[2, 3, 4, 5, 6].forEach(n => {
  arquiteturas['linha' + n] = {
    titulo: `${numero(n)[0].toUpperCase() + numero(n).slice(1)} cilindros em linha` +
            (n > 2 ? ', refrigerado a água' : ''),
    pecas: pecasLinha(n)
  };
});

[4, 6, 8, 10, 12, 16].forEach(n => {
  arquiteturas['v' + n] = { titulo: `V${n} — ${numero(n)} cilindros em V`, pecas: pecasV(n, false) };
});
[8, 12, 16].forEach(n => {
  arquiteturas['w' + n] = { titulo: `W${n} — ${numero(n)} cilindros em W`, pecas: pecasV(n, true) };
});

[2, 4, 6, 12].forEach(n => {
  arquiteturas['boxerAr' + (n === 4 ? '' : n)] =
    { titulo: `Boxer ${n} cilindros refrigerado a ar`, pecas: pecasBoxer(n, true) };
});
[2, 4, 6, 12].forEach(n => {
  arquiteturas['boxer' + n] =
    { titulo: `Boxer ${n} cilindros refrigerado a água`, pecas: pecasBoxer(n, false) };
});

[1, 2, 3, 4].forEach(n => {
  arquiteturas['rotativo' + n] = {
    titulo: `Motor rotativo Wankel — ${numero(n)} rotor${n > 1 ? 'es' : ''}`,
    pecas: pecasRotativo(n)
  };
});

arquiteturas.eletrico = { titulo: 'Motor elétrico síncrono de ímãs permanentes', pecas: pecasEletrico() };

// =========================================
// DE QUE ARQUITETURA É CADA MOTOR DO CATÁLOGO
// A leitura é do nome e da descrição da família. Onde o catálogo não
// diz o layout, cai no esquema mais comum do automóvel: 4 em linha.
// =========================================

// casos que o texto não entrega e que valem uma regra pelo nome da família
const porNome = [
  [/small ?block|big ?block|\bLS\b|\bLT\b|windsor|cleveland|modular|coyote|boss 302|hemi|magnum|power ?stroke|duramax|triton|\bMOPAR\b|rocket|nailhead|flathead V|\bY-?block\b/i, 'v8'],
  [/quadrajet/i, 'v8'],
  [/duratorq|puma \(diesel\)|\bMWM\b|maxion|sofim|multijet|\bTDI\b|\bTDCi\b|\bCRDi\b|\bdCi\b|\bJTD\b|common ?rail|\bHDi\b/i, 'linha4'],
  [/opala.*(reto|6)|reto 6|\bmaster ?6\b/i, 'linha6'],
  [/\bVR6\b/i, 'v6'],
  [/\bB58\b|\bB57\b|\bN54\b|\bN55\b|\bM30\b|\bM50\b|\bM54\b|\bS54\b|\b2JZ\b|\b1JZ\b|\bRB\d\d\b|\bJZ\b|slant.?six|\bOM6\d\d\b/i, 'linha6'],
];

// Palavras que já dizem o layout. Casadas contra o texto "tokenizado"
// (pontuação virou espaço), por isso os padrões pedem espaço em volta:
// sem isso "ÖV4" — que é um Volvo de 4 em linha — passaria por V4.
const porTexto = [
  [/ W16 |dezesseis cilindros em W/i,          'w16'],
  [/ W12 |doze cilindros em W/i,               'w12'],
  [/ W8 /i,                                    'w8'],
  [/rotativ|wankel/i,                          null],   // resolvido à parte (nº de rotores)
  [/el[ée]tric|eletricidade|s[ií]ncrono de [ií]m[ãa]|e POWER|E GMP|Ultium|MEB/i, 'eletrico'],
  [/ V16 |dezesseis cilindros em V/i,          'v16'],
  [/ V12 |doze cilindros em V/i,               'v12'],
  [/ V10 |dez cilindros em V/i,                'v10'],
  [/ V8 |oito cilindros em V/i,                'v8'],
  [/ V6 |seis cilindros em V/i,                'v6'],
  [/ V4 |V twin|quatro cilindros em V/i,       'v4'],
  [/ 6 c[ií]l|seis c[ií]l| L6 | I6 |straight six|seis em linha|6 em linha/i, 'linha6'],
  [/ 5 c[ií]l|cinco c[ií]l| L5 |cinco em linha/i, 'linha5'],
  [/ 3 c[ií]l|tr[êe]s c[ií]l|tricil/i,         'linha3'],
  [/ 2 c[ií]l|dois c[ií]l|bicil|twinair|bic[ií]lindr/i, 'linha2'],
  [/ 4 c[ií]l|quatro c[ií]l| L4 | I4 |quatro em linha/i, 'linha4'],
];

function boxerDoTexto(txt) {
  const t = emTokens(txt);
  // "flat-plane" é o virabrequim de um V8, não um motor de cilindros opostos
  if (/flat plane|plano cruzado|virabrequim plano/i.test(t)) return null;
  if (!/boxer|flat [12468]|c[ií]lindros opostos|opostos horizontal| 2CV /i.test(t)) return null;
  // boxers famosos que são refrigerados a ar sem o texto dizer
  const ar = /a ar|refrigerad[oa] a ar|arrefecid[oa] a ar/i.test(t)
          || / 2CV | Type 3 | Type 4 |pancake| 917 | 547 |Fuhrmann|Turbo Air| 356 | 912 /i.test(t);
  if (/ flat 12|boxer 12|doze c[ií]l/i.test(t)) return ar ? 'boxerAr12' : 'boxer12';
  if (/ flat 6|boxer 6| 6 c[ií]l|seis c[ií]l| 911 | F6 /i.test(t)) return ar ? 'boxerAr6' : 'boxer6';
  if (/ flat 2|boxer 2|bicil|dois c[ií]l| 2CV /i.test(t)) return ar ? 'boxerAr2' : 'boxer2';
  return ar ? 'boxerAr' : 'boxer4';
}

function rotativoDoTexto(txt) {
  const t = emTokens(txt);
  if (!/rotativ|wankel/i.test(t)) return null;
  if (/quatro rotores|4 rotores| R26B | 787B /i.test(t)) return 'rotativo4';
  if (/tr[êe]s rotores|3 rotores| 20B /i.test(t)) return 'rotativo3';
  if (/um rotor|monorrotor|rotor [úu]nico|gerador|range extender| MX 30 /i.test(t)) return 'rotativo1';
  return 'rotativo2';   // o birrotor é o normal na rua (10A, 12A, 13B, Renesis)
}

// troca pontuação por espaço, para "V8," e "(V8)" virarem " V8 " —
// e para que "ÖV4" NÃO passe por "V4"
const emTokens = txt => ' ' + String(txt).replace(/[^0-9A-Za-zÀ-ÿ]+/g, ' ').trim() + ' ';

// No nome da família, "elétrico" manda. Na descrição, não: num híbrido
// como "V8 somado a três motores elétricos" quem interessa é o V8.
const porDescricao = porTexto.filter(r => r[1] !== 'eletrico')
                             .concat(porTexto.filter(r => r[1] === 'eletrico'));

function lerLayout(txt, ehNome) {
  const t = emTokens(txt);
  const rot = rotativoDoTexto(txt); if (rot) return rot;
  const box = boxerDoTexto(txt);    if (box) return box;
  for (const [re, arq] of (ehNome ? porTexto : porDescricao)) if (arq && re.test(t)) return arq;
  return null;
}

function arqDaFamilia(marcaId, motor) {
  const nome = typeof motor === 'string' ? motor : (motor && motor.nome) || '';
  const desc = typeof motor === 'string' ? '' : (motor && motor.desc) || '';

  // o nome da família manda: se ele já diz o layout, a descrição não muda isso
  return lerLayout(nome, true)
      || (porNome.find(([re]) => re.test(nome)) || [])[1]
      || lerLayout(nome + ' ' + desc, false)
      || 'linha4';   // o esquema mais comum do automóvel
}

// todo motor do catálogo tem um esquema 3D
function temMontagem() { return true; }
