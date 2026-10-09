/* AI-1 App — All 4 slides */

const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
const esc = (s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DAYK=['SUN','MON','TUE','WED','THU','FRI','SAT'];
const DAYF={MON:'Monday',TUE:'Tuesday',WED:'Wednesday',THU:'Thursday',FRI:'Friday',SAT:'Saturday',SUN:'Sunday'};
const todayKey=()=>{const i=new Date().getDay();return(i===0||i===6)?'MON':DAYK[i];};
const tomorrowKey=()=>{const i=new Date().getDay();return(i===5||i===6||i===0)?'MON':DAYK[i+1];};
const fmt12=(t)=>{const[h,m]=t.split(':').map(Number);return`${h%12||12}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`;};
const toMin=(t)=>{const[h,m]=t.split(':').map(Number);return h*60+m;};
const nowMin=()=>{const d=new Date();return d.getHours()*60+d.getMinutes();};

const S = {
  tab: 0,
  section: localStorage.getItem('ai1.section') || '1CSE01',
  profile: JSON.parse(localStorage.getItem('ai1.profile') || 'null') || {name:'Tanish B R', srn:'113995'},
  notes: localStorage.getItem('ai1.notes') || '',
  alarm: localStorage.getItem('ai1.alarm') === 'true',
  mascot: localStorage.getItem('ai1.mascot') || 'panda',
  attendance: JSON.parse(localStorage.getItem('ai1.attendance') || '{}'),
  marks: JSON.parse(localStorage.getItem('ai1.marks') || '{}'),
  pdfs: JSON.parse(localStorage.getItem('ai1.pdfs') || '[]')
};
const save = (k,v)=>localStorage.setItem('ai1.'+k, typeof v === 'string' ? v : JSON.stringify(v));
const data = () => window.AI1_DATA?.sections?.[S.section];
const subjName = (code,cat) => (cat[code]?.name) || code;

/* ============================== SLIDE 1 ============================== */
function renderToday(){
  const d = data();
  $('#todayDateLabel').textContent =
    `${DAYF[DAYK[new Date().getDay()]]||'Monday'} · ${new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}`;
  const list = $('#todayClassList');
  const empty = $('#todayEmptyState');
  if (!d) {
    list.innerHTML = '';
    empty.hidden = false;
    empty.querySelector('h3').textContent = 'Timetable unavailable';
    empty.querySelector('p').textContent = `Section ${S.section} has no data loaded.`;
    $('#advisorName').textContent = '—';
    $('#cycleTag').textContent = '—';
    return;
  }
  $('#advisorName').textContent = d.advisor;
  $('#cycleTag').textContent = d.cycle === 'PC' ? 'Physics Cycle (PC)' : 'Electronics Cycle (EC)';
  const rows = [...(d.schedule[todayKey()]||[])].sort((a,b)=>a.period-b.period);
  if (!rows.length) {
    list.innerHTML = '';
    empty.hidden = false;
    empty.querySelector('h3').textContent = 'No classes today';
    empty.querySelector('p').textContent = `You're free on ${DAYF[todayKey()]}.`;
    return;
  }
  empty.hidden = true;
  const now = nowMin();
  list.innerHTML = rows.map(r=>{
    const p = d.periods.find(x=>x.idx===r.period) || {start:'--',end:'--'};
    const live = now >= toMin(p.start) && now < toMin(p.end);
    const done = now >= toMin(p.end);
    const cls = ['class-row', live?'class-row-live':'', done?'class-row-completed':''].filter(Boolean).join(' ');
    return `<div class="${cls}">
      <div>
        <div class="class-subject">${esc(subjName(r.subject,d.subjects))}${live?'<span class="live-tag">LIVE</span>':''}</div>
        <div class="class-meta">
          <span>🏛️ ${esc(r.room)}</span>
          <span>👤 ${esc(d.subjects[r.subject]?.faculty||'—')}</span>
        </div>
      </div>
      <div class="class-time-pill">⏰ ${fmt12(p.start)} – ${fmt12(p.end)}</div>
    </div>`;
  }).join('');
}

function renderRadar(){
  const d = data();
  const el = $('#radarList');
  if (!el) return;
  if (!d) { el.innerHTML = '<div class="radar-empty">No data.</div>'; return; }
  const att = S.attendance[S.section] || {};
  const lows = [];
  Object.entries(d.subjects).forEach(([code,sub])=>{
    if (sub.code === '—') return;
    const a = att[code];
    if (!a || a.total === 0) return;
    const pct = Math.round((a.attended/a.total)*100);
    if (pct < 75) {
      const need = Math.max(0, Math.ceil((0.75*a.total - a.attended) / 0.25));
      lows.push({ code, sub, pct, need });
    }
  });
  if (!lows.length) {
    el.innerHTML = '<div class="radar-empty">All subjects above 75% — you\'re safe.</div>';
    return;
  }
  el.innerHTML = lows.map(l=>`<div class="radar-item">
    <div><div class="radar-name">${esc(l.sub.name)}</div>
    <div class="radar-detail">Attend ${l.need} more to reach 75%.</div></div>
    <span class="radar-pct">${l.pct}%</span></div>`).join('');
}

function renderTomorrow(){
  const d = data();
  const el = $('#tomorrowList');
  if (!el) return;
  if (!d) { el.innerHTML = '<div class="tomorrow-empty">No data.</div>'; return; }
  const rows = [...(d.schedule[tomorrowKey()]||[])].sort((a,b)=>a.period-b.period);
  if (!rows.length) { el.innerHTML = '<div class="tomorrow-empty">No classes tomorrow.</div>'; return; }
  el.innerHTML = rows.map(r=>{
    const p = d.periods.find(x=>x.idx===r.period) || {start:'--'};
    return `<div class="tomorrow-row">
      <div class="tomorrow-time">${p.start}</div>
      <div class="tomorrow-body"><div class="tomorrow-subject">${esc(subjName(r.subject,d.subjects))}</div>
      <div class="tomorrow-room">Room ${esc(r.room)}</div></div></div>`;
  }).join('');
}

/* ============================== SLIDE 2 ============================== */
function ensureAtt(code){
  S.attendance[S.section] = S.attendance[S.section] || {};
  S.attendance[S.section][code] = S.attendance[S.section][code] || {attended:0, total:0};
  return S.attendance[S.section][code];
}

function renderAttendance(){
  const d = data();
  const el = $('#attendanceList');
  if (!el) return;
  if (!d) { el.innerHTML = '<div class="empty-inline">Pick a valid section first.</div>'; return; }
  const subjects = Object.entries(d.subjects).filter(([,v]) => v.code !== '—');
  el.innerHTML = subjects.map(([code,sub])=>{
    const a = ensureAtt(code);
    const pct = a.total ? Math.round((a.attended/a.total)*100) : 0;
    const need = a.total ? Math.max(0, Math.ceil((0.75*a.total - a.attended) / 0.25)) : 0;
    const status = a.total === 0 ? 'Not started' : pct >= 75 ? 'Safe' : pct >= 65 ? 'Warning' : 'Danger';
    const cls = a.total === 0 ? '' : pct >= 75 ? 'att-ok' : pct >= 65 ? 'att-warn' : 'att-bad';
    return `<div class="att-row ${cls}">
      <div class="att-info">
        <div class="att-name">${esc(sub.name)}</div>
        <div class="att-sub">${a.attended}/${a.total} classes · ${pct}% · ${status}${need?` · attend ${need} more`:''}</div>
      </div>
      <div class="att-controls">
        <button class="att-btn att-minus" data-sub="${code}" data-d="-1" aria-label="Mark missed">−1</button>
        <div class="att-num">${a.attended}</div>
        <button class="att-btn att-plus" data-sub="${code}" data-d="1" aria-label="Mark attended">+1</button>
      </div>
    </div>`;
  }).join('');
  $$('.att-btn').forEach(b=>b.addEventListener('click',()=>{
    const code = b.dataset.sub; const delta = Number(b.dataset.d);
    const a = ensureAtt(code);
    if (delta > 0) { a.attended += 1; a.total += 1; } else { a.attended = Math.max(0,a.attended-1); a.total += 1; }
    save('attendance', S.attendance);
    renderAttendance(); renderRadar();
  }));
}

/* ============================== SLIDE 3 ============================== */
function renderLearn(){
  const list = $('#pdfList');
  if (!list) return;
  if (!S.pdfs.length) {
    list.innerHTML = '<div class="empty-inline">No PDFs uploaded yet. Upload a module PDF to get started.</div>';
    return;
  }
  list.innerHTML = S.pdfs.map(p=>`<div class="pdf-row">
    <span class="pdf-name">📄 ${esc(p.name)}</span>
    <span class="pdf-size">${(p.size/1024).toFixed(0)} KB</span>
    <button class="pdf-del" data-id="${p.id}" aria-label="Delete">✕</button>
  </div>`).join('');
  $$('.pdf-del').forEach(b=>b.addEventListener('click',()=>{
    S.pdfs = S.pdfs.filter(p => p.id !== b.dataset.id);
    save('pdfs', S.pdfs);
    renderLearn();
  }));
}

function wireLearn(){
  const inp = $('#pdfInput');
  if (inp) {
    inp.addEventListener('change',()=>{
      const f = inp.files?.[0]; if (!f) return;
      S.pdfs.push({ id: Date.now()+'-'+Math.random().toString(36).slice(2,6), name: f.name, size: f.size });
      save('pdfs', S.pdfs); inp.value = ''; renderLearn();
    });
  }
  const chat = $('#aiChatInput');
  const send = $('#aiChatSend');
  if (send && chat) {
    send.addEventListener('click',()=>{
      const q = chat.value.trim(); if (!q) return;
      appendChat('user', q); chat.value = '';
      setTimeout(()=>appendChat('ai', aiAnswer(q)), 280);
    });
    chat.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); send.click(); }});
  }
}

function appendChat(role, text){
  const box = $('#aiChatLog'); if (!box) return;
  const div = document.createElement('div');
  div.className = role === 'user' ? 'chat-user' : 'chat-ai';
  div.textContent = text;
  box.appendChild(div); box.scrollTop = box.scrollHeight;
}

function aiAnswer(q){
  const d = data(); if (!d) return 'Pick a valid section first.';
  const lower = q.toLowerCase();
  if (lower.includes('next') || lower.includes('now')) {
    const rows = [...(d.schedule[todayKey()]||[])].sort((a,b)=>a.period-b.period);
    const now = nowMin();
    const nxt = rows.find(r => toMin((d.periods.find(p=>p.idx===r.period)||{start:'00:00'}).start) > now);
    if (!nxt) return 'No more classes today.';
    const p = d.periods.find(x=>x.idx===nxt.period) || {start:'--'};
    return `Next: ${subjName(nxt.subject,d.subjects)} at ${fmt12(p.start)} in room ${nxt.room}.`;
  }
  if (lower.includes('tomorrow')) {
    const rows = d.schedule[tomorrowKey()] || [];
    if (!rows.length) return 'No classes tomorrow.';
    return 'Tomorrow: ' + rows.map(r=>subjName(r.subject,d.subjects)).join(', ') + '.';
  }
  if (lower.includes('attendance') || lower.includes('bunk')) {
    const att = S.attendance[S.section] || {};
    const parts = [];
    Object.entries(d.subjects).forEach(([code,sub])=>{
      if (sub.code === '—') return;
      const a = att[code]; if (!a || !a.total) return;
      parts.push(`${sub.name}: ${Math.round((a.attended/a.total)*100)}%`);
    });
    if (!parts.length) return 'No attendance logged yet.';
    return parts.join(' · ');
  }
  return 'Ask me about "next class", "tomorrow", or "attendance".';
}

/* ============================== SLIDE 4 ============================== */
const CREDIT_MAP = {'O':10,'A+':9,'A':8,'B+':7,'B':6,'C':5,'P':4,'F':0};

function renderCgpa(){
  const d = data();
  const el = $('#cgpaList');
  if (!el) return;
  if (!d) { el.innerHTML = '<div class="empty-inline">Pick a valid section.</div>'; return; }
  const subjects = Object.entries(d.subjects).filter(([,v])=>v.code !== '—');
  el.innerHTML = subjects.map(([code,sub])=>{
    const m = S.marks[code] || {grade:''};
    return `<div class="cgpa-row">
      <div class="cgpa-name">${esc(sub.name)}</div>
      <select class="cgpa-grade" data-sub="${code}">
        <option value="">—</option>
        ${['O','A+','A','B+','B','C','P','F'].map(g=>`<option value="${g}" ${m.grade===g?'selected':''}>${g}</option>`).join('')}
      </select>
    </div>`;
  }).join('');
  $$('.cgpa-grade').forEach(sel=>sel.addEventListener('change',()=>{
    S.marks[sel.dataset.sub] = { grade: sel.value };
    save('marks', S.marks);
    updateCgpaSummary();
  }));
  updateCgpaSummary();
}

function updateCgpaSummary(){
  const d = data(); if (!d) return;
  let totalPts = 0, totalCr = 0, filled = 0;
  Object.entries(d.subjects).forEach(([code,sub])=>{
    if (sub.code === '—') return;
    const g = S.marks[code]?.grade; if (!g) return;
    const cr = 3;
    totalPts += CREDIT_MAP[g] * cr; totalCr += cr; filled++;
  });
  const cgpa = totalCr ? (totalPts/totalCr).toFixed(2) : '0.00';
  const el = $('#cgpaValue'); if (el) el.textContent = cgpa;
  const sub = $('#cgpaSub'); if (sub) sub.textContent = filled ? `${filled} subjects entered` : 'Enter grades to see CGPA';
}

/* ============================== TABS ============================== */
function switchTab(i){
  S.tab = i;
  $$('.tab').forEach((el,idx)=>{
    el.classList.toggle('tab-active', idx === i);
    el.setAttribute('aria-selected', idx === i ? 'true' : 'false');
  });
  $('#slides').style.transform = `translateX(-${i * 25}%)`;
}

/* ============================== MASCOT ============================== */
const MASCOT = { panda:'🐼', lizard:'🦎', roach:'🪳' };
function setMascot(m){
  S.mascot = m; save('mascot', m);
  $$('.mascot-btn').forEach(b=>b.classList.toggle('mascot-active', b.dataset.mascot === m));
  $('#mascotCursor').textContent = MASCOT[m];
}
let cx = innerWidth/2, cy = innerHeight/2, tx = cx, ty = cy;
function tick(){
  cx += (tx - cx) * 0.18;
  cy += (ty - cy) * 0.18;
  $('#mascotCursor').style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
  requestAnimationFrame(tick);
}
let lastM = 0;
document.addEventListener('mousemove', e => {
  const n = performance.now(); if (n - lastM < 16) return; lastM = n;
  tx = e.clientX; ty = e.clientY;
  const spd = Math.hypot(tx - cx, ty - cy);
  $('#mascotCursor').style.fontSize = spd > 40 ? '34px' : '26px';
});

/* ============================== SECTION DROPDOWN ============================== */
function renderSectionSelect(){
  const sel = $('#sectionSelect'); if (!sel) return;
  const codes = window.AI1_DATA?.allSectionCodes || [];
  sel.innerHTML = codes.map(c => `<option value="${c}" ${c === S.section ? 'selected' : ''}>${c}</option>`).join('');
  sel.addEventListener('change', ()=>{
    S.section = sel.value;
    save('section', S.section);
    S.profile.section = S.section;
    save('profile', S.profile);
    renderToday(); renderRadar(); renderTomorrow();
    renderAttendance(); renderCgpa();
    $('#profileSub').textContent = `SRN: ${S.profile.srn} · ${S.section}`;
  });
}

/* ============================== STICKY + ALARM ============================== */
function wireSticky(){
  const ta = $('#stickyNotes'); const sv = $('#stickySaved');
  if (!ta) return;
  ta.value = S.notes;
  let t;
  ta.addEventListener('input', ()=>{
    sv.textContent = 'Saving…';
    clearTimeout(t);
    t = setTimeout(()=>{ S.notes = ta.value; save('notes', S.notes); sv.textContent = 'Auto-saved'; }, 300);
  });
  $('#clearNotesBtn')?.addEventListener('click', ()=>{
    if (!confirm('Clear notes?')) return;
    ta.value = ''; S.notes = ''; save('notes', ''); sv.textContent = 'Auto-saved';
  });
}
function wireAlarm(){
  const b = $('#alarmBtn'); const st = $('#alarmState');
  if (!b) return;
  const apply = ()=>{
    b.setAttribute('aria-pressed', S.alarm ? 'true' : 'false');
    st.textContent = S.alarm ? '(ON)' : '(OFF)';
  };
  apply();
  b.addEventListener('click', ()=>{ S.alarm = !S.alarm; save('alarm', String(S.alarm)); apply(); });
}

/* ============================== INIT ============================== */
function renderHeaderProfile(){
  $('#profileName').textContent = S.profile.name;
  $('#profileSub').textContent = `SRN: ${S.profile.srn} · ${S.section}`;
  $('#profileAvatar').textContent = S.profile.name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();
}

function init(){
  renderHeaderProfile();
  $$('.tab').forEach(t => t.addEventListener('click', ()=>switchTab(Number(t.dataset.tab))));
  setMascot(S.mascot);
  $$('.mascot-btn').forEach(b => b.addEventListener('click', ()=>setMascot(b.dataset.mascot)));
  tick();
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (e.key === 'ArrowRight') switchTab(Math.min(3, S.tab + 1));
    if (e.key === 'ArrowLeft')  switchTab(Math.max(0, S.tab - 1));
  });
  renderSectionSelect();
  wireSticky();
  wireAlarm();
  wireLearn();
  renderToday();
  renderRadar();
  renderTomorrow();
  renderAttendance();
  renderCgpa();
  setInterval(renderToday, 60_000);
  console.log('[AI-1] Ready. Section:', S.section);
}
document.addEventListener('DOMContentLoaded', init);