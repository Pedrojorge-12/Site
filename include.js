document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");

  let includesLoaded = 0;

  includes.forEach(el => {
    let file = el.getAttribute("data-include");

    // Detecta se a página está em subpasta
    const currentPath = window.location.pathname;
    const depth = currentPath.split("/").length - 2; // ajusta conforme estrutura

    // Corrige caminho para páginas em subpastas (ex: footer/)
    if (depth > 1 && !file.startsWith("../")) {
      file = "../" + file;
    }

    fetch(file)
      .then(res => res.text())
      .then(data => {
        el.innerHTML = data;
        includesLoaded++;
        if (includesLoaded === includes.length) {
          inicializarMenu();
        }
      })
      .catch(err => console.error("Erro ao carregar include:", file));
  });
});

function inicializarMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
}