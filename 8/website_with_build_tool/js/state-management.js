const STORAGE_KEY = 'shelf.books';

const seedBooks = [
  {
    id: 'b1',
    title: 'System Design Interview',
    author: 'Alex Xu',
    status: 'reading',
    progress: 40,
    tags: ['engineering', 'interview'],
    notes: 'Focus on scaling patterns and trade-offs.',
  },
  {
    id: 'b2',
    title: 'Surrounded by Bad Bosses',
    author: 'Thomas Erikson',
    status: 'want',
    progress: 0,
    tags: ['career', 'leadership'],
    notes: '',
  },
];

const statusLabels = {
  reading: 'Reading',
  finished: 'Finished',
  want: 'Want to read',
};

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function saveBooks(books) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export function getBooks() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);

    if (!raw) {
      const seeded = clone(seedBooks);
      saveBooks(seeded);
      return seeded;
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed) || parsed.length === 0) {
      const seeded = clone(seedBooks);
      saveBooks(seeded);
      return seeded;
    }

    return parsed;
  } catch (error) {
    const seeded = clone(seedBooks);
    saveBooks(seeded);
    return seeded;
  }
}

export function getBook(id) {
  const books = getBooks();

  for (let i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      return books[i];
    }
  }

  return null;
}

export function getStats(books) {
  const list = books || getBooks();
  let reading = 0;
  let want = 0;
  let finished = 0;

  for (let i = 0; i < list.length; i++) {
    if (list[i].status === 'reading') reading += 1;
    if (list[i].status === 'want') want += 1;
    if (list[i].status === 'finished') finished += 1;
  }

  return {
    total: list.length,
    reading: reading,
    want: want,
    finished: finished,
  };
}

export function addBook(input) {
  const books = getBooks();
  const status = input.status || 'want';

  const book = {
    id: 'b' + Date.now(),
    title: input.title.trim(),
    author: input.author.trim(),
    status: status,
    progress: status === 'finished' ? 100 : 0,
    tags: String(input.tags || '')
      .split(',')
      .map(function (tag) {
        return tag.trim();
      })
      .filter(Boolean),
    notes: String(input.notes || '').trim(),
  };

  books.unshift(book);
  saveBooks(books);
  return book;
}

export function updateBook(id, patch) {
  const books = getBooks();

  for (let i = 0; i < books.length; i++) {
    if (books[i].id !== id) continue;

    const next = Object.assign({}, books[i], patch);

    if (typeof next.progress === 'number') {
      next.progress = Math.max(0, Math.min(100, next.progress));
    }

    if (next.status === 'finished') next.progress = 100;
    if (next.status === 'want') next.progress = 0;

    books[i] = next;
  }

  saveBooks(books);
  return getBook(id);
}

export function statusLabel(status) {
  return statusLabels[status] || status;
}

export function bookRowHtml(book) {
  let pct = '';

  if (book.status !== 'want') {
    pct = '<span class="book-row__pct">' + escapeHtml(String(book.progress)) + '%</span>';
  }

  return (
    '<li class="book-row" data-status="' +
    escapeHtml(book.status) +
    '">' +
    '<a href="./book.html?id=' +
    encodeURIComponent(book.id) +
    '" class="book-row__link">' +
    '<div class="book-row__main">' +
    '<h3 class="book-row__title">' +
    escapeHtml(book.title) +
    '</h3>' +
    '<p class="book-row__author">' +
    escapeHtml(book.author) +
    '</p>' +
    '</div>' +
    '<div class="book-row__meta">' +
    '<span class="badge badge--' +
    escapeHtml(book.status) +
    '">' +
    escapeHtml(statusLabel(book.status)) +
    '</span>' +
    pct +
    '</div>' +
    '</a>' +
    '</li>'
  );
}
