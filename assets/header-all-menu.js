(function () {
  function init(btn) {
    var panelId = btn.getAttribute('aria-controls');
    if (!panelId) return;
    var panel = document.getElementById(panelId);
    if (!panel) return;

    function close() {
      btn.setAttribute('aria-expanded', 'false');
      panel.setAttribute('hidden', '');
    }

    function open() {
      btn.setAttribute('aria-expanded', 'true');
      panel.removeAttribute('hidden');
    }

    function toggle() {
      if (panel.hasAttribute('hidden')) open();
      else close();
    }

    btn.addEventListener('click', function () {
      toggle();
    });

    document.addEventListener('click', function (e) {
      if (panel.hasAttribute('hidden')) return;
      if (btn.contains(e.target) || panel.contains(e.target)) return;
      close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hasAttribute('hidden')) close();
    });

    panel.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (a && panel.contains(a)) close();
    });
  }

  document.querySelectorAll('.amz-header__all-pill').forEach(init);
})();
