<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Autenticidade de Documento — MGI</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet">

<style>
  :root {
    --verde:        #1a4a2e;
    --verde-claro:  #2d6a46;
    --verde-menta:  #3d8b5e;
    --ouro:         #b8922a;
    --ouro-claro:   #d4a843;
    --creme:        #f5f0e8;
    --creme-escuro: #ede5d4;
    --papel:        #faf8f3;
    --tinta:        #1a1a18;
    --cinza-sutil:  #c8c0b0;
  }

  * { margin:0; padding:0; box-sizing:border-box; }

  body {
    background: linear-gradient(155deg, #e8e2d5 0%, #dbd4c4 55%, #cec6b3 100%);
    min-height: 100vh;
    font-family: 'EB Garamond', Georgia, serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 36px 20px 48px;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      repeating-linear-gradient(0deg,  transparent, transparent 44px, rgba(26,74,46,0.035) 44px, rgba(26,74,46,0.035) 45px),
      repeating-linear-gradient(90deg, transparent, transparent 44px, rgba(26,74,46,0.035) 44px, rgba(26,74,46,0.035) 45px);
    pointer-events: none;
  }

  /* ══ CABEÇALHO DA PÁGINA ══ */
  .pg-header {
    width: 100%;
    max-width: 860px;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 28px;
    padding: 14px 22px;
    background: rgba(255,255,255,0.55);
    border-radius: 4px;
    border: 1px solid rgba(184,146,42,0.28);
    backdrop-filter: blur(6px);
    animation: slideDown .5s ease both;
  }

  .brasao {
    width: 50px; height: 50px;
    border: 2px solid var(--ouro);
    border-radius: 50%;
    background: radial-gradient(circle, #2d3800, #1a2200);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    box-shadow: 0 0 14px rgba(184,146,42,0.3);
    flex-shrink: 0;
  }

  .pg-header-txt h1 {
    font-family: 'Playfair Display', serif;
    font-size: 12.5px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--verde);
  }

  .pg-header-txt p {
    font-size: 10.5px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #888;
    margin-top: 2px;
  }

  /* ══ DOCUMENTO ══ */
  .documento {
    width: 100%;
    max-width: 860px;
    background: var(--papel);
    border-radius: 2px;
    position: relative;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(184,146,42,0.45),
      0 0 0 5px rgba(184,146,42,0.10),
      0 18px 56px rgba(0,0,0,0.14),
      0 4px 14px rgba(0,0,0,0.08);
    animation: fadeUp .6s ease .15s both;
  }

  /* Guilhoché */
  .faixa {
    height: 44px;
    background: var(--verde);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .faixa::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient( 55deg, transparent, transparent 4px, rgba(255,255,255,0.055) 4px, rgba(255,255,255,0.055) 5px),
      repeating-linear-gradient(-55deg, transparent, transparent 4px, rgba(255,255,255,0.055) 4px, rgba(255,255,255,0.055) 5px);
  }

  .faixa::after {
    content: '';
    position: absolute;
    inset: 0;
    border-top: 1.5px solid rgba(184,146,42,0.4);
    border-bottom: 1.5px solid rgba(184,146,42,0.4);
  }

  .faixa-lbl {
    font-family: 'Source Code Pro', monospace;
    font-size: 9px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.85);
    z-index: 1;
  }

  /* Bordas laterais */
  .bl, .br {
    position: absolute;
    top: 44px; bottom: 44px;
    width: 22px;
    overflow: hidden;
    pointer-events: none;
  }

  .bl { left: 0; }
  .br { right: 0; }

  .bl::before, .br::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(180deg,
      rgba(26,74,46,0.1) 0px, rgba(26,74,46,0.1) 6px,
      rgba(45,106,70,0.05) 6px, rgba(45,106,70,0.05) 12px
    );
  }

  .bl::after {
    content: '';
    position: absolute;
    top:0; bottom:0; right:0;
    width: 1.5px;
    background: linear-gradient(180deg, transparent, rgba(184,146,42,0.3), transparent);
  }

  .br::after {
    content: '';
    position: absolute;
    top:0; bottom:0; left:0;
    width: 1.5px;
    background: linear-gradient(180deg, transparent, rgba(184,146,42,0.3), transparent);
  }

  /* Marca d'água */
  .daguia {
    position: absolute;
    inset: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 0;
  }

  .daguia-txt {
    font-family: 'Playfair Display', serif;
    font-size: 108px;
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 1px rgba(26,74,46,0.07);
    transform: rotate(-22deg);
    white-space: nowrap;
    user-select: none;
  }

  /* ══ INNER ══ */
  .inner {
    padding: 32px 48px 36px;
    position: relative;
  }

  .serial {
    position: absolute;
    font-family: 'Source Code Pro', monospace;
    font-size: 7.5px;
    letter-spacing: 2px;
    color: rgba(26,74,46,0.22);
    writing-mode: vertical-rl;
    top: 50%;
    pointer-events: none;
    z-index: 1;
  }

  .sl { left: 2px; transform: translateY(-50%) rotate(180deg); }
  .sr { right: 2px; transform: translateY(-50%); }

  /* Cabeçalho do doc */
  .doc-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 22px;
    border-bottom: 1px solid var(--cinza-sutil);
    margin-bottom: 26px;
    position: relative;
    z-index: 1;
  }

  .doc-head::after {
    content: '';
    position: absolute;
    bottom: -3px; left:0; right:0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,146,42,0.38), transparent);
  }

  .dh-pre {
    font-family: 'Source Code Pro', monospace;
    font-size: 8.5px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--verde-menta);
    margin-bottom: 5px;
  }

  .dh-titulo {
    font-family: 'Playfair Display', serif;
    font-size: 23px;
    color: var(--verde);
    font-weight: 700;
    line-height: 1.2;
  }

  .dh-sub {
    font-size: 12px;
    color: #999;
    font-style: italic;
    margin-top: 4px;
  }

  /* Badge */
  .badge {
    flex-shrink: 0;
    min-width: 148px;
    padding: 12px 18px;
    border-radius: 2px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
  }

  .badge.loading  { background:#f0ede6; border:1.5px solid #ccc; color:#aaa; }
  .badge.valido   { background:linear-gradient(135deg,#ecf7f1,#d6f0e0); border:1.5px solid var(--verde-menta); color:var(--verde); box-shadow:0 4px 14px rgba(45,106,70,0.1); }
  .badge.invalido { background:linear-gradient(135deg,#fff2f2,#ffe0e0); border:1.5px solid #c53030; color:#c53030; }

  .b-icon { font-size: 20px; line-height: 1; }
  .b-main { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; }
  .b-sub  { font-family: 'Source Code Pro', monospace; font-size: 7.5px; letter-spacing: 2px; text-transform: uppercase; opacity:.65; }

  /* ══ SEÇÕES ══ */
  .secao {
    position: relative;
    z-index: 1;
    margin-bottom: 20px;
  }

  .sec-lbl {
    font-family: 'Source Code Pro', monospace;
    font-size: 8.5px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--ouro);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sec-lbl::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(184,146,42,0.4), transparent);
  }

  .grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .grid1   { display: grid; grid-template-columns: 1fr; gap: 14px; }
  .sp2     { grid-column: 1 / -1; }

  .campo-lbl {
    font-family: 'Source Code Pro', monospace;
    font-size: 8px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #aaa;
    margin-bottom: 4px;
  }

  .campo-val {
    font-size: 15px;
    color: var(--tinta);
    font-weight: 500;
    padding: 8px 12px;
    background: var(--creme-escuro);
    border-left: 3px solid var(--verde-menta);
    border-radius: 0 2px 2px 0;
    min-height: 36px;
    display: flex;
    align-items: center;
  }

  .campo-val.vazio { color: #bbb; font-style: italic; font-size: 13px; }

  .divisor {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--cinza-sutil), transparent);
    margin: 18px 0;
    position: relative;
    z-index: 1;
  }

  /* ══ RODAPÉ SEGURANÇA ══ */
  .rodape {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 24px;
    align-items: end;
    padding-top: 18px;
    border-top: 1px solid var(--cinza-sutil);
  }

  .rodape::before {
    content: '';
    position: absolute;
    top: -3px; left:0; right:0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,146,42,0.28), transparent);
  }

  .seg-titulo {
    font-family: 'Source Code Pro', monospace;
    font-size: 8.5px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--verde-menta);
    margin-bottom: 12px;
  }

  .cod-item { margin-bottom: 10px; }

  .cod-lbl {
    font-family: 'Source Code Pro', monospace;
    font-size: 7.5px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #bbb;
    margin-bottom: 4px;
  }

  .cod-val {
    font-family: 'Source Code Pro', monospace;
    font-size: 11px;
    color: var(--verde);
    background: var(--creme-escuro);
    padding: 6px 10px;
    border-radius: 2px;
    border: 1px solid rgba(45,106,70,0.15);
    word-break: break-all;
  }

  .rodape-note { font-size: 11px; font-style: italic; color: #aaa; margin-top: 10px; line-height: 1.6; }

  .qr-wrap { display: flex; flex-direction: column; align-items: center; gap: 7px; }

  .qr-frame {
    border: 2px solid var(--verde);
    padding: 7px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 4px 12px rgba(26,74,46,0.13);
    position: relative;
  }

  .qr-frame::before, .qr-frame::after {
    content: '';
    position: absolute;
    width: 9px; height: 9px;
    border-color: var(--ouro);
    border-style: solid;
  }

  .qr-frame::before { top:-2px; left:-2px; border-width:2px 0 0 2px; }
  .qr-frame::after  { bottom:-2px; right:-2px; border-width:0 2px 2px 0; }
  .qr-frame img { width:96px; height:96px; display:block; }

  .qr-lbl { font-family:'Source Code Pro',monospace; font-size:7.5px; letter-spacing:2px; text-transform:uppercase; color:#bbb; }

  /* mensagens centro */
  .msg-c { text-align:center; padding:28px 0; font-size:14px; font-style:italic; color:#aaa; position:relative; z-index:1; }

  @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.4} }
  @keyframes slideDown{ from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)}  to{opacity:1;transform:translateY(0)} }

  .pulsing { animation: pulse 1.4s ease infinite; }

  .pg-footer {
    margin-top: 18px;
    font-family: 'Source Code Pro', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    color: rgba(26,74,46,0.38);
    text-align: center;
    animation: fadeUp .6s ease .4s both;
  }

  @media(max-width:600px){
    .inner { padding:22px 26px; }
    .grid  { grid-template-columns:1fr; }
    .doc-head { flex-direction:column; }
    .badge { width:100%; }
    .rodape { grid-template-columns:1fr; }
    .daguia-txt { font-size:70px; }
  }
</style>
</head>
<body>

<header class="pg-header">
  <div class="brasao">⚖</div>
  <div class="pg-header-txt">
    <h1>Ministério da Gestão e Inovação</h1>
    <p>Sistema Federal de Validação Documental</p>
  </div>
</header>

<div class="documento">

  <div class="faixa">
    <span class="faixa-lbl">Conferência de Autenticidade · República Federativa do Brasil</span>
  </div>

  <div class="bl"></div>
  <div class="br"></div>

  <div class="daguia">
    <div class="daguia-txt" id="wm">VÁLIDO</div>
  </div>

  <div class="inner">
    <div class="serial sl" id="sl">MGI-DOC</div>
    <div class="serial sr" id="sr">MGI-DOC</div>

    <!-- Cabeçalho -->
    <div class="doc-head">
      <div>
        <div class="dh-pre">Certificado de Autenticidade</div>
        <div class="dh-titulo" id="titulo">Validação de Documento</div>
        <div class="dh-sub"   id="subtit">Aguardando validação...</div>
      </div>
      <div class="badge loading pulsing" id="badge">
        <div class="b-icon">⏳</div>
        <div class="b-main">Validando</div>
        <div class="b-sub">Aguarde</div>
      </div>
    </div>

    <!-- Dados -->
    <div id="dados">
      <div class="msg-c pulsing">Consultando servidor de autenticidade...</div>
    </div>

    <div class="divisor"></div>

    <!-- Segurança -->
    <div class="rodape">
      <div>
        <div class="seg-titulo">Elementos de Segurança</div>
        <div class="cod-item">
          <div class="cod-lbl">Código Verificador</div>
          <div class="cod-val" id="cod-box">—</div>
        </div>
        <div class="cod-item">
          <div class="cod-lbl">Hash de Segurança (SHA-256)</div>
          <div class="cod-val" id="hash-box">—</div>
        </div>
        <div class="rodape-note" id="note">
          Este documento está sendo verificado eletronicamente junto aos servidores do MGI.
        </div>
      </div>
      <div class="qr-wrap">
        <div class="qr-frame"><img id="qr" src="" alt="QR Code" /></div>
        <div class="qr-lbl">Verificar QR</div>
      </div>
    </div>

  </div>

  <div class="faixa">
    <span class="faixa-lbl">Documento Oficial — Uso Exclusivo da Administração Pública Federal</span>
  </div>

</div>

<div class="pg-footer">MGI · Sistema de Validação · Brasil · <span id="ano"></span></div>

<script>
document.getElementById('ano').textContent = new Date().getFullYear();

/* ── helpers ── */
const def = x => (x && x !== "" && x !== "-" && x !== null && x !== undefined) ? x : null;

function fmt(str) {
  if (!def(str)) return null;
  const d = new Date(str);
  if (isNaN(d)) return str;
  const p = n => String(n).padStart(2,'0');
  return `${p(d.getDate())}/${p(d.getMonth()+1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function campo(label, valor, span) {
  const vl = def(valor);
  return `<div class="${span ? 'sp2' : ''}">
    <div class="campo-lbl">${label}</div>
    <div class="campo-val${vl ? '' : ' vazio'}">${vl || '—'}</div>
  </div>`;
}

function secao(label, gridClass, campos) {
  return `<div class="secao">
    <div class="sec-lbl">${label}</div>
    <div class="${gridClass}">${campos}</div>
  </div>`;
}

/* ── main ── */
window.onload = async function () {
  const p      = new URLSearchParams(window.location.search);
  const codigo = p.get("codigo") || "";
  const hash   = p.get("hash")   || "";

  document.getElementById('qr').src =
    `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`;
  document.getElementById('cod-box').textContent  = codigo || "—";
  document.getElementById('hash-box').textContent = hash ? hash.substring(0,36)+"…" : "—";

  const shortC = (codigo || "DOCMGI").toUpperCase().substring(0,8);
  document.getElementById('sl').textContent = `MGI-${shortC}`;
  document.getElementById('sr').textContent = `MGI-${shortC}`;

  /* fetch */
  let payload;
  try {
    const res = await fetch(`/api/validar?codigo=${encodeURIComponent(codigo)}&hash=${encodeURIComponent(hash)}`);
    payload = await res.json();
    console.log("API →", payload);
  } catch(e) {
    return setErro("Erro de conexão: " + e.message);
  }

  /*
   * A API já normaliza e devolve campos prontos em payload.dados:
   *
   * FISCALIZAÇÃO  → { solicitante, status, matricula, chefeSetor, chefeMatricula, dataHora }
   * TRANSPORTE    → { solicitante, status, chefeSetor, chefeMatricula, chefeData,
   *                   responsavelTransporte, transporteMatricula, transporteData }
   */
  const status = (payload.status || "").toLowerCase();
  const tipo   = (payload.tipo   || "").toLowerCase();
  const d      = payload.dados   || {};

  /* badge */
  const badge = document.getElementById('badge');
  badge.classList.remove('loading','pulsing');

  if (status !== "valido") {
    badge.className = "badge invalido";
    badge.innerHTML = `<div class="b-icon">✗</div><div class="b-main">Inválido</div><div class="b-sub">Não autenticado</div>`;
    document.getElementById('wm').textContent = "INVÁLIDO";
    document.getElementById('dados').innerHTML = `<div class="msg-c" style="color:#c53030">Documento não encontrado ou hash inválido.</div>`;
    document.getElementById('note').textContent = "Documento não autenticado. Procure o órgão emissor.";
    return;
  }

  badge.className = "badge valido";
  badge.innerHTML = `<div class="b-icon">✔</div><div class="b-main">Autêntico</div><div class="b-sub">Verificado</div>`;
  document.getElementById('note').textContent =
    "Documento verificado eletronicamente e reconhecido como autêntico pelos servidores do Ministério da Gestão e Inovação.";

  /* renderização por tipo */
  let html = "";

  if (tipo === "fiscalizacao" || tipo === "fiscalização") {

    document.getElementById('titulo').textContent = "Fiscalização de Contrato";
    document.getElementById('subtit').textContent = "Documento de Fiscalização — Administração Pública Federal";

    /* Fiscal pode vir em solicitante ou chefeSetor dependendo do flow */
    const fiscal     = def(d.solicitante) || def(d.chefeSetor) || null;
    const matricula  = def(d.matricula)   || def(d.chefeMatricula) || null;
    const dataHora   = fmt(d.dataHora)    || def(d.chefeData) || null;

    html =
      secao("Responsável pela Fiscalização", "grid",
        campo("Fiscal do Contrato",  fiscal,    true) +
        campo("Matrícula",           matricula) +
        campo("Status do Documento", d.status)  +
        (dataHora ? campo("Data / Hora",  dataHora) : "")
      );

  } else if (tipo === "transporte") {

    document.getElementById('titulo').textContent = "Autorização de Transporte";
    document.getElementById('subtit').textContent = "Documento de Transporte — Administração Pública Federal";

    html =
      secao("Solicitante", "grid1",
        campo("Nome do Solicitante",  d.solicitante, true) +
        campo("Status do Documento",  d.status,      true)
      ) +
      `<div class="divisor"></div>` +
      secao("Aprovação do Setor", "grid",
        campo("Chefe do Setor",     d.chefeSetor) +
        campo("Matrícula do Chefe", d.chefeMatricula)
      ) +
      `<div class="divisor"></div>` +
      secao("Responsável pelo Transporte", "grid",
        campo("Responsável Transporte", d.responsavelTransporte) +
        campo("Matrícula",              d.transporteMatricula) +
        campo("Data de Aprovação",      fmt(d.transporteData) || def(d.transporteData), true)
      );

  } else {
    /* fallback genérico */
    document.getElementById('titulo').textContent = "Validação de Documento";
    document.getElementById('subtit').textContent = "Administração Pública Federal";
    const campos = Object.entries(d).map(([k, val]) => campo(k, val)).join('');
    html = secao("Dados do Documento", "grid", campos);
  }

  document.getElementById('dados').innerHTML = html;
};

function setErro(msg) {
  const badge = document.getElementById('badge');
  badge.className = "badge invalido";
  badge.classList.remove('pulsing');
  badge.innerHTML = `<div class="b-icon">✗</div><div class="b-main">Erro</div><div class="b-sub">Falha</div>`;
  document.getElementById('wm').textContent = "ERRO";
  document.getElementById('dados').innerHTML = `<div class="msg-c" style="color:#c53030">${msg}</div>`;
}
</script>
</body>
</html>
