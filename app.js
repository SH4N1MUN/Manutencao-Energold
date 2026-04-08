import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  enableIndexedDbPersistence,
  serverTimestamp,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';

const STORAGE_KEY = 'controle_manutencao_os';
const CACHE_QUEUE_KEY = 'controle_manutencao_queue';

const form = document.getElementById('osForm');
const message = document.getElementById('message');
const tableBody = document.getElementById('osTableBody');
const rowTemplate = document.getElementById('rowTemplate');
const searchInput = document.getElementById('searchInput');
const exportCsvBtn = document.getElementById('exportCsvBtn');
const syncNowBtn = document.getElementById('syncNowBtn');
const connectionBadge = document.getElementById('connectionBadge');
const firebaseBadge = document.getElementById('firebaseBadge');
const totalOs = document.getElementById('totalOs');
const pendingOs = document.getElementById('pendingOs');
const syncedOs = document.getElementById('syncedOs');

let db = null;
let firebaseReady = false;
let localOrders = loadLocalOrders();

setDefaultDate();
updateConnectionUI();
renderTable();
registerServiceWorker();
initFirebase();

window.addEventListener('online', async () => {
  updateConnectionUI();
  await syncPendingOrders();
});
window.addEventListener('offline', updateConnectionUI);

form.addEventListener('submit', handleSubmit);
searchInput.addEventListener('input', renderTable);
exportCsvBtn.addEventListener('click', exportCsv);
syncNowBtn.addEventListener('click', async () => {
  await syncPendingOrders();
  renderTable();
});
tableBody.addEventListener('click', handleTableActions);

function setDefaultDate() {
  const input = document.getElementById('data_abertura');
  input.value = new Date().toISOString().split('T')[0];
}

function loadLocalOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLocalOrders() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localOrders));
}

function loadQueue() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_QUEUE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveQueue(queue) {
  localStorage.setItem(CACHE_QUEUE_KEY, JSON.stringify(queue));
}

function showMessage(text, type = 'neutral') {
  message.textContent = text;
  message.className = `message ${type}`;
}

function updateConnectionUI() {
  if (navigator.onLine) {
    connectionBadge.textContent = 'Online';
    connectionBadge.className = 'badge success';
  } else {
    connectionBadge.textContent = 'Offline';
    connectionBadge.className = 'badge warning';
  }
}

async function initFirebase() {
  try {
    const hasPlaceholder = !firebaseConfig.apiKey || firebaseConfig.apiKey.includes('COLE_SUA_API_KEY');
    if (hasPlaceholder) {
      firebaseBadge.textContent = 'Firebase: configurar credenciais';
      firebaseBadge.className = 'badge warning';
      showMessage('App pronto para GitHub Pages. Falta apenas preencher o arquivo firebase-config.js para sincronizar com a nuvem.', 'warning');
      return;
    }

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);

    try {
      await enableIndexedDbPersistence(db);
    } catch {
      console.warn('Persistência do Firestore não pôde ser habilitada neste navegador.');
    }

    firebaseReady = true;
    firebaseBadge.textContent = 'Firebase: conectado';
    firebaseBadge.className = 'badge success';
    await fetchRemoteOrders();
    await syncPendingOrders();
  } catch (error) {
    console.error(error);
    firebaseBadge.textContent = 'Firebase: erro';
    firebaseBadge.className = 'badge danger';
    showMessage('O app abriu, mas houve erro ao conectar no Firebase. Verifique o firebase-config.js e as regras do Firestore.', 'danger');
  }
}

async function fetchRemoteOrders() {
  if (!firebaseReady || !db) return;
  try {
    const q = query(collection(db, 'ordens_servico'), orderBy('criado_em', 'desc'));
    const snapshot = await getDocs(q);
    const remote = snapshot.docs.map(d => ({
      id: d.id,
      ...normalizeRemoteData(d.data()),
      sync_status: 'sincronizado'
    }));

    const map = new Map(localOrders.map(item => [item.local_id || item.id, item]));
    remote.forEach(item => {
      map.set(item.id, { ...item, local_id: item.id });
    });

    localOrders = Array.from(map.values()).sort(sortByCreatedDesc);
    saveLocalOrders();
    renderTable();
  } catch (error) {
    console.error(error);
  }
}

function normalizeRemoteData(data) {
  return {
    numero_os: data.numero_os || '',
    data_abertura: data.data_abertura || '',
    equipamento_nome: data.equipamento_nome || '',
    local: data.local || '',
    mecanico: data.mecanico || '',
    solicitante: data.solicitante || '',
    prioridade: data.prioridade || '',
    status: data.status || '',
    descricao: data.descricao || '',
    observacao: data.observacao || '',
    criado_em: data.criado_em?.toDate?.()?.toISOString?.() || data.criado_em || new Date().toISOString(),
    atualizado_em: data.atualizado_em?.toDate?.()?.toISOString?.() || data.atualizado_em || new Date().toISOString()
  };
}

async function handleSubmit(event) {
  event.preventDefault();

  const payload = {
    local_id: crypto.randomUUID(),
    numero_os: document.getElementById('numero_os').value.trim(),
    data_abertura: document.getElementById('data_abertura').value,
    equipamento_nome: document.getElementById('equipamento_nome').value.trim(),
    local: document.getElementById('local').value.trim(),
    mecanico: document.getElementById('mecanico').value.trim(),
    solicitante: document.getElementById('solicitante').value.trim(),
    prioridade: document.getElementById('prioridade').value,
    status: document.getElementById('status').value,
    descricao: document.getElementById('descricao').value.trim(),
    observacao: document.getElementById('observacao').value.trim(),
    criado_em: new Date().toISOString(),
    atualizado_em: new Date().toISOString(),
    sync_status: 'pendente'
  };

  localOrders.unshift(payload);
  saveLocalOrders();

  const queue = loadQueue();
  queue.push(payload);
  saveQueue(queue);

  form.reset();
  setDefaultDate();
  renderTable();

  if (navigator.onLine && firebaseReady) {
    await syncPendingOrders();
    showMessage('OS salva com sucesso e enviada para sincronização.', 'success');
  } else {
    showMessage('OS salva localmente. Ela será sincronizada quando houver internet e Firebase configurado.', 'warning');
  }
}

async function syncPendingOrders() {
  const queue = loadQueue();
  if (!queue.length) {
    renderTable();
    return;
  }
  if (!navigator.onLine) {
    showMessage('Sem internet no momento. As OS continuam seguras localmente.', 'warning');
    return;
  }
  if (!firebaseReady || !db) {
    showMessage('Firebase ainda não configurado. O app continua operando localmente.', 'warning');
    return;
  }

  const remaining = [];

  for (const item of queue) {
    try {
      const docRef = await addDoc(collection(db, 'ordens_servico'), {
        numero_os: item.numero_os,
        data_abertura: item.data_abertura,
        equipamento_nome: item.equipamento_nome,
        local: item.local,
        mecanico: item.mecanico,
        solicitante: item.solicitante,
        prioridade: item.prioridade,
        status: item.status,
        descricao: item.descricao,
        observacao: item.observacao,
        origem: 'github-pages-pwa',
        criado_em: serverTimestamp(),
        atualizado_em: serverTimestamp()
      });

      localOrders = localOrders.map(order => order.local_id === item.local_id
        ? { ...order, id: docRef.id, sync_status: 'sincronizado' }
        : order);
    } catch (error) {
      console.error('Erro ao sincronizar item:', error);
      remaining.push(item);
    }
  }

  saveQueue(remaining);
  saveLocalOrders();
  renderTable();

  if (!remaining.length) {
    showMessage('Sincronização concluída com sucesso.', 'success');
  } else {
    showMessage(`Parte dos registros ainda ficou pendente (${remaining.length}).`, 'warning');
  }
}

function renderTable() {
  const term = searchInput.value.trim().toLowerCase();
  tableBody.innerHTML = '';

  const filtered = [...localOrders]
    .sort(sortByCreatedDesc)
    .filter(item => {
      const haystack = [item.numero_os, item.equipamento_nome, item.mecanico, item.status]
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });

  filtered.forEach(item => {
    const fragment = rowTemplate.content.cloneNode(true);
    fragment.querySelector('[data-field="numero_os"]').textContent = item.numero_os;
    fragment.querySelector('[data-field="data_abertura"]').textContent = formatDate(item.data_abertura);
    fragment.querySelector('[data-field="equipamento_nome"]').textContent = item.equipamento_nome;
    fragment.querySelector('[data-field="mecanico"]').textContent = item.mecanico;
    fragment.querySelector('[data-field="status"]').textContent = item.status;
    fragment.querySelector('[data-field="prioridade"]').textContent = item.prioridade;

    const syncCell = fragment.querySelector('[data-field="sync_status"]');
    const sync = item.sync_status || 'local';
    syncCell.textContent = sync === 'sincronizado' ? 'Sincronizado' : 'Pendente';
    syncCell.className = sync === 'sincronizado' ? 'sync-ok' : 'sync-pending';

    const deleteBtn = fragment.querySelector('[data-action="delete"]');
    deleteBtn.dataset.id = item.id || '';
    deleteBtn.dataset.localId = item.local_id || item.id || '';

    tableBody.appendChild(fragment);
  });

  const total = localOrders.length;
  const pending = localOrders.filter(x => x.sync_status !== 'sincronizado').length;
  const synced = total - pending;

  totalOs.textContent = String(total);
  pendingOs.textContent = String(pending);
  syncedOs.textContent = String(synced);
}

async function handleTableActions(event) {
  const button = event.target.closest('button[data-action="delete"]');
  if (!button) return;

  const localId = button.dataset.localId;
  const id = button.dataset.id;
  if (!confirm('Deseja excluir esta OS?')) return;

  localOrders = localOrders.filter(item => (item.local_id || item.id) !== localId);
  saveLocalOrders();

  const queue = loadQueue().filter(item => item.local_id !== localId);
  saveQueue(queue);

  if (id && firebaseReady && db && navigator.onLine) {
    try {
      await deleteDoc(doc(db, 'ordens_servico', id));
    } catch (error) {
      console.error(error);
      showMessage('Registro removido localmente, mas houve erro ao excluir no Firebase.', 'warning');
    }
  }

  renderTable();
}

function exportCsv() {
  const rows = [
    ['numero_os', 'data_abertura', 'equipamento_nome', 'local', 'mecanico', 'solicitante', 'prioridade', 'status', 'descricao', 'observacao', 'sync_status'],
    ...localOrders.map(item => [
      item.numero_os,
      item.data_abertura,
      item.equipamento_nome,
      item.local,
      item.mecanico,
      item.solicitante,
      item.prioridade,
      item.status,
      sanitizeCsv(item.descricao),
      sanitizeCsv(item.observacao),
      item.sync_status || 'pendente'
    ])
  ];

  const csv = rows.map(row => row.map(value => `"${String(value ?? '').replaceAll('"', '""')}"`).join(';')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `controle_manutencao_${new Date().toISOString().slice(0,10)}.csv`;
  link.click();
}

function sanitizeCsv(text = '') {
  return String(text).replace(/\n/g, ' ').trim();
}

function sortByCreatedDesc(a, b) {
  return new Date(b.criado_em || 0) - new Date(a.criado_em || 0);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) return dateStr;
  return `${day}/${month}/${year}`;
}

async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./service-worker.js');
    } catch (error) {
      console.error('Falha ao registrar service worker', error);
    }
  }
}
