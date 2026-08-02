import { getUnits } from './supabase.js';
import { unitSelect } from './ui/admin-ui.js';


export async function renderUnitsSelect() {

    const unitsData = await getUnits();

    unitSelect.innerHTML = '';


    for (const unit of unitsData) {

        const option = document.createElement('option');

        option.value = unit.id;
        option.textContent = unit.title;

        unitSelect.append(option);
    }
}



export async function renderAdminUnits(onDeleteUnit) {

    const adminUnits = document.getElementById('admin_units');

    const unitsData = await getUnits();


    adminUnits.innerHTML = '';


    for (const unit of unitsData) {

        const row = document.createElement('div');

        const title = document.createElement('span');

        const deleteBtn = document.createElement('button');


        row.className = 'admin_unit_row';

        title.textContent = unit.title;


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


        deleteBtn.addEventListener('click', () => {
            onDeleteUnit(unit);
        });


        row.appendChild(title);
        row.appendChild(deleteBtn);


        adminUnits.appendChild(row);
    }
}
