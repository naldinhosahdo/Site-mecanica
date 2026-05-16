// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Phone mask
const telefoneInput = document.getElementById('telefone');
telefoneInput.addEventListener('input', () => {
  let v = telefoneInput.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 6) {
    v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
  } else if (v.length > 2) {
    v = `(${v.slice(0,2)}) ${v.slice(2)}`;
  }
  telefoneInput.value = v;
});

// Form submit
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const servico = document.getElementById('servico').value;

  if (!nome || !telefone || !servico) {
    msg.textContent = 'Por favor, preencha todos os campos obrigatórios.';
    msg.className = 'form__note error';
    return;
  }

  const btn = this.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  setTimeout(() => {
    msg.textContent = '✅ Agendamento recebido! Entraremos em contato em breve.';
    msg.className = 'form__note success';
    this.reset();
    btn.disabled = false;
    btn.textContent = 'Enviar agendamento';
  }, 1200);
});

// Animate cards on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card, .diferencial, .depoimento').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
