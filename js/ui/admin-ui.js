export const unitTitleInput = document.getElementById('unit_title_input');

export const createUnitBtn = document.getElementById('create_unit_btn');

export const unitSelect = document.getElementById('unit_select');

export const ukrainianInput = document.getElementById('ukrainian_input');

export const englishInput = document.getElementById('english_input');

export const addWordBtn = document.getElementById('add_word_btn');

export const wordsList = document.getElementById('words_list');

export const cancelEditBtn = document.getElementById('cancel_edit_btn');


export function setUpdateWordMode() {

    addWordBtn.textContent = 'Update Word';

    cancelEditBtn.hidden = false;
}


export function setAddWordMode() {

    addWordBtn.textContent = 'Add Word';

    cancelEditBtn.hidden = true;
}


