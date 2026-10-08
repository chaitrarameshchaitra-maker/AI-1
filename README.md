# 🎓 AI1 // All-In-One Campus Matrix
> **An Intelligent Campus Operating System tailored for Sapthagiri NPS University (1st Year P/C Cycle)**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built for](https://img.shields.io/badge/Built_for-Sapthagiri_NPS_University-cyan.svg)](#)
[![Hackathon](https://img.shields.io/badge/Hackathon-Submission-success.svg)](#)
[![Status](https://img.shields.io/badge/Status-Active_Prototype-emerald.svg)](#)

---

## 🚀 Overview

**AI1 (Campus Matrix)** is a comprehensive, student-centric academic productivity hub designed to solve the real daily friction points of engineering undergrads:
- Fragmented class schedules and venue confusion.
- The anxiety of maintaining VTU / University mandatory 75% attendance criteria.
- Night-before internal exam (IA) panic and unstructured study sessions.
- Difficulty visualizing complex 3D engineering graphics (CAEG) projections.

With a **"Calm Semi-Cyber"** dark mode interface and localized multimodal intelligence, AI1 consolidates daily campus life into one unified command center.

---

## ⚡ Core Modules

### 1. 📅 Timetable & Class Radar
- Daily chronological lecture timeline with venue tags (e.g. Hall 204, B-Block).
- Smart 5m / 10m reminder alarms with hardware wake-up push triggers.
- Tomorrow's Forecast & Next Class radar.
- Sticky Notes per subject for rapid lab submission tracking.

### 2. 🎓 Attendance & Bunk Shishya (ಬಂಕ್ ಶಿಷ್ಯ) Advisor
- **Credit-Weighted Calculation**: Theory (3-4 credits) vs Practical labs (2 credits).
- **Safe Zone Monitor**: Real-time 75% cutoff threshold tracking with margin buffers.
- **Bunk Advisor**: Calculates exactly how many classes you can safely skip or how many you must attend consecutively to recover from critical zones.

### 3. 👨‍🏫 Desi AI Studio & Multimodal PDF Parser
- Direct syllabus, PPT, and question paper ingestion powered by Gemini 1.5 Flash.
- **Dual Persona Switcher**:
  - *Desi Sir Mode*: Authentic, memorable classroom persona with local cadence ("Classroom Raaga") and high-emphasis exam callouts.
  - *Formal Professor Mode*: Strict academic explanations.
- One-click study directives:
  - Line-by-Line Concept Clarity.
  - Expected IA & Semester Exam Question Trends.
  - Pre-class Rapid Recall Quizzes.
  - Full classroom speech synthesis audio lectures.

### 4. ⚡ Night-Before IA War-Room
- Real-time countdown timer to IA-1 exam start.
- Flashcard breakdowns for guaranteed 8-mark derivations (e.g., Maxwell’s 4th Equation, Star-Delta transformations).
- **AI External Viva Interrogator**: Rapid-fire oral questions to simulate strict lab viva situations with speech synthesis.

### 5. 📐 CAEG 3D Reality Engine
- Interactive HTML5 Canvas simulator for Computer Aided Engineering Graphics.
- Step-by-step projection generation:
  - **Stage 1**: Simple Position (Plan & Elevation relative to XY reference line).
  - **Stage 2**: Tilting axis/base to Horizontal Plane (HP).
  - **Stage 3**: Tilting to Vertical Plane (VP).
- Natural language geometry prompt parser for instant step decomposition.

### 6. 👤 Student Identity & Campus Integration
- Google Identity OAuth2 authentication simulator.
- Stream locked to Sapthagiri NPS University (SRN: 113995, P-Cycle CSE).

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, Modern CSS3 (CSS Variables, Flexbox, CSS Grid), Vanilla ES6+ JavaScript.
- **Typography**: Plus Jakarta Sans & JetBrains Mono.
- **Visualization**: HTML5 2D/3D Projection Canvas API.
- **Audio & Accessibility**: Web Speech Synthesis API.
- **Design Language**: Calm Semi-Cyber Dark Theme.

---

## 📦 Project Structure

```text
AI-1/
├── index.html       # Single Page Application core UI layout & views
├── styles.css       # Calm Semi-Cyber styling system & animations
├── app.js           # Navigation state, Bunk Shishya engine, CAEG canvas, audio synthesis
└── README.md        # Comprehensive project documentation
```

---

## 🚦 Quick Start

No heavy build steps or npm installations needed!

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chaitrarameshchaitra-maker/AI-1.git
   ```
2. **Navigate into the folder:**
   ```bash
   cd AI-1
   ```
3. **Launch the application:**
   - Double-click `index.html` to open directly in any modern browser (Chrome, Edge, Brave, Firefox).
   - Or serve with any static server:
     ```bash
     npx serve .
     ```

---

## 🏆 Hackathon Highlights
- **Zero Dependencies**: Lightweight, lightning-fast load time (< 50ms).
- **Tailored for Local Campus Culture**: Solves real university workflows with authentic contextual nuance.
- **Full Offline Capability**: Critical timetable, calculation logic, and graphic visualizers run entirely client-side.