/* ============================================================
   AI-1: ALL-IN-ONE CAMPUS MATRIX - Core Engine
   ============================================================ */

// --- 1. CORE NAVIGATION & STATE ---
function navigateTo(viewId) {
  // Hide all views
  document.querySelectorAll('.app-view').forEach(view => {
    view.classList.remove('active-view');
  });
  // Show target view
  document.getElementById(viewId).classList.add('active-view');
  
  // Specific view initializations
  if (viewId === 'view-caeg') initCaegCanvas();
  if (viewId === 'view-attendance') renderAttendance();
}

// --- 2. PROFILE & AUTHENTICATION ---
function saveProfile() {
  const name = document.getElementById('profName').value;
  const cycle = document.getElementById('profCycle').value;
  
  document.getElementById('headerUserName').innerText = name;
  document.getElementById('headerUserMeta').innerText = `1st Year • ${cycle}`;
  document.getElementById('avatarLetter').innerText = name.charAt(0).toUpperCase();
  document.getElementById('heroGreeting').innerText = `Welcome back, ${name.split(' ')[0]}`;
  
  alert("Profile Identity Saved!");
}

function simulateGoogleSignIn() {
  alert("Google OAuth2 Sync Complete. Identity verified as Sapthagiri Student.");
}

// --- 3. TIMETABLE & EXCEL INGESTION ---
let masterTimetable = [
  { subject: "Physics for Computing (PHY101)", credits: 4, prof: "Dr. Ramesh K.", time: "09:00 - 10:00 AM", status: "present" },
  { subject: "Basic Electrical Engg (BEE102)", credits: 3, prof: "Prof. Sunitha M.", time: "10:15 - 11:15 AM", status: "upcoming" },
  { subject: "CAEG Lab (Practical)", credits: 2, prof: "Prof. Anand V.", time: "11:30 - 01:30 PM", status: "upcoming" }
];

function handleExcelUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);
    
    alert(`Successfully parsed ${json.length} rows from Excel!`);
    
    // In a real app, map 'json' to 'masterTimetable' here. 
    // For the UI, we'll re-render the default list to simulate the update.
    renderTimetable();
  };
  reader.readAsArrayBuffer(file);
}

function renderTimetable() {
  const container = document.getElementById('timetableList');
  container.innerHTML = '';
  
  masterTimetable.forEach((cls, index) => {
    container.innerHTML += `
      <div class="class-item ${cls.status === 'present' ? 'active-class' : ''}">
        <div class="item-top">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="subj-title">${index + 1}. ${cls.subject}</span>
            <span class="subj-credits">${cls.credits} CREDITS</span>
          </div>
          <div style="font-family: var(--font-mono); color: var(--accent-cyan); font-size: 13px;">${cls.time}</div>
        </div>
        <div class="item-meta">${cls.prof}</div>
        <div class="item-actions">
          <div class="status-chips">
            <button class="btn-chip chip-present" onclick="logAttendance('${cls.subject}', 'present')">Attended (+1)</button>
            <button class="btn-chip chip-missed" onclick="logAttendance('${cls.subject}', 'missed')">Missed</button>
            <button class="btn-chip chip-noclass">No Class</button>
          </div>
          <button class="btn-chip" style="background:rgba(56,189,248,0.1); color:var(--accent-cyan);" onclick="alert('Alarm set for 10 mins before ${cls.subject}')">
            🔔 Remind Me
          </button>
        </div>
      </div>
    `;
  });
}

function loadDefaultSapthagiriTimetable() {
  renderTimetable();
  alert("Default P-Cycle Section A timetable loaded.");
}

function saveStickyNote() {
  alert("Sticky note saved to cloud storage!");
}

function requestWakeUpPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("AI-1 Active", { body: "Wake-up alarms and class pushes are now enabled!" });
      }
    });
  } else {
    alert("Browser does not support desktop notifications.");
  }
}

// --- 4. ATTENDANCE & BUNK SHISHYA ENGINE ---
let attendanceData = [
  { subj: "Physics (PHY101)", attended: 18, total: 22 },
  { subj: "Basic Electrical (BEE102)", attended: 13, total: 19 },
  { subj: "CAEG Practical", attended: 15, total: 17 }
];

function renderAttendance() {
  const container = document.getElementById('attendanceList');
  container.innerHTML = `<h3 style="font-size: 16px; margin-bottom: 16px; color: #f8fafc;">Live Credit-Weighted Matrix</h3>`;
  
  attendanceData.forEach(item => {
    let percentage = (item.attended / item.total) * 100;
    let isSafe = percentage >= 75;
    let color = isSafe ? "var(--accent-green)" : "var(--accent-rose)";
    let statusText = isSafe ? "SAFE" : "CRITICAL";

    container.innerHTML += `
      <div class="class-item" style="border-color: ${color}40; cursor:pointer;" onclick="analyzeBunk('${item.subj}', ${item.attended}, ${item.total})">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <strong style="color:var(--text-main); font-size:14px;">${item.subj}</strong>
          <strong style="color:${color}; font-size:14px;">${percentage.toFixed(1)}% [${statusText}]</strong>
        </div>
        <div style="font-size:11px; color:var(--text-muted); margin-bottom:8px;">
          Attended: ${item.attended} / ${item.total} Classes Conducted
        </div>
        <div style="width:100%; height:6px; background:rgba(0,0,0,0.3); border-radius:3px; overflow:hidden;">
          <div style="width:${percentage}%; height:100%; background:${color};"></div>
        </div>
      </div>
    `;
  });
}

function analyzeBunk(subject, attended, total) {
  const adviceBox = document.getElementById('bunkShishyaAdvice');
  let currentPct = (attended / total) * 100;
  
  if (currentPct >= 75) {
    // Calculate how many they can bunk
    let margin = 0;
    while ((attended / (total + margin + 1)) >= 0.75) {
      margin++;
    }
    adviceBox.innerHTML = `Chill Shishya! In <strong>${subject}</strong> your attendance is ${currentPct.toFixed(1)}%. You can safely bunk <strong>${margin} more classes</strong> and still maintain the 75% cutoff!`;
  } else {
    // Calculate how many they need to attend consecutively
    let needed = 0;
    while (((attended + needed) / (total + needed)) < 0.75) {
      needed++;
    }
    adviceBox.innerHTML = `🚨 Encountered of Bunking! In <strong>${subject}</strong> you are at ${currentPct.toFixed(1)}%. You must attend the next <strong>${needed} consecutive classes</strong> to reach safe harbor!`;
  }
}

function logAttendance(subject, status) {
  alert(`Logged ${status} for ${subject}. Matrix updated.`);
  renderAttendance();
}

// --- 5. DESI AI STUDIO ---
let currentPersona = 'desi';

function setPersona(persona) {
  currentPersona = persona;
  document.getElementById('btnPersonaDesi').classList.toggle('active-desi', persona === 'desi');
  document.getElementById('btnPersonaAcademic').classList.toggle('active-academic', persona === 'academic');
  
  const badge = document.getElementById('chatHeaderBadge');
  if (persona === 'desi') {
    badge.innerHTML = '👨‍🏫 Desi Sir: Prof. Sreenivas Sir (Physics)';
    badge.style.color = "var(--accent-amber)";
  } else {
    badge.innerHTML = '🎓 Formal Professor Mode: Gemini AI';
    badge.style.color = "var(--accent-cyan)";
  }
}

function handleFileUpload(event) {
  if (event.target.files.length > 0) {
    document.getElementById('uploadStatusText').innerText = `Loaded: ${event.target.files[0].name}`;
    document.getElementById('uploadStatusText').style.color = "var(--accent-green)";
  }
}

function executeDirective(type, btnElement) {
  document.querySelectorAll('.directive-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');
  
  const stream = document.getElementById('chatStream');
  if (type === 'quiz') {
    stream.innerHTML += `
      <div class="msg-desi" style="border-left-color:var(--accent-cyan);">
        <p><strong>Quiz Time!</strong> Question 1: What is the physical significance of Displacement Current in a capacitor circuit?</p>
      </div>`;
  }
  stream.scrollTop = stream.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById('userChatInput');
  const msg = input.value.trim();
  if (!msg) return;
  
  const stream = document.getElementById('chatStream');
  stream.innerHTML += `
    <div style="background:rgba(56,189,248,0.1); padding:10px 14px; border-radius:10px 0 10px 10px; align-self:flex-end; font-size:13px; color:var(--text-main); margin-bottom:14px; margin-left:40px;">
      ${msg}
    </div>`;
    
  input.value = '';
  
  // Fake AI Reply
  setTimeout(() => {
    stream.innerHTML += `
      <div class="msg-desi">
        <p>Shishya, you are asking a very basic doubt! Listen, ${msg} is directly related to Faraday's law. <span class="raaga-hook">Understand properly!</span></p>
      </div>`;
    stream.scrollTop = stream.scrollHeight;
  }, 800);
}

function handleChatKey(e) {
  if (e.key === 'Enter') sendChatMessage();
}

function playCurrentDialogueAudio() {
  if ('speechSynthesis' in window) {
    const text = "Listen carefully backbenchers! Don't look at the window, see the board! Every single year students make the same mistake. Take one clean pen and paper, and writeee downnn!";
    const utterance = new SpeechSynthesisUtterance(text);
    // Simulating Desi Sir Raaga (Slightly slower, varied pitch)
    utterance.rate = 0.95; 
    utterance.pitch = 0.9;
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Your browser does not support Web Speech API.");
  }
}

// --- 6. WAR-ROOM & EXAM PREP ---
function toggleDerivationAnswer(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

const vivaQuestions = [
  "Student, explain the difference between Intrinsic and Extrinsic semiconductors in 10 seconds. Go!",
  "What is the condition for maximum efficiency in a transformer? Answer quickly.",
  "If the apparent angle beta is given, how do you find the true length in orthographic projection?"
];

function triggerVivaQuestion() {
  const q = vivaQuestions[Math.floor(Math.random() * vivaQuestions.length)];
  const box = document.getElementById('vivaQuestionBox');
  box.style.display = 'block';
  box.innerHTML = `<strong style="color:var(--accent-rose);">EXAMINER:</strong> ${q}`;
  
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(q);
    utterance.rate = 1.1; // Strict, fast examiner
    utterance.pitch = 0.8;
    window.speechSynthesis.speak(utterance);
  }
}

// --- 7. CAEG 3D REALITY ENGINE (Canvas Simulation) ---
function initCaegCanvas() {
  setCaegStage(1, document.querySelector('.pill-group .pill'));
}

function setCaegStage(stage, btnElement) {
  const pills = btnElement.parentElement.querySelectorAll('.pill');
  pills.forEach(p => p.classList.remove('active'));
  btnElement.classList.add('active');
  
  const canvas = document.getElementById('caegCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw X-Y Reference Line
  ctx.beginPath();
  ctx.moveTo(50, 200);
  ctx.lineTo(650, 200);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.fillText("X", 30, 205);
  ctx.fillText("Y", 660, 205);
  ctx.fillText("VP", 40, 180);
  ctx.fillText("HP", 40, 220);

  ctx.strokeStyle = "var(--accent-cyan)";
  ctx.lineWidth = 2;

  if (stage === 1) {
    // Simple position: Triangle above XY, Square below XY
    // Front View (Triangle)
    ctx.beginPath();
    ctx.moveTo(200, 200); // base left
    ctx.lineTo(300, 200); // base right
    ctx.lineTo(250, 80);  // apex
    ctx.closePath();
    ctx.stroke();
    
    // Top View (Square)
    ctx.beginPath();
    ctx.rect(200, 230, 100, 100);
    ctx.stroke();
    // Diagonals
    ctx.moveTo(200, 230); ctx.lineTo(300, 330);
    ctx.moveTo(300, 230); ctx.lineTo(200, 330);
    ctx.stroke();

    // Projection Lines
    drawDashedLine(ctx, 200, 200, 200, 230);
    drawDashedLine(ctx, 300, 200, 300, 230);
    drawDashedLine(ctx, 250, 80, 250, 280);
  } else if (stage === 2) {
    // Tilt to HP (Rotated Triangle above XY)
    ctx.beginPath();
    ctx.moveTo(200, 200); // base resting point
    ctx.lineTo(270, 130); // tilted base
    ctx.lineTo(150, 60);  // tilted apex
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "var(--text-muted)";
    ctx.fillText("45° Tilt", 210, 195);
  } else if (stage === 3) {
    // Tilt to VP (Complex orthographic mock)
    ctx.beginPath();
    ctx.moveTo(400, 200);
    ctx.lineTo(480, 140);
    ctx.lineTo(380, 50);
    ctx.closePath();
    ctx.stroke();
    
    // Top View rotated
    ctx.beginPath();
    ctx.moveTo(400, 250);
    ctx.lineTo(480, 280);
    ctx.lineTo(450, 360);
    ctx.lineTo(370, 330);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "var(--text-muted)";
    ctx.fillText("30° to VP", 485, 290);
  }
}

function drawDashedLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = "var(--accent-purple)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.setLineDash([]); // reset
}

function parseCaegPrompt() {
  const prompt = document.getElementById('caegPrompt').value;
  if (!prompt) return;
  alert("Gemini parsed geometry: Square Pyramid (35mm base, 65mm axis). Generating construction steps...");
  setCaegStage(1, document.querySelector('.pill-group .pill')); // Reset to stage 1
}

// Initial load
window.onload = () => {
  renderTimetable();
};
