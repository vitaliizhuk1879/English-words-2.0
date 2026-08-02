import { renderUnits, } from './units.js';
import {
    startLearning,
    handleEnter,
    handlePointerUp,
} from './learning.js';

import {
    upperBlock,
    lowerBlock,
    chooseLanBtnUa,
    chooseLanBtnEn,
} from './ui/learning-ui.js';

import { initializeCache } from './cache.js';



chooseLanBtnUa.addEventListener('click', () => {
    startLearning(0, 1);
});

chooseLanBtnEn.addEventListener('click', () => {
    startLearning(1, 0);
});


document.addEventListener('keyup', event => {
    if (event.code === 'Enter') {
        handleEnter();
    }
});

upperBlock.addEventListener('pointerup', () => {
    handlePointerUp(true);
});

lowerBlock.addEventListener('pointerup', () => {
    handlePointerUp(false);
});


async function init() {

    await initializeCache();

    await renderUnits();

    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./service-worker.js');
        } catch (error) {
            console.error(error);
        }
    }

}

init();


