// =========================================
// RODA AS TRÊS AUDITORIAS DE UMA VEZ
//
//   node auditoria-tudo.js
//
// 1. auditoria.js           — o que está escrito (datas, marcas, peças, textos)
// 2. auditoria-3d.js        — o que se vê (forma, posição e movimento das peças)
// 3. auditoria-interface.js — o que acontece quando se clica (botões, telas)
//
// A 2 e a 3 precisam de um navegador (playwright-core + Chromium) e do site
// servido localmente. Este script levanta o servidor sozinho e o derruba no
// fim. Se o navegador não estiver instalado, ele avisa e roda só a 1.
// =========================================
const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs   = require('fs');

const PORTA = process.env.PORTA || 8832;
const RAIZ  = __dirname;

const TIPOS = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8',
                '.css':'text/css; charset=utf-8',  '.json':'application/json; charset=utf-8',
                '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml',
                '.webp':'image/webp', '.ico':'image/x-icon' };

function servidor() {
  return http.createServer((req, res) => {
    const limpo = decodeURIComponent(req.url.split('?')[0]);
    let arq = path.join(RAIZ, limpo === '/' ? '/index.html' : limpo);
    if (!arq.startsWith(RAIZ)) { res.writeHead(403).end(); return; }
    fs.readFile(arq, (e, dados) => {
      if (e) { res.writeHead(404).end('nao achei'); return; }
      res.writeHead(200, { 'Content-Type': TIPOS[path.extname(arq)] || 'application/octet-stream' });
      res.end(dados);
    });
  });
}

function temNavegador() {
  try { require.resolve('playwright-core'); } catch (e) { return false; }
  const exe = process.env.CHROMIUM || '/opt/pw-browsers/chromium';
  return fs.existsSync(exe);
}

// spawn e não spawnSync: o servidor desta mesma página roda neste processo,
// e o Sync trava o event loop — o site ficaria mudo justamente enquanto a
// auditoria tenta abri-lo.
function rodar(arquivo) {
  console.log('\n' + '─'.repeat(64));
  return new Promise(ok => {
    const f = spawn(process.execPath, [path.join(RAIZ, arquivo)],
      { stdio: 'inherit', env: { ...process.env, PORTA } });
    f.on('close', codigo => ok(codigo === 0));
  });
}

(async () => {
  const resultados = {};
  resultados['auditoria.js'] = await rodar('auditoria.js');

  if (!temNavegador()) {
    console.log('\n' + '─'.repeat(64));
    console.log('As auditorias de geometria e de interface precisam de um navegador.');
    console.log('Instale com:  npm i playwright-core && npx playwright install chromium');
    console.log('(ou aponte a variável CHROMIUM para um Chrome já instalado)');
  } else {
    const s = servidor();
    await new Promise(ok => s.listen(PORTA, ok));
    resultados['auditoria-3d.js']        = await rodar('auditoria-3d.js');
    resultados['auditoria-interface.js'] = await rodar('auditoria-interface.js');
    s.close();
  }

  console.log('\n' + '═'.repeat(64));
  console.log('RESUMO');
  for (const [nome, ok] of Object.entries(resultados))
    console.log(`  ${ok ? '✔' : '✘'}  ${nome}${ok ? '' : '  — tem erro, olhe acima'}`);
  const tudoOk = Object.values(resultados).every(Boolean);
  console.log(tudoOk ? '\nNenhum erro. Avisos, se houver, estão listados acima.'
                     : '\nHá erros para corrigir.');
  process.exit(tudoOk ? 0 : 1);
})();
