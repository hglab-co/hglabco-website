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

  function unlock() {
    gate.classList.add("hidden");
    dashboard.classList.remove("hidden");
    sessionStorage.setItem(SESSION_KEY, "1");
    populateJurorSelect();
    loadIdeas();
    loadRanking();
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
    jurorSelect.addEventListener("change", loadIdeas);
  }

  async function loadIdeas() {
    const ideasAlert = document.getElementById("ideasAlert");
    const ideasList = document.getElementById("ideasList");
    const client = getSupabaseClient();
    if (!client) {
      ideasList.innerHTML = '<p class="muted">Conecta Supabase en assets/js/config.js para ver los proyectos postulados aquí.</p>';
      return;
    }
    ideasList.innerHTML = '<p class="muted">Cargando proyectos…</p>';

    const { data: ideas, error } = await client.from("ideas").select("*").order("created_at", { ascending: true });
    if (error) {
      ideasAlert.innerHTML = `<div class="alert alert-error">Error al cargar ideas: ${error.message}</div>`;
      return;
    }
    if (!ideas || ideas.length === 0) {
      ideasList.innerHTML = '<p class="muted">Todavía no hay ideas postuladas.</p>';
      return;
    }

    const juror = jurorSelect.value || JUROR_NAMES[0];
    const { data: myScores } = await client.from("scores").select("*").eq("juror_name", juror);
    const scoresByIdea = {};
    (myScores || []).forEach((s) => { scoresByIdea[s.idea_id] = s; });

    ideasList.innerHTML = "";
    ideas.forEach((idea) => ideasList.appendChild(renderIdeaCard(idea, scoresByIdea[idea.id])));
  }

  function renderIdeaCard(idea, existing) {
    const wrapper = document.createElement("div");
    wrapper.className = "card";
    wrapper.style.marginBottom = "18px";

    const slidersHtml = CRITERIA.map((c) => {
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
      <div class="flex-between">
        <div>
          <h3 style="margin-bottom:4px;">${escapeHtml(idea.team_name)}</h3>
          <span class="badge">${escapeHtml(idea.area)}</span>
          ${existing ? '<span class="badge lime" style="margin-left:6px;">Ya calificado por ti</span>' : ""}
        </div>
        <div class="text-center">
          <div class="muted" style="font-size:12px;">Puntaje estimado</div>
          <div style="font-family:var(--qp-font-head);font-weight:800;font-size:26px;color:var(--qp-teal-dark);" data-out="total">
            ${existing ? existing.weighted_total : "—"}
          </div>
        </div>
      </div>
      <p class="muted" style="margin-top:10px;"><b>Integrantes:</b> ${escapeHtml(idea.members)}</p>
      <p class="muted"><b>Problema:</b> ${escapeHtml(idea.problem)}</p>
      <p class="muted"><b>Tipo de solución:</b> ${escapeHtml(idea.solution_type)} ${idea.expected_metric ? `· <b>Métrica:</b> ${escapeHtml(idea.expected_metric)}` : ""}</p>
      <hr style="border:none;border-top:1px solid var(--qp-gray-light);margin:16px 0;">
      <div class="grid-2">${slidersHtml}</div>
      <div id="alert-${idea.id}"></div>
      <button class="btn btn-teal" data-save="${idea.id}">${existing ? "Actualizar calificación" : "Guardar calificación"}</button>
    `;

    // live weighted total preview
    const sliders = wrapper.querySelectorAll(".score-slider");
    const totalOut = wrapper.querySelector('[data-out="total"]');
    function recompute() {
      let total = 0;
      sliders.forEach((s) => {
        const w = CRITERIA.find((c) => c.key === s.dataset.key).weight;
        total += Number(s.value) * w;
      });
      totalOut.textContent = (total * 20).toFixed(1);
    }
    sliders.forEach((s) => {
      s.addEventListener("input", () => {
        wrapper.querySelector(`[data-out="${s.dataset.key}"]`).textContent = s.value;
        recompute();
      });
    });
    recompute();

    wrapper.querySelector("[data-save]").addEventListener("click", () => saveScore(idea.id, wrapper));
    return wrapper;
  }

  async function saveScore(ideaId, wrapper) {
    const client = getSupabaseClient();
    if (!client) return;
    const juror = jurorSelect.value || JUROR_NAMES[0];
    const alertBox = wrapper.querySelector(`#alert-${ideaId}`);
    const payload = { idea_id: ideaId, juror_name: juror };
    wrapper.querySelectorAll(".score-slider").forEach((s) => { payload[s.dataset.key] = Number(s.value); });

    const { error } = await client.from("scores").upsert([payload], { onConflict: "idea_id,juror_name" });
    if (error) {
      alertBox.innerHTML = `<div class="alert alert-error">Error al guardar: ${error.message}</div>`;
      return;
    }
    alertBox.innerHTML = '<div class="alert alert-success">Calificación guardada ✅</div>';
    loadRanking();
  }

  async function loadRanking() {
    const body = document.getElementById("rankingBody");
    const client = getSupabaseClient();
    if (!client) {
      body.innerHTML = '<tr><td colspan="6" class="muted">Conecta Supabase para ver el ranking aquí.</td></tr>';
      return;
    }
    const { data, error } = await client.from("idea_rankings").select("*").order("avg_score", { ascending: false, nullsFirst: false });
    if (error) {
      body.innerHTML = `<tr><td colspan="6">Error: ${error.message}</td></tr>`;
      return;
    }
    if (!data || data.length === 0) {
      body.innerHTML = '<tr><td colspan="6" class="muted">Sin datos todavía.</td></tr>';
      return;
    }
    body.innerHTML = data.map((row, i) => `
      <tr class="${row.position === 1 ? 'rank-1' : ''}">
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
