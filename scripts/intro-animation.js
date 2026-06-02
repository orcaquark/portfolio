const s1 = document.getElementById('screen1');
const s2 = document.getElementById('screen2');
const s3 = document.getElementById('screen3');
const ascii = document.getElementById('ascii');
const bootLines = document.getElementById('bootLines');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const lines = [
  [0,    ''],
  [0,    'BOOTING ORCAQUARK...'],
  [0,    ''],
  [160,  '[ ]  Scanning archive...'],
  [300,  '[<span class="ok">OK</span>] Scanning archive...',  'replace'],
  [200,  '[<span class="ok">OK</span>] Projects indexed'],
  [170,  '[<span class="ok">OK</span>] Commits analyzed'],
  [190,  '[<span class="ok">OK</span>] Development engine online'],
  [180,  '[<span class="ok">OK</span>] Design engine online'],
  [190,  '[<span class="ok">OK</span>] Problem-solving module online'],
  [120,  ''],
  [90,  'Loading ideas.................. <span class="done">DONE</span>'],
  [200,  'Loading projects................... <span class="done">DONE</span>'],
  [210,  'Loading gallery......................... <span class="done">DONE</span>'],
  [120,  ''],
  [150,  '<span class="auth">AUTHENTICATION SUCCESSFUL</span>'],
  [100,  ''],
  [100,  'User access level: <span class="level">Visitor</span>'],
  [100,  ''],
  [140,  '&gt; Entering portfolio environment...'],
  [250,  '&gt; Initializing experience...'],
  [300,  '&gt; Enjoy your stay.'],
  [200,  ''],
  [100,  '<span class="ready">READY.</span>'],
];

function transition(from, to) {
  from.classList.add('exit');
  from.classList.remove('active');
  return sleep(450).then(() => to.classList.add('active'));
}

async function runBoot() {
  ascii.classList.add('show');
  let lastEl = null;

  for (const [delay, html, action] of lines) {
    await sleep(delay);
    if (action === 'replace' && lastEl) {
      lastEl.innerHTML = html + '\n';
    } else {
      const span = document.createElement('span');
      span.className = 'line show';
      span.innerHTML = html + '\n';
      bootLines.appendChild(span);
      lastEl = span;
    }
  }

  await sleep(1000);
  await transition(s2, s3);
  await sleep(900);
  s3Ready = true;
}

let s3Ready = false;

s3.addEventListener('click', () => {
  if (!s3Ready) return;
  s3.classList.add('exit-click');
  setTimeout(() => { window.location.href = '/home/index.html'; }, 350);
});

// start the sequence
sleep(1600)
  .then(() => transition(s1, s2))
  .then(() => runBoot());