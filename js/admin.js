import {
    unitTitleInput,
    createUnitBtn,
    setAddUnitMode,
    setUpdateUnitMode,
    cancelUnitEditBtn,
    unitSelect,
    ukrainianInput,
    englishInput,
    addWordBtn,
    cancelEditBtn,
    setAddWordMode,
    setUpdateWordMode,
} from './ui/admin-ui.js';

import {
    addUnit,
    addWord,
    getWordsByUnit,
    deleteWord,
    deleteUnit,
    updateUnit,
    updateWord,
} from './supabase.js';

import {
    renderUnitsSelect,
    renderAdminUnits,
} from './admin-units.js';

import { refreshCache } from './cache.js';
import { renderWords } from './words.js';



let editingWordId = null;
let editingUnitId = null;


async function handleCreateUnit() {

    const title = unitTitleInput.value.trim();

    if (!title) {
        return;
    }

    let result;

    if (editingUnitId) {

        result = await updateUnit(
            editingUnitId,
            title
        );

    } else {

        result = await addUnit(title);

    }

    if (result.error) {

        if (result.error.code === '23505') {
            alert('Такий unit вже існує');
        } else {
            alert('Сталася помилка');
            console.error(result.error);
        }

        return;
    }

    await refreshCache();

    await renderUnitsSelect();
    await loadWords();
    await renderAdminUnits(
        handleDeleteUnit,
        handleEditUnit
    );

    editingUnitId = null;

    setAddUnitMode();
}

createUnitBtn.addEventListener('click', handleCreateUnit);

unitTitleInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        handleCreateUnit();
    }
});


async function handleAddWord() {

    const unitId = Number(unitSelect.value);

    const ukrainian = ukrainianInput.value.trim().toLowerCase();
    const english = englishInput.value.trim().toLowerCase();


    if (!ukrainian || !english) {
        alert('Fill in all fields');
        return;
    }


    let result;


    if (editingWordId) {

        result = await updateWord(
            editingWordId,
            ukrainian,
            english
        );

    } else {

        result = await addWord(
            unitId,
            ukrainian,
            english
        );

    }


    if (result.error) {

        if (result.error.code === '23505') {
            alert('This word already exists in this unit.');
        } else {
            alert('Something went wrong.');
            console.error(result.error);
        }

        return;
    }


    ukrainianInput.value = '';
    englishInput.value = '';

    editingWordId = null;

    setAddWordMode();

    ukrainianInput.focus();

    await refreshCache();
    await loadWords();
}


export async function loadWords() {
    const unitId = Number(unitSelect.value);

    const words = await getWordsByUnit(unitId);

    renderWords(
        words,
        handleDeleteWord,
        handleEditWord
    );
}


unitSelect.addEventListener('change', () => {
    loadWords();
});


addWordBtn.addEventListener('click', handleAddWord);

cancelEditBtn.addEventListener('click', handleCancelEdit);

cancelUnitEditBtn.addEventListener(
    'click',
    handleCancelUnitEdit
);

ukrainianInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        handleAddWord();
    }
});

englishInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        handleAddWord();
    }
});


function handleEditUnit(unit) {

    editingUnitId = unit.id;

    unitTitleInput.value = unit.title;

    setUpdateUnitMode();

}


function handleCancelUnitEdit() {

    editingUnitId = null;

    setAddUnitMode();

}


function handleEditWord(word) {

    editingWordId = word.id;

    ukrainianInput.value = word.ukrainian;
    englishInput.value = word.english;

    setUpdateWordMode();

    ukrainianInput.focus();
}


function handleCancelEdit() {

    editingWordId = null;

    ukrainianInput.value = '';
    englishInput.value = '';

    setAddWordMode();

    ukrainianInput.focus();
}


async function handleDeleteWord(word) {

    const confirmed = confirm(`Delete "${word.english}"?`);

    if (!confirmed) {
        return;
    }

    const result = await deleteWord(word.id);

    if (result.error) {
        alert('Something went wrong.');
        console.error(result.error);
        return;
    }

    await refreshCache();

    await loadWords();
}


async function handleDeleteUnit(unit) {

    const confirmed = confirm(`Delete "${unit.title}"?`);

    if (!confirmed) {
        return;
    }

    const result = await deleteUnit(unit.id);

    if (result.error) {
        console.error(result.error);
        alert('Something went wrong');
        return;
    }

    await refreshCache();

    await renderAdminUnits(
        handleDeleteUnit,
        handleEditUnit
    );
    await renderUnitsSelect();
    await loadWords();
}


export async function initAdmin() {

    await renderUnitsSelect();

    await renderAdminUnits(
        handleDeleteUnit,
        handleEditUnit
    );

    await loadWords();

}