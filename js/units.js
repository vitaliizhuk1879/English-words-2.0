import { getUnits } from './supabase.js';
import { openUnit } from './learning.js';
import { units } from './ui/learning-ui.js';


export async function renderUnits() {
    const unitsData = await getUnits();

    units.innerHTML = '';

    for (const unit of unitsData) {
        const button = document.createElement('button');

        button.className = 'unit';
        button.textContent = unit.title;
        button.dataset.unit = unit.id;

        button.addEventListener('click', () => {
            openUnit(unit.id);
        });

        units.append(button);
    }
}

