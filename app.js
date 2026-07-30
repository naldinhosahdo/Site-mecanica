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
      { nome: 'EA827', periodo: '1972–2013', desc: 'Bloco em ferro fundido 1.6/1.8/2.0, a base do lendário "motor AP" fabricado no Brasil (álcool e gasolina).' },
      { nome: 'EA111', periodo: '1999–2013', desc: 'Motores 1.0/1.6 Total Flex, equipou o Gol G3/G4/G5 e popularizou o bicombustível no Brasil.' },
      { nome: 'EA113 (2.0 Turbo)', periodo: '2003–2008', desc: 'Motor turbo de alta performance, usado no Golf GTI e no Audi TT da época.' },
      { nome: 'VR6', periodo: '1991–atual', desc: 'V6 compacto com ângulo estreito entre cilindros, usado no Passat e em versões esportivas do Golf.' },
      { nome: 'TDI', periodo: '1989–atual', desc: 'Linha de motores diesel turbo com injeção direta, presente na Amarok.' },
      { nome: 'EA211', periodo: '2012–atual', desc: 'Geração atual 1.0/1.6 MSI/TSI, mais leve e eficiente, usado em Polo, Virtus e T-Cross.' },
      { nome: 'EA888', periodo: '2007–atual', desc: 'Família turbo 2.0 TSI de alta performance, usada em Golf GTI, Jetta GLI e Tiguan.' },
    ]
  },
  chevrolet: {
    nome: 'Chevrolet', logo: 'logos/chevrolet.png', fundacao: 1911,
    motores: [
      { nome: 'Motor 4 cilindros original', periodo: '1911–1920', desc: 'Primeiros motores da marca, usados nos modelos Série C "Classic Six" e seguintes no início do século 20.' },
      { nome: 'Stovebolt Six', periodo: '1929–1962', desc: 'Motor 6 cilindros em linha extremamente popular nos EUA, usado por mais de 30 anos em vários modelos.' },
      { nome: 'Small Block V8', periodo: '1955–atual', desc: 'Icônico V8 americano, símbolo do Camaro e do Corvette em todo o mundo, ainda em produção.' },
      { nome: 'Motor Opala (reto 4 e 6)', periodo: '1968–1992', desc: 'Motores de origem Chevrolet/Opel que equiparam o Opala por mais de duas décadas no Brasil.' },
      { nome: 'Família I', periodo: '1989–1996', desc: 'Motores 1.4/1.6 de origem GM/Opel usados no Kadett e Ipanema.' },
      { nome: 'Família II', periodo: '1993–2016', desc: 'Motores 1.8/2.0 8V e 16V, um dos mais usados da história da GM no Brasil (Vectra, Astra, Omega, Zafira).' },
      { nome: 'Ecotec (Família E)', periodo: '1999–atual', desc: 'Linha global compacta e eficiente, usada em Celta, Corsa, Onix e Prisma.' },
    ]
  },
  fiat: {
    nome: 'Fiat', logo: 'logos/fiat.png', fundacao: 1899,
    motores: [
      { nome: 'Motor 4 cilindros Fiat 501', periodo: '1919–1926', desc: 'Um dos primeiros motores de produção em massa da Fiat, símbolo da consolidação da marca na Itália.' },
      { nome: 'Motor bicilíndrico traseiro (600/500)', periodo: '1955–1975', desc: 'Motores compactos montados atrás, que motorizaram o Fiat 600 e o icônico Fiat 500 clássico.' },
      { nome: 'Motor tipo 128', periodo: '1969–1985', desc: 'Motor 1.3/1.5 que equipou o Fiat 147, primeiro carro a álcool em massa no Brasil.' },
      { nome: 'FIRE', periodo: '1985–atual', desc: '"Fully Integrated Robotized Engine", motor leve e compacto 1.0/1.4 que virou sinônimo de Uno e Palio.' },
      { nome: 'E.torQ', periodo: '2010–2020', desc: 'Motores 1.6/1.8/2.0 16V desenvolvidos com a Chrysler, usados em Punto, Linea, Argo e Cronos.' },
      { nome: 'Multijet', periodo: '2000–atual', desc: 'Linha de motores diesel a injeção direta usada em utilitários e picapes (Toro, Strada).' },
      { nome: 'Firefly', periodo: '2016–atual', desc: 'Família 3 cilindros turbo de última geração, presente em Mobi, Argo, Cronos e Pulse.' },
    ]
  },
  ford: {
    nome: 'Ford', logo: 'logos/ford.png', fundacao: 1903,
    motores: [
      { nome: 'Motor do Ford Modelo T', periodo: '1908–1927', desc: 'Motor 2.9 4 cilindros que motorizou o carro mais vendido do início do século 20, produzido por quase 20 anos sem grandes mudanças.' },
      { nome: 'Flathead V8', periodo: '1932–1953', desc: 'Primeiro V8 de baixo custo produzido em massa, revolucionou a indústria automotiva americana.' },
      { nome: 'CHT', periodo: '1982–1996', desc: '"Compound High Turbulence", motor 1.6/1.8 que equipou o Corcel, Belina e Del Rey no Brasil.' },
      { nome: 'Zetec-Rocam', periodo: '1996–2013', desc: 'Motores 1.0/1.6 simples e resistentes, usados em Fiesta, Ka e Escort.' },
      { nome: 'Duratec', periodo: '1998–2019', desc: 'Linha 1.6/2.0 16V mais moderna e potente, presente no Focus e EcoSport.' },
      { nome: 'EcoBoost', periodo: '2009–atual', desc: 'Motores turbo de baixa cilindrada com alta eficiência, adotados globalmente pela Ford.' },
      { nome: 'Dragão', periodo: '2018–atual', desc: 'Motores 1.0/1.5 turbo Flex desenvolvidos no Brasil para Ka e novo EcoSport.' },
    ]
  },
  toyota: {
    nome: 'Toyota', logo: 'logos/toyota.png', fundacao: 1937,
    motores: [
      { nome: 'Motor Tipo A', periodo: '1936–1947', desc: 'Primeiro motor a gasolina desenvolvido pela Toyota, usado no protótipo AA que deu origem à marca.' },
      { nome: 'Série R', periodo: '1953–1997', desc: 'Família de motores robustos usada por décadas no Corona, Hilux e primeiras gerações do Land Cruiser.' },
      { nome: 'Série K', periodo: '1966–1988', desc: 'Motores 1.2/1.6 usados no Corolla e Tercel clássicos.' },
      { nome: 'Série A', periodo: '1978–2018', desc: 'Motores 1.3/1.6/1.8 confiáveis, presentes em várias gerações do Corolla.' },
      { nome: 'Hybrid Synergy Drive', periodo: '1997–atual', desc: 'Sistema híbrido pioneiro que tornou o Prius o carro híbrido mais famoso do mundo.' },
      { nome: 'Dynamic Force (Série ZR/NR)', periodo: '2015–atual', desc: 'Motores 1.5/2.0 de alta eficiência térmica, usados no Corolla e Yaris atuais.' },
    ]
  },
  honda: {
    nome: 'Honda', logo: 'logos/honda.png', fundacao: 1948,
    motores: [
      { nome: 'Motores de motocicleta iniciais', periodo: '1948–1962', desc: 'A Honda nasceu fabricando motores para bicicletas e motos; essa base técnica veio a definir sua engenharia futura de motores.' },
      { nome: 'Motor CVCC', periodo: '1972–1987', desc: 'Tecnologia pioneira de combustão de baixa emissão, que dispensou o catalisador exigido nos EUA na época.' },
      { nome: 'D-series', periodo: '1984–2005', desc: 'Motores 1.5/1.6 SOHC, usados no Civic das gerações mais populares no Brasil.' },
      { nome: 'B-series (VTEC)', periodo: '1988–2001', desc: 'Motores esportivos com a icônica tecnologia VTEC, marca registrada do Civic Si.' },
      { nome: 'K-series', periodo: '2001–2020', desc: 'Sucessor do B-series, motores 1.8/2.0/2.4 usados em Civic e Accord.' },
      { nome: 'L-series', periodo: '2008–atual', desc: 'Motores 1.5/1.8 compactos usados no Fit, City e HR-V.' },
      { nome: 'Earth Dreams (i-VTEC turbo)', periodo: '2015–atual', desc: 'Motores turbo modernos e híbridos e-HEV do Civic e HR-V atuais.' },
    ]
  },
  hyundai: {
    nome: 'Hyundai', logo: 'logos/hyundai.png', fundacao: 1967,
    motores: [
      { nome: 'Motores licenciados Mitsubishi', periodo: '1968–1989', desc: 'Nos primeiros anos, a Hyundai produziu motores sob licença da Mitsubishi para seus primeiros modelos, como o Pony.' },
      { nome: 'Alpha', periodo: '1990–atual', desc: 'Motores 1.0/1.6 atualizados ao longo de décadas, usados em modelos de entrada.' },
      { nome: 'Beta', periodo: '1990–atual', desc: 'Linha 1.6/2.0 amplamente usada no HB20 e Creta no Brasil.' },
      { nome: 'Gamma', periodo: '2006–atual', desc: 'Motores 1.4/1.6 GDI de injeção direta, versão mais eficiente da linha.' },
      { nome: 'Smartstream', periodo: '2018–atual', desc: 'Geração mais recente, focada em eficiência de combustível e menor emissão.' },
    ]
  },
  renault: {
    nome: 'Renault', logo: 'logos/renault.png', fundacao: 1899,
    motores: [
      { nome: 'Motores originais Renault', periodo: '1899–1945', desc: 'Motores primitivos desenvolvidos pelos irmãos Renault nos primórdios da fabricação de automóveis na França.' },
      { nome: 'Motor Billancourt', periodo: '1946–1986', desc: 'Motor 1.0 muito duradouro, usado no 4CV, Renault 4 e Renault 5 originais.' },
      { nome: 'Cléon-Fonte', periodo: '1962–2003', desc: 'Um dos motores mais duradouros da história, 1.0 a 1.7, usado em dezenas de modelos por 40 anos.' },
      { nome: 'K4M / K7M', periodo: '2000–atual', desc: 'Motores 1.6 8V/16V usados em Logan, Sandero e Duster no Brasil.' },
      { nome: 'Energy (SCe/TCe)', periodo: '2012–atual', desc: 'Linha 1.0/1.3 aspirada e turbo mais eficiente, presente no Kwid e no Duster atual.' },
    ]
  },
  nissan: {
    nome: 'Nissan', logo: 'logos/nissan.png', fundacao: 1933,
    motores: [
      { nome: 'Motores Datsun iniciais', periodo: '1933–1965', desc: 'Primeiros motores pequenos usados nos automóveis Datsun, marca original da Nissan para exportação.' },
      { nome: 'Série A', periodo: '1966–1998', desc: 'Motores 1.0 a 1.5 usados em modelos compactos japoneses clássicos.' },
      { nome: 'Série SR/QG', periodo: '1990–2010', desc: 'Motores 1.6/2.0 16V usados no Sentra e no antigo March/Micra.' },
      { nome: 'Série VR', periodo: '2007–atual', desc: 'V6 biturbo de alta performance, motor do lendário GT-R.' },
      { nome: 'Série HR', periodo: '2010–atual', desc: 'Motores 1.0/1.6 modernos, usados em Versa, March e Kicks.' },
    ]
  },
  peugeot: {
    nome: 'Peugeot', logo: 'logos/peugeot.png', fundacao: 1810,
    motores: [
      { nome: 'Motor do Peugeot Type 3', periodo: '1891–1900', desc: 'Um dos primeiros automóveis a gasolina da Peugeot, marcando a entrada da marca no setor automotivo.' },
      { nome: 'Motores XU/XN', periodo: '1970–2000', desc: 'Motores 1.4 a 2.0 desenvolvidos com a Citroën, usados em várias gerações do 205, 405 e 306.' },
      { nome: 'TU', periodo: '1970–2010', desc: 'Motores 1.0 a 1.6 muito usados nos anos 90 e 2000, presentes no 206 e 306.' },
      { nome: 'EW/DW', periodo: '1998–2015', desc: 'Motores 1.6/2.0 16V a gasolina e diesel (HDi) usados no 307 e 308.' },
      { nome: 'PureTech', periodo: '2014–atual', desc: 'Motores turbo 3 cilindros modernos e eficientes, usados no 208 e 2008 atuais.' },
    ]
  },
  bmw: {
    nome: 'BMW', logo: 'logos/bmw.png', fundacao: 1916,
    motores: [
      { nome: 'Motores de aviação BMW', periodo: '1917–1928', desc: 'A BMW nasceu fabricando motores de avião; essa origem aeronáutica está até hoje na logomarca da empresa.' },
      { nome: 'Motor M78 (BMW 303)', periodo: '1933–1936', desc: 'Motor 6 cilindros em linha do primeiro carro a levar o característico grelha "rim duplo" da marca.' },
      { nome: 'M10', periodo: '1962–1988', desc: 'Motor 4 cilindros que formou a base de vários modelos e até de motores de Fórmula 1 turbo da marca.' },
      { nome: 'M20 / M30 (reto-6)', periodo: '1977–1993', desc: 'Icônicos motores 6 cilindros em linha, marca registrada da suavidade BMW.' },
      { nome: 'Série S (M-Power)', periodo: '1985–atual', desc: 'Motores esportivos de alta rotação usados nos M3, M5 e outros modelos de performance.' },
      { nome: 'Série N', periodo: '2001–2015', desc: 'Motores modulares turbo (N54, N52, N20), que modernizaram a linha da marca.' },
      { nome: 'Série B (modular)', periodo: '2014–atual', desc: 'Arquitetura modular atual (B38, B48, B58) usada em toda a linha, de 3 a 6 cilindros.' },
    ]
  },
  mercedes: {
    nome: 'Mercedes-Benz', logo: 'logos/mercedes.png', fundacao: 1926,
    motores: [
      { nome: 'Motor Benz Patent-Motorwagen', periodo: '1886', desc: 'Considerado o primeiro motor a combustão interna de um automóvel de produção da história, criado por Karl Benz.' },
      { nome: 'Motor Mercedes 35 HP', periodo: '1901–1905', desc: 'Motor avançado para a época que deu nome ao primeiro carro batizado de "Mercedes".' },
      { nome: 'M102 / M111', periodo: '1980–2000', desc: 'Motores 4 cilindros robustos usados nos sedãs de entrada da marca nos anos 80 e 90.' },
      { nome: 'Linha OM (diesel)', periodo: '1949–atual', desc: 'Tradicional família de motores diesel, muito usada em caminhões e utilitários Mercedes-Benz.' },
      { nome: 'M270 / M274', periodo: '2012–atual', desc: 'Motores turbo 1.6/2.0 modernos usados na Classe A, C e GLA atuais.' },
      { nome: 'M256', periodo: '2017–atual', desc: 'Motor 6 cilindros em linha com sistema elétrico de 48V, topo de linha da marca hoje.' },
    ]
  },
  audi: {
    nome: 'Audi', logo: 'logos/audi.png', fundacao: 1909,
    motores: [
      { nome: 'Motores pré-guerra Auto Union', periodo: '1932–1940', desc: 'Motores usados nos famosos "Silver Arrows" de corrida, quando a Audi fazia parte do consórcio Auto Union.' },
      { nome: 'EA827 (compartilhado com VW)', periodo: '1972–2000', desc: 'Base dos motores 1.8/2.0 usados nos primeiros Audi 80 e 100.' },
      { nome: '5 cilindros turbo (Quattro)', periodo: '1980–1991', desc: 'Motor icônico do Audi Quattro original, símbolo da tração integral da marca.' },
      { nome: 'TDI V6/V8', periodo: '1997–atual', desc: 'Linha diesel de alta performance usada nos modelos maiores da marca.' },
      { nome: 'TFSI (EA888)', periodo: '2008–atual', desc: 'Motores turbo com injeção direta, usados no A3, A4 e Q3 atuais.' },
    ]
  },
  kia: {
    nome: 'Kia', logo: 'logos/kia.png', fundacao: 1944,
    motores: [
      { nome: 'Motores licenciados (Mazda/Ford)', periodo: '1974–1990', desc: 'A Kia começou fabricando peças e depois carros com motores licenciados de outras montadoras, antes de desenvolver os próprios.' },
      { nome: 'Gamma (compartilhado c/ Hyundai)', periodo: '2006–atual', desc: 'Motores 1.4/1.6 GDI de injeção direta, usados no Soluto e Bongo.' },
      { nome: 'Smartstream', periodo: '2018–atual', desc: 'Geração mais recente e eficiente, presente nos modelos globais atuais da marca.' },
    ]
  },
  mitsubishi: {
    nome: 'Mitsubishi', logo: 'logos/mitsubishi.png', fundacao: 1917,
    motores: [
      { nome: 'Primeiro motor a combustão Mitsubishi', periodo: '1917', desc: 'Motor usado no Mitsubishi Model A, o primeiro automóvel de produção em série do Japão.' },
      { nome: 'Astron / Sirius', periodo: '1970–1990', desc: 'Motores 1.6 a 2.0 dos primeiros modelos exportados globalmente pela marca.' },
      { nome: 'Série 4G', periodo: '1980–2010', desc: 'Família muito conhecida, incluindo o lendário 4G63 do Lancer Evolution.' },
      { nome: 'MIVEC', periodo: '1992–atual', desc: 'Tecnologia de variação de comando de válvulas usada nos motores atuais da marca, como no L200 e Outlander.' },
    ]
  },
};

// Ordem de exibição no grid de marcas
const ordemMarcas = ['volkswagen','chevrolet','fiat','ford','toyota','honda','hyundai','renault','nissan','peugeot','bmw','mercedes','audi','kia','mitsubishi'];

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
const marcasGrid = document.getElementById('marcas-grid');

if (marcasGrid) {
  marcasGrid.innerHTML = ordemMarcas.map(id => {
    const m = marcas[id];
    return `
      <button type="button" class="marca-card" data-marca="${id}">
        <img class="marca-card__icon" src="${m.logo}" alt="Logo ${m.nome}" loading="lazy" />
        <span class="marca-card__nome">${m.nome}</span>
        <span class="marca-card__ano">Desde ${m.fundacao}</span>
      </button>
    `;
  }).join('');

  marcasGrid.addEventListener('click', e => {
    const btn = e.target.closest('[data-marca]');
    if (!btn) return;
    abrirModalMarca(btn.dataset.marca);
  });
}

function abrirModalMarca(id) {
  const m = marcas[id];
  if (!m) return;

  const motoresHtml = m.motores.map(mo => `
    <div class="motor-item">
      <span class="motor-item__nome">${mo.nome}</span><span class="motor-item__periodo">${mo.periodo}</span>
      <p>${mo.desc}</p>
    </div>
  `).join('');

  modalContent.innerHTML = `
    <img src="${m.logo}" alt="Logo ${m.nome}" class="modal__marca-logo" />
    <span class="modal__cat">Desde ${m.fundacao}</span>
    <h2>Motores ${m.nome}</h2>
    <p style="color:var(--gray);margin:.5rem 0 1.25rem;">Principais famílias de motor produzidas pela ${m.nome} ao longo da sua história.</p>
    ${motoresHtml}
  `;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
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
