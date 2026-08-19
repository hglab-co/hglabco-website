const CRITERIA = [
  { key: "score_agentic", label: "Uso agéntico de la IA", weight: 0.25 },
  { key: "score_efficiency", label: "Eficiencia / ahorro de tiempo", weight: 0.25 },
  { key: "score_risk", label: "Reducción de riesgos", weight: 0.15 },
  { key: "score_productivity", label: "Productividad y escalabilidad", weight: 0.15 },
  { key: "score_evidence", label: "Evidencia y resultados medibles", weight: 0.10 },
  { key: "score_clarity", label: "Claridad de la presentación", weight: 0.10 },
];

const SESSION_KEY = "qp_jury_ok";

document.addEventListener("DOMContentLoaded", () => {
  const gate = document.getElementById("gate");
  const dashboard = document.getElementById("dashboard");
  const gateBtn = document.getElementById("gateBtn");
  const gateAlert = document.getElementById("gateAlert");
  const passcodeInput = document.getElementById("passcode");
  const jurorSelect = document.getElementById("jurorSelect");

  const vistaListado = document.getElementById("vistaListado");
  const vistaCalificar = document.getElementById("vistaCalificar");
  const detalleProyecto = document.getElementById("detalleProyecto");
  const ideasBody = document.getElementById("ideasBody");
  const ideasAlert = document.getElementById("ideasAlert");
  const ideasResumen = document.getElementById("ideasResumen");
  const rankingBody = document.getElementById("rankingBody");

  // Estado en memoria: se recarga desde Supabase en cada cambio relevante.
  let ideas = [];
  let scoresByIdea = {};

  /* ---------- Acceso ---------- */
  function unlock() {
    gate.classList.add("hidden");
    dashboard.classList.remove("hidden");
    sessionStorage.setItem(SESSION_KEY, "1");
    populateJurorSelect();
    loadRanking();
    loadIdeas();
  }

  function checkPasscode() {
    if (passcodeInput.value === ADMIN_PASSCODE) {
      unlock();
    } else {
      gateAlert.innerHTML = '<div class="alert alert-error">Clave incorrecta. Intenta de nuevo.</div>';
    }
  }

  gateBtn.addEventListener("click", checkPasscode);
  passcodeInput.addEventListener("keydown", (e) => { if (e.key === "Enter") checkPasscode(); });
  if (sessionStorage.getItem(SESSION_KEY) === "1") unlock();

  function populateJurorSelect() {
    jurorSelect.innerHTML = JUROR_NAMES.map((n) => `<option value="${n}">${n}</option>`).join("");
    // Al cambiar de jurado se vuelve al listado: las notas mostradas son las suyas.
    jurorSelect.addEventListener("change", () => { mostrarListado(); loadIdeas(); });
  }

  const jurado = () => jurorSelect.value || JUROR_NAMES[0];

  /* ---------- Navegación entre vistas ---------- */
  function mostrarListado() {
    vistaCalificar.classList.add("hidden");
    vistaListado.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function mostrarCalificar(idea) {
    vistaListado.classList.add("hidden");
    vistaCalificar.classList.remove("hidden");
    detalleProyecto.innerHTML = "";
    detalleProyecto.appendChild(renderDetalle(idea, scoresByIdea[idea.id]));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.getElementById("volverBtn").addEventListener("click", mostrarListado);

  /* ---------- Carga de proyectos ---------- */
  async function loadIdeas() {
    const client = getSupabaseClient();
    if (!client) {
      ideasBody.innerHTML = '<tr><td colspan="4" class="muted">Conecta Supabase en assets/js/config.js para ver los proyectos.</td></tr>';
      return;
    }
    ideasBody.innerHTML = '<tr><td colspan="4" class="muted">Cargando proyectos…</td></tr>';

    const { data, error } = await client.from("ideas").select("*").order("created_at", { ascending: true });
    if (error) {
      ideasAlert.innerHTML = `<div class="alert alert-error">Error al cargar ideas: ${error.message}</div>`;
      ideasBody.innerHTML = "";
      return;
    }
    ideas = data || [];

    const { data: mis } = await client.from("scores").select("*").eq("juror_name", jurado());
    scoresByIdea = {};
    (mis || []).forEach((s) => { scoresByIdea[s.idea_id] = s; });

    renderLista();
  }

  function renderLista() {
    if (!ideas.length) {
      ideasBody.innerHTML = '<tr><td colspan="4" class="muted">Todavía no hay proyectos postulados.</td></tr>';
      ideasResumen.textContent = "";
      return;
    }
    const hechos = ideas.filter((i) => scoresByIdea[i.id]).length;
    ideasResumen.textContent = `${hechos} de ${ideas.length} calificados por ti`;

    ideasBody.innerHTML = ideas.map((idea) => {
      const yo = scoresByIdea[idea.id];
      return `
        <tr>
          <td>
            <div style="font-weight:700;color:var(--qp-principal);">${escapeHtml(idea.team_name)}</div>
            <div class="muted" style="font-size:12px;">${escapeHtml(idea.members)}</div>
          </td>
          <td>${escapeHtml(idea.area)}</td>
          <td>
            ${yo
              ? `<span class="badge acento">${yo.weighted_total} pts</span>`
              : '<span class="badge pendiente">Pendiente</span>'}
          </td>
          <td style="text-align:right;">
            <button class="btn ${yo ? "btn-outline" : "btn-secundario"} btn-sm" data-abrir="${idea.id}">
              ${yo ? "Ver / editar" : "Calificar"}
            </button>
          </td>
        </tr>`;
    }).join("");

    ideasBody.querySelectorAll("[data-abrir]").forEach((b) => {
      b.addEventListener("click", () => {
        const idea = ideas.find((i) => i.id === b.dataset.abrir);
        if (idea) mostrarCalificar(idea);
      });
    });
  }

  /* ---------- Detalle de un proyecto ---------- */
  function renderDetalle(idea, existing) {
    const wrapper = document.createElement("div");

    const dato = (etiqueta, valor) => valor
      ? `<p class="muted" style="margin-bottom:6px;"><b>${etiqueta}:</b> ${escapeHtml(valor)}</p>` : "";

    const sliders = CRITERIA.map((c) => {
      const val = existing ? existing[c.key] : 3;
      return `
        <div class="field">
          <label>${c.label} <span class="muted">(${Math.round(c.weight * 100)}%)</span></label>
          <div class="range-row">
            <input type="range" min="1" max="5" step="1" value="${val}" data-key="${c.key}" class="score-slider">
            <span class="range-value" data-out="${c.key}">${val}</span>
          </div>
        </div>`;
    }).join("");

    wrapper.innerHTML = `
      <div class="card" style="margin-bottom:22px;">
        <div class="flex-between">
          <div>
            <h2 class="section-title" style="margin-bottom:8px;">${escapeHtml(idea.team_name)}</h2>
            <span class="badge">${escapeHtml(idea.area)}</span>
            ${existing ? '<span class="badge acento" style="margin-left:6px;">Ya calificado por ti</span>' : ""}
          </div>
        </div>
        <hr style="border:none;border-top:1px solid var(--qp-gray-light);margin:18px 0;">
        ${dato("Integrantes", idea.members)}
        ${dato("Problema que resuelven", idea.problem)}
        ${dato("Tipo de solución", idea.solution_type)}
        ${dato("Métrica que esperan mejorar", idea.expected_metric)}
        ${dato("Línea base", idea.baseline_value)}
        ${dato("Contacto", idea.contact_email)}
      </div>

      <div class="card">
        <div class="flex-between" style="margin-bottom:20px;">
          <h3 style="margin:0;">Tu calificación</h3>
          <div class="text-center">
            <div class="muted" style="font-size:12px;">Puntaje</div>
            <div style="font-family:var(--qp-font-head);font-weight:800;font-size:30px;color:var(--qp-secundario);" data-out="total">—</div>
          </div>
        </div>
        <div class="grid-2">${sliders}</div>
        <div id="detalleAlert"></div>
        <button class="btn btn-secundario" data-guardar="${idea.id}">
          ${existing ? "Actualizar calificación" : "Guardar calificación"}
        </button>
      </div>`;

    // Vista previa del ponderado, con la misma fórmula que aplica la base de datos.
    const inputs = wrapper.querySelectorAll(".score-slider");
    const totalOut = wrapper.querySelector('[data-out="total"]');
    function recompute() {
      let total = 0;
      inputs.forEach((s) => {
        total += Number(s.value) * CRITERIA.find((c) => c.key === s.dataset.key).weight;
      });
      totalOut.textContent = (total * 20).toFixed(1);
    }
    inputs.forEach((s) => {
      s.addEventListener("input", () => {
        wrapper.querySelector(`[data-out="${s.dataset.key}"]`).textContent = s.value;
        recompute();
      });
    });
    recompute();

    wrapper.querySelector("[data-guardar]").addEventListener("click", (e) => saveScore(idea.id, wrapper, e.target));
    return wrapper;
  }

  /* ---------- Guardar ---------- */
  async function saveScore(ideaId, wrapper, btn) {
    const client = getSupabaseClient();
    if (!client) return;
    const alertBox = wrapper.querySelector("#detalleAlert");
    const payload = { idea_id: ideaId, juror_name: jurado() };
    wrapper.querySelectorAll(".score-slider").forEach((s) => { payload[s.dataset.key] = Number(s.value); });

    btn.disabled = true;
    const textoOriginal = btn.textContent;
    btn.textContent = "Guardando…";

    const { error } = await client.from("scores").upsert([payload], { onConflict: "idea_id,juror_name" });

    btn.disabled = false;
    btn.textContent = textoOriginal;

    if (error) {
      alertBox.innerHTML = `<div class="alert alert-error">Error al guardar: ${error.message}</div>`;
      return;
    }
    alertBox.innerHTML = '<div class="alert alert-success">Calificación guardada ✅ Volviendo al listado…</div>';
    await loadRanking();
    await loadIdeas();
    setTimeout(mostrarListado, 900);
  }

  /* ---------- Ranking ---------- */
  async function loadRanking() {
    const client = getSupabaseClient();
    if (!client) {
      rankingBody.innerHTML = '<tr><td colspan="6" class="muted">Conecta Supabase para ver el ranking aquí.</td></tr>';
      return;
    }
    const { data, error } = await client.from("idea_rankings").select("*")
      .order("avg_score", { ascending: false, nullsFirst: false });
    if (error) {
      rankingBody.innerHTML = `<tr><td colspan="6">Error: ${error.message}</td></tr>`;
      return;
    }
    if (!data || !data.length) {
      rankingBody.innerHTML = '<tr><td colspan="6" class="muted">Sin datos todavía.</td></tr>';
      return;
    }
    rankingBody.innerHTML = data.map((row, i) => `
      <tr class="${row.position === 1 ? "rank-1" : ""}">
        <td>${row.position ?? i + 1}</td>
        <td>${escapeHtml(row.team_name)}</td>
        <td>${escapeHtml(row.area)}</td>
        <td>${row.num_scores}</td>
        <td>${row.avg_score ?? "—"}</td>
        <td>${row.premio ?? "-"}</td>
      </tr>`).join("");
  }

  document.getElementById("refreshRanking").addEventListener("click", loadRanking);

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str ?? "";
    return div.innerHTML;
  }
});
