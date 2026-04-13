// ════════════════════════════════════════════════════
// UI.JS — Helpers de Interface + Gráficos Dashboard
// ENERGOLD Controle de Manutenção v2
// ════════════════════════════════════════════════════
window.UIModule = window.UIModule || {};

// ── GRÁFICOS INLINE (SVG/HTML puro, sem dependências) ──

/**
 * Renderiza um gráfico de barras horizontais em um elemento.
 * @param {string} elId   - ID do elemento container
 * @param {Object} data   - { label: value, ... }
 * @param {Object} opts   - { color, maxItems, title, unit }
 */
UIModule.renderBarChart = function(elId, data, opts = {}) {
  const el = document.getElementById(elId);
  if (!el) return;

  const {
    color = 'var(--teal)',
    maxItems = 6,
    unit = ''
  } = opts;

  const COLORS = [
    'var(--teal)', 'var(--blue)', 'var(--gold)',
    'var(--green)', 'var(--red)', '#8B5CF6'
  ];

  const entries = Object.entries(data)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxItems);

  if (!entries.length) {
    el.innerHTML = `<div style="text-align:center;color:var(--muted);font-size:12px;padding:20px 0">Sem dados</div>`;
    return;
  }

  const max = Math.max(...entries.map(([, v]) => v), 1);

  el.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:8px">
      ${entries.map(([k, v], i) => `
        <div style="display:flex;align-items:center;gap:9px;font-size:12px">
          <div style="
            font-size:11px;color:var(--text2);
            min-width:72px;max-width:100px;
            overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
            flex-shrink:0;
          " title="${k}">${k}</div>
          <div style="flex:1;height:13px;background:var(--bg3);border-radius:3px;overflow:hidden;position:relative">
            <div style="
              height:100%;
              width:${((v / max) * 100).toFixed(1)}%;
              background:${COLORS[i % COLORS.length]};
              border-radius:3px;
              transition:width 0.6s cubic-bezier(0.4,0,0.2,1);
              animation:barGrow 0.5s ease ${i * 0.06}s both;
            "></div>
          </div>
          <div style="
            font-family:var(--font-mono);font-size:11px;
            color:var(--text1);min-width:22px;text-align:right;flex-shrink:0;
          ">${v}${unit}</div>
        </div>
      `).join('')}
    </div>
    <style>
      @keyframes barGrow {
        from { width: 0 !important; }
      }
    </style>
  `;
};

/**
 * Renderiza mini sparkline de barras verticais.
 * @param {string} elId
 * @param {number[]} values
 * @param {string} color
 */
UIModule.renderSparkline = function(elId, values, color = 'var(--teal)') {
  const el = document.getElementById(elId);
  if (!el || !values.length) return;
  const max = Math.max(...values, 1);
  el.innerHTML = `
    <div style="display:flex;align-items:flex-end;gap:3px;height:36px">
      ${values.map(v => `
        <div style="
          flex:1;background:${color};border-radius:2px 2px 0 0;opacity:0.75;
          height:${Math.max(3, Math.round((v / max) * 36))}px;
          transition:height 0.4s ease;
          min-width:4px;
        "></div>
      `).join('')}
    </div>
  `;
};

/**
 * Renderiza indicador de progresso / donut simples.
 * @param {string} elId
 * @param {number} percent  0-100
 * @param {string} color
 * @param {string} label
 */
UIModule.renderDonut = function(elId, percent, color = 'var(--teal)', label = '') {
  const el = document.getElementById(elId);
  if (!el) return;
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px">
      <svg width="64" height="64" viewBox="0 0 64 64" style="flex-shrink:0">
        <circle cx="32" cy="32" r="${r}" fill="none" stroke="var(--bg3)" stroke-width="6"/>
        <circle cx="32" cy="32" r="${r}" fill="none" stroke="${color}" stroke-width="6"
          stroke-dasharray="${dash.toFixed(2)} ${circ.toFixed(2)}"
          stroke-linecap="round"
          transform="rotate(-90 32 32)"
          style="transition:stroke-dasharray 0.6s ease"/>
        <text x="32" y="36" text-anchor="middle" font-family="var(--font-brand)"
          font-size="14" font-weight="700" fill="${color}">${percent}%</text>
      </svg>
      ${label ? `<div style="font-size:12px;color:var(--text2);line-height:1.4">${label}</div>` : ''}
    </div>
  `;
};

// ── DASHBOARD CHARTS ──

/**
 * Monta os 3 gráficos extras do dashboard (tipo, equipamento, mecânico).
 * Deve ser chamado após renderDash().
 */
UIModule.renderDashCharts = function(osList) {
  if (!osList || !osList.length) return;

  // Agrupa por tipo
  const byTipo = {};
  const byEquip = {};
  const byMec = {};
  const byStatus = {};
  const horasByMec = {};

  osList.forEach(o => {
    // Por tipo
    if (o.tipo) {
      const t = o.tipo.trim();
      byTipo[t] = (byTipo[t] || 0) + 1;
    }
    // Por TAG/equip
    if (o.tag) {
      const k = `TAG ${o.tag}`;
      byEquip[k] = (byEquip[k] || 0) + 1;
    }
    // Por mecânico (primeiro nome)
    if (o.mecanico) {
      const nm = o.mecanico.trim().split(' ')[0];
      byMec[nm] = (byMec[nm] || 0) + 1;
      horasByMec[nm] = (horasByMec[nm] || 0) + (o.tempoH || 0);
    }
    // Por status
    if (o.status) {
      byStatus[o.status] = (byStatus[o.status] || 0) + 1;
    }
  });

  UIModule.renderBarChart('dash-chart-tipo',  byTipo,  { maxItems: 5 });
  UIModule.renderBarChart('dash-chart-equip', byEquip, { maxItems: 6 });
  UIModule.renderBarChart('dash-chart-mec',   byMec,   { maxItems: 6 });
};

// ── INDICADOR DE PENDENTES ──

UIModule.updatePendingIndicator = function(count) {
  const el = document.getElementById('pending-indicator');
  if (!el) return;
  if (count > 0) {
    el.textContent = count;
    el.style.display = 'inline-flex';
  } else {
    el.style.display = 'none';
  }
};

// ── TOOLTIP simples ──
UIModule.initTooltips = function() {
  document.querySelectorAll('[data-tip]').forEach(el => {
    el.style.position = 'relative';
    el.addEventListener('mouseenter', function() {
      const tip = document.createElement('div');
      tip.className = '_ui-tip';
      tip.textContent = this.getAttribute('data-tip');
      tip.style.cssText = `
        position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);
        background:var(--navy2);color:#fff;padding:5px 9px;border-radius:6px;
        font-size:11px;white-space:nowrap;pointer-events:none;z-index:9000;
        box-shadow:0 4px 12px rgba(0,0,0,0.2);
        animation:fadeIn 0.12s ease;
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
  const start = parseFloat(el.textContent) || 0;
  const diff  = target - start;
  const step  = 16;
  const steps = Math.ceil(duration / step);
  let i = 0;
  const timer = setInterval(() => {
    i++;
    const progress = i / steps;
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = start + diff * eased;
    el.textContent = Number.isInteger(target) ? Math.round(current) : current.toFixed(1);
    if (i >= steps) { el.textContent = target; clearInterval(timer); }
  }, step);
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', function() {
  // Atrasa tooltips para não bloquear render inicial
  setTimeout(UIModule.initTooltips, 800);
});
