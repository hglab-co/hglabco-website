document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ideaForm");
  const alertBox = document.getElementById("alertBox");
  const submitBtn = document.getElementById("submitBtn");

  function showAlert(type, message) {
    alertBox.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const client = getSupabaseClient();
    if (!client) {
      showAlert("error", "El sitio aún no está conectado a la base de datos. Revisa assets/js/config.js.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    const payload = {
      team_name: document.getElementById("team_name").value.trim(),
      members: document.getElementById("members").value.trim(),
      contact_email: document.getElementById("contact_email").value.trim(),
      area: document.getElementById("area").value,
      problem: document.getElementById("problem").value.trim(),
      solution_type: document.getElementById("solution_type").value,
      expected_metric: document.getElementById("expected_metric").value.trim(),
      baseline_value: document.getElementById("baseline_value").value.trim(),
    };

    const { error } = await client.from("ideas").insert([payload]);

    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar postulación";

    if (error) {
      console.error(error);
      showAlert("error", "Hubo un error al enviar tu postulación: " + error.message);
      return;
    }

    showAlert("success", "¡Listo! Tu idea fue postulada con éxito. Nos vemos en la etapa de construcción 🚀");
    form.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
