// ════════════════════════════════════════════════════
// UI.JS — Helpers de Interface + Gráficos Dashboard
// ENERGOLD Controle de Manutenção v2
// ════════════════════════════════════════════════════
window.UIModule = window.UIModule || {};

// ── GRÁFICOS INLINE (SVG/HTML puro, sem dependências) ──

UIModule.renderBarChart = function(elId, data, opts = {}) {
  const el = document.getElementById(elId);
  if (!el) return;

  const { maxItems = 6, unit = '' } = opts;
  const COLORS = ['var(--teal)', 'var(--blue)', 'var(--gold)', 'var(--green)', 'var(--red)', '#8B5CF6'];

  const entries = Object.entries(data || {})
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
          <div style="font-size:11px;color:var(--text2);min-width:72px;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:0;" title="${k}">${k}</div>
          <div style="flex:1;height:13px;background:var(--bg3);border-radius:3px;overflow:hidden;position:relative">
            <div style="height:100%;width:${((v / max) * 100).toFixed(1)}%;background:${COLORS[i % COLORS.length]};border-radius:3px;transition:width 0.6s ease;animation:barGrow 0.5s ease ${i * 0.06}s both;"></div>
          </div>
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--text1);min-width:22px;text-align:right;flex-shrink:0;">${v}${unit}</div>
        </div>
      `).join('')}
    </div>
    <style>@keyframes barGrow { from { width: 0 !important; } }</style>
  `;
};

// ── DASHBOARD CHARTS ──

UIModule.renderDashCharts = function(osList) {
  const list = osList || (typeof os_list !== 'undefined' ? os_list : window.os_list) || [];

  if (!list.length) {
    UIModule.renderBarChart('dash-chart-tipo', {});
    UIModule.renderBarChart('dash-chart-equip', {});
    UIModule.renderBarChart('dash-chart-mec', {});
    return;
  }

  const byTipo = {}, byEquip = {}, byMec = {};

  list.forEach(o => {
    // Por tipo
    const tipo = o.tipo || o.tipo_os || o.categoria;
    if (tipo) {
      const t = String(tipo).trim();
      byTipo[t] = (byTipo[t] || 0) + 1;
    }

    // Por TAG/equip
    const equip = o.tag || o.equipamento || o.maquina;
    if (equip) {
      const k = String(equip).trim();
      byEquip[k] = (byEquip[k] || 0) + 1;
    }

    // Por mecânico (primeiro nome)
    const mec = o.mecanico || o.mecanico_responsavel || o.responsavel;
    if (mec) {
      const nm = String(mec).trim().split(' ')[0];
      byMec[nm] = (byMec[nm] || 0) + 1;
    }
  });

  UIModule.renderBarChart('dash-chart-tipo', byTipo, { maxItems: 5 });
  UIModule.renderBarChart('dash-chart-equip', byEquip, { maxItems: 6 });
  UIModule.renderBarChart('dash-chart-mec', byMec, { maxItems: 6 });
};

// ── PATCH renderDash ──

(function() {
  var _orig = window.renderDash;
  if (typeof _orig === 'function') {
    window.renderDash = function() {
      _orig.apply(this, arguments);
      const atualizada = (typeof os_list !== 'undefined' ? os_list : window.os_list) || [];
      try { 
        UIModule.renderDashCharts(atualizada); 
      } catch(e) {
        console.error('Erro ao renderizar gráficos no patch renderDash:', e);
      }
    };
  }
})();

// ── INIT ──

document.addEventListener('DOMContentLoaded', function() {
  var attempts = 0;
  var lastSignature = '';
  
  var chartPoll = setInterval(function() {
    attempts++;
    try {
      var listaAtiva = (typeof os_list !== 'undefined' ? os_list : window.os_list) || [];
      
      // Assinatura determinística com ordenação para evitar re-render falso por ordem
      var signature = JSON.stringify(
        [...listaAtiva]
          .map(o => ({
            id: o.id || o.id_os || '',
            tipo: o.tipo || o.tipo_os || o.categoria || '',
            equip: o.tag || o.equipamento || o.maquina || '',
            mec: o.mecanico || o.mecanico_responsavel || o.responsavel || ''
          }))
          .sort((a, b) => String(a.id).localeCompare(String(b.id)))
      );

      // Renderiza se a assinatura mudar (inclusive quando zera a lista)
      if (signature !== lastSignature) {
        lastSignature = signature;
        UIModule.renderDashCharts(listaAtiva);
      }
    } catch(e) {
      console.error('Erro no polling dos gráficos:', e);
    }
    
    // Encerra o polling longo
    if (attempts >= 40) clearInterval(chartPoll);
  }, 1000);
});
