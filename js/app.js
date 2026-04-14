// ════════════════════════════════════════════════════
// DADOS DE REFERÊNCIA — extraídos da planilha
// ════════════════════════════════════════════════════
const REF = {
  equipamentos: [
    {tag:551,nome:'EGD551 - RANGER S3 V2',modelo:'RANGER S3 v2'},
    {tag:549,nome:'EGD549 - RANGER S4 V2',modelo:'RANGER S4 v2'},
    {tag:547,nome:'EGD547 - RANGER S3 V2',modelo:'RANGER S3 v2'},
    {tag:203,nome:'EGD203 - PERSEUS',modelo:'PERSEUS'},
    {tag:550,nome:'EGD550 - RANGER S3 V2',modelo:'RANGER S3 v2'},
    {tag:537,nome:'EGD537 - RANGER S3 V2',modelo:'RANGER S3 v2'},
    {tag:512,nome:'EGD512 - RANGER S3 V2',modelo:'RANGER S3 v2'},
    {tag:546,nome:'EGD546 - RANGER S3 V2',modelo:'RANGER S3 v2'},
    {tag:204,nome:'EGD204 - RANGER S3 V1.5',modelo:'RANGER S3 v1.5'},
    {tag:548,nome:'EGD548 - RANGER S3 V1.5',modelo:'RANGER S3 v1.5'},
    {tag:721,nome:'EGD721 - CS1000',modelo:'CS1000'},
    {tag:259,nome:'EGD259 - RANGER S3-e UG',modelo:'RANGER S3-e UG'},
    {tag:617,nome:'EGD617 - RANGER S3 V1',modelo:'RANGER S3 v1'},
    {tag:257,nome:'EGD257 - RANGER S3 V1',modelo:'RANGER S3 v1'},
    {tag:552,nome:'EGD552 - RANGER S4 V1',modelo:'RANGER S4 v1'},
    {tag:535,nome:'EGD535 - RANGER S3 V1.5',modelo:'RANGER S3 v1.5'},
    {tag:265,nome:'EGD265 - RANGER S3 V1.5',modelo:'RANGER S3 v1.5'},
    {tag:262,nome:'EGD262 - RANGER S3 V1',modelo:'RANGER S3 v1'},
    {tag:251,nome:'EGD251 - RANGER S3 V1',modelo:'RANGER S3 v1'},
    {tag:261,nome:'EGD261 - RANGER S3 V1',modelo:'RANGER S3 v1'},
    {tag:510,nome:'EGD510 - RANGER S3 V2',modelo:'RANGER S3 v2'},
    {tag:850,nome:'EGD850 - TITAN RC',modelo:'TITAN'},
    {tag:711,nome:'EGD711 - CS1000',modelo:'CS1000'},
    {tag:720,nome:'EGD720 - CS1000',modelo:'CS1000'},
  ],
  projetos: [
    {id:'ENERGOLD',nome:'Sem Alocação Específica',cliente:'ENERGOLD'},
    {id:'1509-VALE_SU',nome:'Vale Sul',cliente:'VALE'},
    {id:'1509-VALE_SD',nome:'Vale Sudeste',cliente:'VALE'},
    {id:'1522-MDB',nome:'Mineral do Brasil',cliente:'MINERAL DO BRASIL'},
    {id:'1536-M4E',nome:'M4E',cliente:'M4E'},
    {id:'1537-AGA',nome:'AngloGold Ashanti',cliente:'ANGLOGOLD ASHANTI'},
    {id:'1538-EQUINOX',nome:'Equinox Gold',cliente:'EQUINOX GOLD'},
    {id:'1534-ST GEORGE',nome:'St George',cliente:'ST GEORGE'},
    {id:'1523-PLS',nome:'PLS',cliente:'PLS'},
    {id:'1513-BORBOREMA',nome:'Borborema',cliente:'BORBOREMA'},
    {id:'1539-VIRIDIS',nome:'Viridis',cliente:'VIRIDIS'},
  ],
  locais: [
    'Mina CPX','Mina de Horizontes','Mina de Brucutu','Mina de Tamanduá',
    'Ponte de Arame','Mina de Viga','Concessões Norte','Araxá','Araçuaí',
    'Jitaúna','Mina Cuiabá','Mina Franceses','Salinas','Condomínio',
    'MAC','Cianita','Peneirinha','Mina Monte Alto','FOG\'s','Mina de Teixeirinha',
    'Mina de Formigueiro','Mina CDN','Colina','Lajinha','Gerais','Fzd Br',
    'Self-Storage','Mina de Gongo Soco','Oficina',
  ],
  sistemas: [
    'Básico Estrutural',
    'Sistema Elétrico',
    'Unidade de Potência',
    'Tanque Hidráulico',
    'Sistema de Resfriamento',
    'Sistema de Controle',
    'Bomba de Lama',
    'Mud Mixer',
    'Unidade de Perfuração',
    'Grade de Proteção',
  ],
  componentesPorSistema: {
    'Básico Estrutural':['Chassi','Base da sonda','Mastro / torre','Mesa / plataforma','Patolas','Esteiras / rodado','Passadiço','Suporte estrutural','Pontos de fixação'],
    'Sistema Elétrico':['Painel elétrico','Chicote elétrico','Sensores','Botoeira de emergência','Iluminação','Bateria','Alternador','Motor de partida','Relés e fusíveis'],
    'Unidade de Potência':['Motor diesel','Sistema de admissão','Sistema de exaustão','Sistema de combustível','Lubrificação do motor','Acoplamento','Correias e polias','Coxins','Tomada de força'],
    'Tanque Hidráulico':['Reservatório','Tampa / respiro','Filtro de retorno','Filtro de sucção','Visor de nível','Mangueiras','Conexões','Válvulas','Suportes'],
    'Sistema de Resfriamento':['Radiador','Ventoinha','Bomba d\'água','Mangueiras','Abraçadeiras','Trocador de calor','Reservatório de expansão','Termostato'],
    'Sistema de Controle':['Comando hidráulico','Joysticks / alavancas','Painel de comandos','CLP / módulos','Válvulas de controle','Intertravamentos','Instrumentação','Display / indicadores'],
    'Bomba de Lama':['Corpo da bomba','Cabeçote','Camisa','Pistão','Válvulas','Selo','Mangueiras','Conexões','Motor / acionamento'],
    'Mud Mixer':['Tanque','Agitador','Motor do agitador','Redutor','Tubulação','Registro / válvula','Estrutura','Mangueiras'],
    'Unidade de Perfuração':['Top drive / cabeçote','Motor de rotação','Caixa de marchas','Mandril','Morsa','Morsa dupla','Footclamp','Guincho','Cilindro de avanço','Cabeça d\'água','Stinger','Sardinha'],
    'Grade de Proteção':['Tela','Porta','Fecho','Dobradiça','Suportes','Fixações','Intertravamento'],
  },
  modosFalha: [
    'Preventiva 100 Horas','Preventiva 200 Horas','Preventiva 250 Horas',
    'Preventiva 400 Horas','Preventiva 500 Horas','Preventiva 600 Horas',
    'Preventiva 750 Horas','Preventiva 800 Horas','Preventiva 1000 Horas',
    'Preventiva 2000 Horas','Falta de Componente','Lubrificação','Perda de Pressão',
    'Falha Mecânica','Quebra de Componente','Pane elétrica','Sem informações',
    'Superaquecimento','Vazamento','Instalação de Componente','Contaminação',
  ],
  causasRaiz: ['Falta de Lubrificação','Em Análise'],
  efeitos: ['Perda de Pressão','Parada de Máquina','Em Análise'],
  mecanicos: [
    'Eustáquio Martins','Kleber Valadares','Adriano Bispo','Adriano da Cunha',
    'Aldenício','Gabriel','Hugo Fróes','Jadson','Jean Paulo','Júlio Braga',
    'Erick Jonathan','Leandro Alves','Perseu Soares','Gustavo Campolina',
    'Leonardo Nascimento','Jean Paulo','Rodrigo Freire','Expedito Cândido',
    'Marlon Lúcio','Jocimar Silva','Dayvid Magalhães','Jocimar','Leandro',
    'Henrique Campos','Henrique Marques','Gilson Miranda','Flavio Gonçalves',
    'Ramiro Coelho','Wanderson Farley','Elismar Guedes','João Pedro','Adriano Bispo',
  ].filter((v,i,a)=>a.indexOf(v)===i).sort(),
  sondadores: [
    'Ramiro Coelho','Maurício Ribeiro','Elismar Guedes','Emanuel Gomes',
    'Mauricio Santos','Felipe Cardoso','Brenner Rafael','Wellington Amancio',
    'Alan Meireles','Cassio Amancio','Anderson Flores','Joelson Santos',
    'Jusseilton Moura','Joelson Joel','Anderson Brito','Olair Teixeira',
    'Abraão G','Welington Francisco','Salomão Lucas','Frances de Souza',
    'Robson Moreira','Ivanilson Nunes','Antônio Nazareno','Luiz Antonio',
    'Jonas Brito','Mateus Teixeira','Paulo Geovane','Lucas Gomes',
    'Fabio Henrique','Egberto Junior','Wesley Roberto','Fabricio Junior',
    'Leandro Oliveira','Gilson Miranda','Genisson Thales','João Pedro',
    'Henrique Teixeira','Josimar das Neves','Flavio Gonçalves','Elivan Belarmino',
    'Cleiton Matos','Eugenio Madureira','Thales Henrique','Geraldo Magella',
    'Guilherme Assunção','Wanderson Santos','Wanderson Farley',
  ].filter((v,i,a)=>a.indexOf(v)===i).sort(),
};

// ════════════════════════════════════════════════════
// GOOGLE SHEETS
// ════════════════════════════════════════════════════
const API_URL = 'https://script.google.com/macros/s/AKfycbwN6RsObfniz6_CVLUpUG6Wci_D6k9pBwP8Wm1eTCXyCHX_fkn9jZtwaJJDlvPpm6ZuEA/exec';
let remoteCadastros = null;

async function apiGet(action){
  const params = new URLSearchParams({ action });
  if(currentUser){ params.set('usuario', currentUser.usuario); params.set('hash', currentUser.hash); }
  const resp = await fetch(`${API_URL}?${params.toString()}`);
  return await resp.json();
}

async function apiPost(action, data){
  const creds = currentUser ? { usuario: currentUser.usuario, hash: currentUser.hash } : {};
  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, data, ...creds })
  });
  return await resp.json();
}

function uniqueSorted(arr){
  return [...new Set((arr || []).map(v => String(v || '').trim()).filter(Boolean))]
    .sort((a,b)=>a.localeCompare(b,'pt-BR',{sensitivity:'base'}));
}

function remoteOrLocal(key, fallback){
  if(remoteCadastros && Array.isArray(remoteCadastros[key]) && remoteCadastros[key].length){
    return uniqueSorted(remoteCadastros[key]);
  }
  return fallback;
}

function getProjetoRows(projeto){
  const codigo = String(projeto || '').trim();
  if(!codigo) return [];

if(remoteCadastros && Array.isArray(remoteCadastros.linhasProjeto) && remoteCadastros.linhasProjeto.length){
  return remoteCadastros.linhasProjeto
    .filter(r => String((r && r.projeto) || '').trim() === codigo)
    .map(r => ({
      projeto: String((r && r.projeto) || '').trim(),
      cliente: String((r && r.cliente) || '').trim()
    }));
}

  return (REF.projetos || [])
  .filter(p => String((p && p.id) || '').trim() === codigo)
  .map(p => ({
    projeto: String((p && p.id) || '').trim(),
    cliente: String((p && p.cliente) || '').trim()
  }));
}

function getProjetosFonte(){
  if(remoteCadastros && Array.isArray(remoteCadastros.linhasProjeto) && remoteCadastros.linhasProjeto.length){
    const projetos = uniqueSorted(remoteCadastros.linhasProjeto.map(r => r && r.projeto));
    if(projetos.length){
      return projetos.map(p => ({ id:p, nome:p }));
    }
  }

  if(remoteCadastros && Array.isArray(remoteCadastros.projetos) && remoteCadastros.projetos.length){
    return uniqueSorted(remoteCadastros.projetos).map(p => ({ id:p, nome:p }));
  }

  return (REF.projetos || []).map(p => ({ id:p.id, nome:p.nome || p.id }));
}

function getClienteFromProjeto(projeto){
  const rows = getProjetoRows(projeto);
  const clientes = uniqueSorted(rows.map(r => r.cliente));
  if(clientes.length) return clientes[0];

  const ref = (REF.projetos || []).find(p => String((p && p.id) || '').trim() === String(projeto || '').trim());
  return ref && ref.cliente ? String(ref.cliente).trim() : '';
}

function getLocaisFromProjeto(projeto){
  return remoteOrLocal('locais', REF.locais);
}

function getEquipamentosFonte(){
  if (
    remoteCadastros &&
    Array.isArray(remoteCadastros.linhasEquipamento) &&
    remoteCadastros.linhasEquipamento.length
  ) {
    return remoteCadastros.linhasEquipamento.map(e => ({
      tag: Number(e.tag),
      nome: e.equipamento,
      modelo: e.modelo
    }));
  }

  return REF.equipamentos || [];
}

async function carregarCadastrosGoogle(){
  try{
    const result = await apiGet('listarCadastros');
    if(result && result.success && result.data){
      remoteCadastros = result.data;
      try{ localStorage.setItem('eg_remote_cadastros', JSON.stringify(result.data)); }catch(_){ }
      return true;
    }
  }catch(err){
    console.warn('Falha ao carregar cadastros Google Sheets:', err);
  }

  try{
    const cache = JSON.parse(localStorage.getItem('eg_remote_cadastros') || 'null');
    if(cache){
      remoteCadastros = cache;
      return false;
    }
  }catch(_){ }

  return false;
}

function getSistemasFonte(){
  if (
    remoteCadastros &&
    Array.isArray(remoteCadastros.sistemas) &&
    remoteCadastros.sistemas.length
  ) {
    return remoteCadastros.sistemas;
  }

  return REF.sistemas || [];
}

function getComponentesPorSistemaFonte(sistema){
  if (
    remoteCadastros &&
    remoteCadastros.componentesPorSistema &&
    Array.isArray(remoteCadastros.componentesPorSistema[sistema])
  ) {
    return remoteCadastros.componentesPorSistema[sistema];
  }

  return (REF.componentesPorSistema && REF.componentesPorSistema[sistema]) || [];
}

function toInputDateTimeValue(value){
  if(!value) return '';
  const txt = String(value).trim();
  if(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(txt)) return txt;
  if(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(txt)) return txt.replace(' ','T');
  const br = txt.match(/^(\d{2})\/(\d{2})\/(\d{4})[ T](\d{2}):(\d{2})$/);
  if(br) return `${br[3]}-${br[2]}-${br[1]}T${br[4]}:${br[5]}`;
  const d = new Date(txt);
  if(!isNaN(d)){
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,'0');
    const day = String(d.getDate()).padStart(2,'0');
    const hh = String(d.getHours()).padStart(2,'0');
    const mm = String(d.getMinutes()).padStart(2,'0');
    return `${y}-${m}-${day}T${hh}:${mm}`;
  }
  return '';
}

function dedupeOSById(rows){
  const map = new Map();
  for(const row of rows || []){
    if(!row || !row.id) continue;
    const atual = map.get(row.id);
    const atualTs = atual ? (Date.parse(atual.data_registro || atual.inicio || '') || 0) : 0;
    const novoTs = Date.parse(row.data_registro || row.inicio || '') || 0;
    if(!atual || novoTs >= atualTs){
      map.set(row.id, row);
    }
  }
  return Array.from(map.values());
}

function normalizeStatus(v){
  const s = String(v || '').trim().toLowerCase();
  if(!s) return '';
  if(s === 'concluida' || s === 'concluída') return 'Concluído';
  if(s === 'cancelada') return 'Cancelado';
  if(s === 'em andamento') return 'Em andamento';
  if(s === 'em aberto' || s === 'aberta' || s === 'aberto') return 'Em Aberto';
  return String(v).trim();
}

function normalizeGoogleOSRow(row){
  if(!row || typeof row !== 'object') return null;

  const payload = (() => {
    try{
      return row.payload_json ? JSON.parse(row.payload_json) : (row.payload && typeof row.payload === 'object' ? row.payload : {});
    }catch(_){
      return row.payload && typeof row.payload === 'object' ? row.payload : {};
    }
  })();

  const get = (...keys) => {
    for(const k of keys){
      if(payload && payload[k] != null && payload[k] !== '') return payload[k];
      if(row && row[k] != null && row[k] !== '') return row[k];
    }
    return '';
  };

  const inicio = get('inicio');
  const termino = get('termino');
  let tempoH = get('tempoH', 'tempo_horas');
  if(tempoH === '' && inicio && termino){
    const ms = new Date(termino) - new Date(inicio);
    if(ms > 0) tempoH = ms / 1000 / 3600;
  }

  const numero = get('numero', 'numero_os');
  const horimetroAtual = get('horimetroAtual', 'horimetro_atual');
  const tagRaw = get('tag');
  const tag = tagRaw === '' ? '' : Number(tagRaw);

  return {
    id: String(get('id') || row.id || Date.now()),
    data_registro: formatarDataRegistro(get('data_registro') || row.data_registro || ''),
    updated_at: get('updated_at') || get('data_registro') || row.updated_at || row.data_registro || '',
    numero: String(numero || ''),
    tag: Number.isFinite(tag) ? tag : tagRaw,
    equipamento: String(get('equipamento') || ''),
    modelo: String(get('modelo') || ''),
    projeto: String(get('projeto') || ''),
    cliente: String(get('cliente') || ''),
    local: String(get('local') || ''),
    mecanico: String(get('mecanico') || ''),
    sondador: String(get('sondador') || ''),
    tipo: String(get('tipo') || ''),
    sistema: String(get('sistema') || ''),
    componente: String(get('componente') || ''),
    servico: String(get('servico') || ''),
    obs: String(get('obs', 'observacao') || ''),
    inicio: String(toInputDateTimeValue(inicio) || inicio || ''),
    termino: String(toInputDateTimeValue(termino) || termino || ''),
    tempoH: tempoH === '' ? 0 : Number(tempoH) || 0,
    data: String((payload && payload.data) || get('data', 'data_manutencao') || (inicio ? String(toInputDateTimeValue(inicio) || inicio).split('T')[0] : '')),
    horimetroAtual: horimetroAtual === '' ? null : Number(horimetroAtual),
    status: normalizeStatus(get('status') || ''),
    assinada: String(get('assinada') || ''),
    registrado_por: String(get('registrado_por') || ''),
    fechado_por: String(get('fechado_por') || ''),
    origem: 'google',
    syncStatus: 'synced',
    syncError: ''
  };
}

function atualizarProximoNumeroComBaseNaLista(){
  const nums = os_list
    .map(o => String(o.numero || ''))
    .map(n => {
      const m = n.match(/(\d+)$/);
      return m ? Number(m[1]) : null;
    })
    .filter(v => Number.isFinite(v));
  const maior = nums.length ? Math.max(...nums) : (Number(config.proximo) - 1 || 0);
  config.proximo = Math.max(Number(config.proximo) || 1, maior + 1);
  saveCfg();
}

async function carregarOSGoogle(silent=false, options={}){
  try{
    const result = await apiGet('listarOS');

    if(result && result.success && Array.isArray(result.rows)){
      const rows = result.rows
        .map(normalizeGoogleOSRow)
        .filter(o => o && o.id);

      const dedupedRows = dedupeOSById(rows);

      os_list = mergeOSLists(dedupedRows, os_list, os_pending);
      save();
      atualizarProximoNumeroComBaseNaLista();

      const forceRefreshActivePage = !!options.forceRefreshActivePage;
      const source = options.source || '';

      if(shouldDeferVisualRefresh() && !forceRefreshActivePage){
        pendingRemoteRefresh = true;
        pendingRemoteRefreshSource = source || 'sync';
        updateEditRefreshAlert();
      }else{
        refreshActivePageAfterSync();

        if(pendingRemoteRefresh){
          pendingRemoteRefresh = false;
          pendingRemoteRefreshSource = '';
          updateEditRefreshAlert();
        }
      }

      if(!silent){
        const pend = os_pending.length;
        toast(`Sincronização concluída: ${dedupedRows.length} OS remotas / ${os_list.length} totais${pend ? ` / ${pend} pendente(s)` : ''}.`);
      }

      return true;
    }
  }catch(err){
    console.warn('Falha ao sincronizar OS do Google Sheets:', err);
    if(!silent) toast('Falha ao sincronizar OS do Google Sheets. Exibindo dados locais.', true);
  }

  return false;
}


function refreshActivePageAfterSync(){
  try{
    const active = document.querySelector('.page.active');
    if(!active) return;
    const pid = active.id || '';
    if(pid === 'page-dashboard'){
      renderDash();
      return;
    }
    if(pid === 'page-lista-os'){
      populateFiltros();
      renderLista();
      return;
    }
    if(pid === 'page-perfis'){
      renderPerfis();
      return;
    }
  }catch(err){
    console.warn('Falha ao atualizar página ativa após sync:', err);
  }
}

// ════════════════════════════════════════════════════
// ESTADO
// ════════════════════════════════════════════════════
let os_list = JSON.parse(localStorage.getItem('eg_os') || '[]');
let config = JSON.parse(localStorage.getItem('eg_config') || JSON.stringify({
  empresa:'ENERGOLD DRILLING DO BRASIL', projeto:'1537-AGA', prefixo:'OS', proximo:3794
}));
let os_pending = JSON.parse(localStorage.getItem('eg_os_pending') || '[]');
let currentModal = null;
let isEditingOS = false;
let pendingRemoteRefresh = false;
let pendingRemoteRefreshSource = '';

function save(){ localStorage.setItem('eg_os', JSON.stringify(os_list)); }
function saveCfg(){ localStorage.setItem('eg_config', JSON.stringify(config)); }
function savePending(){ localStorage.setItem('eg_os_pending', JSON.stringify(os_pending)); }

function setEditingOS(flag){
  isEditingOS = !!flag;
  updateEditRefreshAlert();
}

function updateEditRefreshAlert(){
  const alertEl = document.getElementById('edit-refresh-alert');
  if(!alertEl) return;
  const shouldShow = !!(isEditingOS && pendingRemoteRefresh);
  alertEl.classList.toggle('show', shouldShow);
}

function shouldDeferVisualRefresh(){
  const formPage = document.getElementById('page-nova-os');
  const formActive = !!(formPage && formPage.classList.contains('active'));
  const formHasFocus = !!(document.activeElement && document.activeElement.closest && document.activeElement.closest('#os-form'));
  return !!(isEditingOS && (formActive || formHasFocus));
}

async function processDeferredRemoteRefresh(force=false){
  if(!pendingRemoteRefresh) return false;
  if(!force && shouldDeferVisualRefresh()) return false;
  const origem = pendingRemoteRefreshSource || 'deferred';
  pendingRemoteRefresh = false;
  pendingRemoteRefreshSource = '';
  updateEditRefreshAlert();
  try{
    return await carregarOSGoogle(true, { source: origem, forceRefreshActivePage: true });
  }catch(err){
    console.warn('Falha ao aplicar atualização pendente:', err);
    return false;
  }
}

async function aplicarAtualizacaoPendente(){
  if(!pendingRemoteRefresh) return false;
  return await processDeferredRemoteRefresh(true);
}

function upsertOSLocal(os){
  const idx = os_list.findIndex(o => o.id === os.id);
  if(idx >= 0) os_list[idx] = { ...os_list[idx], ...os };
  else os_list.push(os);
  save();
}

function markOSPending(os, motivo='pendente'){
  const payload = {
    ...os,
    syncStatus: 'pending',
    syncError: motivo,
    updated_at: os.updated_at || new Date().toISOString()
  };
  upsertOSLocal(payload);
  const idx = os_pending.findIndex(o => o.id === payload.id);
  if(idx >= 0) os_pending[idx] = payload;
  else os_pending.push(payload);
  savePending();
}

function markOSSynced(os){
  const payload = {
    ...os,
    syncStatus: 'synced',
    syncError: '',
    updated_at: os.updated_at || new Date().toISOString()
  };
  upsertOSLocal(payload);
  os_pending = os_pending.filter(o => o.id !== payload.id);
  savePending();
}

function mergeOSLists(remoteRows, localRows, pendingRows){
  const map = new Map();

  (remoteRows || []).forEach(r => {
    if(!r || !r.id) return;
    const id = String(r.id);
    map.set(id, {
      ...r,
      id,
      origem: 'google',
      syncStatus: 'synced',
      syncError: ''
    });
  });

  (localRows || []).forEach(l => {
    if(!l || !l.id) return;

    const id = String(l.id);
    const atual = map.get(id);

    if(!atual){
      map.set(id, { ...l, id });
      return;
    }

    if(l.syncStatus === 'pending'){
      map.set(id, {
        ...atual,
        ...l,
        id,
        syncStatus: 'pending'
      });
      return;
    }

    map.set(id, {
      ...l,
      ...atual,
      id
    });
  });

  (pendingRows || []).forEach(p => {
    if(!p || !p.id) return;

    const id = String(p.id);
    map.set(id, {
      ...(map.get(id) || {}),
      ...p,
      id,
      syncStatus: 'pending'
    });
  });

  return Array.from(map.values());
}

async function enviarPendentesOS(){
  if(!navigator.onLine || !os_pending.length) return { sent: 0, failed: os_pending.length };
  let sent = 0;
  const restantes = [];
  const MAX_RETRIES = 3;

  for(const os of os_pending){
    const retries = os._retries || 0;
    if(retries >= MAX_RETRIES){
      // Mantém na fila mas não tenta mais por esta sessão
      restantes.push(os);
      continue;
    }
    try{
      const googlePayload = {
        id: os.id,
        data_registro: formatarDataRegistro(os.data_registro || new Date().toISOString().replace('T', ' ').substring(0, 19)),
        updated_at: os.updated_at || new Date().toISOString(),
        projeto: os.projeto,
        cliente: os.cliente,
        local: os.local,
        mecanico: os.mecanico,
        sondador: os.sondador,
        inicio: os.inicio,
        termino: os.termino,
        tempo_horas: os.tempoH,
        data_manutencao: os.data,
        horimetro_atual: os.horimetroAtual,
        status: os.status,
        numero_os: os.numero,
        tag: os.tag,
        equipamento: os.equipamento,
        modelo: os.modelo,
        tipo: os.tipo,
        sistema: os.sistema,
        componente: os.componente,
        servico: os.servico,
        observacao: os.obs,
        assinada: os.assinada
      };
      const g = await apiPost('salvarOS', googlePayload);
      if(g && g.success){
        sent += 1;
        markOSSynced(os);
      }else{
        restantes.push({ ...os, syncStatus:'pending', syncError:'API sem sucesso', updated_at:new Date().toISOString() });
      }
    }catch(err){
      restantes.push({ ...os, syncStatus:'pending', syncError:String(err && err.message || err || 'Falha no envio'), updated_at:new Date().toISOString() });
    }
  }

  os_pending = restantes;
  savePending();
  return { sent, failed: restantes.length };
}

// ════════════════════════════════════════════════════
// NAVEGAÇÃO
// ════════════════════════════════════════════════════
async function showPage(p){
  limparDataRegistroEmTodas();
  const wasEditing = isEditingOS;
  if(p !== 'nova-os') setEditingOS(false);
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));
  document.getElementById('page-'+p).classList.add('active');
  const ni = document.querySelector(`.nav-item[data-page="${p}"]`);
  if(ni) ni.classList.add('active');
  closeSidebar();
  if(p==='dashboard') renderDash();
  if(p==='lista-os'){ populateFiltros(); renderLista(); }
  if (p === 'nova-os') {   const editId = document.getElementById('edit-id').value;    if (editId) {     setEditingOS(true);     populateSelects();   } else {     resetForm();     populateSelects();   } }
  if(p==='perfis'){ populatePerfilSelects(); renderPerfis(); }
  if(p==='configuracoes') loadConfig();
  if(p !== 'nova-os' && (wasEditing || pendingRemoteRefresh)){
    try{ await processDeferredRemoteRefresh(false); }catch(err){ console.warn('Falha ao processar refresh pendente ao sair do formulário:', err); }
  }
}
function toggleSidebar(){ document.getElementById('sidebar').classList.toggle('open'); }
function closeSidebar(){ document.getElementById('sidebar').classList.remove('open'); }

// ════════════════════════════════════════════════════
// POPULATE SELECTS
// ════════════════════════════════════════════════════
function populateSelects(){
  const tagSel = document.getElementById('f-tag');
  const curTag = tagSel.value;
  const equipamentosFonte = getEquipamentosFonte();

tagSel.innerHTML = '<option value="">— Selecione o TAG —</option>' +
  equipamentosFonte.map(e=>`<option value="${e.tag}"${String(e.tag)===String(curTag)?' selected':''}>${e.tag} — ${e.nome}</option>`).join('');

  const projetosFonte = getProjetosFonte();
  const projSel = document.getElementById('f-projeto');
  const curProj = projSel.value;
  projSel.innerHTML = '<option value="">— Selecione —</option>' +
    projetosFonte.map(p=>`<option value="${p.id}"${p.id===curProj?' selected':''}>${p.id}${p.nome && p.nome!==p.id ? ' — ' + p.nome : ''}</option>`).join('');

  const locSel = document.getElementById('f-local');
  const curLoc = locSel.value;
  const locaisProjeto = curProj ? getLocaisFromProjeto(curProj) : [];
  const locaisGerais = remoteOrLocal('locais', REF.locais);
  const locaisFonte = uniqueSorted([...locaisProjeto, ...locaisGerais]);
  const locaisFinal = curLoc && !locaisFonte.includes(curLoc) ? uniqueSorted([...locaisFonte, curLoc]) : locaisFonte;
  locSel.innerHTML = '<option value="">— Selecione —</option>' +
    locaisFinal.map(l=>`<option value="${l}"${l===curLoc?' selected':''}>${l}</option>`).join('');

  const mecanicosFonte = remoteOrLocal('mecanicos', REF.mecanicos);
  const mecSel = document.getElementById('f-mecanico');
  const curMec = mecSel.value;
  mecSel.innerHTML = '<option value="">— Selecione —</option>' +
    mecanicosFonte.map(m=>`<option value="${m}"${m===curMec?' selected':''}>${m}</option>`).join('');

  const sondadoresFonte = remoteOrLocal('sondadores', REF.sondadores);
  const sondSel = document.getElementById('f-sondador');
  const curSond = sondSel.value;
  sondSel.innerHTML = '<option value="">— Selecione —</option>' +
    sondadoresFonte.map(s=>`<option value="${s}"${s===curSond?' selected':''}>${s}</option>`).join('');

  const statusSel = document.getElementById('f-status');
  if(statusSel){
    const curStatus = statusSel.value;
    const statusFonte = remoteOrLocal('status', ['Em Aberto','Concluído','Cancelado']);
    statusSel.innerHTML = '<option value="">— Selecione —</option>' +
      statusFonte.map(s=>`<option value="${s}"${s===curStatus?' selected':''}>${s}</option>`).join('');
    if(curStatus && !statusFonte.includes(curStatus)){
      statusSel.innerHTML += `<option value="${curStatus}" selected>${curStatus}</option>`;
    }
  }

const sistSel = document.getElementById('f-sistema');
const curSist = sistSel.value;

const sistemasFonte = getSistemasFonte();

sistSel.innerHTML = '<option value="">— Selecione —</option>' +
  [...sistemasFonte].sort().map(s =>
    `<option value="${s}"${s===curSist?' selected':''}>${s}</option>`
  ).join('');

  onProjetoChange();
  populateComponenteOptions(curSist, document.getElementById('f-componente').value);
}

function onTagChange(){
  const tag = Number(document.getElementById('f-tag').value);
  const eq = getEquipamentosFonte().find(e => Number(e.tag) === tag);
  document.getElementById('f-modelo').value = eq ? eq.modelo : '';
}
function onProjetoChange(){
  const id = document.getElementById('f-projeto').value;
  const clienteEl = document.getElementById('f-cliente');
  const localEl = document.getElementById('f-local');
  const localAtual = localEl ? localEl.value : '';

  const clienteProjeto = getClienteFromProjeto(id);
  clienteEl.value = clienteProjeto || '';

  const locaisProjeto = id ? getLocaisFromProjeto(id) : [];
  const locaisGerais = remoteOrLocal('locais', REF.locais);
  const locaisBase = uniqueSorted([...locaisProjeto, ...locaisGerais]);
  const locaisFinal = localAtual && !locaisBase.includes(localAtual)
    ? uniqueSorted([...locaisBase, localAtual])
    : locaisBase;

  if(localEl){
    localEl.innerHTML = '<option value="">— Selecione —</option>' +
      locaisFinal.map(l=>`<option value="${l}"${l===localAtual?' selected':''}>${l}</option>`).join('');

    if(!localAtual && locaisProjeto.length === 1){
      localEl.value = locaisProjeto[0];
    }
  }
}

function populateComponenteOptions(sistema, selected=''){
  const compSel = document.getElementById('f-componente');
  if(!compSel) return;
  const itens = getComponentesPorSistemaFonte(sistema);
  if(!sistema){
    compSel.innerHTML = '<option value="">— Primeiro selecione o módulo —</option>';
    return;
  }
  compSel.innerHTML = '<option value="">— Selecione o componente / TAG —</option>' +
    itens.map(c=>`<option value="${c}"${c===selected?' selected':''}>${c}</option>`).join('') +
    '<option value="Outro"' + (selected==='Outro' ? ' selected' : '') + '>Outro / não catalogado</option>';
}
function onSistemaChange(){
  const sistema = document.getElementById('f-sistema').value;
  populateComponenteOptions(sistema);
}

// ════════════════════════════════════════════════════
// CÁLCULOS AUTO
// ════════════════════════════════════════════════════
function calcTempo(){
  const ini = document.getElementById('f-inicio').value;
  const fim = document.getElementById('f-termino').value;
  const tempoEl = document.getElementById('f-tempo');
  const dataEl = document.getElementById('f-data');
  tempoEl.value = '';
  dataEl.value = '';
  if(ini) dataEl.value = new Date(ini).toLocaleDateString('pt-BR');
  if(ini && fim){
    const ms = new Date(fim) - new Date(ini);
    if(ms > 0){
      const h = ms/1000/3600;
      tempoEl.value = h.toFixed(2) + ' h';
    } else {
      tempoEl.value = '⚠ Término < Início';
    }
  }
}

// ════════════════════════════════════════════════════
// FORM OS
// ════════════════════════════════════════════════════
function getProximoNumeroOS(){
  return (config.prefixo||'OS') + String(config.proximo).padStart(4,'0');
}

function resetForm(){
  setEditingOS(false);
  document.getElementById('os-form').reset();
  document.getElementById('edit-id').value = '';
  document.getElementById('form-title').innerHTML = 'Nova Ordem de Serviço <small>Estrutura: Ativo → Módulo → Componente / TAG</small>';
  document.getElementById('f-numero').value = getProximoNumeroOS();
  document.getElementById('f-modelo').value = '';
  document.getElementById('f-cliente').value = '';
  document.getElementById('f-tempo').value = '';
  document.getElementById('f-data').value = '';
  document.getElementById('f-hor-atual').value = '';

  const comp = document.getElementById('f-componente');
  if (comp) comp.innerHTML = '<option value="">— Primeiro selecione o módulo —</option>';
}

async function salvarOS(e){
  e.preventDefault();
  const editId_check = document.getElementById('edit-id').value;
  if(editId_check && (!currentUser || !currentUser.perms.editar)){ toast('Sem permissão para editar OS.', true); return; }
  if(!editId_check && (!currentUser || !currentUser.perms.criar)){ toast('Sem permissão para criar OS.', true); return; }
  const ini = document.getElementById('f-inicio').value;
  const fim = document.getElementById('f-termino').value;
  if(ini && fim && new Date(fim) <= new Date(ini)){
    toast('Término deve ser posterior ao Início!', true); return;
  }
  const ms = ini && fim ? new Date(fim) - new Date(ini) : 0;
  const tempoH = ms > 0 ? ms/1000/3600 : 0;
  const tag = parseInt(document.getElementById('f-tag').value);
  const eq = getEquipamentosFonte().find(eq => Number(eq.tag) === Number(tag));
  const proj = document.getElementById('f-projeto').value;
  const clienteProjeto = getClienteFromProjeto(proj);
  const editId = document.getElementById('edit-id').value;
  const osEdicao = editId ? os_list.find(o=>o.id===editId) : null;
  const numero = osEdicao?.numero || (config.prefixo||'OS') + String(config.proximo).padStart(4,'0');

  const os = {
    id: editId || Date.now().toString(),
    data_registro: editId ? (osEdicao?.data_registro || formatarDataRegistro('')) : formatarDataRegistro(''),
    numero,
    tag,
    equipamento: eq ? eq.nome : '',
    modelo: eq ? eq.modelo : '',
    projeto: proj,
    cliente: clienteProjeto || (document.getElementById('f-cliente').value || ''),
    local: document.getElementById('f-local').value,
    mecanico: document.getElementById('f-mecanico').value,
    sondador: document.getElementById('f-sondador').value,
    tipo: document.getElementById('f-tipo').value,
    sistema: document.getElementById('f-sistema').value,
    componente: (function(){
      const sel = document.getElementById('f-componente');
      const outro = document.getElementById('f-componente-outro');
      if(sel && sel.value === 'Outro' && outro && outro.value.trim()) return outro.value.trim();
      return sel ? sel.value : '';
    })(),
    servico: document.getElementById('f-servico').value,
    obs: document.getElementById('f-obs').value,
    inicio: ini,
    termino: fim,
    tempoH: parseFloat(tempoH.toFixed(4)),
    data: ini ? ini.split('T')[0] : '',
    horimetroAtual: document.getElementById('f-hor-atual').value !== '' ? parseFloat(document.getElementById('f-hor-atual').value) : null,
    status: document.getElementById('f-status').value,
    assinada: document.getElementById('f-assinada').value,
  };

  os.updated_at = new Date().toISOString();
  os.syncStatus = 'pending';
  os.syncError = '';

  if(editId){
    upsertOSLocal(os);
  } else {
    upsertOSLocal(os);
    config.proximo++;
    saveCfg();
  }
  markOSPending(os, navigator.onLine ? 'Aguardando envio' : 'Sem internet');

  let googleOk = false;
  try{
    const googlePayload = {
      id: os.id,
      data_registro: formatarDataRegistro(new Date().toISOString().replace('T', ' ').substring(0, 19)),
      projeto: os.projeto,
      cliente: os.cliente,
      local: os.local,
      mecanico: os.mecanico,
      sondador: os.sondador,
      inicio: os.inicio,
      termino: os.termino,
      tempo_horas: os.tempoH,
      data_manutencao: os.data,
      horimetro_atual: os.horimetroAtual,
      status: os.status,
      numero_os: os.numero,
      tag: os.tag,
      equipamento: os.equipamento,
      modelo: os.modelo,
      tipo: os.tipo,
      sistema: os.sistema,
      componente: os.componente,
      servico: os.servico,
      observacao: os.obs,
      assinada: os.assinada
    };
    const g = await apiPost('salvarOS', googlePayload);
    googleOk = !!(g && g.success);
    if(googleOk){
      markOSSynced(os);
    } else {
      markOSPending(os, 'API não confirmou o salvamento');
    }
  }catch(err){
    console.warn('Falha ao salvar no Google Sheets:', err);
    markOSPending(os, 'Falha ao salvar no Google Sheets');
  }

  // Atualiza lista local sem segundo POST ao servidor
  if(googleOk){
    limparDataRegistroEmTodas();
    // Apenas re-renderiza — dados já estão atualizados localmente
    renderDash();
  }

  toast(editId
    ? `OS atualizada${googleOk ? ' e enviada à API' : ' salva localmente e pendente de sincronização'}!`
    : `OS criada com sucesso${googleOk ? ' e enviada à API' : ' localmente; será sincronizada depois'}!`);
  
  setEditingOS(false);
  resetForm();
  renderDash();
  showPage('lista-os');
}

function editarOS(id){
  if(!currentUser || !currentUser.perms.editar){ toast('Sem permissão para editar OS.', true); return; }
  setEditingOS(true);
  const os = os_list.find(o=>o.id===id);
  if(!os) return;
  showPage('nova-os');
  setTimeout(()=>{
    populateSelects();
    document.getElementById('form-title').innerHTML = 'Editar OS <strong style="color:var(--teal)">' + os.numero + '</strong> <small>Estrutura: Ativo → Módulo → Componente / TAG</small>';
    document.getElementById('edit-id').value = os.id;
    document.getElementById('f-numero').value = os.numero;
    document.getElementById('f-status').value = os.status||'';
    // Restaurar checkbox "em andamento"
    const chkAndamento = document.getElementById('f-em-andamento');
    if(chkAndamento){
      chkAndamento.checked = (os.status === 'Em andamento');
      if(typeof onAndamentoChange === 'function') onAndamentoChange();
    }
    document.getElementById('f-tipo').value = os.tipo||'';
    document.getElementById('f-assinada').value = os.assinada||'';
    document.getElementById('f-tag').value = os.tag||'';
    onTagChange();
    document.getElementById('f-projeto').value = os.projeto||'';
    onProjetoChange();
    document.getElementById('f-local').value = os.local||'';
    document.getElementById('f-mecanico').value = os.mecanico||'';
    document.getElementById('f-sondador').value = os.sondador||'';
    document.getElementById('f-sistema').value = os.sistema||'';
    populateComponenteOptions(os.sistema||'', os.componente||'');
    // Restaurar componente "Outro"
    const compSel = document.getElementById('f-componente');
    const compOutro = document.getElementById('f-componente-outro');
    const listaComp = Array.from(compSel ? compSel.options : []).map(o=>o.value);
    if(os.componente && !listaComp.includes(os.componente)){
      compSel.value = 'Outro';
      if(compOutro){ compOutro.style.display='block'; compOutro.required=true; compOutro.value=os.componente; }
    } else {
      compSel.value = os.componente||'';
      if(compOutro){ compOutro.style.display='none'; compOutro.required=false; compOutro.value=''; }
    }
    document.getElementById('f-servico').value = os.servico||'';
    document.getElementById('f-obs').value = os.obs||'';
    document.getElementById('f-inicio').value = os.inicio||'';
    document.getElementById('f-termino').value = os.termino||'';
    document.getElementById('f-hor-atual').value = os.horimetroAtual ?? '';
    calcTempo();
  }, 60);
}

async function excluirOS(id){
  if(!currentUser || !currentUser.perms.excluir){ toast('Sem permissão para excluir OS.', true); return; }
  if(!confirm('Excluir esta OS? Esta ação também removerá a linha na planilha.')) return;
  let googleOk = false;
  try{
    const r = await apiPost('excluirOS', { id });
    googleOk = !!(r && r.success);
  }catch(err){
    console.warn('Falha ao excluir no Google Sheets:', err);
  }
  if(!googleOk){
    // Marca para exclusão posterior — não remove localmente até confirmar no servidor
    const pending_del = JSON.parse(localStorage.getItem('eg_os_pending_delete') || '[]');
    if(!pending_del.includes(id)) pending_del.push(id);
    localStorage.setItem('eg_os_pending_delete', JSON.stringify(pending_del));
    toast('Falha ao excluir na planilha. Será reprocessado na próxima sincronização.', true);
  } else {
    os_list = os_list.filter(o=>o.id!==id);
    os_pending = os_pending.filter(o=>o.id!==id);
    save(); savePending();
    await carregarOSGoogle(true);
    limparDataRegistroEmTodas();
    toast('OS excluída no Google Sheets e no aparelho.');
  }
  renderDash();
  renderLista();
}

// ════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════
function renderDash(){
  const total = os_list.length;
  const abertas = os_list.filter(o=>o.status==='Em Aberto').length;
  const concluidas = os_list.filter(o=>o.status==='Concluído').length;
  const corretivas = os_list.filter(o=>(o.tipo||'').toLowerCase().startsWith('corretiva')).length;
  const preventivas = os_list.filter(o=>(o.tipo||'').toLowerCase().startsWith('preventiva')).length;
  const tempoTotal = os_list.reduce((s,o)=>s+(o.tempoH||0),0);

  // MTTR: média de tempo das OS corretivas concluídas
  const corretivas_concluidas = os_list.filter(o=>(o.tipo||'').toLowerCase().startsWith('corretiva') && o.status==='Concluído' && o.tempoH>0);
  const mttr = corretivas_concluidas.length ? (corretivas_concluidas.reduce((s,o)=>s+(o.tempoH||0),0)/corretivas_concluidas.length) : 0;

  // Taxa corretiva/preventiva
  const taxaCorretiva = total ? Math.round((corretivas/total)*100) : 0;

  document.getElementById('stats-grid').innerHTML = `
    <div class="stat t"><div class="stat-val">${total}</div><div class="stat-lbl">Total OS</div></div>
    <div class="stat b"><div class="stat-val">${abertas}</div><div class="stat-lbl">Em Aberto</div></div>
    <div class="stat gr"><div class="stat-val">${concluidas}</div><div class="stat-lbl">Concluídas</div></div>
    <div class="stat r"><div class="stat-val">${corretivas}</div><div class="stat-lbl">Corretivas</div></div>
    <div class="stat g"><div class="stat-val">${tempoTotal.toFixed(1)}</div><div class="stat-lbl">Horas de Manutenção</div></div>
    <div class="stat t"><div class="stat-val">${mttr.toFixed(1)}h</div><div class="stat-lbl">MTTR</div></div>
    <div class="stat g"><div class="stat-val">${preventivas}</div><div class="stat-lbl">Preventivas</div></div>
    <div class="stat r"><div class="stat-val">${taxaCorretiva}%</div><div class="stat-lbl">Taxa Corretiva</div></div>
  `;

  const recentes = [...os_list].reverse().slice(0,10);
  const tbody = document.getElementById('dash-tbody');
  if(!recentes.length){
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;color:var(--steel);padding:30px">Nenhuma OS registrada ainda.</td></tr>`;
    return;
  }
  // Dashboard: 10 colunas (sem "Registrado por"/"Fechado por" — disponíveis no modal)
  tbody.innerHTML = recentes.map(o=>`<tr onclick="verOS('${o.id}')">
    <td><span class="os-num">${o.numero}</span></td>
    <td>${o.tag}</td>
    <td style="max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${o.equipamento||'—'}</td>
    <td>${o.sistema||'—'}${o.componente ? ' / ' + o.componente : ''}</td>
    <td>${o.mecanico||'—'}</td>
    <td>${tipoBadge(o.tipo)}</td>
    <td>${statusBadge(o.status)}</td>
    <td>${fmtDT(o.inicio)}</td>
    <td>${o.termino ? fmtDT(o.termino) : '<span style="color:var(--yellow);font-size:11px">Em andamento</span>'}</td>
    <td>${o.tempoH ? o.tempoH.toFixed(2) : '—'}</td>
  </tr>`).join('');
}

// ════════════════════════════════════════════════════
// LISTA OS
// ════════════════════════════════════════════════════
function populateFiltros(){
  const projSel = document.getElementById('s-proj');
  const projs = [...new Set(os_list.map(o=>o.projeto).filter(Boolean))];
  projSel.innerHTML = '<option value="">Todos os projetos</option>' + projs.map(p=>`<option value="${p}">${p}</option>`).join('');
}

function limparFiltros(){
  ['s-busca','s-tipo','s-status','s-proj','s-data-de','s-data-ate'].forEach(id=>{
    const el = document.getElementById(id); if(el) el.value='';
  });
  renderLista();
}

function renderLista(){
  const q = (document.getElementById('s-busca').value||'').toLowerCase();
  const tipo = document.getElementById('s-tipo').value;
  const status = document.getElementById('s-status').value;
  const proj = document.getElementById('s-proj').value;
  const dataDe = document.getElementById('s-data-de')?.value || '';
  const dataAte = document.getElementById('s-data-ate')?.value || '';

  // Mostra/oculta botões conforme permissões
  const btnNova = document.getElementById('btn-nova-os');
  const btnExport = document.getElementById('btn-exportar');
  if(btnNova) btnNova.style.display = (currentUser && currentUser.perms.criar) ? '' : 'none';
  if(btnExport) btnExport.style.display = (currentUser && currentUser.perms.exportar) ? '' : 'none';

  let lista = [...os_list].reverse();
  if(q) lista = lista.filter(o=>[o.numero,o.tag,o.mecanico,o.sistema,o.componente,o.equipamento,o.servico,o.local].join(' ').toLowerCase().includes(q));
  if(tipo) lista = lista.filter(o=>o.tipo===tipo);
  if(status) lista = lista.filter(o=>o.status===status);
  if(proj) lista = lista.filter(o=>o.projeto===proj);
  if(dataDe) lista = lista.filter(o => o.inicio && o.inicio.substring(0,10) >= dataDe);
  if(dataAte) lista = lista.filter(o => o.inicio && o.inicio.substring(0,10) <= dataAte);

  const tbody = document.getElementById('lista-tbody');
  const empty = document.getElementById('lista-empty');
  if(!lista.length){ tbody.innerHTML=''; empty.style.display='block'; return; }
  empty.style.display='none';
  tbody.innerHTML = lista.map(o=>`<tr>
    <td onclick="verOS('${o.id}')"><span class="os-num">${o.numero}</span></td>
    <td>${o.tag||'—'}</td>
    <td style="max-width:120px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${o.equipamento||'—'}</td>
    <td>${o.projeto||'—'}</td>
    <td>${o.local||'—'}</td>
    <td>${o.mecanico||'—'}</td>
    <td>${o.sistema||'—'}</td>
    <td>${o.componente||'—'}</td>
    <td>${tipoBadge(o.tipo)}</td>
    <td>${fmtDT(o.inicio)}</td>
    <td>${fmtDT(o.termino)}</td>
    <td>${o.tempoH ? o.tempoH.toFixed(2) : '—'}</td>
    <td>${o.horimetroAtual!=null ? o.horimetroAtual : '—'}</td>
    <td>${statusBadge(o.status)}</td>
    <td style="white-space:nowrap">
      <button class="btn btn-ghost btn-xs" onclick="verOS('${o.id}')">👁</button>
      ${currentUser && currentUser.perms.editar ? `<button class="btn btn-ghost btn-xs" onclick="editarOS('${o.id}')">✏</button>` : ''}
      ${currentUser && currentUser.perms.excluir ? `<button class="btn btn-red btn-xs" onclick="excluirOS('${o.id}')">🗑</button>` : ''}
    </td>
  </tr>`).join('');
}

// ════════════════════════════════════════════════════
// MODAL DETALHE
// ════════════════════════════════════════════════════
function verOS(id){
  const os = os_list.find(o=>o.id===id);
  if(!os) return;
  currentModal = os;
  document.getElementById('m-numero').textContent = os.numero;
  document.getElementById('m-badge').innerHTML = statusBadge(os.status);
  document.getElementById('m-tipo-badge').innerHTML = tipoBadge(os.tipo);
  document.getElementById('m-edit-btn').onclick = ()=>{ closeModal(); editarOS(id); };
  document.getElementById('m-body').innerHTML = `
    <div class="dg3">
      <div class="di"><label>TAG / Equipamento</label><p><strong style="color:var(--teal)">${os.tag}</strong> — ${os.equipamento||'—'}</p></div>
      <div class="di"><label>Modelo</label><p>${os.modelo||'—'}</p></div>
      <div class="di"><label>Status</label><p>${os.status||'—'}</p></div>
    </div>
    <div class="dg3">
      <div class="di"><label>Projeto</label><p>${os.projeto||'—'}</p></div>
      <div class="di"><label>Cliente</label><p>${os.cliente||'—'}</p></div>
      <div class="di"><label>Local</label><p>${os.local||'—'}</p></div>
    </div>
    <div class="dg">
      <div class="di"><label>Mecânico</label><p>${os.mecanico||'—'}</p></div>
      <div class="di"><label>Sondador</label><p>${os.sondador||'—'}</p></div>
    </div>
    <div style="border-top:1px solid var(--bg3);padding-top:14px;margin-bottom:14px">
      <div class="dg3">
        <div class="di"><label>Módulo da Sonda</label><p>${os.sistema||'—'}</p></div>
        <div class="di"><label>Componente</label><p>${os.componente||'—'}</p></div>
        <div class="di"><label>OS Assinada</label><p>${os.assinada||'Não'}</p></div>
      </div>
      <div class="di" style="margin-bottom:10px"><label>Serviço Realizado</label><p>${os.servico||'—'}</p></div>
      ${os.obs ? `<div class="di"><label>Observações</label><p>${os.obs}</p></div>` : ''}
    </div>
    <div style="background:var(--bg3);border-radius:var(--r);padding:14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px">
      <div class="di"><label>Início</label><p>${fmtDT(os.inicio)}</p></div>
      <div class="di"><label>Término</label><p>${os.termino ? fmtDT(os.termino) : '<span style="color:var(--yellow)">Em andamento</span>'}</p></div>
      <div class="di"><label>Tempo Total [h]</label><p style="color:var(--teal);font-weight:600">${os.tempoH!=null ? os.tempoH.toFixed(2) : '—'}</p></div>
      <div class="di"><label>Horímetro Atual do Ativo [h]</label><p>${os.horimetroAtual!=null?os.horimetroAtual:'—'}</p></div>
    </div>
    <div style="background:#f0f7ff;border:1px solid #c7dff0;border-radius:var(--r);padding:12px 14px;margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="di"><label style="color:#036AAB">🖊 Registrado por</label><p style="font-weight:600">${os.registrado_por||'—'}</p></div>
      <div class="di"><label style="color:${os.fechado_por?'#1A9B6C':'#999'}">✅ Fechado por</label><p style="font-weight:600">${os.fechado_por||'—'}</p></div>
    </div>
  `;
  document.getElementById('modal-overlay').classList.add('open');
}
function fecharModalExt(e){ if(e.target===document.getElementById('modal-overlay')) closeModal(); }
function closeModal(){ document.getElementById('modal-overlay').classList.remove('open'); currentModal=null; }

// ════════════════════════════════════════════════════
// IMPRESSÃO / PDF — Layout compacto A4 retrato
// v2 — uma página garantida + botão compartilhar PDF
// ════════════════════════════════════════════════════

/* ── Compartilhar / salvar PDF via Web Share API ── */
async function shareOSPdf() {
  if (!currentModal) return;

  // Tenta usar a Web Share API (nativa mobile — iOS/Android)
  const supportsShare = navigator.share && navigator.canShare;

  if (supportsShare) {
    try {
      // Gera o HTML da OS para um blob de texto (fallback se print-to-pdf não disponível)
      const os = currentModal;
      const titulo = `${os.numero} — ${os.equipamento || os.tag} — ${os.mecanico}`;
      const texto  = _buildOsTextSummary(os);

      await navigator.share({
        title: titulo,
        text:  texto,
      });
      return;
    } catch (e) {
      if (e.name !== 'AbortError') {
        // Fallback para impressão normal
      } else {
        return; // Usuário cancelou
      }
    }
  }

  // Desktop / navegadores sem Web Share: abre janela de impressão
  // com dica para "Salvar como PDF"
  printOS(true);
}

/* Gera um resumo em texto para o compartilhamento nativo */
function _buildOsTextSummary(os) {
  const f = v => String(v ?? '—');
  return [
    `OS: ${f(os.numero)}`,
    `Status: ${f(os.status)}  |  Tipo: ${f(os.tipo)}`,
    `─────────────────────────`,
    `TAG/Equipamento: ${f(os.tag)} — ${f(os.equipamento)}`,
    `Projeto: ${f(os.projeto)}  |  Local: ${f(os.local)}`,
    `Executor: ${f(os.mecanico)}  |  Sondador: ${f(os.sondador)}`,
    `─────────────────────────`,
    `Módulo: ${f(os.modulo || os.sistema)}`,
    `Componente: ${f(os.componente)}`,
    `Serviço: ${f(os.servico)}`,
    os.obs ? `Obs: ${f(os.obs)}` : '',
    `─────────────────────────`,
    `Início:  ${fmtDT(os.inicio)}`,
    `Término: ${os.termino ? fmtDT(os.termino) : 'Em andamento'}`,
    `Tempo:   ${os.tempoH != null ? os.tempoH.toFixed(2) + 'h' : '—'}`,
    `Horímetro: ${os.horimetroAtual != null ? os.horimetroAtual : '—'}`,
    `─────────────────────────`,
    `Registrado por: ${f(os.registrado_por)}`,
    `Fechado por:    ${f(os.fechado_por)}`,
    ``,
    `Emitido em ${new Date().toLocaleString('pt-BR')}`,
    `ENERGOLD Drilling Brasil — Controle de Manutenção`,
  ].filter(l => l !== null).join('\n');
}

function printOS(fromShare = false){
  if(!currentModal) return;
  const os = currentModal;
  const w = window.open('','_blank','width=820,height=1060');
  if(!w){
    toast('O navegador bloqueou a janela. Libere pop-ups e tente novamente.', true);
    return;
  }
  const esc = v => String(v ?? '—')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');

  const company = esc(config.empresa || 'ENERGOLD DRILLING DO BRASIL');
  
  const logo =
    document.querySelector('.brand-logo-header')?.src ||
    document.querySelector('.brand-logo-sidebar')?.src ||
    "";

  w.document.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(os.numero)} — Ordem de Serviço</title>
<style>
/* ════════════════════════════════════════
   IMPRESSÃO A4 RETRATO — COMPACTO
   Garantia de 1 página | ENERGOLD v2
════════════════════════════════════════ */

/* Página A4 retrato com margens mínimas */
@page {
  size: A4 portrait;
  margin: 10mm 12mm 10mm 12mm;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --blue:    #0762C8;
  --navy:    #0B1E3D;
  --steel:   #6B7A90;
  --green:   #12B76A;
  --red:     #E03E3E;
  --orange:  #F06A00;
  --yellow:  #F59E0B;
  --bg:      #F5F7FA;
  --border:  #D8E2EE;
  --text:    #18253A;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 8.5pt;
  color: var(--text);
  background: #fff;
  line-height: 1.35;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ── BARRA DE AÇÕES (oculta na impressão) ── */
.no-print {
  background: #f0f7ff;
  border-bottom: 1px solid #c7dff0;
  padding: 10px 16px;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}
.no-print strong { color: var(--navy); font-size: 13px; flex: 1; }
.btn-print, .btn-share {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  min-height: 40px;
}
.btn-print  { background: var(--blue); color: #fff; }
.btn-share  { background: #12B76A; color: #fff; }
.btn-print:hover  { background: #0553a4; }
.btn-share:hover  { background: #0d9a59; }
.btn-close  {
  background: none; border: 1px solid var(--border);
  color: var(--steel); border-radius: 8px;
  padding: 8px 14px; font-size: 12px; cursor: pointer;
  min-height: 40px;
}
.share-hint {
  font-size: 11px;
  color: var(--steel);
  padding: 4px 16px 8px;
  background: #f0f7ff;
  display: none;
}
.share-hint.visible { display: block; }
@media print { .no-print, .share-hint { display: none !important; } }

/* ── FOLHA ── */
.sheet {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  page-break-inside: avoid;
}

/* ── HEADER ── */
.hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  background: linear-gradient(135deg, #fff 0%, #eef5fb 100%);
  border-bottom: 3px solid var(--blue);
}
.brand { display: flex; align-items: center; gap: 10px; }
.brand img { height: 32px; width: auto; display: block; }
.brand-meta small {
  display: block; font-size: 7pt; letter-spacing: 1.2px;
  text-transform: uppercase; color: var(--steel); margin-bottom: 2px;
}
.brand-meta strong { display: block; font-size: 10pt; color: var(--navy); }
.doc-box { text-align: right; }
.doc-box small {
  display: block; font-size: 7pt; letter-spacing: 1.1px;
  text-transform: uppercase; color: var(--steel); margin-bottom: 2px;
}
.doc-num {
  font-size: 22pt; font-weight: 900; color: var(--blue);
  line-height: 1; margin-bottom: 4px;
}
.badges { display: flex; justify-content: flex-end; gap: 5px; flex-wrap: wrap; }
.badge {
  padding: 2px 8px; border-radius: 999px; font-size: 7.5pt;
  font-weight: 700; border: 1px solid transparent;
}
.b-ok    { background: #e9f8ef; border-color: #b7e3c8; color: #1f7a52; }
.b-open  { background: #eef5fb; border-color: #b8d0e8; color: #0555AC; }
.b-and   { background: #fff8e1; border-color: #ffe082; color: #a07000; }
.b-cor   { background: #fef2f2; border-color: #fcc; color: #b91c1c; }
.b-pre   { background: #eef5fb; border-color: #b8d0e8; color: #0555AC; }
.b-det   { background: #fffbeb; border-color: #fde68a; color: #92400e; }

/* ── CONTEÚDO ── */
.content { padding: 8px 14px 10px; }

/* Seção título */
.sec {
  font-size: 7pt; font-weight: 900; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--blue);
  border-bottom: 1.5px solid #d5e5f2;
  padding-bottom: 3px; margin: 8px 0 6px;
}
.sec:first-child { margin-top: 0; }

/* Grids de campos */
.g2 { display: grid; grid-template-columns: 1fr 1fr;     gap: 5px; margin-bottom: 5px; }
.g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; margin-bottom: 5px; }
.g4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 5px; margin-bottom: 5px; }

/* Campo individual */
.f {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 5px 7px;
}
.f.hl { background: #eef5fb; border-color: #c7dff0; }
.f.reg { background: #f0f7ff; border-color: #c7dff0; }
.f.fec { background: #f0fdf4; border-color: #b7e3c8; }
.f label {
  display: block; font-size: 6.5pt; font-weight: 800;
  letter-spacing: .9px; text-transform: uppercase; color: var(--steel);
  margin-bottom: 2px;
}
.f p {
  font-size: 8pt; color: var(--text); font-weight: 600;
  line-height: 1.3; word-break: break-word;
}
.f p.big { font-size: 12pt; color: var(--blue); font-weight: 800; }

/* Campo texto longo (serviço/obs) */
.flong {
  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 5px 7px;
  margin-bottom: 5px;
  min-height: 28px;
}
.flong label {
  font-size: 6.5pt; font-weight: 800; letter-spacing: .9px;
  text-transform: uppercase; color: var(--steel);
  display: block; margin-bottom: 2px;
}
.flong p { font-size: 8pt; color: var(--text); line-height: 1.35; }

/* Assinaturas */
.signs {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 24px; margin-top: 10px;
}
.sign {
  padding-top: 5px; border-top: 1px solid #8aa5bb;
  text-align: center; font-size: 7.5pt; color: #51687a;
  line-height: 1.5;
}

/* Rodapé */
.ft {
  margin-top: 8px;
  display: flex; justify-content: space-between; align-items: center;
  gap: 8px; flex-wrap: wrap;
  font-size: 7pt; color: var(--steel);
  border-top: 1px solid var(--border);
  padding-top: 6px;
}

/* Marca d'água */
.wm {
  position: fixed; inset: 0;
  display: flex; align-items: center; justify-content: center;
  pointer-events: none; opacity: .04;
  color: var(--blue); font-size: 28pt; font-weight: 900;
  letter-spacing: .14em; text-transform: uppercase;
  transform: rotate(-18deg); z-index: 0; white-space: nowrap;
}
.sheet { position: relative; z-index: 1; }
</style>
</head>
<body>

<!-- ── BARRA DE AÇÕES (só na tela, sumida na impressão) ── -->
<div class="no-print">
  <strong>📄 ${esc(os.numero)} — Pronto para imprimir ou salvar como PDF</strong>
  <button class="btn-print" onclick="window.print()">🖨️ Imprimir / Salvar PDF</button>
  <button class="btn-share" onclick="doShare()" id="btn-share">📤 Compartilhar</button>
  <button class="btn-close" onclick="window.close()">✕ Fechar</button>
</div>
<div class="share-hint" id="share-hint">
  💡 <strong>Dica:</strong> Para salvar como PDF, escolha "Salvar como PDF" na impressora. No celular, use o botão Compartilhar acima para enviar pelo WhatsApp, e-mail ou salvar nos arquivos.
</div>

<!-- ── MARCA D'ÁGUA ── -->
<div class="wm">ENERGOLD</div>

<!-- ── FOLHA A4 ── -->
<div class="sheet">

  <!-- HEADER -->
  <div class="hd">
    <div class="brand">
      <img src="${logo}" alt="Energold Drilling Brasil">
      <div class="brand-meta">
        <small>Controle de Manutenção</small>
        <strong>${company}</strong>
      </div>
    </div>
    <div class="doc-box">
      <small>Ordem de Serviço</small>
      <div class="doc-num">${esc(os.numero)}</div>
      <div class="badges">
        <span class="badge ${os.status==='Concluído'?'b-ok':os.status==='Em andamento'?'b-and':'b-open'}">${esc(os.status)}</span>
        <span class="badge ${(os.tipo||'').toLowerCase().startsWith('corretiva')?'b-cor':(os.tipo||'').toLowerCase()==='detectiva'?'b-det':'b-pre'}">${esc(os.tipo)}</span>
      </div>
    </div>
  </div>

  <!-- CONTEÚDO -->
  <div class="content">

    <!-- Identificação do Ativo -->
    <div class="sec">Identificação do Ativo</div>
    <div class="g3">
      <div class="f"><label>TAG / Equipamento</label><p>${esc(os.tag)}${os.equipamento?' — '+esc(os.equipamento):''}</p></div>
      <div class="f"><label>Modelo</label><p>${esc(os.modelo)}</p></div>
      <div class="f"><label>OS Assinada</label><p>${esc(os.assinada||'Não')}</p></div>
    </div>
    <div class="g3">
      <div class="f"><label>Projeto</label><p>${esc(os.projeto)}</p></div>
      <div class="f"><label>Cliente</label><p>${esc(os.cliente)}</p></div>
      <div class="f"><label>Local</label><p>${esc(os.local)}</p></div>
    </div>
    <div class="g2">
      <div class="f"><label>Executor / Mecânico</label><p>${esc(os.mecanico)}</p></div>
      <div class="f"><label>Sondador</label><p>${esc(os.sondador||'—')}</p></div>
    </div>

    <!-- Estrutura da Manutenção -->
    <div class="sec">Estrutura da Manutenção</div>
    <div class="g2">
      <div class="f"><label>Módulo da Sonda</label><p>${esc(os.modulo||os.sistema)}</p></div>
      <div class="f"><label>Componente / TAG Monitorável</label><p>${esc(os.componente)}</p></div>
    </div>
    <div class="flong"><label>Serviço Realizado</label><p>${esc(os.servico)}</p></div>
    ${os.obs ? `<div class="flong"><label>Observações</label><p>${esc(os.obs)}</p></div>` : ''}

    <!-- Tempos e Horímetro -->
    <div class="sec">Tempos e Horímetro</div>
    <div class="g4">
      <div class="f hl"><label>Início</label><p>${esc(fmtDT(os.inicio))}</p></div>
      <div class="f hl"><label>Término</label><p>${os.termino?esc(fmtDT(os.termino)):'<span style="color:#a07000">Em andamento</span>'}</p></div>
      <div class="f hl"><label>Tempo Total [h]</label><p class="big">${os.tempoH!=null?esc(os.tempoH.toFixed(2)):'—'}</p></div>
      <div class="f hl"><label>Horímetro Atual [h]</label><p>${os.horimetroAtual!=null?esc(os.horimetroAtual):'—'}</p></div>
    </div>

    <!-- Registro -->
    <div class="g2">
      <div class="f reg"><label>🖊 Registrado por</label><p>${esc(os.registrado_por||'—')}</p></div>
      <div class="f ${os.fechado_por?'fec':''}"><label>✅ Fechado por</label><p style="color:${os.fechado_por?'#1f7a52':'#999'}">${esc(os.fechado_por||'—')}</p></div>
    </div>

    <!-- Assinaturas -->
    <div class="signs">
      <div class="sign">
        <div style="height:20px"></div>
        Assinatura do Executor<br><strong>${esc(os.mecanico)}</strong>
      </div>
      <div class="sign">
        <div style="height:20px"></div>
        Assinatura do Sondador<br><strong>${esc(os.sondador||'—')}</strong>
      </div>
    </div>

    <!-- Rodapé -->
    <div class="ft">
      <span>Emitido em ${new Date().toLocaleString('pt-BR')}</span>
      <strong>Desenvolvido por Gabriel Felipe dos Santos © 2026</strong>
    </div>

  </div><!-- /content -->
</div><!-- /sheet -->

<script>
/* ── Compartilhar nativo (mobile) ou copiar texto ── */
async function doShare() {
  const hint = document.getElementById('share-hint');

  const dadosTexto = [
    'OS: ${esc(os.numero)} | ${esc(os.status)} | ${esc(os.tipo)}',
    'Equipamento: ${esc(os.tag)} — ${esc(os.equipamento||'')}',
    'Projeto: ${esc(os.projeto)} | Local: ${esc(os.local)}',
    'Executor: ${esc(os.mecanico)}',
    'Módulo: ${esc(os.modulo||os.sistema)} | Componente: ${esc(os.componente)}',
    'Serviço: ${esc(os.servico)}',
    ${os.obs?`'Obs: ${esc(os.obs)}',`:''}
    'Início: ${esc(fmtDT(os.inicio))} | Término: ${os.termino?esc(fmtDT(os.termino)):'Em andamento'}',
    'Tempo: ${os.tempoH!=null?os.tempoH.toFixed(2)+'h':'—'} | Horímetro: ${os.horimetroAtual!=null?os.horimetroAtual:'—'}',
    'Emitido em ${new Date().toLocaleString('pt-BR')}',
    'ENERGOLD Drilling Brasil',
  ].join('\\n');

  if (navigator.share) {
    try {
      await navigator.share({
        title: '${esc(os.numero)} — Ordem de Serviço',
        text: dadosTexto,
      });
      return;
    } catch(e) {
      if (e.name === 'AbortError') return;
    }
  }

  /* Fallback: copia para área de transferência */
  try {
    await navigator.clipboard.writeText(dadosTexto);
    document.getElementById('btn-share').textContent = '✅ Copiado!';
    setTimeout(() => {
      document.getElementById('btn-share').textContent = '📤 Compartilhar';
    }, 2500);
  } catch(e) {
    hint.classList.add('visible');
  }
}

/* Mostra dica ao abrir no mobile sem Share API */
window.addEventListener('load', () => {
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  if (isMobile && !navigator.share) {
    document.getElementById('share-hint').classList.add('visible');
  }
});
<\/script>

</body>
</html>`);
  w.document.close();
  w.focus();
  /* No mobile não abre janela nova — a impressão é via botão na tela */
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  if (!isMobile && !fromShare) {
    setTimeout(() => { w.print(); }, 450);
  }
}

// ════════════════════════════════════════════════════
// EXPORT CSV — formato igual à planilha
// ════════════════════════════════════════════════════
function exportCSV(){
  const header = ['Número_OS','TAG','Modelo','Projeto','Cliente','Local','Mecânico',
    'Tipo_Manutenção','Módulo','Componente / TAG',
    'Serviço_Realizado','Observações','Data_Manutenção','Início_Manutenção',
    'Término_Manutenção','Tempo_Total [h]','Horímetro_Atual',
    'Sondador','Status','OS_Assinada'];
  const rows = os_list.map(o=>[
    o.numero,o.tag,o.modelo||'',o.projeto,o.cliente||'',o.local,o.mecanico,
    o.tipo,o.sistema,o.componente||'',
    o.servico||'',o.obs||'',o.data||'',o.inicio||'',o.termino||'',
    o.tempoH!=null?o.tempoH.toFixed(4):'',
    o.horimetroAtual!=null?o.horimetroAtual:'',
    o.sondador||'',o.status||'',o.assinada||'',
  ].map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(';'));
  const csv = [header.join(';'), ...rows].join('\n');
  const blob = new Blob(['\uFEFF'+csv], {type:'text/csv;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'OS_Energold_' + new Date().toISOString().split('T')[0] + '.csv';
  a.click();
  toast('CSV exportado (compatível com a planilha)!');
}

// ════════════════════════════════════════════════════
// PERFIS
// ════════════════════════════════════════════════════
let perfis = JSON.parse(localStorage.getItem('eg_perfis') || '[]');

// Seed com mecânicos/sondadores da planilha se vazio
function seedPerfis(){
  if(perfis.length) return;
  const mecanicosBase = [
    {nome:'Kleber Valadares',funcao:'Mecânico',esp:'Hidráulica'},
    {nome:'Expedito Cândido',funcao:'Mecânico',esp:'Mecânica Geral'},
    {nome:'Marlon Lúcio',funcao:'Mecânico',esp:'Mecânica Geral'},
    {nome:'Gilson Miranda',funcao:'Eletromecânico',esp:'Elétrica / Hidráulica'},
    {nome:'Flavio Gonçalves',funcao:'Mecânico',esp:'Motores Diesel'},
    {nome:'Ramiro Coelho',funcao:'Mecânico',esp:'Mecânica Geral'},
    {nome:'Wanderson Farley',funcao:'Mecânico',esp:'Mecânica Geral'},
    {nome:'Elismar Guedes',funcao:'Mecânico',esp:'Mangueiras e Conexões'},
    {nome:'Henrique Campos',funcao:'Mecânico',esp:'Sensores e Elétrica'},
    {nome:'Henrique Marques',funcao:'Mecânico',esp:'Mecânica Geral'},
    {nome:'João Pedro',funcao:'Mecânico',esp:'Mecânica Geral'},
    {nome:'Eustáquio Martins',funcao:'Supervisor',esp:'Supervisão Geral'},
    {nome:'Ramiro Coelho',funcao:'Sondador',esp:'Operação de Sonda'},
    {nome:'Flavio Gonçalves',funcao:'Sondador',esp:'Operação de Sonda'},
    {nome:'Gilson Miranda',funcao:'Sondador',esp:'Operação de Sonda'},
    {nome:'Wanderson Farley',funcao:'Sondador',esp:'Operação de Sonda'},
  ];
  const seen = new Set();
  perfis = mecanicosBase.filter(p=>{ const k=p.nome+p.funcao; if(seen.has(k)) return false; seen.add(k); return true; }).map((p,i)=>({
    id: 'seed_'+i, nome:p.nome, funcao:p.funcao, especialidade:p.esp,
    ativo:'Ativo', projeto:'1537-AGA', local:'Mina Cuiabá', turno:'Rotativo',
    telefone:'', email:'', matricula:'', obs:'', avatarData:'',
    perms:{criar:true,editar:true,excluir:false,exportar:true,config:false,perfis:false},
    cor: roleCor(p.funcao),
  }));
  savePerfis();
}
function savePerfis(){ localStorage.setItem('eg_perfis', JSON.stringify(perfis)); }

function roleCor(f){
  const m = {Mecânico:'#1A9B9B',Eletromecânico:'#3B82F6',Sondador:'#C8952A',Supervisor:'#22C55E','Gerente de Manutenção':'#EF4444',Outro:'#8A9BB8'};
  return m[f]||'#8A9BB8';
}
function roleEmoji(f){
  const m = {Mecânico:'🔧',Eletromecânico:'⚡',Sondador:'⛏️',Supervisor:'📋','Gerente de Manutenção':'📊',Outro:'👤'};
  return m[f]||'👤';
}

function renderPerfis(){
  const q = (document.getElementById('pf-busca').value||'').toLowerCase();
  const fn = document.getElementById('pf-funcao').value;
  let lista = [...perfis];
  if(q) lista = lista.filter(p=>(p.nome+p.funcao+p.especialidade+p.projeto).toLowerCase().includes(q));
  if(fn) lista = lista.filter(p=>p.funcao===fn);

  // Stats
  const funcs = ['Mecânico','Eletromecânico','Sondador','Supervisor','Gerente de Manutenção'];
  document.getElementById('perfis-stats').innerHTML = [
    {l:'Total Perfis',v:perfis.length,c:'t'},
    {l:'Ativos',v:perfis.filter(p=>p.ativo==='Ativo').length,c:'gr'},
    {l:'Mecânicos',v:perfis.filter(p=>p.funcao==='Mecânico').length,c:'b'},
    {l:'Sondadores',v:perfis.filter(p=>p.funcao==='Sondador').length,c:'g'},
    {l:'Supervisores',v:perfis.filter(p=>['Supervisor','Gerente de Manutenção'].includes(p.funcao)).length,c:'r'},
  ].map(s=>`<div class="stat ${s.c}"><div class="stat-val">${s.v}</div><div class="stat-lbl">${s.l}</div></div>`).join('');

  const grid = document.getElementById('perfil-grid');
  const empty = document.getElementById('perfil-empty');
  if(!lista.length){ grid.innerHTML=''; empty.style.display='block'; return; }
  empty.style.display='none';
  grid.innerHTML = lista.map(p=>{
    const initials = p.nome.split(' ').slice(0,2).map(x=>x[0]).join('');
    const avatarHtml = p.avatarData
      ? `<img src="${p.avatarData}" alt="">`
      : `<span style="font-size:24px">${roleEmoji(p.funcao)}</span>`;
    const statusCol = {Ativo:'var(--green)',Inativo:'var(--steel)',Férias:'var(--yellow)',Afastado:'var(--red)'}[p.ativo]||'var(--steel)';
    const osCount = os_list.filter(o=>o.mecanico===p.nome||o.sondador===p.nome).length;
    return `
    <div class="perfil-card" id="pc-${p.id}">
      <div class="perfil-banner" style="background:linear-gradient(135deg,${roleCor(p.funcao)}33,${roleCor(p.funcao)}11)">
        <div style="position:absolute;top:8px;right:10px;display:flex;align-items:center;gap:5px">
          <span style="width:7px;height:7px;border-radius:50%;background:${statusCol};display:inline-block"></span>
          <span style="font-size:10px;color:${statusCol}">${p.ativo}</span>
        </div>
      </div>
      <div class="perfil-avatar" style="border-color:${roleCor(p.funcao)}">${avatarHtml}</div>
      <div class="perfil-info">
        <div class="perfil-nome">${p.nome}</div>
        <div class="perfil-cargo" style="color:${roleCor(p.funcao)}">${p.funcao}</div>
        <div class="perfil-tags">
          ${p.especialidade ? `<span class="perfil-tag">${p.especialidade}</span>` : ''}
          ${p.projeto ? `<span class="perfil-tag" style="background:rgba(200,149,42,.15);color:var(--gold)">${p.projeto}</span>` : ''}
          ${p.turno ? `<span class="perfil-tag" style="background:rgba(255,255,255,.06);color:var(--steel)">${p.turno}</span>` : ''}
        </div>
        <div style="font-size:11px;color:var(--steel);margin-bottom:10px">
          ${osCount > 0 ? `<span style="color:var(--teal)">${osCount} OS</span> registrada${osCount>1?'s':''}` : 'Sem OS registradas'}
        </div>
        <div class="perfil-actions">
          <button class="btn btn-ghost btn-xs" onclick="editarPerfil('${p.id}')">✏ Editar</button>
          <button class="btn btn-red btn-xs" onclick="excluirPerfil('${p.id}')">🗑</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function populatePerfilSelects(){
  const projetosFonte = (remoteCadastros && Array.isArray(remoteCadastros.projetos) && remoteCadastros.projetos.length)
    ? remoteCadastros.projetos
    : REF.projetos.map(p=>p.id);
  const projSel = document.getElementById('pf-projeto');
  projSel.innerHTML = '<option value="">— Sem alocação —</option>' +
    projetosFonte.map(p=>`<option value="${p}">${p}</option>`).join('');

  const locaisFonte = remoteOrLocal('locais', REF.locais);
  const locSel = document.getElementById('pf-local');
  locSel.innerHTML = '<option value="">— Selecione —</option>' +
    locaisFonte.map(l=>`<option value="${l}">${l}</option>`).join('');

  const turnoSel = document.getElementById('pf-turno');
  if(turnoSel){
    const curTurno = turnoSel.value;
    const turnosFonte = remoteOrLocal('turnos', ['Administrativo','Dia','Noite']);
    turnoSel.innerHTML = '<option value="">— Selecione —</option>' +
      turnosFonte.map(t=>`<option value="${t}"${t===curTurno?' selected':''}>${t}</option>`).join('');
  }

  const funcaoSel = document.getElementById('pf-funcao-val');
  if(funcaoSel && remoteCadastros && Array.isArray(remoteCadastros.funcoes) && remoteCadastros.funcoes.length){
    const atual = funcaoSel.value;
    funcaoSel.innerHTML = '<option value="">— Selecione —</option>' +
      uniqueSorted(remoteCadastros.funcoes).map(f=>`<option value="${f}"${f===atual?' selected':''}>${f}</option>`).join('');
  }

  const ativoSel = document.getElementById('pf-ativo');
  if(ativoSel && remoteCadastros && Array.isArray(remoteCadastros.ativo) && remoteCadastros.ativo.length){
    const atual = ativoSel.value;
    ativoSel.innerHTML = '<option value="">— Selecione —</option>' +
      uniqueSorted(remoteCadastros.ativo).map(v=>`<option value="${v}"${v===atual?' selected':''}>${v}</option>`).join('');
  }
}

function novoPerfil(){
  document.getElementById('pf-edit-id').value = '';
  document.getElementById('pf-form-title').textContent = 'Novo Perfil';
  document.getElementById('pf-nome').value = '';
  document.getElementById('pf-funcao-val').value = '';
  document.getElementById('pf-ativo').value = 'Ativo';
  document.getElementById('pf-especialidade').value = '';
  document.getElementById('pf-telefone').value = '';
  document.getElementById('pf-email').value = '';
  document.getElementById('pf-matricula').value = '';
  document.getElementById('pf-projeto').value = '';
  document.getElementById('pf-local').value = '';
  document.getElementById('pf-turno').value = '';
  document.getElementById('pf-obs').value = '';
  document.getElementById('pf-avatar-data').value = '';
  document.getElementById('pf-avatar-preview').innerHTML = '<span id="pf-avatar-emoji">👷</span>';
  ['criar','editar','excluir','exportar','config','perfis'].forEach(p=>{
    document.getElementById('perm-'+p).checked = ['criar','editar','exportar'].includes(p);
  });
  document.getElementById('perfil-form-panel').style.display='block';
  document.getElementById('pf-nome').focus();
}

function editarPerfil(id){
  const p = perfis.find(x=>x.id===id);
  if(!p) return;
  document.getElementById('pf-edit-id').value = p.id;
  document.getElementById('pf-form-title').textContent = 'Editar — ' + p.nome.split(' ')[0];
  document.getElementById('pf-nome').value = p.nome||'';
  document.getElementById('pf-funcao-val').value = p.funcao||'';
  document.getElementById('pf-ativo').value = p.ativo||'Ativo';
  document.getElementById('pf-especialidade').value = p.especialidade||'';
  document.getElementById('pf-telefone').value = p.telefone||'';
  document.getElementById('pf-email').value = p.email||'';
  document.getElementById('pf-matricula').value = p.matricula||'';
  document.getElementById('pf-projeto').value = p.projeto||'';
  document.getElementById('pf-local').value = p.local||'';
  document.getElementById('pf-turno').value = p.turno||'';
  document.getElementById('pf-obs').value = p.obs||'';
  document.getElementById('pf-avatar-data').value = p.avatarData||'';
  if(p.avatarData){
    document.getElementById('pf-avatar-preview').innerHTML = `<img src="${p.avatarData}">`;
  } else {
    document.getElementById('pf-avatar-preview').innerHTML = `<span style="font-size:36px">${roleEmoji(p.funcao)}</span>`;
  }
  const perms = p.perms || {};
  ['criar','editar','excluir','exportar','config','perfis'].forEach(k=>{
    document.getElementById('perm-'+k).checked = !!perms[k];
  });
  document.getElementById('perfil-form-panel').style.display='block';
  document.getElementById('pf-nome').focus();
  document.getElementById('perfil-form-panel').scrollIntoView({behavior:'smooth',block:'start'});
}

function cancelarPerfil(){
  document.getElementById('pf-edit-id').value = '';
  document.getElementById('pf-form-title').textContent = 'Novo Perfil';
  document.getElementById('pf-nome').value = '';
  document.getElementById('pf-funcao-val').value = '';
  document.getElementById('pf-ativo').value = 'Ativo';
  document.getElementById('pf-especialidade').value = '';
  document.getElementById('pf-telefone').value = '';
  document.getElementById('pf-email').value = '';
  document.getElementById('pf-matricula').value = '';
  document.getElementById('pf-projeto').value = '';
  document.getElementById('pf-local').value = '';
  document.getElementById('pf-turno').value = '';
  document.getElementById('pf-obs').value = '';
  document.getElementById('pf-avatar-data').value = '';
  document.getElementById('pf-avatar-preview').innerHTML = '<span id="pf-avatar-emoji">👷</span>';
  ['criar','editar','excluir','exportar','config','perfis'].forEach(p=>{
    document.getElementById('perm-'+p).checked = ['criar','editar','exportar'].includes(p);
  });
  if(window.innerWidth <= 768){
    const grid = document.getElementById('perfil-grid');
    if(grid) grid.scrollIntoView({behavior:'smooth', block:'start'});
  }
}

async function salvarPerfil(){
  const nome = document.getElementById('pf-nome').value.trim();
  const funcao = document.getElementById('pf-funcao-val').value;
  if(!nome){ toast('Informe o nome!', true); return; }
  if(!funcao){ toast('Selecione a função!', true); return; }
  const editId = document.getElementById('pf-edit-id').value;
  const perms = {
    criar: document.getElementById('perm-criar').checked,
    editar: document.getElementById('perm-editar').checked,
    excluir: document.getElementById('perm-excluir').checked,
    exportar: document.getElementById('perm-exportar').checked,
    config: document.getElementById('perm-config').checked,
    perfis: document.getElementById('perm-perfis').checked,
  };
  const perfil = {
    id: editId || Date.now().toString(),
    nome, funcao,
    ativo: document.getElementById('pf-ativo').value,
    especialidade: document.getElementById('pf-especialidade').value,
    telefone: document.getElementById('pf-telefone').value,
    email: document.getElementById('pf-email').value,
    matricula: document.getElementById('pf-matricula').value,
    projeto: document.getElementById('pf-projeto').value,
    local: document.getElementById('pf-local').value,
    turno: document.getElementById('pf-turno').value,
    obs: document.getElementById('pf-obs').value,
    avatarData: document.getElementById('pf-avatar-data').value,
    perms, cor: roleCor(funcao),
  };
  if(editId){ perfis[perfis.findIndex(p=>p.id===editId)] = perfil; }
  else { perfis.push(perfil); }
  savePerfis();
  sincronizarPerfisNaOS();
  populateSelects();
  renderPerfis();

  let googleOk = false;
  try{
    const g = await apiPost('salvarPerfil', perfil);
    googleOk = !!(g && g.success);
  }catch(err){
    console.warn('Falha ao salvar perfil no Google Sheets:', err);
  }

  cancelarPerfil();
  toast(editId
    ? `Perfil atualizado${googleOk ? ' e enviado ao Google Sheets' : ''}!`
    : `Perfil criado com sucesso${googleOk ? ' e enviado ao Google Sheets' : ''}!`);
}

function excluirPerfil(id){
  const p = perfis.find(x=>x.id===id);
  if(!confirm(`Excluir perfil de ${p?.nome}?`)) return;
  perfis = perfis.filter(x=>x.id!==id);
  savePerfis();
  sincronizarPerfisNaOS();
  populateSelects();
  renderPerfis();
  toast('Perfil excluído.');
}

function onAvatarChange(input){
  const file = input.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('pf-avatar-data').value = e.target.result;
    document.getElementById('pf-avatar-preview').innerHTML = `<img src="${e.target.result}">`;
  };
  reader.readAsDataURL(file);
}

function sincronizarPerfisNaOS(){
  if (typeof perfis === 'undefined') {
    console.warn('Variável "perfis" não definida');
    return;
  }
  if (typeof REF === 'undefined') {
    console.warn('Variável "REF" não definida');
    return;
  }
  const ativos = (perfis || []).filter(p=>p.ativo==='Ativo');
  const mecArr = ativos.filter(p=>['Mecânico','Eletromecânico','Supervisor','Gerente de Manutenção'].includes(p.funcao)).map(p=>p.nome);
  const sondArr = ativos.filter(p=>p.funcao==='Sondador').map(p=>p.nome);
  REF._mecanicosBase = REF._mecanicosBase || [...REF.mecanicos];
  REF._sondadoresBase = REF._sondadoresBase || [...REF.sondadores];
  REF.mecanicos = [...new Set([...REF._mecanicosBase, ...mecArr])].sort();
  REF.sondadores = [...new Set([...REF._sondadoresBase, ...sondArr])].sort();
}

// ════════════════════════════════════════════════════
// CONFIG LOCAL
// ════════════════════════════════════════════════════
function loadConfig(){
  document.getElementById('cfg-empresa').value = config.empresa||'';
  document.getElementById('cfg-prefixo').value = config.prefixo||'OS';
  document.getElementById('cfg-proximo').value = config.proximo||1;
}
function salvarConfig(){
  config.empresa = document.getElementById('cfg-empresa').value;
  config.prefixo = document.getElementById('cfg-prefixo').value||'OS';
  config.proximo = parseInt(document.getElementById('cfg-proximo').value)||1;
  saveCfg(); toast('Configurações salvas!');
}
function exportarDados(){
  // SharePoint config removed from backup
  const blob = new Blob([JSON.stringify({os_list,config},null,2)],{type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'energold_os_backup_' + new Date().toISOString().split('T')[0] + '.json';
  a.click(); toast('Backup exportado!');
}
function importarDados(input){
  const file = input.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const d = JSON.parse(e.target.result);
      if(!confirm('Substituir dados atuais?')) return;
      os_list = d.os_list || [];
      config = d.config || config;
      save(); saveCfg(); loadConfig(); toast('Dados importados!');
    } catch { toast('Arquivo inválido!', true); }
  };
  reader.readAsText(file);
}
function limparTodos(){
  if(!confirm('APAGAR TODAS as OS locais?')) return;
  if(!confirm('Confirma? Irreversível.')) return;
  os_list = []; save(); toast('OS locais removidas.');
}

// ════════════════════════════════════════════════════
// UTILITÁRIOS
// ════════════════════════════════════════════════════
function statusBadge(s){
  const cls = s==='Concluído' ? 'b-concluido' : 'b-aberto';
  return `<span class="badge ${cls}">${s||'—'}</span>`;
}
function tipoBadge(t){
  const v = (t||'').toLowerCase();
  const cls = v.startsWith('corretiva')
    ? 'b-corretiva'
    : v==='preditiva'
      ? 'b-preventiva'
      : v==='detectiva'
        ? 'b-mista'
        : 'b-preventiva';
  return `<span class="badge ${cls}">${t||'—'}</span>`;
}
function fmtDT(dt){
  if(!dt) return '—';
  const d = new Date(dt);
  if(isNaN(d)) return dt;
  return d.toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',year:'2-digit',hour:'2-digit',minute:'2-digit'});
}
let toastTimer = null;
function toast(msg, isErr=false){
  const el = document.getElementById('toast');
  if(!el) return;
  el.textContent = String(msg || '');
  el.style.display = 'flex';
  el.style.borderLeftColor = isErr ? 'var(--red)' : 'var(--teal)';
  el.classList.add('show');
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{
    el.classList.remove('show');
    setTimeout(()=>{ el.style.display = 'none'; }, 220);
  }, 3200);
}

function garantirAssinaturaDev(){
  const expected = 'Desenvolvido por Gabriel Felipe dos Santos © 2026';
  let footer = document.getElementById('dev-footer');
  if(!footer){
    footer = document.createElement('div');
    footer.id = 'dev-footer';
    footer.className = 'dev-footer';
    footer.innerHTML = '<strong>' + expected + '</strong>';
    document.body.appendChild(footer);
  } else if((footer.textContent||'').trim() !== expected){
    footer.innerHTML = '<strong>' + expected + '</strong>';
  }
  let mark = document.querySelector('.dev-watermark');
  if(!mark){
    mark = document.createElement('div');
    mark.className = 'dev-watermark';
    mark.setAttribute('aria-hidden','true');
    mark.innerHTML = '<span>' + expected + '</span>';
    document.body.insertBefore(mark, document.body.firstChild);
  } else if((mark.textContent||'').trim() !== expected){
    mark.innerHTML = '<span>' + expected + '</span>';
  }
}

let autoRefreshTimer = null;
const AUTO_REFRESH_MS = 15000;

function startAutoRefreshLoop(){
  stopAutoRefreshLoop();

  autoRefreshTimer = setInterval(async () => {
    try{
      if(!navigator.onLine) return;
      if(document.hidden) return;
      if(shouldDeferVisualRefresh()) return;

      await carregarOSGoogle(true, { source: 'interval', forceRefreshActivePage: true });
    }catch(err){
      console.warn('Falha no auto refresh periódico:', err);
    }
  }, AUTO_REFRESH_MS);
}

function stopAutoRefreshLoop(){
  if(autoRefreshTimer){
    clearInterval(autoRefreshTimer);
    autoRefreshTimer = null;
  }
}

// ════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', async () => {
  garantirAssinaturaDev();

  if(navigator.onLine){
    try {
      await enviarPendentesOS();
    } catch(e) {
      console.warn('Falha ao enviar pendentes na inicialização:', e);
    }
  }

  const synced = await carregarOSGoogle(true, { source: 'init', forceRefreshActivePage: true });

  if(!synced){
    os_list = mergeOSLists([], os_list, os_pending);
    save();
    atualizarProximoNumeroComBaseNaLista();
  }

  seedPerfis();
  sincronizarPerfisNaOS();
  limparDataRegistroEmTodas();
  renderDash();
  populateSelects();
  populatePerfilSelects();

  startAutoRefreshLoop();
  setInterval(garantirAssinaturaDev, 3000);
});

// ════════════════════════════════════════════════════
// FORMATAR DATA_REGISTRO
// ════════════════════════════════════════════════════
function formatarDataRegistro(dataStr) {
  if (!dataStr || dataStr === 'undefined') {
    return new Date().toISOString().replace('T', ' ').substring(0, 19);
  }
  
  // Converter para string se for objeto
  dataStr = String(dataStr).trim();
  
  // Se já está no formato correto (YYYY-MM-DD HH:mm:ss)
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dataStr)) {
    return dataStr;
  }
  
  // Se é um toString() de Date (Sat Apr 11 2026 18:02:30 GMT-0300...)
  // Esse é o formato que o Google Sheets está devolvendo
  if (dataStr.includes('GMT') || dataStr.includes('Sat') || dataStr.includes('Sun') || 
      dataStr.includes('Mon') || dataStr.includes('Tue') || dataStr.includes('Wed') ||
      dataStr.includes('Thu') || dataStr.includes('Fri')) {
    try {
      const d = new Date(dataStr);
      if (!isNaN(d.getTime())) {
        return d.toISOString().replace('T', ' ').substring(0, 19);
      }
    } catch (e) {
      console.warn('Erro ao parsear data GMT:', dataStr);
    }
  }
  
  // Tentar parsear como data ISO ou outro formato
  try {
    const d = new Date(dataStr);
    if (!isNaN(d.getTime())) {
      return d.toISOString().replace('T', ' ').substring(0, 19);
    }
  } catch (e) {}
  
  // Se tudo falhar, usar data atual
  console.warn('Data inválida, usando data atual:', dataStr);
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
}



// ════════════════════════════════════════════════════
// LIMPAR DATA_REGISTRO APÓS CARREGAR
// ════════════════════════════════════════════════════
function limparDataRegistroEmTodas() {
  os_list.forEach(os => {
    if (os.data_registro) {
      os.data_registro = formatarDataRegistro(os.data_registro);
    }
  });
  save();
}



// ════════════════════════════════════════════════════
// GERAR TIMESTAMP PARA GOOGLE SHEETS
// ════════════════════════════════════════════════════
function gerarDataRegistroGoogle() {
  // Formata como: 2026-04-11 23:49:11
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
}
