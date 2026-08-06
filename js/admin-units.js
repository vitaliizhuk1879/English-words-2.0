import { getUnits } from './supabase.js';
import { unitSelect } from './ui/admin-ui.js';
import { getCacheStatistics } from './stats.js';


export async function renderUnitsSelect() {

    const unitsData = await getUnits();

    unitSelect.innerHTML = '';


    for (const unit of unitsData) {

        const option = document.createElement('option');

        option.value = unit.id;
        option.textContent = unit.title;

        unitSelect.append(option);
    }

    const { unitsCount, wordsCount } = getCacheStatistics();

    const statisticsElement = document.getElementById('cache_statistics');

    statisticsElement.textContent =
        `(${unitsCount} units - ${wordsCount} words)`;
}



export async function renderAdminUnits(onDeleteUnit, onEditUnit) {

    const adminUnits = document.getElementById('admin_units');

    const unitsData = await getUnits();


    adminUnits.innerHTML = '';


    for (const unit of unitsData) {

        const row = document.createElement('div');

        const title = document.createElement('span');

        const deleteBtn = document.createElement('button');

        const actions = document.createElement('div');
        const editBtn = document.createElement('button');

        const words = JSON.parse(localStorage.getItem(`words_${unit.id}`) || '[]');

        const wordsCount = words.length;


        row.className = 'admin_unit_row';
        actions.className = 'word_actions';
        editBtn.className = 'edit_word_btn';

        title.textContent = `${unit.title} — ${wordsCount} words`;

        editBtn.innerHTML = `
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">

                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path>

            </svg>
        `;

        deleteBtn.innerHTML = `
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round">

                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>

            </svg>
        `;

        deleteBtn.className = 'delete_unit_btn';

        editBtn.addEventListener('click', () => {
            onEditUnit(unit);
        });

        deleteBtn.addEventListener('click', () => {
            onDeleteUnit(unit);
        });


        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        row.appendChild(title);
        row.appendChild(actions);


        adminUnits.appendChild(row);
    }
}
