const routes = {
  "/": () => `
    <h1>Home</h1>
    <p>A minimal single-page app with hash routing.</p>
  `,
  "/about": () => `
    <h1>About</h1>
    <p>Built with HTML and vanilla JavaScript — no framework, no build step.</p>
  `,
};

function path() {
  return window.location.hash.slice(1) || "/";
}

function render() {
  const route = path();
  const view = routes[route] || (() => `<h1>404</h1><p>Page not found.</p>`);
  document.getElementById("app").innerHTML = view();

  document.querySelectorAll("nav a").forEach((link) => {
    const href = link.getAttribute("href").slice(1) || "/";
    link.classList.toggle("active", href === route);
  });
}

window.addEventListener("hashchange", render);
render();
