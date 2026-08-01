import { supabaseClient } from './supabase.js';


export async function refreshUnitsCache() {

    const { data, error } = await supabaseClient
        .from('units')
        .select('*')
        .order('order_number');

    if (error) {
        console.error(error);
        return;
    }

    localStorage.setItem('units', JSON.stringify(data));
}


export async function refreshWordsCache(unitId) {

    const { data, error } = await supabaseClient
        .from('words')
        .select('*')
        .eq('unit_id', unitId)
        .order('id');

    if (error) {
        console.error(error);
        return;
    }

    localStorage.setItem(
        `words_${unitId}`,
        JSON.stringify(data)
    );

    return data;
}


export async function initializeCache() {

    let cachedUnits = localStorage.getItem('units');

    if (!cachedUnits) {
        await refreshUnitsCache();
        cachedUnits = localStorage.getItem('units');
    }

    const units = JSON.parse(cachedUnits) || [];

    for (const unit of units) {

        const cacheKey = `words_${unit.id}`;

        if (!localStorage.getItem(cacheKey)) {
            await refreshWordsCache(unit.id);
        }
    }

    console.log('Cache initialized');
}