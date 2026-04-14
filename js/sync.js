/* ════════════════════════════════════════════════════
   SYNC.JS — ENERGOLD v8
   Responsável por:
   ─ Menu lateral mobile (drawer)
   ─ Relógio em tempo real
   ─ Status de conexão (online/offline/syncing)
   ─ Botão de sync manual
   ─ Auto-refresh por visibilidade e polling
   ─ Notificação de nova versão do PWA
════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── UTILITÁRIO: atualiza relógio ─────────────────── */
  function updateHora() {
    try {
      const horaEl = document.getElementById('v4-hora');
      if (!horaEl) return;
      horaEl.textContent = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    } catch (e) {}
  }

  /* ── SIDEBAR MOBILE ───────────────────────────────── */
  function initSidebarMobile() {
    const sidebar  = document.getElementById('sidebar') || document.querySelector('.sidebar');
    const btnMenu  = document.querySelector('.btn-menu');

    if (!sidebar || !btnMenu) return;

    /* Cria overlay se não existir */
    let overlay = document.getElementById('sidebar-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'sidebar-overlay';
      overlay.className = 'sidebar-overlay';
      document.body.appendChild(overlay);
    }

    function openSidebar() {
      sidebar.classList.add('open');
      overlay.classList.add('open');
      btnMenu.setAttribute('aria-expanded', 'true');
      /* Trava scroll do body enquanto menu está aberto */
      document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      btnMenu.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function toggleSidebarInternal(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }

    /* Remove listeners antigos para evitar duplicação */
    const newBtn = btnMenu.cloneNode(true);
    btnMenu.parentNode.replaceChild(newBtn, btnMenu);

    /* Evento de clique no botão hamburguer */
    newBtn.addEventListener('click', toggleSidebarInternal, { passive: false });

    /* Fecha ao clicar no overlay */
    overlay.addEventListener('click', closeSidebar);

    /* Fecha ao clicar num item do menu */
    sidebar.addEventListener('click', function (e) {
      const item = e.target.closest('.nav-item');
      if (item && window.innerWidth <= 768) {
        /* Pequeno delay para a animação de navegação não travar */
        setTimeout(closeSidebar, 80);
      }
    });

    /* Fecha com ESC */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSidebar();
    });

    /* Fecha se redimensionar para desktop */
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth > 768) {
          closeSidebar();
        }
      }, 150);
    });

    /* Expõe globalmente */
    window.toggleSidebar = toggleSidebarInternal;
  }

  /* ── STATUS DE CONEXÃO ────────────────────────────── */
  function updateConnectionUI(state) {
    if (!state) state = navigator.onLine ? 'online' : 'offline';

    try {
      const dot       = document.getElementById('v4-dot');
      const statusTxt = document.getElementById('v4-status-txt');
      const statusWrap = dot ? dot.closest('.v4-status') : null;
      const syncBtn   = document.getElementById('v4-btn');

      if (!dot || !statusTxt || !statusWrap) return;

      /* Remove classes anteriores */
      dot.classList.remove('erro', 'sync');
      statusWrap.classList.remove('offline', 'syncing');

      if (state === 'syncing') {
        dot.classList.add('sync');
        statusWrap.classList.add('syncing');
        statusTxt.textContent = 'Sincronizando';
        if (syncBtn) syncBtn.disabled = true;
        return;
      }

      if (state === 'offline') {
        dot.classList.add('erro');
        statusWrap.classList.add('offline');
        statusTxt.textContent = 'Sem internet';
        if (syncBtn) syncBtn.disabled = true;
        return;
      }

      /* Online */
      statusTxt.textContent = 'Conectado';
      if (syncBtn) syncBtn.disabled = false;
    } catch (e) {}
  }

  /* ── SYNC MANUAL ──────────────────────────────────── */
  async function syncNow() {
    if (!navigator.onLine) {
      updateConnectionUI('offline');
      try { toast('Sem internet. Não foi possível sincronizar.', true); } catch (e) {}
      return false;
    }

    updateConnectionUI('syncing');
    try {
      const envio = await enviarPendentesOS();
      const ok = await carregarOSGoogle(false, {
        source: 'manual-sync',
        forceRefreshActivePage: !shouldDeferVisualRefresh()
      });
      updateHora();
      updateConnectionUI(ok ? 'online' : (navigator.onLine ? 'online' : 'offline'));
      try {
        if (envio && (envio.sent || envio.failed)) {
          toast(`Sync: ${envio.sent} enviada(s), ${envio.failed} pendente(s).`, envio.failed > 0);
        }
      } catch (e) {}
      return !!ok;
    } catch (e) {
      updateConnectionUI(navigator.onLine ? 'online' : 'offline');
      try { toast('Falha ao sincronizar.', true); } catch (err) {}
      return false;
    }
  }

  /* ── AUTO REFRESH ─────────────────────────────────── */
  async function autoRefreshFromApi(trigger) {
    if (!navigator.onLine) return false;
    try {
      return await carregarOSGoogle(true, {
        source: trigger,
        forceRefreshActivePage: false
      });
    } catch (e) {
      console.warn('[Sync] Falha no auto-refresh (' + trigger + '):', e);
      return false;
    }
  }

  /* ── POLLING COM BACKOFF EXPONENCIAL ─────────────── */
  let _pollDelay = 15000;
  let _pollTimer = null;

  function agendarProximoPoll() {
    if (_pollTimer) clearTimeout(_pollTimer);
    _pollTimer = setTimeout(async function () {
      if (document.visibilityState === 'visible' && navigator.onLine) {
        await autoRefreshFromApi('interval');
      }
      _pollDelay = Math.min(_pollDelay * 2, 120000);
      agendarProximoPoll();
    }, _pollDelay);
  }

  /* ── NOTIFICAÇÃO DE ATUALIZAÇÃO DO PWA ───────────── */
  function initPWAUpdateNotification() {
    if (!('serviceWorker' in navigator)) return;

    /* Ouve mensagens do service worker */
    navigator.serviceWorker.addEventListener('message', function (event) {
      if (event.data && event.data.type === 'SW_UPDATED') {
        console.log('[PWA] Nova versão disponível:', event.data.version);
        showUpdateBanner();
      }
    });

    /* Detecta quando um SW em waiting está pronto */
    navigator.serviceWorker.ready.then(registration => {
      if (registration.waiting) {
        showUpdateBanner();
      }
      registration.addEventListener('updatefound', () => {
        const installing = registration.installing;
        if (!installing) return;
        installing.addEventListener('statechange', () => {
          if (installing.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateBanner();
          }
        });
      });
    });
  }

  function showUpdateBanner() {
    /* Evita mostrar múltiplos banners */
    if (document.getElementById('sw-update-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'sw-update-banner';
    banner.style.cssText = `
      position: fixed;
      bottom: calc(60px + env(safe-area-inset-bottom, 0px));
      left: 50%;
      transform: translateX(-50%);
      background: #0B1E3D;
      color: #fff;
      padding: 12px 20px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 4px 20px rgba(11,30,61,.35);
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 12px;
      white-space: nowrap;
      max-width: calc(100vw - 32px);
    `;
    banner.innerHTML = `
      <span>🔄 Nova versão disponível</span>
      <button onclick="window.location.reload()" style="
        background:#0762C8;color:#fff;border:none;
        border-radius:6px;padding:6px 14px;
        font-size:12px;font-weight:700;cursor:pointer;
        min-height:32px;
      ">Atualizar</button>
      <button onclick="this.closest('#sw-update-banner').remove()" style="
        background:transparent;color:rgba(255,255,255,.6);
        border:none;font-size:16px;cursor:pointer;padding:4px;
      ">✕</button>
    `;
    document.body.appendChild(banner);
  }

  /* ── INICIALIZAÇÃO ────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    /* Sidebar mobile */
    initSidebarMobile();

    /* Relógio */
    updateHora();

    /* Botão de sync */
    const syncBtn = document.getElementById('v4-btn');
    if (syncBtn) {
      syncBtn.addEventListener('click', syncNow);
    }

    /* Estado inicial de conexão */
    updateConnectionUI(navigator.onLine ? 'online' : 'offline');

    /* Notificações de atualização PWA */
    initPWAUpdateNotification();

    /* Polling */
    agendarProximoPoll();
  });

  /* ── SETINTERVAL para o relógio ───────────────────── */
  setInterval(updateHora, 1000);

  /* ── EVENTOS DE CONECTIVIDADE ─────────────────────── */
  window.addEventListener('online', function () {
    updateConnectionUI('online');
    try { syncNow(); } catch (e) {}
  });

  window.addEventListener('offline', function () {
    updateConnectionUI('offline');
  });

  /* ── VISIBILIDADE / FOCO ──────────────────────────── */
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      _pollDelay = 15000; /* Reseta backoff ao voltar para a aba */
      autoRefreshFromApi('visibilitychange');
    }
  });

  window.addEventListener('focus', function () {
    autoRefreshFromApi('focus');
  });

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      /* Página voltou do bfcache — garante que o estado está correto */
      updateConnectionUI(navigator.onLine ? 'online' : 'offline');
      autoRefreshFromApi('pageshow');
    }
  });

  /* ── OBSERVA GRAVAÇÕES NO localStorage ───────────── */
  const _originalSetItem = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function (key, value) {
    _originalSetItem(key, value);
    if (key === 'eg_os') {
      updateHora(); /* Atualiza hora quando dados são gravados */
    }
  };

  /* ── EXPÕE GLOBAIS ────────────────────────────────── */
  window.syncNow = syncNow;
  window.updateConnectionUI = updateConnectionUI;

})();
