# Prüfungsvorbereitung: Theoretische Grundlagen der Informatik

## Studienhefter: GDI01, TGI01, TGI02, TGI06 + (TGI07 ausstehend)

---

# TEIL A: Übersicht & Lernstrategie

## A.1 Die Studienhefter im Überblick

| Heft | Titel | Umfang | Schwerpunkt |
|------|-------|--------|-------------|
| **GDI01** | Einführung in die Informatik | ~36.500 Wörter | EVA-Prinzip, Algorithmen, Turing-Maschine, Von-Neumann, Dualzahlen, Logische Schaltungen |
| **TGI01** | Datenstrukturen und Algorithmen | ~29.500 Wörter | Datentypen (Stack, Queue, Liste), Sortieralgorithmen (Bubble/Selection/Insertion), Suche (Fibonacci, interpolatorisch), Bäume, Graphen |
| **TGI02** | Algorithmen und Komplexität | ~31.700 Wörter | Höheres Sortieren (Quick/Merge/Heap/Radix), Hashing, Matching (KMP, Boyer-Moore, Rabin-Karp), Komplexitätsanalyse, O-Notation, Master-Theorem, P/NP |
| **TGI06** | Formale Sprachen und abstrakte Automaten 1 | ~24.600 Wörter | Alphabete, Wörter, Sprachen, Formale Grammatiken, Chomsky-Hierarchie, Compiler/Interpreter, DEA, NEA, Reguläre Ausdrücke |
| **TGI07** | *(noch nicht hochgeladen)* | – | Voraussichtlich: Kellerautomaten, kontextfreie Sprachen, Turingmaschinen |

## A.2 Empfohlene Lernreihenfolge (Abhängigkeitskette)

```
GDI01 (Grundlagen) → TGI01 (Datenstrukturen) → TGI02 (Algorithmen & Komplexität)
                                                         ↓
                                            TGI06 (Formale Sprachen) → TGI07 (Automaten 2)
```

GDI01 liefert die Grundlagen (Algorithmusbegriff, Dualzahlen, Logik), auf denen TGI01 und TGI02 aufbauen. TGI06 ist thematisch relativ unabhängig von TGI01/02, aber die Chomsky-Hierarchie und Automatentheorie sind ein eigenständiger Block, der mit TGI07 abgeschlossen wird.

## A.3 Prioritätsmatrix (Prüfungsrelevanz)

### 🔴 Höchste Priorität (definitiv prüfungsrelevant)
- **Sortieralgorithmen**: QuickSort, MergeSort, HeapSort durchführen können (TGI02 Kap.1)
- **Komplexitätsanalyse**: O-Notation, Worst/Best/Average Case bestimmen (TGI02 Kap.5-6)
- **Master-Theorem**: Alle 3 Fälle + Chip-and-Conquer anwenden (TGI02 Kap.6.3)
- **Chomsky-Hierarchie**: Typen 0-3 mit Eigenschaften und Automaten (TGI06 Kap.2.5)
- **DEA/NEA**: Konstruktion, Zustandstabellen, NEA→DEA-Konvertierung (TGI06 Kap.4)
- **Reguläre Ausdrücke**: Erstellen und in Automaten umwandeln (TGI06 Kap.4.8)
- **Dualzahlen**: Umrechnung Dezimal↔Dual, Addition, Subtraktion (GDI01 Kap.4)
- **Datenstrukturen**: Stack, Queue, verkettete Liste – Operationen kennen (TGI01 Kap.4)

### 🟡 Hohe Priorität
- Hashing: Divisionsrest, Kollisionsbehandlung (TGI02 Kap.3)
- Matching-Algorithmen: KMP, Boyer-Moore (TGI02 Kap.4)
- Bäume und Graphen: Traversierung, Adjazenzmatrix (TGI01 Kap.6)
- Turing-Maschine und Von-Neumann-Architektur (GDI01 Kap.3)
- Formale Grammatiken: Ableitungen, Ableitungsbäume (TGI06 Kap.2)
- Logische Schaltungen: AND, OR, NOT, Halb-/Volladdierer (GDI01 Kap.5)
- P/NP und Komplexitätsklassen (TGI02 Kap.6.4/7)

### 🟢 Grundwissen
- EVA-Prinzip, Algorithmenbegriff (GDI01 Kap.1)
- Programmierparadigmen: Strukturiert vs. Objektorientiert (GDI01 Kap.2)
- Hexadezimal- und Oktalzahlen (GDI01 Kap.4.4)
- Algebren und formale Definitionen (TGI01 Kap.3)
- ASCII/Unicode (GDI01 Kap.4.5)
- Compiler vs. Interpreter, T-Diagramme (TGI06 Kap.3)

---

# TEIL B: Wissenszusammenfassungen nach Heft

---

## B.1 GDI01 – Einführung in die Informatik

### Kapitel 1: Informatik und Algorithmen

**EVA-Prinzip**: Eingabe → Verarbeitung → Ausgabe – Grundprinzip jeder Datenverarbeitung.

**Algorithmus** – Fünf Eigenschaften:
1. **Endlichkeit** (Finitheit): Endliche Beschreibung
2. **Ausführbarkeit**: Jeder Schritt ist ausführbar
3. **Eindeutigkeit** (Determiniertheit): Gleiche Eingabe → gleiches Ergebnis
4. **Terminierung**: Algorithmus endet nach endlich vielen Schritten
5. **Allgemeinheit**: Löst eine Klasse von Problemen, nicht nur eine Instanz

**Drei Schritte der Programmerstellung**: Problemanalyse → Algorithmenentwurf → Implementierung

### Kapitel 2: Umsetzung von Algorithmen

**Kontrollstrukturen** (strukturierte Programmierung):
- **Sequenz**: Anweisungen hintereinander
- **Selektion** (if/else): Bedingte Ausführung
- **Iteration** (while/for): Wiederholung

**Objektorientierung**: Klassen = Baupläne mit Attributen + Methoden; Objekte = konkrete Instanzen.
Schlüsselkonzepte: Kapselung, Vererbung, Polymorphie.

**Komplexität** (Vorgriff): Unterschiedliche Algorithmen haben unterschiedlichen Ressourcenverbrauch. Die Anzahl der Schritte wächst je nach Algorithmus mit der Eingabegröße n.

### Kapitel 3: Rechner

**Analytische Maschine** (Babbage, ca. 1837): Erster Entwurf eines programmierbaren Rechners – Bestandteile: Mill (Rechenwerk), Store (Speicher), Lochkarten (Programm/Daten). Nie fertiggestellt.

**Turing-Maschine** (1936): Theoretisches Berechnungsmodell.
- Bestandteile: unendliches Band, Lese-/Schreibkopf, endliche Zustandsmenge, Übergangsfunktion
- Church-Turing-These: Alles, was intuitiv berechenbar ist, ist auch von einer Turing-Maschine berechenbar.
- Halteproblem: Es gibt kein allgemeines Verfahren, das für beliebige Programme entscheidet, ob sie terminieren.

**Von-Neumann-Architektur** (1945):
- Bestandteile: **Rechenwerk** (ALU), **Steuerwerk**, **Speicher** (Daten UND Programme), **Ein-/Ausgabewerk**
- Kernprinzip: Programme und Daten liegen im gleichen Speicher (Programmspeicherkonzept)
- Befehle werden sequenziell abgearbeitet (Von-Neumann-Flaschenhals)
- Befehlszyklus: Fetch → Decode → Execute

### Kapitel 4: Dualzahlen ⭐

**Stellenwertsystem**: Jede Ziffer hat einen Wert abhängig von ihrer Position.
- Dezimal: aₙ·10ⁿ + aₙ₋₁·10ⁿ⁻¹ + ... + a₁·10 + a₀
- Dual: aₙ·2ⁿ + aₙ₋₁·2ⁿ⁻¹ + ... + a₁·2 + a₀

**Dual → Dezimal**: Zweierpotenzen aufsummieren.
- 10110₂ = 1·16 + 0·8 + 1·4 + 1·2 + 0·1 = **22**

**Dezimal → Dual**: Sukzessive Division durch 2, Reste von unten nach oben ablesen.
- 42 ÷ 2 = 21 R**0**, 21÷2=10 R**1**, 10÷2=5 R**0**, 5÷2=2 R**1**, 2÷2=1 R**0**, 1÷2=0 R**1** → 42 = **101010₂**

**Duale Addition**: Wie dezimal, aber Übertrag schon bei 1+1=10₂.
```
  1 0 1 1 (11)
+ 0 1 1 0  (6)
---------
1 0 0 0 1 (17)
```

**Duale Subtraktion** (Zweierkomplement):
1. Einerkomplement bilden (alle Bits umkehren)
2. +1 addieren = Zweierkomplement
3. Addition durchführen

**Hexadezimal** (Basis 16): Ziffern 0-9, A-F. Jede Hex-Ziffer = 4 Bit.
- 0xAF = 10·16 + 15 = 175
- Dual → Hex: Je 4 Bit von rechts gruppieren: 1010 1111₂ = AF₁₆

**Oktal** (Basis 8): Ziffern 0-7. Jede Oktalziffer = 3 Bit.

### Kapitel 5: Logische Schaltungen ⭐

| Gatter | Symbol | Funktion | Wahrheitstabelle (2 Inputs) |
|--------|--------|----------|----------------------------|
| **AND** (UND) | ∧ | Output = 1 nur wenn ALLE Inputs = 1 | 0∧0=0, 0∧1=0, 1∧0=0, **1∧1=1** |
| **OR** (ODER) | ∨ | Output = 1 wenn MINDESTENS EIN Input = 1 | 0∨0=0, **0∨1=1**, **1∨0=1**, **1∨1=1** |
| **NOT** (NICHT) | ¬ | Invertiert den Input | ¬0=1, ¬1=0 |

**Halbaddierer** (2 Inputs: A, B):
- Summe S = A ⊕ B (XOR = exklusives ODER)
- Übertrag C = A ∧ B (AND)

| A | B | S (Summe) | C (Carry) |
|---|---|-----------|-----------|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

**Volladdierer** (3 Inputs: A, B, Cᵢₙ):
- S = A ⊕ B ⊕ Cᵢₙ
- Cₒᵤₜ = (A ∧ B) ∨ (Cᵢₙ ∧ (A ⊕ B))
- Mehrstellige Addition: Volladdierer kaskadiert (Carry-Ripple-Adder)

---

## B.2 TGI01 – Datenstrukturen und Algorithmen

### Kapitel 1-2: Algorithmen und Darstellung

**Darstellungsformen**:
- Pseudocode / Programmiersprache (Groovy)
- Flussdiagramm (Start/Ende=Oval, Verarbeitung=Rechteck, Entscheidung=Raute, Ein-/Ausgabe=Parallelogramm)
- Struktogramm (Nassi-Shneiderman)

### Kapitel 3: Mathematische Grundlagen

**Mengen**: M = {x | Bedingung} – Potenzmenge P(M) = Menge aller Teilmengen.

**Relationen** und ihre Eigenschaften:
| Eigenschaft | Definition |
|------------|-----------|
| **Reflexiv** | ∀x: (x,x) ∈ R |
| **Symmetrisch** | (x,y) ∈ R → (y,x) ∈ R |
| **Antisymmetrisch** | (x,y) ∈ R ∧ (y,x) ∈ R → x = y |
| **Transitiv** | (x,y) ∈ R ∧ (y,z) ∈ R → (x,z) ∈ R |

- **Äquivalenzrelation** = reflexiv + symmetrisch + transitiv
- **Partielle Ordnung** = reflexiv + antisymmetrisch + transitiv

**Algebren**: Abstrakte Struktur (Trägermenge, Operationen, Axiome).

### Kapitel 4: Klassifikation von Datentypen ⭐

**Abstrakte Datentypen (ADT)**: Spezifikation unabhängig von Implementierung. Definiert durch Signatur (Operationen) und Axiome (Verhalten).

**Klassifikation**:
```
Datentypen
├── Statisch
│   ├── Basisdatentypen (int, float, char, boolean)
│   └── Aggregiert (Array, Record/Struct, String)
└── Dynamisch
    ├── Liste (einfach/doppelt verkettet)
    ├── Stack (Keller/Stapel) – LIFO
    └── Queue (Schlange) – FIFO
```

**Stack (Keller)** – Last In, First Out:
- Operationen: `push(x)`, `pop()`, `top()`, `isEmpty()`
- Anwendung: Klammerprüfung, Funktionsaufrufe, Rücksprungadressen

**Queue (Schlange)** – First In, First Out:
- Operationen: `enqueue(x)`, `dequeue()`, `front()`, `isEmpty()`
- Anwendung: Druckerwarteschlange, BFS

**Verkettete Liste**: Knoten mit Datenelement + Zeiger auf nächsten Knoten.
- Einfach verkettet: nur Vorwärtszeiger
- Doppelt verkettet: Vorwärts- und Rückwärtszeiger

### Kapitel 5: Sortier- und Suchalgorithmen

**Einfache Sortierverfahren** (alle O(n²)):

| Algorithmus | Prinzip | Stabil? | Besonderheit |
|------------|---------|---------|-------------|
| **BubbleSort** | Benachbarte Elemente vergleichen & tauschen, mehrere Durchläufe | Ja | Einfach, aber ineffizient |
| **SelectionSort** | Minimum suchen, an Anfang tauschen | Nein | Wenig Tauschoperationen |
| **InsertionSort** | Element in bereits sortierte Teilliste einfügen | Ja | Gut für fast sortierte Listen |

**Suchalgorithmen**:
- **Lineare Suche**: O(n) – jedes Element prüfen
- **Binäre Suche**: O(log n) – Liste muss sortiert sein, Mitte vergleichen, Hälfte ausschließen
- **Fibonacci-Suche**: Ähnlich binär, aber Aufteilung nach Fibonacci-Zahlen
- **Interpolatorische Suche**: Position schätzen basierend auf Wert – O(log log n) bei Gleichverteilung

### Kapitel 6: Bäume und Graphen ⭐

**Baum**: Zusammenhängender, zyklenfreier Graph mit Wurzel.
- **Ordnung k**: Max. k Söhne pro Knoten
- **Höhe m**: Längster Pfad von Wurzel zu Blatt
- Max. Blätter auf Niveau m: **kᵐ**
- **Binärbaum**: k = 2 (speziell: binärer Suchbaum – links kleiner, rechts größer)

**Traversierung** von Binärbäumen:
- **Preorder** (WLR): Wurzel → links → rechts
- **Inorder** (LWR): links → Wurzel → rechts (ergibt sortierte Folge bei BST)
- **Postorder** (LRW): links → rechts → Wurzel

**Graph**: G = (V, E) mit Knotenmenge V und Kantenmenge E.
- **Gerichteter Graph**: Kanten haben Richtung (Pfeile)
- **Adjazenzmatrix**: n×n-Matrix, A[i][j]=1 falls Kante von i nach j existiert

---

## B.3 TGI02 – Algorithmen und Komplexität

### Kapitel 1: Höheres Sortieren ⭐⭐

| Algorithmus | Prinzip | Worst Case | Average | Best | Stabil? | In-situ? |
|------------|---------|-----------|---------|------|---------|----------|
| **QuickSort** | Pivot wählen, partitionieren (kleiner/größer), rekursiv | **O(n²)** | O(n log n) | O(n log n) | Nein | Ja |
| **MergeSort** | Teilen bis Einzelelemente, dann sortiert zusammenführen (Merge) | **O(n log n)** | O(n log n) | O(n log n) | Ja | Nein (extra Speicher) |
| **HeapSort** | Max-Heap aufbauen, Maximum entnehmen, durchsickern | **O(n log n)** | O(n log n) | O(n log n) | Nein | Ja |
| **RadixSort** | Nicht-vergleichsbasiert, verteilt nach Ziffern in Boxen | **O(n)** | O(n) | O(n) | Ja | Nein |

**QuickSort** – Ablauf:
1. Pivot-Element wählen (z.B. erstes Element)
2. Partitionierung: Elemente < Pivot links, ≥ Pivot rechts
3. Rekursiv auf beide Teillisten anwenden
4. Worst Case bei bereits sortierter Liste (Pivot immer Extremwert)

**MergeSort** – Ablauf:
1. Liste halbieren bis Einzelelemente
2. Merge: Zwei sortierte Listen zusammenführen durch Vergleich der jeweils ersten Elemente
3. Immer O(n log n), braucht aber O(n) extra Speicher

**HeapSort** – Ablauf:
1. Max-Heap aufbauen (Durchsickern von unten nach oben)
2. Maximum (Wurzel) entnehmen, letztes Blatt als neue Wurzel, durchsickern lassen
3. Wiederholen bis leer

**Heap** = vollständiger Binärbaum, in dem jeder Knoten ≥ seine Kinder (Max-Heap).
- Durchsickern (Heapify): Element mit größerem Kind tauschen, bis Heap-Eigenschaft erfüllt.
- Im Array: Knoten i hat Kinder bei 2i+1 und 2i+2, Elternknoten bei ⌊(i-1)/2⌋

### Kapitel 2: Auswählen

- **Min-Max-Auswahl**: ⌈3n/2⌉ - 2 Vergleiche für gleichzeitiges Min und Max
- **QuickSelection**: k-kleinstes Element finden, ähnlich QuickSort aber nur eine Seite weiterverfolgen
- **Sich selbst anordnende Listen**: Move-to-Front (angefragtes Element an den Anfang) oder Zugriffshäufigkeitszähler

### Kapitel 3: Hashing ⭐

**Hashfunktion** h: Schlüssel → Speicheradresse (Index).

**Hashfunktionen**:
- **Divisionsrestverfahren**: h(k) = k mod m (m = Tabellengröße, am besten Primzahl)
- **Multiplikationsmethode**: h(k) = ⌊m · (k·A mod 1)⌋ mit 0 < A < 1

**Kollisionsbehandlung**:
- **Geschlossenes Verfahren** (Chaining): Verkettete Listen an jedem Tabellenplatz
- **Offenes Verfahren** (Open Addressing): Nächsten freien Platz suchen (lineares/quadratisches Sondieren)

### Kapitel 4: Matching-Algorithmen

| Algorithmus | Prinzip | Komplexität |
|------------|---------|-------------|
| **Naives Matching** | Zeichen für Zeichen vergleichen, bei Fehler um 1 verschieben | O(n·m) |
| **KMP** (Knuth-Morris-Pratt) | next[]-Tabelle: bei Mismatch intelligent zurückspringen | O(n+m) |
| **Boyer-Moore** | Von rechts nach links vergleichen, große Sprünge möglich | O(n/m) best |
| **Rabin-Karp** | Hashwert des Fensters berechnen, nur bei Match-Hash genau vergleichen | O(n+m) avg |

### Kapitel 5: Analyse von Algorithmen ⭐

**Schritte der Analyse**:
1. Eingabegröße n identifizieren
2. Elementaroperationen zählen (Vergleiche, Zuweisungen)
3. Zeitfunktion T(n) aufstellen
4. Dominanten Term bestimmen → O-Notation

### Kapitel 6: Klassifikation und Komplexität ⭐⭐

**O-Notation** (Obere Schranke):
> O(f) = {g | ∃ n₀, c > 0: ∀ n ≥ n₀: g(n) ≤ c · f(n)}

**Wachstumsordnung** (langsam → schnell):
> O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)

**Master-Theorem** – Für T(n) = a·T(n/b) + nᵏ:

| Bedingung | Ergebnis |
|-----------|----------|
| a < bᵏ | T(n) = **O(nᵏ)** |
| a = bᵏ | T(n) = **O(nᵏ · log n)** |
| a > bᵏ | T(n) = **O(n^(log_b(a)))** |

**Chip and Conquer**: T(n) = T(n-c) + f(n), b=1 → T(n) = O(∫f(x)dx)
**Chip and Be Conquered**: T(n) = b·T(n-c) + f(n), b>1 → T(n) = O(b^(n/c)) – **exponentiell!**

**Beispiel MergeSort**: T(n) = 2·T(n/2) + n → a=2, b=2, k=1, a=bᵏ → **O(n log n)**
**Beispiel QuickSort Worst**: T(n) = T(n-1) + n → Chip & Conquer → ∫n dx = n²/2 → **O(n²)**

**Wichtige Komplexitätsklassen**:

| Klasse | Bedeutung | Beispiel |
|--------|-----------|---------|
| **LOGSPACE** | Platz: O(log n) | Erreichbarkeit in Graphen |
| **P** | Zeit: polynomial O(nᵏ) | Primzahltest |
| **NP** | Verifikation in Polynomialzeit | Rucksackproblem |
| **PSPACE** | Platz: polynomial | Tic-Tac-Toe Gewinnstrategie |
| **EXPTIME** | Zeit: exponentiell O(2ⁿ) | Go-Gewinnstrategie |

Relation: LOGSPACE ⊆ P ⊆ NP ⊆ PSPACE ⊆ EXPTIME

**P vs. NP** – Die offene Frage: Ist P = NP? Vermutlich nein. NP-vollständige Probleme (z.B. Rucksack, TSP) sind die „schwersten" in NP.

**Untere Schranke Sortieren**: Vergleichsbasiertes Sortieren kann nicht besser als O(n log n) sein.

---

## B.4 TGI06 – Formale Sprachen und abstrakte Automaten 1

### Kapitel 1: Grundbegriffe ⭐

**Alphabet** Σ: Endliche, nichtleere Menge von Zeichen. Z.B. Σ = {0, 1} oder Σ = {a, b, c}

**Wort**: Endliche Folge von Zeichen aus Σ.
- |w| = Wortlänge (Anzahl Zeichen)
- ε = leeres Wort (|ε| = 0)
- **Verkettung**: u ∘ v = uv (Hintereinanderschreiben)
- wⁿ = w n-mal verkettet

**Wortmenge**: Σ* = Menge ALLER Wörter über Σ (inkl. ε). Σ⁺ = Σ* \ {ε}

**Sprache** L: Teilmenge von Σ* (L ⊆ Σ*). Kann endlich oder unendlich sein.

### Kapitel 2: Formale Grammatiken ⭐⭐

**Grammatik** G = (N, T, P, s):
- N = Nichtterminale (Variablen)
- T = Terminale (Alphabet der Sprache)
- P = Produktionsregeln (Ersetzungsregeln)
- s = Startsymbol (s ∈ N)

**Ableitung**: Startsymbol → durch Regelanwendung → Wort aus Terminalen.
- Notation: S ⇒ αAβ ⇒ αγβ (wenn A → γ ∈ P)
- L(G) = {w ∈ T* | S ⇒* w} (alle ableitbaren Wörter)

**Ableitungsbaum**: Grafische Darstellung einer Ableitung (Wurzel = S, Blätter = Terminale).

**Mehrdeutigkeit**: Grammatik ist mehrdeutig, wenn ein Wort mehrere verschiedene Ableitungsbäume hat.

### Chomsky-Hierarchie ⭐⭐⭐

| Typ | Name | Regelform | Automat | Beispielsprache |
|-----|------|-----------|---------|----------------|
| **Typ 0** | Rekursiv aufzählbar | α → β (keine Einschränkung) | Turingmaschine | – |
| **Typ 1** | Kontextsensitiv | |α| ≤ |β| (Längenmonotonie) | Linear beschränkter Automat | {aⁿbⁿcⁿ} |
| **Typ 2** | Kontextfrei (kfG) | A → β (links: einzelnes Nichtterminal) | Kellerautomat | {aⁿbⁿ} |
| **Typ 3** | Regulär | A → aB oder A → a (rechtslinear) | Endlicher Automat (DEA/NEA) | {aⁿ} |

**Hierarchie**: Typ 3 ⊂ Typ 2 ⊂ Typ 1 ⊂ Typ 0

Merksatz: **Jede reguläre Sprache ist kontextfrei, jede kontextfreie ist kontextsensitiv, usw.**

**ε-Regeln**: S → ε nur beim Startsymbol erlaubt (mit Sonderregelung).

**Wortproblem**: „Gehört w zu L(G)?" – Für Typ 1-3 entscheidbar, für Typ 0 im Allgemeinen nicht.

### Kapitel 3: Sprachübersetzer

**Compiler**: Übersetzt gesamtes Programm vor Ausführung → schneller zur Laufzeit.
**Interpreter**: Führt Zeile für Zeile aus → langsamer bei Schleifen (jede Wiederholung neu interpretiert).

**Scanner** (Lexer): Erkennt Tokens (Schlüsselwörter, Bezeichner, Zahlen) – basiert auf regulären Ausdrücken/DEA.
**Parser**: Prüft syntaktische Korrektheit anhand Grammatik – basiert auf kontextfreien Grammatiken.

**T-Diagramm**: Modellierung von Übersetzungsprozessen. Drei Felder: Quellsprache | Implementierungssprache | Zielsprache.

### Kapitel 4: Reguläre Sprachen und endliche Automaten ⭐⭐⭐

**DEA** (Deterministischer endlicher Automat): M = (Q, Σ, δ, q₀, F)
- Q = endliche Zustandsmenge
- Σ = Eingabealphabet
- δ: Q × Σ → Q (Übergangsfunktion, **genau ein** Folgezustand)
- q₀ = Startzustand
- F ⊆ Q = Endzustände (akzeptierende Zustände)

**NEA** (Nichtdeterministischer EA): δ: Q × Σ → P(Q) (Menge von Folgezuständen – **mehrere oder keiner** möglich).

**NEA → DEA Konvertierung** (Potenzmengenkonstruktion):
1. Startzustand des DEA = {q₀} des NEA
2. Für jeden neuen Zustand (= Menge von NEA-Zuständen) und jedes Zeichen: Vereinigung aller Folgezustände berechnen
3. Endzustand im DEA = jede Menge, die mindestens einen NEA-Endzustand enthält
4. Nicht erreichbare Zustände eliminieren

**NEA mit ε-Übergängen**: Zustandswechsel ohne Eingabe. Bei Konvertierung: ε-Hülle (epsilon closure) berechnen.

**Minimalautomat**: DEA mit minimaler Zustandszahl. Algorithmus: Äquivalente Zustände zusammenfassen (Zustände sind äquivalent wenn sie für alle Eingaben zum gleichen Akzeptanz-Ergebnis führen).

**Reguläre Grammatik → DEA**: 
- Nichtterminale = Zustände
- Regel A → aB: Übergang δ(A, a) = B
- Regel A → a: Übergang δ(A, a) = Endzustand

**Reguläre Ausdrücke** ⭐:
- ∅ (leere Menge), ε (leeres Wort), a (einzelnes Zeichen) sind reguläre Ausdrücke
- u·v (Verkettung), u|v (Alternative/Union), u* (Kleene-Stern: 0 oder mehr Wiederholungen)

| Ausdruck | Bedeutung | Beispiel über {a,b} |
|----------|-----------|-------------------|
| a\|b | a oder b | {a, b} |
| ab | a gefolgt von b | {ab} |
| a* | 0 oder mehr a's | {ε, a, aa, aaa, ...} |
| a⁺ | 1 oder mehr a's | {a, aa, aaa, ...} |
| (a\|b)* | Alle Wörter über {a,b} | Σ* |

**Äquivalenz**: DEA ↔ NEA ↔ NEAε ↔ Reguläre Grammatik ↔ Reguläre Ausdrücke – alle definieren **genau die regulären Sprachen** (Typ 3).

---

# TEIL C: Prüfungstraining – 30 typische Aufgaben

### Aufgaben Dualzahlen (GDI01)

**C.1** Rechnen Sie 11011001₂ in dezimal um.
> Lösung: 1+8+16+64+128 = **217**

**C.2** Rechnen Sie 93₁₀ in dual um.
> 93=64+16+8+4+1 → **1011101₂**

**C.3** Addieren Sie dual: 1011₂ + 1101₂
> 1011 + 1101 = **11000₂** (= 11+13 = 24 ✓)

**C.4** Rechnen Sie 0xBE in dezimal um.
> B·16 + E = 11·16 + 14 = **190**

### Aufgaben Logische Schaltungen (GDI01)

**C.5** Erstellen Sie die Wahrheitstabelle für: (A ∧ B) ∨ (¬A ∧ C)
> | A | B | C | A∧B | ¬A | ¬A∧C | Ergebnis |
> |---|---|---|-----|-----|------|----------|
> | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
> | 0 | 0 | 1 | 0 | 1 | 1 | 1 |
> | 0 | 1 | 0 | 0 | 1 | 0 | 0 |
> | 0 | 1 | 1 | 0 | 1 | 1 | 1 |
> | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
> | 1 | 0 | 1 | 0 | 0 | 0 | 0 |
> | 1 | 1 | 0 | 1 | 0 | 0 | 1 |
> | 1 | 1 | 1 | 1 | 0 | 0 | 1 |

### Aufgaben Datenstrukturen (TGI01)

**C.6** Gegeben ist ein Stack (Stapel). Führen Sie folgende Operationen durch und geben Sie den Zustand nach jeder Operation an: push(5), push(3), push(7), pop(), push(1), top(), pop()
> push(5): [5] | push(3): [5,3] | push(7): [5,3,7] | pop()→7: [5,3] | push(1): [5,3,1] | top()→1: [5,3,1] | pop()→1: [5,3]

**C.7** Was ist der Unterschied zwischen Stack und Queue? Nennen Sie je eine typische Anwendung.
> Stack = LIFO (Last In First Out) → Funktionsaufrufe, Klammerprüfung. Queue = FIFO (First In First Out) → Druckerwarteschlange, BFS in Graphen.

**C.8** Geben Sie die Adjazenzmatrix für einen gerichteten Graphen mit Knoten {1,2,3,4} und Kanten {1→2, 1→3, 2→4, 3→2, 4→3} an.
> |   | 1 | 2 | 3 | 4 |
> |---|---|---|---|---|
> | 1 | 0 | 1 | 1 | 0 |
> | 2 | 0 | 0 | 0 | 1 |
> | 3 | 0 | 1 | 0 | 0 |
> | 4 | 0 | 0 | 1 | 0 |

### Aufgaben Sortieralgorithmen (TGI01/02)

**C.9** Sortieren Sie [15, 8, 23, 4, 42, 16] mit SelectionSort. Zeigen Sie alle Zwischenschritte.
> Schritt 1: Min=4 bei Pos 3, tausche mit Pos 0 → [**4**, 8, 23, 15, 42, 16]
> Schritt 2: Min=8 bereits an Pos 1 → [4, **8**, 23, 15, 42, 16]
> Schritt 3: Min=15 bei Pos 3, tausche mit Pos 2 → [4, 8, **15**, 23, 42, 16]
> Schritt 4: Min=16 bei Pos 5, tausche mit Pos 3 → [4, 8, 15, **16**, 42, 23]
> Schritt 5: Min=23 bei Pos 5, tausche mit Pos 4 → [4, 8, 15, 16, **23**, **42**]

**C.10** Führen Sie QuickSort auf [5, 3, 8, 1, 9, 2] durch (Pivot = erstes Element).
> Pivot=5: Links [3,1,2], Rechts [8,9] → [3,1,2] **5** [8,9]
> Links: Pivot=3: [1,2] **3** [] → [1,2] 3
> [1,2]: Pivot=1: [] **1** [2] → 1, 2
> Rechts: Pivot=8: [] **8** [9] → 8, 9
> Ergebnis: **[1, 2, 3, 5, 8, 9]**

**C.11** Bauen Sie einen Max-Heap aus [4, 10, 3, 5, 1, 8] und entnehmen Sie das erste Maximum.
> Als Baum:      4
>             10    3
>            5  1  8
> Durchsickern ab Pos 2 (3<8→tausche): 4, 10, 8, 5, 1, 3
> Durchsickern ab Pos 1 (10>4, ok): keine Änderung
> Durchsickern ab Pos 0 (4<10→tausche): **10**, 5, 8, 4, 1, 3
> Prüfe: 10>5✓, 5>4✓, 5>1✓, 8>3✓ → Max-Heap: [10, 5, 8, 4, 1, 3]
> Entnahme: Max=10, letztes Blatt (3) wird Wurzel → [3, 5, 8, 4, 1]
> Durchsickern: 3<8→tausche → [8, 5, 3, 4, 1] ✓

### Aufgaben Hashing (TGI02)

**C.12** Gegeben: Hashtabelle der Größe m=7, Hashfunktion h(k)=k mod 7. Fügen Sie ein: 19, 26, 13, 33. Zeigen Sie Kollisionsauflösung mit (a) Chaining, (b) linearem Sondieren.
> h(19)=5, h(26)=5, h(13)=6, h(33)=5
> **(a) Chaining**: Pos 5: 19→26→33, Pos 6: 13
> **(b) Linear**: Pos 5:19, Pos 6:13 → 26 kollidiert bei 5 (belegt), Pos 6 (belegt) → Pos 0: 26 | 33 kollidiert bei 5,6,0 (belegt) → Pos 1: 33

### Aufgaben Komplexitätsanalyse (TGI02)

**C.13** Bestimmen Sie die Zeitkomplexität (O-Notation):
```
for i = 1 to n:
    for j = 1 to n:
        print(i+j)
```
> Zwei geschachtelte Schleifen, je n Durchläufe → **O(n²)**

**C.14** Bestimmen Sie mittels Master-Theorem: T(n) = 4·T(n/2) + n
> a=4, b=2, k=1. a=4 vs bᵏ=2¹=2. Da a > bᵏ → Fall 3: T(n) = O(n^(log₂4)) = **O(n²)**

**C.15** Bestimmen Sie: T(n) = 2·T(n/2) + n²
> a=2, b=2, k=2. bᵏ=4. Da a < bᵏ → Fall 1: **T(n) = O(n²)**

**C.16** Bestimmen Sie: T(n) = T(n-1) + 1
> Chip-and-Conquer (b=1): T(n) = O(∫1 dx) = **O(n)**

**C.17** Bestimmen Sie: T(n) = 3·T(n-1) + n
> Chip-and-Be-Conquered (b=3, c=1): **T(n) = O(3ⁿ)** – exponentiell!

**C.18** Ordnen Sie nach Wachstum: n², 2ⁿ, n log n, log n, n!, n, 1
> **O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)**

### Aufgaben Chomsky-Hierarchie (TGI06)

**C.19** Gegeben: G = ({S}, {a,b}, {S→aSb, S→ab}, S). Welcher Chomsky-Typ? Welche Sprache?
> Regeln: S→aSb (A→β mit A∈N) und S→ab. Links immer einzelnes Nichtterminal → **Typ 2 (kontextfrei)**. L(G) = {aⁿbⁿ | n ≥ 1}.

**C.20** Gegeben: G = ({S,A}, {0,1}, {S→0A, S→1, A→0A, A→1}, S). Welcher Typ? Welche Sprache?
> Alle Regeln der Form A→aB oder A→a → **Typ 3 (regulär)**. L(G) = Alle Wörter aus {0,1}⁺ die mit 1 enden.

**C.21** Ist die Sprache L = {aⁿbⁿcⁿ | n ≥ 1} kontextfrei?
> **Nein.** L ist kontextsensitiv (Typ 1), aber nicht kontextfrei. Man bräuchte einen Kellerautomaten für zwei unabhängige Zähler, was nicht möglich ist.

### Aufgaben Endliche Automaten (TGI06)

**C.22** Konstruieren Sie einen DEA über Σ={0,1}, der alle Wörter akzeptiert, die mit „01" enden.
> M = ({q₀, q₁, q₂}, {0,1}, δ, q₀, {q₂})
> δ(q₀, 0) = q₁, δ(q₀, 1) = q₀
> δ(q₁, 0) = q₁, δ(q₁, 1) = q₂
> δ(q₂, 0) = q₁, δ(q₂, 1) = q₀
> Prüfung: "101" → q₀→q₀→q₁→q₂ ✓ | "00" → q₀→q₁→q₁ ✗ ✓

**C.23** Gegeben NEA M mit: q₀ →a→ {q₀,q₁}, q₀ →b→ {q₀}, q₁ →b→ {q₂}. q₀ Start, q₂ End. Konstruieren Sie den äquivalenten DEA.
> Startzustand: {q₀}
> δ({q₀}, a) = {q₀,q₁}, δ({q₀}, b) = {q₀}
> δ({q₀,q₁}, a) = {q₀,q₁}, δ({q₀,q₁}, b) = {q₀,q₂} ← **Endzustand** (enthält q₂)
> δ({q₀,q₂}, a) = {q₀,q₁}, δ({q₀,q₂}, b) = {q₀}
> L(M) = Alle Wörter über {a,b} die mit "ab" enden.

**C.24** Geben Sie einen regulären Ausdruck für die Sprache aller Binärstrings an, die mindestens zwei aufeinanderfolgende Nullen enthalten.
> **(0|1)\*00(0|1)\***

**C.25** Wandeln Sie den regulären Ausdruck a(a|b)*b in einen NEA um.
> Zustandskette: q₀ →a→ q₁, q₁ →a→ q₁, q₁ →b→ q₁, q₁ →b→ q₂ (Endzustand)
> (Genauer mit Thompson-Konstruktion, aber das Prinzip ist: a am Anfang, beliebig viele a/b in der Mitte, b am Ende)

### Aufgaben Matching (TGI02)

**C.26** Wie viele Vergleiche braucht Boyer-Moore zum Finden von „mal" in „Man muss seinen Text erst einmal"?
> BM vergleicht von rechts: erst 'l' mit Position 2 (n→Mismatch, springe 3), dann weiter... Ergebnis: ca. **11 Vergleiche** (deutlich weniger als naiv).

### Aufgaben Bäume (TGI01)

**C.27** Gegeben ein Binärbaum mit Wurzel 15, links: 8(links:4, rechts:12), rechts: 20(links:17, rechts:25). Geben Sie die Preorder-, Inorder- und Postorder-Traversierung an.
> **Preorder** (WLR): 15, 8, 4, 12, 20, 17, 25
> **Inorder** (LWR): 4, 8, 12, 15, 17, 20, 25 ← sortiert!
> **Postorder** (LRW): 4, 12, 8, 17, 25, 20, 15

**C.28** Wie viele Blätter hat ein Baum der Ordnung 3 und Höhe 4 maximal?
> Max. Blätter = kᵐ = 3⁴ = **81**

### Aufgaben P/NP (TGI02)

**C.29** Erklären Sie den Unterschied zwischen P und NP anhand eines Beispiels.
> **P**: Lösung kann in Polynomialzeit **gefunden** werden (z.B. Sortieren in O(n log n)). **NP**: Lösung kann in Polynomialzeit **verifiziert** werden, aber Finden möglicherweise nicht polynomial (z.B. Rucksackproblem: Optimale Packung zu finden ist schwer, aber eine gegebene Packung zu überprüfen ist einfach).

**C.30** Ist folgende Aussage korrekt? „Jedes Problem in P ist auch in NP."
> **Ja.** P ⊆ NP. Wenn ein Problem in Polynomialzeit lösbar ist, kann die Lösung trivialerweise auch in Polynomialzeit verifiziert werden (einfach nochmal lösen).

---

# TEIL D: Formelsammlung

## Zahlensysteme
- **Dual→Dezimal**: Σ aᵢ · 2ⁱ
- **Dezimal→Dual**: Sukzessive Division durch 2, Reste rückwärts
- **Hex→Dezimal**: Σ aᵢ · 16ⁱ (A=10, B=11, ..., F=15)
- **1 Hex-Ziffer = 4 Bit, 1 Oktal-Ziffer = 3 Bit**

## Zweierkomplement (n Bit)
- Einerkomplement: Alle Bits invertieren
- Zweierkomplement: Einerkomplement + 1
- Darstellbarer Bereich: -2ⁿ⁻¹ bis 2ⁿ⁻¹ - 1

## Logische Gatter
- AND: A ∧ B (Konjunktion)
- OR: A ∨ B (Disjunktion)
- NOT: ¬A (Negation)
- XOR: A ⊕ B = (A ∧ ¬B) ∨ (¬A ∧ B)

## Halbaddierer / Volladdierer
- HA: S = A ⊕ B, C = A ∧ B
- VA: S = A ⊕ B ⊕ Cᵢₙ, Cₒᵤₜ = (A ∧ B) ∨ (Cᵢₙ ∧ (A ⊕ B))

## Bäume
- Max. Blätter Niveau m bei Ordnung k: **kᵐ**
- Höhe eines vollständigen Binärbaums mit n Knoten: **⌊log₂ n⌋**

## Komplexitätsanalyse
- O(f) = {g | ∃c, n₀: g(n) ≤ c·f(n) für alle n ≥ n₀}
- **Master-Theorem**: T(n) = a·T(n/b) + nᵏ
  - Fall 1: a < bᵏ → O(nᵏ)
  - Fall 2: a = bᵏ → O(nᵏ · log n)
  - Fall 3: a > bᵏ → O(n^(log_b(a)))
- **Chip & Conquer**: T(n) = T(n-c) + f(n) → O(∫f(x)dx)
- **Chip & Be Conquered**: T(n) = b·T(n-c) + f(n) (b>1) → O(b^(n/c))

## Sortieralgorithmen – Komplexitäten

| Algorithmus | Best | Average | Worst | Stabil? | In-situ? |
|------------|------|---------|-------|---------|----------|
| BubbleSort | O(n) | O(n²) | O(n²) | Ja | Ja |
| SelectionSort | O(n²) | O(n²) | O(n²) | Nein | Ja |
| InsertionSort | O(n) | O(n²) | O(n²) | Ja | Ja |
| QuickSort | O(n log n) | O(n log n) | O(n²) | Nein | Ja |
| MergeSort | O(n log n) | O(n log n) | O(n log n) | Ja | Nein |
| HeapSort | O(n log n) | O(n log n) | O(n log n) | Nein | Ja |
| RadixSort | O(n) | O(n) | O(n) | Ja | Nein |

## Hashing
- Divisionsrest: h(k) = k mod m
- Multiplikation: h(k) = ⌊m · (k·A mod 1)⌋

## Chomsky-Hierarchie

| Typ | Sprache | Regelform | Automat |
|-----|---------|-----------|---------|
| 0 | Rek. aufzählbar | α → β | Turingmaschine |
| 1 | Kontextsensitiv | \|α\| ≤ \|β\| | Linear beschr. Automat |
| 2 | Kontextfrei | A → β | Kellerautomat |
| 3 | Regulär | A → aB \| a | Endlicher Automat |

## Reguläre Ausdrücke
- ∅ = leere Sprache
- ε = leeres Wort
- a·b = Verkettung
- a|b = Alternative
- a* = Kleene-Stern (0+ Wiederholungen)
- a⁺ = a·a* (1+ Wiederholungen)

## DEA/NEA
- DEA: δ: Q × Σ → Q (eindeutig)
- NEA: δ: Q × Σ → P(Q) (Menge von Zuständen)
- NEA→DEA: Potenzmengenkonstruktion

---

# TEIL E: Lern-Checkliste

## GDI01 – Einführung in die Informatik
- [ ] EVA-Prinzip erklären können
- [ ] 5 Eigenschaften eines Algorithmus nennen
- [ ] Kontrollstrukturen (Sequenz, Selektion, Iteration) erklären
- [ ] OOP-Grundbegriffe: Klasse, Objekt, Attribut, Methode, Vererbung
- [ ] Turing-Maschine: Aufbau und Bedeutung erklären
- [ ] Von-Neumann-Architektur: 4 Komponenten, Befehlszyklus
- [ ] Dezimal↔Dual umrechnen (in beide Richtungen)
- [ ] Duale Addition und Subtraktion (Zweierkomplement)
- [ ] Hexadezimal↔Dual↔Dezimal umrechnen
- [ ] Wahrheitstabellen für AND, OR, NOT erstellen
- [ ] Halbaddierer und Volladdierer erklären und Tabelle aufstellen

## TGI01 – Datenstrukturen und Algorithmen
- [ ] Algorithmen als Flussdiagramm und Pseudocode darstellen
- [ ] Mengen, Relationen, Potenzmenge formal beschreiben
- [ ] Reflexiv, symmetrisch, transitiv, antisymmetrisch unterscheiden
- [ ] ADT: Stack, Queue, Liste – Operationen und Unterschiede
- [ ] BubbleSort, SelectionSort, InsertionSort von Hand durchführen
- [ ] Fibonacci-Suche und interpolatorische Suche erklären
- [ ] Binärbaum-Traversierung: Preorder, Inorder, Postorder
- [ ] Adjazenzmatrix eines Graphen erstellen

## TGI02 – Algorithmen und Komplexität
- [ ] QuickSort von Hand durchführen (mit Pivot-Wahl)
- [ ] MergeSort von Hand durchführen (Teilen und Mergen)
- [ ] HeapSort: Max-Heap aufbauen und sortieren
- [ ] Hashfunktion anwenden, Kollisionen lösen (Chaining, Open Addressing)
- [ ] KMP- und Boyer-Moore-Matching erklären
- [ ] Zeitkomplexität einfacher Algorithmen bestimmen
- [ ] O-Notation: Definition und Wachstumsordnung kennen
- [ ] Master-Theorem: Alle 3 Fälle anwenden können
- [ ] Chip-and-Conquer / Be-Conquered anwenden
- [ ] P, NP, PSPACE, EXPTIME definieren und einordnen
- [ ] Untere Schranke für vergleichsbasiertes Sortieren: O(n log n)

## TGI06 – Formale Sprachen und abstrakte Automaten 1
- [ ] Alphabet, Wort, Wortlänge, Verkettung, Σ* definieren
- [ ] Formale Grammatik G=(N,T,P,s) aufstellen
- [ ] Ableitungen durchführen und Ableitungsbäume zeichnen
- [ ] Chomsky-Hierarchie: Alle 4 Typen mit Regelform und Automat
- [ ] Mehrdeutigkeit einer Grammatik erkennen
- [ ] Compiler vs. Interpreter erklären
- [ ] DEA konstruieren für gegebene Sprache
- [ ] NEA konstruieren und in DEA umwandeln
- [ ] Reguläre Ausdrücke schreiben und interpretieren
- [ ] Äquivalenz DEA/NEA/RegEx kennen

## TGI07 – *(ausstehend)*
- [ ] Wird nach Upload ergänzt

---

*Erstellt am 15.02.2026 – Prüfungsvorbereitung Theoretische Grundlagen der Informatik*
*4 von 5 Heftern analysiert. TGI07 wird nach Upload integriert.*
