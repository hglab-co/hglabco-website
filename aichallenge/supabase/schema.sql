-- ============================================================
-- Challenge de Innovación con IA · Qpaypro
-- Script de base de datos para Supabase (Postgres)
--
-- Cómo usarlo:
-- 1. Crea un proyecto gratis en https://supabase.com
-- 2. Ve a "SQL Editor" -> "New query"
-- 3. Copia y pega TODO este archivo, y dale "Run"
-- 4. Ve a "Project settings" -> "API" y copia:
--      - Project URL          -> pégalo en assets/js/config.js (SUPABASE_URL)
--      - anon public API key  -> pégalo en assets/js/config.js (SUPABASE_ANON_KEY)
-- ============================================================

-- Extensión necesaria para generar IDs únicos (uuid)
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Tabla: ideas  (postulaciones de cada equipo)
-- ------------------------------------------------------------
create table if not exists ideas (
  id uuid primary key default gen_random_uuid(),
  team_name text not null,
  members text not null,          -- nombres de los integrantes, separados por coma
  area text not null,             -- área de la empresa
  problem text not null,          -- problema que resuelven
  solution_type text not null,    -- tipo de solución de IA (chat, agente, tarea programada, etc.)
  expected_metric text,           -- qué métrica esperan mejorar
  baseline_value text,            -- valor actual ("línea base") de esa métrica
  contact_email text,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Tabla: scores  (calificación de cada jurado por cada idea)
-- ------------------------------------------------------------
create table if not exists scores (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references ideas(id) on delete cascade,
  juror_name text not null,
  score_agentic int not null check (score_agentic between 1 and 5),      -- uso agéntico de la IA (25%)
  score_efficiency int not null check (score_efficiency between 1 and 5), -- eficiencia / ahorro de tiempo (25%)
  score_risk int not null check (score_risk between 1 and 5),             -- reducción de riesgos (15%)
  score_productivity int not null check (score_productivity between 1 and 5), -- productividad y escalabilidad (15%)
  score_evidence int not null check (score_evidence between 1 and 5),    -- evidencia y resultados medibles (10%)
  score_clarity int not null check (score_clarity between 1 and 5),      -- claridad de la presentación (10%)
  weighted_total numeric generated always as (
    round(
      (score_agentic * 0.25
       + score_efficiency * 0.25
       + score_risk * 0.15
       + score_productivity * 0.15
       + score_evidence * 0.10
       + score_clarity * 0.10) * 20
    , 1)
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (idea_id, juror_name)   -- cada jurado califica una sola vez por idea (puede actualizar su nota)
);

-- ------------------------------------------------------------
-- Vista: idea_rankings  (promedio de todos los jurados por idea, con posición y premio)
-- ------------------------------------------------------------
create or replace view idea_rankings as
select
  i.id,
  i.team_name,
  i.area,
  i.members,
  count(s.id) as num_scores,
  round(avg(s.weighted_total), 1) as avg_score,
  rank() over (order by avg(s.weighted_total) desc nulls last) as position,
  case
    when count(s.id) = 0 then null
    when rank() over (order by avg(s.weighted_total) desc nulls last) = 1 then 'Q 750.00'
    when rank() over (order by avg(s.weighted_total) desc nulls last) = 2 then 'Q 450.00'
    when rank() over (order by avg(s.weighted_total) desc nulls last) = 3 then 'Q 300.00'
    else '-'
  end as premio
from ideas i
left join scores s on s.idea_id = i.id
group by i.id, i.team_name, i.area, i.members
order by avg_score desc nulls last;

-- ------------------------------------------------------------
-- Seguridad (RLS)
-- ------------------------------------------------------------
-- Nota importante: este proyecto usa una CLAVE COMPARTIDA simple a nivel de
-- interfaz (no un login individual por jurado). Por eso las políticas de
-- abajo permiten lectura/escritura con la llave pública "anon" de Supabase.
-- Esto es apropiado para un challenge interno de bajo riesgo, pero recuerda:
-- cualquiera que tenga tu URL y tu anon key podría leer/escribir estas tablas
-- directamente vía la API, sin pasar por la clave de la interfaz. Si más
-- adelante quieres más seguridad, migra a Supabase Auth con login individual.

alter table ideas enable row level security;
alter table scores enable row level security;

create policy "Cualquiera puede postular su idea"
  on ideas for insert
  with check (true);

create policy "Cualquiera puede ver las ideas"
  on ideas for select
  using (true);

create policy "Cualquiera puede calificar (jurado con clave compartida)"
  on scores for insert
  with check (true);

create policy "Cualquiera puede actualizar su calificación"
  on scores for update
  using (true);

create policy "Cualquiera puede ver las calificaciones"
  on scores for select
  using (true);
