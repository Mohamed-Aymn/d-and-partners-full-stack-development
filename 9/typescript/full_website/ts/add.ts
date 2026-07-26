import { z } from 'zod';
import { addBook } from './state-management';

const bookSchema = z.object({
  title: z.string().trim().min(1, { error: 'Title is required' }),
  author: z.string().trim().min(1, { error: 'Author is required' }),
  status: z.enum(['want', 'reading', 'finished'], {
    error: 'Status must be want, reading, or finished',
  }),
  tags: z.string(),
  notes: z.string(),
});

interface AddFormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  author: HTMLInputElement;
  status: HTMLSelectElement;
  tags: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

interface AddForm extends HTMLFormElement {
  readonly elements: AddFormElements;
}

const form = document.querySelector('#add-form') as AddForm | null;
const error = document.querySelector<HTMLElement>('#form-error');
const notice = document.querySelector<HTMLElement>('#form-notice');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const result = bookSchema.safeParse({
      title: form.elements.title.value,
      author: form.elements.author.value,
      status: form.elements.status.value,
      tags: form.elements.tags.value,
      notes: form.elements.notes.value,
    });

    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
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
    window.setTimeout(() => {
      window.location.href = './library.html';
    }, 700);
  });
}
