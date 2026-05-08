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
    const { data, error } = await sb.from('fichas').select('consecutivo').order('created_at', { ascending: false }).limit(1);
    if (error) throw error;
    return (data && data.length > 0) ? parseInt(data[0].consecutivo) + 1 : 1;
};

export const fetchStylists = async () => {
    const { data, error } = await sb.from('estilistas').select('id, nombre').order('nombre');
    if (error) throw error;
    return data;
};

export const fetchHistory = async () => {
    const { data, error } = await sb.from('fichas').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
};

export const getFichaByConsecutivo = async (consecutivo) => {
    const { data, error } = await sb.from('fichas').select('*').eq('consecutivo', consecutivo).single();
    if (error) throw error;
    return data;
};

export const getLastFichaByDoc = async (docNumber) => {
    const { data, error } = await sb.from('fichas').select('*').eq('numero_documento', docNumber).order('created_at', { ascending: false }).limit(1);
    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
};

export const deleteFichaDb = async (consecutivo) => {
    const { error } = await sb.from('fichas').delete().eq('consecutivo', consecutivo);
    if (error) throw error;
};

export const deleteStylistDb = async (id) => {
    const { error } = await sb.from('estilistas').delete().eq('id', id);
    if (error) throw error;
};

export const addStylistDb = async (nombre) => {
    const { error } = await sb.from('estilistas').insert([{ nombre }]);
    if (error) throw error;
};
