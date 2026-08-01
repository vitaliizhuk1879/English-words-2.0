const SUPABASE_URL = 'https://wgymmfrqodstkfduthlf.supabase.co'
const SUPABASE_KEY = 'sb_publishable_DOQWNsn8gnh4hSO6_nCNgg_yURxHQxT'

export const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// Units
export async function getUnits() {
    const { data, error } = await supabaseClient
        .from('units')
        .select('*')
        .order('order_number');

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}


export async function addUnit(title) {
    const units = await getUnits();

    const { data, error } = await supabaseClient
        .from('units')
        .insert({
            title,
            order_number: units.length + 1,
        })
        .select()
        .single();

    return {
        data,
        error,
    };
}



export async function deleteUnit(id) {

    const { data, error } = await supabaseClient
        .from('units')
        .delete()
        .eq('id', id);

    return {
        data,
        error,
    };
}


// Words
export async function getWordsByUnit(unitId) {
    const { data, error } = await supabaseClient
        .from('words')
        .select('*')
        .eq('unit_id', unitId)
        .order('id')


    if (error) {
        console.error(error)
        return []
    }

    return data
}


export async function getWordsArrayByUnit(unitId) {
    const words = await getWordsByUnit(unitId)

    return words.map(word => [
        word.ukrainian,
        word.english
    ])
}


export async function addWord(unitId, ukrainian, english) {
    const { data, error } = await supabaseClient
        .from('words')
        .insert({
            unit_id: unitId,
            ukrainian,
            english,
        })
        .select()
        .single();

    return {
        data,
        error,
    };
}


export async function deleteWord(wordId) {
    const { error } = await supabaseClient
        .from('words')
        .delete()
        .eq('id', wordId);

    return { error };
}


export async function updateWord(wordId, ukrainian, english) {

    const { data, error } = await supabaseClient
        .from('words')
        .update({
            ukrainian,
            english,
        })
        .eq('id', wordId)
        .select()
        .single();


    return {
        data,
        error,
    };
}
