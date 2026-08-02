import { supabaseClient } from './supabase.js';

export async function refreshCache() {

    const { data: units, error: unitsError } = await supabaseClient
        .from('units')
        .select('*')
        .order('order_number');

    if (unitsError) {
        throw unitsError;
    }

    localStorage.setItem('units', JSON.stringify(units));

    let allWords = [];
    let from = 0;
    const pageSize = 1000;

    while (true) {

        const { data, error } = await supabaseClient
            .from('words')
            .select('*')
            .order('unit_id')
            .order('id')
            .range(from, from + pageSize - 1);

        if (error) {
            throw error;
        }

        allWords.push(...data);

        if (data.length < pageSize) {
            break;
        }

        from += pageSize;
    }

    // Видаляємо старий кеш слів
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('words_')) {
            localStorage.removeItem(key);
        }
    });

    const groupedWords = {};

    for (const word of allWords) {

        if (!groupedWords[word.unit_id]) {
            groupedWords[word.unit_id] = [];
        }

        groupedWords[word.unit_id].push(word);

    }

    for (const unit of units) {

        localStorage.setItem(
            `words_${unit.id}`,
            JSON.stringify(groupedWords[unit.id] || [])
        );

    }
}

export async function initializeCache() {

    const hasCache = localStorage.getItem('units');

    // Перший запуск
    if (!hasCache) {

        console.log('No cache. Downloading...');

        await refreshCache();

        return;
    }

    console.log('Cache found.');

    // Фонове оновлення кешу
    refreshCache()
        .then(() => {
            console.log('Cache updated.');
        })
        .catch(() => {
            console.log('Offline. Using local cache.');
        });

}