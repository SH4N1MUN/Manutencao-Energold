// ════════════════════════════════════════════════════
// UI.JS — Helpers de Interface + Gráficos Dashboard
// ENERGOLD Controle de Manutenção v2
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

// ── GRÁFICOS INLINE (SVG/HTML puro, sem dependências) ──

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
      <div style="text-align:center;color:var(--muted);font-size:12px;padding:20px 0">
        Sem dados
      </div>
    `;
    return;
  }

  const max = Math.max(...entries.map(([, v]) => Number(v)), 1);

  el.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:10px">
      ${entries.map(([k, v], i) => {
        const label = UIModule.escapeHtml(k);
        const value = Number(v) || 0;

        return `
          <div style="display:flex;align-items:flex-start;gap:9px;font-size:12px">
            <div style="
              font-size:11px;
              color:var(--text2);
              min-width:90px;
              max-width:140px;
              white-space:normal;
              line-height:1.2;
              flex-shrink:0;
              word-break:break-word;
            " title="${label}">${label}</div>

            <div style="
              flex:1;
              height:13px;
              background:var(--bg3);
              border-radius:3px;
              overflow:hidden;
              position:relative;
              margin-top:2px;
            ">
              <div style="
                height:100%;
                width:${((value / max) * 100).toFixed(1)}%;
                background:${COLORS[i % COLORS.length]};
                border-radius:3px;
                transition:width 0.6s ease;
                animation:barGrow 0.5s ease ${i * 0.06}s both;
              "></div>
            </div>

            <div style="
              font-family:var(--font-mono);
              font-size:11px;
              color:var(--text1);
              min-width:22px;
              text-align:right;
              flex-shrink:0;
              margin-top:1px;
            ">${value}${unit}</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
};

// injeta keyframes só uma vez
(function ensureUIAnimations() {
  if (document.getElementById('ui-chart-animations')) return;

  const style = document.createElement('style');
  style.id = 'ui-chart-animations';
  style.textContent = `
    @keyframes barGrow {
      from { width: 0 !important; }
    }
  `;
  document.head.appendChild(style);
})();

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
  const list = osList || (typeof os_list !== 'undefined' ? os_list : window.os_list) || [];

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
        animation:fadeIn 0.15s ease;
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
      el.textContent = Number.isInteger(numericTarget)
        ? String(numericTarget)
        : String(numericTarget);
      clearInterval(timer);
    }
  }, step);
};

// ── PATCH renderDash ──

(function() {
  const _orig = window.renderDash;

  if (typeof _orig === 'function') {
    window.renderDash = function() {
      _orig.apply(this, arguments);

      const atualizada = (typeof os_list !== 'undefined' ? os_list : window.os_list) || [];

      try {
        UIModule.renderDashCharts(atualizada);
      } catch (e) {
        console.error('Erro ao renderizar gráficos no patch renderDash:', e);
      }
    };
  }
})();

// ── INIT ──

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    try {
      UIModule.initTooltips();
    } catch (e) {
      console.error('Erro ao iniciar tooltips:', e);
    }
  }, 300);

  let attempts = 0;
  let lastSignature = '';

  const chartPoll = setInterval(function() {
    attempts++;

    try {
      const listaAtiva = (typeof os_list !== 'undefined' ? os_list : window.os_list) || [];

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
        UIModule.renderDashCharts(listaAtiva);
      }
    } catch (e) {
      console.error('Erro no polling dos gráficos:', e);
    }

    if (attempts >= 40) clearInterval(chartPoll);
  }, 1000);
});
