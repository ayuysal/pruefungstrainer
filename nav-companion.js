(function() {
'use strict';

// ── 1. Check for ?nav= parameter ──
var urlParams = new URLSearchParams(window.location.search);
var navBatchId = parseInt(urlParams.get('nav'));
if (!navBatchId) return;

// ── 2. BATCH_DATA ──
var BATCH_DATA = [
  { id:1, title:'OSI & TCP/IP Modelle', subject:'ITI21', trainer:'osi-tcpip.html', glossaryKey:'glossary-osi-tcpip',
    tasks:[
      { text:'OSI & TCP/IP Trainer komplett durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'Alle 7 OSI-Schichten benennen und beschreiben', type:'exercise' },
      { text:'TCP/IP-Modell den OSI-Schichten zuordnen', type:'exercise' }
    ]},
  { id:2, title:'EVA-Prinzip & Algorithmen', subject:'GDI01', trainer:'eva-algo-kontroll.html', glossaryKey:'glossary-eva-algo',
    tasks:[
      { text:'EVA & Algorithmen Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'Kontrollstrukturen (Sequenz, Selektion, Iteration) erklären', type:'exercise' },
      { text:'Einen Algorithmus als Pseudocode/Struktogramm darstellen', type:'exercise' }
    ]},
  { id:3, title:'Netzklassifikation & Vermittlung', subject:'ITI21', trainer:'netz-vermittlung.html', glossaryKey:'glossary-netz-vermittlung',
    tasks:[
      { text:'Netz-Vermittlung Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'LAN/MAN/WAN sicher unterscheiden', type:'exercise' },
      { text:'Leitungs- vs. Paketvermittlung erklären', type:'exercise' }
    ]},
  { id:4, title:'Zahlensysteme & Dualzahlen', subject:'GDI01', trainer:'dualzahlen-trainer.html', glossaryKey:'glossary-dualzahlen',
    tasks:[
      { text:'Dualzahlen-Trainer komplett durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'10 Umrechnungen Dez↔Dual↔Hex fehlerfrei', type:'exercise' },
      { text:'Zweierkomplement-Darstellung verstehen', type:'exercise' }
    ]},
  { id:5, title:'Entropie & Informationsgehalt', subject:'ITI22', trainer:'shannon-trainer.html', glossaryKey:'glossary-shannon',
    tasks:[
      { text:'Shannon/Entropie-Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'5 Entropie-Berechnungen fehlerfrei lösen', type:'exercise' },
      { text:'Informationsgehalt-Formel sicher anwenden', type:'exercise' }
    ]},
  { id:6, title:'Logik & Addierer', subject:'GDI01', trainer:'logik-addierer.html', glossaryKey:'glossary-logik-addierer',
    tasks:[
      { text:'Logik-Addierer Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'Wahrheitstabellen für AND, OR, NOT, XOR erstellen', type:'exercise' },
      { text:'Halb- und Volladdierer erklären', type:'exercise' }
    ]},
  { id:7, title:'Nyquist & Shannon-Hartley', subject:'ITI22', trainer:'nyquist-shannon.html', glossaryKey:'glossary-nyquist-shannon',
    tasks:[
      { text:'Nyquist-Shannon Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'Nyquist-Formel und Shannon-Hartley anwenden', type:'exercise' },
      { text:'Abtasttheorem erklären und berechnen', type:'exercise' }
    ]},
  { id:8, title:'Datenstrukturen', subject:'TGI01', trainer:'datenstrukturen.html', glossaryKey:'glossary-datenstrukturen',
    tasks:[
      { text:'Datenstrukturen-Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'Stack/Queue Operationen sicher durchführen', type:'exercise' },
      { text:'Binärbaum-Traversierungen (In/Pre/Post) erklären', type:'exercise' }
    ]},
  { id:9, title:'Ethernet & Übertragungsmedien', subject:'ITI23', trainer:'medien-ethernet.html', glossaryKey:'glossary-medien-ethernet',
    tasks:[
      { text:'Medien-Ethernet Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'Ethernet-Frame-Aufbau beschreiben', type:'exercise' },
      { text:'Kupfer vs. Glasfaser vs. Funk vergleichen', type:'exercise' }
    ]},
  { id:10, title:'Einfache Sortieralgorithmen', subject:'TGI01', trainer:'sortier-trainer.html', glossaryKey:'glossary-sortier',
    tasks:[
      { text:'Sortier-Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'Bubble, Selection, Insertion Sort per Hand ausführen', type:'exercise' },
      { text:'Best/Worst Case und Stabilität der 3 Algorithmen kennen', type:'exercise' }
    ]},
  { id:11, title:'Subnetting & CIDR', subject:'ITI24', trainer:'subnetting-trainer.html', glossaryKey:'glossary-subnetting',
    tasks:[
      { text:'Subnetting-Trainer komplett durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'5 Subnetting-Aufgaben fehlerfrei lösen', type:'exercise' },
      { text:'CIDR-Notation sicher beherrschen', type:'exercise' }
    ]},
  { id:12, title:'Quick/Merge/HeapSort', subject:'TGI02', trainer:'quickmergeheap-trainer.html', glossaryKey:'glossary-quickmergeheap',
    tasks:[
      { text:'QuickMergeHeap-Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'Pivot-Auswahl und Partitionierung bei QuickSort', type:'exercise' },
      { text:'MergeSort Divide-and-Conquer anwenden', type:'exercise' }
    ]},
  { id:13, title:'Hashing & Kollisionen', subject:'TGI02', trainer:'hashing-trainer.html', glossaryKey:'glossary-hashing',
    tasks:[
      { text:'Hashing-Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'Hashfunktion auf Beispieldaten anwenden', type:'exercise' },
      { text:'Verkettung vs. offene Adressierung erklären', type:'exercise' }
    ]},
  { id:14, title:'Formale Grammatiken & Chomsky', subject:'TGI06', trainer:'grammatiken-chomsky.html', glossaryKey:'glossary-grammatiken',
    tasks:[
      { text:'Grammatiken-Chomsky Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'Chomsky-Typ einer Grammatik bestimmen', type:'exercise' },
      { text:'Reguläre vs. kontextfreie Grammatik unterscheiden', type:'exercise' }
    ]},
  { id:15, title:'Switch, Router & VLAN', subject:'ITI25', trainer:'switch-router-vlan.html', glossaryKey:'glossary-switch-router-vlan',
    tasks:[
      { text:'Switch-Router-VLAN Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'STP (Spanning Tree Protocol) verstehen', type:'exercise' },
      { text:'VLAN-Konfiguration und Trunk-Ports erklären', type:'exercise' }
    ]},
  { id:16, title:'DEA & NEA Konstruktion', subject:'TGI06', trainer:'dea-nea-trainer.html', glossaryKey:'glossary-dea-nea',
    tasks:[
      { text:'DEA-NEA Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'Einen DEA für eine gegebene Sprache konstruieren', type:'exercise' },
      { text:'Einen NEA zeichnen und Akzeptanz prüfen', type:'exercise' }
    ]},
  { id:17, title:'TCP vs. UDP & Routing', subject:'ITI24', trainer:'tcp-udp-routing.html', glossaryKey:'glossary-tcp-udp-routing',
    tasks:[
      { text:'TCP-UDP-Routing Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'TCP-Handshake (SYN, SYN-ACK, ACK) erklären', type:'exercise' },
      { text:'Routing-Tabelle lesen und nachvollziehen', type:'exercise' }
    ]},
  { id:18, title:'O-Notation & Komplexität', subject:'TGI02', trainer:'o-notation-master.html', glossaryKey:'glossary-o-notation',
    tasks:[
      { text:'O-Notation Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'5 Algorithmen korrekt in O-Notation einstufen', type:'exercise' },
      { text:'Best/Average/Worst Case unterscheiden', type:'exercise' }
    ]},
  { id:19, title:'Kryptographie & RSA', subject:'ITI26', trainer:'kryptographie-rsa.html', glossaryKey:'glossary-kryptographie',
    tasks:[
      { text:'Kryptographie-RSA Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'RSA-Schlüsselerzeugung Schritt für Schritt', type:'exercise' },
      { text:'Symmetrisch vs. asymmetrisch vergleichen', type:'exercise' }
    ]},
  { id:20, title:'NEA→DEA & Regex', subject:'TGI06', trainer:'nea-dea-regex.html', glossaryKey:'glossary-nea-dea-regex',
    tasks:[
      { text:'NEA-DEA-Regex Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'Potenzmengenkonstruktion NEA→DEA durchführen', type:'exercise' },
      { text:'Regulären Ausdruck für eine Sprache erstellen', type:'exercise' }
    ]},
  { id:21, title:'MAC, CSMA & WLAN', subject:'ITI23', trainer:'mac-csma-wlan.html', glossaryKey:'glossary-mac-csma-wlan',
    tasks:[
      { text:'MAC-CSMA-WLAN Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'CSMA/CD vs. CSMA/CA erklären', type:'exercise' },
      { text:'MAC-Adressformat und -Funktion beschreiben', type:'exercise' }
    ]},
  { id:22, title:'Kellerautomaten & Turingmaschinen', subject:'TGI07', trainer:'kellerautomat-turing.html', glossaryKey:'glossary-kellerautomat-turing',
    tasks:[
      { text:'Kellerautomat-Turing Trainer durcharbeiten', type:'trainer' },
      { text:'Glossar: mind. 5 Begriffe auf Level 2+', type:'glossary', threshold:5 },
      { text:'PDA für eine kontextfreie Sprache erstellen', type:'exercise' },
      { text:'Turingmaschinen-Konzept erklären', type:'exercise' }
    ]},
  { id:23, title:'ITI-Leitfaden durcharbeiten', subject:'ITI', trainer:'lernleitfaden-iti.html', glossaryKey:null,
    tasks:[
      { text:'Lernleitfaden ITI öffnen und lesen', type:'trainer' },
      { text:'Alle Zusammenfassungen verstehen', type:'exercise' },
      { text:'15 Übungsaufgaben im Leitfaden lösen', type:'exercise' },
      { text:'Formelsammlung durchgehen, Schwächen notieren', type:'exercise' }
    ]},
  { id:24, title:'TGI-Leitfaden durcharbeiten', subject:'TGI', trainer:'lernleitfaden-tgi.html', glossaryKey:null,
    tasks:[
      { text:'Lernleitfaden TGI öffnen und lesen', type:'trainer' },
      { text:'Alle Zusammenfassungen verstehen', type:'exercise' },
      { text:'15 Übungsaufgaben im Leitfaden lösen', type:'exercise' },
      { text:'Formelsammlung durchgehen, Schwächen notieren', type:'exercise' }
    ]},
  { id:25, title:'Generalprobe & Schwächen', subject:'Mix', trainer:null, glossaryKey:null,
    tasks:[
      { text:'Alle Glossare auf Level 2+ prüfen', type:'exercise' },
      { text:'Schwächste 5 Themen identifizieren und wiederholen', type:'exercise' },
      { text:'Alle Trainer mit Höchster Priorität nochmals durchgehen', type:'exercise' },
      { text:'Probeklausur simulieren (Timer: 90 Min)', type:'exercise' }
    ]}
];

// ── 3. STEP DEFINITIONS ──
var STEPS = {
  1: [
    { hint:'Lies die Theorie zu beiden Modellen. Vergleiche OSI (7 Schichten) mit TCP/IP (4 Schichten).', scroll:'.models, .layers-grid' },
    { hint:'Scrolle zum Glossar unten und lerne mind. 5 Begriffe auf Level 2+.', scroll:'.glossary-section' },
    { hint:'Klicke auf jede OSI-Schicht in der interaktiven Übersicht für Details.', scroll:'.models' },
    { hint:'Nutze die Zuordnungsspalte um TCP/IP den OSI-Schichten zuzuordnen.', scroll:'.differences' }
  ],
  2: [
    { hint:'Arbeite alle Abschnitte durch: EVA-Prinzip, Algorithmusbegriff, Kontrollstrukturen.', scroll:'header' },
    { hint:'Scrolle zum Glossar am Seitenende und lerne die Fachbegriffe.', scroll:'.glossary-section' },
    { hint:'Lies den Abschnitt Kontrollstrukturen und erkläre Sequenz, Selektion, Iteration.', scroll:null },
    { hint:'Nutze den interaktiven Bereich um einen Algorithmus als Pseudocode darzustellen.', scroll:null }
  ],
  3: [
    { hint:'Beginne mit dem Abschnitt Netzklassifikation und arbeite dich durch alle Karten.', scroll:'header' },
    { hint:'Scrolle zum Glossar-Trainer und lerne die Begriffe.', scroll:'.glossary-section' },
    { hint:'Lies die Netzklassifikation nach Reichweite: LAN, MAN, WAN unterscheiden.', scroll:null },
    { hint:'Vergleiche Leitungsvermittlung mit Paketvermittlung anhand der Karten.', scroll:null }
  ],
  4: [
    { hint:'Nutze den Umrechner für alle Zahlensysteme (Dezimal, Dual, Hex, Oktal).', scroll:'header' },
    { hint:'Scrolle zum Glossar und lerne die Fachbegriffe.', scroll:'.glossary-section' },
    { hint:'Mache 10 Umrechnungen im Übungsmodus: Dez↔Dual↔Hex.', scroll:null },
    { hint:'Lies die Theorie zum Zweierkomplement und probiere Beispiele aus.', scroll:null }
  ],
  5: [
    { hint:'Lies die Kernformeln (Informationsgehalt, Entropie) und nutze den Rechner.', scroll:'header' },
    { hint:'Scrolle zum Glossar und lerne die Fachbegriffe.', scroll:'.glossary-section' },
    { hint:'Wechsle zum Übungsbereich und löse 5 Entropie-Aufgaben fehlerfrei.', scroll:null },
    { hint:'Prüfe ob du die Informationsgehalt-Formel sicher anwenden kannst.', scroll:null }
  ],
  6: [
    { hint:'Arbeite die Abschnitte Logische Gatter und Addierer durch.', scroll:'header' },
    { hint:'Scrolle zum Glossar am Seitenende.', scroll:'.glossary-section' },
    { hint:'Erstelle Wahrheitstabellen für AND, OR, NOT, XOR mit den interaktiven Gattern.', scroll:null },
    { hint:'Lies den Abschnitt Halb- & Volladdierer und erkläre den Unterschied.', scroll:null }
  ],
  7: [
    { hint:'Beginne mit den Kernformeln: Nyquist, Shannon-Hartley, Abtasttheorem.', scroll:'header' },
    { hint:'Scrolle zum Glossar und lerne die Fachbegriffe.', scroll:'.glossary-section' },
    { hint:'Wende beide Formeln im Rechner auf verschiedene Szenarien an.', scroll:null },
    { hint:'Nutze den Abtast-Visualizer und erkläre das Abtasttheorem.', scroll:null }
  ],
  8: [
    { hint:'Wechsle durch alle Tabs: Stack, Queue, Liste – nutze die Simulatoren.', scroll:'.ds-tabs' },
    { hint:'Scrolle zum Begriffe-lernen Abschnitt.', scroll:'.glossary-section' },
    { hint:'Im Stack-Tab: Push, Pop, Peek ausführen. Im Queue-Tab: Enqueue, Dequeue.', scroll:'.ds-tabs' },
    { hint:'Lies die Vergleichstabelle zu Baum-Traversierungen (In/Pre/Post-Order).', scroll:null }
  ],
  9: [
    { hint:'Lies die Referenz-Karten zu Übertragungsmedien und Ethernet-Standards.', scroll:'header' },
    { hint:'Scrolle zum Glossar-Trainer.', scroll:'.glossary-section' },
    { hint:'Beschreibe den Ethernet-Frame-Aufbau anhand der Referenz.', scroll:null },
    { hint:'Vergleiche die Medien-Karten: Kupfer, Glasfaser, Funk.', scroll:null }
  ],
  10: [
    { hint:'Lies die drei Algorithmen und nutze den Schritt-für-Schritt Visualizer.', scroll:'header' },
    { hint:'Scrolle zum Begriffe-lernen Abschnitt.', scroll:'.glossary-section' },
    { hint:'Führe Bubble, Selection, Insertion Sort im Visualizer per Hand aus.', scroll:null },
    { hint:'Vergleiche Best/Worst Case und Stabilität in der Übersichtstabelle.', scroll:null }
  ],
  11: [
    { hint:'Lies die Referenz-Karten und probiere den Subnet-Rechner aus.', scroll:'header' },
    { hint:'Scrolle zum Glossar-Trainer am Seitenende.', scroll:'.glossary-section' },
    { hint:'Wechsle in den Übungsmodus: löse 5 Aufgaben (Netz, Broadcast, Hosts, Prefix).', scroll:'.tabs' },
    { hint:'Nutze den Bit-Level Visualizer mit dem Schieberegler für verschiedene CIDR-Prefixe.', scroll:null }
  ],
  12: [
    { hint:'Lies alle drei Algorithmen-Abschnitte und nutze den Visualizer.', scroll:'header' },
    { hint:'Scrolle zum Glossar.', scroll:'.glossary-section' },
    { hint:'Führe QuickSort im Visualizer aus und beobachte die Pivot-Auswahl.', scroll:null },
    { hint:'Nutze den MergeSort-Visualizer und beobachte Divide-and-Conquer.', scroll:null }
  ],
  13: [
    { hint:'Lies die Referenz-Karten und nutze den Hash-Rechner.', scroll:'header' },
    { hint:'Scrolle zum Glossar.', scroll:'.glossary-section' },
    { hint:'Berechne Hashwerte für verschiedene Schlüssel im Rechner.', scroll:null },
    { hint:'Vergleiche Verkettung vs. offene Adressierung im Visualizer.', scroll:null }
  ],
  14: [
    { hint:'Lies die Theorie zur Chomsky-Hierarchie und den 4 Grammatik-Typen.', scroll:'header' },
    { hint:'Scrolle zum Glossar am Seitenende.', scroll:'.glossary-section' },
    { hint:'Bestimme den Chomsky-Typ verschiedener Beispielgrammatiken interaktiv.', scroll:null },
    { hint:'Vergleiche reguläre und kontextfreie Grammatiken anhand der Beispiele.', scroll:null }
  ],
  15: [
    { hint:'Lies die Referenz-Karten zu Switch, Router und VLAN.', scroll:'header' },
    { hint:'Scrolle zum Glossar-Trainer.', scroll:'.glossary-section' },
    { hint:'Lies den STP-Abschnitt und verstehe die Funktionsweise.', scroll:null },
    { hint:'Lies die VLAN-Konfiguration und erkläre Trunk-Ports.', scroll:null }
  ],
  16: [
    { hint:'Lies die Referenz und nutze den interaktiven Automaten-Simulator.', scroll:'header' },
    { hint:'Scrolle zum Fachbegriffe-Glossar.', scroll:'.glossary-section' },
    { hint:'Konstruiere einen DEA im Simulator für eine gegebene Sprache.', scroll:null },
    { hint:'Zeichne einen NEA und prüfe die Akzeptanz von Wörtern.', scroll:null }
  ],
  17: [
    { hint:'Lies die Referenz-Karten und nutze den TCP vs. UDP Vergleich.', scroll:'header' },
    { hint:'Scrolle zum Glossar.', scroll:'.glossary-section' },
    { hint:'Lies die TCP-Handshake-Erklärung (SYN, SYN-ACK, ACK) im Detail.', scroll:null },
    { hint:'Nutze den Übungsmodus und löse Routing-Tabellen-Aufgaben.', scroll:null }
  ],
  18: [
    { hint:'Lies die Referenz-Karten und nutze den Wachstumsraten-Visualizer.', scroll:'header' },
    { hint:'Scrolle zum Glossar-Trainer.', scroll:'.glossary-section' },
    { hint:'Wechsle in den Übungsmodus und stufe 5 Algorithmen in O-Notation ein.', scroll:null },
    { hint:'Nutze die Vergleichstabelle und verstehe Best/Average/Worst Case.', scroll:null }
  ],
  19: [
    { hint:'Lies die Referenz-Karten und nutze den RSA-Rechner.', scroll:'header' },
    { hint:'Scrolle zum Glossar.', scroll:'.glossary-section' },
    { hint:'Führe die RSA-Schlüsselerzeugung Schritt für Schritt im Rechner durch.', scroll:null },
    { hint:'Vergleiche symmetrische und asymmetrische Verfahren in den Referenz-Karten.', scroll:null }
  ],
  20: [
    { hint:'Lies die Referenz und nutze die interaktive Potenzmengenkonstruktion.', scroll:'header' },
    { hint:'Scrolle zum Glossar.', scroll:'.glossary-section' },
    { hint:'Führe eine Potenzmengenkonstruktion NEA→DEA im Simulator durch.', scroll:null },
    { hint:'Nutze den Regex-Tester und erstelle reguläre Ausdrücke für Beispielsprachen.', scroll:null }
  ],
  21: [
    { hint:'Lies die Referenz-Karten und nutze den CSMA-Visualizer.', scroll:'header' },
    { hint:'Scrolle zum Glossar.', scroll:'.glossary-section' },
    { hint:'Lies den CSMA/CD vs. CSMA/CA Vergleich und erkläre die Unterschiede.', scroll:null },
    { hint:'Beschreibe das MAC-Adressformat und seine Funktion.', scroll:null }
  ],
  22: [
    { hint:'Lies die Referenz und nutze PDA- und Turingmaschinen-Simulator.', scroll:'header' },
    { hint:'Scrolle zum Glossar.', scroll:'.glossary-section' },
    { hint:'Erstelle im PDA-Simulator einen Kellerautomaten für eine kontextfreie Sprache.', scroll:null },
    { hint:'Lies die Referenz zum Turingmaschinen-Konzept und probiere den Simulator.', scroll:null }
  ],
  23: [
    { hint:'Öffne den Leitfaden und lies die Übersicht-Sektion.', scroll:'header' },
    { hint:'Wechsle zum Tab Zusammenfassungen und lies alle ITI-Kapitel.', scroll:null },
    { hint:'Wechsle zum Tab Übungsaufgaben und löse mindestens 15 Aufgaben.', scroll:null },
    { hint:'Wechsle zum Tab Formeln und notiere deine Schwächen.', scroll:null }
  ],
  24: [
    { hint:'Öffne den Leitfaden und lies die Übersicht-Sektion.', scroll:'header' },
    { hint:'Wechsle zum Tab Zusammenfassungen und lies alle TGI-Kapitel.', scroll:null },
    { hint:'Wechsle zum Tab Übungsaufgaben und löse mindestens 15 Aufgaben.', scroll:null },
    { hint:'Wechsle zum Tab Formeln und notiere deine Schwächen.', scroll:null }
  ]
};

// ── 4. Find current batch ──
var batch = null;
for (var i = 0; i < BATCH_DATA.length; i++) {
  if (BATCH_DATA[i].id === navBatchId) { batch = BATCH_DATA[i]; break; }
}
if (!batch || !batch.trainer) return;
var steps = STEPS[navBatchId] || null;

// ── 5. Inject CSS ──
var style = document.createElement('style');
style.textContent = [
  '.nc-bar{position:sticky;top:0;z-index:9999;background:rgba(20,23,30,.97);backdrop-filter:blur(16px);border-bottom:2px solid #6c63ff;font-family:"Outfit",sans-serif;box-shadow:0 4px 24px rgba(0,0,0,.4)}',
  '.nc-bar.nc-min .nc-body{max-height:0;overflow:hidden;padding:0}',
  '.nc-bar.nc-min .nc-chev{transform:rotate(180deg)}',
  '.nc-hdr{display:flex;align-items:center;gap:12px;padding:10px 20px;cursor:pointer;user-select:none}',
  '.nc-hdr:hover{background:rgba(255,255,255,.02)}',
  '.nc-num{font-family:"JetBrains Mono",monospace;font-size:11px;font-weight:700;width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}',
  '.nc-num.nc-iti{background:rgba(56,189,248,.12);color:#38bdf8}',
  '.nc-num.nc-tgi{background:rgba(167,139,250,.12);color:#a78bfa}',
  '.nc-num.nc-gdi{background:rgba(251,191,36,.12);color:#fbbf24}',
  '.nc-num.nc-mix{background:rgba(251,146,60,.12);color:#fb923c}',
  '.nc-ttl{font-size:14px;font-weight:600;color:#e2e8f0;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
  '.nc-pill{font-family:"JetBrains Mono",monospace;font-size:11px;padding:4px 10px;border-radius:6px;background:rgba(255,255,255,.04);color:#64748b;white-space:nowrap}',
  '.nc-pill.nc-ok{background:rgba(81,207,102,.12);color:#51cf66}',
  '.nc-back{font-family:"Outfit",sans-serif;font-size:11px;font-weight:600;padding:6px 14px;border-radius:8px;border:1px solid rgba(108,99,255,.3);background:rgba(108,99,255,.08);color:#6c63ff;cursor:pointer;text-decoration:none;transition:all .2s;white-space:nowrap}',
  '.nc-back:hover{background:rgba(108,99,255,.15);border-color:#6c63ff}',
  '.nc-chev{color:#64748b;font-size:12px;transition:transform .3s;flex-shrink:0}',
  '.nc-body{max-height:500px;overflow:hidden;transition:max-height .4s ease,padding .3s;border-top:1px solid #232832;padding:8px 20px 12px}',
  '.nc-tasks{list-style:none;margin:0;padding:0}',
  '.nc-task{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.03)}',
  '.nc-task:last-child{border-bottom:none}',
  '.nc-chk{width:18px;height:18px;border:2px solid #232832;border-radius:5px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;transition:all .2s;background:none}',
  '.nc-chk:hover{border-color:#6c63ff}',
  '.nc-chk.nc-on{background:#51cf66;border-color:#51cf66}',
  '.nc-chk.nc-on::after{content:"\\2713";color:#fff;font-size:11px;font-weight:700}',
  '.nc-info{flex:1;min-width:0}',
  '.nc-txt{font-size:13px;color:#e2e8f0;line-height:1.4}',
  '.nc-txt.nc-done{color:#64748b;text-decoration:line-through}',
  '.nc-hint{font-size:11px;color:#64748b;margin-top:3px;line-height:1.4;font-weight:500}',
  '.nc-hint.nc-cur{color:#38bdf8}',
  '.nc-gl{font-family:"JetBrains Mono",monospace;font-size:10px;padding:2px 8px;border-radius:4px;white-space:nowrap;flex-shrink:0}',
  '.nc-gl.nc-glok{background:rgba(81,207,102,.1);color:#51cf66}',
  '.nc-gl.nc-glwip{background:rgba(56,189,248,.1);color:#38bdf8}',
  '.nc-scroll{font-family:"JetBrains Mono",monospace;font-size:10px;padding:3px 8px;border-radius:4px;border:1px solid #232832;background:rgba(255,255,255,.03);color:#64748b;cursor:pointer;transition:all .2s;white-space:nowrap;flex-shrink:0}',
  '.nc-scroll:hover{border-color:#6c63ff;color:#e2e8f0}',
  '.nc-conf{position:fixed;inset:0;pointer-events:none;z-index:10000;overflow:hidden}',
  '.nc-cp{position:absolute;width:10px;height:10px;top:-10px;animation:ncFall 3s ease-out forwards}',
  '@keyframes ncFall{0%{transform:translateY(0) rotate(0) scale(1);opacity:1}100%{transform:translateY(100vh) rotate(720deg) scale(0);opacity:0}}',
  '@media(max-width:600px){.nc-hdr{padding:8px 12px;gap:8px}.nc-ttl{font-size:12px}.nc-back{font-size:10px;padding:4px 10px}.nc-body{padding:6px 12px 10px}}'
].join('\n');
document.head.appendChild(style);

// ── 6. Inject HTML ──
var subCls = batch.subject.startsWith('ITI') ? 'nc-iti' : batch.subject.startsWith('TGI') ? 'nc-tgi' : batch.subject.startsWith('GDI') ? 'nc-gdi' : 'nc-mix';
var bar = document.createElement('div');
bar.className = 'nc-bar';
bar.id = 'nc-bar';
bar.innerHTML =
  '<div class="nc-hdr" id="nc-hdr">' +
    '<div class="nc-num ' + subCls + '">#' + batch.id + '</div>' +
    '<div class="nc-ttl">' + batch.title + '</div>' +
    '<div class="nc-pill" id="nc-pill">0/' + batch.tasks.length + '</div>' +
    '<a class="nc-back" href="lern-navigator.html" onclick="event.stopPropagation()">← Navigator</a>' +
    '<span class="nc-chev" id="nc-chev">▼</span>' +
  '</div>' +
  '<div class="nc-body" id="nc-body">' +
    '<ul class="nc-tasks" id="nc-tasks"></ul>' +
  '</div>';

var confettiEl = document.createElement('div');
confettiEl.className = 'nc-conf';
confettiEl.id = 'nc-conf';

function insertBar() {
  document.body.insertBefore(bar, document.body.firstChild);
  document.body.appendChild(confettiEl);
  document.getElementById('nc-hdr').addEventListener('click', toggleBar);
  render();
  startPolling();
}

// ── 7. State ──
function loadTask(idx) {
  return localStorage.getItem('navigator-batch-' + batch.id + '-task-' + idx) === '1';
}
function saveTask(idx, val) {
  localStorage.setItem('navigator-batch-' + batch.id + '-task-' + idx, val ? '1' : '0');
}
function readGlossary() {
  if (!batch.glossaryKey) return { total:0, mastered:0 };
  try {
    var data = JSON.parse(localStorage.getItem(batch.glossaryKey) || '{}');
    var total = 0, mastered = 0;
    for (var k in data) {
      total++;
      var v = data[k];
      var lv = typeof v === 'number' ? v : (v && typeof v.level === 'number' ? v.level : 0);
      if (lv >= 2) mastered++;
    }
    return { total:total, mastered:mastered };
  } catch(e) { return { total:0, mastered:0 }; }
}

function allDone() {
  for (var i = 0; i < batch.tasks.length; i++) { if (!loadTask(i)) return false; }
  return true;
}

function firstUnchecked() {
  for (var i = 0; i < batch.tasks.length; i++) { if (!loadTask(i)) return i; }
  return -1;
}

// ── 8. Render ──
function render() {
  var list = document.getElementById('nc-tasks');
  var done = 0;
  var fu = firstUnchecked();
  var html = '';

  for (var i = 0; i < batch.tasks.length; i++) {
    var t = batch.tasks[i];
    var checked = loadTask(i);
    if (checked) done++;
    var step = steps ? steps[i] : null;
    var isCurrent = !checked && i === fu;

    var extra = '';
    if (t.type === 'glossary' && batch.glossaryKey) {
      var gp = readGlossary();
      var met = gp.mastered >= (t.threshold || 5);
      extra = '<span class="nc-gl ' + (met ? 'nc-glok' : 'nc-glwip') + '">' + gp.mastered + '/' + gp.total + '</span>';
    }

    var scrollBtn = '';
    if (step && step.scroll && !checked) {
      var sel = step.scroll.split(',')[0].trim();
      scrollBtn = '<button class="nc-scroll" data-scroll="' + sel + '">Anzeigen</button>';
    }

    var hintHtml = '';
    if (step && step.hint && !checked) {
      hintHtml = '<div class="nc-hint' + (isCurrent ? ' nc-cur' : '') + '">' +
        (isCurrent ? '▸ ' : '') + step.hint + '</div>';
    }

    html += '<li class="nc-task">' +
      '<div class="nc-chk' + (checked ? ' nc-on' : '') + '" data-idx="' + i + '"></div>' +
      '<div class="nc-info">' +
        '<div class="nc-txt' + (checked ? ' nc-done' : '') + '">' + t.text + '</div>' +
        hintHtml +
      '</div>' +
      extra + scrollBtn +
    '</li>';
  }
  list.innerHTML = html;

  // Bind events
  var checks = list.querySelectorAll('.nc-chk');
  for (var c = 0; c < checks.length; c++) {
    checks[c].addEventListener('click', onCheck);
  }
  var scrollBtns = list.querySelectorAll('.nc-scroll');
  for (var s = 0; s < scrollBtns.length; s++) {
    scrollBtns[s].addEventListener('click', onScroll);
  }

  // Update pill
  var pill = document.getElementById('nc-pill');
  pill.textContent = done + '/' + batch.tasks.length;
  pill.className = 'nc-pill' + (done === batch.tasks.length ? ' nc-ok' : '');
}

// ── 9. Events ──
function toggleBar() {
  document.getElementById('nc-bar').classList.toggle('nc-min');
}

function onCheck(e) {
  var idx = parseInt(e.currentTarget.getAttribute('data-idx'));
  var newVal = !loadTask(idx);
  saveTask(idx, newVal);
  if (newVal) updateStreak();
  render();
  if (newVal && allDone()) {
    localStorage.setItem('navigator-batch-' + batch.id + '-done-at', new Date().toISOString());
    fireConfetti();
  }
}

function onScroll(e) {
  e.stopPropagation();
  var sel = e.currentTarget.getAttribute('data-scroll');
  var el = document.querySelector(sel);
  if (el) {
    var barH = document.getElementById('nc-bar').offsetHeight;
    var top = el.getBoundingClientRect().top + window.scrollY - barH - 10;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
}

function updateStreak() {
  try {
    var s = JSON.parse(localStorage.getItem('navigator-streak') || '{}');
    var today = new Date().toISOString().slice(0, 10);
    if (s.lastDate === today) return;
    var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    s.current = s.lastDate === yesterday ? (s.current || 0) + 1 : 1;
    s.lastDate = today;
    if ((s.current || 0) > (s.best || 0)) s.best = s.current;
    localStorage.setItem('navigator-streak', JSON.stringify(s));
  } catch(e) {}
}

function fireConfetti() {
  var c = document.getElementById('nc-conf');
  var colors = ['#6c63ff','#38bdf8','#51cf66','#fbbf24','#ff6b6b','#a78bfa','#fb923c'];
  for (var i = 0; i < 60; i++) {
    var p = document.createElement('div');
    p.className = 'nc-cp';
    var col = colors[Math.floor(Math.random() * colors.length)];
    var sz = 6 + Math.random() * 8;
    p.style.cssText = 'left:' + (Math.random()*100) + '%;width:' + sz + 'px;height:' + sz + 'px;background:' + col +
      ';border-radius:' + (Math.random()>.5?'50%':'2px') + ';animation-delay:' + (Math.random()*.8) + 's;animation-duration:' + (2+Math.random()*2) + 's';
    c.appendChild(p);
  }
  setTimeout(function() { c.innerHTML = ''; }, 4000);
}

// ── 10. Glossary Polling ──
function startPolling() {
  if (!batch.glossaryKey) return;
  setInterval(function() {
    for (var i = 0; i < batch.tasks.length; i++) {
      var t = batch.tasks[i];
      if (t.type === 'glossary' && !loadTask(i)) {
        var gp = readGlossary();
        if (gp.mastered >= (t.threshold || 5)) {
          saveTask(i, true);
          render();
          if (allDone()) {
            localStorage.setItem('navigator-batch-' + batch.id + '-done-at', new Date().toISOString());
            fireConfetti();
          }
        }
      }
    }
    // Also refresh glossary badge display
    var badges = document.querySelectorAll('.nc-gl');
    if (badges.length) {
      var gp = readGlossary();
      var met = gp.mastered >= 5;
      badges[0].className = 'nc-gl ' + (met ? 'nc-glok' : 'nc-glwip');
      badges[0].textContent = gp.mastered + '/' + gp.total;
    }
  }, 3000);
}

// ── 11. Init ──
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', insertBar);
} else {
  insertBar();
}

})();
