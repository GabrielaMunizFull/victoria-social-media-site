/*
  Lightbox dos depoimentos — progressive enhancement sobre os links
  <a href="assets/testimonial-N.png" target="_blank">: sem JS, cada link
  continua abrindo a imagem em nova aba (comportamento nativo do HTML).
  Com JS, o clique é interceptado e a imagem abre num <dialog> modal,
  sem sair da página. Foco, Escape e retorno de foco ao fechar são
  tratados nativamente pelo <dialog>/showModal().
*/
(function () {
  var dialog = document.getElementById('lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  var image = dialog.querySelector('.lightbox__image');
  var errorMsg = dialog.querySelector('.lightbox__error');
  var closeBtn = dialog.querySelector('.lightbox__close');
  var links = document.querySelectorAll('.testimonials__link');

  links.forEach(function (link) {
    var hint = link.querySelector('.visually-hidden');
    if (hint) hint.textContent = ' (ver em tamanho maior)';

    link.addEventListener('click', function (event) {
      event.preventDefault();
      var img = link.querySelector('img');
      image.hidden = false;
      errorMsg.hidden = true;
      image.setAttribute('src', link.getAttribute('href'));
      image.setAttribute('alt', img ? img.getAttribute('alt') : '');
      dialog.showModal();
    });
  });

  image.addEventListener('error', function () {
    if (!image.getAttribute('src')) return; // disparado pelo removeAttribute no close, ignora
    image.hidden = true;
    errorMsg.hidden = false;
  });

  closeBtn.addEventListener('click', function () {
    dialog.close();
  });

  dialog.addEventListener('click', function (event) {
    var rect = dialog.getBoundingClientRect();
    var clickedInsideContent =
      event.clientX >= rect.left && event.clientX <= rect.right &&
      event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!clickedInsideContent) dialog.close();
  });

  dialog.addEventListener('close', function () {
    image.removeAttribute('src');
    image.removeAttribute('alt');
  });
})();

(function () {
  // Offset da nav sticky pro scroll-margin-top das seções (ver main.css):
  // mede a altura real da nav (varia com quebra de linha no mobile) em vez
  // de um valor fixo — evita sobra de espaço em telas largas.
  var nav = document.querySelector('.nav');
  if (!nav) return;

  function updateNavOffset() {
    document.documentElement.style.setProperty('--nav-height', (nav.offsetHeight + 12) + 'px');
  }

  updateNavOffset();
  window.addEventListener('resize', updateNavOffset);
})();
