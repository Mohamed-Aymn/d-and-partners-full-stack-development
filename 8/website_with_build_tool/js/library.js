import { getBooks, bookRowHtml } from './state-management.js';

const search = document.querySelector('#library-search');
const list = document.querySelector('#book-list');
const empty = document.querySelector('#library-empty');
const count = document.querySelector('#library-count');
const chips = document.querySelectorAll('.filters [data-filter]');

let activeFilter = 'all';

if (list) {
  list.innerHTML = getBooks().map(bookRowHtml).join('');
}

function getRows() {
  if (!list) return [];
  return list.querySelectorAll('.book-row');
}

function applyFilters() {
  if (!list) return;

  const query = search ? search.value.trim().toLowerCase() : '';
  const rows = getRows();
  let visible = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const status = row.getAttribute('data-status') || '';
    const title = row.querySelector('.book-row__title');
    const author = row.querySelector('.book-row__author');
    const haystack =
      ((title && title.textContent) || '') + ' ' + ((author && author.textContent) || '');

    const statusMatch = activeFilter === 'all' || status === activeFilter;
    const searchMatch = !query || haystack.toLowerCase().includes(query);
    const match = statusMatch && searchMatch;

    row.hidden = !match;
    if (match) visible += 1;
  }

  list.hidden = visible === 0;
  if (empty) empty.hidden = visible !== 0;

  if (count) {
    if (activeFilter === 'all' && !query) {
      count.textContent =
        visible === 1 ? '1 title on your shelf' : visible + ' titles on your shelf';
    } else {
      count.textContent = visible === 1 ? '1 title shown' : visible + ' titles shown';
    }
  }
}

for (let i = 0; i < chips.length; i++) {
  chips[i].addEventListener('click', function () {
    activeFilter = this.getAttribute('data-filter') || 'all';

    for (let j = 0; j < chips.length; j++) {
      const isActive = chips[j] === this;
      chips[j].classList.toggle('chip--active', isActive);
      chips[j].setAttribute('aria-selected', isActive ? 'true' : 'false');
    }

    applyFilters();
  });
}

if (search) {
  search.addEventListener('input', applyFilters);
}

applyFilters();
