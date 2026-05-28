-- =========================================================================
-- CONFIGURACIÓN DE SEGURIDAD ULTRA SEGURA (RLS + RPC) PARA JULIEFICHA V6
-- Ejecutar en el SQL Editor de Supabase (https://supabase.com)
-- =========================================================================

-- 1. HABILITAR ROW LEVEL SECURITY (RLS) EN LAS TABLAS CRÍTICAS
ALTER TABLE fichas ENABLE ROW LEVEL SECURITY;
ALTER TABLE estilistas ENABLE ROW LEVEL SECURITY;

-- 2. ELIMINAR POLÍTICAS DE ACCESO PÚBLICO ANTERIORES PARA BLOQUEAR FILTRACIONES
DROP POLICY IF EXISTS "Permitir SELECT público en fichas" ON fichas;
DROP POLICY IF EXISTS "Permitir SELECT anónimo en fichas" ON fichas;
DROP POLICY IF EXISTS "Permitir SELECT autenticado en fichas" ON fichas;
DROP POLICY IF EXISTS "Permitir INSERT público en fichas" ON fichas;
DROP POLICY IF EXISTS "Permitir SELECT público en estilistas" ON estilistas;
DROP POLICY IF EXISTS "Permitir SELECT anónimo en estilistas" ON estilistas;

-- 3. CREAR NUEVA POLÍTICA DE INSERCIÓN PARA FICHAS
-- Permite que los clientes o estilistas registren nuevas fichas de forma anónima.
CREATE POLICY "Permitir INSERT público en fichas"
ON fichas FOR INSERT
TO public
WITH CHECK (true);

-- NOTA: Al no haber políticas de SELECT, UPDATE o DELETE para el rol 'public',
-- Supabase bloqueará automáticamente cualquier consulta directa de lectura o edición
-- externa que use la clave API pública.

-- =========================================================================
-- API SEGURA (RPC) MEDIANTE FUNCIONES DE SERVIDOR (SECURITY DEFINER)
-- Estas funciones se ejecutan en el servidor con privilegios elevados (bypassing RLS),
-- pero verifican estrictamente la contraseña del usuario antes de retornar los datos.
-- =========================================================================

-- --- 1. FUNCIÓN PARA COMPROBAR CONTRASEÑA DE ADMINISTRADOR ---
CREATE OR REPLACE FUNCTION verify_admin_password_rpc(passcode text)
RETURNS boolean
SECURITY DEFINER
AS $$
BEGIN
    RETURN passcode IN ('JulieAdmin2024', 'Lisolaloca01', 'Lisolaloca01:', 'Polaresgay01:');
END;
$$ LANGUAGE plpgsql;

-- --- 2. LOGIN SEGURO DE ADMINISTRADORES Y ESTILISTAS ---
CREATE OR REPLACE FUNCTION login_user_rpc(user_id text, passcode text)
RETURNS TABLE (
    success boolean,
    role text,
    nombre text,
    email text,
    telefono text
)
SECURITY DEFINER
AS $$
DECLARE
    found_id uuid;
    found_nombre text;
    found_email text;
    found_telefono text;
BEGIN
    -- 1. Verificar si es Administrador Maestro
    IF (user_id IN ('80200013', 'julie', 'Julie andrea valencia del río') AND passcode IN ('Lisolaloca01', 'Lisolaloca01:', 'Polaresgay01:', 'JulieAdmin2024')) THEN
        RETURN QUERY SELECT true, 'admin'::text, 'Julie andrea valencia del río'::text, 'yulian.2804.jv@gmail.com'::text, '3150777443'::text;
        RETURN;
    END IF;

    -- 2. Buscar en la tabla de estilistas
    SELECT id, e.nombre, e.email, e.telefono 
    INTO found_id, found_nombre, found_email, found_telefono
    FROM estilistas e
    WHERE (LOWER(e.nombre) = LOWER(user_id) OR LOWER(e.email) = LOWER(user_id)) 
      AND e.password = passcode;

    IF found_id IS NOT NULL THEN
        -- Si es Julie en la tabla de estilistas, asignarle rol de admin
        IF LOWER(found_nombre) LIKE '%julie%' THEN
            RETURN QUERY SELECT true, 'admin'::text, found_nombre, found_email, found_telefono;
        ELSE
            RETURN QUERY SELECT true, 'stylist'::text, found_nombre, found_email, found_telefono;
        END IF;
    ELSE
        RETURN QUERY SELECT false, 'none'::text, ''::text, ''::text, ''::text;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- --- 3. LECTURA DE NOMBRES DE ESTILISTAS PARA DROPDOWN PÚBLICO ---
-- Expone únicamente el nombre y ID para que la PWA llene el menú, protegiendo claves, teléfonos y emails.
CREATE OR REPLACE FUNCTION get_stylist_names()
RETURNS TABLE (id uuid, nombre text)
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY SELECT e.id, e.nombre FROM estilistas e ORDER BY e.nombre;
END;
$$ LANGUAGE plpgsql;

-- --- 4. CÁLCULO DE SIGUIENTE FOLIO DE FORMA SEGURA ---
CREATE OR REPLACE FUNCTION get_next_folio_id()
RETURNS integer
SECURITY DEFINER
AS $$
DECLARE
    next_id integer;
BEGIN
    SELECT COALESCE(MAX(consecutivo::integer), 0) + 1 INTO next_id FROM fichas;
    RETURN next_id;
EXCEPTION WHEN OTHERS THEN
    SELECT COUNT(*)::integer + 1 INTO next_id FROM fichas;
    RETURN next_id;
END;
$$ LANGUAGE plpgsql;

-- --- 5. LECTURA DEL HISTORIAL COMPLETO DE CLIENTES (ADMIN ONLY) ---
CREATE OR REPLACE FUNCTION fetch_history_secure(passcode text)
RETURNS SETOF fichas
SECURITY DEFINER
AS $$
BEGIN
    IF passcode IN ('JulieAdmin2024', 'Lisolaloca01', 'Lisolaloca01:', 'Polaresgay01:') OR
       EXISTS (SELECT 1 FROM estilistas e WHERE LOWER(e.nombre) LIKE '%julie%' AND e.password = passcode) THEN
        RETURN QUERY SELECT * FROM fichas ORDER BY created_at DESC;
    ELSE
        RAISE EXCEPTION 'Acceso denegado: Credenciales de administrador incorrectas.';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- --- 6. LECTURA DE UNA FICHA TÉCNICA INDIVIDUAL (ADMIN O ESTILISTA AUTORIZADO) ---
CREATE OR REPLACE FUNCTION get_ficha_by_consecutivo_secure(consec_num text, passcode text)
RETURNS SETOF fichas
SECURITY DEFINER
AS $$
BEGIN
    IF passcode IN ('JulieAdmin2024', 'Lisolaloca01', 'Lisolaloca01:', 'Polaresgay01:') OR
       EXISTS (SELECT 1 FROM estilistas e WHERE e.password = passcode) THEN
        RETURN QUERY SELECT * FROM fichas WHERE consecutivo = consec_num LIMIT 1;
    ELSE
        RAISE EXCEPTION 'Acceso denegado: Credenciales incorrectas.';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- --- 7. CONSULTA DE ÚLTIMO PROCEDIMIENTO POR DOCUMENTO (COMPROBAR RECURRENCIA) ---
CREATE OR REPLACE FUNCTION get_last_ficha_by_doc_secure(doc_num text, passcode text)
RETURNS SETOF fichas
SECURITY DEFINER
AS $$
BEGIN
    IF passcode IN ('JulieAdmin2024', 'Lisolaloca01', 'Lisolaloca01:', 'Polaresgay01:') OR
       EXISTS (SELECT 1 FROM estilistas e WHERE e.password = passcode) THEN
        RETURN QUERY SELECT * FROM fichas WHERE numero_documento = doc_num ORDER BY created_at DESC LIMIT 1;
    ELSE
        RAISE EXCEPTION 'Acceso denegado: Credenciales incorrectas.';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- --- 8. LECTURA DE LISTA DE ESTILISTAS CON CONTRASENAS (ADMIN ONLY) ---
CREATE OR REPLACE FUNCTION get_stylists_secure(passcode text)
RETURNS TABLE (
    id uuid,
    nombre text,
    telefono text,
    email text,
    password text
)
SECURITY DEFINER
AS $$
BEGIN
    IF passcode IN ('JulieAdmin2024', 'Lisolaloca01', 'Lisolaloca01:', 'Polaresgay01:') OR
       EXISTS (SELECT 1 FROM estilistas e WHERE LOWER(e.nombre) LIKE '%julie%' AND e.password = passcode) THEN
        RETURN QUERY SELECT e.id, e.nombre, e.telefono, e.email, e.password FROM estilistas e ORDER BY e.nombre;
    ELSE
        RAISE EXCEPTION 'Acceso denegado: Credenciales de administrador incorrectas.';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- --- 9. AGREGAR ESTILISTA (ADMIN ONLY) ---
CREATE OR REPLACE FUNCTION add_stylist_secure(
    stylist_nombre text, 
    stylist_telefono text, 
    stylist_email text, 
    stylist_password text, 
    admin_passcode text
)
RETURNS boolean
SECURITY DEFINER
AS $$
BEGIN
    IF admin_passcode IN ('JulieAdmin2024', 'Lisolaloca01', 'Lisolaloca01:', 'Polaresgay01:') OR
       EXISTS (SELECT 1 FROM estilistas e WHERE LOWER(e.nombre) LIKE '%julie%' AND e.password = admin_passcode) THEN
        
        INSERT INTO estilistas (nombre, telefono, email, password)
        VALUES (stylist_nombre, stylist_telefono, stylist_email, stylist_password);
        RETURN true;
    ELSE
        RAISE EXCEPTION 'Acceso denegado: Credenciales de administrador incorrectas.';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- --- 10. ELIMINAR ESTILISTA (ADMIN ONLY) ---
CREATE OR REPLACE FUNCTION delete_stylist_secure(stylist_id uuid, admin_passcode text)
RETURNS boolean
SECURITY DEFINER
AS $$
BEGIN
    IF admin_passcode IN ('JulieAdmin2024', 'Lisolaloca01', 'Lisolaloca01:', 'Polaresgay01:') OR
       EXISTS (SELECT 1 FROM estilistas e WHERE LOWER(e.nombre) LIKE '%julie%' AND e.password = admin_passcode) THEN
        
        DELETE FROM estilistas WHERE id = stylist_id;
        RETURN true;
    ELSE
        RAISE EXCEPTION 'Acceso denegado: Credenciales de administrador incorrectas.';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- --- 11. CAMBIAR CONTRASEÑA DE ESTILISTA (SELF-SERVICE) ---
CREATE OR REPLACE FUNCTION update_stylist_password_secure(stylist_name text, old_pass text, new_pass text)
RETURNS boolean
SECURITY DEFINER
AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM estilistas e WHERE LOWER(e.nombre) = LOWER(stylist_name) AND e.password = old_pass) THEN
        UPDATE estilistas SET password = new_pass WHERE LOWER(nombre) = LOWER(stylist_name);
        RETURN true;
    ELSE
        RAISE EXCEPTION 'Acceso denegado: La contraseña actual es incorrecta.';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- --- 12. ELIMINAR FICHA TÉCNICA (ADMIN ONLY) ---
CREATE OR REPLACE FUNCTION delete_ficha_secure(consec_num text, admin_passcode text)
RETURNS boolean
SECURITY DEFINER
AS $$
BEGIN
    IF admin_passcode IN ('JulieAdmin2024', 'Lisolaloca01', 'Lisolaloca01:', 'Polaresgay01:') OR
       EXISTS (SELECT 1 FROM estilistas e WHERE LOWER(e.nombre) LIKE '%julie%' AND e.password = admin_passcode) THEN
        
        DELETE FROM fichas WHERE consecutivo = consec_num;
        RETURN true;
    ELSE
        RAISE EXCEPTION 'Acceso denegado: Credenciales de administrador incorrectas.';
    END IF;
END;
$$ LANGUAGE plpgsql;
