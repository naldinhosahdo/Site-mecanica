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
// MARCAS — famílias de motor por montadora
// =========================================
const marcas = {
  volkswagen: {
    nome: 'Volkswagen', logo: 'logos/volkswagen.png', fundacao: 1937,
    motores: [
      { nome: 'Motor 1.1 a ar (original)', periodo: '1938–1960', desc: 'Motor boxer 4 cilindros refrigerado a ar de 1131 cc, criado para o "KdF-Wagen" que deu origem ao Fusca.' },
      { nome: 'Boxer a ar 1.3/1.5/1.6', periodo: '1960–2006', desc: 'Evolução do motor a ar, com cilindradas maiores. Equipou Fusca, Kombi e Brasília no Brasil até 2006.' },
      { nome: 'Type 3 (boxer "pancake")', periodo: '1961–1973', desc: 'Boxer achatado que ocupava pouca altura, liberando porta-malas atrás — solução do VW 1500/1600 Variant.' },
      { nome: 'Type 4 (boxer 1.7/1.8/2.0)', periodo: '1968–1983', desc: 'Boxer a ar maior e mais moderno, usado no VW 411/412, nas Kombi europeias e no Porsche 914.' },
      { nome: 'EA827 (motor AP)', periodo: '1972–2013', desc: 'Bloco em ferro fundido 1.6/1.8/2.0, a base do lendário "motor AP" fabricado no Brasil (álcool e gasolina).' },
      { nome: 'Diesel 1.5/1.6', periodo: '1976–1996', desc: 'O diesel do Golf ajudou a criar o mercado de carros de passeio a diesel na Europa, uma década antes do TDI.' },
      { nome: 'Wasserboxer', periodo: '1982–1992', desc: 'Curiosidade da marca: um motor boxer refrigerado a água, usado na Kombi T3 europeia.' },
      { nome: 'G60 (compressor G-Lader)', periodo: '1985–1993', desc: 'Motor 1.8 com compressor em espiral, usado no Corrado G60 e no Golf G60 — raro e cultuado.' },
      { nome: 'TDI', periodo: '1989–atual', desc: 'Linha de motores diesel turbo com injeção direta, presente na Amarok.' },
      { nome: 'VR6', periodo: '1991–atual', desc: 'V6 compacto com ângulo estreito entre cilindros, usado no Passat e em versões esportivas do Golf.' },
      { nome: 'EA113 (1.8T)', periodo: '1994–2006', desc: 'Motor turbo 1.8 que virou febre nos Golf, Jetta e New Beetle turbo dos anos 2000.' },
      { nome: 'EA111', periodo: '1999–2013', desc: 'Motores 1.0/1.6 Total Flex, equipou o Gol G3/G4/G5 e popularizou o bicombustível no Brasil.' },
      { nome: 'W8', periodo: '2001–2004', desc: 'Motor de 8 cilindros em "W", exclusivo do Passat W8 — uma das apostas mais ousadas e raras da marca.' },
      { nome: 'W12', periodo: '2001–2024', desc: 'Motor de 12 cilindros em "W" usado em modelos de luxo do grupo, como o Phaeton e o Bentley Continental.' },
      { nome: 'EA113 (2.0 TFSI)', periodo: '2003–2008', desc: 'Evolução turbo de alta performance, usada no Golf GTI e no Audi TT da época.' },
      { nome: '1.4 TSI Twincharger', periodo: '2005–2015', desc: 'Motor que usava turbo E compressor ao mesmo tempo, eliminando o atraso de resposta em baixa rotação.' },
      { nome: '2.5 R5 (5 cilindros)', periodo: '2005–2014', desc: 'Motor 5 cilindros em linha usado no Jetta e Golf vendidos na América do Norte, com som característico.' },
      { nome: 'EA888', periodo: '2007–atual', desc: 'Família turbo 2.0 TSI de alta performance, usada em Golf GTI, Jetta GLI e Tiguan.' },
      { nome: 'EA189', periodo: '2008–2015', desc: 'Motor diesel TDI que ficou conhecido mundialmente por estar no centro do escândalo de emissões "Dieselgate".' },
      { nome: 'EA288', periodo: '2012–atual', desc: 'Sucessor do EA189, linha diesel reformulada para atender às normas de emissão mais rígidas.' },
      { nome: 'EA211', periodo: '2012–atual', desc: 'Geração atual 1.0/1.6 MSI/TSI, mais leve e eficiente, usado em Polo, Virtus e T-Cross.' },
      { nome: 'Motores elétricos MEB', periodo: '2019–atual', desc: 'Motores elétricos da plataforma MEB, usados na família ID. — a aposta da VW para a era elétrica.' },
    ]
  },
  chevrolet: {
    nome: 'Chevrolet', logo: 'logos/chevrolet.png', fundacao: 1911,
    motores: [
      { nome: 'Motor 4 cilindros original', periodo: '1911–1920', desc: 'Primeiros motores da marca, usados nos modelos Série C "Classic Six" e seguintes no início do século 20.' },
      { nome: 'Stovebolt Six', periodo: '1929–1962', desc: 'Motor 6 cilindros em linha extremamente popular nos EUA, usado por mais de 30 anos em vários modelos.' },
      { nome: 'Small Block V8 (1ª/2ª geração)', periodo: '1955–2003', desc: 'Icônico V8 americano original, símbolo do Camaro e do Corvette clássicos.' },
      { nome: 'Big Block V8', periodo: '1958–2009', desc: 'V8 de grande cilindrada (396, 427 e 454), símbolo dos muscle cars americanos e do Chevelle SS.' },
      { nome: 'Turbo-Air 6', periodo: '1960–1969', desc: 'Curiosidade da marca: motor boxer 6 cilindros refrigerado a ar e montado atrás, exclusivo do Corvair.' },
      { nome: 'Motor Opala (reto 4 e 6)', periodo: '1968–1992', desc: 'Motores de origem Chevrolet/Opel que equiparam o Opala por mais de duas décadas no Brasil.' },
      { nome: 'Motor do Chevette', periodo: '1973–1993', desc: 'Motor 1.4/1.6 de origem Opel, com comando no cabeçote, que moveu um dos carros mais populares do Brasil.' },
      { nome: 'Iron Duke', periodo: '1977–1993', desc: 'Motor 2.5 de 4 cilindros feito para durar, muito usado nos modelos de entrada da GM nos Estados Unidos.' },
      { nome: 'V6 de 60 graus', periodo: '1980–2011', desc: 'Família de V6 2.8 a 3.9 usada no Camaro, na Blazer e na S10 por três décadas.' },
      { nome: 'Diesel MWM / Maxion', periodo: '1985–2001', desc: 'Motores diesel de fornecedores brasileiros usados na D-20 e na Silverado nacional.' },
      { nome: 'Família I', periodo: '1989–1996', desc: 'Motores 1.4/1.6 de origem GM/Opel usados no Kadett e Ipanema.' },
      { nome: 'LT5 (V8 DOHC)', periodo: '1990–1995', desc: 'V8 5.7 de duplo comando projetado com a Lotus, exclusivo do raríssimo Corvette ZR-1.' },
      { nome: 'Família II', periodo: '1993–2016', desc: 'Motores 1.8/2.0 8V e 16V, um dos mais usados da história da GM no Brasil (Vectra, Astra, Omega, Zafira).' },
      { nome: 'LS (Small Block Gen III/IV)', periodo: '1997–2017', desc: 'Sucessor moderno do Small Block clássico, queridinho de preparadores e usado no Camaro, Corvette e picapes.' },
      { nome: 'Ecotec (Família E)', periodo: '1999–atual', desc: 'Linha global compacta e eficiente, usada em Celta, Corsa, Onix e Prisma.' },
      { nome: 'Duramax', periodo: '2001–atual', desc: 'Linha de motores diesel robustos usados nas picapes pesadas da marca (Silverado, S10).' },
      { nome: 'LT (Small Block Gen V)', periodo: '2014–atual', desc: 'Geração atual do V8 6.2, incluindo o LT4 supercharged do Camaro ZL1 e o Corvette C8.' },
      { nome: 'Motor 1.0/1.4 Turbo', periodo: '2016–atual', desc: 'Geração turbo compacta atual, usada no Onix Turbo e no Tracker.' },
      { nome: 'Motor elétrico do Bolt', periodo: '2016–2023', desc: 'Primeiro elétrico de longa autonomia acessível da GM, anterior à plataforma Ultium.' },
      { nome: 'Motores elétricos Ultium', periodo: '2022–atual', desc: 'Plataforma elétrica da GM, usada no Blazer EV, Equinox EV e na picape Silverado EV.' },
      { nome: 'LT6 (V8 flat-plane)', periodo: '2023–atual', desc: 'V8 5.5 de virabrequim plano do Corvette Z06: o V8 aspirado mais potente já colocado em um carro de série.' },
    ]
  },
  fiat: {
    nome: 'Fiat', logo: 'logos/fiat.png', fundacao: 1899,
    motores: [
      { nome: 'Motor 4 cilindros Fiat 501', periodo: '1919–1926', desc: 'Um dos primeiros motores de produção em massa da Fiat, símbolo da consolidação da marca na Itália.' },
      { nome: 'Fiat 8V', periodo: '1952–1954', desc: 'V8 2.0 de um raro esportivo feito quase à mão pela Fiat, hoje um dos carros mais valorizados da marca.' },
      { nome: 'Motor traseiro do Fiat 600', periodo: '1955–1969', desc: 'Motor 4 cilindros refrigerado a água e montado atrás, que moveu o Fiat 600 e depois o Fiat 850.' },
      { nome: 'Motor bicilíndrico a ar (Fiat 500)', periodo: '1957–1975', desc: 'Motor de apenas 2 cilindros refrigerado a ar, montado atrás — o coração do icônico Fiat 500 clássico.' },
      { nome: 'Twin Cam (Lampredi)', periodo: '1966–2000', desc: 'Motor de comando duplo desenvolvido por Aurelio Lampredi, usado em versões esportivas do 124 e do Tempra.' },
      { nome: 'Dino V6', periodo: '1966–1973', desc: 'V6 projetado pela Ferrari e produzido pela Fiat para homologar o motor nas corridas de Fórmula 2.' },
      { nome: 'Motor tipo 128', periodo: '1969–1985', desc: 'Motor 1.3/1.5 que equipou o Fiat 147, primeiro carro a álcool em massa no Brasil.' },
      { nome: 'Sofim (diesel)', periodo: '1981–atual', desc: 'Motores diesel 2.3/2.8/3.0 desenvolvidos com a Iveco, usados na Ducato e em utilitários da marca.' },
      { nome: 'FIRE', periodo: '1985–atual', desc: '"Fully Integrated Robotized Engine", motor leve e compacto 1.0/1.4 que virou sinônimo de Uno e Palio.' },
      { nome: 'Pratola Serra (2.0 20V 5 cilindros)', periodo: '1996–2007', desc: 'Motor 5 cilindros 20 válvulas do Marea, famoso no Brasil pelo desempenho e pelo ronco característico.' },
      { nome: 'Multijet', periodo: '2000–atual', desc: 'Linha de motores diesel a injeção direta usada em utilitários e picapes (Toro, Strada).' },
      { nome: 'TwinAir', periodo: '2010–2020', desc: 'Motor turbo de apenas 2 cilindros e 0.9 litro, uma das apostas mais inovadoras da marca em downsizing.' },
      { nome: 'E.torQ', periodo: '2010–2020', desc: 'Motores 1.6/1.8/2.0 16V desenvolvidos com a Chrysler, usados em Punto, Linea, Argo e Cronos.' },
      { nome: 'Firefly', periodo: '2016–atual', desc: 'Família 3 cilindros turbo de última geração, presente em Mobi, Argo, Cronos e Pulse.' },
      { nome: 'Motores elétricos (500e)', periodo: '2020–atual', desc: 'Primeira geração totalmente elétrica da marca, estreando no novo Fiat 500 elétrico.' },
    ]
  },
  ford: {
    nome: 'Ford', logo: 'logos/ford.png', fundacao: 1903,
    motores: [
      { nome: 'Motor do Ford Modelo T', periodo: '1908–1927', desc: 'Motor 2.9 4 cilindros que motorizou o carro mais vendido do início do século 20, produzido por quase 20 anos sem grandes mudanças.' },
      { nome: 'Flathead V8', periodo: '1932–1953', desc: 'Primeiro V8 de baixo custo produzido em massa, revolucionou a indústria automotiva americana.' },
      { nome: 'Y-Block V8', periodo: '1954–1964', desc: 'Primeiro V8 da Ford com válvulas no cabeçote, sucessor direto do Flathead nos carros e picapes.' },
      { nome: 'FE Big Block V8', periodo: '1958–1976', desc: 'V8 de grande cilindrada (427/428), usado no Mustang Shelby GT500 e no lendário GT40 de Le Mans.' },
      { nome: 'Kent', periodo: '1959–2002', desc: 'Motor 4 cilindros simples e leve, usado no Escort e Cortina — virou base de motores de Fórmula Ford por décadas.' },
      { nome: 'Cologne V6', periodo: '1962–2011', desc: 'V6 de origem alemã usado no Capri, no Ranger e no Explorer por quase 50 anos.' },
      { nome: 'Windsor V8 (incl. 302 / "5.0")', periodo: '1962–2001', desc: 'Família de V8 pequenos muito versátil. A versão 302 pol³ virou o clássico "5.0" dos Mustang dos anos 80 e 90.' },
      { nome: 'Ford 300 (6 em linha)', periodo: '1965–1996', desc: 'Motor 4.9 de 6 cilindros famoso pela durabilidade quase indestrutível nas picapes F-Series.' },
      { nome: '6 cilindros de origem Willys', periodo: '1968–1991', desc: 'Motor herdado da Willys Overland após a compra pela Ford, usado no Maverick, Landau e F-100 brasileiras.' },
      { nome: '385 Series V8 (429/460)', periodo: '1968–1998', desc: 'Maior família de V8 da Ford, que inclui o raríssimo Boss 429 criado para as corridas da NASCAR.' },
      { nome: '351 Cleveland V8', periodo: '1970–1982', desc: 'V8 irmão do Windsor, porém com cabeçotes de dutos maiores — preferido para alta potência, como no Boss 351.' },
      { nome: 'Diesel MWM / Maxion', periodo: '1979–1998', desc: 'Motores diesel de fornecedores brasileiros que equiparam a picape F-1000 por quase duas décadas.' },
      { nome: 'CHT', periodo: '1982–1996', desc: '"Compound High Turbulence", motor 1.6/1.8 que equipou o Corcel, Belina e Del Rey no Brasil.' },
      { nome: 'Modular V8', periodo: '1991–2014', desc: 'Sucessor mais moderno do Windsor, usado no Mustang GT e em SUVs e picapes maiores da Ford.' },
      { nome: 'Power Stroke (diesel)', periodo: '1994–atual', desc: 'Linha de motores diesel de grande porte que equipa as picapes Super Duty (F-250, F-350) há três décadas.' },
      { nome: 'Zetec-Rocam', periodo: '1996–2013', desc: 'Motores 1.0/1.6 simples e resistentes, usados em Fiesta, Ka e Escort.' },
      { nome: 'Triton V10', periodo: '1997–2019', desc: 'V10 6.8 usado nos utilitários e caminhonetes de maior porte, como o gigantesco Ford Excursion.' },
      { nome: 'Duratec', periodo: '1998–2019', desc: 'Linha 1.6/2.0 16V mais moderna e potente, presente no Focus e EcoSport.' },
      { nome: 'Barra (6 cilindros)', periodo: '2002–2016', desc: 'Motor 6 cilindros em linha australiano, cultuado por entusiastas pela enorme capacidade de ganhar potência com turbo.' },
      { nome: 'EcoBoost', periodo: '2009–atual', desc: 'Motores turbo de baixa cilindrada com alta eficiência, adotados globalmente pela Ford.' },
      { nome: 'Coyote 5.0 V8', periodo: '2011–atual', desc: 'O "5.0" moderno: V8 de 5.0 litros e mais de 450 cv que equipa o Mustang GT e a picape F-150 até hoje.' },
      { nome: '5.2 V8 (Voodoo / Predator)', periodo: '2015–atual', desc: 'V8 5.2 de alta performance: o Voodoo de virabrequim plano do Shelby GT350 e o Predator supercharged do GT500.' },
      { nome: 'Dragão', periodo: '2018–atual', desc: 'Motores 1.0/1.5 turbo Flex desenvolvidos no Brasil para Ka e novo EcoSport.' },
      { nome: 'Godzilla 7.3 V8', periodo: '2020–atual', desc: 'Um dos maiores V8 a gasolina em produção hoje, feito para trabalho pesado nas picapes Super Duty.' },
      { nome: 'Motores elétricos', periodo: '2021–atual', desc: 'Linha elétrica da marca, presente no Mustang Mach-E e na picape F-150 Lightning.' },
    ]
  },
  toyota: {
    nome: 'Toyota', logo: 'logos/toyota.png', fundacao: 1937,
    motores: [
      { nome: 'Motor Tipo A', periodo: '1936–1947', desc: 'Primeiro motor a gasolina desenvolvido pela Toyota, usado no protótipo AA que deu origem à marca.' },
      { nome: 'Série R', periodo: '1953–1997', desc: 'Família de motores robustos usada por décadas no Corona, Hilux e primeiras gerações do Land Cruiser.' },
      { nome: 'Série F', periodo: '1955–1992', desc: 'Motores 6 cilindros em linha de enorme durabilidade, marca registrada do Land Cruiser clássico.' },
      { nome: 'Série B (diesel)', periodo: '1964–2012', desc: 'Diesel robusto do Land Cruiser e do Dyna. Curiosidade: o Bandeirante brasileiro usava um diesel Mercedes-Benz, não este.' },
      { nome: 'Série M', periodo: '1965–1993', desc: 'Motores 6 cilindros em linha do Supra clássico — o 7M-GTE foi o antecessor direto do 2JZ.' },
      { nome: 'Série K', periodo: '1966–1988', desc: 'Motores 1.2/1.6 usados no Corolla e Tercel clássicos.' },
      { nome: 'Série A', periodo: '1978–2018', desc: 'Motores 1.3/1.6/1.8 confiáveis, presentes em várias gerações do Corolla.' },
      { nome: 'Série S', periodo: '1980–2007', desc: 'Motores 1.8/2.0/2.2 de porte médio, usados no Camry, Corona e Celica por quase 30 anos.' },
      { nome: '4A-GE', periodo: '1983–2002', desc: 'Versão esportiva 16V da Série A, cultuada por equipar o Corolla AE86, ícone do drift.' },
      { nome: '3S-GTE', periodo: '1986–2007', desc: 'Motor 2.0 turbo do Celica GT-Four e do MR2 Turbo, nascido para os ralis do Grupo A.' },
      { nome: 'Série VZ (V6)', periodo: '1988–2004', desc: 'V6 3.0/3.4 das Hilux e 4Runner mais antigas, antecessor direto da família GR.' },
      { nome: 'Série UZ (V8)', periodo: '1989–2011', desc: 'V8 4.0 a 4.7 (1UZ/2UZ/3UZ) famoso pela suavidade, usado no Lexus LS400 e no Land Cruiser.' },
      { nome: 'Série JZ (1JZ / 2JZ)', periodo: '1990–2007', desc: 'Motores 6 cilindros em linha lendários entre entusiastas. O 2JZ-GTE do Supra Turbo suporta potências absurdas.' },
      { nome: 'Hybrid Synergy Drive', periodo: '1997–atual', desc: 'Sistema híbrido pioneiro que tornou o Prius o carro híbrido mais famoso do mundo.' },
      { nome: 'Série NZ', periodo: '1997–atual', desc: 'Motores 1.3/1.5 econômicos do Yaris, Etios e das primeiras gerações do Prius.' },
      { nome: 'Série ZZ', periodo: '1998–2007', desc: 'Motor 1.8 (1ZZ-FE) de bloco em alumínio que equipou milhões de Corolla no mundo todo.' },
      { nome: '2ZZ-GE', periodo: '1999–2006', desc: 'Motor 1.8 de comando com dois perfis, capaz de girar a 8.000 rpm — usado no Celica GT-S e no Lotus Elise.' },
      { nome: 'Série KD (diesel)', periodo: '2000–2015', desc: 'Motores diesel 2.5 e 3.0 turbo que equiparam gerações da Hilux e do SW4 no Brasil.' },
      { nome: 'Série GR (V6)', periodo: '2003–atual', desc: 'V6 3.5 (2GR) usado no Camry, RAV4, Hilux SW4 e em versões V6 da Hilux.' },
      { nome: '1LR-GUE (V10)', periodo: '2010–2012', desc: 'V10 4.8 feito com a Yamaha para o Lexus LFA, com som tão afinado que virou referência entre superesportivos.' },
      { nome: 'Célula de hidrogênio (Mirai)', periodo: '2014–atual', desc: 'Sistema de célula a combustível que gera eletricidade a partir de hidrogênio, emitindo apenas água.' },
      { nome: 'Série GD (diesel)', periodo: '2015–atual', desc: 'Geração diesel atual (1GD 2.8), usada na Hilux e SW4 vendidas hoje.' },
      { nome: 'Dynamic Force (Série ZR/NR)', periodo: '2015–atual', desc: 'Motores 1.5/2.0 de alta eficiência térmica, usados no Corolla e Yaris atuais.' },
      { nome: 'V35A-FTS (V6 biturbo)', periodo: '2017–atual', desc: 'V6 3.5 biturbo que substituiu os V8 nos Land Cruiser e nos Lexus de topo de linha.' },
      { nome: 'G16E-GTS', periodo: '2020–atual', desc: 'Motor 1.6 turbo de apenas 3 cilindros e mais de 260 cv, criado para o GR Yaris e o GR Corolla.' },
      { nome: 'Motores elétricos (bZ)', periodo: '2022–atual', desc: 'Linha de motores 100% elétricos da marca, estreando na família bZ.' },
    ]
  },
  honda: {
    nome: 'Honda', logo: 'logos/honda.png', fundacao: 1948,
    motores: [
      { nome: 'Motor do T360 / S500', periodo: '1963–1966', desc: 'Primeiros motores automotivos da Honda: 4 cilindros de duplo comando e alta rotação, herdando a engenharia das motos.' },
      { nome: 'Motores de Fórmula 1', periodo: '1964–atual', desc: 'Em várias fases, os motores Honda dominaram a F1 — inclusive nos títulos de Ayrton Senna pela McLaren.' },
      { nome: 'Motor CVCC', periodo: '1972–1987', desc: 'Tecnologia pioneira de combustão de baixa emissão, que dispensou o catalisador exigido nos EUA na época.' },
      { nome: 'E-series', periodo: '1979–1987', desc: 'Motores dos primeiros Civic e Accord vendidos em larga escala fora do Japão.' },
      { nome: 'D-series', periodo: '1984–2005', desc: 'Motores 1.5/1.6 SOHC, usados no Civic das gerações mais populares no Brasil.' },
      { nome: 'B-series (VTEC)', periodo: '1988–2001', desc: 'Motores esportivos com a icônica tecnologia VTEC, marca registrada do Civic Si e do Integra Type R.' },
      { nome: 'C-series (V6)', periodo: '1990–2005', desc: 'V6 que equipou o superesportivo NSX, primeiro carro de produção com bloco totalmente em alumínio.' },
      { nome: 'H-series', periodo: '1993–2001', desc: 'Motores VTEC de maior cilindrada, usados no Prelude Type S e no Accord esportivo.' },
      { nome: 'J-series (V6)', periodo: '1996–atual', desc: 'V6 3.0 a 3.5 usado no Accord, Pilot e Odyssey por quase três décadas.' },
      { nome: 'F-series (F20C)', periodo: '1999–2009', desc: 'Motor 2.0 do S2000 que girava até 9.000 rpm — recorde de potência por litro em motor aspirado de série.' },
      { nome: 'IMA (híbrido)', periodo: '1999–2015', desc: 'Sistema híbrido do Insight, o primeiro carro híbrido vendido nos Estados Unidos — antes até do Prius.' },
      { nome: 'K-series', periodo: '2001–2020', desc: 'Sucessor do B/H-series, motores 1.8/2.0/2.4 usados em Civic, Civic Type R e Accord.' },
      { nome: 'R-series', periodo: '2006–2015', desc: 'Motores 1.8/2.0 econômicos, usados no Civic de oitava e nona geração — muito comuns no Brasil.' },
      { nome: 'L-series', periodo: '2008–atual', desc: 'Motores 1.5/1.8 compactos usados no Fit, City e HR-V.' },
      { nome: 'Earth Dreams (i-VTEC turbo / e:HEV)', periodo: '2015–atual', desc: 'Motores turbo modernos e o sistema híbrido e:HEV do Civic, Accord e HR-V atuais.' },
      { nome: 'V6 biturbo híbrido (NSX)', periodo: '2016–2022', desc: 'V6 3.5 biturbo somado a três motores elétricos no NSX moderno, com tração integral inteligente.' },
    ]
  },
  hyundai: {
    nome: 'Hyundai', logo: 'logos/hyundai.png', fundacao: 1967,
    motores: [
      { nome: 'Motores licenciados Mitsubishi', periodo: '1968–1989', desc: 'Nos primeiros anos, a Hyundai produziu motores sob licença da Mitsubishi para seus primeiros modelos, como o Pony.' },
      { nome: 'Alpha', periodo: '1990–atual', desc: 'Motores 1.0/1.6 atualizados ao longo de décadas, usados em modelos de entrada.' },
      { nome: 'Beta', periodo: '1990–atual', desc: 'Linha 1.6/2.0 amplamente usada no HB20 e Creta no Brasil.' },
      { nome: 'Epsilon', periodo: '1997–2011', desc: 'Motores 1.0/1.1 de baixo custo, criados para os compactos de entrada como o Atos.' },
      { nome: 'Delta (V6)', periodo: '1999–2010', desc: 'Primeiro V6 próprio da marca, usado no Sonata e nas primeiras gerações do Santa Fe.' },
      { nome: 'Theta', periodo: '2004–atual', desc: 'Motores 4 cilindros maiores (2.0/2.4), compartilhados com a Kia, usados no Sonata e Tucson.' },
      { nome: 'Lambda (V6)', periodo: '2005–atual', desc: 'V6 3.0 a 3.8 usado nos modelos maiores da marca, como Santa Fe, Azera e Genesis.' },
      { nome: 'Gamma', periodo: '2006–atual', desc: 'Motores 1.4/1.6 GDI de injeção direta, versão mais eficiente da linha.' },
      { nome: 'Tau (V8)', periodo: '2008–2020', desc: 'V8 4.6/5.0 desenvolvido para os sedãs de luxo Genesis e Equus — o topo de linha da engenharia coreana.' },
      { nome: 'R-series (diesel)', periodo: '2009–atual', desc: 'Motores diesel 2.0/2.2 usados no Santa Fe, Tucson e Creta em mercados que aceitam diesel.' },
      { nome: 'Nu', periodo: '2010–atual', desc: 'Motores 1.8/2.0 de porte médio, usados no Elantra e em versões do Tucson.' },
      { nome: 'Kappa', periodo: '2011–atual', desc: 'Motores 1.0 3 cilindros e 1.2, usados no HB20 e no Atos — os mais vendidos da marca no Brasil.' },
      { nome: 'Célula de hidrogênio', periodo: '2013–atual', desc: 'A Hyundai foi a primeira a vender um SUV de célula a combustível em série, o Tucson FCEV, seguido pelo Nexo.' },
      { nome: '2.0 T-GDi (linha N)', periodo: '2017–atual', desc: 'Motor turbo da divisão esportiva N, usado no i30 N e no Elantra N com mais de 275 cv.' },
      { nome: 'Smartstream', periodo: '2018–atual', desc: 'Geração mais recente, focada em eficiência de combustível e menor emissão.' },
      { nome: 'Motores elétricos E-GMP', periodo: '2021–atual', desc: 'Plataforma 100% elétrica da marca, usada no Ioniq 5 e Ioniq 6, com recarga ultrarrápida de 800V.' },
    ]
  },
  renault: {
    nome: 'Renault', logo: 'logos/renault.png', fundacao: 1899,
    motores: [
      { nome: 'Motores originais Renault', periodo: '1899–1945', desc: 'Motores primitivos desenvolvidos pelos irmãos Renault nos primórdios da fabricação de automóveis na França.' },
      { nome: 'Motor Billancourt', periodo: '1946–1986', desc: 'Motor 1.0 muito duradouro, usado no 4CV, Renault 4 e Renault 5 originais.' },
      { nome: 'Cléon-Fonte', periodo: '1962–2003', desc: 'Um dos motores mais duradouros da história, 1.0 a 1.7, usado em dezenas de modelos por 40 anos.' },
      { nome: 'Cléon-Alu', periodo: '1962–2004', desc: 'Irmão de bloco em alumínio do Cléon-Fonte, usado nas versões esportivas como o R5 Alpine Turbo.' },
      { nome: 'PRV (V6)', periodo: '1974–1998', desc: 'V6 desenvolvido em parceria com Peugeot e Volvo, usado no R25, no Alpine e até no DeLorean DMC-12.' },
      { nome: 'Motores de Fórmula 1', periodo: '1977–atual', desc: 'A Renault levou o motor turbo para a F1 em 1977 e mudou a categoria para sempre, somando títulos com Williams, Benetton e Red Bull.' },
      { nome: 'F-Type (F3R/F7R)', periodo: '1986–2010', desc: 'Motores esportivos usados em versões preparadas como o Clio Williams e o Mégane R.S.' },
      { nome: 'D-Type (D4F/D7F)', periodo: '1996–2015', desc: 'Motores 1.0/1.2 compactos, usados no Twingo, Clio e em versões do Kwid fora do Brasil.' },
      { nome: 'dCi (diesel)', periodo: '1997–atual', desc: 'Linha de motores diesel common-rail, usada no Master, Duster e em vários modelos europeus.' },
      { nome: 'K4M / K7M', periodo: '2000–atual', desc: 'Motores 1.6 8V/16V usados em Logan, Sandero e Duster no Brasil.' },
      { nome: 'Energy (SCe/TCe)', periodo: '2012–atual', desc: 'Linha 1.0/1.3 aspirada e turbo mais eficiente, presente no Kwid e no Duster atual.' },
      { nome: 'Motores elétricos', periodo: '2012–atual', desc: 'A Renault foi pioneira em elétricos populares com o Zoe, hoje seguido pelo Mégane e Scénic E-Tech.' },
      { nome: 'HR13 (1.3 TCe)', periodo: '2018–atual', desc: 'Motor 1.3 turbo desenvolvido em parceria com a Mercedes-Benz, usado no Duster, Captur e Oroch.' },
      { nome: 'E-Tech (híbrido)', periodo: '2020–atual', desc: 'Sistema híbrido com câmbio sem embreagem, derivado da experiência da marca em Fórmula 1.' },
    ]
  },
  nissan: {
    nome: 'Nissan', logo: 'logos/nissan.png', fundacao: 1933,
    motores: [
      { nome: 'Motores Datsun iniciais', periodo: '1933–1965', desc: 'Primeiros motores pequenos usados nos automóveis Datsun, marca original da Nissan para exportação.' },
      { nome: 'Série A', periodo: '1966–1998', desc: 'Motores 1.0 a 1.5 usados em modelos compactos japoneses clássicos.' },
      { nome: 'Série L', periodo: '1967–1986', desc: 'Motores 6 cilindros em linha famosos por equipar o Datsun 240Z e o Skyline clássico.' },
      { nome: 'Série RB', periodo: '1979–2004', desc: 'Família de 6 cilindros que inclui o lendário RB26DETT, motor do Skyline GT-R.' },
      { nome: 'Série Z', periodo: '1979–1989', desc: 'Motores 2.0/2.4 de picapes e utilitários Datsun, conhecidos pela resistência ao trabalho pesado.' },
      { nome: 'Série CA', periodo: '1981–1994', desc: 'Motores 1.6/2.0 de porte médio, usados no Bluebird e em versões do Silvia.' },
      { nome: 'FJ20', periodo: '1981–1990', desc: 'Primeiro motor de 4 válvulas por cilindro da marca, do Skyline RS apelidado de "Iron Mask".' },
      { nome: 'Série VG (V6)', periodo: '1983–2004', desc: 'Primeiro V6 japonês produzido em massa; na versão biturbo moveu o icônico 300ZX.' },
      { nome: 'Série GA', periodo: '1987–2005', desc: 'Motores 1.3/1.6 econômicos e duráveis, conhecidos no Brasil por equipar o Sentra dos anos 90.' },
      { nome: 'Série KA', periodo: '1988–2004', desc: 'Motor 2.4 robusto do 240SX e da Frontier, muito usado em preparações de drift.' },
      { nome: 'Série SR/QG', periodo: '1990–2010', desc: 'Motores 1.6/2.0 16V usados no Sentra e no antigo March/Micra.' },
      { nome: 'Série VQ', periodo: '1994–atual', desc: 'V6 premiado internacionalmente, usado em modelos esportivos e SUVs da marca por décadas.' },
      { nome: 'Série QR', periodo: '2000–atual', desc: 'Motores 2.0/2.5 usados no X-Trail, Altima e em versões maiores do Sentra.' },
      { nome: 'Série VK (V8)', periodo: '2001–2020', desc: 'V8 de 4.5 a 5.6 litros, usado no Patrol, Titan e em versões de topo da Infiniti.' },
      { nome: 'Série YD (diesel)', periodo: '2001–atual', desc: 'Motor diesel 2.5 turbo, conhecido no Brasil por equipar a picape Frontier.' },
      { nome: 'Série MR', periodo: '2005–atual', desc: 'Motores 1.6/2.0 modernos, desenvolvidos junto com a Renault, usados no Sentra e Juke.' },
      { nome: 'Série VR', periodo: '2007–atual', desc: 'V6 biturbo de alta performance, motor do lendário GT-R atual.' },
      { nome: 'Série HR', periodo: '2010–atual', desc: 'Motores 1.0/1.6 modernos, usados em Versa, March e Kicks.' },
      { nome: 'Motores elétricos (Leaf)', periodo: '2010–atual', desc: 'O Leaf foi o primeiro carro elétrico de produção em massa vendido no mundo todo.' },
      { nome: 'e-POWER', periodo: '2016–atual', desc: 'Sistema em que o motor a combustão só gera energia e as rodas são movidas por motor elétrico — usado no Kicks e-POWER.' },
      { nome: 'VC-Turbo (compressão variável)', periodo: '2018–atual', desc: 'Primeiro motor de produção do mundo com taxa de compressão variável, alternando entre economia e potência.' },
    ]
  },
  peugeot: {
    nome: 'Peugeot', logo: 'logos/peugeot.png', fundacao: 1810,
    motores: [
      { nome: 'Motor do Peugeot Type 3', periodo: '1891–1900', desc: 'Um dos primeiros automóveis a gasolina da Peugeot, marcando a entrada da marca no setor automotivo.' },
      { nome: 'Motor Indenor (diesel)', periodo: '1959–2000', desc: 'Motor diesel muito conhecido no Brasil por equipar táxis e picapes por sua robustez e economia.' },
      { nome: 'Motores XU/XN', periodo: '1970–2000', desc: 'Motores 1.4 a 2.0 desenvolvidos com a Citroën, usados em várias gerações do 205, 405 e 306.' },
      { nome: 'TU', periodo: '1970–2010', desc: 'Motores 1.0 a 1.6 muito usados nos anos 90 e 2000, presentes no 206 e 306.' },
      { nome: 'PRV (V6)', periodo: '1974–1998', desc: 'V6 desenvolvido em parceria com Renault e Volvo, usado nos Peugeot 604 e 605.' },
      { nome: 'Douvrin ("Type J")', periodo: '1977–1996', desc: 'Motor 2.0/2.2 nascido da mesma joint venture do PRV, usado nos Peugeot 505 e 605.' },
      { nome: 'XUD (diesel)', periodo: '1982–2000', desc: 'Motor diesel aspirado e turbo que consolidou a fama da Peugeot em economia de combustível na Europa.' },
      { nome: 'Motor do 205 T16 (Grupo B)', periodo: '1984–1986', desc: 'Turbo central-traseiro do 205 T16, campeão mundial de rali na era mais radical e perigosa do esporte.' },
      { nome: 'EW/DW', periodo: '1998–2015', desc: 'Motores 1.6/2.0 16V a gasolina e diesel (HDi) usados no 307 e 308.' },
      { nome: 'THP "Prince" 1.6', periodo: '2006–2016', desc: 'Motor turbo desenvolvido em parceria com a BMW, usado no 208 GTi, no RCZ e nos MINI Cooper S.' },
      { nome: 'Motores de Le Mans (908 HDi)', periodo: '2007–2011', desc: 'V12 diesel de competição que levou a Peugeot à vitória nas 24 Horas de Le Mans em 2009.' },
      { nome: 'Hybrid4 (diesel-elétrico)', periodo: '2011–2016', desc: 'O 3008 HYbrid4 foi o primeiro híbrido diesel de produção em série do mundo.' },
      { nome: 'BlueHDi', periodo: '2013–atual', desc: 'Geração diesel atual com tratamento de emissões por ureia (AdBlue), usada em toda a linha europeia.' },
      { nome: 'PureTech', periodo: '2014–atual', desc: 'Motores turbo 3 cilindros modernos e eficientes, usados no 208 e 2008 atuais.' },
      { nome: 'Motores elétricos (e-208)', periodo: '2019–atual', desc: 'Linha elétrica da marca dentro do grupo Stellantis, presente no e-208 e no e-2008.' },
    ]
  },
  bmw: {
    nome: 'BMW', logo: 'logos/bmw.png', fundacao: 1916,
    motores: [
      { nome: 'Motor do BMW Dixi', periodo: '1928–1932', desc: 'Primeiro motor automotivo da marca: um 750 cc produzido sob licença do Austin Seven, com que a BMW entrou no ramo de carros.' },
      { nome: 'Motor M78 (BMW 303)', periodo: '1933–1936', desc: 'Motor 6 cilindros em linha do primeiro carro a levar o característico grelha "rim duplo" da marca.' },
      { nome: 'M328 (BMW 328)', periodo: '1936–1940', desc: 'Seis cilindros com câmara hemisférica do BMW 328, vencedor das Mille Miglia e um dos motores mais copiados do pré-guerra.' },
      { nome: 'M10', periodo: '1962–1988', desc: 'Motor 4 cilindros que formou a base de vários modelos e até de motores de Fórmula 1 turbo da marca.' },
      { nome: 'M20 / M30 (reto-6)', periodo: '1977–1993', desc: 'Icônicos motores 6 cilindros em linha, marca registrada da suavidade BMW.' },
      { nome: 'M88 / S38', periodo: '1978–1995', desc: 'Motores 6 cilindros de competição adaptados à rua, usados no superesportivo M1 e nos primeiros M5.' },
      { nome: 'M12/13 (F1 turbo)', periodo: '1982–1986', desc: 'Motor 1.5 turbo derivado do M10 que deu a Nelson Piquet o título mundial de 1983 — passava de 1.000 cv na classificação.' },
      { nome: 'M21 (primeiro diesel)', periodo: '1983–1991', desc: 'Estreia da BMW no diesel, com o 524td — na época, um dos dieséis de passeio mais rápidos do mundo.' },
      { nome: 'S14 (M3 E30)', periodo: '1986–1991', desc: 'Motor 4 cilindros de alta rotação do primeiro M3, desenvolvido para as corridas de turismo.' },
      { nome: 'M40 / M42 / M43 / M44', periodo: '1987–2001', desc: 'Geração de motores 4 cilindros das Séries 3 e 5 de entrada nos anos 90.' },
      { nome: 'M70 / M73 (V12)', periodo: '1987–2002', desc: 'Primeiro V12 da BMW, usado no 750i e no 850i — resposta alemã aos V12 italianos.' },
      { nome: 'M50 / M52 / M54', periodo: '1990–2006', desc: 'Geração de 6 cilindros em linha muito elogiada, usada nas Séries 3 e 5 dos anos 90 e 2000.' },
      { nome: 'M60 / M62 (V8)', periodo: '1992–2003', desc: 'Primeira geração moderna de V8 da BMW, usada na Série 5, 7 e X5 da época.' },
      { nome: 'S70/2 (V12)', periodo: '1993–1998', desc: 'V12 6.1 projetado pela BMW para o McLaren F1 — por muitos anos o carro de produção mais rápido do mundo.' },
      { nome: 'M57 (diesel)', periodo: '1998–2013', desc: '6 cilindros diesel muito respeitado pelo torque e pela durabilidade, usado nas Séries 3, 5, 7 e no X5.' },
      { nome: 'S54 (M3 E46)', periodo: '2000–2006', desc: '6 cilindros em linha 3.2 aspirado, considerado por muitos o melhor motor de M3 já feito.' },
      { nome: 'Série N', periodo: '2001–2015', desc: 'Motores modulares turbo (N54, N52, N20), que modernizaram a linha da marca.' },
      { nome: 'S85 (V10)', periodo: '2005–2010', desc: 'V10 5.0 inspirado na Fórmula 1, exclusivo do M5 E60 e do M6 — girava até 8.250 rpm.' },
      { nome: 'S65 (V8 4.0)', periodo: '2007–2013', desc: 'V8 4.0 aspirado que girava a 8.400 rpm, exclusivo do M3 E90/E92 — derivado do V10 do M5.' },
      { nome: 'N63 (V8 biturbo)', periodo: '2008–atual', desc: 'V8 4.4 biturbo com turbos no "vale" do V, usado nas Séries 5, 7, X5 e X6 de alto desempenho.' },
      { nome: 'N74 (V12 biturbo)', periodo: '2008–2023', desc: 'V12 6.0 biturbo do Série 7 de topo e também dos Rolls-Royce, marca que pertence à BMW.' },
      { nome: 'S63 (V8 biturbo M)', periodo: '2009–atual', desc: 'Versão de alta performance do V8 biturbo, usada nos M5, M8, X5 M e X6 M.' },
      { nome: 'eDrive (motores elétricos)', periodo: '2013–atual', desc: 'Linha elétrica iniciada com o inovador i3 de fibra de carbono, hoje nos i4, iX e i7.' },
      { nome: 'Série B (modular)', periodo: '2014–atual', desc: 'Arquitetura modular atual (B38, B48, B58) usada em toda a linha, de 3 a 6 cilindros.' },
      { nome: 'S58', periodo: '2019–atual', desc: '6 cilindros biturbo dos M3 e M4 atuais, com mais de 500 cv na versão Competition.' },
    ]
  },
  mercedes: {
    nome: 'Mercedes-Benz', logo: 'logos/mercedes.png', fundacao: 1926,
    motores: [
      { nome: 'Motor Benz Patent-Motorwagen', periodo: '1886', desc: 'Considerado o primeiro motor a combustão interna de um automóvel de produção da história, criado por Karl Benz.' },
      { nome: 'Motor Mercedes 35 HP', periodo: '1901–1905', desc: 'Motor avançado para a época que deu nome ao primeiro carro batizado de "Mercedes".' },
      { nome: 'OM138', periodo: '1936–1940', desc: 'Motor do Mercedes 260D: o primeiro carro de passeio a diesel produzido em série no mundo.' },
      { nome: 'Linha OM (diesel)', periodo: '1949–atual', desc: 'Tradicional família de motores diesel, muito usada em caminhões e utilitários Mercedes-Benz.' },
      { nome: 'M180 / M130 (6 em linha)', periodo: '1951–1976', desc: 'Seis cilindros que moveram os clássicos "Ponton", o W114 e o 280 SE por 25 anos.' },
      { nome: 'M186 / M198', periodo: '1951–1963', desc: 'Seis cilindros do 300 SL "asa de gaivota", primeiro carro de série da história com injeção direta de combustível.' },
      { nome: 'Motores de Fórmula 1', periodo: '1954–atual', desc: 'Da era de Fangio aos motores híbridos que dominaram a categoria a partir de 2014, com oito títulos seguidos de construtores.' },
      { nome: 'M100 (V8)', periodo: '1963–1981', desc: 'V8 6.3/6.9 do imponente 600 "Grosser" e do 300 SEL 6.3, o sedã mais rápido do mundo na sua época.' },
      { nome: 'Wankel do C111', periodo: '1969–1970', desc: 'Curiosidade: a Mercedes chegou a testar motores rotativos de 3 e 4 rotores no protótipo laranja C111.' },
      { nome: 'M117 (V8)', periodo: '1970–1991', desc: 'V8 clássico usado nos sedãs de luxo e nos esportivos SL da época.' },
      { nome: 'OM617 (5 cilindros diesel)', periodo: '1974–1991', desc: 'Diesel 5 cilindros lendário pela durabilidade — muitos passaram de um milhão de quilômetros rodados.' },
      { nome: 'M102 / M111', periodo: '1980–2000', desc: 'Motores 4 cilindros robustos usados nos sedãs de entrada da marca nos anos 80 e 90.' },
      { nome: 'M104', periodo: '1989–1999', desc: '6 cilindros em linha 3.0/3.2 muito durável, usado no W124 e nas primeiras Classe E.' },
      { nome: 'M119 (V8)', periodo: '1989–1999', desc: 'V8 4.2/5.0 do 500E, sedã desenvolvido e montado em parceria com a Porsche.' },
      { nome: 'M120 (V12)', periodo: '1991–2001', desc: 'V12 6.0 do topo de linha S600 e SL600; uma versão preparada pela AMG virou o coração do Pagani Zonda.' },
      { nome: 'OM606 (6 cil. diesel)', periodo: '1993–2001', desc: 'Diesel 3.0 lendário entre preparadores pela capacidade de aguentar pressões de turbo muito acima do projeto.' },
      { nome: 'M112 / M272 (V6)', periodo: '1997–2011', desc: 'Famílias de V6 que substituíram os 6 em linha nos modelos médios da marca.' },
      { nome: 'M113 (V8 5.0/5.5)', periodo: '1997–2011', desc: 'V8 de 5.0 e 5.5 litros; na versão supercharged do AMG 55K virou lenda de confiabilidade e torque.' },
      { nome: 'M275 / M279 (V12 biturbo)', periodo: '2002–2020', desc: 'V12 biturbo dos S600 e Maybach, com torque tão alto que precisava ser limitado eletronicamente.' },
      { nome: 'OM642 (V6 diesel)', periodo: '2005–atual', desc: 'V6 3.0 diesel usado na Sprinter, Classe E e ML — um dos dieséis mais difundidos da marca.' },
      { nome: 'M156 / M177 (AMG V8)', periodo: '2006–atual', desc: 'V8 de alta performance desenvolvido pela AMG, usado em C63, E63 e GT AMG.' },
      { nome: 'M270 / M274', periodo: '2012–atual', desc: 'Motores turbo 1.6/2.0 modernos usados na Classe A, C e GLA atuais.' },
      { nome: 'M133 / M139 (AMG 2.0)', periodo: '2013–atual', desc: 'Motor 2.0 turbo do A45 AMG: com mais de 400 cv, é o 4 cilindros de produção mais potente do mundo.' },
      { nome: 'M256', periodo: '2017–atual', desc: 'Motor 6 cilindros em linha com sistema elétrico de 48V, topo de linha da marca hoje.' },
      { nome: 'Motores elétricos EQ', periodo: '2019–atual', desc: 'Linha elétrica da marca, presente no EQS, EQE e nos novos SUVs elétricos.' },
    ]
  },
  audi: {
    nome: 'Audi', logo: 'logos/audi.png', fundacao: 1909,
    motores: [
      { nome: 'Motores pré-guerra Auto Union', periodo: '1932–1940', desc: 'Motores usados nos famosos "Silver Arrows" de corrida, quando a Audi fazia parte do consórcio Auto Union.' },
      { nome: 'EA827 (compartilhado com VW)', periodo: '1972–2000', desc: 'Base dos motores 1.8/2.0 usados nos primeiros Audi 80 e 100.' },
      { nome: '5 cilindros aspirado', periodo: '1976–1997', desc: 'O 5 cilindros do Audi 100 estreou uma arquitetura incomum que viraria assinatura sonora da marca.' },
      { nome: '5 cilindros turbo (Quattro)', periodo: '1980–1991', desc: 'Motor icônico do Audi Quattro original, símbolo da tração integral da marca.' },
      { nome: '5 cilindros do RS2', periodo: '1994–1995', desc: 'Motor 2.2 turbo de 315 cv do RS2 Avant, perua desenvolvida em parceria com a Porsche — a origem da linha RS.' },
      { nome: '1.8T (EA113)', periodo: '1994–2006', desc: 'Motor turbo que marcou época no A4 e no TT, muito popular entre entusiastas.' },
      { nome: 'TDI V6/V8', periodo: '1997–atual', desc: 'Linha diesel de alta performance usada nos modelos maiores da marca.' },
      { nome: '2.7T V6 biturbo', periodo: '1999–2005', desc: 'V6 2.7 biturbo do S4 e do RS4 B5, muito querido por entusiastas pelo potencial de preparação.' },
      { nome: 'W12', periodo: '2001–2018', desc: 'Motor de 12 cilindros em "W" do A8, o topo absoluto da linha de luxo da marca.' },
      { nome: 'Motores de Le Mans', periodo: '2006–2016', desc: 'Com o R10 TDI a Audi fez o primeiro diesel a vencer Le Mans (2006) e, com o R18 e-tron, o primeiro híbrido (2012).' },
      { nome: '4.2 FSI V8', periodo: '2006–2015', desc: 'V8 aspirado de alta rotação, usado no RS4 B7, no S5 e na versão V8 do superesportivo R8.' },
      { nome: '3.0 TFSI V6 (compressor)', periodo: '2008–2018', desc: 'V6 3.0 com compressor mecânico (não turbo), usado no S4, A6 e Q7 dessa geração.' },
      { nome: '5.0 TFSI V10 biturbo', periodo: '2008–2010', desc: 'V10 biturbo de mais de 570 cv, usado no RS6 C6 — um dos sedãs mais rápidos do mundo na época.' },
      { nome: '6.0 TDI V12', periodo: '2008–2012', desc: 'V12 diesel do Q7, herdeiro direto da tecnologia que venceu as 24 Horas de Le Mans com o R10 TDI.' },
      { nome: 'TFSI (EA888)', periodo: '2008–atual', desc: 'Motores turbo com injeção direta, usados no A3, A4 e Q3 atuais.' },
      { nome: '2.5 TFSI (5 cilindros)', periodo: '2009–atual', desc: '5 cilindros turbo do RS3 e do TT RS, eleito "Motor do Ano" na sua categoria várias vezes seguidas.' },
      { nome: '5.2 FSI V10', periodo: '2009–2015', desc: 'V10 aspirado compartilhado com a Lamborghini, usado no superesportivo R8.' },
      { nome: '4.0 TFSI V8 biturbo', periodo: '2012–atual', desc: 'V8 4.0 biturbo com até 600 cv: o motor do RS6 atual (C7/C8), do RS7, do S8 e também usado por Bentley e Porsche.' },
      { nome: '2.9 TFSI V6 biturbo', periodo: '2017–atual', desc: 'V6 2.9 biturbo de cerca de 450 cv, usado no RS4 e no RS5 atuais.' },
      { nome: 'Motores elétricos e-tron', periodo: '2018–atual', desc: 'Linha elétrica da marca, do e-tron original aos atuais Q6 e-tron e ao esportivo RS e-tron GT.' },
    ]
  },
  kia: {
    nome: 'Kia', logo: 'logos/kia.png', fundacao: 1944,
    motores: [
      { nome: 'Motores licenciados (Mazda/Ford)', periodo: '1974–1990', desc: 'A Kia começou fabricando peças e depois carros com motores licenciados de outras montadoras, antes de desenvolver os próprios.' },
      { nome: 'Theta (compartilhado c/ Hyundai)', periodo: '2005–atual', desc: 'Motores 2.0/2.4 usados em modelos maiores como Sportage e Sorento.' },
      { nome: 'Lambda (V6)', periodo: '2005–atual', desc: 'V6 3.3/3.8 usado no Sorento, Carnival e no esportivo Stinger GT.' },
      { nome: 'Gamma (compartilhado c/ Hyundai)', periodo: '2006–atual', desc: 'Motores 1.4/1.6 GDI de injeção direta, usados no Soluto e Bongo.' },
      { nome: 'Tau (V8)', periodo: '2008–2020', desc: 'V8 5.0 usado no sedã de luxo K900/Quoris, o modelo mais caro já vendido pela marca.' },
      { nome: 'R-series (diesel)', periodo: '2009–atual', desc: 'Motores diesel 2.0/2.2 usados no Sorento e Sportage em mercados que aceitam diesel.' },
      { nome: 'Nu', periodo: '2010–atual', desc: 'Motores 1.8/2.0 de porte médio, usados no Cerato e em versões do Sportage.' },
      { nome: 'Kappa', periodo: '2011–atual', desc: 'Motores 1.0 turbo e 1.2, usados no Picanto e em modelos compactos da marca.' },
      { nome: 'Smartstream', periodo: '2018–atual', desc: 'Geração mais recente e eficiente, presente nos modelos globais atuais da marca.' },
      { nome: 'Motores elétricos E-GMP', periodo: '2021–atual', desc: 'Plataforma elétrica compartilhada com a Hyundai, usada no EV6 e no EV9.' },
    ]
  },
  mitsubishi: {
    nome: 'Mitsubishi', logo: 'logos/mitsubishi.png', fundacao: 1917,
    motores: [
      { nome: 'Primeiro motor a combustão Mitsubishi', periodo: '1917', desc: 'Motor usado no Mitsubishi Model A, o primeiro automóvel de produção em série do Japão.' },
      { nome: 'Astron / Sirius', periodo: '1970–1990', desc: 'Motores 1.6 a 2.0 dos primeiros modelos exportados globalmente pela marca.' },
      { nome: 'Série 4G', periodo: '1980–2010', desc: 'Família muito conhecida, incluindo o lendário 4G63 do Lancer Evolution.' },
      { nome: 'Série 4D5 (diesel)', periodo: '1980–2007', desc: 'Motor diesel 2.5 (4D56) que equipou gerações da L200 e do Pajero, com fama de robusto.' },
      { nome: 'Motores de Dakar (Pajero)', periodo: '1985–2007', desc: 'Versões de competição que fizeram do Pajero o maior vencedor da história do Rali Dakar, com 12 títulos.' },
      { nome: '6G7 (V6)', periodo: '1986–2003', desc: 'V6 usado nos modelos maiores da marca, incluindo o Pajero e o Diamante.' },
      { nome: 'MIVEC', periodo: '1992–atual', desc: 'Tecnologia de variação de comando de válvulas usada nos motores atuais da marca, como no L200 e Outlander.' },
      { nome: '4M40 / 4M41 (diesel)', periodo: '1993–2015', desc: 'Motores diesel robustos que equiparam gerações do Pajero e da picape L200 no Brasil.' },
      { nome: 'Motores de rali (Lancer Evolution)', periodo: '1996–2005', desc: 'Versões de competição do 4G63 que deram a Tommi Mäkinen quatro títulos mundiais de rali seguidos.' },
      { nome: 'Série 4A9', periodo: '2004–2020', desc: 'Motores 1.3/1.5 compactos usados no Colt e no Mirage, focados em baixo consumo.' },
      { nome: 'Série 4B1', periodo: '2005–2017', desc: 'Motores 1.8/2.0/2.4 desenvolvidos em conjunto com outras montadoras, usados no Lancer e Outlander.' },
      { nome: 'Sistema PHEV', periodo: '2013–atual', desc: 'Híbrido plug-in do Outlander, um dos mais vendidos do mundo na categoria por vários anos.' },
      { nome: '4N15 (diesel)', periodo: '2015–atual', desc: 'Motor diesel 2.4 turbo atual da L200 Triton e do Pajero Sport.' },
    ]
  },
  porsche: {
    nome: 'Porsche', logo: 'logos/porsche.png', fundacao: 1931,
    motores: [
      { nome: 'Boxer 4 a ar (356)', periodo: '1948–1965', desc: 'Motor derivado do Fusca que deu origem à marca — Ferdinand Porsche havia projetado o próprio VW anos antes.' },
      { nome: 'Tipo 547 "Fuhrmann"', periodo: '1953–1965', desc: 'Boxer 4 com quatro árvores de cames, tão complexo que levava 15 horas só para ser sincronizado. Motor do 550 Spyder.' },
      { nome: 'Boxer 6 a ar (911)', periodo: '1963–1998', desc: 'O motor que definiu a marca: seis cilindros a ar montado atrás do eixo traseiro, produzido por 35 anos.' },
      { nome: 'Flat-12 do 917', periodo: '1969–1971', desc: 'Motor de 12 cilindros que deu à Porsche suas duas primeiras vitórias gerais em Le Mans.' },
      { nome: 'V8 do 928', periodo: '1977–1995', desc: 'V8 dianteiro refrigerado a água, criado para ser o sucessor do 911 — que acabou sobrevivendo a ele.' },
      { nome: '4 cilindros do 944/968', periodo: '1981–1995', desc: 'Motor de 4 cilindros com eixos de balanceamento, um dos maiores 4 cilindros já usados em carro de série.' },
      { nome: 'Boxer 6 a água (M96/M97)', periodo: '1996–2008', desc: 'A polêmica troca do ar pela água no 911, necessária para atender às normas de emissão e ruído.' },
      { nome: 'V8 biturbo (Cayenne/Panamera)', periodo: '2002–atual', desc: 'V8 dos modelos maiores, que financiou boa parte do desenvolvimento dos esportivos da marca.' },
      { nome: 'V10 do Carrera GT', periodo: '2003–2007', desc: 'V10 5.7 nascido de um projeto de Le Mans abortado, aproveitado no superesportivo Carrera GT.' },
      { nome: 'Boxer 6 (9A1)', periodo: '2008–atual', desc: 'Geração atual do boxer 6, com injeção direta e versões turbo que passam de 650 cv no 911 GT2 RS.' },
      { nome: 'Híbrido de Le Mans (919)', periodo: '2014–2017', desc: 'Conjunto híbrido do 919 que venceu Le Mans três vezes seguidas e levou tecnologia elétrica para a rua.' },
      { nome: 'Boxer 4 turbo (718)', periodo: '2016–atual', desc: 'Volta do boxer de 4 cilindros à linha esportiva, no Cayman e Boxster da geração 718.' },
      { nome: 'Motores elétricos (Taycan)', periodo: '2019–atual', desc: 'Primeiro elétrico da marca, com arquitetura de 800V que virou referência de recarga rápida na indústria.' },
    ]
  },
  lamborghini: {
    nome: 'Lamborghini', logo: 'logos/lamborghini.png', fundacao: 1963,
    motores: [
      { nome: 'V12 Bizzarrini', periodo: '1963–2010', desc: 'Projetado por Giotto Bizzarrini para o primeiro Lamborghini, sobreviveu 47 anos — do 350 GT ao Murciélago.' },
      { nome: 'V8 (Urraco/Jalpa)', periodo: '1970–1988', desc: 'V8 dos modelos de entrada, criados para brigar com o Porsche 911 em preço.' },
      { nome: 'V10 (Gallardo/Huracán)', periodo: '2003–atual', desc: 'V10 desenvolvido sob a Audi, que se tornou o motor mais vendido da história da marca.' },
      { nome: 'V12 L539 (Aventador)', periodo: '2011–2022', desc: 'Primeiro V12 totalmente novo em quase 50 anos, substituindo enfim o projeto de Bizzarrini.' },
      { nome: 'V8 biturbo (Urus)', periodo: '2018–atual', desc: 'V8 do SUV que se tornou o modelo mais vendido da marca e financiou a eletrificação.' },
      { nome: 'V12 híbrido (Revuelto)', periodo: '2023–atual', desc: 'V12 aspirado somado a três motores elétricos, chegando a mais de 1.000 cv combinados.' },
    ]
  },
  bentley: {
    nome: 'Bentley', logo: 'logos/bentley.png', fundacao: 1919,
    motores: [
      { nome: '3 Litre e 4½ Litre "Blower"', periodo: '1921–1931', desc: 'Motores dos Bentley que venceram Le Mans cinco vezes nos anos 1920 — o Blower usava compressor mecânico.' },
      { nome: 'V8 6.75', periodo: '1959–2020', desc: 'Um dos motores mais longevos da história automotiva: 61 anos em produção, sempre no topo de linha.' },
      { nome: 'W12 6.0', periodo: '2003–2024', desc: 'W12 biturbo do Continental GT, marco da retomada da marca sob o controle da Volkswagen.' },
      { nome: 'V8 4.0 biturbo', periodo: '2012–atual', desc: 'V8 compartilhado com Audi e Porsche, opção mais leve e eficiente frente ao W12.' },
      { nome: 'Híbrido plug-in', periodo: '2018–atual', desc: 'Conjunto V6 mais motor elétrico do Bentayga, primeiro passo da marca rumo à eletrificação.' },
    ]
  },
  bugatti: {
    nome: 'Bugatti', logo: 'logos/bugatti.png', fundacao: 1909,
    motores: [
      { nome: 'Motor do Type 35', periodo: '1924–1930', desc: 'Oito cilindros do carro de corrida mais vitorioso da história, com mais de 2.000 vitórias registradas.' },
      { nome: 'Motor do Type 41 Royale', periodo: '1926–1933', desc: 'Gigantesco 8 cilindros de 12,7 litros, feito para o carro mais luxuoso já concebido — só 6 unidades saíram.' },
      { nome: 'W16 8.0 quadriturbo', periodo: '2005–2024', desc: 'Motor de 16 cilindros e quatro turbos do Veyron e do Chiron, que levou carros de série a mais de 400 km/h.' },
      { nome: 'V16 híbrido (Tourbillon)', periodo: '2024–atual', desc: 'Sucessor do W16: um V16 aspirado somado a motores elétricos, anunciado para a nova era da marca.' },
    ]
  },
  skoda: {
    nome: 'Škoda', logo: 'logos/skoda.png', fundacao: 1895,
    motores: [
      { nome: 'Motores próprios tchecos', periodo: '1925–1991', desc: 'Antes da compra pela Volkswagen, a Škoda projetava os próprios motores, incluindo os traseiros do Estelle.' },
      { nome: 'Motores do Grupo VW', periodo: '1991–atual', desc: 'Após a aquisição, passou a usar as famílias EA111, EA211, EA888 e TDI compartilhadas com VW, Audi e SEAT.' },
      { nome: 'Motores elétricos MEB', periodo: '2020–atual', desc: 'Plataforma elétrica do grupo, usada na linha Enyaq.' },
    ]
  },
  seat: {
    nome: 'SEAT / Cupra', logo: 'logos/seat.png', fundacao: 1950,
    motores: [
      { nome: 'Motores licenciados Fiat', periodo: '1953–1986', desc: 'A SEAT nasceu montando Fiat sob licença na Espanha, usando os motores italianos da época.' },
      { nome: 'Motores do Grupo VW', periodo: '1986–atual', desc: 'Depois da compra pela Volkswagen, adotou as famílias TSI e TDI, com acertos mais esportivos na Cupra.' },
      { nome: 'Motores elétricos', periodo: '2021–atual', desc: 'Linha elétrica da Cupra, incluindo o Born, primo do VW ID.3.' },
    ]
  },
  mini: {
    nome: 'MINI', logo: 'logos/mini.png', fundacao: 1959,
    motores: [
      { nome: 'Motor A-Series', periodo: '1959–2000', desc: 'Motor transversal com câmbio no cárter do Mini original — solução que definiu o formato dos carros pequenos até hoje.' },
      { nome: 'Tritec', periodo: '2001–2006', desc: 'Motor do MINI moderno feito em parceria com a Chrysler, produzido no Brasil, em Campo Largo.' },
      { nome: 'Prince 1.6 (THP)', periodo: '2006–2016', desc: 'Motor turbo desenvolvido com a PSA, usado no Cooper S e também no Peugeot 208 GTi.' },
      { nome: 'Motores BMW (B38/B48)', periodo: '2014–atual', desc: 'Adoção dos motores modulares da controladora BMW, de 3 e 4 cilindros turbo.' },
      { nome: 'Motores elétricos', periodo: '2020–atual', desc: 'Linha elétrica do Cooper SE, parte do plano da marca de abandonar a combustão.' },
    ]
  },
  rollsroyce: {
    nome: 'Rolls-Royce', logo: 'logos/rolls-royce.png', fundacao: 1904,
    motores: [
      { nome: 'Motor do Silver Ghost', periodo: '1906–1926', desc: 'Seis cilindros tão silencioso e confiável que rendeu ao carro o apelido de "o melhor do mundo".' },
      { nome: 'V8 6.2/6.75', periodo: '1959–2020', desc: 'V8 de alumínio usado por seis décadas, com a potência historicamente descrita apenas como "suficiente".' },
      { nome: 'V12 BMW (N73/N74)', periodo: '2003–atual', desc: 'Depois da compra pela BMW, a marca passou a usar V12 biturbo derivados da Série 7.' },
      { nome: 'Motores elétricos (Spectre)', periodo: '2023–atual', desc: 'Primeiro Rolls-Royce elétrico — segundo a marca, o silêncio elétrico é o que ela sempre buscou.' },
    ]
  },
  smart: {
    nome: 'smart', logo: 'logos/smart.png', fundacao: 1994,
    motores: [
      { nome: '3 cilindros turbo (Suprex)', periodo: '1998–2014', desc: 'Motor de apenas 600 a 700 cc montado atrás, no carro urbano mais compacto vendido no Ocidente.' },
      { nome: '1.0 3 cilindros', periodo: '2007–2015', desc: 'Motor de origem Mitsubishi que substituiu o turbo minúsculo por mais cilindrada e menos complexidade.' },
      { nome: 'Motores elétricos', periodo: '2007–atual', desc: 'A smart foi uma das primeiras marcas a se tornar totalmente elétrica, hoje em parceria com a Geely.' },
    ]
  },
  citroen: {
    nome: 'Citroën', logo: 'logos/citroen.png', fundacao: 1919,
    motores: [
      { nome: 'Motor do Type A', periodo: '1919–1921', desc: 'Motor do primeiro carro europeu produzido em linha de montagem em massa, nos moldes de Henry Ford.' },
      { nome: 'Bicilíndrico a ar (2CV)', periodo: '1948–1990', desc: 'Motor de 2 cilindros refrigerado a ar do 2CV, projetado para ser barato, simples e durar décadas.' },
      { nome: 'Motores XU/TU', periodo: '1970–2010', desc: 'Famílias compartilhadas com a Peugeot dentro do grupo PSA, usadas em quase toda a linha.' },
      { nome: 'HDi (diesel)', periodo: '1998–2013', desc: 'Diesel common-rail que consolidou a fama de economia dos modelos franceses na Europa.' },
      { nome: 'PureTech', periodo: '2014–atual', desc: 'Motores turbo de 3 cilindros compartilhados com Peugeot, Opel e demais marcas da Stellantis.' },
      { nome: 'Motores elétricos', periodo: '2020–atual', desc: 'Linha ë-Citroën, incluindo o Ami, um quadriciclo elétrico urbano de baixo custo.' },
    ]
  },
  opel: {
    nome: 'Opel', logo: 'logos/opel.png', fundacao: 1899,
    motores: [
      { nome: 'Motores CIH', periodo: '1965–1995', desc: 'Os "cam-in-head" com comando no cabeçote, base direta dos motores 4 e 6 cilindros do Chevrolet Opala.' },
      { nome: 'Família I e Família II', periodo: '1979–2016', desc: 'Projetos alemães que a GM espalhou pelo mundo — no Brasil viraram os motores do Kadett, Monza e Vectra.' },
      { nome: 'Ecotec', periodo: '1999–2017', desc: 'Geração global de motores compactos, desenvolvida em grande parte na engenharia da Opel.' },
      { nome: 'Motores PSA/Stellantis', periodo: '2017–atual', desc: 'Após a venda pela GM, a marca passou a usar os PureTech e BlueHDi franceses.' },
      { nome: 'Motores elétricos', periodo: '2019–atual', desc: 'Linha elétrica compartilhada com Peugeot e Citroën dentro da Stellantis.' },
    ]
  },
  jeep: {
    nome: 'Jeep', logo: 'logos/jeep.png', fundacao: 1941,
    motores: [
      { nome: 'Go-Devil', periodo: '1941–1953', desc: 'Motor do Willys MB da Segunda Guerra — simples e resistente o bastante para rodar em qualquer condição.' },
      { nome: 'Hurricane', periodo: '1950–1971', desc: 'Evolução do Go-Devil com válvulas em "F", usado nos primeiros Jeep civis e na Rural brasileira.' },
      { nome: 'Tornado OHC', periodo: '1962–1975', desc: 'Seis cilindros com comando no cabeçote; no Brasil, virou o motor dos Ford Maverick e F-100 após a compra da Willys.' },
      { nome: 'AMC 4.0 (6 em linha)', periodo: '1986–2006', desc: 'Motor do Cherokee com fama quase mitológica de durabilidade entre os off-roaders.' },
      { nome: 'Pentastar V6', periodo: '2011–atual', desc: 'V6 3.6 da Stellantis, usado no Wrangler, Grand Cherokee e em quase toda a linha americana.' },
      { nome: '4xe (híbrido plug-in)', periodo: '2020–atual', desc: 'Sistema híbrido que deu ao Wrangler tração elétrica silenciosa para trilhas.' },
      { nome: 'Hurricane biturbo', periodo: '2021–atual', desc: 'Novo 6 cilindros em linha biturbo criado para substituir os V8 mantendo potência com menos consumo.' },
    ]
  },
  alfaromeo: {
    nome: 'Alfa Romeo', logo: 'logos/alfa-romeo.png', fundacao: 1910,
    motores: [
      { nome: 'Motores de competição iniciais', periodo: '1910–1950', desc: 'Motores que fizeram a Alfa vencer as duas primeiras temporadas da Fórmula 1, em 1950 e 1951.' },
      { nome: 'Twin Cam Alfa Romeo', periodo: '1954–1994', desc: 'Motor de duplo comando e bloco em alumínio, avançadíssimo para 1954 — ficou 40 anos em produção.' },
      { nome: 'Busso V6', periodo: '1979–2005', desc: 'V6 de Giuseppe Busso, considerado por muita gente o motor mais bonito de se ouvir já feito em série.' },
      { nome: 'JTD / Multijet', periodo: '1997–2020', desc: 'A Alfa foi pioneira no diesel common-rail de produção, tecnologia depois vendida para a Bosch.' },
      { nome: 'Motores Giorgio', periodo: '2016–atual', desc: 'Geração atual, cujo V6 biturbo do Giulia Quadrifoglio tem arquitetura derivada de um motor Ferrari.' },
    ]
  },
  maserati: {
    nome: 'Maserati', logo: 'logos/maserati.png', fundacao: 1914,
    motores: [
      { nome: 'Motores de corrida (250F)', periodo: '1926–1957', desc: 'Motores dos monopostos que deram a Juan Manuel Fangio o título mundial de Fórmula 1 em 1957.' },
      { nome: 'V8 Maserati', periodo: '1959–1990', desc: 'V8 de raiz de competição levado para os grand tourers de rua, como o Ghibli e o Bora.' },
      { nome: 'Biturbo V6', periodo: '1981–1998', desc: 'Motor do modelo que popularizou a marca — e também o que mais manchou sua reputação de confiabilidade.' },
      { nome: 'Motores Ferrari', periodo: '2001–2019', desc: 'Na fase sob controle da Ferrari, os V8 do Quattroporte e do GranTurismo saíam da fábrica de Maranello.' },
      { nome: 'Nettuno V6', periodo: '2020–atual', desc: 'Motor próprio de novo, com câmara de pré-combustão herdada da Fórmula 1 — 630 cv no MC20.' },
    ]
  },
  dodge: {
    nome: 'Dodge / RAM', logo: 'logos/dodge.png', fundacao: 1900,
    motores: [
      { nome: 'Hemi V8 (1ª geração)', periodo: '1951–1958', desc: 'O primeiro Hemi, com câmara hemisférica que rendia muito mais potência que os rivais da época.' },
      { nome: 'Slant-Six', periodo: '1959–2000', desc: 'Seis cilindros inclinado 30 graus, conhecido por ser praticamente impossível de quebrar.' },
      { nome: '426 Hemi', periodo: '1964–1971', desc: 'O "Elephant Engine" dos muscle cars, tão dominante nas corridas que chegou a ser banido da NASCAR.' },
      { nome: 'Cummins (diesel)', periodo: '1989–atual', desc: 'Parceria com a Cummins que transformou a picape RAM em referência de torque para trabalho pesado.' },
      { nome: 'Hemi moderno', periodo: '2003–atual', desc: 'Retomada do nome Hemi nos V8 5.7 e 6.4 do Challenger, Charger e RAM.' },
      { nome: 'Hellcat (supercharged)', periodo: '2015–2023', desc: 'V8 6.2 com compressor passando de 700 cv, num carro de série vendido em concessionária comum.' },
    ]
  },
  chrysler: {
    nome: 'Chrysler', logo: 'logos/chrysler.png', fundacao: 1925,
    motores: [
      { nome: 'FirePower Hemi', periodo: '1951–1958', desc: 'Primeira geração do Hemi, que colocou a Chrysler na disputa de potência com Ford e GM.' },
      { nome: 'Motores "B" e "RB"', periodo: '1958–1978', desc: 'Famílias de V8 de grande cilindrada que sustentaram os modelos de luxo e os muscle cars da marca.' },
      { nome: 'Motor 2.2 / 2.5', periodo: '1981–1995', desc: 'Motor de 4 cilindros dos compactos que salvaram a Chrysler da falência nos anos 80.' },
      { nome: 'Pentastar V6', periodo: '2011–atual', desc: 'V6 3.6 moderno, hoje espalhado por praticamente todas as marcas americanas da Stellantis.' },
    ]
  },
  lancia: {
    nome: 'Lancia', logo: 'logos/lancia.png', fundacao: 1906,
    motores: [
      { nome: 'V4 Lancia', periodo: '1922–1976', desc: 'Motor em V de ângulo muito estreito, solução pioneira que a Volkswagen retomaria décadas depois no VR6.' },
      { nome: 'V6 Lancia', periodo: '1950–1970', desc: 'O Lancia Aurelia trouxe o primeiro V6 de produção em série da história automotiva.' },
      { nome: 'Motor do 037 e do Delta S4', periodo: '1982–1986', desc: 'Motores do Grupo B — o Delta S4 usava turbo e compressor juntos para eliminar o atraso de resposta.' },
      { nome: 'Motor do Delta Integrale', periodo: '1987–1994', desc: 'Turbo que fez da Lancia a marca mais vitoriosa da história do rali, com seis títulos seguidos.' },
      { nome: 'Motores Fiat', periodo: '1990–atual', desc: 'Na fase final, a marca passou a usar as famílias FIRE e Multijet do grupo.' },
    ]
  },
  lexus: {
    nome: 'Lexus', logo: 'logos/lexus.png', fundacao: 1989,
    motores: [
      { nome: '1UZ-FE (V8)', periodo: '1989–2011', desc: 'V8 de estreia da marca no LS400, tão suave e silencioso que forçou Mercedes e BMW a reagirem.' },
      { nome: 'Híbridos', periodo: '2005–atual', desc: 'A Lexus foi a primeira marca de luxo a oferecer híbridos em toda a linha, com o RX 400h.' },
      { nome: 'Série GR (V6)', periodo: '2005–atual', desc: 'V6 3.5 compartilhado com a Toyota, usado em sedãs e SUVs médios da marca.' },
      { nome: '1LR-GUE (V10)', periodo: '2010–2012', desc: 'V10 do LFA, afinado com a Yamaha para produzir um dos sons mais elogiados da história.' },
      { nome: 'V35A-FTS (V6 biturbo)', periodo: '2017–atual', desc: 'V6 biturbo que assumiu o lugar dos V8 nos modelos de topo, com menos consumo e mais torque.' },
      { nome: 'Motores elétricos', periodo: '2022–atual', desc: 'Linha elétrica da marca, iniciada com o RZ sobre a mesma base do Toyota bZ.' },
    ]
  },
  daihatsu: {
    nome: 'Daihatsu', logo: 'logos/daihatsu.png', fundacao: 1907,
    motores: [
      { nome: 'Motores de kei car', periodo: '1960–atual', desc: 'Especialista em motores minúsculos de 550 a 660 cc, limitados por lei na categoria japonesa kei.' },
      { nome: 'Série K (3 cilindros)', periodo: '1977–atual', desc: 'Família de 3 cilindros de 1.0 a 1.3, usada no Charade e exportada para vários mercados.' },
      { nome: 'Kei turbo', periodo: '1980–2000', desc: 'Versões turbinadas que extraíam mais de 60 cv de apenas 660 cc, no auge da disputa entre marcas japonesas.' },
    ]
  },
  genesis: {
    nome: 'Genesis', logo: 'logos/genesis.png', fundacao: 2015,
    motores: [
      { nome: 'Tau (V8)', periodo: '2015–2020', desc: 'V8 5.0 herdado da Hyundai, usado no sedã de topo para brigar com alemães e japoneses.' },
      { nome: 'Lambda V6 biturbo', periodo: '2016–atual', desc: 'V6 3.3 biturbo do G70 e G80, o motor esportivo de referência da marca.' },
      { nome: 'Smartstream', periodo: '2019–atual', desc: 'Motores 2.0 e 2.5 turbo modernos, compartilhados com Hyundai e Kia.' },
      { nome: 'Motores elétricos E-GMP', periodo: '2021–atual', desc: 'Linha elétrica sobre a plataforma de 800V do grupo, no GV60 e no Electrified G80.' },
    ]
  },
  dacia: {
    nome: 'Dacia', logo: 'logos/dacia.png', fundacao: 1966,
    motores: [
      { nome: 'Motores Renault licenciados', periodo: '1968–1999', desc: 'A Dacia nasceu produzindo o Renault 12 na Romênia, com os motores Cléon franceses.' },
      { nome: 'K7M / K4M', periodo: '2004–2019', desc: 'Motores 1.6 do Logan e do Sandero originais, escolhidos justamente por serem simples e baratos de manter.' },
      { nome: 'TCe / SCe', periodo: '2015–atual', desc: 'Motores turbo e aspirados atuais da Renault, incluindo versões bicombustíveis a GLP na Europa.' },
    ]
  },
  alpine: {
    nome: 'Alpine', logo: 'logos/alpine.png', fundacao: 1955,
    motores: [
      { nome: 'Motores Renault preparados', periodo: '1955–1977', desc: 'Motores Renault retrabalhados que levaram o A110 original ao título mundial de rali em 1973.' },
      { nome: 'PRV V6 turbo', periodo: '1985–1995', desc: 'V6 turbo do A610, versão mais potente do motor desenvolvido com Peugeot e Volvo.' },
      { nome: '1.8 turbo', periodo: '2017–atual', desc: 'Motor do novo A110, que aposta em leveza extrema em vez de potência bruta.' },
      { nome: 'Motores elétricos', periodo: '2024–atual', desc: 'Virada elétrica da marca, começando pelo A290, versão esportiva do Renault 5 elétrico.' },
    ]
  },
  infiniti: {
    nome: 'Infiniti', logo: 'logos/infiniti.png', fundacao: 1989,
    motores: [
      { nome: 'VH45DE (V8)', periodo: '1989–1996', desc: 'V8 4.5 de estreia da marca no Q45, criado para enfrentar o Lexus LS400 no mercado americano.' },
      { nome: 'Série VQ (V6)', periodo: '1994–atual', desc: 'V6 da Nissan que figurou por 14 anos seguidos na lista dos melhores motores do mundo.' },
      { nome: 'VR30DDTT (V6 biturbo)', periodo: '2016–atual', desc: 'V6 3.0 biturbo de até 400 cv, motor esportivo dos sedãs e cupês atuais.' },
      { nome: 'VC-Turbo', periodo: '2018–atual', desc: 'A Infiniti estreou o primeiro motor de série do mundo com taxa de compressão variável.' },
    ]
  },
  cadillac: {
    nome: 'Cadillac', logo: 'logos/cadillac.png', fundacao: 1902,
    motores: [
      { nome: 'Motor monocilíndrico original', periodo: '1902–1908', desc: 'Motor de um cilindro que ficou famoso pela precisão das peças — as primeiras verdadeiramente intercambiáveis.' },
      { nome: 'V8 Type 51', periodo: '1914–1927', desc: 'Primeiro V8 produzido em massa do mundo, que estabeleceu o padrão de refinamento do automóvel de luxo.' },
      { nome: 'V16', periodo: '1930–1940', desc: 'Único V16 de produção em série da história americana, símbolo máximo de ostentação antes da guerra.' },
      { nome: 'Northstar V8', periodo: '1993–2011', desc: 'V8 de duplo comando com que a marca tentou recuperar prestígio técnico frente aos alemães.' },
      { nome: 'Blackwing V8 biturbo', periodo: '2019–2020', desc: 'V8 4.2 biturbo feito à mão, produzido por pouquíssimo tempo — hoje é item de colecionador.' },
      { nome: 'Motores elétricos Ultium', periodo: '2022–atual', desc: 'A Cadillac foi escolhida pela GM para liderar a transição elétrica, com o Lyriq e o Celestiq.' },
    ]
  },
  buick: {
    nome: 'Buick', logo: 'logos/buick.png', fundacao: 1899,
    motores: [
      { nome: 'Motor "valve-in-head"', periodo: '1904–1930', desc: 'A Buick foi pioneira nas válvulas no cabeçote, arquitetura que praticamente toda a indústria adotaria.' },
      { nome: 'Nailhead V8', periodo: '1953–1966', desc: 'V8 de válvulas pequenas e verticais, cultuado pelo torque em baixa rotação.' },
      { nome: 'V6 3800', periodo: '1962–2008', desc: 'Um dos motores mais produzidos da história americana, com fama de rodar quase sem manutenção.' },
      { nome: 'Motores globais GM', periodo: '2009–atual', desc: 'Hoje a marca usa as famílias Ecotec e turbo da GM, com forte presença no mercado chinês.' },
    ]
  },
  gmc: {
    nome: 'GMC', logo: 'logos/gmc.png', fundacao: 1911,
    motores: [
      { nome: 'Motores próprios de caminhão', periodo: '1911–1960', desc: 'Nas primeiras décadas, a GMC desenvolvia motores específicos para uso comercial pesado.' },
      { nome: 'Small Block e Big Block', periodo: '1960–2017', desc: 'Adoção dos V8 da Chevrolet nas picapes e utilitários, diferenciando-se apenas no acabamento.' },
      { nome: 'Duramax (diesel)', periodo: '2001–atual', desc: 'Diesel de trabalho pesado das picapes Sierra, compartilhado com a Chevrolet Silverado.' },
      { nome: 'Motores elétricos Ultium', periodo: '2022–atual', desc: 'Plataforma elétrica do Hummer EV, que entrega mais de 1.000 cv numa picape.' },
    ]
  },
  lincoln: {
    nome: 'Lincoln', logo: 'logos/lincoln.png', fundacao: 1917,
    motores: [
      { nome: 'V8 Lincoln', periodo: '1920–1932', desc: 'V8 de alta qualidade projetado por Henry Leland, o mesmo engenheiro que havia fundado a Cadillac.' },
      { nome: 'V12 Zephyr', periodo: '1936–1948', desc: 'V12 que tornou o luxo de 12 cilindros acessível a mais gente, num período raro da indústria.' },
      { nome: 'Modular V8', periodo: '1991–2020', desc: 'V8 compartilhado com a Ford, usado no Town Car e no Navigator por três décadas.' },
      { nome: 'EcoBoost V6', periodo: '2010–atual', desc: 'V6 biturbo que substituiu os V8 nos modelos de topo, com mais torque e menos consumo.' },
    ]
  },
  acura: {
    nome: 'Acura', logo: 'logos/acura.png', fundacao: 1986,
    motores: [
      { nome: 'C30A (V6 do NSX)', periodo: '1990–2005', desc: 'V6 com VTEC e bielas de titânio do NSX, projeto que teve Ayrton Senna como consultor de acerto.' },
      { nome: 'Série J (V6)', periodo: '1996–atual', desc: 'V6 usado nos sedãs e SUVs da marca, com desativação de cilindros para economizar combustível.' },
      { nome: 'SH-AWD híbrido', periodo: '2013–atual', desc: 'Sistema que usa motores elétricos nas rodas traseiras para direcionar torque nas curvas.' },
      { nome: 'V6 biturbo híbrido (NSX)', periodo: '2016–2022', desc: 'Conjunto do NSX moderno, somando V6 biturbo e três motores elétricos.' },
    ]
  },
  jaguar: {
    nome: 'Jaguar', logo: 'logos/jaguar.png', fundacao: 1922,
    motores: [
      { nome: 'XK6', periodo: '1949–1992', desc: 'Seis cilindros de duplo comando que venceu Le Mans cinco vezes e ficou 43 anos em produção.' },
      { nome: 'V12', periodo: '1971–1997', desc: 'Primeiro V12 de produção em série do pós-guerra, criado para o E-Type e depois para o XJ.' },
      { nome: 'AJ-V8', periodo: '1996–2020', desc: 'V8 próprio da marca, com versões supercharged de mais de 550 cv nos modelos R.' },
      { nome: 'Ingenium', periodo: '2015–atual', desc: 'Família modular de 4 e 6 cilindros projetada junto com a Land Rover sob controle da Tata.' },
      { nome: 'Motores elétricos', periodo: '2018–atual', desc: 'O I-Pace foi um dos primeiros elétricos premium a chegar antes dos rivais alemães.' },
    ]
  },
  landrover: {
    nome: 'Land Rover', logo: 'logos/land-rover.png', fundacao: 1948,
    motores: [
      { nome: 'Motor do Series I', periodo: '1948–1958', desc: 'Motor 1.6 do utilitário original, projetado para funcionar com combustível de baixa qualidade no pós-guerra.' },
      { nome: 'V8 Rover (ex-Buick)', periodo: '1967–2004', desc: 'V8 de alumínio comprado da GM que virou lenda britânica e sustentou o Range Rover por décadas.' },
      { nome: 'Td5', periodo: '1998–2006', desc: 'Diesel de 5 cilindros do Defender, último motor próprio da marca antes da era Ford.' },
      { nome: 'AJ-V8 supercharged', periodo: '2005–2020', desc: 'V8 com compressor herdado da Jaguar, que deu ao Range Rover desempenho de esportivo.' },
      { nome: 'Ingenium', periodo: '2015–atual', desc: 'Família modular atual, com versões diesel, gasolina e híbridas de 4 e 6 cilindros.' },
      { nome: 'Híbridos plug-in e elétricos', periodo: '2018–atual', desc: 'Eletrificação da linha, incluindo versões P400e e os primeiros modelos totalmente elétricos.' },
    ]
  },
  volvo: {
    nome: 'Volvo', logo: 'logos/volvo.png', fundacao: 1927,
    motores: [
      { nome: 'Motor do ÖV4', periodo: '1927–1929', desc: 'Motor 4 cilindros do primeiro Volvo, projetado para aguentar as estradas ruins da Suécia.' },
      { nome: 'B18 / B20', periodo: '1961–1974', desc: 'Motor do P1800 de Irv Gordon, que rodou mais de 5 milhões de quilômetros — recorde mundial.' },
      { nome: 'Red Block', periodo: '1974–1998', desc: 'Família de 4 cilindros com fama de indestrutível, marca registrada dos Volvo quadrados dos anos 80.' },
      { nome: 'Motores modulares (5 e 6 cilindros)', periodo: '1990–2016', desc: 'Os 5 cilindros em linha que deram aos Volvo um ronco característico, inclusive nas versões turbo R.' },
      { nome: 'Drive-E', periodo: '2013–atual', desc: 'Decisão radical: toda a linha passou a usar apenas motores 2.0 de 4 cilindros, com turbo e compressor.' },
      { nome: 'Motores elétricos', periodo: '2019–atual', desc: 'Sob controle da Geely, a marca assumiu a meta de se tornar totalmente elétrica.' },
    ]
  },
  polestar: {
    nome: 'Polestar', logo: 'logos/polestar.png', fundacao: 2017,
    motores: [
      { nome: 'Híbrido do Polestar 1', periodo: '2019–2022', desc: 'Conjunto híbrido plug-in de mais de 600 cv, no cupê que marcou a separação da marca da Volvo.' },
      { nome: 'Motores elétricos', periodo: '2020–atual', desc: 'Linha totalmente elétrica derivada da engenharia Volvo, com foco em desempenho.' },
    ]
  },
  lotus: {
    nome: 'Lotus', logo: 'logos/lotus.png', fundacao: 1948,
    motores: [
      { nome: 'Lotus-Ford Twin Cam', periodo: '1962–1975', desc: 'Cabeçote de duplo comando da Lotus sobre bloco Ford — combinação que dominou as corridas de turismo.' },
      { nome: 'Lotus 900 Series', periodo: '1972–1996', desc: 'Motor 16 válvulas próprio do Esprit, também vendido para outras montadoras como a Chrysler.' },
      { nome: 'Motores Toyota', periodo: '1996–2021', desc: 'Elise e Exige usavam motores Toyota — a filosofia da marca sempre foi leveza, não potência.' },
      { nome: 'Motores elétricos', periodo: '2020–atual', desc: 'Virada elétrica com o Evija, hipercarro de quase 2.000 cv, e o SUV Eletre.' },
      { nome: 'V6 supercharged (Emira)', periodo: '2021–atual', desc: 'Último motor a combustão da marca, no Emira, encerrando 70 anos de esportivos a gasolina.' },
    ]
  },
  ferrari: {
    nome: 'Ferrari', logo: 'logos/ferrari.png', fundacao: 1947,
    motores: [
      { nome: 'Colombo V12', periodo: '1947–1988', desc: 'O V12 fundador da marca, projetado por Gioacchino Colombo — base de quase tudo por quatro décadas.' },
      { nome: 'Lampredi V12', periodo: '1950–1959', desc: 'V12 maior criado para a Fórmula 1, que rendeu à Ferrari suas primeiras vitórias sobre a Alfa Romeo.' },
      { nome: 'Dino V6', periodo: '1957–1974', desc: 'V6 batizado em homenagem ao filho de Enzo Ferrari, também produzido pela Fiat para homologação.' },
      { nome: 'Flat-12 (Boxer)', periodo: '1973–1996', desc: 'Motor de 12 cilindros opostos do Berlinetta Boxer e do Testarossa, montado bem baixo para melhorar o centro de gravidade.' },
      { nome: 'V8 biturbo do F40', periodo: '1987–1992', desc: 'Motor do último carro aprovado por Enzo Ferrari, e o primeiro de série a passar de 320 km/h.' },
      { nome: 'V12 F140', periodo: '2002–atual', desc: 'V12 dos modelos de topo, do Enzo ao 812 — um dos últimos grandes V12 aspirados em produção.' },
      { nome: 'V8 F154 biturbo', periodo: '2013–atual', desc: 'V8 turbo eleito "Motor Internacional do Ano" várias vezes seguidas, usado do 488 ao 296.' },
      { nome: 'Híbrido do SF90', periodo: '2019–atual', desc: 'V8 somado a três motores elétricos, passando de 1.000 cv — primeiro híbrido plug-in de série da marca.' },
    ]
  },
  mazda: {
    nome: 'Mazda', logo: 'logos/mazda.png', fundacao: 1920,
    motores: [
      { nome: 'Motores de kei car', periodo: '1960–1975', desc: 'Motores pequenos dos primeiros automóveis da marca, ainda voltados ao mercado interno japonês.' },
      { nome: 'Wankel rotativo', periodo: '1967–2012', desc: 'A Mazda foi a única marca a fazer o motor rotativo funcionar em série, resolvendo o desgaste das pontas do rotor.' },
      { nome: 'Série B (MX-5)', periodo: '1989–2015', desc: 'Motores 1.6/1.8 do Miata, o roadster mais vendido da história, com foco em leveza e giro alto.' },
      { nome: 'Rotativo do 787B', periodo: '1990–1991', desc: 'Motor de 4 rotores que fez a Mazda vencer Le Mans em 1991 — única vitória japonesa até 2018 e única com rotativo.' },
      { nome: 'SkyActiv-G', periodo: '2011–atual', desc: 'Motores com taxa de compressão altíssima para aspirados, buscando eficiência sem recorrer ao turbo.' },
      { nome: 'SkyActiv-X', periodo: '2019–atual', desc: 'Primeiro motor de série do mundo a usar ignição por compressão controlada em um motor a gasolina.' },
      { nome: 'Rotativo como gerador', periodo: '2023–atual', desc: 'O rotativo voltou no MX-30 R-EV, agora apenas gerando energia para o motor elétrico.' },
    ]
  },
  suzuki: {
    nome: 'Suzuki', logo: 'logos/suzuki.png', fundacao: 1909,
    motores: [
      { nome: 'Motores de kei car', periodo: '1955–atual', desc: 'A Suzuki construiu sua identidade em motores minúsculos e eficientes para a categoria kei japonesa.' },
      { nome: 'Série F / G', periodo: '1977–2010', desc: 'Motores 1.0 a 1.6 do Swift, Samurai e Vitara, feitos para serem leves e simples de manter.' },
      { nome: 'Série K', periodo: '2005–atual', desc: 'Família atual de 3 e 4 cilindros, usada no Swift, Jimny e Vitara.' },
      { nome: 'Híbrido leve (SHVS)', periodo: '2015–atual', desc: 'Sistema híbrido simples e barato, escolhido em vez da eletrificação completa por questão de custo.' },
    ]
  },
  tesla: {
    nome: 'Tesla', logo: 'logos/tesla.png', fundacao: 2003,
    motores: [
      { nome: 'Motor de indução AC', periodo: '2008–2019', desc: 'Motor de indução do Roadster e do Model S, tecnologia inspirada nas patentes de Nikola Tesla.' },
      { nome: 'Motor de ímãs permanentes', periodo: '2017–atual', desc: 'Estreou no Model 3 e é mais eficiente em uso urbano, virando o padrão da marca.' },
      { nome: 'Plaid (três motores)', periodo: '2021–atual', desc: 'Conjunto de três motores elétricos que leva um sedã grande de 0 a 100 km/h em menos de 2,1 segundos.' },
    ]
  },
  byd: {
    nome: 'BYD', logo: 'logos/byd.png', fundacao: 2003,
    motores: [
      { nome: 'Motores elétricos', periodo: '2008–atual', desc: 'A BYD começou fabricando baterias e virou a maior fabricante de carros elétricos do mundo.' },
      { nome: 'DM-i (híbrido)', periodo: '2020–atual', desc: 'Sistema híbrido em que o motor a combustão opera quase sempre como gerador, buscando consumo mínimo.' },
      { nome: 'e-Platform 3.0', periodo: '2021–atual', desc: 'Plataforma elétrica com bateria estrutural Blade, que dispensa o formato tradicional de células.' },
    ]
  },
};

// =========================================
// VARIANTES — motor por motor dentro de cada família
// chave: 'idDaMarca|Nome exato da família'
// =========================================
const variantes = {

  // ---------- VOLKSWAGEN ----------
  'volkswagen|EA111': [
    { nome: '1.0 8V MPI', periodo: '1999–2010', desc: 'Motor 1.0 de 8 válvulas do Gol G3 e G4, com cerca de 76 cv na gasolina.' },
    { nome: '1.0 16V', periodo: '1997–2005', desc: 'Versão de 16 válvulas com até 76 cv, mais giradora e usada no Gol 16V e no Polo Classic.' },
    { nome: '1.0 16V Turbo', periodo: '2001–2005', desc: 'O 1.0 turbo do Gol Turbo e do Polo, com 112 cv — um dos primeiros turbos populares do Brasil.' },
    { nome: '1.4 8V', periodo: '2005–2013', desc: 'Motor 1.4 Total Flex de 80 cv, usado em Gol, Parati e Saveiro.' },
    { nome: '1.6 8V "Power"', periodo: '2001–2013', desc: 'O popular 1.6 Total Flex de até 104 cv, presente em quase toda a linha VW da época.' },
    { nome: '1.6 16V', periodo: '1998–2005', desc: 'Versão 16 válvulas de 1.6 usada no Golf e no Polo importados.' },
    { nome: '1.4 TSI Twincharger', periodo: '2005–2015', desc: 'Motor 1.4 com turbo e compressor juntos, chegando a 180 cv no Golf GT.' },
  ],
  'volkswagen|EA827 (motor AP)': [
    { nome: 'AP 1.6', periodo: '1985–2000', desc: 'Versão 1.6 do AP, usada em Gol, Voyage, Parati e Santana de entrada.' },
    { nome: 'AP 1.8', periodo: '1984–2005', desc: 'O 1.8 que virou sinônimo de AP, com versões a álcool e gasolina de até 99 cv.' },
    { nome: 'AP 2.0 8V', periodo: '1989–2006', desc: 'Versão 2.0 de 8 válvulas, muito usada no Santana, Quantum e na Kombi.' },
    { nome: 'AP 2.0 16V', periodo: '1997–2002', desc: 'Cabeçote de 16 válvulas que levou o AP a 145 cv no Golf GTI nacional.' },
    { nome: 'AP 1.8 Turbo', periodo: '1997–2005', desc: 'Versão turbinada de fábrica do Santana e do Golf, queridinha dos preparadores.' },
  ],
  'volkswagen|EA211': [
    { nome: '1.0 MPI 3 cilindros', periodo: '2014–atual', desc: 'Motor 1.0 aspirado de 3 cilindros e 84 cv, usado em Up!, Gol e Polo de entrada.' },
    { nome: '1.0 TSI (200 TSI)', periodo: '2017–atual', desc: 'Turbo de 3 cilindros com 128 cv, motor de maior volume da VW no Brasil hoje.' },
    { nome: '1.4 TSI (250 TSI)', periodo: '2013–2021', desc: 'Turbo de 4 cilindros e 150 cv, usado em Jetta, Golf e Tiguan.' },
    { nome: '1.6 MSI', periodo: '2014–2022', desc: 'Motor 1.6 aspirado de injeção indireta, de 110 cv, presente em Gol, Voyage e Saveiro.' },
    { nome: '1.5 TSI Evo', periodo: '2017–atual', desc: 'Evolução com ciclo Miller e turbo de geometria variável, com até 150 cv.' },
  ],
  'volkswagen|EA888': [
    { nome: 'Geração 1 (2.0 TSI)', periodo: '2007–2011', desc: 'Primeira geração de 200 a 211 cv, no Golf GTI Mk6 e no Jetta.' },
    { nome: 'Geração 2', periodo: '2008–2014', desc: 'Revisão focada em resolver o alto consumo de óleo da primeira geração.' },
    { nome: 'Geração 3', periodo: '2012–2020', desc: 'Ganhou injeção dupla e chegou a 310 cv no Golf R — a mais usada da família.' },
    { nome: 'Geração 4 (evo4)', periodo: '2019–atual', desc: 'Versão atual do Golf GTI e do Tiguan R, com até 320 cv.' },
  ],
  'volkswagen|Boxer a ar 1.3/1.5/1.6': [
    { nome: '1200 (1.2)', periodo: '1960–1986', desc: 'O clássico "1200" do Fusca, com cerca de 36 cv — o mais vendido de todos.' },
    { nome: '1300 (1.3)', periodo: '1965–1986', desc: 'Versão intermediária de 46 cv, muito usada no Fusca brasileiro.' },
    { nome: '1500 (1.5)', periodo: '1966–1975', desc: 'Motor de 52 cv que equipou o Fusca 1500 e as primeiras Variant.' },
    { nome: '1600 (1.6)', periodo: '1970–2006', desc: 'O maior da linha a ar, usado no Fusca 1600, Brasília, Kombi e Variant até 2006.' },
  ],
  'volkswagen|TDI': [
    { nome: '1.9 TDI', periodo: '1991–2010', desc: 'O TDI que ficou famoso pela economia, com versões de 90 a 160 cv.' },
    { nome: '2.0 TDI', periodo: '2003–atual', desc: 'Sucessor do 1.9, usado em quase toda a linha europeia e na Amarok.' },
    { nome: '3.0 V6 TDI', periodo: '2004–atual', desc: 'V6 diesel dos modelos maiores, com até 258 cv na Amarok V6.' },
  ],
  'volkswagen|VR6': [
    { nome: '2.8 VR6', periodo: '1991–2004', desc: 'O VR6 original de 174 cv, usado no Golf VR6 e no Passat.' },
    { nome: '2.9 VR6', periodo: '1994–1997', desc: 'Versão de 190 cv com comando revisado, no Golf VR6 Syncro.' },
    { nome: '3.2 VR6', periodo: '2002–2010', desc: 'Motor de 241 cv do Golf R32, um dos mais cultuados da marca.' },
    { nome: '3.6 FSI', periodo: '2005–2016', desc: 'Última evolução, com injeção direta e 280 cv, no Passat CC e no Touareg.' },
  ],

  // ---------- CHEVROLET ----------
  'chevrolet|Família I': [
    { nome: '1.0 8V', periodo: '1994–2001', desc: 'Motor do Corsa Wind, com 54 a 60 cv — o popular mais vendido da GM na época.' },
    { nome: '1.0 16V', periodo: '1998–2002', desc: 'Versão de 16 válvulas com 70 cv, no Corsa Sedan e no Celta.' },
    { nome: '1.4 8V', periodo: '1989–1996', desc: 'Motor de entrada do Kadett e do Ipanema.' },
    { nome: '1.6 8V', periodo: '1989–2001', desc: 'Versão 1.6 do Kadett, Ipanema e Corsa GSi.' },
    { nome: '1.6 16V', periodo: '1996–2002', desc: 'Motor de 16 válvulas e 106 cv do Corsa GSi e do Tigra.' },
  ],
  'chevrolet|Família II': [
    { nome: '1.8 8V', periodo: '1993–2005', desc: 'Motor de entrada do Monza, Astra e Vectra, com cerca de 110 cv.' },
    { nome: '2.0 8V', periodo: '1993–2011', desc: 'O 2.0 mais comum, usado em Vectra, Astra, S10 e Blazer.' },
    { nome: '2.0 16V', periodo: '1994–2002', desc: 'Versão de 16 válvulas com até 136 cv, no Vectra GSi e no Astra GLS.' },
    { nome: '2.2 8V', periodo: '1997–2011', desc: 'Motor 2.2 do Vectra, S10 e Zafira, com bom torque em baixa.' },
    { nome: '2.4 16V Flexpower', periodo: '2005–2012', desc: 'Última evolução, com 147 cv bicombustível no Vectra e na Zafira.' },
  ],
  'chevrolet|Ecotec (Família E)': [
    { nome: '1.0 8V (VHC/VHC-E)', periodo: '2000–2015', desc: 'Motor do Celta, Corsa e Classic, projetado para ser barato de manter.' },
    { nome: '1.4 8V (Econo.Flex)', periodo: '2007–2019', desc: 'Motor de 106 cv do Onix, Prisma, Cobalt e Spin — um dos mais vendidos do Brasil.' },
    { nome: '1.8 8V', periodo: '2009–2019', desc: 'Versão maior usada em Cobalt, Spin e Cruze de entrada.' },
    { nome: '1.4 Turbo', periodo: '2011–2021', desc: 'Turbo de 153 cv do Cruze e do Tracker, primeira aposta turbo da GM no Brasil.' },
  ],
  'chevrolet|LS (Small Block Gen III/IV)': [
    { nome: 'LS1 5.7', periodo: '1997–2004', desc: 'O primeiro LS, com 350 cv no Corvette C5 e no Camaro da época.' },
    { nome: 'LS6 5.7', periodo: '2001–2005', desc: 'Versão de 405 cv do Corvette Z06, com comando e cabeçotes mais agressivos.' },
    { nome: 'LS2 6.0', periodo: '2005–2009', desc: 'Aumento para 6.0 litros e 400 cv no Corvette C6.' },
    { nome: 'LS3 6.2', periodo: '2008–2017', desc: 'Um dos mais populares em preparações, com 430 cv de fábrica.' },
    { nome: 'LS7 7.0', periodo: '2006–2013', desc: 'V8 de 7.0 litros e 505 cv, montado à mão para o Corvette Z06.' },
    { nome: 'LS9 6.2 supercharged', periodo: '2009–2013', desc: 'Com compressor, entregava 638 cv no Corvette ZR1.' },
  ],
  'chevrolet|Motor Opala (reto 4 e 6)': [
    { nome: '2.5 4 cilindros', periodo: '1969–1990', desc: 'Motor de 4 cilindros de entrada do Opala e da Caravan.' },
    { nome: '3.8 6 cilindros', periodo: '1968–1979', desc: 'O 6 cilindros original do Opala, com cerca de 125 cv.' },
    { nome: '4.1 6 cilindros', periodo: '1975–1992', desc: 'Versão maior de 4.1 litros, a mais desejada da linha Opala.' },
    { nome: '4.1S', periodo: '1980–1988', desc: 'Versão de alto desempenho com carburador duplo, chegando a 171 cv.' },
  ],

  // ---------- FIAT ----------
  'fiat|FIRE': [
    { nome: '1.0 8V', periodo: '1999–2015', desc: 'Motor do Uno Mille, Palio e Siena, com cerca de 66 cv — ícone dos populares.' },
    { nome: '1.0 16V', periodo: '2000–2005', desc: 'Versão de 16 válvulas com 70 cv, no Palio e no Punto de entrada.' },
    { nome: '1.3 16V', periodo: '2001–2010', desc: 'Motor de 80 cv usado no Palio, Idea e Punto.' },
    { nome: '1.4 8V EVO', periodo: '2010–2021', desc: 'Evolução com 88 cv, presente em Uno, Palio, Grand Siena e Strada.' },
    { nome: '1.4 16V', periodo: '2003–2012', desc: 'Versão 16 válvulas do 1.4, usada no Punto e no Linea.' },
  ],
  'fiat|Firefly': [
    { nome: '1.0 3 cilindros', periodo: '2016–atual', desc: 'Motor aspirado de 77 cv do Mobi, Argo e Uno — o de entrada da linha.' },
    { nome: '1.3 4 cilindros', periodo: '2018–atual', desc: 'Aspirado de 109 cv usado em Argo, Cronos e Pulse.' },
    { nome: '1.0 Turbo (T200)', periodo: '2021–atual', desc: 'Turbo de 3 cilindros e 130 cv do Pulse, Fastback e Argo.' },
    { nome: '1.3 Turbo (T270)', periodo: '2021–atual', desc: 'Turbo de 185 cv das versões de topo do Pulse Abarth e do Toro.' },
  ],
  'fiat|E.torQ': [
    { nome: '1.6 16V', periodo: '2012–2020', desc: 'Motor de 117 cv do Punto, Linea, Argo e Cronos.' },
    { nome: '1.8 16V', periodo: '2010–2020', desc: 'Versão de 132 cv usada no Freemont, Toro e Renegade.' },
    { nome: '2.0 16V', periodo: '2011–2018', desc: 'A maior da família, com 167 cv no Bravo e no Freemont.' },
  ],

  // ---------- FORD ----------
  'ford|Zetec-Rocam': [
    { nome: '1.0 8V Zetec Rocam', periodo: '1999–2013', desc: 'Motor do Ka e do Fiesta 1.0, com 65 a 73 cv.' },
    { nome: '1.6 8V Zetec Rocam', periodo: '1999–2014', desc: 'O 1.6 do Fiesta, Ka e EcoSport, com até 106 cv no flex.' },
    { nome: '1.6 Zetec RoCam Flex', periodo: '2004–2014', desc: 'Versão bicombustível, muito usada em táxis pela simplicidade mecânica.' },
    { nome: '1.8 Zetec', periodo: '1997–2004', desc: 'Versão maior usada no Focus e no Escort da época.' },
  ],
  'ford|Duratec': [
    { nome: '1.6 16V Ti-VCT', periodo: '2008–2019', desc: 'Motor de 130 cv do Focus, Fiesta e EcoSport.' },
    { nome: '2.0 16V', periodo: '1998–2019', desc: 'O 2.0 do Focus, Fusion e EcoSport, com cerca de 148 cv.' },
    { nome: '2.5 20V (5 cilindros)', periodo: '2005–2018', desc: 'Motor de 5 cilindros do Focus e do Fusion, com até 175 cv.' },
    { nome: '3.0 V6', periodo: '1996–2008', desc: 'V6 usado no Mondeo e no Fusion importado.' },
  ],
  'ford|EcoBoost': [
    { nome: '1.0 3 cilindros', periodo: '2012–atual', desc: 'Motor eleito "Motor do Ano" várias vezes, com até 125 cv no Focus e no EcoSport.' },
    { nome: '1.5', periodo: '2013–atual', desc: 'Versão de 4 cilindros e 180 cv, usada no Focus e no Fusion.' },
    { nome: '2.0', periodo: '2010–atual', desc: 'Turbo de 240 a 253 cv do Focus ST, Fusion e Ranger.' },
    { nome: '2.3', periodo: '2015–atual', desc: 'Motor de 310 a 350 cv do Mustang EcoBoost e do Focus RS.' },
    { nome: '3.5 V6', periodo: '2009–atual', desc: 'V6 biturbo de até 450 cv da F-150 Raptor e do Ford GT.' },
  ],
  'ford|Coyote 5.0 V8': [
    { nome: 'Geração 1', periodo: '2011–2014', desc: 'Estreia com 412 cv no Mustang GT, retomando o nome "5.0".' },
    { nome: 'Geração 2', periodo: '2015–2017', desc: 'Cabeçotes revisados e 435 cv no Mustang da sexta geração.' },
    { nome: 'Geração 3', periodo: '2018–2023', desc: 'Ganhou injeção dupla e subiu para 460 cv.' },
    { nome: 'Geração 4', periodo: '2024–atual', desc: 'Versão atual do Mustang com admissão dupla, chegando a 500 cv na Dark Horse.' },
  ],
  'ford|Windsor V8 (incl. 302 / "5.0")': [
    { nome: '221 (3.6)', periodo: '1962–1963', desc: 'O primeiro Windsor, criado para ser um V8 leve e compacto.' },
    { nome: '289 (4.7)', periodo: '1963–1968', desc: 'Motor do Mustang original e dos Shelby GT350.' },
    { nome: '302 / 5.0', periodo: '1968–2001', desc: 'O mais famoso da família: virou o "5.0" dos Mustang dos anos 80 e 90.' },
    { nome: '351W (5.8)', periodo: '1969–1996', desc: 'Versão de curso maior, muito usada em picapes e preparações.' },
  ],

  // ---------- TOYOTA ----------
  'toyota|Série JZ (1JZ / 2JZ)': [
    { nome: '1JZ-GE', periodo: '1990–2007', desc: 'Versão aspirada de 2.5 litros, usada em sedãs japoneses como o Mark II.' },
    { nome: '1JZ-GTE', periodo: '1991–2007', desc: 'Versão turbinada de 2.5 com até 280 cv, popular em preparações no Japão.' },
    { nome: '2JZ-GE', periodo: '1991–2005', desc: 'Aspirado de 3.0 litros do Supra base e do Lexus IS300.' },
    { nome: '2JZ-GTE', periodo: '1991–2002', desc: 'O lendário biturbo do Supra: bloco de ferro tão forte que aguenta mais de 1.000 cv.' },
  ],
  'toyota|Série UZ (V8)': [
    { nome: '1UZ-FE 4.0', periodo: '1989–2002', desc: 'V8 de estreia do Lexus LS400, tão suave que a demonstração usava taças empilhadas sobre o motor.' },
    { nome: '2UZ-FE 4.7', periodo: '1998–2011', desc: 'Versão de bloco em ferro para o Land Cruiser e a Tundra, feita para trabalho pesado.' },
    { nome: '3UZ-FE 4.3', periodo: '2000–2010', desc: 'Versão de 4.3 litros usada nos Lexus GS430 e SC430.' },
  ],
  'toyota|Série ZZ': [
    { nome: '1ZZ-FE 1.8', periodo: '1998–2007', desc: 'Motor 1.8 do Corolla que equipou milhões de unidades no mundo todo.' },
    { nome: '3ZZ-FE 1.6', periodo: '2000–2007', desc: 'Versão 1.6 vendida principalmente na Europa e na Ásia.' },
  ],
  'toyota|Série NZ': [
    { nome: '1NZ-FE 1.5', periodo: '1997–atual', desc: 'Motor 1.5 do Yaris, Etios e Corolla asiático, com fama de econômico.' },
    { nome: '2NZ-FE 1.3', periodo: '1999–2015', desc: 'Versão 1.3 para os modelos de entrada em mercados emergentes.' },
    { nome: '1NZ-FXE (híbrido)', periodo: '1997–2015', desc: 'Versão de ciclo Atkinson criada especificamente para o Prius.' },
  ],
  'toyota|Série GR (V6)': [
    { nome: '1GR-FE 4.0', periodo: '2002–atual', desc: 'V6 4.0 da Hilux, SW4 e Land Cruiser Prado.' },
    { nome: '2GR-FE 3.5', periodo: '2005–atual', desc: 'V6 3.5 do Camry, RAV4 e Lexus RX — um dos V6 mais premiados da indústria.' },
    { nome: '4GR-FSE 2.5', periodo: '2003–2015', desc: 'Versão menor com injeção direta, usada nos Lexus IS250 e GS250.' },
  ],
  'toyota|Série KD (diesel)': [
    { nome: '2KD-FTV 2.5', periodo: '2001–2015', desc: 'Diesel 2.5 da Hilux brasileira, com 102 a 144 cv.' },
    { nome: '1KD-FTV 3.0', periodo: '2000–2015', desc: 'Diesel 3.0 da Hilux e do SW4, com até 171 cv e muito torque.' },
  ],

  // ---------- HONDA ----------
  'honda|B-series (VTEC)': [
    { nome: 'B16A', periodo: '1989–2000', desc: 'O 1.6 VTEC que chegou a 160 cv aspirado — mais de 100 cv por litro, façanha rara na época.' },
    { nome: 'B16B', periodo: '1997–2000', desc: 'Versão do Civic Type R japonês, com 185 cv e curso maior.' },
    { nome: 'B18C', periodo: '1994–2001', desc: 'Motor 1.8 do Integra Type R, com 200 cv e cabeçote trabalhado à mão.' },
    { nome: 'B20B', periodo: '1996–2001', desc: 'Versão 2.0 sem VTEC do CR-V, popular em preparações pelo bloco maior.' },
  ],
  'honda|D-series': [
    { nome: 'D15B', periodo: '1984–2005', desc: 'Motor 1.5 dos Civic mais econômicos, incluindo versões VTEC-E.' },
    { nome: 'D16A / D16Y8', periodo: '1986–2005', desc: 'Motor 1.6 do Civic EX, com 127 cv na versão VTEC.' },
    { nome: 'D17A', periodo: '2001–2005', desc: 'Última geração da família, usada no Civic de sétima geração.' },
  ],
  'honda|K-series': [
    { nome: 'K20A', periodo: '2001–2011', desc: 'O 2.0 do Civic Type R japonês, com 220 cv girando até 8.600 rpm.' },
    { nome: 'K20A2 / K20Z', periodo: '2002–2011', desc: 'Versões do Integra Type R e do Civic Si vendidos fora do Japão.' },
    { nome: 'K24A / K24Z', periodo: '2002–2017', desc: 'Motor 2.4 do Accord e do CR-V, muito usado em conversões por ter mais torque.' },
    { nome: 'K20C1 (turbo)', periodo: '2015–atual', desc: 'Turbo de 306 a 320 cv do Civic Type R moderno.' },
  ],
  'honda|L-series': [
    { nome: 'L15A', periodo: '2001–2014', desc: 'Motor 1.5 do Fit e do City, com i-VTEC e foco em economia.' },
    { nome: 'L18A', periodo: '2006–2012', desc: 'Versão 1.8 usada no Civic de oitava geração no Brasil.' },
    { nome: 'L15B7 (turbo)', periodo: '2016–atual', desc: 'Turbo de 173 a 182 cv do Civic e do HR-V atuais.' },
  ],

  // ---------- NISSAN ----------
  'nissan|Série RB': [
    { nome: 'RB20DET', periodo: '1985–1993', desc: 'Turbo de 2.0 litros do Skyline R31 e R32 de entrada.' },
    { nome: 'RB25DET', periodo: '1991–2002', desc: 'Turbo 2.5 do Skyline R33 e R34, com cerca de 250 cv.' },
    { nome: 'RB26DETT', periodo: '1989–2002', desc: 'O lendário biturbo 2.6 do Skyline GT-R, declarado com 280 cv por acordo entre montadoras japonesas.' },
    { nome: 'RB30', periodo: '1985–1990', desc: 'Versão 3.0 aspirada, muito usada como base para preparações de alta potência.' },
  ],
  'nissan|Série VQ': [
    { nome: 'VQ30DE', periodo: '1994–2004', desc: 'V6 3.0 de estreia da família, no Maxima e no Infiniti I30.' },
    { nome: 'VQ35DE', periodo: '2000–2020', desc: 'V6 3.5 do 350Z e do Altima, um dos mais produzidos da marca.' },
    { nome: 'VQ37VHR', periodo: '2007–2020', desc: 'V6 3.7 com comando de perfil variável, com até 355 cv no 370Z.' },
  ],

  // ---------- BMW ----------
  'bmw|M50 / M52 / M54': [
    { nome: 'M50B20 / M50B25', periodo: '1990–1996', desc: 'Primeiros 6 cilindros da família, de 2.0 e 2.5 litros, com comando variável VANOS.' },
    { nome: 'M52B28', periodo: '1995–2000', desc: 'Motor 2.8 do 328i, considerado um dos mais equilibrados da marca.' },
    { nome: 'M54B30', periodo: '2000–2006', desc: 'O 3.0 de 231 cv do 330i e do Z4, último grande 6 cilindros aspirado da BMW.' },
  ],
  'bmw|Série N': [
    { nome: 'N52B30', periodo: '2004–2015', desc: 'Aspirado de 3.0 com bloco em magnésio, usado no 330i e no Z4.' },
    { nome: 'N54B30', periodo: '2006–2016', desc: 'Primeiro 6 cilindros biturbo moderno da marca, adorado por preparadores.' },
    { nome: 'N55B30', periodo: '2009–2017', desc: 'Sucessor com um único turbo twin-scroll, mais confiável que o N54.' },
    { nome: 'N20B20', periodo: '2011–2017', desc: 'Turbo de 4 cilindros que substituiu os 6 em linha nos modelos de entrada.' },
  ],
  'bmw|Série B (modular)': [
    { nome: 'B38 (3 cilindros)', periodo: '2014–atual', desc: 'Motor 1.5 de 3 cilindros do Série 1, do MINI e dos híbridos da marca.' },
    { nome: 'B48 (4 cilindros)', periodo: '2014–atual', desc: 'Turbo 2.0 de 184 a 306 cv, o mais usado em toda a linha atual.' },
    { nome: 'B58 (6 cilindros)', periodo: '2015–atual', desc: 'Turbo 3.0 do M340i e do Toyota Supra, muito elogiado pela suavidade e potencial.' },
  ],

  // ---------- MERCEDES-BENZ ----------
  'mercedes|M113 (V8 5.0/5.5)': [
    { nome: 'M113.940 (4.3)', periodo: '1997–2005', desc: 'Versão de 4.3 litros e 279 cv, usada nas Classe E e S de entrada.' },
    { nome: 'M113.960 (5.0)', periodo: '1998–2006', desc: 'V8 5.0 de 306 cv, o mais comum da família nos modelos de topo.' },
    { nome: 'M113.981 (5.5 AMG)', periodo: '1999–2006', desc: 'Versão AMG aspirada de 5.5 litros e 360 cv.' },
    { nome: 'M113.990 (5.4 Kompressor)', periodo: '2002–2011', desc: 'O famoso "55K" com compressor, de 476 a 517 cv — lenda de confiabilidade entre os AMG.' },
  ],
  'mercedes|M104': [
    { nome: 'M104.900 (3.0)', periodo: '1989–1997', desc: 'Seis cilindros 3.0 de 24 válvulas do W124 e do 300E.' },
    { nome: 'M104.941 (3.2)', periodo: '1992–1999', desc: 'Versão 3.2 de 220 cv, usada na Classe E e na Classe S.' },
    { nome: 'M104.980 (3.6 AMG)', periodo: '1993–1995', desc: 'Preparação AMG de 3.6 litros e 272 cv, feita em pequena série.' },
  ],
  'mercedes|M156 / M177 (AMG V8)': [
    { nome: 'M156 (6.2 aspirado)', periodo: '2006–2015', desc: 'V8 6.2 de 457 a 510 cv, o último grande V8 AMG aspirado — famoso pelo som.' },
    { nome: 'M157 (5.5 biturbo)', periodo: '2010–2019', desc: 'Substituiu o M156 com biturbo, entregando até 585 cv com menos consumo.' },
    { nome: 'M177 / M178 (4.0 biturbo)', periodo: '2014–atual', desc: 'V8 4.0 com turbos no "vale" do V, do C63 e do AMG GT, com até 639 cv.' },
  ],

  // ---------- AUDI ----------
  'audi|1.8T (EA113)': [
    { nome: '150 cv', periodo: '1994–2005', desc: 'Versão de entrada do A4 e do A3, com turbo pequeno e boa resposta.' },
    { nome: '180 cv', periodo: '1997–2005', desc: 'A mais comum, usada no A4, A3 e TT com 5 válvulas por cilindro.' },
    { nome: '225 cv', periodo: '1998–2006', desc: 'Versão do TT quattro e do S3, com turbo maior e intercooler reforçado.' },
    { nome: '240 cv', periodo: '2003–2005', desc: 'A mais potente de fábrica, exclusiva do Audi TT quattro Sport.' },
  ],
  'audi|2.5 TFSI (5 cilindros)': [
    { nome: '340 cv (RS3 8P)', periodo: '2011–2013', desc: 'Primeira geração do 5 cilindros moderno, no RS3 Sportback.' },
    { nome: '367 cv (RS3 8V)', periodo: '2015–2017', desc: 'Ganhou potência e ficou mais leve com bloco em alumínio.' },
    { nome: '400 cv (RS3 8Y)', periodo: '2017–atual', desc: 'Versão atual do RS3 e do TT RS, com ordem de ignição irregular que gera o som característico.' },
  ],
  'audi|4.0 TFSI V8 biturbo': [
    { nome: '520–560 cv (S8/S6)', periodo: '2012–atual', desc: 'Versão dos modelos S, focada em torque e uso diário.' },
    { nome: '560–605 cv (RS6 C7)', periodo: '2013–2018', desc: 'Versão do RS6 Avant e do RS7, incluindo o pacote Performance.' },
    { nome: '600 cv (RS6 C8)', periodo: '2019–atual', desc: 'Geração atual do RS6 e do RS7, agora com sistema de 48V.' },
  ],

  // ---------- PORSCHE ----------
  'porsche|Boxer 6 a ar (911)': [
    { nome: '2.0 (901)', periodo: '1963–1969', desc: 'O boxer 6 original do 911, com 130 cv.' },
    { nome: '2.7', periodo: '1973–1977', desc: 'Motor do lendário Carrera RS 2.7, um dos 911 mais valorizados de todos.' },
    { nome: '3.2 (Carrera)', periodo: '1984–1989', desc: 'Motor do 911 Carrera 3.2, considerado o mais confiável dos refrigerados a ar.' },
    { nome: '3.6 (964/993)', periodo: '1989–1998', desc: 'Última evolução do boxer a ar, encerrando 35 anos dessa arquitetura.' },
  ],
  'porsche|Boxer 6 (9A1)': [
    { nome: '3.4 aspirado', periodo: '2008–2016', desc: 'Motor do 911 Carrera de entrada e do Cayman S.' },
    { nome: '3.8 aspirado', periodo: '2008–2019', desc: 'Versão do Carrera S e do GT3, girando até 9.000 rpm.' },
    { nome: '3.0 biturbo', periodo: '2016–atual', desc: 'Turbo que substituiu os aspirados no 911 Carrera atual.' },
    { nome: '4.0 aspirado (GT3)', periodo: '2017–atual', desc: 'Último 911 aspirado, com 510 cv e giro até 9.000 rpm.' },
  ],

  // ---------- RENAULT ----------
  'renault|K4M / K7M': [
    { nome: 'K7M 1.6 8V', periodo: '2000–2016', desc: 'Motor 1.6 de 8 válvulas do Logan e Sandero, simples e barato de manter.' },
    { nome: 'K4M 1.6 16V', periodo: '2001–2020', desc: 'Versão de 16 válvulas com até 118 cv, usada no Duster, Fluence e Sandero.' },
  ],
  'renault|Energy (SCe/TCe)': [
    { nome: '1.0 SCe 3 cilindros', periodo: '2015–atual', desc: 'Aspirado de 82 cv do Kwid e do Sandero de entrada.' },
    { nome: '1.0 TCe turbo', periodo: '2019–atual', desc: 'Turbo de 3 cilindros e 120 cv, no Sandero, Logan e Duster.' },
    { nome: '1.3 TCe', periodo: '2018–atual', desc: 'Turbo de 4 cilindros e até 170 cv, desenvolvido com a Mercedes-Benz.' },
  ],

  // ---------- HYUNDAI ----------
  'hyundai|Kappa': [
    { nome: '1.0 3 cilindros', periodo: '2012–atual', desc: 'Motor de 80 cv do HB20 e do Atos, com bom desempenho no etanol.' },
    { nome: '1.0 T-GDi turbo', periodo: '2019–atual', desc: 'Turbo de 120 cv do HB20 e do Creta, com injeção direta.' },
    { nome: '1.2', periodo: '2011–atual', desc: 'Versão de 4 cilindros usada no HB20 e no i10 europeu.' },
  ],
  'hyundai|Gamma': [
    { nome: '1.6 MPI', periodo: '2010–atual', desc: 'Motor 1.6 de injeção indireta do HB20S, Creta e Kia Cerato.' },
    { nome: '1.6 GDI', periodo: '2010–atual', desc: 'Versão com injeção direta e mais potência, usada no Elantra e no Veloster.' },
    { nome: '1.6 T-GDi', periodo: '2011–atual', desc: 'Turbo de 177 a 204 cv do Veloster Turbo e do Kia Seltos.' },
  ],
};

// =========================================
// GRUPOS AUTOMOTIVOS — quem é dono de quem
// =========================================
const grupos = {
  vw: {
    nome: 'Grupo Volkswagen', logo: 'logos/volkswagen.png', sede: 'Alemanha', fundacao: 1937,
    resumo: 'O maior conglomerado automotivo da Europa: reúne desde carros populares até hipercarros, compartilhando plataformas e motores entre todas as marcas.',
    marcas: ['volkswagen','audi','porsche','lamborghini','bentley','bugatti','skoda','seat']
  },
  bmw: {
    nome: 'Grupo BMW', logo: 'logos/bmw.png', sede: 'Alemanha', fundacao: 1916,
    resumo: 'Grupo alemão que vai do compacto MINI ao luxo absoluto da Rolls-Royce, usando motores modulares BMW em quase toda a linha.',
    marcas: ['bmw','mini','rollsroyce']
  },
  mercedes: {
    nome: 'Grupo Mercedes-Benz', logo: 'logos/mercedes.png', sede: 'Alemanha', fundacao: 1926,
    resumo: 'Herdeiro direto dos inventores do automóvel, com a divisão esportiva AMG e o urbano smart, hoje em parceria com a chinesa Geely.',
    marcas: ['mercedes','smart']
  },
  stellantis: {
    nome: 'Stellantis', logo: 'logos/fiat.png', sede: 'Holanda / Itália / França', fundacao: 2021,
    resumo: 'Nasceu da fusão entre a FCA (Fiat Chrysler) e o Grupo PSA (Peugeot Citroën). É o grupo com mais marcas do mundo, somando 14 nomes.',
    marcas: ['fiat','peugeot','citroen','opel','jeep','alfaromeo','maserati','dodge','chrysler','lancia']
  },
  toyota: {
    nome: 'Grupo Toyota', logo: 'logos/toyota.png', sede: 'Japão', fundacao: 1937,
    resumo: 'A maior montadora do mundo em volume, pioneira nos híbridos e dona da Lexus, sua marca de luxo, e da Daihatsu, especialista em carros mínimos.',
    marcas: ['toyota','lexus','daihatsu']
  },
  hyundai: {
    nome: 'Grupo Hyundai', logo: 'logos/hyundai.png', sede: 'Coreia do Sul', fundacao: 1967,
    resumo: 'Grupo coreano que cresceu de motores licenciados para líder em elétricos de 800V, com a Kia e a marca de luxo Genesis.',
    marcas: ['hyundai','kia','genesis']
  },
  alianca: {
    nome: 'Aliança Renault-Nissan-Mitsubishi', logo: 'logos/renault.png', sede: 'França / Japão', fundacao: 1999,
    resumo: 'Não é uma fusão, e sim uma aliança com participações cruzadas — as três marcas dividem plataformas e motores mantendo independência.',
    marcas: ['renault','nissan','mitsubishi','dacia','alpine','infiniti']
  },
  gm: {
    nome: 'General Motors', logo: 'logos/chevrolet.png', sede: 'Estados Unidos', fundacao: 1908,
    resumo: 'Foi por décadas a maior montadora do mundo. Hoje concentra suas marcas nos Estados Unidos e na China, apostando na plataforma elétrica Ultium.',
    marcas: ['chevrolet','cadillac','buick','gmc']
  },
  ford: {
    nome: 'Ford Motor Company', logo: 'logos/ford.png', sede: 'Estados Unidos', fundacao: 1903,
    resumo: 'A empresa que inventou a linha de montagem em massa. Diferente das rivais, manteve poucas marcas: a Ford e a Lincoln, de luxo.',
    marcas: ['ford','lincoln']
  },
  honda: {
    nome: 'Honda Motor', logo: 'logos/honda.png', sede: 'Japão', fundacao: 1948,
    resumo: 'Independente de qualquer grupo, mantém tradição em motores de alta rotação e usa a Acura como marca premium fora do Japão.',
    marcas: ['honda','acura']
  },
  tata: {
    nome: 'Tata Motors (JLR)', logo: 'logos/jaguar.png', sede: 'Índia / Reino Unido', fundacao: 1945,
    resumo: 'O grupo indiano Tata comprou a Jaguar e a Land Rover da Ford em 2008 e reergueu as duas marcas britânicas.',
    marcas: ['jaguar','landrover']
  },
  geely: {
    nome: 'Geely', logo: 'logos/volvo.png', sede: 'China / Suécia', fundacao: 1986,
    resumo: 'Grupo chinês que comprou a Volvo da Ford em 2010 e desde então acumulou Lotus, Polestar e metade da smart.',
    marcas: ['volvo','polestar','lotus']
  },
  independentes: {
    nome: 'Independentes', logo: 'logos/ferrari.png', sede: 'Vários países', fundacao: 1920,
    resumo: 'Marcas que não pertencem a nenhum grande conglomerado — algumas por tradição, outras por terem nascido fora da indústria tradicional.',
    marcas: ['ferrari','mazda','suzuki','tesla','byd']
  },
};

// Ordem de exibição no grid de grupos
const ordemGrupos = ['vw','stellantis','toyota','gm','hyundai','alianca','bmw','mercedes','ford','honda','tata','geely','independentes'];

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

// =========================================
// MOTORES POR MARCA — grid + modal
// =========================================
const gruposGrid = document.getElementById('grupos-grid');

// guarda de onde viemos, para os botões "voltar"
let grupoAtual = null;
let marcaAtual = null;

function totalMotoresDoGrupo(g) {
  return g.marcas.reduce((soma, id) => soma + (marcas[id] ? marcas[id].motores.length : 0), 0);
}

if (gruposGrid) {
  gruposGrid.innerHTML = ordemGrupos.map(id => {
    const g = grupos[id];
    return `
      <button type="button" class="grupo-card" data-grupo="${id}">
        <img class="grupo-card__icon" src="${g.logo}" alt="" loading="lazy" />
        <span class="grupo-card__nome">${g.nome}</span>
        <span class="grupo-card__sede">${g.sede}</span>
        <span class="grupo-card__qtd">${g.marcas.length} marcas · ${totalMotoresDoGrupo(g)} motores</span>
      </button>
    `;
  }).join('');

  gruposGrid.addEventListener('click', e => {
    const btn = e.target.closest('[data-grupo]');
    if (!btn) return;
    abrirModalGrupo(btn.dataset.grupo);
  });
}

// clique nas marcas dentro do modal do grupo, e no botão voltar
if (modalContent) {
  modalContent.addEventListener('click', e => {
    const btnMarca = e.target.closest('[data-marca]');
    if (btnMarca) { abrirModalMarca(btnMarca.dataset.marca); return; }
    const btnFamilia = e.target.closest('[data-familia]');
    if (btnFamilia) { abrirModalFamilia(btnFamilia.dataset.familia); return; }
    const btnVoltar = e.target.closest('[data-voltar]');
    if (btnVoltar) abrirModalGrupo(btnVoltar.dataset.voltar);
    const btnVoltarMarca = e.target.closest('[data-voltar-marca]');
    if (btnVoltarMarca) abrirModalMarca(btnVoltarMarca.dataset.voltarMarca);
  });
}

function mostrarModal() {
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const modal = overlay.querySelector('.modal');
  if (modal) modal.scrollTop = 0;
  modalClose.focus();
}

// NÍVEL 2 — marcas do grupo
function abrirModalGrupo(id) {
  const g = grupos[id];
  if (!g) return;
  grupoAtual = id;

  const marcasHtml = g.marcas.map(mid => {
    const m = marcas[mid];
    if (!m) return '';
    return `
      <button type="button" class="marca-card" data-marca="${mid}">
        <img class="marca-card__icon" src="${m.logo}" alt="Logo ${m.nome}" loading="lazy" />
        <span class="marca-card__nome">${m.nome}</span>
        <span class="marca-card__ano">Desde ${m.fundacao}</span>
        <span class="marca-card__qtd">${m.motores.length} motores</span>
      </button>
    `;
  }).join('');

  modalContent.innerHTML = `
    <img src="${g.logo}" alt="" class="modal__marca-logo" />
    <span class="modal__cat">Desde ${g.fundacao} · ${g.sede}</span>
    <h2>${g.nome}</h2>
    <p style="color:var(--gray);margin:.5rem 0 1.5rem;">${g.resumo}</p>
    <h3 style="margin-bottom:1rem;">Marcas do grupo</h3>
    <div class="modal__marcas-grid">${marcasHtml}</div>
  `;
  mostrarModal();
}

// NÍVEL 3 — famílias de motor da marca
function abrirModalMarca(id) {
  const m = marcas[id];
  if (!m) return;
  marcaAtual = id;

  const motoresHtml = m.motores.map((mo, i) => {
    const vs = variantes[id + '|' + mo.nome];
    if (vs) {
      return `
        <button type="button" class="motor-item motor-item--tem-lista" data-familia="${i}">
          <span class="motor-item__nome">${mo.nome}</span><span class="motor-item__periodo">${mo.periodo}</span>
          <p>${mo.desc}</p>
          <span class="motor-item__ver">Ver os ${vs.length} motores desta família →</span>
        </button>
      `;
    }
    return `
      <div class="motor-item">
        <span class="motor-item__nome">${mo.nome}</span><span class="motor-item__periodo">${mo.periodo}</span>
        <p>${mo.desc}</p>
      </div>
    `;
  }).join('');

  const detalhadas = m.motores.filter(mo => variantes[id + '|' + mo.nome]).length;
  const aviso = detalhadas
    ? `As famílias marcadas em vermelho já podem ser abertas motor por motor (${detalhadas} de ${m.motores.length}).`
    : `O detalhamento motor por motor desta marca ainda não foi feito.`;

  const voltar = grupoAtual
    ? `<button type="button" class="modal__voltar" data-voltar="${grupoAtual}">← ${grupos[grupoAtual].nome}</button>`
    : '';

  modalContent.innerHTML = `
    ${voltar}
    <img src="${m.logo}" alt="Logo ${m.nome}" class="modal__marca-logo" />
    <span class="modal__cat">Desde ${m.fundacao}</span>
    <h2>Motores ${m.nome}</h2>
    <p style="color:var(--gray);margin:.5rem 0 1.25rem;">Famílias de motor em ordem cronológica. ${aviso}</p>
    ${motoresHtml}
  `;
  mostrarModal();
}

// NÍVEL 4 — motor por motor dentro da família
function abrirModalFamilia(indice) {
  const m = marcas[marcaAtual];
  if (!m) return;
  const familia = m.motores[Number(indice)];
  if (!familia) return;
  const vs = variantes[marcaAtual + '|' + familia.nome];
  if (!vs) return;

  const listaHtml = vs.map(v => `
    <div class="motor-item">
      <span class="motor-item__nome">${v.nome}</span><span class="motor-item__periodo">${v.periodo}</span>
      <p>${v.desc}</p>
    </div>
  `).join('');

  modalContent.innerHTML = `
    <button type="button" class="modal__voltar" data-voltar-marca="${marcaAtual}">← Motores ${m.nome}</button>
    <img src="${m.logo}" alt="Logo ${m.nome}" class="modal__marca-logo" />
    <span class="modal__cat">${familia.periodo}</span>
    <h2>${m.nome} ${familia.nome}</h2>
    <p style="color:var(--gray);margin:.5rem 0 1.25rem;">${familia.desc}</p>
    <h3 style="margin-bottom:.25rem;">Motores desta família</h3>
    ${listaHtml}
  `;
  mostrarModal();
}

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

document.querySelectorAll('.card, .categoria-card, .article-card, .diag-card, .glossario-item, .marca-card, .diferencial').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .45s ease, transform .45s ease';
  observer.observe(el);
});

// =========================================
// MAPA MENTAL — balões de quadrinhos
// =========================================
const btnCarro   = document.getElementById('balao-carro');
const ramos      = document.getElementById('mapa-ramos');
const conector   = document.getElementById('mapa-conector');

if (btnCarro && ramos && conector) {
  btnCarro.addEventListener('click', () => {
    const aberto = ramos.classList.toggle('aberto');
    conector.classList.toggle('visivel', aberto);
    btnCarro.setAttribute('aria-expanded', aberto);
  });
}

}); // fim DOMContentLoaded
