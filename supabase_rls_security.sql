-- =========================================================================
-- CONFIGURACIÓN DE SEGURIDAD (RLS) PARA JULIEFICHA V5
-- Ejecutar en el SQL Editor de Supabase
-- =========================================================================

-- 1. Habilitar RLS en la tabla 'fichas'
ALTER TABLE fichas ENABLE ROW LEVEL SECURITY;

-- 2. Eliminar políticas existentes (si las hay) para evitar conflictos
DROP POLICY IF EXISTS "Permitir INSERT público en fichas" ON fichas;
DROP POLICY IF EXISTS "Permitir SELECT anónimo en fichas" ON fichas;
DROP POLICY IF EXISTS "Permitir SELECT autenticado en fichas" ON fichas;

-- 3. Crear política para permitir INSERT público (anon)
-- Cualquier persona (incluso sin login de Supabase) puede crear una ficha
CREATE POLICY "Permitir INSERT público en fichas"
ON fichas FOR INSERT
TO public
WITH CHECK (true);

-- 4. Crear política para permitir SELECT (lectura)
-- Solo lectura pública temporal. Lo ideal sería usar 'authenticated'
-- si los administradores iniciaran sesión mediante Auth de Supabase.
-- Como el login es simulado en JS, permitimos lectura pública.
CREATE POLICY "Permitir SELECT público en fichas"
ON fichas FOR SELECT
TO public
USING (true);

-- No creamos políticas para UPDATE o DELETE para el rol anon/public.
-- Esto protege los datos contra modificaciones o borrados anónimos no autorizados.

-- =========================================================================
-- CONFIGURACIÓN DEL BUCKET DE EVIDENCIA
-- =========================================================================

-- 1. Crear el bucket si no existe (ya debe existir, pero por si acaso)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('evidencia', 'evidencia', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Habilitar RLS en la tabla objects de storage (si no está habilitada)
-- Generalmente esto ya está habilitado por defecto, pero se incluye por completitud.

-- 3. Políticas para el bucket 'evidencia'
DROP POLICY IF EXISTS "Permitir subida pública a evidencia" ON storage.objects;
DROP POLICY IF EXISTS "Permitir lectura pública de evidencia" ON storage.objects;

-- Permitir a usuarios anónimos subir archivos al bucket 'evidencia'
CREATE POLICY "Permitir subida pública a evidencia"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'evidencia');

-- Permitir que las imágenes subidas sean legibles públicamente
-- (Necesario para poder mostrarlas en el historial y en el PDF)
CREATE POLICY "Permitir lectura pública de evidencia"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'evidencia');

-- No permitir UPDATE ni DELETE públicos en el bucket.
