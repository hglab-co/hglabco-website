-- ============================================================
-- Borrar datos de prueba · Challenge de Innovación con IA
--
-- POR QUÉ AQUÍ Y NO DESDE EL SITIO:
-- El schema define políticas de insert, select y update, pero ninguna de
-- delete. Con la anon key la API responde 204 (éxito) y NO borra nada:
-- RLS filtra las filas en silencio. El SQL Editor corre con un rol
-- privilegiado que sí puede borrar.
--
-- Cómo usarlo: Supabase -> SQL Editor -> New query -> pegar -> Run.
-- ============================================================


-- PASO 1 · Ver qué hay antes de borrar (no borra nada).
select id, team_name, area, contact_email, created_at
from ideas
order by created_at;


-- PASO 2 · Borrar solo las postulaciones de prueba.
--          Las calificaciones asociadas se van solas por el
--          "on delete cascade" de la tabla scores.
delete from ideas
where team_name in ('ZZZ PRUEBA E2E - BORRAR', 'Prueba Hugo');


-- PASO 3 · Confirmar que quedó limpio (debe devolver 0 filas).
select count(*) as ideas_restantes from ideas;
select count(*) as calificaciones_restantes from scores;


-- ============================================================
-- OPCIÓN NUCLEAR · Dejar todo en cero antes del lanzamiento real.
--
-- Descomenta SOLO si quieres borrar TODAS las postulaciones y TODAS las
-- calificaciones, no únicamente las de prueba. No se puede deshacer.
-- ============================================================

-- delete from scores;
-- delete from ideas;
