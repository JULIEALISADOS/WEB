import { SB_URL, SB_KEY } from './config.js';

let sb;
try {
    if (typeof window.supabase !== 'undefined') {
        sb = window.supabase.createClient(SB_URL, SB_KEY);
    } else {
        console.error('Supabase Library not loaded');
    }
} catch (e) {
    console.error('❌ Error Inicializando Supabase:', e.message);
}

export const getDb = () => sb;

export const uploadImg = async (file, prefix, consecutivo) => {
    if (!file) return 'sin-foto';
    const ext = file.name.split('.').pop();
    const fileName = prefix + '_' + consecutivo + '_' + Date.now() + '.' + ext;
    const { data, error } = await sb.storage.from('evidencia').upload(fileName, file);
    if (error) throw new Error('Error al subir imagen: ' + error.message);
    const { data: publicUrlData } = sb.storage.from('evidencia').getPublicUrl(fileName);
    return publicUrlData.publicUrl;
};

export const insertFicha = async (cleanData) => {
    const { error } = await sb.from('fichas').insert([cleanData]);
    if (error) throw error;
};

export const fetchNextID = async () => {
    const { data, error } = await sb.rpc('get_next_folio_id');
    if (error) throw error;
    return data;
};

export const fetchStylists = async () => {
    // Retornar solo nombres públicamente
    const { data, error } = await sb.rpc('get_stylist_names');
    if (error) throw error;
    return data;
};

export const fetchStylistsSecure = async (adminPasscode) => {
    const { data, error } = await sb.rpc('get_stylists_secure', { passcode: adminPasscode });
    if (error) throw error;
    return data;
};

export const loginUserSecure = async (userId, passcode) => {
    const { data, error } = await sb.rpc('login_user_rpc', { user_id: userId, passcode: passcode });
    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
};

export const verifyAdminPasswordSecure = async (passcode) => {
    const { data, error } = await sb.rpc('verify_admin_password_rpc', { passcode: passcode });
    if (error) throw error;
    return data;
};

export const fetchHistory = async (passcode) => {
    const { data, error } = await sb.rpc('fetch_history_secure', { passcode: passcode });
    if (error) throw error;
    return data;
};

export const getFichaByConsecutivo = async (consecutivo, passcode) => {
    const { data, error } = await sb.rpc('get_ficha_by_consecutivo_secure', { consec_num: consecutivo, passcode: passcode });
    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
};

export const getLastFichaByDoc = async (docNumber, passcode) => {
    const { data, error } = await sb.rpc('get_last_ficha_by_doc_secure', { doc_num: docNumber, passcode: passcode });
    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
};

export const deleteFichaDb = async (consecutivo, adminPasscode) => {
    const { data, error } = await sb.rpc('delete_ficha_secure', { consec_num: consecutivo, admin_passcode: adminPasscode });
    if (error) throw error;
    return data;
};

export const deleteStylistDb = async (id, adminPasscode) => {
    const { data, error } = await sb.rpc('delete_stylist_secure', { stylist_id: id, admin_passcode: adminPasscode });
    if (error) throw error;
    return data;
};

export const addStylistDb = async (stylistData, adminPasscode) => {
    const { data, error } = await sb.rpc('add_stylist_secure', {
        stylist_nombre: stylistData.nombre,
        stylist_telefono: stylistData.telefono,
        stylist_email: stylistData.email,
        stylist_password: stylistData.password,
        admin_passcode: adminPasscode
    });
    if (error) throw error;
    return data;
};

export const updateStylistPassword = async (name, oldPass, newPass) => {
    const { data, error } = await sb.rpc('update_stylist_password_secure', {
        stylist_name: name,
        old_pass: oldPass,
        new_pass: newPass
    });
    if (error) throw error;
    return data;
};
