import { wordsList } from './ui/admin-ui.js';

export function renderWords(words, onDeleteWord, onEditWord) {
    wordsList.innerHTML = '';

    for (const word of words) {
        const row = document.createElement('div');

        const ukrainian = document.createElement('span');
        const english = document.createElement('span');

        const actions = document.createElement('div');
        const deleteBtn = document.createElement('button');
        const editBtn = document.createElement('button');

        editBtn.className = 'edit_word_btn';

        row.className = 'word_row';
        ukrainian.className = 'word_ukrainian';
        english.className = 'word_english';
        actions.className = 'word_actions';
        deleteBtn.className = 'delete_word_btn';


        ukrainian.textContent = word.ukrainian;
        english.textContent = word.english;


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

        deleteBtn.dataset.wordId = word.id;
        deleteBtn.title = 'Delete word';

        editBtn.addEventListener('click', () => {
            onEditWord(word);
        });

        deleteBtn.addEventListener('click', () => {
            onDeleteWord(word);
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        row.appendChild(ukrainian);
        row.appendChild(english);
        row.appendChild(actions);

        wordsList.appendChild(row);
    }
}