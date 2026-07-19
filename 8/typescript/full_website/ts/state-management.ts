const STORAGE_KEY = 'shelf.books';

export type BookStatus = 'reading' | 'want' | 'finished';

export interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  progress: number;
  tags: string[];
  notes: string;
}

export interface BookInput {
  title: string;
  author: string;
  status?: BookStatus;
  tags?: string;
  notes?: string;
}

export interface BookStats {
  total: number;
  reading: number;
  want: number;
  finished: number;
}

const seedBooks: Book[] = [
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

const statusLabels: Record<BookStatus, string> = {
  reading: 'Reading',
  finished: 'Finished',
  want: 'Want to read',
};

export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function saveBooks(books: Book[]): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export function getBooks(): Book[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);

    if (!raw) {
      const seeded = clone(seedBooks);
      saveBooks(seeded);
      return seeded;
    }

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed) || parsed.length === 0) {
      const seeded = clone(seedBooks);
      saveBooks(seeded);
      return seeded;
    }

    return parsed as Book[];
  } catch {
    const seeded = clone(seedBooks);
    saveBooks(seeded);
    return seeded;
  }
}

export function getBook(id: string): Book | null {
  const books = getBooks();

  for (let i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      return books[i];
    }
  }

  return null;
}

export function getStats(books?: Book[]): BookStats {
  const list = books ?? getBooks();
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

export function addBook(input: BookInput): Book {
  const books = getBooks();
  const status: BookStatus = input.status ?? 'want';

  const book: Book = {
    id: 'b' + Date.now(),
    title: input.title.trim(),
    author: input.author.trim(),
    status: status,
    progress: status === 'finished' ? 100 : 0,
    tags: String(input.tags ?? '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    notes: String(input.notes ?? '').trim(),
  };

  books.unshift(book);
  saveBooks(books);
  return book;
}

export function updateBook(id: string, patch: Partial<Book>): Book | null {
  const books = getBooks();

  for (let i = 0; i < books.length; i++) {
    if (books[i].id !== id) continue;

    const next: Book = { ...books[i], ...patch };

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

export function statusLabel(status: BookStatus | string): string {
  if (status in statusLabels) {
    return statusLabels[status as BookStatus];
  }
  return status;
}

export function bookRowHtml(book: Book): string {
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
