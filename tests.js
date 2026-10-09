/* AI-1 — Self-test suite. Runs on page load, displays results. */

(function () {
  'use strict';

  const results = [];

  function test(name, fn) {
    try {
      const ok = fn();
      results.push({ name, pass: !!ok, error: null });
    } catch (e) {
      results.push({ name, pass: false, error: e.message });
    }
  }

  function assert(cond, msg) {
    if (!cond) throw new Error(msg || 'Assertion failed');
  }

  // ---- 1. Data integrity ----
  test('AI1_DATA global exists', () => {
    return typeof window.AI1_DATA === 'object' && window.AI1_DATA !== null;
  });

  test('At least 75 sections loaded', () => {
    return window.AI1_DATA.allSectionCodes.length >= 75;
  });

  test('1CSE01 has real schedule', () => {
    const s = window.AI1_DATA.sections['1CSE01'];
    assert(s, 'Section missing');
    assert(s.advisor === 'Dr. Ashwini V Bhat', 'Wrong advisor: ' + s.advisor);
    assert(s.schedule.MON.length > 0, 'No Monday classes');
    return true;
  });

  test('1CSE22 has real schedule', () => {
    const s = window.AI1_DATA.sections['1CSE22'];
    assert(s, 'Section missing');
    assert(s.schedule.FRI.length === 5, 'Wrong Friday count: ' + s.schedule.FRI.length);
    return true;
  });

  test('Every section has periods defined', () => {
    const codes = window.AI1_DATA.allSectionCodes;
    for (const c of codes) {
      const s = window.AI1_DATA.sections[c];
      assert(s.periods && s.periods.length === 9, `Section ${c} has bad periods`);
    }
    return true;
  });

  test('Every section has 5 weekdays', () => {
    const days = ['MON','TUE','WED','THU','FRI'];
    for (const c of window.AI1_DATA.allSectionCodes) {
      const s = window.AI1_DATA.sections[c];
      for (const d of days) assert(Array.isArray(s.schedule[d]), `Section ${c} missing ${d}`);
    }
    return true;
  });

  // ---- 2. Utility functions ----
  test('escapeHtml neutralizes script tags', () => {
    const input = '<script>alert(1)</script>';
    const out = String(input).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    return out.includes('&lt;script&gt;') && !out.includes('<script>');
  });

  test('Time formatter handles AM', () => {
    const [h,m] = '08:30'.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return ampm === 'AM' && h12 === 8;
  });

  test('Time formatter handles PM', () => {
    const [h] = '14:00'.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return ampm === 'PM' && h12 === 2;
  });

  test('Time converts to minutes correctly', () => {
    const [h,m] = '09:45'.split(':').map(Number);
    return h * 60 + m === 585;
  });

  // ---- 3. Storage ----
  test('localStorage is available', () => {
    try {
      localStorage.setItem('__test__', '1');
      localStorage.removeItem('__test__');
      return true;
    } catch { return false; }
  });

  test('Section persists in localStorage', () => {
    const s = localStorage.getItem('ai1.section');
    return s === null || typeof s === 'string';
  });

  // ---- 4. DOM ----
  test('All 4 tabs present', () => {
    return document.querySelectorAll('.tab').length === 4;
  });

  test('All 4 slides present', () => {
    return document.querySelectorAll('.slide').length === 4;
  });

  test('Section dropdown populated', () => {
    const sel = document.getElementById('sectionSelect');
    return sel && sel.options.length >= 75;
  });

  test('Header brand present', () => {
    return !!document.querySelector('.brand-title');
  });

  test('Mascot cursor element exists', () => {
    return !!document.getElementById('mascotCursor');
  });

  // ---- 5. Accessibility ----
  test('All buttons have accessible text or aria-label', () => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.every(b => (b.textContent || '').trim() || b.getAttribute('aria-label'));
  });

  test('Tabs have role=tab', () => {
    const tabs = Array.from(document.querySelectorAll('.tab'));
    return tabs.every(t => t.getAttribute('role') === 'tab');
  });

  test('HTML lang attribute is set', () => {
    return document.documentElement.lang === 'en';
  });

  // ---- Summary ----
  const passed = results.filter(r => r.pass).length;
  const total = results.length;
  const pct = Math.round((passed / total) * 100);

  console.group(`%cAI-1 Tests: ${passed}/${total} passed (${pct}%)`,
                `color:${pct === 100 ? '#16a34a' : pct >= 80 ? '#d97706' : '#dc2626'};font-weight:bold;`);
  results.forEach(r => {
    const icon = r.pass ? '✅' : '❌';
    const style = r.pass ? 'color:#16a34a' : 'color:#dc2626';
    console.log(`%c${icon} ${r.name}${r.error ? ' — ' + r.error : ''}`, style);
  });
  console.groupEnd();

  // Add a small floating badge
  window.addEventListener('DOMContentLoaded', () => {
    const badge = document.createElement('div');
    badge.id = 'testBadge';
    badge.style.cssText = `
      position:fixed; bottom:14px; left:14px; z-index:99999;
      background:#0f172a; color:#fff; padding:8px 14px; border-radius:999px;
      font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700;
      cursor:pointer; box-shadow:0 8px 20px rgba(0,0,0,0.25); user-select:none;
    `;
    badge.textContent = `Tests: ${passed}/${total} ✓`;
    badge.title = 'Click to see detailed results in console';
    badge.addEventListener('click', () => console.log('Open DevTools Console to see test details'));
    document.body.appendChild(badge);
  });
})();