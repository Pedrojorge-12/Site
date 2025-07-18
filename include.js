document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");
  let includesLoaded = 0;

  includes.forEach(el => {
    let file = el.getAttribute("data-include");

    // Detecta profundidade da página
    const depth = window.location.pathname.split("/").length - 2;

    // Adiciona "../" conforme profundidade, se estiver local
    if (!location.hostname.includes("github.io") && depth > 0 && !file.startsWith("../")) {
      file = "../".repeat(depth) + file;
    }

    fetch(file)
      .then(res => res.text())
      .then(data => {
        el.innerHTML = data;
        includesLoaded++;

        if (includesLoaded === includes.length) {
          inicializarMenu();
          ajustarLinks();
        }
      })
      .catch(err => console.error("Erro ao carregar include:", file));
  });
});

// Ativa o menu hamburguer
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

// Ajusta links e imagens dinamicamente para funcionar local e no GitHub Pages
function ajustarLinks() {
  const isGithub = location.hostname.includes("github.io");

  // Detecta profundidade da página
  const depth = window.location.pathname.split("/").length - 2;

  // Base local com '../' para cada nível, ou './' para raiz
  const localBase = depth > 0 ? "../".repeat(depth) : "./";

  const base = isGithub ? "/Site/" : localBase;

  // Ajusta links
  document.querySelectorAll("a[data-ajustavel]").forEach(link => {
    const destino = link.getAttribute("data-ajustavel");
    link.setAttribute("href", base + destino);
  });

  // Ajusta imagens
  document.querySelectorAll("img[data-ajustavel-img]").forEach(img => {
    const caminho = img.getAttribute("data-ajustavel-img");
    img.setAttribute("src", base + caminho);
  });
}