/* ══════════════════════════════════════════════════════════════
   Shared Glossary System – JavaScript
   Erwartet VOR dem Laden dieses Scripts:
     var TRAINER_ID = 'osi-tcpip';
     var GLOSSARY = [...];
     var GP_STORIES = {...};           // optional
     var GLOSSARY_TERM_MAP = {...};    // optional: extra term mappings for highlight
     var GLOSSARY_HIGHLIGHT_SELECTORS = '...'; // optional: CSS selectors for term highlighting
   ══════════════════════════════════════════════════════════════ */

// ── Helpers ──
function escRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>'); }

// ═══════════════════════════════════════════════════════════
// ── GLOSSARY SYSTEM ──
// ═══════════════════════════════════════════════════════════
var glossaryState = { levels: {}, current: null, hintIdx: 0 };

function glossaryLoad() {
  try {
    var s = localStorage.getItem('glossary-' + TRAINER_ID);
    if (s) glossaryState.levels = JSON.parse(s);
  } catch(e) {}
  GLOSSARY.forEach(function(g) { if (!(g.term in glossaryState.levels)) glossaryState.levels[g.term] = 0; });
}

function glossarySave() {
  localStorage.setItem('glossary-' + TRAINER_ID, JSON.stringify(glossaryState.levels));
}

function glossaryRenderGrid() {
  var grid = document.getElementById('glossary-grid');
  if (!grid) return;
  grid.innerHTML = '';
  var icons = ['\u2753', '\uD83D\uDCA1', '\uD83D\uDD0D', '\u2B50'];
  GLOSSARY.forEach(function(g) {
    var lv = glossaryState.levels[g.term] || 0;
    var c = document.createElement('div');
    c.className = 'glossary-card' + (glossaryState.current === g.term ? ' active' : '');
    c.dataset.level = lv;
    c.onclick = function() { glossaryOpen(g.term); };
    c.innerHTML = '<div class="gc-icon">' + icons[lv] + '</div><div class="gc-term">' + g.term + '</div><div class="gc-short">' + g.short + '</div><div class="gc-level"></div>';
    grid.appendChild(c);
  });
  glossaryUpdateProgress();
}

function glossaryUpdateProgress() {
  var mastered = GLOSSARY.filter(function(g) { return glossaryState.levels[g.term] >= 3; }).length;
  var total = GLOSSARY.length;
  var pct = Math.round(mastered / total * 100);
  var sub = document.getElementById('glossary-sub');
  var fill = document.getElementById('glossary-fill');
  var count = document.getElementById('glossary-count');
  if (sub) sub.textContent = mastered + ' / ' + total + ' gemeistert';
  if (fill) fill.style.width = pct + '%';
  if (count) count.textContent = pct + '%';
}

function glossaryOpen(term) {
  var g = GLOSSARY.find(function(t) { return t.term === term; });
  if (!g) return;
  glossaryState.current = term;
  glossaryState.hintIdx = 0;
  var lv = glossaryState.levels[term] || 0;

  document.getElementById('gl-title').textContent = g.term;
  glossaryRenderPhases(lv);

  if (lv === 0) glossaryPhase1(g);
  else if (lv === 1) glossaryPhase2(g);
  else if (lv === 2) glossaryPhase3(g);
  else glossaryMastered(g);

  document.getElementById('glossary-learn').classList.add('visible');
  glossaryRenderGrid();
  document.getElementById('glossary-learn').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function glossaryRenderPhases(lv, activePhase) {
  if (activePhase === undefined) activePhase = lv;
  var names = ['\uD83D\uDCA1 Kennenlernen', '\uD83D\uDD0D \u00dcberpr\u00fcfen', '\u2B50 Beweisen'];
  document.getElementById('gl-phases').innerHTML = names.map(function(n, i) {
    var cls = 'gl-phase';
    if (i === activePhase) cls += ' current';
    else if (lv > i || lv === 3) cls += ' done';
    var clickable = (i <= lv || lv === 3);
    var onclick = clickable ? ' onclick="glossaryGoToPhase(' + i + ')"' : '';
    return '<div class="' + cls + '"' + onclick + '>' + n + '</div>';
  }).join('');
}

function glossaryGoToPhase(phaseIdx) {
  var term = glossaryState.current;
  var g = GLOSSARY.find(function(t) { return t.term === term; });
  if (!g) return;
  glossaryState.hintIdx = 0;
  var lv = glossaryState.levels[term] || 0;
  glossaryRenderPhases(lv, phaseIdx);
  if (phaseIdx === 0) glossaryPhase1(g);
  else if (phaseIdx === 1) glossaryPhase2(g);
  else if (phaseIdx === 2) glossaryPhase3(g);
}

// ── Phase 1: Kennenlernen ──
function glossaryPhase1(g) {
  var el = document.getElementById('gl-content');
  var html = '<div class="gl-analogy">' + g.analogy + '</div>';
  html += '<div class="gl-definition">' + g.definition + '</div>';
  html += '<div class="gl-hints" id="gl-hints">';
  g.hints.forEach(function(h, i) {
    html += '<div class="gl-hint' + (i === 0 ? ' visible' : '') + '" id="gh-' + i + '">' + h + '</div>';
  });
  html += '</div>';
  if (g.hints.length > 1) html += '<button class="gl-hint-btn" id="gl-hint-btn" onclick="glossaryNextHint()">N\u00e4chster Hinweis \u2192</button>';
  html += '<button class="gl-btn primary" onclick="glossaryLevelUp()">Verstanden! \u2713</button>';
  el.innerHTML = html;
}

function glossaryNextHint() {
  var g = GLOSSARY.find(function(t) { return t.term === glossaryState.current; });
  if (!g) return;
  glossaryState.hintIdx++;
  if (glossaryState.hintIdx < g.hints.length) {
    document.getElementById('gh-' + glossaryState.hintIdx).classList.add('visible');
  }
  if (glossaryState.hintIdx >= g.hints.length - 1) {
    var btn = document.getElementById('gl-hint-btn');
    if (btn) btn.style.display = 'none';
  }
}

// ── Phase 2: Überprüfen ──
function glossaryPhase2(g) {
  var q = g.questions.find(function(x) { return x.type === 'fill'; }) || g.questions.find(function(x) { return x.type === 'choice'; }) || g.questions[0];
  var el = document.getElementById('gl-content');
  if (q.type === 'fill') {
    el.innerHTML = '<div class="gl-question">' + q.q + '</div>' +
      '<div class="sc-bar" id="gl-sc-bar"><label>St\u00fctze:</label>' +
      '<button class="sc-lvl" onclick="scSetLevel(0)">Aus</button>' +
      '<button class="sc-lvl" onclick="scSetLevel(1)">Leicht</button>' +
      '<button class="sc-lvl" onclick="scSetLevel(2)">Mittel</button>' +
      '<button class="sc-lvl" onclick="scSetLevel(3)">Stark</button></div>' +
      '<div class="sc-wrap"><div class="sc-ghost-layer sc-input" id="gl-answer-ghost" style="padding:0 14px;font-family:\'Outfit\',sans-serif;font-size:15px;font-weight:400;line-height:1;border:2px solid transparent;border-radius:10px;height:44px"></div>' +
      '<input type="text" class="gl-input" id="gl-answer" placeholder="Deine Antwort..." onkeydown="if(event.key===\'Enter\')glossaryCheckFill()" oninput="scUpdate(\'gl-answer\')" style="background:transparent">' +
      '<div class="sc-color-layer sc-input" id="gl-answer-color" style="padding:0 14px;font-family:\'Outfit\',sans-serif;font-size:15px;font-weight:400;line-height:1;border:2px solid transparent;border-radius:10px;height:44px"></div></div>' +
      (q.hint ? '<div style="font-size:11px;color:var(--muted);margin-bottom:12px">\uD83D\uDCA1 Tipp: ' + q.hint + '</div>' : '') +
      '<button class="gl-btn primary" onclick="glossaryCheckFill()">Pr\u00fcfen \u2192</button><div id="gl-feedback"></div>';
    var otherTerms = GLOSSARY.filter(function(x) { return x.term !== g.term; }).map(function(x) { return x.term; });
    setTimeout(function() {
      document.querySelectorAll('#gl-sc-bar .sc-lvl').forEach(function(b, i) { b.classList.toggle('active', i === scLevel); });
      scActiveInputs['gl-answer'] = { ghost: document.getElementById('gl-answer-ghost'), input: document.getElementById('gl-answer'), color: document.getElementById('gl-answer-color') };
      scModelAnswers['gl-answer'] = q.a;
      scKeywords['gl-answer'] = { term: g.term, keys: q.keywords || [], refs: otherTerms };
      scUpdate('gl-answer');
    }, 10);
  } else if (q.type === 'choice') {
    el.innerHTML = '<div class="gl-question">' + q.q + '</div><div class="gl-choices">' +
      q.options.map(function(o, i) { return '<button class="gl-choice" onclick="glossaryCheckChoice(' + i + ')">' + o + '</button>'; }).join('') +
      '</div><div id="gl-feedback"></div>';
  }
}

function glossaryCheckFill() {
  var g = GLOSSARY.find(function(t) { return t.term === glossaryState.current; });
  var q = g.questions.find(function(x) { return x.type === 'fill'; });
  var val = document.getElementById('gl-answer').value.trim();
  var fb = document.getElementById('gl-feedback');
  var alts = [q.a].concat(q.alt || []);
  var ok = alts.some(function(a) { return val.toLowerCase() === a.toLowerCase(); });
  if (ok) {
    fb.innerHTML = '<div class="gl-feedback success">Richtig! \uD83C\uDF89 "' + q.a + '" ist korrekt.</div>';
    setTimeout(function() { glossaryLevelUp(); }, 1200);
  } else {
    fb.innerHTML = '<div class="gl-feedback error">Nicht ganz! Die richtige Antwort ist: <strong>' + q.a + '</strong>. Versuch es nochmal!</div>';
    document.getElementById('gl-answer').value = '';
    document.getElementById('gl-answer').focus();
  }
}

function glossaryCheckChoice(idx) {
  var g = GLOSSARY.find(function(t) { return t.term === glossaryState.current; });
  var q = g.questions.find(function(x) { return x.type === 'choice'; });
  var btns = document.querySelectorAll('.gl-choice');
  var fb = document.getElementById('gl-feedback');
  btns.forEach(function(b) { b.style.pointerEvents = 'none'; });
  if (idx === q.correct) {
    btns[idx].classList.add('correct');
    fb.innerHTML = '<div class="gl-feedback success">Richtig! \uD83C\uDF89</div>';
    setTimeout(function() { glossaryLevelUp(); }, 1200);
  } else {
    btns[idx].classList.add('wrong');
    btns[q.correct].classList.add('correct');
    fb.innerHTML = '<div class="gl-feedback error">Nicht ganz! Die richtige Antwort ist markiert.</div>';
    setTimeout(function() {
      btns.forEach(function(b) { b.style.pointerEvents = ''; b.classList.remove('wrong', 'correct'); });
      fb.innerHTML = '';
    }, 2500);
  }
}

// ── Phase 3: Beweisen ──
function glossaryPhase3(g) {
  var q = g.questions.find(function(x) { return x.type === 'explain'; });
  if (!q) { glossaryLevelUp(); return; }
  var el = document.getElementById('gl-content');
  el.innerHTML = '<div class="gl-question">' + q.q + '</div>' +
    '<div class="sc-bar" id="gl-sc-bar3"><label>St\u00fctze:</label>' +
    '<button class="sc-lvl" onclick="scSetLevel(0)">Aus</button>' +
    '<button class="sc-lvl" onclick="scSetLevel(1)">Leicht</button>' +
    '<button class="sc-lvl" onclick="scSetLevel(2)">Mittel</button>' +
    '<button class="sc-lvl" onclick="scSetLevel(3)">Stark</button></div>' +
    '<div class="sc-wrap"><div class="sc-ghost-layer" id="gl-answer-ghost" style="padding:12px 14px;font-family:\'Outfit\',sans-serif;font-size:15px;font-weight:400;line-height:1.5;border:2px solid transparent;border-radius:10px"></div>' +
    '<textarea class="gl-input" id="gl-answer" placeholder="Erkl\u00e4re in eigenen Worten..." rows="4" oninput="scUpdate(\'gl-answer\')" style="background:transparent"></textarea>' +
    '<div class="sc-color-layer" id="gl-answer-color" style="padding:12px 14px;font-family:\'Outfit\',sans-serif;font-size:15px;font-weight:400;line-height:1.5;border:2px solid transparent;border-radius:10px"></div></div>' +
    '<div style="font-size:11px;color:var(--muted);margin-bottom:12px">\uD83D\uDCA1 Verwende Fachbegriffe \u2013 je mehr Schl\u00fcsselw\u00f6rter du nennst, desto besser!</div>' +
    '<button class="gl-btn primary" onclick="glossaryCheckExplain()">Antwort pr\u00fcfen \u2192</button><div id="gl-feedback"></div>';
  var otherTerms = GLOSSARY.filter(function(x) { return x.term !== g.term; }).map(function(x) { return x.term; });
  setTimeout(function() {
    document.querySelectorAll('#gl-sc-bar3 .sc-lvl').forEach(function(b, i) { b.classList.toggle('active', i === scLevel); });
    scActiveInputs['gl-answer'] = { ghost: document.getElementById('gl-answer-ghost'), input: document.getElementById('gl-answer'), color: document.getElementById('gl-answer-color') };
    scModelAnswers['gl-answer'] = g.definition;
    scKeywords['gl-answer'] = { term: g.term, keys: q.keywords || [], refs: otherTerms };
    scUpdate('gl-answer');
  }, 10);
}

function glossaryCheckExplain() {
  var g = GLOSSARY.find(function(t) { return t.term === glossaryState.current; });
  var q = g.questions.find(function(x) { return x.type === 'explain'; });
  var val = document.getElementById('gl-answer').value.trim().toLowerCase();
  var fb = document.getElementById('gl-feedback');
  if (!val) { fb.innerHTML = '<div class="gl-feedback error">Bitte schreibe eine Erkl\u00e4rung!</div>'; return; }

  var found = [], missing = [];
  q.keywords.forEach(function(kw) {
    if (val.indexOf(kw.toLowerCase()) !== -1) found.push(kw); else missing.push(kw);
  });
  var kwHtml = found.map(function(k) { return '<span class="gl-keyword found">\u2713 ' + k + '</span>'; }).join('') +
               missing.map(function(k) { return '<span class="gl-keyword missing">\u2717 ' + k + '</span>'; }).join('');

  if (found.length >= (q.minKeywords || 3)) {
    fb.innerHTML = '<div class="gl-feedback success">Sehr gut! \uD83C\uDF89 Du hast ' + found.length + '/' + q.keywords.length + ' Schl\u00fcsselbegriffe genannt!<br>' + kwHtml + '</div>';
    setTimeout(function() { glossaryLevelUp(); }, 1800);
  } else {
    fb.innerHTML = '<div class="gl-feedback info">Du hast ' + found.length + '/' + q.keywords.length + ' Schl\u00fcsselbegriffe genannt (' + (q.minKeywords || 3) + ' ben\u00f6tigt):<br>' + kwHtml +
      '<br><span style="font-size:12px;margin-top:6px;display:inline-block">Versuch es nochmal \u2013 nutze die fehlenden Begriffe!</span></div>';
  }
}

function glossaryMastered(g) {
  document.getElementById('gl-content').innerHTML =
    '<div style="text-align:center;padding:20px 0">' +
    '<div style="font-size:48px;margin-bottom:12px">\u2B50</div>' +
    '<div style="font-size:18px;font-weight:700;color:var(--green);margin-bottom:8px">Gemeistert!</div>' +
    '<div style="font-size:13px;color:var(--muted);font-weight:300;max-width:400px;margin:0 auto;line-height:1.6">' +
    'Du hast <strong style="color:var(--text)">' + g.term + '</strong> vollst\u00e4ndig gelernt. ' + g.short + '</div>' +
    '<button class="gl-btn" style="margin-top:16px;border:1px solid var(--border);background:rgba(255,255,255,.04);color:var(--text)" onclick="glossaryReset(\'' + g.term.replace(/'/g, "\\'") + '\')">Nochmal lernen \u21BA</button></div>';
}

function glossaryLevelUp() {
  var term = glossaryState.current;
  var lv = (glossaryState.levels[term] || 0) + 1;
  if (lv > 3) lv = 3;
  glossaryState.levels[term] = lv;
  glossarySave();
  glossaryOpen(term);
}

function glossaryReset(term) {
  glossaryState.levels[term] = 0;
  glossarySave();
  glossaryOpen(term);
}

function glossaryClose() {
  document.getElementById('glossary-learn').classList.remove('visible');
  glossaryState.current = null;
  glossaryRenderGrid();
}

// ── Term Highlighting in Page Content ──
function glossaryHighlightTerms() {
  var termMap = {};
  GLOSSARY.forEach(function(g) { termMap[g.term.toLowerCase()] = g.term; });
  // Add trainer-specific extra mappings
  if (typeof GLOSSARY_TERM_MAP !== 'undefined') {
    for (var k in GLOSSARY_TERM_MAP) termMap[k] = GLOSSARY_TERM_MAP[k];
  }

  var allTerms = Object.keys(termMap).sort(function(a, b) { return b.length - a.length; });
  if (!allTerms.length) return;
  var pattern = new RegExp('\\b(' + allTerms.map(function(t) { return t.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&'); }).join('|') + ')\\b', 'gi');

  var selectors = typeof GLOSSARY_HIGHLIGHT_SELECTORS !== 'undefined' ? GLOSSARY_HIGHLIGHT_SELECTORS : '.diff-card p, .detail-body, .mnemonic h3, .card-body, .topic-content, .info-box';
  document.querySelectorAll(selectors).forEach(function(el) {
    if (el.dataset.glDone) return;
    el.dataset.glDone = '1';
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var nodes = [];
    var n;
    while (n = walker.nextNode()) nodes.push(n);

    nodes.forEach(function(textNode) {
      var txt = textNode.textContent;
      pattern.lastIndex = 0;
      if (!pattern.test(txt)) return;
      pattern.lastIndex = 0;

      var frag = document.createDocumentFragment();
      var last = 0, m;
      while (m = pattern.exec(txt)) {
        if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
        var span = document.createElement('span');
        span.className = 'glossary-term';
        span.dataset.term = termMap[m[0].toLowerCase()] || m[0];
        span.textContent = m[0];
        frag.appendChild(span);
        last = pattern.lastIndex;
      }
      if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
      textNode.parentNode.replaceChild(frag, textNode);
    });
  });
}

// ═══════════════════════════════════════════════════════════
// ── GEDÄCHTNISPALAST (Story-First) ──
// ═══════════════════════════════════════════════════════════
var gpTesting = false;
var gpLegendOnly = false;

function gpOpen() {
  var term = glossaryState.current;
  if (!term) return;
  gpTesting = false;
  document.getElementById('gp-overlay').classList.add('show');
  gpRender(term);
}
function gpClose() {
  document.getElementById('gp-overlay').classList.remove('show');
}

function gpRender(term) {
  var story = (typeof GP_STORIES !== 'undefined') ? GP_STORIES[term] : null;
  if (!story) {
    document.getElementById('gp-sub').innerHTML = '<span style="color:var(--muted)">F\u00fcr "<strong>' + term + '</strong>" ist noch keine Merk-Geschichte hinterlegt.</span>';
    document.getElementById('gp-body').innerHTML = '<div style="text-align:center;padding:32px;color:var(--muted)"><div style="font-size:40px;margin-bottom:12px">\uD83C\uDFF0</div><div style="font-size:13px">Kommt bald!</div></div>';
    return;
  }

  document.getElementById('gp-sub').innerHTML = 'Lies die Geschichte und lauf sie im Kopf ab \u2013 die <strong style="color:var(--cyan)">Schl\u00fcsselw\u00f6rter</strong> merken sich von allein!';

  var html = '';
  html += '<div class="gp-route-label"><span>\uD83D\uDCCD ' + story.route + '</span><em>\u2013 Lauf diese Route im Kopf ab!</em></div>';

  html += '<div class="gp-route">';
  story.scenes.forEach(function(scene, i) {
    var storyText = scene.text.replace(new RegExp('(' + scene.kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<strong>$1</strong>');
    html += '<div class="gp-station filled" data-kw="' + scene.kw.replace(/"/g,'&quot;') + '">' +
      '<div class="gp-station-num">' + (i + 1) + '</div>' +
      '<div class="gp-station-body">' +
        '<div class="gp-station-kw">' + scene.kw + '</div>' +
        '<div class="gp-station-img">' + scene.img + '</div>' +
        '<div class="gp-station-text">' + storyText + '</div>' +
      '</div>' +
    '</div>';
  });
  html += '</div>';

  html += '<div class="gp-legend"><div class="gp-legend-title">\u00dcbersicht: Schl\u00fcsselwort \u2192 Merk-Bild</div>';
  story.scenes.forEach(function(scene) {
    html += '<div class="gp-legend-row"><span class="gp-legend-kw">' + scene.kw + '</span><span class="gp-legend-arrow">\u2192</span><span class="gp-legend-img">' + scene.img + '</span></div>';
  });
  html += '</div>';

  html += '<div class="gp-actions">' +
    '<button class="gp-action primary" onclick="gpStartTest(\'' + term.replace(/'/g,"\\'") + '\')">\uD83E\uDDEA Route testen</button>' +
    '<button class="gp-action secondary" onclick="gpToggleLegend()">\uD83D\uDCCB Nur \u00dcbersicht</button>' +
  '</div>';

  document.getElementById('gp-body').innerHTML = html;
}

function gpToggleLegend() {
  gpLegendOnly = !gpLegendOnly;
  var route = document.querySelector('#gp-body .gp-route');
  var btn = document.querySelector('#gp-body .gp-action.secondary');
  if (route) route.style.display = gpLegendOnly ? 'none' : '';
  if (btn) btn.innerHTML = gpLegendOnly ? '\uD83D\uDCD6 Ganze Geschichte' : '\uD83D\uDCCB Nur \u00dcbersicht';
}

function gpStartTest(term) {
  gpTesting = true;
  var story = (typeof GP_STORIES !== 'undefined') ? GP_STORIES[term] : null;
  if (!story) return;

  document.getElementById('gp-sub').innerHTML = '\uD83E\uDDEA <strong>Route-Test</strong> \u2013 Welches Schl\u00fcsselwort geh\u00f6rt zum Bild?';

  var html = '';
  html += '<div class="gp-route-label"><span>\uD83D\uDCCD ' + story.route + '</span><em>\u2013 Erinnerst du dich?</em></div>';

  html += '<div class="gp-route">';
  story.scenes.forEach(function(scene, i) {
    html += '<div class="gp-station" data-kw="' + scene.kw.replace(/"/g,'&quot;') + '">' +
      '<div class="gp-station-num">' + (i + 1) + '</div>' +
      '<div class="gp-station-body">' +
        '<div class="gp-station-img" style="font-size:14px;margin-bottom:6px">' + scene.img + '</div>' +
        '<input class="gp-test-input" id="gp-test-' + i + '" placeholder="Schl\u00fcsselwort?" onkeydown="if(event.key===\'Enter\')gpCheckStation(' + i + ',this)">' +
        '<div id="gp-test-fb-' + i + '" style="margin-top:4px;font-size:12px"></div>' +
      '</div>' +
    '</div>';
  });
  html += '</div>';

  html += '<div class="gp-actions">' +
    '<button class="gp-action primary" onclick="gpCheckAll(\'' + term.replace(/'/g,"\\'") + '\')">\u2705 Alle pr\u00fcfen</button>' +
    '<button class="gp-action ghost" onclick="gpRender(\'' + term.replace(/'/g,"\\'") + '\')">\u2190 Zur\u00fcck zur Geschichte</button>' +
  '</div>';

  html += '<div id="gp-score"></div>';

  document.getElementById('gp-body').innerHTML = html;
  var first = document.getElementById('gp-test-0');
  if (first) first.focus();
}

function gpCheckStation(idx, input) {
  var station = input.closest('.gp-station');
  var kw = station ? station.getAttribute('data-kw') : '';
  var val = input.value.trim().toLowerCase();
  var fb = document.getElementById('gp-test-fb-' + idx);

  if (val === kw.toLowerCase()) {
    input.classList.add('correct');
    input.classList.remove('wrong');
    station.classList.add('correct');
    if (fb) fb.innerHTML = '<span style="color:var(--green)">\u2713 Richtig! "' + kw + '"</span>';
    var next = document.getElementById('gp-test-' + (idx + 1));
    if (next) next.focus();
  } else {
    input.classList.add('wrong');
    input.classList.remove('correct');
    if (fb) fb.innerHTML = '<span style="color:var(--red)">\u2717 Versuch es nochmal!</span>';
    input.select();
  }
}

function gpCheckAll(term) {
  var story = (typeof GP_STORIES !== 'undefined') ? GP_STORIES[term] : null;
  if (!story) return;
  var correct = 0, total = story.scenes.length;

  story.scenes.forEach(function(scene, i) {
    var input = document.getElementById('gp-test-' + i);
    if (!input) return;
    var station = input.closest('.gp-station');
    var fb = document.getElementById('gp-test-fb-' + i);
    var val = input.value.trim().toLowerCase();

    if (val === scene.kw.toLowerCase()) {
      correct++;
      input.classList.add('correct');
      input.classList.remove('wrong');
      if (station) station.classList.add('correct');
      if (fb) fb.innerHTML = '<span style="color:var(--green)">\u2713 "' + scene.kw + '"</span>';
    } else {
      input.classList.add('wrong');
      input.classList.remove('correct');
      if (fb) fb.innerHTML = '<span style="color:var(--red)">\u2717 Richtig w\u00e4re: <strong>"' + scene.kw + '"</strong></span>';
    }
  });

  var score = document.getElementById('gp-score');
  if (score) {
    if (correct === total) {
      score.innerHTML = '<div class="gp-score" style="color:var(--green)">\uD83C\uDF89 Perfekt! ' + correct + '/' + total + ' \u2013 Dein Ged\u00e4chtnispalast funktioniert!</div>';
    } else {
      score.innerHTML = '<div class="gp-score" style="color:var(--orange,#fb923c)">' + correct + '/' + total + ' richtig \u2013 lies die Geschichte nochmal und versuch es erneut!</div>';
    }
  }
}

// ═══════════════════════════════════════════════════════════
// ── FREIES ERINNERN ──
// ═══════════════════════════════════════════════════════════
var feEditId = null;
function _feKey() { return 'freies-erinnern-' + TRAINER_ID; }

function feOpen() {
  document.getElementById('fe-overlay').classList.add('show');
  feRenderEntries();
  feScPopulate();
  document.getElementById('fe-text').focus();
  var sel = document.getElementById('fe-sc-select');
  if (sel && sel.value) feScSelectQuestion();
}
function feClose() {
  document.getElementById('fe-overlay').classList.remove('show');
  feEditId = null;
}
function feSize(px) {
  document.getElementById('fe-text').style.fontSize = px + 'px';
  document.querySelectorAll('.fe-sz').forEach(function(b) {
    b.classList.toggle('active', parseInt(b.getAttribute('data-size')) === px);
  });
  scSyncFontSize('fe-text', px);
}
function feClear() {
  document.getElementById('fe-text').value = '';
  document.getElementById('fe-check-result').innerHTML = '';
  feEditId = null;
  scUpdate('fe-text');
}

function feGetEntries() {
  try { return JSON.parse(localStorage.getItem(_feKey()) || '[]'); } catch(e) { return []; }
}
function feSaveEntries(arr) {
  localStorage.setItem(_feKey(), JSON.stringify(arr));
}

function feSave() {
  var text = document.getElementById('fe-text').value.trim();
  if (!text) return;
  var entries = feGetEntries();
  if (feEditId) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].id === feEditId) { entries[i].text = text; entries[i].date = new Date().toLocaleString('de-DE'); break; }
    }
    feEditId = null;
  } else {
    entries.unshift({ id: Date.now(), text: text, date: new Date().toLocaleString('de-DE') });
  }
  feSaveEntries(entries);
  document.getElementById('fe-text').value = '';
  document.getElementById('fe-check-result').innerHTML = '';
  feRenderEntries();
}

function feEdit(id) {
  var entries = feGetEntries();
  var e = entries.find(function(x) { return x.id === id; });
  if (!e) return;
  document.getElementById('fe-text').value = e.text;
  document.getElementById('fe-text').focus();
  feEditId = id;
}

function feDelete(id) {
  var entries = feGetEntries().filter(function(x) { return x.id !== id; });
  feSaveEntries(entries);
  feRenderEntries();
}

function feRenderEntries() {
  var entries = feGetEntries();
  document.getElementById('fe-count').textContent = entries.length;
  var el = document.getElementById('fe-entries');
  if (!entries.length) {
    el.innerHTML = '<div class="fe-empty">Noch keine Eintr\u00e4ge \u2013 schreib dein Wissen auf!</div>';
    return;
  }
  el.innerHTML = entries.map(function(e) {
    var preview = e.text.length > 120 ? e.text.slice(0, 120) + '...' : e.text;
    return '<div class="fe-entry">' +
      '<div class="fe-entry-head">' +
        '<span class="fe-entry-date">\uD83D\uDCDD ' + e.date + '</span>' +
        '<div class="fe-entry-btns">' +
          '<button class="fe-entry-btn" onclick="feEdit(' + e.id + ')" title="Bearbeiten">\u270F\uFE0F</button>' +
          '<button class="fe-entry-btn del" onclick="feDelete(' + e.id + ')" title="L\u00f6schen">\uD83D\uDDD1\uFE0F</button>' +
        '</div>' +
      '</div>' +
      '<div class="fe-entry-text">' + preview.replace(/</g,'&lt;') + '</div>' +
    '</div>';
  }).join('');
}

function feCheck() {
  var text = document.getElementById('fe-text').value;
  if (!text.trim()) { document.getElementById('fe-check-result').innerHTML = ''; return; }
  var terms = GLOSSARY.map(function(g) { return g.term; });
  var found = [], missing = [];
  var textLower = text.toLowerCase();
  terms.forEach(function(t) {
    if (textLower.indexOf(t.toLowerCase()) !== -1) found.push(t);
    else missing.push(t);
  });
  var html = '<div class="fe-check-result" style="background:rgba(56,189,248,.06);border:1px solid rgba(56,189,248,.15)">';
  html += '<div style="font-weight:700;margin-bottom:6px;color:var(--cyan)">\uD83D\uDD0D Begriffe-Check: ' + found.length + '/' + terms.length + ' erkannt</div>';
  if (found.length) {
    html += '<div style="margin-bottom:6px">';
    found.forEach(function(t) { html += '<span class="gl-keyword found">' + t + '</span> '; });
    html += '</div>';
  }
  if (missing.length) {
    html += '<div style="font-size:11px;color:var(--muted);margin-top:4px">Noch nicht erw\u00e4hnt: ';
    missing.forEach(function(t) { html += '<span class="gl-keyword missing">' + t + '</span> '; });
    html += '</div>';
  }
  if (found.length === terms.length) {
    html += '<div style="margin-top:8px;color:var(--green);font-weight:600">\uD83C\uDF89 Alle Begriffe erw\u00e4hnt \u2013 stark!</div>';
  }
  html += '</div>';
  document.getElementById('fe-check-result').innerHTML = html;
}

// ═══════════════════════════════════════════════════════════
// ── SCAFFOLD / STÜTZE ──
// ═══════════════════════════════════════════════════════════
var scLevel = parseInt(localStorage.getItem('scaffold-level') || '0');
var scModelAnswers = {};
var scActiveInputs = {};
var scKeywords = {};

function scSetLevel(n) {
  scLevel = n;
  localStorage.setItem('scaffold-level', n);
  document.querySelectorAll('.sc-lvl').forEach(function(b, i) {
    b.classList.toggle('active', i % 4 === n);
  });
  var feQ = document.getElementById('fe-sc-questions');
  if (feQ) feQ.style.display = n > 0 ? 'flex' : 'none';
  Object.keys(scActiveInputs).forEach(function(id) { scUpdate(id); });
}

function scAttach(inputId, modelAnswer, keywords) {
  var input = document.getElementById(inputId);
  if (!input) return;
  scModelAnswers[inputId] = modelAnswer;
  if (keywords) scKeywords[inputId] = keywords;

  var ghostId = inputId + '-ghost';
  var colorId = inputId + '-color';
  var ghost = document.getElementById(ghostId);
  var color = document.getElementById(colorId);

  if (!ghost) {
    var parent = input.parentNode;
    if (!parent.classList.contains('sc-wrap')) {
      var wrap = document.createElement('div');
      wrap.className = 'sc-wrap';
      parent.insertBefore(wrap, input);
      wrap.appendChild(input);
      parent = wrap;
    }

    var cs = getComputedStyle(input);
    var sharedStyle = {
      fontFamily: cs.fontFamily, fontSize: cs.fontSize,
      fontWeight: cs.fontWeight, lineHeight: cs.lineHeight,
      paddingTop: cs.paddingTop, paddingRight: cs.paddingRight,
      paddingBottom: cs.paddingBottom, paddingLeft: cs.paddingLeft,
      borderTop: cs.borderTopWidth + ' solid transparent',
      borderRight: cs.borderRightWidth + ' solid transparent',
      borderBottom: cs.borderBottomWidth + ' solid transparent',
      borderLeft: cs.borderLeftWidth + ' solid transparent',
      borderRadius: cs.borderRadius,
      boxSizing: cs.boxSizing || 'border-box'
    };

    ghost = document.createElement('div');
    ghost.id = ghostId;
    ghost.className = 'sc-ghost-layer' + (input.tagName === 'INPUT' ? ' sc-input' : '');
    Object.assign(ghost.style, sharedStyle);
    parent.insertBefore(ghost, input);

    color = document.createElement('div');
    color.id = colorId;
    color.className = 'sc-color-layer' + (input.tagName === 'INPUT' ? ' sc-input' : '');
    Object.assign(color.style, sharedStyle);
    parent.appendChild(color);

    if (input.tagName === 'TEXTAREA') {
      input._scScrollSync = function() {
        var st = input.scrollTop, sl = input.scrollLeft;
        ghost.scrollTop = st; ghost.scrollLeft = sl;
        if (color) { color.scrollTop = st; color.scrollLeft = sl; }
      };
      input.addEventListener('scroll', input._scScrollSync);
    }
  }

  scActiveInputs[inputId] = { ghost: ghost, input: input, color: color };

  if (!input._scListener) {
    input._scListener = function() { scUpdate(inputId); };
    input.addEventListener('input', input._scListener);
  }

  scUpdate(inputId);
}

function scDetach(inputId) {
  var info = scActiveInputs[inputId];
  if (!info) return;
  if (info.ghost) info.ghost.innerHTML = '';
  if (info.color) info.color.innerHTML = '';
  var wrap = info.input ? info.input.closest('.sc-wrap') : null;
  if (wrap) { wrap.classList.remove('sc-active'); wrap.classList.remove('sc-coloring'); }
  if (info.input && info.input._scListener) {
    info.input.removeEventListener('input', info.input._scListener);
    info.input._scListener = null;
  }
  if (info.input && info.input._scScrollSync) {
    info.input.removeEventListener('scroll', info.input._scScrollSync);
    info.input._scScrollSync = null;
  }
  delete scActiveInputs[inputId];
  delete scModelAnswers[inputId];
  delete scKeywords[inputId];
}

function scTruncate(text, level, isFill) {
  if (level === 0) return '';
  if (level === 3) return text;
  if (isFill) {
    var len = text.length;
    if (level === 1) return text.charAt(0) + Array(Math.max(0, len - 1)).fill('_').join('');
    else { var half = Math.ceil(len / 2); return text.substring(0, half) + Array(Math.max(0, len - half)).fill('_').join(''); }
  } else {
    var pct = level === 1 ? 0.2 : 0.5;
    var cutAt = Math.ceil(text.length * pct);
    var space = text.indexOf(' ', cutAt);
    if (space !== -1 && space < cutAt + 20) cutAt = space;
    return text.substring(0, cutAt) + ' ...';
  }
}

function scUpdate(inputId) {
  var info = scActiveInputs[inputId];
  if (!info) return;
  var model = scModelAnswers[inputId] || '';
  var input = info.input;
  var ghost = info.ghost;
  var color = info.color;
  var wrap = input.closest('.sc-wrap');

  if (scLevel === 0 || !model) {
    ghost.innerHTML = '';
    if (color) color.innerHTML = '';
    if (wrap) { wrap.classList.remove('sc-active'); wrap.classList.remove('sc-coloring'); }
    return;
  }
  if (wrap) wrap.classList.add('sc-active');

  var userText = input.value;
  var isFill = input.tagName === 'INPUT';

  var display = scTruncate(model, scLevel, isFill);
  if (userText.length >= display.length) {
    ghost.innerHTML = '';
  } else {
    ghost.innerHTML = '<span class="sc-typed">' + escHtml(userText) + '</span><span class="sc-ghost">' + escHtml(display.substring(userText.length)) + '</span>';
  }

  if (scLevel === 3 && color && scKeywords[inputId] && userText.length > 0) {
    if (wrap) wrap.classList.add('sc-coloring');
    color.innerHTML = scColorize(userText, scKeywords[inputId]);
  } else {
    if (color) color.innerHTML = '';
    if (wrap) wrap.classList.remove('sc-coloring');
  }
}

function scColorize(text, kw) {
  var map = [];
  if (kw.term) map.push({ regex: new RegExp('(' + escRegex(kw.term) + ')', 'gi'), cls: 'sc-anchor-term' });
  if (kw.keys && kw.keys.length) {
    kw.keys.forEach(function(k) { map.push({ regex: new RegExp('(' + escRegex(k) + ')', 'gi'), cls: 'sc-anchor-key' }); });
  }
  if (kw.refs && kw.refs.length) {
    kw.refs.forEach(function(r) { map.push({ regex: new RegExp('(' + escRegex(r) + ')', 'gi'), cls: 'sc-anchor-ref' }); });
  }
  var result = escHtml(text);
  map.forEach(function(entry) {
    result = result.replace(entry.regex, function(match) { return '<span class="' + entry.cls + '">' + match + '</span>'; });
  });
  result = result.replace(/\n/g, '<br>');
  return result;
}

function scSyncFontSize(inputId, px) {
  var info = scActiveInputs[inputId];
  if (info && info.ghost) info.ghost.style.fontSize = px + 'px';
  if (info && info.color) info.color.style.fontSize = px + 'px';
}

// ── Scaffold in Freies Erinnern ──
function feScPopulate() {
  var sel = document.getElementById('fe-sc-select');
  if (!sel || sel.options.length > 1) return;
  GLOSSARY.forEach(function(g) {
    var eq = g.questions.find(function(q) { return q.type === 'explain'; });
    if (eq) {
      var opt = document.createElement('option');
      opt.value = g.term;
      opt.textContent = eq.q;
      sel.appendChild(opt);
    }
  });
}

function feScSelectQuestion() {
  var sel = document.getElementById('fe-sc-select');
  var term = sel.value;
  if (!term) { scDetach('fe-text'); return; }
  var g = GLOSSARY.find(function(x) { return x.term === term; });
  if (g) {
    var eq = g.questions.find(function(q) { return q.type === 'explain'; });
    var otherTerms = GLOSSARY.filter(function(x) { return x.term !== g.term; }).map(function(x) { return x.term; });
    scAttach('fe-text', g.definition, { term: g.term, keys: eq ? eq.keywords : [], refs: otherTerms });
  }
}

// ═══════════════════════════════════════════════════════════
// ── HTML INJECTION & INIT ──
// ═══════════════════════════════════════════════════════════
function glossaryInjectHTML() {
  // Inject GP overlay
  if (!document.getElementById('gp-overlay')) {
    var gpOv = document.createElement('div');
    gpOv.className = 'gp-overlay';
    gpOv.id = 'gp-overlay';
    gpOv.onclick = function(e) { if (e.target === gpOv) gpClose(); };
    gpOv.innerHTML = '<div class="gp-modal">' +
      '<div class="gp-head"><h3>\uD83C\uDFF0 Ged\u00e4chtnispalast</h3><button class="gp-close" onclick="gpClose()">\u2715</button></div>' +
      '<div class="gp-sub" id="gp-sub"></div>' +
      '<div class="gp-body" id="gp-body"></div>' +
    '</div>';
    document.body.appendChild(gpOv);
  }

  // Inject FE overlay
  if (!document.getElementById('fe-overlay')) {
    var feOv = document.createElement('div');
    feOv.className = 'fe-overlay';
    feOv.id = 'fe-overlay';
    feOv.onclick = function(e) { if (e.target === feOv) feClose(); };
    feOv.innerHTML = '<div class="fe-modal">' +
      '<div class="fe-head"><h3>\u270D\uFE0F Freies Erinnern</h3><button class="fe-close" onclick="feClose()">\u2715</button></div>' +
      '<div class="fe-sub">Schreibe auf, was du dir gemerkt hast \u2013 ohne nachzuschauen!</div>' +
      '<div class="fe-body">' +
        '<div class="fe-sizes"><label>Schrift:</label>' +
          '<button class="fe-sz" data-size="16" onclick="feSize(16)">S</button>' +
          '<button class="fe-sz active" data-size="22" onclick="feSize(22)">M</button>' +
          '<button class="fe-sz" data-size="28" onclick="feSize(28)">L</button>' +
        '</div>' +
        '<div class="sc-bar" id="fe-sc-bar"><label>St\u00fctze:</label>' +
          '<button class="sc-lvl" onclick="scSetLevel(0)">Aus</button>' +
          '<button class="sc-lvl" onclick="scSetLevel(1)">Leicht</button>' +
          '<button class="sc-lvl" onclick="scSetLevel(2)">Mittel</button>' +
          '<button class="sc-lvl" onclick="scSetLevel(3)">Stark</button>' +
        '</div>' +
        '<div class="sc-questions" id="fe-sc-questions" style="display:none"><label>\uD83D\uDCCB Beispielfrage:</label>' +
          '<select id="fe-sc-select" onchange="feScSelectQuestion()"><option value="">\u2014 Keine (frei schreiben) \u2014</option></select>' +
        '</div>' +
        '<div class="sc-wrap">' +
          '<div class="sc-ghost-layer" id="fe-text-ghost"></div>' +
          '<textarea class="fe-textarea" id="fe-text" placeholder="Was weisst du noch? Schreibe frei drauf los..." oninput="scUpdate(\'fe-text\')"></textarea>' +
        '</div>' +
        '<div class="fe-actions">' +
          '<button class="fe-btn fe-btn-save" onclick="feSave()">\uD83D\uDCBE Speichern</button>' +
          '<button class="fe-btn fe-btn-check" onclick="feCheck()">\uD83D\uDD0D Begriffe pr\u00fcfen</button>' +
          '<button class="fe-btn fe-btn-clear" onclick="feClear()">\uD83D\uDDD1\uFE0F Leeren</button>' +
        '</div>' +
        '<div id="fe-check-result"></div>' +
        '<div class="fe-divider">Gespeicherte Eintr\u00e4ge ( <span id="fe-count">0</span> )</div>' +
        '<div class="fe-entries" id="fe-entries"></div>' +
      '</div>' +
    '</div>';
    document.body.appendChild(feOv);
  }

  // Inject FE FAB button
  if (!document.getElementById('fe-fab')) {
    var fab = document.createElement('button');
    fab.className = 'fe-fab';
    fab.id = 'fe-fab';
    fab.onclick = feOpen;
    fab.innerHTML = '<span class="fe-fab-icon">\u270D\uFE0F</span> Freies Erinnern';
    document.body.appendChild(fab);
  }

  // Inject tooltip element
  if (!document.querySelector('.glossary-tooltip')) {
    var tt = document.createElement('div');
    tt.className = 'glossary-tooltip';
    document.body.appendChild(tt);
  }

  // Inject GP button into gl-header if missing
  var glHeader = document.querySelector('.gl-header');
  if (glHeader && typeof GP_STORIES !== 'undefined' && !glHeader.querySelector('.gp-btn')) {
    var closeBtn = glHeader.querySelector('.gl-close');
    if (closeBtn) {
      var gpBtn = document.createElement('button');
      gpBtn.className = 'gp-btn';
      gpBtn.onclick = function() { gpOpen(); };
      gpBtn.title = 'Ged\u00e4chtnispalast \u00f6ffnen';
      gpBtn.textContent = '\uD83C\uDFF0 Merkhilfe';
      // Wrap GP button + close button in flex container
      var wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;align-items:center;gap:8px';
      wrap.appendChild(gpBtn);
      closeBtn.parentNode.removeChild(closeBtn);
      wrap.appendChild(closeBtn);
      glHeader.appendChild(wrap);
    }
  }
}

function glossaryInitTooltips() {
  var glTooltip = document.querySelector('.glossary-tooltip');
  if (!glTooltip) return;

  document.addEventListener('mouseover', function(e) {
    var t = e.target.closest('.glossary-term');
    if (!t) { glTooltip.style.display = 'none'; return; }
    var g = GLOSSARY.find(function(x) { return x.term === t.dataset.term; });
    if (!g) return;
    var lv = glossaryState.levels[g.term] || 0;
    var labels = ['Noch nicht gelernt', 'Kennengelernt', '\u00dcberpr\u00fcft', 'Gemeistert \u2B50'];
    glTooltip.innerHTML = '<div class="gt-name">' + g.term + '</div><div class="gt-short">' + g.short + '</div><div class="gt-link">' + labels[lv] + ' \u00b7 Klicke zum Lernen \u2192</div>';
    var r = t.getBoundingClientRect();
    glTooltip.style.display = 'block';
    glTooltip.style.left = Math.max(8, r.left + r.width / 2 - 130) + 'px';
    glTooltip.style.top = (r.top - glTooltip.offsetHeight - 8) + 'px';
    if (parseFloat(glTooltip.style.top) < 8) glTooltip.style.top = (r.bottom + 8) + 'px';
  });

  document.addEventListener('mouseout', function(e) {
    if (!e.target.closest('.glossary-term')) glTooltip.style.display = 'none';
  });

  document.addEventListener('click', function(e) {
    var t = e.target.closest('.glossary-term');
    if (t) { e.preventDefault(); glossaryOpen(t.dataset.term); }
  });
}

// ── Master Init ──
(function glossaryInit() {
  glossaryInjectHTML();
  glossaryLoad();
  glossaryRenderGrid();
  glossaryHighlightTerms();
  glossaryInitTooltips();

  // Init scaffold level UI
  document.querySelectorAll('.sc-lvl').forEach(function(b, i) {
    b.classList.toggle('active', i % 4 === scLevel);
  });
  var feQ = document.getElementById('fe-sc-questions');
  if (feQ) feQ.style.display = scLevel > 0 ? 'flex' : 'none';
})();
