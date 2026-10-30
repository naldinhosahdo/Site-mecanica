const fs=require('fs');
const code=fs.readFileSync('./app.js','utf8');
eval(code.match(/const marcas = \{[\s\S]*?\n\};/)[0].replace('const marcas','var marcas'));
eval(code.match(/const grupos = \{[\s\S]*?\n\};/)[0].replace('const grupos','var grupos'));
eval(code.match(/const variantes = \{[\s\S]*?\n\};/)[0].replace('const variantes','var variantes'));
const ordem=JSON.parse(code.match(/const ordemGrupos = (\[[^\]]*\])/)[1].replace(/'/g,'"'));

const ini = p => parseInt(p.slice(0,4),10);
const fim = p => /atual/.test(p) ? 2026 : (p.length>5 ? parseInt(p.slice(-4),10) : parseInt(p.slice(0,4),10));
const ANO = 2026;
let E=[], W=[];

// ---------- A. ESTRUTURA ----------
let usadas=new Set();
for(const gid of ordem){
  const g=grupos[gid];
  if(!g){E.push('[estrutura] grupo inexistente na ordem: '+gid); continue;}
  for(const mid of g.marcas){
    if(!marcas[mid]){E.push('[estrutura] '+g.nome+' aponta para marca inexistente: '+mid); continue;}
    if(usadas.has(mid)) E.push('[estrutura] marca em dois grupos: '+mid);
    usadas.add(mid);
  }
}
for(const gid in grupos) if(!ordem.includes(gid)) E.push('[estrutura] grupo nao exibido: '+gid);
for(const mid in marcas) if(!usadas.has(mid)) E.push('[estrutura] marca sem grupo: '+mid);
for(const gid in grupos) if(!fs.existsSync('./'+grupos[gid].logo)) E.push('[estrutura] logo de grupo ausente: '+gid);

// ---------- B. DATAS ----------
for(const mid in marcas){
  const m=marcas[mid];
  if(!fs.existsSync('./'+m.logo)) E.push('[estrutura] logo ausente: '+mid);
  m.motores.forEach((mo,i)=>{
    const a=ini(mo.periodo), b=fim(mo.periodo);
    if(isNaN(a)) E.push('[data] periodo ilegivel: '+mid+' / '+mo.nome+' ('+mo.periodo+')');
    if(b<a) E.push('[data] fim antes do inicio: '+mid+' / '+mo.nome+' ('+mo.periodo+')');
    if(a<1860||a>ANO) E.push('[data] ano implausivel: '+mid+' / '+mo.nome+' ('+mo.periodo+')');
    if(i>0 && a<ini(m.motores[i-1].periodo)) E.push('[ordem] fora de ordem: '+mid+' / '+mo.nome);
  });
  const nm=m.motores.map(x=>x.nome), d=nm.filter((n,i)=>nm.indexOf(n)!==i);
  if(d.length) E.push('[dup] familia repetida em '+mid+': '+[...new Set(d)]);
}

// ---------- C. VARIANTES DENTRO DA FAMILIA ----------
for(const k in variantes){
  const [mid,fam]=k.split('|');
  if(!marcas[mid]){E.push('[nivel4] marca inexistente: '+k); continue;}
  const f=marcas[mid].motores.find(x=>x.nome===fam);
  if(!f){E.push('[nivel4] familia orfa: '+k); continue;}
  const fa=ini(f.periodo), fb=fim(f.periodo);
  variantes[k].forEach(v=>{
    const va=ini(v.periodo), vb=fim(v.periodo);
    if(va<fa) W.push('[nivel4] variante comeca antes da familia: '+k+' -> '+v.nome+' ('+v.periodo+' vs familia '+f.periodo+')');
    if(vb>fb) W.push('[nivel4] variante termina depois da familia: '+k+' -> '+v.nome+' ('+v.periodo+' vs familia '+f.periodo+')');
  });
  const vn=variantes[k].map(x=>x.nome), vd=vn.filter((n,i)=>vn.indexOf(n)!==i);
  if(vd.length) E.push('[dup] variante repetida em '+k+': '+[...new Set(vd)]);
}

// ---------- D. LACUNAS DE ERA (buracos longos na linha do tempo) ----------
for(const mid in marcas){
  const m=marcas[mid];
  for(let i=1;i<m.motores.length;i++){
    const fimAnt=fim(m.motores[i-1].periodo);
    const iniAtual=ini(m.motores[i].periodo);
    // buraco = nenhum motor cobrindo o intervalo
    const cobre=m.motores.some(x=>ini(x.periodo)<=iniAtual-1 && fim(x.periodo)>=iniAtual-1);
    if(!cobre && iniAtual-fimAnt>18) W.push('[lacuna] '+m.nome+': nada entre '+fimAnt+' e '+iniAtual+' (antes de "'+m.motores[i].nome+'")');
  }
  const ultimo=Math.max(...m.motores.map(x=>fim(x.periodo)));
  if(ultimo<ANO-6) W.push('[lacuna] '+m.nome+': nada em produção desde '+ultimo);
}

// ---------- E. AFIRMACOES ABSOLUTAS (padrao de erro recorrente) ----------
const sup=/\b(primeir[oa]|únic[oa]|maior|mais (potente|produzid|vendid|rápid|longev|acelerad)|recorde|nunca|sempre|todas as)\b/i;
let nSup=0;
for(const mid in marcas) marcas[mid].motores.forEach(mo=>{ if(sup.test(mo.desc)){nSup++;} });
for(const k in variantes) variantes[k].forEach(v=>{ if(sup.test(v.desc)){nSup++;} });

// ---------- F. COERENCIA COM A FUNDACAO DA MARCA ----------
for(const mid in marcas){
  const m=marcas[mid];
  m.motores.forEach(mo=>{
    if(ini(mo.periodo) < m.fundacao-2) W.push('[fundacao] '+m.nome+' (desde '+m.fundacao+') tem motor de '+ini(mo.periodo)+': '+mo.nome);
  });
}

// ---------- G. MARCAS CITADAS EM TEXTO MAS AUSENTES DO SITE ----------
const nomes=new Set(Object.values(marcas).map(m=>m.nome.toLowerCase().split(' ')[0].replace('/','')));
const citaveis=['lotus','porsche','ferrari','lamborghini','bmw','mercedes','toyota','yamaha','cummins','bosch','iveco','chrysler','opel','rimac','austin','willys','mwm','wolseley','lagonda','buick','maybach','pagani','delorean','shelby','bugatti','koenigsegg','subaru','isuzu'];
const faltantes=new Set();
const scan=(txt,onde)=>{ citaveis.forEach(c=>{ if(new RegExp('\\b'+c+'\\b','i').test(txt) && !nomes.has(c)) faltantes.add(c); }); };
for(const mid in marcas) marcas[mid].motores.forEach(mo=>scan(mo.desc));
for(const k in variantes) variantes[k].forEach(v=>scan(v.desc));

// ---------- H. COBERTURA DO 3D ----------
// toda família precisa cair numa arquitetura que exista de verdade
{
  const src = fs.readFileSync('./montagem-dados.js','utf8').replace(/^const /gm,'var ')
            + '\nmodule.exports={arquiteturas,arqDaFamilia};';
  const Mod = new module.constructor();
  Mod._compile(src, process.cwd()+'/_montagem-dados-audit.js');
  const {arquiteturas, arqDaFamilia} = Mod.exports;
  const usadas = new Set();
  for(const mid in marcas) marcas[mid].motores.forEach(mo=>{
    const a = arqDaFamilia(mid, mo);
    if(!a) E.push('[3d] familia sem arquitetura: '+mid+' / '+mo.nome);
    else if(!arquiteturas[a]) E.push('[3d] arquitetura inexistente ('+a+') em '+mid+' / '+mo.nome);
    else usadas.add(a);
  });
  for(const a in arquiteturas){
    const p = arquiteturas[a].pecas;
    if(!p || p.length < 8) E.push('[3d] arquitetura com poucas pecas: '+a);
    if(!arquiteturas[a].titulo) E.push('[3d] arquitetura sem titulo: '+a);
    const ids = new Set(p.map(x=>x.id));
    if(ids.size !== p.length) E.push('[3d] arquitetura com id repetido: '+a);
    p.forEach(x=>{ if(!x.nome||!x.dica||!x.aoEncaixar||!x.seErrar) E.push('[3d] peca incompleta em '+a+': '+x.id); });
  }
  console.log('arquiteturas 3D: '+Object.keys(arquiteturas).length+' geradas, '+usadas.size+' usadas pelo catalogo');
}

// ---------- I. COMPONENTE INCOMPATIVEL COM O MOTOR ----------
// peca que simplesmente nao existe naquele tipo de motor
{
  const src = fs.readFileSync('./montagem-dados.js','utf8').replace(/^const /gm,'var ')
            + '\nmodule.exports={arquiteturas,arqDaFamilia};';
  const Mod = new module.constructor();
  Mod._compile(src, process.cwd()+'/_montagem-dados-comp.js');
  const {arquiteturas, arqDaFamilia} = Mod.exports;
  const tem = (a,id) => arquiteturas[a] && arquiteturas[a].pecas.some(p=>p.id===id);
  const fimP = p => /atual|hoje/i.test(String(p)) ? 9999
                  : (String(p).match(/\d{4}/g)||[]).slice(-1)[0]*1 || 9999;

  for(const mid in marcas) marcas[mid].motores.forEach(mo=>{
    const a = arqDaFamilia(mid, mo), onde = marcas[mid].nome+' / '+mo.nome+' ['+a+']';
    const txt = mo.nome+' '+(mo.desc||'');
    if (/\bdiesel\b|\bTDI\b|TDCi|CRDi|\bdCi\b|\bJTD\b|\bHDi\b|Multijet|Duramax|Power ?Stroke|\bOM\d{3}|Cummins/i.test(mo.nome)
        && tem(a,'velas')) E.push('[peca] diesel com vela de ignicao: '+onde);
    if (/refrigerad[oa] a ar|arrefecid[oa] a ar|\bmotor a ar\b/i.test(txt) && tem(a,'bomba'))
      E.push("[peca] motor a ar com bomba d'agua: "+onde);
    if (fimP(mo.periodo) < 1968 && tem(a,'correia'))
      E.push('[peca] correia dentada em motor anterior a 1962: '+onde);
    if (/dois tempos|2 tempos/i.test(txt) && (tem(a,'comando')||tem(a,'comandos')))
      E.push('[peca] dois tempos com comando de valvulas: '+onde);
    if (a==='eletrico' && /h[íi]brid/i.test(txt))
      W.push('[peca] hibrido classificado como 100% eletrico: '+onde);
  });
  console.log('arquiteturas 3D definidas: '+Object.keys(arquiteturas).length);
}

// ---------- J. NOMES E TEXTOS DAS PECAS ----------
// a mesma peca tem que se chamar sempre do mesmo jeito, e nenhum texto
// pode estar vazio, repetido de outra peca ou com sobra de rascunho
{
  const src = fs.readFileSync('./montagem-dados.js','utf8').replace(/^const /gm,'var ')
            + '\nmodule.exports={arquiteturas};';
  const Mod = new module.constructor();
  Mod._compile(src, process.cwd()+'/_montagem-dados-nomes.js');
  const {arquiteturas} = Mod.exports;

  const nomeDoId = {}, textoDe = {};
  for(const a in arquiteturas){
    const pecas = arquiteturas[a].pecas;

    // dois nomes iguais na mesma lista: o usuario nao sabe qual e qual
    const nomes = pecas.map(p=>p.nome);
    const repetidos = nomes.filter((n,i)=>nomes.indexOf(n)!==i);
    if(repetidos.length) E.push('[nome] duas pecas com o mesmo nome em '+a+': '+[...new Set(repetidos)]);

    pecas.forEach(p=>{
      // A mesma peca com nomes diferentes de uma arquitetura para outra
      // costuma ser de proposito ("Bloco em V", "Rotores triangulares" no
      // plural, "Carter selado" no dois tempos). Por isso e aviso, para
      // conferir de olho, e nao erro: so vale a pena olhar uma vez cada par.
      if(!nomeDoId[p.id]) nomeDoId[p.id] = { nome:p.nome, arq:a, vistos:new Set([p.nome]) };
      else if(!nomeDoId[p.id].vistos.has(p.nome)){
        nomeDoId[p.id].vistos.add(p.nome);
        W.push('[nome] a peca "'+p.id+'" aparece como "'+nomeDoId[p.id].nome+'" e como "'+
               p.nome+'" (em '+a+') — conferir se a diferenca e proposital');
      }

      if(!/^[A-ZÁÂÃÉÊÍÓÔÕÚÇ]/.test(p.nome))
        W.push('[nome] nome de peca comecando em minuscula: '+a+' / '+p.nome);
      if(p.nome.length > 28)
        W.push('[nome] nome de peca comprido demais para o rotulo ('+p.nome.length+'): '+p.nome);

      ['dica','aoEncaixar','seErrar'].forEach(campo=>{
        const t = (p[campo]||'').trim();
        if(t.length < 25) E.push('[texto] '+campo+' curto demais em '+a+' / '+p.id+': "'+t+'"');
        // marcadores de rascunho de verdade: TODO em caixa alta, nao a
        // palavra "todo" no meio de uma frase em portugues
        if(/\bTODO\b|\bFIXME\b|lorem ipsum|\bXXX\b|\.\.\.$/.test(t))
          E.push('[texto] sobra de rascunho em '+a+' / '+p.id+' ('+campo+')');
        if(!/[.!?]$/.test(t)) W.push('[texto] '+campo+' sem ponto final em '+a+' / '+p.id);
        // texto identico usado por duas pecas diferentes
        const chave = campo+'|'+t;
        if(textoDe[chave] && textoDe[chave] !== p.id)
          E.push('[texto] '+campo+' identico em duas pecas diferentes: "'+
                 textoDe[chave]+'" e "'+p.id+'"');
        textoDe[chave] = p.id;
      });
    });
  }
  console.log('ids de peca distintos: '+Object.keys(nomeDoId).length);
}

console.log('==== AUDITORIA COMPLETA ====');
console.log('grupos: '+ordem.length+' | marcas: '+Object.keys(marcas).length+' | familias: '+Object.values(marcas).reduce((s,m)=>s+m.motores.length,0)+' | variantes: '+Object.values(variantes).reduce((s,v)=>s+v.length,0));
console.log('afirmacoes absolutas no texto (revisar manualmente): '+nSup);
console.log('marcas citadas no texto que nao existem no site: '+([...faltantes].join(', ')||'nenhuma'));
console.log('');
console.log('### ERROS ('+E.length+')');
E.forEach(x=>console.log(' - '+x));
console.log('');
console.log('### AVISOS ('+W.length+')');
W.forEach(x=>console.log(' - '+x));
