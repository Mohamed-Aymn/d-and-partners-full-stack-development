import { z } from 'zod';
import { addBook } from './state-management.js';

const bookSchema = z.object({
  title: z.string().trim().min(1, { error: 'Title is required' }),
  author: z.string().trim().min(1, { error: 'Author is required' }),
  status: z.enum(['want', 'reading', 'finished'], {
    error: 'Status must be want, reading, or finished',
  }),
  tags: z.string(),
  notes: z.string(),
});

const form = document.querySelector('#add-form');
const error = document.querySelector('#form-error');
const notice = document.querySelector('#form-notice');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const result = bookSchema.safeParse({
      title: form.title.value,
      author: form.author.value,
      status: form.status.value,
      tags: form.tags.value,
      notes: form.notes.value,
    });

    if (!result.success) {
      const messages = result.error.issues.map(function (issue) {
        return issue.message;
      });
      if (error) {
        error.textContent = messages.join(' ');
        error.hidden = false;
      }
      if (notice) notice.hidden = true;
      return;
    }

    const book = addBook(result.data);

    if (error) error.hidden = true;
    if (notice) {
      notice.textContent =
        'Added “' + book.title + '” by ' + book.author + '. Opening library…';
      notice.hidden = false;
    }

    form.reset();
    window.setTimeout(function () {
      window.location.href = './library.html';
    }, 700);
  });
}
