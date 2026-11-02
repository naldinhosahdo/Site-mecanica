// =========================================
// AUDITORIA DA GEOMETRIA 3D
//
// A auditoria de texto (auditoria.js) confere o que está escrito.
// Esta aqui confere o que se vê: mede cada peça de cada arquitetura
// e procura defeito de forma, de posição e de movimento.
//
// Ela nasceu de dois bugs que passaram batido na auditoria de texto:
//   - a ventoinha do boxer a ar estava fora do eixo e, ao girar,
//     fazia uma órbita em vez de girar no próprio cubo;
//   - as pás dessa ventoinha tinham passo e posição no mesmo objeto,
//     e o Three resolve os dois ângulos na ordem XYZ: cada pá acabava
//     inclinada de um jeito e elas pareciam cortadas.
// Os testes E (órbita) e F (arranjo circular) existem por causa deles.
//
// Como rodar:   node auditoria-3d.js
// Precisa de:   playwright-core + um Chromium, e o site servido em
//               http://localhost:8832 (ou PORTA=xxxx node auditoria-3d.js)
// =========================================
const { chromium } = require('playwright-core');

const PORTA   = process.env.PORTA || 8832;
const BASE    = `http://localhost:${PORTA}`;
const CHROMIU = process.env.CHROMIUM || '/opt/pw-browsers/chromium';

(async () => {
  const navegador = await chromium.launch({
    executablePath: CHROMIU,
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });
  const pagina = await navegador.newPage({ viewport: { width: 1000, height: 720 } });
  const errosJS = [];
  pagina.on('pageerror', e => errosJS.push(e.message));

  // 'networkidle' não serve aqui: a página pede fonte do Google e foto de
  // fora, e se a internet estiver bloqueada esses pedidos ficam pendurados —
  // a rede nunca fica quieta e a auditoria morre por tempo esgotado sem ter
  // nada a ver com o site. Esperamos o próprio motor 3D ficar de pé.
  await pagina.goto(`${BASE}/montagem.html?arq=linha4`, { waitUntil: 'domcontentloaded' });
  await pagina.waitForFunction(() => window.Motor3D && window.Motor3D._interno,
                               null, { timeout: 30000, polling: 200 });
  await pagina.waitForTimeout(1200);

  const r = await pagina.evaluate(() => {
    const { THREE, geo3d } = window.Motor3D._interno();
    const E = [], W = [], I = [];
    const fix = n => Number.isFinite(n);
    const num = v => fix(v.x) && fix(v.y) && fix(v.z);

    // -------------------------------------------------
    // ferramentas de medida
    // -------------------------------------------------
    const caixaDe = o => { o.updateMatrixWorld(true); return new THREE.Box3().setFromObject(o); };
    const diag    = c => c.isEmpty() ? 0 : c.getSize(new THREE.Vector3()).length();
    const centro  = c => c.getCenter(new THREE.Vector3());


    // -------------------------------------------------
    // percorre todas as arquiteturas
    // -------------------------------------------------
    for (const arq of Object.keys(geo3d)) {
      const pecas = [];

      for (const id of Object.keys(geo3d[arq])) {
        const onde = `${arq} / ${id}`;
        let feito;
        try { feito = geo3d[arq][id](); }
        catch (e) { E.push(`[3d-quebra] a peça nem chega a ser construída: ${onde} — ${e.message}`); continue; }

        const obj = feito.obj;
        if (!obj) { E.push(`[3d-vazia] a fábrica não devolveu objeto: ${onde}`); continue; }

        const cena = new THREE.Scene();
        cena.add(obj);
        obj.updateMatrixWorld(true);

        const malhas = [];
        obj.traverse(o => { if (o.isMesh && o.geometry) malhas.push(o); });

        // ---- A. a peça existe e tem volume ----
        if (!malhas.length) { E.push(`[3d-vazia] peça sem nenhuma malha: ${onde}`); continue; }

        const caixa = caixaDe(obj);
        if (caixa.isEmpty() || !num(caixa.min) || !num(caixa.max)) {
          E.push(`[3d-nan] peça com coordenada inválida (NaN/Infinito): ${onde}`); continue;
        }
        const tam = caixa.getSize(new THREE.Vector3());
        if (Math.max(tam.x, tam.y, tam.z) < 1e-4) {
          E.push(`[3d-vazia] peça sem volume nenhum (invisível): ${onde}`); continue;
        }

        // ---- B. ponto de entrada da vista explodida ----
        const ent = feito.entrada;
        if (!Array.isArray(ent) || ent.length !== 3 || !ent.every(fix))
          E.push(`[3d-entrada] direção de entrada inválida: ${onde}`);
        else if (ent.every(v => v === 0))
          W.push(`[3d-entrada] entrada [0,0,0]: a peça não tem para onde sair na vista explodida: ${onde}`);

        const info = { id, obj, caixa, malhas, animar: feito.animar, diag: diag(caixa) };
        pecas.push(info);

        // ---- E. movimento: a peça gira no próprio eixo ou faz órbita? ----
        if (typeof feito.animar === 'function') {
          const pos0 = obj.position.clone(), rot0 = obj.rotation.clone();
          const centros = [];
          let mexeuPosicao = false, quebrou = null;

          for (const t of [0, 1, 2, 3, 4, 5, 6]) {
            try { feito.animar(obj, t); } catch (e) { quebrou = e.message; break; }
            obj.updateMatrixWorld(true);
            const c = caixaDe(obj);
            if (c.isEmpty() || !num(c.min)) { quebrou = 'caixa inválida durante a animação'; break; }
            centros.push(centro(c));
            if (obj.position.distanceTo(pos0) > 1e-6) mexeuPosicao = true;
          }

          if (quebrou) {
            E.push(`[3d-anima] a animação quebra a peça: ${onde} — ${quebrou}`);
          } else {
            // peça que só gira (não se desloca) tem que manter o centro parado.
            // Se o centro passeia, ela está girando em torno de um eixo que
            // não passa por ela: visualmente, faz uma órbita.
            // peça marcada com excentrico:true orbita de propósito — é o caso
            // do rotor e do eixo excêntrico do Wankel, em que a órbita é o
            // próprio funcionamento do motor
            if (!mexeuPosicao && !feito.excentrico && centros.length > 1) {
              let maior = 0;
              for (const c of centros) maior = Math.max(maior, c.distanceTo(centros[0]));
              const limite = Math.max(info.diag * 0.07, 0.04);
              if (maior > limite)
                E.push(`[3d-orbita] gira fora do próprio eixo — o centro passeia ${maior.toFixed(2)} ` +
                       `(limite ${limite.toFixed(2)}): ${onde}`);
            }
            // desligar o motor chama animar(obj, 0): tem que devolver a peça
            // exatamente à pose de origem, senão ela fica torta parada
            feito.animar(obj, 0);
            obj.updateMatrixWorld(true);
            const voltou = obj.position.distanceTo(pos0) < 1e-6 &&
                           Math.abs(obj.rotation.x - rot0.x) < 1e-6 &&
                           Math.abs(obj.rotation.y - rot0.y) < 1e-6 &&
                           Math.abs(obj.rotation.z - rot0.z) < 1e-6;
            if (!voltou)
              E.push(`[3d-repouso] com o motor desligado a peça não volta ao lugar: ${onde}`);
          }
        }

        // ---- F. arranjos circulares (pás, dentes, parafusos em roda) ----
        // Um conjunto de cópias da mesma geometria distribuídas em roda tem
        // que ser o MESMO sólido girado. Se cada cópia estiver inclinada de
        // um jeito, o conjunto parece comido — foi o bug das pás.
        const porGeometria = new Map();
        malhas.forEach(m => {
          const k = m.geometry.uuid;
          if (!porGeometria.has(k)) porGeometria.set(k, []);
          porGeometria.get(k).push(m);
        });

        for (const [, grupo] of porGeometria) {
          if (grupo.length < 3) continue;

          const pos = grupo.map(m => m.getWorldPosition(new THREE.Vector3()));
          const c = pos.reduce((a, p) => a.add(p), new THREE.Vector3()).divideScalar(pos.length);

          // normal do plano em que os centros vivem (Newell)
          const n = new THREE.Vector3();
          for (let i = 0; i < pos.length; i++) {
            const a = pos[i], b = pos[(i + 1) % pos.length];
            n.x += (a.y - b.y) * (a.z + b.z);
            n.y += (a.z - b.z) * (a.x + b.x);
            n.z += (a.x - b.x) * (a.y + b.y);
          }
          if (n.length() < 1e-9) continue;          // em linha, não em roda
          n.normalize();

          // raios iguais? se não, não é um arranjo circular — deixa quieto
          const planar = pos.map(p => p.clone().sub(c).projectOnPlane(n));
          const raios = planar.map(v => v.length());
          const rMed = raios.reduce((a, b) => a + b, 0) / raios.length;
          if (rMed < 1e-6) continue;
          if (raios.some(r => Math.abs(r - rMed) > rMed * 0.25)) continue;

          // ângulo de cada cópia em volta do eixo
          const u = planar[0].clone().normalize();
          const v = new THREE.Vector3().crossVectors(n, u).normalize();
          const ang = planar.map(p => Math.atan2(p.dot(v), p.dot(u)));
          const espalha = Math.max(...ang) - Math.min(...ang);
          if (espalha < 2) continue;                 // arco curto: não é uma roda

          // Roda de verdade tem as cópias igualmente espaçadas. Sem esta
          // exigência o teste confunde os dois bancos de um boxer (que são
          // um espelho, não uma roda) com um arranjo circular torto.
          const passos = [...ang].sort((a, b) => a - b)
            .map((a, i, arr) => (i ? a - arr[i - 1] : a - arr[arr.length - 1] + Math.PI * 2));
          const pMin = Math.min(...passos), pMax = Math.max(...passos);
          if (pMin < 1e-6 || pMax > pMin * 1.8) continue;

          // Comparar as orientações direto não serve: um parafuso deitado no
          // eixo é um cilindro, e girá-lo em volta do próprio eixo não muda
          // nada do que se vê, mas muda o quaternion. O que importa é o
          // ESPAÇO que cada cópia ocupa. Medimos, para cada uma, o quanto ela
          // avança ao longo do eixo da roda e a que distância do eixo ela
          // fica — dois números que não mudam quando a cópia gira em volta
          // desse eixo. Numa roda bem feita, todas as cópias dão os mesmos
          // números; foi assim que as pás tortas se denunciaram.
          const perfil = m => {
            m.geometry.computeBoundingBox();
            const cx = m.geometry.boundingBox;
            const eixo = { min:  Infinity, max: -Infinity };
            const rad  = { min:  Infinity, max: -Infinity };
            for (let b = 0; b < 8; b++) {
              const p = new THREE.Vector3(
                b & 1 ? cx.max.x : cx.min.x,
                b & 2 ? cx.max.y : cx.min.y,
                b & 4 ? cx.max.z : cx.min.z).applyMatrix4(m.matrixWorld).sub(c);
              const a = p.dot(n);
              const d = p.clone().addScaledVector(n, -a).length();
              eixo.min = Math.min(eixo.min, a); eixo.max = Math.max(eixo.max, a);
              rad.min  = Math.min(rad.min,  d); rad.max  = Math.max(rad.max,  d);
            }
            return [eixo.min, eixo.max, rad.min, rad.max];
          };

          const perfis = grupo.map(perfil);
          const escala = Math.max(...perfis.map(p => Math.max(p[1] - p[0], p[3] - p[2])), 1e-6);
          let pior = 0;
          for (let k = 0; k < 4; k++) {
            const vals = perfis.map(p => p[k]);
            pior = Math.max(pior, Math.max(...vals) - Math.min(...vals));
          }
          if (pior > escala * 0.30)
            E.push(`[3d-roda] arranjo circular inconsistente: ${grupo.length} cópias da mesma peça, ` +
                   `mas elas ocupam espaços diferentes (desvio de ${(pior / escala * 100).toFixed(0)}% ` +
                   `do tamanho da peça) — parecem deformadas ao girar: ${onde}`);

        }
        // Nota: já houve aqui um teste de "peça enterrada dentro de outra".
        // Ele acusava 267 casos, quase todos legítimos — válvula fica mesmo
        // dentro do cabeçote, pistão dentro do cilindro. Um teste em que não
        // se pode confiar é pior que teste nenhum, porque ensina a ignorar a
        // auditoria. Peça meio enterrada se pega no olho, na revisão visual.
      }

      if (!pecas.length) { E.push(`[3d-vazia] arquitetura sem nenhuma peça: ${arq}`); continue; }

      // -------------------------------------------------
      // H. o motor inteiro
      // -------------------------------------------------
      const motor = new THREE.Box3();
      pecas.forEach(p => motor.union(p.caixa));
      const tamMotor = motor.getSize(new THREE.Vector3());
      const dMotor = tamMotor.length();
      const cMotor = centro(motor);

      // a câmera mira a origem: motor muito fora dela nasce torto na tela
      const fora = cMotor.length() / dMotor;
      if (fora > 0.22)
        W.push(`[3d-enquadra] o motor está ${(fora * 100).toFixed(0)}% do próprio tamanho fora da ` +
               `origem — nasce descentralizado na tela: ${arq}`);

      pecas.forEach(p => {
        // peça solta no espaço: não encosta em nenhuma outra
        const folga = dMotor * 0.04;
        const inchada = p.caixa.clone().expandByScalar(folga);
        const encosta = pecas.some(o => o !== p && inchada.intersectsBox(o.caixa));
        if (!encosta)
          E.push(`[3d-solta] peça solta, sem encostar em nenhuma outra: ${arq} / ${p.id}`);

        // peça minúscula demais para ser vista
        if (p.diag < dMotor * 0.012)
          W.push(`[3d-miuda] peça quase invisível (${(p.diag / dMotor * 100).toFixed(1)}% do motor): ` +
                 `${arq} / ${p.id}`);

        // duas peças diferentes ocupando exatamente o mesmo lugar
        pecas.forEach(o => {
          if (o.id <= p.id) return;
          if (centro(o.caixa).distanceTo(centro(p.caixa)) < dMotor * 0.01 &&
              Math.abs(o.diag - p.diag) < dMotor * 0.01)
            W.push(`[3d-sobrepoe] duas peças ocupam o mesmo lugar e o mesmo tamanho: ` +
                   `${arq} / ${p.id} e ${o.id}`);
        });
      });

      I.push(`${arq}: ${pecas.length} peças, ${tamMotor.x.toFixed(1)}×${tamMotor.y.toFixed(1)}×${tamMotor.z.toFixed(1)}`);
    }

    return { E, W, I, arquiteturas: Object.keys(geo3d).length };
  });

  await navegador.close();

  const { E, W, I } = r;
  console.log('==== AUDITORIA DA GEOMETRIA 3D ====');
  console.log(`arquiteturas medidas: ${r.arquiteturas}`);
  if (errosJS.length) {
    console.log('');
    console.log(`### ERROS DE JAVASCRIPT (${errosJS.length})`);
    errosJS.forEach(x => console.log(' - ' + x));
  }
  console.log('');
  console.log(`### ERROS (${E.length})`);
  E.forEach(x => console.log(' - ' + x));
  console.log('');
  console.log(`### AVISOS (${W.length})`);
  W.forEach(x => console.log(' - ' + x));
  if (process.env.DETALHE) { console.log(''); I.forEach(x => console.log(' . ' + x)); }

  process.exit(E.length || errosJS.length ? 1 : 0);
})();
