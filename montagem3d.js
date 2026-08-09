// =========================================
// MONTAGEM DE MOTOR EM 3D
// Three.js local (vendor/), geometria feita com primitivas —
// sem modelos externos para baixar.
// =========================================
import * as THREE from './vendor/three.module.min.js';

const COR = {
  ferro:   0x626b78,   // cilindros e bloco
  aluminio:0xa3adbb,   // cárter e cabeçotes
  aco:     0x848f9d,   // virabrequim
  escuro:  0x3b4350,   // comando, distribuidor
  cobre:   0xb0722c,
  vermelho:0xcf3327,
  amarelo: 0xe2bb33,
  azul:    0x2f9fd8,
  bronze:  0x9a7b4f,   // bielas
};

// -----------------------------------------
// Textura de peça fundida.
// Bloco e cabeçote saem da areia com a superfície granulada; sem isso
// o metal fica liso demais e a peça parece plástico. O relevo é gerado
// aqui mesmo, num canvas, para não depender de arquivo de imagem.
// -----------------------------------------
let _mapaRelevo = null, _mapaRugosidade = null;

function texturasFundido() {
  if (_mapaRelevo) return;
  const N = 256;
  const alt = new Float32Array(N * N);

  // ruído de valor em três escalas: manchas, grão e granulado fino
  const oitava = (celulas, peso) => {
    const g = new Float32Array(celulas * celulas);
    for (let i = 0; i < g.length; i++) g[i] = Math.random();
    const em = (i, j) => g[(((j % celulas) + celulas) % celulas) * celulas +
                           (((i % celulas) + celulas) % celulas)];
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const fx = x * celulas / N, fy = y * celulas / N;
      const x0 = Math.floor(fx), y0 = Math.floor(fy);
      const tx = fx - x0, ty = fy - y0;
      const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
      alt[y * N + x] += peso * ((em(x0, y0) * (1 - sx) + em(x0 + 1, y0) * sx) * (1 - sy) +
                                (em(x0, y0 + 1) * (1 - sx) + em(x0 + 1, y0 + 1) * sx) * sy);
    }
  };
  oitava(12, .45); oitava(40, .33); oitava(110, .22);

  const tela = () => { const c = document.createElement('canvas'); c.width = c.height = N; return c; };

  // mapa de relevo (normal map) a partir da inclinação do ruído
  const cR = tela(), ctxR = cR.getContext('2d'), imgR = ctxR.createImageData(N, N);
  const cG = tela(), ctxG = cG.getContext('2d'), imgG = ctxG.createImageData(N, N);
  const FORCA = 2.4;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const i = (y * N + x) * 4;
    const dx = alt[y * N + (x + 1) % N] - alt[y * N + (x + N - 1) % N];
    const dy = alt[((y + 1) % N) * N + x] - alt[((y + N - 1) % N) * N + x];
    const nx = -dx * FORCA, ny = -dy * FORCA;
    const inv = 1 / Math.hypot(nx, ny, 1);
    imgR.data[i]     = (nx * inv * .5 + .5) * 255;
    imgR.data[i + 1] = (ny * inv * .5 + .5) * 255;
    imgR.data[i + 2] = (inv * .5 + .5) * 255;
    imgR.data[i + 3] = 255;
    // superfície mais alta = mais polida; mais baixa = mais fosca
    const v = 208 + alt[y * N + x] * 47;
    imgR.data[i + 3] = 255;
    imgG.data[i] = imgG.data[i + 1] = imgG.data[i + 2] = v;
    imgG.data[i + 3] = 255;
  }
  ctxR.putImageData(imgR, 0, 0);
  ctxG.putImageData(imgG, 0, 0);

  const preparar = c => {
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(3, 3);
    return t;
  };
  _mapaRelevo = preparar(cR);
  _mapaRugosidade = preparar(cG);
}

// Peça de motor é metal fosco, não espelho: com metalness alto demais a
// peça só reflete o ambiente e some quando está sozinha no palco.
const mat = (cor, metal = .85, rug = .38, liso = false) => {
  const m = new THREE.MeshStandardMaterial({ color: cor,
                                             metalness: Math.min(metal, .55),
                                             roughness: Math.max(rug, .42) });
  if (!liso) {
    texturasFundido();
    m.normalMap = _mapaRelevo;
    m.normalScale = new THREE.Vector2(.4, .4);
    m.roughnessMap = _mapaRugosidade;
    m.roughness = Math.min(1, m.roughness * 1.12);
  }
  return m;
};

// peça usinada/polida: sem o granulado do fundido
const matLiso = (cor, metal = .9, rug = .25) => mat(cor, metal, rug, true);

// -----------------------------------------
// Caixa com quinas chanfradas.
// Peça de motor não tem aresta viva: o chanfro pega a luz e é
// o que tira o desenho do aspecto de "bloco de Lego".
// -----------------------------------------
const _geosCaixa = new Map();

function geoCaixa(x, y, z) {
  const chave = x + '|' + y + '|' + z;
  if (_geosCaixa.has(chave)) return _geosCaixa.get(chave);

  const ch = Math.min(x, y, z) * .11;              // tamanho do chanfro
  const w = x / 2 - ch, h = y / 2 - ch, prof = z - ch * 2;
  const canto = Math.min(w, h) * .3;               // quinas levemente arredondadas

  const f = new THREE.Shape();
  f.moveTo(-w + canto, -h);
  f.lineTo(w - canto, -h);   f.quadraticCurveTo(w, -h, w, -h + canto);
  f.lineTo(w, h - canto);    f.quadraticCurveTo(w, h, w - canto, h);
  f.lineTo(-w + canto, h);   f.quadraticCurveTo(-w, h, -w, h - canto);
  f.lineTo(-w, -h + canto);  f.quadraticCurveTo(-w, -h, -w + canto, -h);

  const g = new THREE.ExtrudeGeometry(f, {
    depth: prof, curveSegments: 4, steps: 1,
    bevelEnabled: true, bevelThickness: ch, bevelSize: ch, bevelOffset: 0, bevelSegments: 2
  });
  g.translate(0, 0, -prof / 2);
  g.computeVertexNormals();
  g.userData.compartilhada = true;   // fica no cache; limparCena não descarta
  _geosCaixa.set(chave, g);
  return g;
}

// atalhos de geometria
const caixa = (x,y,z,c,m,r) => new THREE.Mesh(geoCaixa(x,y,z), mat(c,m,r));
const cil   = (rt,rb,h,c,seg=32,m,r) =>
  new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,Math.max(seg,28)), mat(c,m,r));
const grupo = (...fs) => { const g=new THREE.Group(); fs.forEach(f=>g.add(f)); return g; };
const põe   = (o,x,y,z) => { o.position.set(x,y,z); return o; };
const gira  = (o,x,y,z) => { o.rotation.set(x,y,z); return o; };

const PI2 = Math.PI/2;

// cabeça de parafuso: cilindro de 6 lados já sai sextavado
const _geoParafuso = new THREE.CylinderGeometry(.075, .075, .09, 6);
_geoParafuso.userData.compartilhada = true;
const parafuso = () => new THREE.Mesh(_geoParafuso, mat(0x757f8c, .95, .3));

// cremalheira do volante — o dentinho é o que faz o disco virar volante
function cremalheira(g, raio, z, dentes = 34) {
  for (let k = 0; k < dentes; k++) {
    const a = k * Math.PI * 2 / dentes;
    g.add(gira(põe(caixa(.1, .12, .22, COR.aco, .9, .35),
                   Math.cos(a) * raio, Math.sin(a) * raio, z), 0, 0, a));
  }
  return g;
}


// =========================================
// PEÇAS COM FORMA DE VERDADE
// Cilindro e caixa dão conta do bloco, mas pistão, virabrequim,
// válvula e vela têm silhueta própria — é ela que faz a peça ser
// reconhecida. Aqui essas formas são torneadas (perfil revolvido),
// extrudadas ou varridas ao longo de uma curva.
// =========================================

// cache de geometria: a mesma peça se repete muitas vezes no motor
const _cacheGeo = new Map();
function geoCache(chave, fabrica) {
  if (!_cacheGeo.has(chave)) {
    const g = fabrica();
    g.userData.compartilhada = true;   // limparCena não descarta
    _cacheGeo.set(chave, g);
  }
  return _cacheGeo.get(chave);
}

// perfil revolvido no eixo Y: [raio, altura]
const geoTorneada = (perfil, seg = 34) =>
  new THREE.LatheGeometry(perfil.map(([x, y]) => new THREE.Vector2(Math.max(x, .0005), y)), seg);

// tubo varrido ao longo de uma curva suave
function tuboCurvo(pontos, raio, cor, m, r) {
  const curva = new THREE.CatmullRomCurve3(pontos.map(p => new THREE.Vector3(...p)));
  return new THREE.Mesh(new THREE.TubeGeometry(curva, 22, raio, 12, false), mat(cor, m, r));
}

// mola helicoidal (válvulas)
function geoMola(raio, altura, voltas, fio) {
  const pts = [];
  const passos = Math.round(voltas * 12);
  for (let i = 0; i <= passos; i++) {
    const t = i / passos, a = t * voltas * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * raio, t * altura, Math.sin(a) * raio));
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), passos, fio, 6, false);
}

// ---------- PISTÃO ----------
// coroa, canaletas de anel e saia: o perfil clássico
function pistao(r, cor) {
  const g = geoCache('pistao|' + r, () => geoTorneada([
    [0, -.34], [r * .82, -.34], [r * .82, -.30], [r, -.26],
    [r, -.16], [r * .93, -.145], [r, -.13],        // canaleta do anel de óleo
    [r, -.05], [r * .93, -.035], [r, -.02],        // anel de compressão
    [r, .07], [r * .93, .085], [r, .10],           // anel de fogo
    [r, .16], [r * .97, .19], [r * .55, .21], [0, .19]
  ], 30));
  return new THREE.Mesh(g, matLiso(cor, .55, .3));
}

// ---------- BIELA ----------
// olhal maior embaixo (no virabrequim), menor em cima (no pino do pistão)
function biela(comp, cor) {
  const g = new THREE.Group();
  const rGrande = .26, rPequeno = .13, larg = .17;
  const anel = (raio, esp) => {
    const f = new THREE.Shape();
    f.absarc(0, 0, raio, 0, Math.PI * 2, false);
    const furo = new THREE.Path();
    furo.absarc(0, 0, raio - esp, 0, Math.PI * 2, true);
    f.holes.push(furo);
    const geo = new THREE.ExtrudeGeometry(f, { depth: larg, curveSegments: 14, bevelEnabled: false });
    geo.translate(0, 0, -larg / 2);
    return new THREE.Mesh(geo, matLiso(cor, .6, .35));
  };
  g.add(anel(rGrande, .09));                                   // olhal do moente
  g.add(põe(anel(rPequeno, .05), 0, comp, 0));                 // olhal do pino
  // haste em I: duas abas finas e uma alma no meio
  [-.055, .055].forEach(z => g.add(põe(caixa(.13, comp - .28, .04, cor, .6, .35), 0, comp / 2 + .04, z)));
  g.add(põe(caixa(.055, comp - .28, .12, cor, .6, .35), 0, comp / 2 + .04, 0));
  // capa do olhal grande, com os dois parafusos
  [-.2, .2].forEach(x => g.add(põe(gira(parafuso(), 0, 0, PI2), x, -.16, 0)));
  return g;
}

// ---------- VIRABREQUIM ----------
// mancais, moentes deslocados e contrapesos em meia-lua
function contrapeso(raio, esp, cor) {
  return new THREE.Mesh(geoCache('contrapeso|' + raio + '|' + esp, () => {
    const f = new THREE.Shape();
    f.absarc(0, 0, raio, Math.PI * .12, Math.PI * .88, false);
    f.absarc(0, 0, raio * .42, Math.PI * .88, Math.PI * .12, true);
    const g = new THREE.ExtrudeGeometry(f, { depth: esp, curveSegments: 12, bevelEnabled: true,
                                             bevelThickness: .02, bevelSize: .02, bevelSegments: 1 });
    g.translate(0, 0, -esp / 2);
    return g;
  }), matLiso(cor, .7, .35));
}

// eixo ao longo de X; cada cilindro ganha moente e dois contrapesos
function virabrequimX(xs, curso, angDe, comprimento) {
  const g = new THREE.Group();
  const rMancal = .19, rMoente = .17, esp = .13;
  g.add(gira(cil(rMancal, rMancal, comprimento, COR.aco, 24, .9, .3), 0, 0, PI2));
  xs.forEach((x, i) => {
    const a = angDe(i);
    const cy = Math.cos(a) * curso, cz = Math.sin(a) * curso;
    // moente, onde a biela se prende
    g.add(põe(gira(cil(rMoente, rMoente, .34, COR.aco, 20, .9, .3), 0, 0, PI2), x, cy, cz));
    [-1, 1].forEach(lado => {
      const c = contrapeso(.42, esp, COR.ferro);
      c.rotation.y = PI2;                   // deitar o disco no plano YZ
      c.rotation.x = a + Math.PI / 2;       // apontar para o lado oposto ao moente
      c.position.set(x + lado * .27, 0, 0);
      g.add(c);
    });
  });
  return g;
}

// ---------- ÁRVORE DE COMANDO ----------
// came de verdade: círculo de base com um nariz, não um disco
function loboCame(raio, alcance, esp, cor) {
  return new THREE.Mesh(geoCache('came|' + raio + '|' + alcance + '|' + esp, () => {
    const f = new THREE.Shape();
    for (let k = 0; k <= 72; k++) {
      const t = k / 72 * Math.PI * 2;
      const sobe = Math.max(0, Math.cos(t));
      const r = raio + alcance * sobe * sobe * sobe;
      k ? f.lineTo(Math.cos(t) * r, Math.sin(t) * r) : f.moveTo(Math.cos(t) * r, Math.sin(t) * r);
    }
    const g = new THREE.ExtrudeGeometry(f, { depth: esp, curveSegments: 4, bevelEnabled: false });
    g.translate(0, 0, -esp / 2);
    return g;
  }), matLiso(cor, .8, .3));
}

// comando ao longo de X, com dois lobos por cilindro (admissão e escape)
function comandoX(xs, comprimento, y, z) {
  const g = new THREE.Group();
  g.add(põe(gira(cil(.11, .11, comprimento, COR.escuro, 20, .8, .35), 0, 0, PI2), 0, y, z || 0));
  xs.forEach((x, i) => [-.14, .14].forEach((dx, k) => {
    const l = loboCame(.17, .13, .11, COR.aco);
    l.rotation.y = PI2;
    l.rotation.x = i * 1.4 + k * 2.1;      // cada came na sua fase
    l.position.set(x + dx, y, z || 0);
    g.add(l);
  }));
  // mancais do eixo
  xs.forEach(x => g.add(põe(gira(cil(.16, .16, .1, COR.aluminio, 18, .5, .5), 0, 0, PI2), x - .38, y, z || 0)));
  return g;
}

// ---------- VÁLVULA COM MOLA ----------
function valvula(cor) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(geoCache('valvula', () => geoTorneada([
    [0, 0], [.19, .02], [.19, .06], [.05, .16], [.045, .78], [.06, .82], [0, .84]
  ], 20)), matLiso(cor, .85, .28)));
  const mola = new THREE.Mesh(geoCache('mola', () => geoMola(.115, .34, 5.5, .022)),
                              matLiso(COR.aco, .9, .3));
  mola.position.y = .28;
  g.add(mola);
  g.add(põe(new THREE.Mesh(geoCache('prato', () => geoTorneada([[0,0],[.15,0],[.15,.045],[0,.045]], 18)),
                           matLiso(COR.ferro, .8, .35)), 0, .64, 0));
  return g;
}

// as válvulas de um cabeçote: duas por cilindro, inclinadas em V
function valvulas(xs, y, cor) {
  const g = new THREE.Group();
  xs.forEach(x => [-1, 1].forEach(lado => {
    const v = valvula(cor);
    v.rotation.x = lado * .17;
    v.position.set(x, y, lado * .3);
    g.add(v);
  }));
  return g;
}

// ---------- VELA DE IGNIÇÃO ----------
function vela() {
  const corpo = new THREE.Mesh(geoCache('vela', () => geoTorneada([
    [0, 0], [.055, 0], [.055, .12], [.075, .14], [.075, .30],   // rosca
    [.105, .32], [.105, .44],                                    // sextavado
    [.075, .46], [.075, .62], [.09, .64], [.09, .78],            // isolador
    [.055, .82], [.055, .92], [0, .94]
  ], 16)), matLiso(0xd9d2c4, .25, .55));
  const g = grupo(corpo);
  g.add(põe(new THREE.Mesh(geoCache('velaHex', () => new THREE.CylinderGeometry(.115, .115, .13, 6)),
                           matLiso(COR.aco, .9, .3)), 0, .38, 0));
  g.add(põe(cil(.024, .024, .12, COR.aco, 10, .9, .3), 0, -.05, 0));   // eletrodo
  return g;
}

// ---------- POLIA E CORREIA DENTADA ----------
function polia(raio, larg, cor) {
  return new THREE.Mesh(geoCache('polia|' + raio + '|' + larg, () => geoTorneada([
    [0, -larg / 2], [raio * .35, -larg / 2], [raio * .35, -larg / 2 + .03],
    [raio, -larg / 2 + .05], [raio, larg / 2 - .05],
    [raio * .35, larg / 2 - .03], [raio * .35, larg / 2], [0, larg / 2]
  ], 30)), matLiso(cor, .7, .35));
}

// correia com dentes, passando por duas polias no plano YZ
function correiaDentada(x, a, ra, b, rb, cor) {
  const g = new THREE.Group();
  const dy = b[0] - a[0], dz = b[1] - a[1];
  const dist = Math.hypot(dy, dz), ang = Math.atan2(dz, dy);
  [[a, ra], [b, rb]].forEach(([p, r]) => {
    const t = new THREE.Mesh(new THREE.TorusGeometry(r, .055, 8, 30), mat(cor, .2, .8));
    t.rotation.y = PI2; t.position.set(x, p[0], p[1]); g.add(t);
  });
  [-1, 1].forEach(lado => {
    const c = caixa(.1, dist, .05, cor, .2, .8);
    c.position.set(x, (a[0] + b[0]) / 2 + Math.sin(ang) * lado * ra,
                      (a[1] + b[1]) / 2 - Math.cos(ang) * lado * ra);
    c.rotation.x = -ang;
    g.add(c);
    // dentes da correia
    const n = Math.max(4, Math.round(dist / .17));
    for (let k = 0; k < n; k++) {
      const t = (k + .5) / n;
      const d = caixa(.09, .06, .05, cor, .2, .8);
      d.position.set(x, a[0] + dy * t + Math.sin(ang) * lado * (ra - .05),
                        a[1] + dz * t - Math.cos(ang) * lado * (ra - .05));
      d.rotation.x = -ang;
      g.add(d);
    }
  });
  return g;
}

// =========================================
// PEÇAS EM 3D, POR ARQUITETURA
// A geometria é gerada por parâmetro (nº de cilindros e layout), na
// MESMA ORDEM da lista de peças de montagem-dados.js — o rótulo de
// índice i tem que cair na peça de índice i.
// entrada = direção de onde a peça "voa" para o lugar
// =========================================

// tubo/anel: casca cilíndrica ao longo de Z (carcaças, estator, camisas)
function tubo(rExt, rInt, comp, cor, m, r) {
  const f = new THREE.Shape();
  f.absarc(0, 0, rExt, 0, Math.PI * 2, false);
  const furo = new THREE.Path();
  furo.absarc(0, 0, rInt, 0, Math.PI * 2, true);
  f.holes.push(furo);
  const g = new THREE.ExtrudeGeometry(f, { depth: comp, curveSegments: 24, steps: 1, bevelEnabled: false });
  g.translate(0, 0, -comp / 2);
  return new THREE.Mesh(g, mat(cor, m, r));
}

// engrenagem simples: disco com dentes
function engrenagem(raio, dentes, esp, cor) {
  const g = grupo(gira(cil(raio, raio, esp, cor, 32, .9, .35), PI2, 0, 0));
  for (let k = 0; k < dentes; k++) {
    const a = k * Math.PI * 2 / dentes;
    g.add(gira(põe(caixa(raio * .18, raio * .16, esp, cor, .9, .35),
                   Math.cos(a) * raio * 1.05, Math.sin(a) * raio * 1.05, 0), 0, 0, a));
  }
  return g;
}

// barra fina ligando dois pontos no plano YZ (correntes e correias)
function elo(a, b, x, cor) {
  const dy = b[0] - a[0], dz = b[1] - a[1];
  const c = caixa(.07, Math.hypot(dy, dz), .13, cor, .2, .8);
  c.position.set(x, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
  c.rotation.x = -Math.atan2(dz, dy);
  return c;
}

// =========================================
// EM LINHA (refrigerado a água) — virabrequim no eixo X
// =========================================
function geoLinha(n) {
  const xs   = [...Array(n)].map((_, i) => (i - (n - 1) / 2) * .8);
  const furos= [...Array(n + 1)].map((_, i) => (i - n / 2) * .8);
  const L    = n * .8 + .2;
  const meia = L / 2;
  const xCor = meia + .18, xBomba = -(meia + .25), xVol = -(meia + .3);
  const fase = i => (n === 4 ? ((i === 0 || i === n - 1) ? 0 : Math.PI) : (i % 2) * Math.PI);
  const CURSO = .3, BIELA = .95, Y_VIRA = -1.05;

  return {
    bloco: () => ({ obj: (()=>{
        const g = grupo(caixa(L,1.7,1.6,COR.ferro,.75,.5));
        xs.forEach(x=>g.add(põe(cil(.44,.44,1.72,COR.escuro,20,.6,.6),x,.05,0)));
        furos.forEach(x=>[-.68,.68].forEach(z=>g.add(põe(parafuso(),x,.88,z))));
        // nervuras de reforço e bujões de água na lateral
        furos.slice(1,-1).forEach(x=>[-1,1].forEach(lado=>
          g.add(põe(caixa(.1,1.4,.09,COR.ferro,.75,.5),x,-.1,lado*.82))));
        xs.forEach(x=>g.add(põe(gira(cil(.16,.16,.06,COR.aco,16,.8,.4),PI2,0,0),x,-.35,.83)));
        // flange da caixa de câmbio
        g.add(põe(caixa(.16,1.9,1.75,COR.aluminio,.6,.45),-(meia+.06),-.35,0));
        return g; })(), entrada:[0,-5,0] }),

    virabrequim: () => ({ obj: (()=>{
        const g = virabrequimX(xs, CURSO, fase, L + .6);
        g.add(põe(polia(.34,.16,COR.ferro), meia + .32, 0, 0));
        g.position.y = Y_VIRA;
        return g; })(), entrada:[0,-5,0], animar:(o,t)=>{ o.rotation.x = t; } }),

    // pistão, biela e moente ligados de verdade: o ângulo da biela sai
    // da geometria (biela-manivela), não de uma animação aproximada
    pistoes: () => {
      const g = new THREE.Group(); const moveis = [];
      xs.forEach((x,i)=>{
        const p = põe(pistao(.4, COR.aluminio), x, .3, 0);
        const b = põe(biela(BIELA, COR.bronze), x, -.4, 0);
        g.add(p); g.add(b);
        moveis.push({ p, b, x, fase: fase(i) });
      });
      const mover = (o,t)=>{
        moveis.forEach(m=>{
          const a = t + m.fase;
          const py = Math.cos(a)*CURSO, pz = Math.sin(a)*CURSO;   // moente
          const moenteY = Y_VIRA + py;
          // altura do pino do pistão pela relação biela-manivela
          const alturaPino = moenteY + Math.sqrt(Math.max(.01, BIELA*BIELA - pz*pz));
          m.p.position.y = alturaPino + .12;
          m.b.position.set(m.x, moenteY, pz);
          m.b.rotation.x = -Math.atan2(pz, alturaPino - moenteY);
        });
      };
      mover(g, 0);
      return { obj:g, entrada:[0,5,0], animar: mover };
    },

    carteroleo: () => ({ obj: (()=>{
        const g = grupo(põe(caixa(L-.2,.7,1.4,COR.aco,.7,.5),0,-1.6,0));
        g.add(põe(caixa(L-.1,.12,1.5,COR.aco,.7,.5),0,-1.24,0));    // flange de vedação
        g.add(põe(gira(cil(.1,.1,.16,COR.escuro,12,.85,.35),0,0,PI2),meia-.5,-1.9,0));  // bujão
        return g; })(), entrada:[0,-5,0] }),

    junta: () => ({ obj: (()=>{
        const g = grupo(põe(caixa(L+.02,.06,1.62,COR.vermelho,.3,.6),0,.92,0));
        xs.forEach(x=>g.add(põe(gira(cil(.44,.44,.08,COR.vermelho,22,.3,.6),0,0,PI2),x,.92,0)));
        return g; })(), entrada:[0,4,0] }),

    cabecote: () => ({ obj: (()=>{
        const g = grupo(põe(caixa(L,.85,1.6,COR.aluminio,.65,.42),0,1.4,0));
        furos.forEach(x=>[-.68,.68].forEach(z=>g.add(põe(parafuso(),x,1.85,z))));
        // dutos de escape saindo pela lateral
        xs.forEach(x=>g.add(tuboCurvo([[x,1.35,-.75],[x,1.35,-1.0],[x,1.15,-1.25]],.16,COR.escuro,.6,.5)));
        // tampa de válvulas por cima
        g.add(põe(caixa(L-.15,.3,1.35,COR.aluminio,.5,.5),0,2.35,0));
        return g; })(), entrada:[0,5,0] }),

    comando: () => ({ obj: (()=>{
        const g = comandoX(xs, L + .1, 1.95, 0);
        g.add(valvulas(xs, 1.05, COR.aco));
        return g; })(), entrada:[0,5,0], animar:(o,t)=>{
        o.children.forEach(c=>{ if (c.isMesh && c.rotation.y === PI2) c.rotation.x += 0; });
        o.rotation.x = t/2; } }),

    correia: () => ({ obj: (()=>{
        const g = correiaDentada(xCor, [1.95,0], .42, [Y_VIRA,0], .3, COR.escuro);
        g.add(põe(polia(.44,.14,COR.escuro), xCor, 1.95, 0));
        g.add(põe(polia(.32,.14,COR.escuro), xCor, Y_VIRA, 0));
        return g; })(), entrada:[6,0,0] }),

    bomba: () => ({ obj: (()=>{
        const g = grupo(põe(gira(cil(.34,.34,.4,COR.azul,22,.4,.45),0,0,PI2),xBomba,.5,0));
        g.add(põe(gira(cil(.2,.2,.16,COR.azul,18,.4,.45),0,0,PI2),xBomba-.26,.5,0));
        g.add(tuboCurvo([[xBomba,.5,.2],[xBomba-.1,.35,.7],[xBomba-.1,.1,1.0]],.13,COR.azul,.4,.5));
        return g; })(), entrada:[-5,0,0] }),

    velas: () => ({ obj: (()=>{
        const g = new THREE.Group();
        xs.forEach(x=>g.add(põe(vela(),x,1.72,0)));
        return g; })(), entrada:[0,5,0] }),

    coletor: () => ({ obj: (()=>{
        const g = grupo(põe(caixa(L-.9,.42,.5,COR.aluminio,.6,.42),0,1.95,1.5));
        // corredores curvos até o cabeçote, não tubos retos
        xs.forEach(x=>g.add(tuboCurvo([[x*.8,1.92,1.35],[x*.9,1.8,1.05],[x,1.5,.75]],.13,COR.aluminio,.6,.42)));
        g.add(põe(gira(cil(.2,.2,.35,COR.aluminio,18,.6,.42),PI2,0,0),-(L/2-.6),1.95,1.85));
        return g; })(), entrada:[0,0,6] }),

    volante: () => ({ obj: (()=>{
        const g = grupo(
          põe(gira(cil(.98,.98,.22,COR.ferro,44,.8,.45),0,0,PI2),xVol,Y_VIRA,0),
          põe(gira(cil(.32,.32,.28,COR.aco,24,.9,.35),0,0,PI2),xVol-.05,Y_VIRA,0));
        for(let k=0;k<6;k++){ const a=k*Math.PI/3;
          g.add(põe(gira(parafuso(),0,0,PI2),xVol-.14,Y_VIRA+Math.cos(a)*.55,Math.sin(a)*.55)); }
        const dentes = new THREE.Group();
        cremalheira(dentes, 1.02, 0);
        dentes.rotation.y = PI2;
        dentes.position.set(xVol, Y_VIRA, 0);
        g.add(dentes);
        return g; })(),
      entrada:[-6,0,0], animar:(o,t)=>{ o.rotation.x = t; } }),
  };
}

// =========================================
// EM V (e em W) — bancos inclinados sobre o mesmo virabrequim
// =========================================
function geoV(n, grausTotal, qtdBancos) {
  const bancos = qtdBancos || 2;
  const porBanco = n / bancos;
  const xs   = [...Array(porBanco)].map((_, i) => (i - (porBanco - 1) / 2) * .85);
  const L    = porBanco * .85 + .5;
  const meia = L / 2;
  const a    = grausTotal * Math.PI / 180 / 2;
  // dois bancos: ±metade do V. Quatro bancos (W): dois pares bem juntos.
  const angulos = bancos === 2 ? [a, -a] : [a, a - .26, -a + .26, -a];

  // ponto (y,z) de um alvo local (0, y) depois de inclinar o banco
  const noBanco = (ang, y, z) => [y * Math.cos(ang) - (z||0) * Math.sin(ang),
                                  y * Math.sin(ang) + (z||0) * Math.cos(ang)];

  const construir = fn => {
    const g = new THREE.Group();
    angulos.forEach((ang, k) => {
      const b = new THREE.Group();
      b.rotation.x = ang;
      fn(b, k, ang);
      g.add(b);
    });
    return g;
  };

  return {
    bloco: () => ({ obj: (()=>{
        const g = construir(b => {
          b.add(põe(caixa(L,1.5,1.3,COR.ferro,.75,.5),0,1.2,0));
          xs.forEach(x=>b.add(põe(cil(.4,.4,1.35,COR.escuro,20,.6,.6),x,1.2,0)));
          xs.forEach(x=>b.add(põe(gira(cil(.14,.14,.06,COR.aco,16,.8,.4),PI2,0,0),x,1.0,.68)));
        });
        g.add(põe(caixa(L,1.1,2.1,COR.ferro,.75,.5),0,-.15,0));      // cárter estrutural
        g.add(põe(caixa(.16,2.0,2.2,COR.aluminio,.6,.45),-(meia+.06),.1,0));   // flange do câmbio
        return g; })(), entrada:[0,-5,0] }),

    virabrequim: () => ({ obj: (()=>{
        const g = virabrequimX(xs, .3, i => i * Math.PI * 2 / porBanco, L + .6);
        g.add(põe(polia(.36,.18,COR.ferro), meia + .32, 0, 0));
        return g; })(), entrada:[0,-5,0], animar:(o,t)=>{ o.rotation.x = t; } }),

    pistoes: () => {
      const moveis = [];
      const g = construir((b, k) => {
        xs.forEach((x,i)=>{
          const alto = ((i + k) % 2) === 0;
          const pist = põe(pistao(.36, COR.aluminio),x,alto?1.5:1.1,0);
          const haste = põe(biela(.9, COR.bronze),x,alto?.62:.22,0);
          b.add(pist); b.add(haste);
          moveis.push({pist, biela: haste, fase:(i+k)%2 ? Math.PI : 0, bp:1.3, bb:.42});
        });
      });
      return { obj:g, entrada:[0,5,0], animar:(o,t)=>{
        moveis.forEach(m=>{
          const d = Math.cos(t + m.fase) * .26;
          m.pist.position.y = m.bp + d; m.biela.position.y = m.bb + d;
        });
      }};
    },

    carteroleo: () => ({ obj: grupo(
        põe(caixa(L-.2,.85,1.8,COR.aco,.7,.5),0,-1.15,0),
        põe(cil(.12,.12,.2,COR.escuro,12),meia-.5,-1.6,0)
      ), entrada:[0,-5,0] }),

    juntas: () => ({ obj: construir(b =>
        b.add(põe(caixa(L,.08,1.32,COR.vermelho,.3,.6),0,1.98,0))
      ), entrada:[0,5,0] }),

    cabecotes: () => ({ obj: construir(b => {
        b.add(põe(caixa(L,.8,1.32,COR.aluminio,.65,.42),0,2.4,0));
        [...Array(porBanco+1)].map((_,i)=>(i-porBanco/2)*.85)
          .forEach(x=>[-.55,.55].forEach(z=>b.add(põe(parafuso(),x,2.82,z))));
        b.add(põe(caixa(L-.12,.28,1.1,COR.aluminio,.5,.5),0,3.15,0));   // tampa de válvulas
      }), entrada:[0,6,0] }),

    comandos: () => ({ obj: construir(b => {
        b.add(comandoX(xs, L + .1, 2.95, 0));
        b.add(valvulas(xs, 2.05, COR.aco));
      }), entrada:[0,6,0], animar:(o,t)=>{ o.children.forEach(b=>{ b.children[0].rotation.x = t/2; }); } }),

    corrente: () => ({ obj: (()=>{
        const g = new THREE.Group();
        const x = meia + .12;
        const pontos = [[0,0]];
        angulos.slice(0,2).forEach(ang => pontos.push(noBanco(ang, 2.9)));
        g.add(põe(gira(new THREE.Mesh(new THREE.TorusGeometry(.34,.07,10,26), mat(COR.escuro,.4,.6)),0,PI2,0),x,0,0));
        pontos.slice(1).forEach(p=>
          g.add(põe(gira(new THREE.Mesh(new THREE.TorusGeometry(.26,.06,10,24), mat(COR.escuro,.4,.6)),0,PI2,0),x,p[0],p[1])));
        for (let i = 0; i < pontos.length; i++)
          g.add(elo(pontos[i], pontos[(i+1)%pontos.length], x, COR.escuro));
        return g; })(), entrada:[6,0,0] }),

    bomba: () => ({ obj: grupo(
        põe(gira(cil(.36,.36,.45,COR.azul,20,.4,.4),0,0,PI2),-(meia+.28),.2,0)
      ), entrada:[-5,0,0] }),

    velas: () => ({ obj: construir(b =>
        xs.forEach(x=>b.add(põe(vela(),x,2.62,.42)))
      ), entrada:[0,6,0] }),

    coletor: () => ({ obj: (()=>{
        const alto = noBanco(angulos[0], 2.75)[0] + .3;
        const g = grupo(põe(caixa(L-.4,.5,1.3,COR.aluminio,.6,.4),0,alto,0));
        // corredores curvos descendo do plenum para cada banco
        angulos.forEach(ang => xs.forEach(x => {
          const meio = noBanco(ang, 2.75, .45);
          const boca = noBanco(ang, 2.45, .5);
          g.add(tuboCurvo([[x, alto - .22, Math.sign(meio[1]) * .2],
                           [x, (alto + meio[0]) / 2, meio[1] * .8],
                           [x, boca[0], boca[1]]], .11, COR.aluminio, .6, .42));
        }));
        return g; })(), entrada:[0,7,0] }),

    escape: () => ({ obj: construir(b => {
        // cada cilindro sai por um tubo curvo até o coletor, que corre
        // por fora do banco — não uma vareta reta atravessando o motor
        xs.forEach(x => b.add(tuboCurvo([[x,2.35,-.62],[x,2.2,-.95],[x,1.95,-1.18]],.12,COR.escuro,.6,.5)));
        b.add(põe(gira(cil(.15,.15,L*.95,COR.escuro,16,.6,.5),0,0,PI2),0,1.95,-1.18));
        b.add(põe(gira(cil(.17,.17,.45,COR.escuro,16,.6,.5),0,0,PI2),-(L/2+.18),1.95,-1.18));
      }), entrada:[0,0,-7] }),

    volante: () => ({ obj: (()=>{
        const xv = -(meia + .35);
        const g = grupo(
          põe(gira(cil(1.0,1.0,.24,COR.ferro,44,.8,.45),0,0,PI2),xv,0,0),
          põe(gira(cil(.34,.34,.3,COR.aco,24,.9,.35),0,0,PI2),xv-.06,0,0));
        for(let k=0;k<6;k++){ const ang=k*Math.PI/3;
          g.add(põe(gira(parafuso(),0,0,PI2),xv-.15,Math.cos(ang)*.56,Math.sin(ang)*.56)); }
        const dentes = new THREE.Group();
        cremalheira(dentes, 1.04, 0);
        dentes.rotation.y = PI2;
        dentes.position.set(xv, 0, 0);
        g.add(dentes);
        return g; })(),
      entrada:[-6,0,0], animar:(o,t)=>{ o.rotation.x = t; } }),
  };
}

// =========================================
// BOXER — virabrequim no eixo Z, cilindros deitados no eixo X
// =========================================
function geoBoxer(n, ar) {
  const pares = [...Array(n)].map((_, i) => [i % 2 ? 1 : -1, (i - (n - 1) / 2) * .63]);
  const C     = n * .63 + .5;                 // comprimento do cárter
  const meia  = C / 2;
  const zVol  = -(meia + .35), zVent = meia + .5;
  const ladoZ = lado => pares.filter(p => p[0] === lado).map(p => p[1]);

  const comum = {
    carter: () => ({ obj: (()=>{
        const g = grupo(caixa(2.0,1.5,C,COR.aluminio,.7,.45));
        g.add(põe(caixa(2.12,.1,C+.12,COR.aco,.8,.4),0,0,0));
        [-1,1].forEach(lado=>pares.map(p=>p[1]).forEach(z=>
          g.add(põe(gira(parafuso(),0,0,PI2),lado*1.09,0,z))));
        return g; })(), entrada:[0,-4,0] }),

    virabrequim: () => ({ obj: (()=>{
        // o virabrequim é construído no eixo X e deitado no Z do boxer
        const eixo = virabrequimX(pares.map(p => -p[1]), .3, i => i * Math.PI, C + .4);
        eixo.rotation.y = PI2;
        return grupo(eixo); })(),
      entrada:[0,0,-5], animar:(o,t)=>{ o.rotation.z = t; } }),

    bielas: () => {
      const g = new THREE.Group(); const moveis = [];
      pares.forEach(([lado,z])=>{
        const pist = põe(gira(pistao(.42, COR.aluminio),0,0,-lado*PI2),lado*1.35,0,z);
        const haste = põe(gira(biela(.95, COR.bronze),0,0,-lado*PI2),lado*.42,0,z);
        g.add(pist); g.add(haste);
        moveis.push({pist, biela: haste, lado, bp:lado*1.35, bb:lado*.42});
      });
      return { obj:g, entrada:[0,4,0], animar:(o,t)=>{
        const d = Math.cos(t) * .32;
        moveis.forEach(m=>{ m.pist.position.x = m.bp + m.lado*d; m.biela.position.x = m.bb + m.lado*d*.5; });
      }};
    },

    volante: () => ({ obj: (()=>{
        const g = grupo(
          põe(gira(cil(1.02,1.02,.24,COR.ferro,44,.8,.45),PI2,0,0),0,0,zVol),
          põe(gira(cil(.4,.4,.3,COR.aco,24),PI2,0,0),0,0,zVol-.05));
        for(let k=0;k<6;k++){ const ang=k*Math.PI/3;
          g.add(põe(gira(parafuso(),PI2,0,0),Math.cos(ang)*.62,Math.sin(ang)*.62,zVol+.13)); }
        return cremalheira(g, 1.06, zVol); })(),
      entrada:[0,0,-6], animar:(o,t)=>{ o.rotation.z = t; } }),

    velas: () => ({ obj: (()=>{
        const g = new THREE.Group();
        pares.forEach(([lado,z])=>
          g.add(põe(gira(vela(),0,0,-lado*PI2),lado*2.75,.2,z)));
        return g; })(), entrada:[8,0,0] }),
  };

  if (ar) return {
    carter: comum.carter,
    virabrequim: comum.virabrequim,
    comando: () => ({ obj: (()=>{
        const g = grupo(põe(gira(cil(.1,.1,C-.1,COR.escuro),PI2,0,0),0,-.52,0));
        pares.forEach(([,z])=>g.add(põe(gira(cil(.19,.19,.16,COR.aco),PI2,0,0),0,-.52,z)));
        return g; })(), entrada:[0,-4,0], animar:(o,t)=>{ o.rotation.z = t/2; } }),
    bielas: comum.bielas,
    cilindros: () => ({ obj: (()=>{
        const g = new THREE.Group();
        pares.forEach(([lado,z])=>{
          g.add(põe(gira(cil(.5,.5,1.5,COR.ferro,20,.75,.5),0,0,PI2),lado*1.75,0,z));
          for(let k=0;k<8;k++)
            g.add(põe(gira(cil(.65,.65,.05,COR.ferro,20,.7,.55),0,0,PI2),lado*(1.1+k*.2),0,z));
        });
        return g; })(), entrada:[6,0,0] }),
    cabecotes: () => ({ obj: (()=>{
        const g = new THREE.Group();
        [-1,1].forEach(lado=>{
          const zs = ladoZ(lado), z0 = (zs[0]+zs[zs.length-1])/2, prof = (zs.length-1)*1.26 + 1.3;
          g.add(põe(caixa(.55,1.5,prof,COR.aluminio,.6,.42),lado*2.75,0,z0));
          for(let k=0;k<4;k++)
            g.add(põe(caixa(.13,.07,prof-.2,COR.aluminio,.55,.5),lado*3.06,-.5+k*.33,z0));
          zs.forEach(z=>[-.55,.55].forEach(y=>
            g.add(põe(gira(parafuso(),0,0,PI2),lado*3.06,y,z))));
        });
        return g; })(), entrada:[7,0,0] }),
    balancins: () => ({ obj: (()=>{
        const g = new THREE.Group();
        [-1,1].forEach(lado=>{
          g.add(põe(gira(cil(.05,.05,C-.6,COR.vermelho,12,.5,.5),0,0,PI2),lado*1.7,.72,0));
          ladoZ(lado).forEach(z=>g.add(põe(caixa(.5,.16,.2,COR.vermelho,.6,.4),lado*2.75,.85,z)));
        });
        return g; })(), entrada:[0,5,0] }),
    volante: comum.volante,
    ventoinha: () => ({ obj: (()=>{
        const g = grupo(
          põe(gira(cil(.85,.85,.16,COR.aluminio,40,.7,.4),PI2,0,0),0,.15,zVent),
          põe(gira(cil(.3,.3,.36,COR.aco,26,.9,.3),PI2,0,0),0,.15,zVent+.22),
          põe(new THREE.Mesh(new THREE.TorusGeometry(.86,.05,10,44), mat(COR.aluminio,.7,.4)),0,.15,zVent+.06));
        for(let k=0;k<10;k++){
          const ang=k*Math.PI/5;
          g.add(põe(gira(caixa(.14,.5,.1,COR.aluminio,.6,.45),0,0,ang),Math.sin(ang)*.5,.15+Math.cos(ang)*.5,zVent+.1));
        }
        return g; })(), entrada:[0,0,6], animar:(o,t)=>{ o.rotation.z = t*1.4; } }),
    distribuidor: () => ({ obj: grupo(
        põe(cil(.24,.24,.6,COR.escuro,20,.4,.6),.55,1.05,-.6),
        põe(cil(.3,.3,.14,COR.escuro,20,.4,.6),.55,1.4,-.6)
      ), entrada:[0,5,0] }),
    velas: comum.velas,
    carburador: () => ({ obj: grupo(
        põe(caixa(.7,.45,.6,COR.cobre,.55,.45),0,1.1,.35),
        põe(cil(.22,.22,.35,COR.cobre,18,.55,.45),0,1.45,.35)
      ), entrada:[0,5,0] }),
  };

  // ---- boxer refrigerado a água ----
  return {
    carter: comum.carter,
    virabrequim: comum.virabrequim,
    bielas: comum.bielas,
    cilindros: () => ({ obj: (()=>{
        const g = new THREE.Group();
        pares.forEach(([lado,z])=>{
          const t = tubo(.62,.5,1.5,COR.ferro,.7,.5);
          t.rotation.y = PI2; t.position.set(lado*1.75,0,z); g.add(t);
          g.add(põe(gira(cil(.68,.68,.12,COR.azul,24,.4,.5),0,0,PI2),lado*1.75,0,z));
        });
        return g; })(), entrada:[6,0,0] }),
    juntas: () => ({ obj: (()=>{
        const g = new THREE.Group();
        pares.forEach(([lado,z])=>
          g.add(põe(gira(cil(.66,.66,.07,COR.vermelho,24,.3,.6),0,0,PI2),lado*2.45,0,z)));
        return g; })(), entrada:[7,0,0] }),
    cabecotes: () => ({ obj: (()=>{
        const g = new THREE.Group();
        [-1,1].forEach(lado=>{
          const zs = ladoZ(lado), z0 = (zs[0]+zs[zs.length-1])/2, prof = (zs.length-1)*1.26 + 1.3;
          g.add(põe(caixa(.7,1.5,prof,COR.aluminio,.6,.42),lado*2.85,0,z0));
          zs.forEach(z=>[-.55,.55].forEach(y=>
            g.add(põe(gira(parafuso(),0,0,PI2),lado*3.22,y,z))));
        });
        return g; })(), entrada:[7,0,0] }),
    comandos: () => ({ obj: (()=>{
        const g = new THREE.Group();
        [-1,1].forEach(lado=>{
          const eixo = comandoX(ladoZ(lado).map(z=>-z), C - .4, 0, 0);
          eixo.rotation.y = PI2;
          eixo.position.set(lado*2.85, .62, 0);
          g.add(eixo);
          const v = valvulas(ladoZ(lado).map(z=>-z), 0, COR.aco);
          v.rotation.y = PI2; v.rotation.z = -lado*PI2;
          v.position.set(lado*2.35, .1, 0);
          g.add(v);
        });
        return g; })(), entrada:[0,5,0] }),
    correia: () => ({ obj: (()=>{
        const g = new THREE.Group();
        const z = meia + .18;
        const pontos = [[0,0],[.62,-2.85],[.62,2.85]];
        g.add(põe(gira(new THREE.Mesh(new THREE.TorusGeometry(.34,.07,10,26), mat(COR.escuro,.3,.7)),0,0,0),0,0,z));
        pontos.slice(1).forEach(p=>
          g.add(põe(new THREE.Mesh(new THREE.TorusGeometry(.26,.06,10,24), mat(COR.escuro,.3,.7)),p[1],p[0],z)));
        for (let i = 0; i < pontos.length; i++) {
          const a = pontos[i], b = pontos[(i+1)%pontos.length];
          const c = caixa(Math.hypot(b[1]-a[1], b[0]-a[0]),.07,.13,COR.escuro,.2,.8);
          c.position.set((a[1]+b[1])/2,(a[0]+b[0])/2,z);
          c.rotation.z = Math.atan2(b[0]-a[0], b[1]-a[1]);
          g.add(c);
        }
        return g; })(), entrada:[0,0,6] }),
    bomba: () => ({ obj: grupo(
        põe(gira(cil(.34,.34,.4,COR.azul,20,.4,.4),PI2,0,0),0,-1.05,meia+.25)
      ), entrada:[0,0,5] }),
    velas: comum.velas,
    coletor: () => ({ obj: (()=>{
        const g = grupo(põe(caixa(3.4,.4,.9,COR.aluminio,.6,.4),0,1.25,0));
        pares.forEach(([lado,z])=>
          g.add(põe(gira(cil(.13,.13,1.4,COR.aluminio,12,.6,.4),0,0,PI2),lado*2.1,1.0,z)));
        return g; })(), entrada:[0,6,0] }),
    volante: comum.volante,
  };
}

// =========================================
// ROTATIVO (Wankel) — eixo no Z, câmaras enfileiradas
// =========================================
function geoRotativo(n) {
  const ESP = 1.1;                                  // espessura de cada câmara
  const zs  = [...Array(n)].map((_, i) => (i - (n - 1) / 2) * (ESP + .35));
  const zPlacas = [zs[0] - ESP/2 - .17, zs[n-1] + ESP/2 + .17];
  const R = 1.0, EXC = .55;    // proporção que deixa a cintura do "amendoim" à vista
  const RAIO = R + EXC;        // maior raio da carcaça; o rotor gira com as pontas em R

  // parede epitrocoide da carcaça
  const trocoide = (escala) => {
    const f = new THREE.Shape();
    for (let k = 0; k <= 90; k++) {
      const th = k / 90 * Math.PI * 2;
      const x = (R * Math.cos(th) + EXC * Math.cos(3 * th)) * escala;
      const y = (R * Math.sin(th) + EXC * Math.sin(3 * th)) * escala;
      k ? f.lineTo(x, y) : f.moveTo(x, y);
    }
    return f;
  };

  // rotor: triângulo de flancos levemente abaulados, com as três pontas
  // na mesma distância do centro que o raio da trocoide
  const rotorShape = (r) => {
    const v = [90, 210, 330].map(g => [Math.cos(g*Math.PI/180)*r, Math.sin(g*Math.PI/180)*r]);
    const f = new THREE.Shape();
    f.moveTo(v[0][0], v[0][1]);
    for (let k = 0; k < 3; k++) {
      const a = v[k], b = v[(k+1)%3];
      const mx = (a[0]+b[0])/2, my = (a[1]+b[1])/2;
      f.quadraticCurveTo(mx*1.55, my*1.55, b[0], b[1]);   // abaulamento do flanco
    }
    return f;
  };

  const placa = (z) => {
    const f = trocoide(1.09);
    const g = new THREE.ExtrudeGeometry(f, { depth:.3, curveSegments:6, steps:1, bevelEnabled:false });
    g.translate(0,0,-.15);
    const m = new THREE.Mesh(g, mat(COR.aluminio,.55,.45));
    m.position.z = z;
    return m;
  };

  return {
    placaTras: () => ({ obj: placa(zPlacas[0]), entrada:[0,0,-6] }),

    eixo: () => ({ obj: (()=>{
        const g = grupo(gira(cil(.24,.24,(zs[n-1]-zs[0])+ESP+1.4,COR.aco,26),PI2,0,0));
        zs.forEach((z,i)=>{
          const ang = i * Math.PI * 2 / n;
          g.add(põe(gira(cil(.42,.42,ESP*.7,COR.ferro,26),PI2,0,0),
                    Math.cos(ang)*EXC, Math.sin(ang)*EXC, z));
        });
        return g; })(), entrada:[0,0,-6], animar:(o,t)=>{ o.rotation.z = t; } }),

    rotores: () => {
      const g = new THREE.Group(); const moveis = [];
      zs.forEach((z,i)=>{
        const geo = new THREE.ExtrudeGeometry(rotorShape(R * .96),
          { depth:ESP, curveSegments:10, steps:1, bevelEnabled:true,
            bevelThickness:.05, bevelSize:.05, bevelSegments:1 });
        geo.translate(0,0,-ESP/2);
        const m = new THREE.Mesh(geo, mat(COR.ferro,.5,.5));
        m.position.z = z;
        g.add(m);
        moveis.push({ m, fase: i * Math.PI * 2 / n });
      });
      return { obj:g, entrada:[0,0,6], animar:(o,t)=>{
        // o rotor gira a 1/3 da rotação do excêntrico, orbitando em volta dele
        moveis.forEach(r=>{
          r.m.rotation.z = -(t + r.fase) / 3;
          r.m.position.x = Math.cos(t + r.fase) * EXC;
          r.m.position.y = Math.sin(t + r.fase) * EXC;
        });
      }};
    },

    engrenagem: () => ({ obj: (()=>{
        const g = new THREE.Group();
        zs.forEach(z=>{ const e = engrenagem(.34,16,.16,COR.aco); e.position.z = z - ESP/2 - .1; g.add(e); });
        return g; })(), entrada:[0,0,-6] }),

    vedacoes: () => ({ obj: (()=>{
        const g = new THREE.Group();
        zs.forEach(z=>[90,210,330].forEach(gr=>{
          const a = gr*Math.PI/180;
          g.add(gira(põe(caixa(.09,.16,ESP,COR.amarelo,.8,.35),
                         Math.cos(a)*(R*.96), Math.sin(a)*(R*.96), z), 0,0,a));
        }));
        return g; })(), entrada:[0,5,0] }),

    carcaca: () => ({ obj: (()=>{
        const g = new THREE.Group();
        zs.forEach(z=>{
          const f = trocoide(1.09);
          const furo = new THREE.Path();
          for (let k = 90; k >= 0; k--) {
            const th = k / 90 * Math.PI * 2;
            const x = R * Math.cos(th) + EXC * Math.cos(3 * th);
            const y = R * Math.sin(th) + EXC * Math.sin(3 * th);
            k === 90 ? furo.moveTo(x, y) : furo.lineTo(x, y);
          }
          f.holes.push(furo);
          const geo = new THREE.ExtrudeGeometry(f, { depth:ESP, curveSegments:6, steps:1, bevelEnabled:false });
          geo.translate(0,0,-ESP/2);
          const m = new THREE.Mesh(geo, mat(COR.aluminio,.6,.45));
          m.position.z = z;
          g.add(m);
        });
        return g; })(), entrada:[0,6,0] }),

    placaFrente: () => ({ obj: placa(zPlacas[1]), entrada:[0,0,6] }),

    admissao: () => ({ obj: (()=>{
        const g = grupo(põe(caixa(.6,.5,(zs[n-1]-zs[0])+ESP,COR.cobre,.55,.45),-1.6,.5,0));
        zs.forEach(z=>g.add(põe(gira(cil(.16,.16,.7,COR.cobre,14,.55,.45),0,0,PI2),-1.25,.5,z)));
        return g; })(), entrada:[-6,0,0] }),

    escape: () => ({ obj: (()=>{
        const g = new THREE.Group();
        zs.forEach(z=>g.add(põe(gira(cil(.13,.13,.7,COR.escuro,16,.6,.5),0,0,PI2),RAIO+.15,-.28,z)));
        g.add(põe(gira(cil(.16,.16,(zs[n-1]-zs[0])+ESP,COR.escuro,16,.6,.5),PI2,0,0),RAIO+.45,-.28,0));
        return g; })(), entrada:[6,0,0] }),

    velas: () => ({ obj: (()=>{
        const g = new THREE.Group();
        zs.forEach(z=>[-.24,.24].forEach(dy=>
          g.add(põe(gira(cil(.08,.08,.45,COR.amarelo,14,.5,.4),0,0,PI2),-(RAIO+.05),dy,z))));
        return g; })(), entrada:[-7,0,0] }),

    volante: () => ({ obj: (()=>{
        const zv = zPlacas[0] - .4;
        const g = grupo(
          põe(gira(cil(.95,.95,.22,COR.ferro,44,.8,.45),PI2,0,0),0,0,zv),
          põe(gira(cil(.3,.3,.28,COR.aco,24,.9,.35),PI2,0,0),0,0,zv-.05));
        return cremalheira(g, .99, zv); })(),
      entrada:[0,0,-7], animar:(o,t)=>{ o.rotation.z = t; } }),
  };
}

// =========================================
// ELÉTRICO — eixo no X
// =========================================
function geoEletrico() {
  const eixoX = m => { m.rotation.y = PI2; return m; };
  return {
    carcaca: () => ({ obj: (()=>{
        const g = new THREE.Group();
        g.add(eixoX(tubo(1.45,1.25,2.0,COR.aluminio,.55,.45)));
        for(let k=0;k<24;k++){ const a=k*Math.PI/12;   // aletas de arrefecimento
          g.add(gira(põe(caixa(1.9,.1,.16,COR.aluminio,.55,.5),0,Math.sin(a)*1.5,Math.cos(a)*1.5),a,0,0)); }
        return g; })(), entrada:[0,-5,0] }),

    estator: () => ({ obj: (()=>{
        const g = new THREE.Group();
        g.add(eixoX(tubo(1.22,.78,1.7,COR.aco,.75,.45)));
        for(let k=0;k<18;k++){ const a=k*Math.PI/9;    // bobinas de cobre
          g.add(gira(põe(caixa(1.85,.2,.14,COR.cobre,.6,.4),0,Math.sin(a)*.9,Math.cos(a)*.9),a,0,0)); }
        return g; })(), entrada:[6,0,0] }),

    eixo: () => ({ obj: grupo(
        gira(cil(.2,.2,3.6,COR.aco,26,.9,.3),0,0,PI2)
      ), entrada:[6,0,0], animar:(o,t)=>{ o.rotation.x = t*2; } }),

    rotor: () => ({ obj: (()=>{
        const g = new THREE.Group();
        g.add(põe(gira(cil(.72,.72,1.6,COR.ferro,36,.8,.45),0,0,PI2),0,0,0));
        return g; })(), entrada:[6,0,0], animar:(o,t)=>{ o.rotation.x = t*2; } }),

    imas: () => ({ obj: (()=>{
        const g = new THREE.Group();
        for(let k=0;k<12;k++){ const a=k*Math.PI/6;
          g.add(gira(põe(caixa(1.5,.16,.34,k%2?COR.vermelho:COR.escuro,.5,.5),
                         0,Math.sin(a)*.6,Math.cos(a)*.6),a,0,0)); }
        return g; })(), entrada:[0,5,0], animar:(o,t)=>{ o.rotation.x = t*2; } }),

    rolamentos: () => ({ obj: (()=>{
        const g = new THREE.Group();
        [-1.05,1.05].forEach(x=>
          g.add(põe(gira(new THREE.Mesh(new THREE.TorusGeometry(.34,.11,12,30), mat(COR.aco,.9,.3)),0,PI2,0),x,0,0)));
        return g; })(), entrada:[6,0,0] }),

    sensor: () => ({ obj: grupo(
        põe(gira(cil(.42,.42,.14,COR.azul,26,.5,.5),0,0,PI2),-1.25,0,0)
      ), entrada:[-5,0,0] }),

    tampa: () => ({ obj: (()=>{
        const g = grupo(põe(gira(cil(1.45,1.45,.16,COR.aluminio,36,.55,.45),0,0,PI2),-1.12,0,0));
        for(let k=0;k<6;k++){ const a=k*Math.PI/3;
          g.add(põe(gira(parafuso(),0,0,PI2),-1.2,Math.sin(a)*1.25,Math.cos(a)*1.25)); }
        return g; })(), entrada:[-6,0,0] }),

    inversor: () => ({ obj: (()=>{
        const g = grupo(põe(caixa(1.7,.55,1.3,COR.escuro,.5,.5),0,1.85,0));
        [-.5,0,.5].forEach(z=>g.add(põe(gira(cil(.11,.11,.5,COR.cobre,14,.7,.4),0,0,PI2),-1.0,1.7,z)));
        return g; })(), entrada:[0,6,0] }),

    reducao: () => ({ obj: (()=>{
        const g = new THREE.Group();
        const a = engrenagem(.5,20,.3,COR.aco);  a.rotation.y = PI2; a.position.set(1.75,0,0);
        const b = engrenagem(.85,32,.3,COR.ferro); b.rotation.y = PI2; b.position.set(1.75,-1.2,0);
        g.add(a); g.add(b);
        return g; })(), entrada:[6,0,0], animar:(o,t)=>{
        o.children[0].rotation.x = t*2; o.children[1].rotation.x = -t*1.2; } }),
  };
}

// =========================================
// CATÁLOGO DE GEOMETRIAS
// =========================================
const geo3d = { eletrico: geoEletrico() };

[2, 4, 6, 12].forEach(n => { geo3d['boxerAr' + (n === 4 ? '' : n)] = geoBoxer(n, true); });
[2, 4, 6, 12].forEach(n => { geo3d['boxer' + n] = geoBoxer(n, false); });

[2, 3, 4, 5, 6].forEach(n => { geo3d['linha' + n] = geoLinha(n); });
// ângulo do V: quanto mais cilindros, mais aberto costuma ser
[[4, 72], [6, 60], [8, 90], [10, 72], [12, 60], [16, 45]]
  .forEach(([n, ang]) => { geo3d['v' + n] = geoV(n, ang); });
[8, 12, 16].forEach(n => { geo3d['w' + n] = geoV(n, 72, 4); });
[1, 2, 3, 4].forEach(n => { geo3d['rotativo' + n] = geoRotativo(n); });

// =========================================
// CENA
// =========================================
let cena, camera, renderer, raiz, animId, arrastando=false, ultimo={x:0,y:0};
let pecasNaCena=[], ligado=false, giroMotor=0, explodeAlvo=0, explodeAtual=0;
let giroY=.85, giroX=.38, autoGiro=true, tweens=[];
// o zoom é um multiplicador do enquadramento automático: 1 = motor inteiro na tela
let zoomF=1, alvo=new THREE.Vector3(0,0,0), ZOOM_MIN=.28, ZOOM_MAX=4.5;

let observador = null;

// -----------------------------------------
// Ambiente de estúdio.
// Metal só parece metal quando tem o que refletir. Em vez de baixar
// um HDRI, monto um "estúdio" de caixas luminosas e deixo o Three
// transformar isso no mapa de reflexo da cena.
// -----------------------------------------
let mapaAmbiente = null;

function ambienteEstudio() {
  if (mapaAmbiente) return mapaAmbiente;

  const est = new THREE.Scene();
  const painel = (l, a, p, cor, x, y, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(l, a, p),
                             new THREE.MeshBasicMaterial({ color: cor }));
    m.position.set(x, y, z);
    est.add(m);
  };

  est.add(new THREE.Mesh(new THREE.BoxGeometry(24, 16, 24),
          new THREE.MeshBasicMaterial({ color: 0x6b7686, side: THREE.BackSide })));
  painel(11, .5, 11, 0xffffff, 0,  7.2, 0);    // luz principal, no teto
  painel(.5, 8, 12, 0xd9e6ff, -9.4, 1, 0);     // rebatedor frio de um lado
  painel(.5, 8, 12, 0xffdcb4,  9.4, 1, 0);     // rebatedor quente do outro
  painel(12, 6, .5, 0xc3cedd, 0, 1, -9.4);     // contraluz atrás
  painel(14, .5, 14, 0x555f6f, 0, -7.2, 0);    // chão escuro, para o metal ter contraste

  const pmrem = new THREE.PMREMGenerator(renderer);
  const alvo = pmrem.fromScene(est, .05);
  pmrem.dispose();
  est.traverse(o => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) o.material.dispose();
  });

  mapaAmbiente = alvo.texture;
  return mapaAmbiente;
}

function criarCena(canvas) {
  renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;   // clareia sem estourar o branco
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  cena = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(42, 1, .1, 100);

  cena.environment = ambienteEstudio();
  cena.environmentIntensity = .95;

  cena.add(new THREE.HemisphereLight(0xdfe9ff, 0x424b59, .6));

  // luz principal: é ela que faz as sombras entre as peças
  const sol = new THREE.DirectionalLight(0xfff4e6, 1.7);
  sol.position.set(6, 9, 5);
  sol.castShadow = true;
  sol.shadow.mapSize.set(1024, 1024);
  sol.shadow.radius = 3;
  sol.shadow.bias = -0.0012;
  sol.shadow.normalBias = .02;
  const cs = sol.shadow.camera;
  cs.left = -9; cs.right = 9; cs.top = 9; cs.bottom = -9; cs.near = .5; cs.far = 40;
  cs.updateProjectionMatrix();
  cena.add(sol);

  const lado = new THREE.DirectionalLight(0xbfd4ff, .55);
  lado.position.set(-7, 1, -3); cena.add(lado);
  const contra = new THREE.DirectionalLight(0xffe8c4, .45);
  contra.position.set(0, -5, -7); cena.add(contra);

  raiz = new THREE.Group();
  cena.add(raiz);
  redimensionar(canvas);

  // o tamanho real do canvas só se estabiliza depois do layout;
  // acompanhar evita o motor sair do quadro em telas estreitas
  if (observador) observador.disconnect();
  if (window.ResizeObserver) {
    observador = new ResizeObserver(() => redimensionar(canvas));
    observador.observe(canvas);
  }
  requestAnimationFrame(() => redimensionar(canvas));
}

function redimensionar(canvas) {
  const w = canvas.clientWidth || 600;
  const h = canvas.clientHeight || 380;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

// distância em que o motor inteiro cabe na tela.
// mede a silhueta de verdade (largura e altura vistas pela câmera),
// e não uma esfera — assim o motor ocupa bem a tela em qualquer formato.
const _eixoFrente = new THREE.Vector3();
const _eixoLado   = new THREE.Vector3();
const _eixoCima   = new THREE.Vector3();
const _ponto      = new THREE.Vector3();
const CIMA        = new THREE.Vector3(0, 1, 0);

const _aux = new THREE.Vector3();

// Enquadramento fixo do motor inteiro.
// Na montagem peça por peça o palco começa vazio; sem isso a câmera
// enquadraria só a primeira peça e o motor iria encolhendo a cada encaixe.
const _medidas = new Map();
let enquadramentoFixo = null;

function medirArquitetura(arqId) {
  if (_medidas.has(arqId)) return _medidas.get(arqId);
  const temp = new THREE.Group();
  const pontos = [];
  Object.keys(geo3d[arqId] || {}).forEach(id => {
    const { obj } = geo3d[arqId][id]();
    temp.add(obj);
    const b = new THREE.Box3().setFromObject(obj);
    pontos.push({ p: b.getCenter(new THREE.Vector3()),
                  r: b.getSize(new THREE.Vector3()).length() / 2 });
  });
  temp.traverse(o => {
    if (o.geometry && !o.geometry.userData.compartilhada) o.geometry.dispose();
    if (o.material) o.material.dispose();
  });
  _medidas.set(arqId, pontos);
  return pontos;
}

function distanciaQueCabe() {
  _eixoFrente.set(Math.cos(giroX) * Math.sin(giroY), Math.sin(giroX), Math.cos(giroX) * Math.cos(giroY));
  _eixoLado.crossVectors(CIMA, _eixoFrente).normalize();
  _eixoCima.crossVectors(_eixoFrente, _eixoLado).normalize();

  let meiaLarg = .5, meiaAlt = .5;
  const medir = (ponto, raioP) => {
    _ponto.copy(ponto).sub(alvo);
    meiaLarg = Math.max(meiaLarg, Math.abs(_ponto.dot(_eixoLado)) + raioP);
    meiaAlt  = Math.max(meiaAlt,  Math.abs(_ponto.dot(_eixoCima)) + raioP);
  };

  // com a vista explodida aberta o tamanho muda, aí volta a medir ao vivo
  if (enquadramentoFixo && explodeAtual < .01) {
    enquadramentoFixo.forEach(m => medir(m.p, m.r));
  } else {
    pecasNaCena.forEach(p => medir(
      _aux.copy(p.base).addScaledVector(p.dir, explodeAtual * p.alcance).add(p.centro),
      p.raioPeca));
  }

  const vertical = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
  const horizontal = vertical * camera.aspect;
  return Math.max(meiaAlt / vertical, meiaLarg / horizontal) * 1.06;
}

function posicionarCamera() {
  const d = distanciaQueCabe() * zoomF;
  const mira = alvo.clone();
  camera.position.set(
    mira.x + d * Math.cos(giroX) * Math.sin(giroY),
    mira.y + d * Math.sin(giroX),
    mira.z + d * Math.cos(giroX) * Math.cos(giroY)
  );
  camera.lookAt(mira);
}

function laco() {
  animId = requestAnimationFrame(laco);
  if (autoGiro && !arrastando) giroY += .0016;

  // animações de encaixe
  const agora = performance.now();
  tweens = tweens.filter(t => {
    const k = Math.min((agora - t.t0) / t.dur, 1);
    const e = 1 - Math.pow(1 - k, 3);           // ease-out
    t.obj.position.lerpVectors(t.de, t.para, e);
    t.obj.scale.setScalar(.6 + .4 * e);
    t.obj.traverse(o => { if (o.material) o.material.opacity = e; });
    // peça encaixada volta a ser opaca de verdade, senão fica na fila
    // de transparência e passa a se desenhar fora de ordem
    if (k >= 1) t.obj.traverse(o => {
      if (o.material) { o.material.opacity = 1; o.material.transparent = false; o.material.needsUpdate = true; }
    });
    return k < 1;
  });

  // motor em funcionamento
  if (ligado) {
    giroMotor += .09;
    pecasNaCena.forEach(p => { if (p.mover) p.mover(p.obj, giroMotor); });
  }

  // vista explodida: as peças se afastam pela direção por onde entraram
  explodeAtual += (explodeAlvo - explodeAtual) * .12;
  if (Math.abs(explodeAlvo - explodeAtual) > .001) {
    pecasNaCena.forEach(p => {
      if (tweens.some(t => t.obj === p.obj)) return;   // não atropela quem está encaixando
      p.obj.position.copy(p.base).addScaledVector(p.dir, explodeAtual * p.alcance);
    });
  }

  posicionarCamera();
  renderer.render(cena, camera);

  if (aoProjetar && renderer) {
    if (quadros++ % 5 === 0) medirOclusao();   // roda já no primeiro quadro
    const larg = renderer.domElement.clientWidth, alt = renderer.domElement.clientHeight;
    const v = new THREE.Vector3();
    aoProjetar(pecasNaCena.map((p, i) => {
      v.copy(p.obj.position).add(p.ancora || p.centro).project(camera);
      return { i,
        x: (v.x * .5 + .5) * larg,
        y: (-v.y * .5 + .5) * alt,
        visivel: v.z < 1,
        tapada: !!p.tapada };
    }));
  }
}

// Quais peças estão realmente à vista? Sem isso, com o motor montado
// os números das peças internas se empilham todos no meio da tela.
const raio = new THREE.Raycaster();
const _ndc = new THREE.Vector2();
const _centroTela = new THREE.Vector3();
let quadros = 0;

function medirOclusao() {
  pecasNaCena.forEach(p => {
    p.tapada = true;
    // testa o centro e alguns pontos espalhados pela peça: basta um estar
    // à mostra para valer, e é nele que o rótulo se ancora
    for (const amostra of p.amostras) {
      _centroTela.copy(p.obj.position).add(amostra).project(camera);
      if (_centroTela.z >= 1) continue;
      _ndc.set(_centroTela.x, _centroTela.y);
      raio.setFromCamera(_ndc, camera);
      const batidas = raio.intersectObjects(raiz.children, true);
      let o = batidas.length ? batidas[0].object : null;
      while (o && o.parent !== raiz) o = o.parent;
      if (!o || o === p.obj) { p.tapada = false; p.ancora = amostra; break; }
    }
    if (p.tapada) p.ancora = p.centro;
  });
}

function montarPeca(arqId, pecaId, animar) {
  const fab = geo3d[arqId] && geo3d[arqId][pecaId];
  if (!fab) return;
  const { obj, entrada, animar: mover } = fab();
  const destino = obj.position.clone();
  raiz.add(obj);
  // centro da peça, usado para ancorar o rótulo na tela
  const caixaPeca = new THREE.Box3().setFromObject(obj);
  const cx = caixaPeca.getCenter(new THREE.Vector3()).sub(destino);
  const raioPeca = caixaPeca.getSize(new THREE.Vector3()).length() / 2;
  const materiais = [], malhas = [];
  obj.traverse(o => {
    if (o.material) materiais.push(o.material);
    if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; malhas.push(o); }
  });

  // pontos de referência da peça, para saber se ela está à vista
  const amostras = [cx.clone()];
  const salto = Math.max(1, Math.floor(malhas.length / 5));
  for (let k = 0; k < malhas.length && amostras.length < 6; k += salto) {
    amostras.push(new THREE.Box3().setFromObject(malhas[k])
                    .getCenter(new THREE.Vector3()).sub(destino));
  }
  // na vista explodida a peça sai para fora: manda-a na direção do próprio centro
  // (afasta radialmente, sem empilhar peças) com um empurrão na direção de montagem
  const radial = destino.clone().add(cx);
  const raio = radial.length();
  if (raio < .2) radial.copy(new THREE.Vector3(...entrada));
  const dir = radial.normalize().addScaledVector(new THREE.Vector3(...entrada).normalize(), .55).normalize();
  // quem já está mais para fora anda mais: assim as "camadas" do motor se separam
  const alcance = 1.0 + raio * 1.8;
  pecasNaCena.push({ obj, base: destino.clone(), dir, alcance, mover,
                     centro: cx, ancora: cx, amostras, raioPeca, materiais });

  if (animar) {
    obj.traverse(o => { if (o.material) { o.material.transparent = true; o.material.opacity = 0; } });
    tweens.push({
      obj,
      de: destino.clone().add(new THREE.Vector3(...entrada)),
      para: destino,
      t0: performance.now(),
      dur: 520
    });
  }
}

function limparCena() {
  if (!raiz) return;
  tweens = [];
  pecasNaCena = [];
  ligado = false; giroMotor = 0; explodeAlvo = 0; explodeAtual = 0;
  while (raiz.children.length) {
    const o = raiz.children.pop();
    o.traverse(c => {
      if (c.geometry && !c.geometry.userData.compartilhada) c.geometry.dispose();
      if (c.material) c.material.dispose();
    });
  }
}

let modoPan = false, pincaAnterior = 0;

function deslocar(dx, dy) {
  // move o alvo no plano da câmera, para o pan acompanhar o que se vê
  const dir = new THREE.Vector3(); camera.getWorldDirection(dir);
  const direita = new THREE.Vector3().crossVectors(dir, camera.up).normalize();
  const cima = new THREE.Vector3().crossVectors(direita, dir).normalize();
  const k = distanciaQueCabe() * zoomF * .0016;
  alvo.addScaledVector(direita, -dx * k).addScaledVector(cima, dy * k);
}

function aplicarZoom(fator) {
  zoomF = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, zoomF * fator));
  if (aoMudarZoom) aoMudarZoom(zoomPercentual());
}

const zoomPercentual = () => Math.round(100 / zoomF);
let aoMudarZoom = null, aoProjetar = null;

function ligarArrasto(canvas) {
  const inicio = e => {
    arrastando = true; autoGiro = false;
    modoPan = (e.button === 2 || e.button === 1 || e.shiftKey);
    const p = e.touches ? e.touches[0] : e;
    ultimo = { x:p.clientX, y:p.clientY };
  };
  const mover = e => {
    if (!arrastando) return;
    const p = e.touches ? e.touches[0] : e;
    const dx = p.clientX - ultimo.x, dy = p.clientY - ultimo.y;
    if (modoPan) {
      deslocar(dx, dy);
    } else {
      giroY -= dx * .008;
      giroX = Math.max(-1.35, Math.min(1.35, giroX + dy * .006));
    }
    ultimo = { x:p.clientX, y:p.clientY };
    if (e.cancelable) e.preventDefault();
  };
  const fim = () => { arrastando = false; modoPan = false; };

  canvas.addEventListener('pointerdown', inicio);
  window.addEventListener('pointermove', mover);
  window.addEventListener('pointerup', fim);
  canvas.addEventListener('contextmenu', e => e.preventDefault());

  canvas.addEventListener('wheel', e => {
    e.preventDefault(); autoGiro = false;
    aplicarZoom(e.deltaY > 0 ? 1.12 : 0.89);
  }, { passive:false });

  // toque: 1 dedo gira, 2 dedos dão zoom e deslocam
  canvas.addEventListener('touchstart', e => {
    autoGiro = false;
    if (e.touches.length === 2) {
      arrastando = false;
      pincaAnterior = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY);
      ultimo = { x:(e.touches[0].clientX+e.touches[1].clientX)/2,
                 y:(e.touches[0].clientY+e.touches[1].clientY)/2 };
    } else { inicio(e); }
  }, { passive:true });

  canvas.addEventListener('touchmove', e => {
    if (e.touches.length === 2) {
      const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY);
      if (pincaAnterior) aplicarZoom(pincaAnterior / d);
      pincaAnterior = d;
      const cx = (e.touches[0].clientX+e.touches[1].clientX)/2;
      const cy = (e.touches[0].clientY+e.touches[1].clientY)/2;
      deslocar(cx - ultimo.x, cy - ultimo.y);
      ultimo = { x:cx, y:cy };
      if (e.cancelable) e.preventDefault();
    } else { mover(e); }
  }, { passive:false });

  window.addEventListener('touchend', () => { fim(); pincaAnterior = 0; });
}

// =========================================
// API usada pelo montagem.js
// =========================================
window.Motor3D = {
  suportado() {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
               (c.getContext('webgl2') || c.getContext('webgl')));
    } catch (e) { return false; }
  },
  iniciar(canvas, arqId, atePasso) {
    this.parar();
    criarCena(canvas);
    ligarArrasto(canvas);
    autoGiro = true; giroY = .85; giroX = .38; zoomF = 1; alvo.set(0,0,0);
    // montando peça por peça: a câmera já enquadra o motor inteiro desde o começo
    enquadramentoFixo = (atePasso === undefined) ? null : medirArquitetura(arqId);
    const ids = Object.keys(geo3d[arqId] || {});
    const quantas = (atePasso === undefined) ? ids.length : atePasso;
    for (let i = 0; i < quantas; i++) montarPeca(arqId, ids[i], false);
    laco();
  },
  quantasPecas(arqId) { return Object.keys(geo3d[arqId] || {}).length; },
  aoProjetar(fn) { aoProjetar = fn; },
  destacar(indice) {
    pecasNaCena.forEach((p, i) => {
      const escolhida = (indice !== null && i === indice);
      const cheia = (indice === null || escolhida);
      p.materiais.forEach(m => {
        m.emissive && m.emissive.setHex(escolhida ? 0x7a1a12 : 0x000000);
        m.opacity = cheia ? 1 : .18;
        if (m.transparent !== !cheia) { m.transparent = !cheia; m.needsUpdate = true; }
        m.depthWrite = cheia;     // sem isso a peça apagada continua tapando o resto
      });
    });
  },
  encaixar(arqId, indice) {
    const ids = Object.keys(geo3d[arqId] || {});
    montarPeca(arqId, ids[indice], true);
    autoGiro = true;
  },
  ligar(v) { ligado = !!v; if (!v) { giroMotor = 0; pecasNaCena.forEach(p => { if (p.mover) p.mover(p.obj, 0); }); } return ligado; },
  explodir(v) { explodeAlvo = v ? 1 : 0; return !!v; },
  zoom(f) { aplicarZoom(f); return zoomPercentual(); },
  centralizar() { zoomF = 1; alvo.set(0,0,0); giroY = .85; giroX = .38; autoGiro = true;
                  if (aoMudarZoom) aoMudarZoom(zoomPercentual()); return 100; },
  aoZoom(fn) { aoMudarZoom = fn; },
  percentual() { return zoomPercentual(); },
  ajustar(canvas) { if (renderer) redimensionar(canvas); },
  parar() {
    if (observador) { observador.disconnect(); observador = null; }
    if (animId) cancelAnimationFrame(animId);
    animId = null;
    limparCena();
    if (renderer) { renderer.dispose(); renderer = null; }
  }
};
