// =========================================
// MONTAGEM DE MOTOR EM 3D
// Three.js local (vendor/), geometria feita com primitivas —
// sem modelos externos para baixar.
// =========================================
import * as THREE from './vendor/three.module.min.js';

const COR = {
  ferro:   0x6d7684,   // cilindros e bloco
  aluminio:0xd6dde6,   // cárter e cabeçotes
  aco:     0x8d97a5,   // virabrequim
  escuro:  0x333c49,   // comando, distribuidor
  cobre:   0xb1712c,
  vermelho:0xd93a2f,
  amarelo: 0xe8c33a,
  azul:    0x3aa7dd,
  bronze:  0x9a7b4f,   // bielas
};

const mat = (cor, metal = .85, rug = .38) =>
  new THREE.MeshStandardMaterial({ color: cor, metalness: metal, roughness: rug });

// atalhos de geometria
const caixa = (x,y,z,c,m,r) => new THREE.Mesh(new THREE.BoxGeometry(x,y,z), mat(c,m,r));
const cil   = (rt,rb,h,c,seg=24,m,r) => new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg), mat(c,m,r));
const grupo = (...fs) => { const g=new THREE.Group(); fs.forEach(f=>g.add(f)); return g; };
const põe   = (o,x,y,z) => { o.position.set(x,y,z); return o; };
const gira  = (o,x,y,z) => { o.rotation.set(x,y,z); return o; };

const PI2 = Math.PI/2;

// =========================================
// PEÇAS EM 3D, POR ARQUITETURA
// entrada = direção de onde a peça "voa" para o lugar
// =========================================
const geo3d = {

  // ---------- BOXER A AR: virabrequim no eixo Z, cilindros no eixo X ----------
  boxerAr: {
    carter: () => ({ obj: (()=>{
        const g = grupo(caixa(2.0,1.5,3.0,COR.aluminio,.7,.45));
        g.add(põe(caixa(2.05,.08,3.05,COR.aco,.8,.4),0,0,0));
        return g; })(), entrada:[0,-4,0] }),
    virabrequim: () => ({ obj: (()=>{
        const g = grupo(gira(cil(.16,.16,3.4,COR.aco),PI2,0,0));
        [-.95,-.32,.32,.95].forEach((z,i)=>{
          const off = i%2 ? .34 : -.34;
          g.add(põe(gira(cil(.34,.34,.22,COR.ferro),PI2,0,0),0,off,z));
        });
        return g; })(), entrada:[0,0,-5], animar:(o,t)=>{ o.rotation.z = t; } }),
    comando: () => ({ obj: grupo(
        põe(gira(cil(.1,.1,2.9,COR.escuro),PI2,0,0),0,-.52,0),
        ...[-.8,-.27,.27,.8].map(z=>põe(gira(cil(.19,.19,.16,COR.aco),PI2,0,0),0,-.52,z))
      ), entrada:[0,-4,0], animar:(o,t)=>{ o.rotation.z = t/2; } }),
    bielas: () => {
      const g = new THREE.Group(); const moveis = [];
      [[-1,-.95],[1,-.32],[-1,.32],[1,.95]].forEach(([lado,z])=>{
        const pist = põe(gira(cil(.42,.42,.42,COR.aluminio,20,.6,.35),0,0,PI2),lado*1.35,0,z);
        const biela= põe(gira(cil(.09,.09,1.0,COR.bronze),0,0,PI2),lado*.75,0,z);
        g.add(pist); g.add(biela);
        moveis.push({pist, biela, lado, bp:lado*1.35, bb:lado*.75});
      });
      return { obj:g, entrada:[0,4,0], animar:(o,t)=>{
        // no boxer, os pistões opostos avançam ao mesmo tempo
        const d = Math.cos(t) * .32;
        moveis.forEach(m=>{ m.pist.position.x = m.bp + m.lado*d; m.biela.position.x = m.bb + m.lado*d*.5; });
      }};
    },
    cilindros: () => ({ obj: (()=>{
        const g = new THREE.Group();
        [[-1,-.95],[1,-.32],[-1,.32],[1,.95]].forEach(([lado,z])=>{
          g.add(põe(gira(cil(.5,.5,1.5,COR.ferro,20,.75,.5),0,0,PI2),lado*1.75,0,z));
          for(let k=0;k<5;k++)  // aletas de refrigeração
            g.add(põe(gira(cil(.62,.62,.06,COR.ferro,20,.7,.55),0,0,PI2),lado*(1.15+k*.3),0,z));
        });
        return g; })(), entrada:[6,0,0] }),
    cabecotes: () => ({ obj: grupo(
        põe(caixa(.55,1.5,2.6,COR.aluminio,.6,.4),-2.75,0,0),
        põe(caixa(.55,1.5,2.6,COR.aluminio,.6,.4), 2.75,0,0)
      ), entrada:[7,0,0] }),
    balancins: () => ({ obj: (()=>{
        const g = new THREE.Group();
        [-1,1].forEach(lado=>{
          g.add(põe(gira(cil(.05,.05,2.4,COR.vermelho,12,.5,.5),0,0,PI2),lado*1.7,.72,0));
          [-.6,.6].forEach(z=>g.add(põe(caixa(.5,.16,.2,COR.vermelho,.6,.4),lado*2.75,.85,z)));
        });
        return g; })(), entrada:[0,5,0] }),
    volante: () => ({ obj: grupo(
        põe(gira(cil(1.05,1.05,.24,COR.ferro,36,.8,.45),PI2,0,0),0,0,-1.85),
        põe(gira(cil(.4,.4,.3,COR.aco,20),PI2,0,0),0,0,-1.9)
      ), entrada:[0,0,-6], animar:(o,t)=>{ o.rotation.z = t; } }),
    ventoinha: () => ({ obj: (()=>{
        const g = grupo(põe(gira(cil(.85,.85,.16,COR.aluminio,32,.7,.4),PI2,0,0),0,.15,2.0));
        for(let k=0;k<10;k++){
          const a=k*Math.PI/5;
          g.add(põe(gira(caixa(.14,.5,.1,COR.aluminio,.6,.45),0,0,a),Math.sin(a)*.5,.15+Math.cos(a)*.5,2.1));
        }
        return g; })(), entrada:[0,0,6], animar:(o,t)=>{ o.rotation.z = t*1.4; } }),
    distribuidor: () => ({ obj: grupo(
        põe(cil(.24,.24,.6,COR.escuro,20,.4,.6),.55,1.05,-.6),
        põe(cil(.3,.3,.14,COR.escuro,20,.4,.6),.55,1.4,-.6)
      ), entrada:[0,5,0] }),
    velas: () => ({ obj: (()=>{
        const g = new THREE.Group();
        [[-1,-.6],[1,-.6],[-1,.6],[1,.6]].forEach(([lado,z])=>
          g.add(põe(gira(cil(.09,.09,.5,COR.amarelo,14,.5,.4),0,0,PI2),lado*3.15,.25,z)));
        return g; })(), entrada:[8,0,0] }),
    carburador: () => ({ obj: grupo(
        põe(caixa(.7,.45,.6,COR.cobre,.55,.45),0,1.1,.35),
        põe(cil(.22,.22,.35,COR.cobre,18,.55,.45),0,1.45,.35)
      ), entrada:[0,5,0] }),
  },

  // ---------- 4 EM LINHA: virabrequim no eixo X ----------
  linha4: {
    bloco: () => ({ obj: (()=>{
        const g = grupo(caixa(3.4,1.7,1.6,COR.ferro,.75,.5));
        [-1.2,-.4,.4,1.2].forEach(x=>g.add(põe(cil(.44,.44,1.72,COR.escuro,20,.6,.6),x,.05,0)));
        return g; })(), entrada:[0,-5,0] }),
    virabrequim: () => ({ obj: (()=>{
        const g = grupo(gira(cil(.16,.16,3.9,COR.aco),0,0,PI2));
        [-1.2,-.4,.4,1.2].forEach((x,i)=>
          g.add(põe(gira(cil(.36,.36,.24,COR.ferro),0,0,PI2),x,(i%2?.32:-.32),0)));
        g.position.y=-1.05;
        return g; })(), entrada:[0,-5,0], animar:(o,t)=>{ o.rotation.x = t; } }),
    pistoes: () => {
      const g = new THREE.Group(); const moveis = [];
      [-1.2,-.4,.4,1.2].forEach((x,i)=>{
        const alto = i%2===0;
        const pist = põe(cil(.4,.4,.46,COR.aluminio,20,.6,.35),x,alto?.5:.1,0);
        const biela= põe(cil(.08,.08,.95,COR.bronze,12),x,alto?-.2:-.5,0);
        g.add(pist); g.add(biela);
        // ordem de ignição: 1 e 4 sobem enquanto 2 e 3 descem
        moveis.push({pist, biela, fase: (i===0||i===3)?0:Math.PI, bp:.3, bb:-.35});
      });
      return { obj:g, entrada:[0,5,0], animar:(o,t)=>{
        moveis.forEach(m=>{
          const d = Math.cos(t + m.fase) * .3;
          m.pist.position.y = m.bp + d; m.biela.position.y = m.bb + d;
        });
      }};
    },
    carteroleo: () => ({ obj: grupo(
        põe(caixa(3.2,.7,1.4,COR.aco,.7,.5),0,-1.6,0),
        põe(cil(.12,.12,.2,COR.escuro,12),1.1,-1.95,0)
      ), entrada:[0,-5,0] }),
    junta: () => ({ obj: põe(caixa(3.42,.09,1.62,COR.vermelho,.3,.6),0,.92,0), entrada:[0,4,0] }),
    cabecote: () => ({ obj: grupo(
        põe(caixa(3.4,.85,1.6,COR.aluminio,.65,.4),0,1.4,0)
      ), entrada:[0,5,0] }),
    comando: () => ({ obj: (()=>{
        const g = grupo(põe(gira(cil(.13,.13,3.5,COR.escuro,18,.7,.45),0,0,PI2),0,1.95,0));
        [-1.2,-.4,.4,1.2].forEach(x=>
          g.add(põe(gira(cil(.26,.26,.2,COR.aco,18),0,0,PI2),x,1.95,0)));
        return g; })(), entrada:[0,5,0], animar:(o,t)=>{ o.rotation.x = t/2; } }),
    correia: () => ({ obj: (()=>{
        const g = new THREE.Group();
        g.add(põe(gira(new THREE.Mesh(new THREE.TorusGeometry(.42,.07,10,28), mat(COR.escuro,.3,.7)),0,PI2,0),1.85,1.95,0));
        g.add(põe(gira(new THREE.Mesh(new THREE.TorusGeometry(.3,.07,10,28), mat(COR.escuro,.3,.7)),0,PI2,0),1.85,-1.05,0));
        g.add(põe(caixa(.06,3.1,.14,COR.escuro,.2,.8),1.85,.45,.36));
        g.add(põe(caixa(.06,3.1,.14,COR.escuro,.2,.8),1.85,.45,-.36));
        return g; })(), entrada:[6,0,0] }),
    bomba: () => ({ obj: grupo(
        põe(gira(cil(.34,.34,.4,COR.azul,20,.4,.4),0,0,PI2),-1.95,.5,0)
      ), entrada:[-5,0,0] }),
    velas: () => ({ obj: (()=>{
        const g = new THREE.Group();
        [-1.2,-.4,.4,1.2].forEach(x=>g.add(põe(cil(.1,.1,.5,COR.amarelo,14,.5,.4),x,2.05,.5)));
        return g; })(), entrada:[0,5,0] }),
    coletor: () => ({ obj: (()=>{
        const g = grupo(põe(caixa(2.4,.4,.45,COR.aluminio,.6,.4),0,1.75,1.15));
        [-.9,-.3,.3,.9].forEach(x=>g.add(põe(gira(cil(.14,.14,.7,COR.aluminio,12,.6,.4),PI2,0,0),x,1.75,.75)));
        return g; })(), entrada:[0,0,6] }),
    volante: () => ({ obj: grupo(
        põe(gira(cil(1.0,1.0,.22,COR.ferro,36,.8,.45),0,0,PI2),-2.0,-1.05,0)
      ), entrada:[-6,0,0], animar:(o,t)=>{ o.rotation.x = t; } }),
  },
};

// =========================================
// CENA
// =========================================
let cena, camera, renderer, raiz, animId, arrastando=false, ultimo={x:0,y:0};
let pecasNaCena=[], ligado=false, giroMotor=0, explodeAlvo=0, explodeAtual=0;
let giroY=.85, giroX=.38, autoGiro=true, tweens=[];
// o zoom é um multiplicador do enquadramento automático: 1 = motor inteiro na tela
let zoomF=1, alvo=new THREE.Vector3(0,0,0), ZOOM_MIN=.28, ZOOM_MAX=4.5;

let observador = null;

function criarCena(canvas) {
  renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  cena = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(42, 1, .1, 100);

  cena.add(new THREE.HemisphereLight(0xffffff, 0x4a5568, 1.5));
  const sol = new THREE.DirectionalLight(0xffffff, 2.1);
  sol.position.set(5, 8, 6); cena.add(sol);
  const lado = new THREE.DirectionalLight(0xbfd4ff, .9);
  lado.position.set(-6, 2, -4); cena.add(lado);
  const contra = new THREE.DirectionalLight(0xffe8c4, .7);
  contra.position.set(0, -4, -7); cena.add(contra);


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

function distanciaQueCabe() {
  _eixoFrente.set(Math.cos(giroX) * Math.sin(giroY), Math.sin(giroX), Math.cos(giroX) * Math.cos(giroY));
  _eixoLado.crossVectors(CIMA, _eixoFrente).normalize();
  _eixoCima.crossVectors(_eixoFrente, _eixoLado).normalize();

  let meiaLarg = .5, meiaAlt = .5;
  pecasNaCena.forEach(p => {
    _ponto.copy(p.base).addScaledVector(p.dir, explodeAtual * p.alcance).add(p.centro).sub(alvo);
    meiaLarg = Math.max(meiaLarg, Math.abs(_ponto.dot(_eixoLado)) + p.raioPeca);
    meiaAlt  = Math.max(meiaAlt,  Math.abs(_ponto.dot(_eixoCima)) + p.raioPeca);
  });

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
    const larg = renderer.domElement.clientWidth, alt = renderer.domElement.clientHeight;
    const v = new THREE.Vector3();
    aoProjetar(pecasNaCena.map((p, i) => {
      v.copy(p.obj.position).add(p.centro).project(camera);
      return { i,
        x: (v.x * .5 + .5) * larg,
        y: (-v.y * .5 + .5) * alt,
        visivel: v.z < 1 };
    }));
  }
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
  const materiais = [];
  obj.traverse(o => { if (o.material) materiais.push(o.material); });
  // na vista explodida a peça sai para fora: manda-a na direção do próprio centro
  // (afasta radialmente, sem empilhar peças) com um empurrão na direção de montagem
  const radial = destino.clone().add(cx);
  const raio = radial.length();
  if (raio < .2) radial.copy(new THREE.Vector3(...entrada));
  const dir = radial.normalize().addScaledVector(new THREE.Vector3(...entrada).normalize(), .55).normalize();
  // quem já está mais para fora anda mais: assim as "camadas" do motor se separam
  const alcance = 1.0 + raio * 1.8;
  pecasNaCena.push({ obj, base: destino.clone(), dir, alcance, mover, centro: cx, raioPeca, materiais });

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
    o.traverse(c => { if (c.geometry) c.geometry.dispose(); if (c.material) c.material.dispose(); });
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
