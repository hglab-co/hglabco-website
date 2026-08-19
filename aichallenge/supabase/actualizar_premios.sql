-- ============================================================
-- Actualización de premios · Challenge de Innovación con IA
--
-- El fondo pasó de Q1,500 a Q1,600 (Q800 / Q500 / Q300). Los montos
-- están escritos dentro de la vista idea_rankings, así que cambiar
-- schema.sql NO basta: hay que reemplazar la vista en la base ya creada.
--
-- Cómo usarlo: Supabase -> SQL Editor -> New query -> pegar todo -> Run.
-- Es seguro correrlo aunque ya existan ideas y calificaciones: solo
-- redefine la vista, no toca las tablas ni borra datos.
-- ============================================================

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
    when rank() over (order by avg(s.weighted_total) desc nulls last) = 1 then 'Q 800.00'
    when rank() over (order by avg(s.weighted_total) desc nulls last) = 2 then 'Q 500.00'
    when rank() over (order by avg(s.weighted_total) desc nulls last) = 3 then 'Q 300.00'
    else '-'
  end as premio
from ideas i
left join scores s on s.idea_id = i.id
group by i.id, i.team_name, i.area, i.members
order by avg_score desc nulls last;

-- Verificación rápida: debe mostrar Q 800.00 en el primer lugar.
select team_name, num_scores, avg_score, position, premio
from idea_rankings
order by position;
