(function () {
  document.querySelectorAll('[data-home-hero-carousel]').forEach(function (root) {
    var track = root.querySelector('[data-carousel-track]');
    var slides = root.querySelectorAll('[data-carousel-slide]');
    if (!track || slides.length === 0) return;

    var prevBtn = root.querySelector('[data-carousel-prev]');
    var nextBtn = root.querySelector('[data-carousel-next]');
    var dots = root.querySelectorAll('[data-carousel-dot]');
    var index = 0;
    var n = slides.length;

    function go(i) {
      index = ((i % n) + n) % n;
      track.style.transform = 'translateX(' + -index * 100 + '%)';
      slides.forEach(function (slide, j) {
        var active = j === index;
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      dots.forEach(function (dot, j) {
        var on = j === index;
        dot.setAttribute('aria-selected', on ? 'true' : 'false');
        dot.setAttribute('tabindex', on ? '0' : '-1');
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        go(index - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        go(index + 1);
      });
    }
    dots.forEach(function (dot, j) {
      dot.addEventListener('click', function () {
        go(j);
      });
    });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        go(index - 1);
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        go(index + 1);
        e.preventDefault();
      }
    });

    go(0);
  });
})();
