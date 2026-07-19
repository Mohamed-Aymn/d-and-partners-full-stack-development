import {
  getBook,
  updateBook,
  escapeHtml,
  statusLabel,
} from './state-management.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const book = id ? getBook(id) : null;
const root = document.querySelector('#book-detail');

if (!root) {
  // Nothing to render on this page.
} else if (!book) {
  root.innerHTML =
    '<p class="empty">Book not found.</p>' +
    '<p><a class="text-link" href="./library.html">← Back to library</a></p>';
} else {
  document.title = book.title + ' — Shelf';

  let tagsHtml = '';
  if (book.tags && book.tags.length) {
    tagsHtml = '<ul class="tags">';
    for (let i = 0; i < book.tags.length; i++) {
      tagsHtml += '<li class="tags__item">' + escapeHtml(book.tags[i]) + '</li>';
    }
    tagsHtml += '</ul>';
  }

  const notesHtml = book.notes
    ? '<p class="text--muted" id="notes-text">' + escapeHtml(book.notes) + '</p>'
    : '<p class="empty" id="notes-text">No notes yet.</p>';

  root.innerHTML =
    '<a class="text-link text-link--back" href="./library.html">← Back to library</a>' +
    '<article class="book-detail">' +
    '<header class="book-detail__head">' +
    '<p class="badge badge--' +
    escapeHtml(book.status) +
    '">' +
    escapeHtml(statusLabel(book.status)) +
    '</p>' +
    '<h1 class="book-detail__title">' +
    escapeHtml(book.title) +
    '</h1>' +
    '<p class="book-detail__author">' +
    escapeHtml(book.author) +
    '</p>' +
    '</header>' +
    '<div class="progress-block">' +
    '<div class="progress-block__meta">' +
    '<span>Progress</span>' +
    '<strong id="progress-value">' +
    escapeHtml(String(book.progress)) +
    '%</strong>' +
    '</div>' +
    '<div class="progress" aria-hidden="true">' +
    '<span class="progress__fill" id="progress-fill" style="width: ' +
    escapeHtml(String(book.progress)) +
    '%"></span>' +
    '</div>' +
    '<div class="progress-block__control">' +
    '<label class="progress-block__label" for="progress-range">Update %</label>' +
    '<input id="progress-range" type="range" min="0" max="100" value="' +
    escapeHtml(String(book.progress)) +
    '" />' +
    '</div>' +
    '</div>' +
    tagsHtml +
    '<section class="notes">' +
    '<div class="notes__head">' +
    '<h2 class="notes__title">Notes</h2>' +
    '<button type="button" class="btn btn--ghost btn--sm" id="toggle-notes">Hide notes</button>' +
    '</div>' +
    notesHtml +
    '</section>' +
    '</article>';

  const range = document.querySelector('#progress-range');
  const value = document.querySelector('#progress-value');
  const fill = document.querySelector('#progress-fill');
  const toggle = document.querySelector('#toggle-notes');
  const notes = document.querySelector('#notes-text');

  if (range && value && fill) {
    range.addEventListener('input', function () {
      const pct = Number(range.value);
      value.textContent = pct + '%';
      fill.style.width = pct + '%';

      let nextStatus = book.status;
      if (pct === 100) nextStatus = 'finished';
      else if (book.status === 'want' && pct > 0) nextStatus = 'reading';

      const updated = updateBook(book.id, { progress: pct, status: nextStatus });

      if (updated) {
        book.status = updated.status;
        book.progress = updated.progress;

        const badge = root.querySelector('.badge');
        if (badge) {
          badge.className = 'badge badge--' + updated.status;
          badge.textContent = statusLabel(updated.status);
        }
      }
    });
  }

  if (toggle && notes) {
    toggle.addEventListener('click', function () {
      const hiding = !notes.hidden;
      notes.hidden = hiding;
      toggle.textContent = hiding ? 'Show notes' : 'Hide notes';
    });
  }
}
