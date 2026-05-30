const s1 = document.getElementById('screen1');
const s2 = document.getElementById('screen2');
const s3 = document.getElementById('screen3');
const ascii = document.getElementById('ascii');
const bootLines = document.getElementById('bootLines');

// ── Boot sequence lines ──
// Format: [delay_ms, html_content]
const lines = [
  [0,    ''],
  [0,    'BOOTING ORCAQUARK...'],
  [0,    ''],
  [320,  '[ ]  Scanning archive...'],
  [900,  '[<span class="ok">OK</span>] Scanning archive...'],  // replaces previous
  [400,  '[<span class="ok">OK</span>] 128 projects indexed'],
  [350,  '[<span class="ok">OK</span>] 4,372 commits analyzed'],
  [380,  '[<span class="ok">OK</span>] Design engine online'],
  [360,  '[<span class="ok">OK</span>] Development engine online'],
  [380,  '[<span class="ok">OK</span>] Problem-solving module online'],
  [250,  ''],
  [180,  'Loading achievements.................. <span class="done">DONE</span>'],
  [400,  'Loading experiments................... <span class="done">DONE</span>'],
  [430,  'Loading ideas......................... <span class="done">DONE</span>'],
  [250,  ''],
  [300,  '<span class="auth">AUTHENTICATION SUCCESSFUL</span>'],
  [200,  ''],
  [200,  'User access level: <span class="level">Visitor</span>'],
  [200,  ''],
  [280,  '&gt; Entering portfolio environment...'],
  [500,  '&gt; Initializing experience...'],
  [600,  '&gt; Enjoy your stay.'],
  [400,  ''],
  [300,  '<span class="ready">READY.</span>'],
];

function transition(from, to, cb) {
  from.classList.add('exit');
  from.classList.remove('active');
  setTimeout(() => {
    from.style.display = 'none';
    to.classList.add('active');
    if (cb) cb();
  }, 850);
}

function runBoot() {
  ascii.classList.add('show');

  // Handle the scanning line specially (update in place)
  let scanningEl = null;
  let lineIndex = 0;

  function next() {
    if (lineIndex >= lines.length) {
      // Boot done — wait 1.2s then go to screen 3
      setTimeout(() => transition(s2, s3), 1200);
      return;
    }

    const [delay, html] = lines[lineIndex];
    lineIndex++;

    setTimeout(() => {
      if (lineIndex === 5) {
        // Replace "[ ] Scanning..." with "[OK] Scanning..."
        if (scanningEl) scanningEl.innerHTML = html;
      } else {
        const span = document.createElement('span');
        span.className = 'line show';
        span.innerHTML = html + '\n';
        if (lineIndex === 4) scanningEl = span; // capture scanning line
        bootLines.appendChild(span);
      }
      next();
    }, delay);
  }

  next();
}

// ── Sequence ──
// Screen 1 shows for 2.4s, then cut to screen 2
setTimeout(() => {
  transition(s1, s2, runBoot);
}, 2400);

// Screen 3 click → navigate
let s3Ready = false;
s3.addEventListener('click', () => {
  if (!s3Ready) return;
  s3.classList.add('exit-click');
  setTimeout(() => {
    window.location.href = '/home/';
  }, 650);
});

// Enable click after s3 animations settle
s3.addEventListener('transitionend', () => {
  if (s3.classList.contains('active')) {
    setTimeout(() => s3Ready = true, 1200);
  }
});
