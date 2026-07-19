import { getBooks, getStats, bookRowHtml } from './state-management';

const books = getBooks();
const stats = getStats(books);
const reading = books.filter((book) => book.status === 'reading');

const statsRoot = document.querySelector('#stats');

if (statsRoot) {
  statsRoot.innerHTML =
    '<li class="stats__item">' +
    '<span class="stats__value" data-count="' +
    stats.total +
    '">0</span>' +
    '<span class="stats__label">On shelf</span>' +
    '</li>' +
    '<li class="stats__item">' +
    '<span class="stats__value" data-count="' +
    stats.reading +
    '">0</span>' +
    '<span class="stats__label">Reading</span>' +
    '</li>' +
    '<li class="stats__item">' +
    '<span class="stats__value" data-count="' +
    stats.want +
    '">0</span>' +
    '<span class="stats__label">Want</span>' +
    '</li>' +
    '<li class="stats__item">' +
    '<span class="stats__value" data-count="' +
    stats.finished +
    '">0</span>' +
    '<span class="stats__label">Finished</span>' +
    '</li>';
}

const list = document.querySelector('#reading-list');

if (list) {
  if (reading.length === 0) {
    list.outerHTML =
      '<p class="empty">Nothing in progress. Pick something from your want list.</p>';
  } else {
    list.innerHTML = reading.map(bookRowHtml).join('');
  }
}

const statValues = document.querySelectorAll<HTMLElement>('.stats__value[data-count]');

for (let i = 0; i < statValues.length; i++) {
  const el = statValues[i];
  const to = Number(el.getAttribute('data-count'));

  if (Number.isNaN(to)) continue;

  const start = performance.now();
  const duration = 700;

  function frame(now: number): void {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = String(Math.round(to * eased));
    if (t < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
