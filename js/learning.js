import { getWordsArrayByUnit } from './supabase.js';

import { shuffle } from './utils.js';

import { state } from './state.js';

import {
    container,
    units,
    chooseLan,
    upperBlock,
    lowerBlock,
    upperBlockText,
    lowerBlockText,
} from './ui/learning-ui.js';


export function showNextWord() {
    if (state.currentWordIndex >= state.words.length) {
        finishLearning();
        return;
    }

    const word = state.words[state.currentWordIndex];

    upperBlockText.textContent = word[state.firstWordIndex];
    lowerBlockText.textContent = word[state.secondWordIndex];

    lowerBlockText.style.opacity = 0;

    state.answerVisible = false;
}

export function nextWord() {
    state.currentWordIndex++;

    showNextWord();
}


export function showAnswer() {
    lowerBlockText.style.opacity = 1;
    state.answerVisible = true;
}


export function finishLearning() {
    upperBlockText.textContent = 'The end';
    lowerBlockText.textContent = '';

    state.answerVisible = false;
}


export function startLearning(firstWordIndex, secondWordIndex) {
    state.firstWordIndex = firstWordIndex;
    state.secondWordIndex = secondWordIndex;

    state.currentWordIndex = 0;

    setTextSize(firstWordIndex);

    chooseLan.style.display = 'none';

    upperBlock.style.display = 'flex';
    lowerBlock.style.display = 'flex';

    showNextWord();
}


function setTextSize(firstWordIndex) {
    upperBlockText.classList.remove('text-large', 'text-small');
    lowerBlockText.classList.remove('text-large', 'text-small');

    if (firstWordIndex === 0) {
        // Українська зверху
        upperBlockText.classList.add('text-large');
        lowerBlockText.classList.add('text-small');
    } else {
        // Англійська зверху
        upperBlockText.classList.add('text-small');
        lowerBlockText.classList.add('text-large');
    }
}


export async function openUnit(unitId) {

    const words = await getWordsArrayByUnit(unitId);

    if (words.length === 0) {
        alert('Не вдалося завантажити слова.');
        return;
    }

    state.words = shuffle(words);
    state.currentWordIndex = 0;

    units.style.display = 'none';
    chooseLan.style.display = 'flex';
    container.style.height = '100dvh';
}


export function handleEnter() {
    if (state.answerVisible) {
        nextWord();
    } else {
        showAnswer();
    }
}


export function handlePointerUp(isUpperBlock) {
    if (isUpperBlock) {
        if (!state.answerVisible) {
            showAnswer();
        }
    } else {
        if (state.answerVisible) {
            nextWord();
        }
    }
}