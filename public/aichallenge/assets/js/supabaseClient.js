// Cliente único de Supabase, reutilizado por todas las páginas.
// Requiere que config.js se haya cargado antes que este archivo.

let supabaseClient = null;

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  if (
    !SUPABASE_URL ||
    SUPABASE_URL.includes("PEGA_AQUI") ||
    !SUPABASE_ANON_KEY ||
    SUPABASE_ANON_KEY.includes("PEGA_AQUI")
  ) {
    showConfigWarning();
    return null;
  }

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return supabaseClient;
}

function showConfigWarning() {
  const banner = document.createElement("div");
  banner.style.cssText =
    "position:fixed;top:0;left:0;right:0;background:#B3261E;color:#fff;" +
    "padding:12px 20px;text-align:center;font-family:sans-serif;font-size:14px;z-index:9999;";
  banner.innerHTML =
    "⚠️ Falta configurar Supabase. Edita <code>assets/js/config.js</code> con tu URL y anon key. " +
    'Ver instrucciones en el <strong>README.md</strong>.';
  document.body.prepend(banner);
}
