// ════════════════════════════════════════════════════
// SISTEMA DE LOGIN — ENERGOLD v7
// ════════════════════════════════════════════════════

// Usuários do sistema (em produção, mova a validação para o servidor/Apps Script)
// ════════════════════════════════════════════════════
// AUTH — usuários gerenciados pelo Apps Script
// A senha nunca trafega em texto puro: usamos SHA-256(usuario+senha+salt)
// ════════════════════════════════════════════════════
const SESSION_KEY = 'eg_session_v2';
let currentUser = null;

async function sha256(texto) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

async function initLogin() {
  // Copia o logo SEMPRE (antes de qualquer redirecionamento)
  try {
    const headerLogo = document.querySelector('.brand-logo-header');
    if (headerLogo) {
      document.getElementById('login-logo-img').src = headerLogo.src;
    }
  } catch(e) {}

  // Tenta restaurar sessão salva (contém hash, nome, cargo e perms)
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      const session = JSON.parse(saved);
      if (session && session.usuario && session.hash) {
        currentUser = session;
        await carregarCadastrosGoogle();
        enterSystem();
        return;
      }
    }
  } catch(e) {}

  // Mostra tela de login
  document.getElementById('login-screen').classList.remove('hidden');
  // Permite Enter no campo de senha
  document.getElementById('login-pass').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') doLogin();
  });
  document.getElementById('login-user').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('login-pass').focus();
  });
}

async function doLogin() {
  const usuario = (document.getElementById('login-user').value || '').trim().toLowerCase();
  const senha   = document.getElementById('login-pass').value || '';
  const btn     = document.getElementById('login-btn');
  const errEl   = document.getElementById('login-error');

  errEl.classList.remove('show');
  document.getElementById('login-user').classList.remove('error');
  document.getElementById('login-pass').classList.remove('error');

  if (!usuario || !senha) {
    errEl.textContent = 'Preencha usuário e senha.';
    errEl.classList.add('show');
    if (!usuario) document.getElementById('login-user').classList.add('error');
    if (!senha)   document.getElementById('login-pass').classList.add('error');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Verificando...';

  try {
    // SHA-256(usuario + senha + salt) — senha nunca trafega em texto puro
    const hash = await sha256(usuario + senha + 'energold-salt-2026');

    // Valida contra o Apps Script (aba Usuarios na planilha)
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'login', data: { usuario, hash } })
    });
    const r = await resp.json();

    if (r && r.success) {
      currentUser = {
        usuario,
        hash,
        nome:  r.nome  || usuario,
        cargo: r.cargo || '',
        perms: r.perms || { criar:false, editar:false, excluir:false, exportar:false, config:false }
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
      await carregarCadastrosGoogle();
      populateSelects();
      populatePerfilSelects();
      enterSystem();
    } else {
      errEl.textContent = r.error || 'Usuário ou senha incorretos.';
      errEl.classList.add('show');
      document.getElementById('login-user').classList.add('error');
      document.getElementById('login-pass').classList.add('error');
      document.getElementById('login-pass').value = '';
      btn.disabled = false;
      btn.textContent = 'Entrar';
      document.getElementById('login-user').focus();
    }
  } catch(err) {
    errEl.textContent = 'Erro de conexão. Verifique sua internet.';
    errEl.classList.add('show');
    btn.disabled = false;
    btn.textContent = 'Entrar';
  }
}

function enterSystem() {
  document.getElementById('login-screen').classList.add('hidden');
  updateUserBadge();
  applyPermissions();
  if (typeof populateSelects === 'function') populateSelects();
  if (typeof populatePerfilSelects === 'function') populatePerfilSelects();
  // Re-executa o init do sistema (caso já tenha rodado antes do login)
  if (typeof renderDash === 'function') renderDash();
  if (typeof populateFiltros === 'function') populateFiltros();
  if (typeof renderLista === 'function') renderLista();
}

function updateUserBadge() {
  if (!currentUser) return;
  const initials = currentUser.nome.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase();
  document.getElementById('login-user-initial').textContent = initials;
  document.getElementById('login-user-name').textContent = currentUser.nome.split(' ')[0];
  document.getElementById('login-user-role-label').textContent = currentUser.cargo;
}

function applyPermissions() {
  if (!currentUser) return;
  const p = currentUser.perms;
  // Nova OS: header + nav
  document.querySelectorAll('[onclick*="nova-os"]').forEach(b => {
    b.style.display = p.criar ? '' : 'none';
  });
  // Configurações
  const cfgNav = document.querySelector('[data-page="configuracoes"]');
  if (cfgNav) cfgNav.style.display = p.config ? '' : 'none';
  // Botão exportar no header da lista
  const btnExport = document.getElementById('btn-exportar');
  if (btnExport) btnExport.style.display = p.exportar ? '' : 'none';
  // Re-renderiza lista para mostrar/ocultar botões de ação
  if (typeof renderLista === 'function') renderLista();
}

function toggleLogoutMenu() {
  const menu = document.getElementById('login-logout-menu');
  const badge = document.getElementById('login-user-badge');
  const isOpen = menu.classList.contains('open');
  if (!isOpen) {
    // Posiciona o dropdown baseado na posição real do badge na tela
    const rect = badge.getBoundingClientRect();
    menu.style.top = (rect.bottom + 6) + 'px';
    menu.style.right = (window.innerWidth - rect.right) + 'px';
    menu.style.left = 'auto';
  }
  menu.classList.toggle('open');
  if (!isOpen) {
    document.addEventListener('click', closeLogoutMenuOutside);
  }
}

function closeLogoutMenuOutside(e) {
  const wrapper = document.getElementById('login-user-wrapper');
  const menu = document.getElementById('login-logout-menu');
  // Ignora cliques dentro do badge OU dentro do próprio menu
  if ((wrapper && wrapper.contains(e.target)) || (menu && menu.contains(e.target))) return;
  menu.classList.remove('open');
  document.removeEventListener('click', closeLogoutMenuOutside);
}

function doLogout() {
  // Remove listener de fechar antes de qualquer coisa
  document.removeEventListener('click', closeLogoutMenuOutside);
  currentUser = null;
  remoteCadastros = null;
  localStorage.removeItem(SESSION_KEY); localStorage.removeItem('eg_session');
  document.getElementById('login-logout-menu').classList.remove('open');
  // Limpa campos
  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
  document.getElementById('login-error').classList.remove('show');
  document.getElementById('login-user').classList.remove('error');
  document.getElementById('login-pass').classList.remove('error');
  document.getElementById('login-btn').disabled = false;
  document.getElementById('login-btn').textContent = 'Entrar';
  // Volta para a tela de login
  document.getElementById('login-screen').classList.remove('hidden');
  // Restaura visibilidade de todos os elementos controlados por permissão
  document.querySelectorAll('[onclick*="nova-os"]').forEach(b => b.style.display = '');
  const cfgNav2 = document.querySelector('[data-page="configuracoes"]');
  if (cfgNav2) cfgNav2.style.display = '';
  const btnExp = document.getElementById('btn-exportar');
  if (btnExp) btnExp.style.display = '';
  setTimeout(function() { document.getElementById('login-user').focus(); }, 100);
}

// Inicializa o login quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initLogin);
