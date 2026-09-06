export default function Home() {
  return (
    <main className="container">
      <h1>Meta Next.js App</h1>
      <p>One Next.js app for both APIs and HTML pages.</p>

      <section>
        <h2>HTML pages</h2>
        <ul>
          <li>
            <a href="/users">/users</a>
          </li>
          <li>
            <a href="/todo-items">/todo-items</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>API routes</h2>
        <ul>
          <li>
            <a href="/api/users">/api/users</a>
          </li>
          <li>
            <a href="/api/todo-items">/api/todo-items</a>
          </li>
        </ul>
      </section>
    </main>
  );
}
