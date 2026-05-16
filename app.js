// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Diagnóstico — filtros por categoria
document.getElementById('diag-filtros').addEventListener('click', e => {
  const btn = e.target.closest('.filtro-btn');
  if (!btn) return;

  document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('filtro-btn--ativo'));
  btn.classList.add('filtro-btn--ativo');

  const filtro = btn.dataset.filtro;
  document.querySelectorAll('.diag-card').forEach(card => {
    const mostrar = filtro === 'todos' || card.dataset.categoria === filtro;
    card.classList.toggle('diag-card--hidden', !mostrar);
  });
});

// Glossário — busca em tempo real
document.getElementById('busca-glossario').addEventListener('input', function () {
  const q = this.value.toLowerCase().trim();
  const items = document.querySelectorAll('.glossario-item');
  let visíveis = 0;

  items.forEach(item => {
    const texto = (item.dataset.termo + item.textContent).toLowerCase();
    const show  = texto.includes(q);
    item.style.display = show ? '' : 'none';
    if (show) visíveis++;
  });

  document.getElementById('glossario-vazio').style.display = visíveis === 0 ? 'block' : 'none';
});

// Newsletter form
document.getElementById('newsletter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const msg   = document.getElementById('nl-msg');
  const nome  = document.getElementById('nl-nome').value.trim();
  const email = document.getElementById('nl-email').value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!nome || !emailOk) {
    msg.textContent = 'Por favor, preencha nome e e-mail válido.';
    msg.className = 'newsletter__msg error';
    return;
  }

  const btn = this.querySelector('button');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  setTimeout(() => {
    msg.textContent = '✅ Cadastro realizado! Obrigado, ' + nome + '.';
    msg.className = 'newsletter__msg success';
    this.reset();
    btn.disabled = false;
    btn.textContent = 'Quero receber';
  }, 1000);
});

// Animate on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .categoria-card, .article-card, .diag-card, .glossario-item, .diferencial').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .45s ease, transform .45s ease';
  observer.observe(el);
});
