document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");

  let includesLoaded = 0;

  includes.forEach(el => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then(res => res.text())
      .then(data => {
        el.innerHTML = data;
        includesLoaded++;

        // Quando todos os includes forem carregados, executa o script
        if (includesLoaded === includes.length) {
          inicializarMenu();
        }
      })
      .catch(err => console.error("Erro ao carregar include:", file));
  });
});

// Função que ativa o menu hamburguer
function inicializarMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open'); // ⭐ ativa/desativa o fundo escurecido
    });
  }
}