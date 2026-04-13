// ════════════════════════════════════════════════════
// UI.JS — Helpers de Interface + Gráficos Dashboard
// ENERGOLD Controle de Manutenção v2
// Versão executiva + estável
// ════════════════════════════════════════════════════
window.UIModule = window.UIModule || {};

// ── HELPERS ──

UIModule.escapeHtml = function(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
};

UIModule.getSafeOSList = function(list) {
  return list || (typeof os_list !== 'undefined' ? os_list : window.os_list) || [];
};

UIModule.isDashboardVisible = function() {
  const page = document.getElementById('page-dashboard');
  return !!(page && page.classList.contains('active'));
};

// ── ANIMAÇÕES ──

(function ensureUIAnimations() {
  if (document.getElementById('ui-chart-animations')) return;

  const style = document.createElement('style');
  style.id = 'ui-chart-animations';
  style.textContent = `
    @keyframes barGrow {
      from { width: 0 !important; }
    }
    @keyframes fadeInSoft {
      from { opacity: 0; transform: translateY(2px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
})();

// ── GRÁFICOS INLINE ──

UIModule.renderBarChart = function(elId, data, opts = {}) {
  const el = document.getElementById(elId);
  if (!el) return;

  const { maxItems = 6, unit = '' } = opts;

  const COLORS = [
    'var(--teal)',
    'var(--blue)',
    'var(--gold)',
    'var(--green)',
    'var(--red)',
    '#8B5CF6'
  ];

  const entries = Object.entries(data || {})
    .filter(([, v]) => Number(v) > 0)
    .sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0]), 'pt-BR'))
    .slice(0, maxItems);

  if (!entries.length) {
    el.innerHTML = `
      <div style="
        text-align:center;
        color:var(--muted);
        font-size:12px;
        padding:28px 0;
        animation:fadeInSoft 0.2s ease;
      ">
        Sem dados
      </div>
    `;
    return;
  }

  const max = Math.max(...entries.map(([, v]) => Number(v)), 1);
  const total = entries.reduce((s, [, v]) => s + (Number(v) || 0), 0);

  el.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px;animation:fadeInSoft 0.2s ease">
      ${entries.map(([k, v], i) => {
        const label = UIModule.escapeHtml(k);
        const value = Number(v) || 0;
        const percent = total ? Math.round((value / total) * 100) : 0;
        const isTop = i === 0;

        return `
          <div style="display:flex;flex-direction:column;gap:6px;opacity:${isTop ? '1' : '0.97'}">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
              <div
                style="
                  min-width:110px;
                  max-width:230px;
                  font-size:12px;
                  line-height:1.25;
                  color:${isTop ? 'var(--text1)' : 'var(--text2)'};
                  font-weight:${isTop ? '700' : '500'};
                  white-space:nowrap;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  letter-spacing:0.1px;
                "
                title="${label}"
              >${label}</div>

              <div style="
                display:flex;
                align-items:center;
                gap:8px;
                flex-shrink:0;
                font-family:var(--font-mono);
              ">
                <span style="
                  font-size:11px;
                  color:var(--text2);
                ">${percent}%</span>
                <span style="
                  min-width:20px;
                  text-align:right;
                  font-size:12px;
                  color:var(--text1);
                  font-weight:${isTop ? '700' : '600'};
                ">${value}${unit}</span>
              </div>
            </div>

            <div style="
              width:100%;
              height:14px;
              background:var(--bg3);
              border-radius:999px;
              overflow:hidden;
              position:relative;
            ">
              <div style="
                height:100%;
                width:${((value / max) * 100).toFixed(1)}%;
                background:${COLORS[i % COLORS.length]};
                border-radius:999px;
                transition:width 0.6s ease;
                animation:barGrow 0.5s ease ${i * 0.06}s both;
                box-shadow:${isTop ? '0 0 0 1px rgba(255,255,255,0.18) inset' : 'none'};
              "></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
};

UIModule.renderSparkline = function(elId, values, color = 'var(--teal)') {
  const el = document.getElementById(elId);
  if (!el || !values || !values.length) return;

  const safeValues = values.map(v => Number(v) || 0);
  const max = Math.max(...safeValues, 1);

  el.innerHTML = `
    <div style="display:flex;align-items:flex-end;gap:3px;height:36px">
      ${safeValues.map(v => `
        <div style="
          flex:1;
          background:${color};
          border-radius:2px 2px 0 0;
          opacity:0.75;
          height:${Math.max(3, Math.round((v / max) * 36))}px;
          transition:height 0.4s ease;
          min-width:4px;
        "></div>
      `).join('')}
    </div>
  `;
};

UIModule.renderDonut = function(elId, percent, color = 'var(--teal)', label = '') {
  const el = document.getElementById(elId);
  if (!el) return;

  const pct = Math.max(0, Math.min(100, Number(percent) || 0));
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px">
      <svg width="64" height="64" viewBox="0 0 64 64" style="flex-shrink:0">
        <circle cx="32" cy="32" r="${r}" fill="none" stroke="var(--bg3, #eee)" stroke-width="6"></circle>
        <circle
          cx="32"
          cy="32"
          r="${r}"
          fill="none"
          stroke="${color}"
          stroke-width="6"
          stroke-dasharray="${dash.toFixed(2)} ${circ.toFixed(2)}"
          stroke-linecap="round"
          transform="rotate(-90 32 32)"
          style="transition:stroke-dasharray 0.6s ease"
        ></circle>
        <text
          x="32"
          y="36"
          text-anchor="middle"
          font-family="var(--font-brand, sans-serif)"
          font-size="14"
          font-weight="700"
          fill="${color}"
        >${pct}%</text>
      </svg>
      ${label ? `<div style="font-size:12px;color:var(--text2);line-height:1.4">${UIModule.escapeHtml(label)}</div>` : ''}
    </div>
  `;
};

// ── DASHBOARD CHARTS ──

UIModule.renderDashCharts = function(osList) {
  const list = UIModule.getSafeOSList(osList);

  if (!Array.isArray(list) || !list.length) {
    UIModule.renderBarChart('dash-chart-tipo', {});
    UIModule.renderBarChart('dash-chart-equip', {});
    UIModule.renderBarChart('dash-chart-mec', {});
    return;
  }

  const byTipo = {};
  const byEquip = {};
  const byMec = {};

  list.forEach(o => {
    if (!o || typeof o !== 'object') return;

    const tipo = o.tipo || o.tipo_os || o.categoria;
    if (tipo) {
      const t = String(tipo).trim();
      if (t) byTipo[t] = (byTipo[t] || 0) + 1;
    }

    const equip = o.tag || o.equipamento || o.maquina;
    if (equip !== undefined && equip !== null && equip !== '') {
      const k = String(equip).trim();
      if (k) byEquip[k] = (byEquip[k] || 0) + 1;
    }

    const mec = o.mecanico || o.mecanico_responsavel || o.responsavel;
    if (mec) {
      const nm = String(mec).trim().split(' ')[0];
      if (nm) byMec[nm] = (byMec[nm] || 0) + 1;
    }
  });

  UIModule.renderBarChart('dash-chart-tipo', byTipo, { maxItems: 5 });
  UIModule.renderBarChart('dash-chart-equip', byEquip, { maxItems: 6 });
  UIModule.renderBarChart('dash-chart-mec', byMec, { maxItems: 6 });
};

UIModule.safeRenderDashCharts = function(osList) {
  try {
    UIModule.renderDashCharts(osList);
  } catch (e) {
    console.error('Erro ao renderizar gráficos do dashboard:', e);
  }
};

// ── INDICADOR DE PENDENTES ──

UIModule.updatePendingIndicator = function(count) {
  const el = document.getElementById('pending-indicator');
  if (!el) return;

  if ((Number(count) || 0) > 0) {
    el.textContent = String(count);
    el.style.display = 'inline-flex';
  } else {
    el.style.display = 'none';
  }
};

// ── TOOLTIP ──

UIModule.initTooltips = function() {
  document.querySelectorAll('[data-tip]').forEach(el => {
    el.style.position = 'relative';

    el.addEventListener('mouseenter', function() {
      this.querySelectorAll('._ui-tip').forEach(t => t.remove());

      const tip = document.createElement('div');
      tip.className = '_ui-tip';
      tip.textContent = this.getAttribute('data-tip') || '';
      tip.style.cssText = `
        position:absolute;
        bottom:calc(100% + 8px);
        left:50%;
        transform:translateX(-50%);
        background:var(--navy2, #1e293b);
        color:#fff;
        padding:5px 10px;
        border-radius:6px;
        font-size:11px;
        white-space:nowrap;
        pointer-events:none;
        z-index:9999;
        box-shadow:0 4px 12px rgba(0,0,0,0.3);
        animation:fadeInSoft 0.15s ease;
      `;
      this.appendChild(tip);
    });

    el.addEventListener('mouseleave', function() {
      this.querySelectorAll('._ui-tip').forEach(t => t.remove());
    });
  });
};

// ── CONTADOR ANIMADO ──

UIModule.animateCounter = function(el, target, duration = 600) {
  if (!el) return;

  const numericTarget = Number(target);
  const start = parseFloat(el.textContent) || 0;
  const diff = numericTarget - start;
  const step = 16;
  const steps = Math.ceil(duration / step);
  let i = 0;

  const timer = setInterval(() => {
    i++;
    const progress = i / steps;
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + diff * eased;

    el.textContent = Number.isInteger(numericTarget)
      ? Math.round(current)
      : current.toFixed(1);

    if (i >= steps) {
      el.textContent = String(Number.isInteger(numericTarget) ? numericTarget : numericTarget);
      clearInterval(timer);
    }
  }, step);
};

// ── PATCH renderDash ──

UIModule.tryPatchRenderDash = function() {
  if (window.__uiRenderDashPatched) return true;
  if (typeof window.renderDash !== 'function') return false;

  const original = window.renderDash;

  window.renderDash = function() {
    original.apply(this, arguments);
    const atualizada = UIModule.getSafeOSList();
    UIModule.safeRenderDashCharts(atualizada);
  };

  window.__uiRenderDashPatched = true;
  return true;
};

// ── INIT ──

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    try {
      UIModule.initTooltips();
    } catch (e) {
      console.error('Erro ao iniciar tooltips:', e);
    }
  }, 300);

  // tenta patchar renderDash várias vezes até existir
  let patchAttempts = 0;
  const patchTimer = setInterval(() => {
    patchAttempts++;
    const ok = UIModule.tryPatchRenderDash();
    if (ok || patchAttempts >= 40) clearInterval(patchTimer);
  }, 250);

  // primeira renderização defensiva
  setTimeout(() => {
    UIModule.safeRenderDashCharts(UIModule.getSafeOSList());
  }, 500);

  let attempts = 0;
  let lastSignature = '';

  const chartPoll = setInterval(function() {
    attempts++;

    try {
      const listaAtiva = UIModule.getSafeOSList();

      const signature = JSON.stringify(
        [...listaAtiva]
          .map(o => ({
            id: o?.id || o?.id_os || '',
            tipo: o?.tipo || o?.tipo_os || o?.categoria || '',
            equip: o?.tag || o?.equipamento || o?.maquina || '',
            mec: o?.mecanico || o?.mecanico_responsavel || o?.responsavel || ''
          }))
          .sort((a, b) => String(a.id).localeCompare(String(b.id)))
      );

      if (signature !== lastSignature) {
        lastSignature = signature;
        UIModule.safeRenderDashCharts(listaAtiva);
      }
    } catch (e) {
      console.error('Erro no polling dos gráficos:', e);
    }

    if (attempts >= 120) clearInterval(chartPoll);
  }, 1000);

  // quando a aba volta a ficar visível
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      UIModule.safeRenderDashCharts(UIModule.getSafeOSList());
    }
  });

  // quando a janela recebe foco
  window.addEventListener('focus', function() {
    UIModule.safeRenderDashCharts(UIModule.getSafeOSList());
  });

  // expõe helper global opcional
  window.safeRenderDashCharts = UIModule.safeRenderDashCharts;
});
