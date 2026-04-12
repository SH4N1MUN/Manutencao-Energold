/* MENU SIDEBAR MOBILE + RELÓGIO */
(function () {
  function updateHora() {
    try {
      const horaEl = document.getElementById('v4-hora');
      if (!horaEl) return;
      const agora = new Date();
      horaEl.textContent = agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
    const btnMenu = document.querySelector('.btn-menu');

    function handleMenuToggle(event) {
      if (!sidebar) return;
      event.preventDefault();
      event.stopPropagation();
      sidebar.classList.toggle('open');
      btnMenu && btnMenu.setAttribute('aria-expanded', sidebar.classList.contains('open') ? 'true' : 'false');
    }

    if (btnMenu && sidebar) {
      btnMenu.setAttribute('aria-expanded', 'false');
      btnMenu.addEventListener('click', handleMenuToggle);
      btnMenu.addEventListener('touchend', handleMenuToggle, { passive: false });
    }

    document.addEventListener('click', function (event) {
      if (!sidebar || !sidebar.classList.contains('open')) return;
      const target = event.target;
      if (target.closest && (target.closest('#sidebar') || target.closest('.btn-menu'))) return;
      sidebar.classList.remove('open');
      btnMenu && btnMenu.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && sidebar) {
        sidebar.classList.remove('open');
        btnMenu && btnMenu.setAttribute('aria-expanded', 'false');
      }
    });

    updateHora();
  });

  window.toggleSidebar = function () {
    const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
    const btnMenu = document.querySelector('.btn-menu');
    if (!sidebar) return;
    sidebar.classList.toggle('open');
    btnMenu && btnMenu.setAttribute('aria-expanded', sidebar.classList.contains('open') ? 'true' : 'false');
  };

  setInterval(updateHora, 1000);

  const originalSetItem = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function (key, value) {
    originalSetItem(key, value);
    if (key === 'eg_os') {
      updateHora();
    }
  };

  function updateConnectionUI(state = (navigator.onLine ? 'online' : 'offline')) {
    try {
      const dot = document.getElementById('v4-dot');
      const statusTxt = document.getElementById('v4-status-txt');
      const statusWrap = dot ? dot.closest('.v4-status') : null;
      const syncBtn = document.getElementById('v4-btn');
      if (!dot || !statusTxt || !statusWrap) return;

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

      statusTxt.textContent = 'Conectado';
      if (syncBtn) syncBtn.disabled = false;
    } catch (e) {}
  }

  async function syncNow() {
    if (!navigator.onLine) {
      updateConnectionUI('offline');
      try { toast('Sem internet. Não foi possível sincronizar agora.', true); } catch (e) {}
      return false;
    }

    updateConnectionUI('syncing');
    try {
      const envio = await enviarPendentesOS();
      const ok = await carregarOSGoogle(false, { source: 'manual-sync', forceRefreshActivePage: !shouldDeferVisualRefresh() });
      updateHora();
      updateConnectionUI(ok ? 'online' : (navigator.onLine ? 'online' : 'offline'));
      try {
        if (envio.sent || envio.failed) {
          toast(`Sync finalizado: ${envio.sent} enviada(s), ${envio.failed} pendente(s).`, envio.failed > 0);
        }
      } catch (e) {}
      return !!ok;
    } catch (e) {
      updateConnectionUI(navigator.onLine ? 'online' : 'offline');
      try { toast('Falha ao sincronizar.', true); } catch (err) {}
      return false;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const syncBtn = document.getElementById('v4-btn');
    if (syncBtn) {
      syncBtn.addEventListener('click', syncNow);
    }
    updateConnectionUI(navigator.onLine ? 'online' : 'offline');
  });

  window.addEventListener('online', function () {
    updateConnectionUI('online');
    try { syncNow(); } catch (e) {}
  });

  window.addEventListener('offline', function () {
    updateConnectionUI('offline');
  });

  // Atualiza automaticamente quando a aba volta a ficar visível/focada
  async function autoRefreshFromApi(trigger){
    if (!navigator.onLine) return false;
    try {
      return await carregarOSGoogle(true, { source: trigger, forceRefreshActivePage: false });
    } catch (e) {
      console.warn('Falha no auto refresh (' + trigger + '):', e);
      return false;
    }
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      autoRefreshFromApi('visibilitychange');
    }
  });

  window.addEventListener('focus', function () {
    autoRefreshFromApi('focus');
  });

  window.addEventListener('pageshow', function () {
    autoRefreshFromApi('pageshow');
  });

  // Polling com backoff exponencial: começa em 15s, dobra até 120s
  // Reseta para 15s quando a aba volta ao foco
  let _pollDelay = 15000;
  let _pollTimer = null;
  function agendarProximoPoll() {
    if (_pollTimer) clearTimeout(_pollTimer);
    _pollTimer = setTimeout(async function() {
      if (document.visibilityState === 'visible' && navigator.onLine) {
        await autoRefreshFromApi('interval');
      }
      _pollDelay = Math.min(_pollDelay * 2, 120000);
      agendarProximoPoll();
    }, _pollDelay);
  }
  agendarProximoPoll();
  // Reseta backoff ao voltar para a aba
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') { _pollDelay = 15000; }
  });
})();
