/* ══════════════════════════════════════════════════
   Theme Toggle – Hell/Dunkel für alle Seiten
   ══════════════════════════════════════════════════ */
(function() {
  // Apply saved theme immediately (before paint)
  var saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light');

  // Inject minimal CSS if shared/glossary.css is not loaded
  if (!document.querySelector('link[href*="glossary.css"]')) {
    var style = document.createElement('style');
    style.textContent =
      'body.light{--bg:#f5f6fa;--surface:#ffffff;--border:#dfe2ea;--text:#1a1d2e;--muted:#6b7084;--accent:#5b54e0;--cyan:#0891b2;--green:#16a34a;--orange:#ea580c;--red:#dc2626;--yellow:#ca8a04}' +
      'body.light .noise,body.light .glow-orb{display:none}' +
      'body.light .topic-card{box-shadow:0 2px 8px rgba(0,0,0,.06)}' +
      'body.light input,body.light textarea,body.light select{color:var(--text)}' +
      'body.light .chip.active{color:#fff}' +
      '.theme-toggle{position:fixed;top:14px;right:14px;z-index:200;width:40px;height:40px;border-radius:50%;border:1px solid var(--border);background:var(--surface);color:var(--muted);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;box-shadow:0 2px 8px rgba(0,0,0,.15)}' +
      '.theme-toggle:hover{border-color:var(--accent);color:var(--accent)}';
    document.head.appendChild(style);
  }

  // Create toggle button (skip if glossary.js already created one)
  if (!document.getElementById('theme-toggle')) {
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.id = 'theme-toggle';
    btn.title = 'Hell/Dunkel umschalten';
    btn.textContent = document.body.classList.contains('light') ? '\u2600\uFE0F' : '\uD83C\uDF19';
    btn.onclick = function() {
      document.body.classList.toggle('light');
      var isLight = document.body.classList.contains('light');
      btn.textContent = isLight ? '\u2600\uFE0F' : '\uD83C\uDF19';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    };
    document.body.appendChild(btn);
  }
})();
