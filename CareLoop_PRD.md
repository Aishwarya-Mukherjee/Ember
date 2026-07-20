# Product Requirements Document (PRD)
## CareLoop — AI Health Assistant for Chronic Illness Management

**Version:** 1.0
**Date:** July 19, 2026
**Document Owner:** Product/Hackathon Team
**Status:** Draft for Build

---

## 1. Executive Summary

CareLoop is an AI-powered health companion that helps patients with chronic conditions (diabetes, hypertension, asthma, heart disease) manage their daily care routine through conversational check-ins, smart reminders, symptom tracking, and AI-generated risk insights. It closes the gap between episodic doctor visits and continuous daily disease management, improving medication adherence, enabling early risk detection, and reducing preventable hospital visits.

---

## 2. Problem Statement

Millions of chronic illness patients struggle with daily healthcare management — missed medications, missed appointments, and untracked symptoms lead to worsening health outcomes and avoidable hospital visits. There is no continuous, intelligent system bridging the gap between infrequent doctor visits and the patient's daily reality.

---

## 3. Goals and Objectives

### 3.1 Product Goals
- Improve medication and appointment adherence through intelligent, adaptive reminders.
- Enable continuous symptom and vitals tracking with minimal user friction.
- Detect early warning signs of health deterioration using AI-driven pattern analysis.
- Strengthen patient-doctor communication via automated, shareable health summaries.
- Reduce unnecessary hospital visits through early intervention and alerts.

### 3.2 Success Metrics (Post-Hackathon / Pilot Stage)
| Metric | Target |
|---|---|
| Medication adherence rate | +25% improvement vs. baseline |
| Symptom logging engagement | 5+ logs/week per active user |
| Risk alert precision (pilot) | >70% clinically relevant flags |
| Doctor summary usage | 80% of users generate ≥1 report/month |
| Time to detect abnormal pattern | <24 hours from onset |

---

## 4. Target Users & Personas

### Persona 1: Meera, 58 — Type 2 Diabetic
Forgets medication doses during busy workdays; struggles to track sugar levels consistently; wants simple daily nudges, not complex apps.

### Persona 2: Rajesh, 70 — Hypertension + Heart Condition
Limited tech literacy; relies on family for reminders; needs voice-based interaction and caregiver visibility.

### Persona 3: Dr. Anya — General Physician
Sees patients every 3 months; wants concise, trend-based summaries instead of raw logs to make faster, better-informed decisions.

### Persona 4: Family Caregiver (e.g., adult child)
Wants visibility into an elderly parent's condition without micromanaging; needs to be alerted only when something is genuinely abnormal.

---

## 5. Scope

### 5.1 In Scope (Hackathon MVP)
- Conversational daily check-in (chat-based symptom/med logging)
- Smart medicine & appointment reminders with escalation logic
- Rule-based + AI-assisted risk pattern detection
- Auto-generated health summary report (shareable with doctor)
- Basic patient dashboard (trends, history)
- Mock/synthetic data for demo reliability

### 5.2 Out of Scope (Post-Hackathon / Future Phases)
- Real wearable device integrations (Fitbit, Apple Health, etc.)
- Full HIPAA/GDPR-certified compliance infrastructure
- Multi-language/voice AI at production scale
- Insurance/hospital system integrations
- Clinical-grade diagnostic decision support

---

## 6. Functional Requirements

### 6.1 Smart Reminders
- FR1.1: System shall send medicine reminders at scheduled times.
- FR1.2: System shall send appointment reminders 24 hrs and 1 hr in advance.
- FR1.3: If a reminder is missed twice consecutively, system shall escalate (notify caregiver/flag in dashboard).
- FR1.4: User shall be able to mark reminders as done/snoozed/missed.

### 6.2 Symptom & Health Tracking
- FR2.1: User shall be able to log symptoms via conversational chat interface.
- FR2.2: System shall extract structured data (symptom type, severity, time) from natural language input.
- FR2.3: User shall be able to manually log vitals (BP, sugar level, weight, etc.).
- FR2.4: System shall store historical logs with timestamps for trend analysis.

### 6.3 AI Health Insights & Risk Alerts
- FR3.1: System shall analyze logged data against defined thresholds/rules per condition.
- FR3.2: System shall flag abnormal patterns (e.g., repeated symptom mentions, vitals trending out of range).
- FR3.3: System shall generate a plain-language insight (not a diagnosis) explaining the flagged pattern.
- FR3.4: System shall trigger emergency-style alerts for critical patterns (e.g., "3rd dizziness report this week").

### 6.4 Personalized Recommendations
- FR4.1: System shall provide lifestyle/wellness suggestions based on logged patterns (e.g., hydration, diet reminders).
- FR4.2: Recommendations shall be clearly labeled as general wellness guidance, not medical advice.

### 6.5 Doctor Health Summary Reports
- FR5.1: System shall auto-generate a summarized health report from logs over a selected period.
- FR5.2: Report shall include: adherence rate, symptom trends, vitals trends, flagged risk events.
- FR5.3: User shall be able to export/share the report (PDF or shareable link).

### 6.6 Dashboard
- FR6.1: Patient dashboard shall display adherence streaks, recent symptoms, and vitals trends visually.
- FR6.2: Caregiver/doctor view shall display simplified risk-flag summary.

---

## 7. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Usability | Interface must be simple enough for elderly/low-tech users (large text, voice option) |
| Reliability | Reminder delivery must have <1 min latency in demo environment |
| Privacy | Data must be handled with basic encryption; clear consent messaging shown to user |
| Performance | AI response (chat/insight generation) within 2–3 seconds for demo fluidity |
| Scalability (design intent) | Architecture should be disease-agnostic (rule sets swappable per condition) |
| Safety | All AI outputs must include disclaimers distinguishing "insight" from "diagnosis" |

---

## 8. System Architecture (High-Level)

```
┌─────────────────────────────┐
│        Frontend (App)        │
│  Chat UI | Reminders | Dashboard │
└───────────┬──────────────────┘
            │
┌───────────▼──────────────────┐
│         Backend API           │
│   (FastAPI / Node + Express)  │
└───────────┬──────────────────┘
            │
   ┌────────┼─────────────┬───────────────┐
   │        │             │               │
┌──▼──┐ ┌───▼────┐  ┌─────▼─────┐  ┌──────▼───────┐
│ LLM │ │Reminder│  │  Risk      │  │ Report        │
│ API │ │Scheduler│ │ Detection  │  │ Generator     │
│(Chat/│ │(Cron/  │  │ Engine     │  │ (LLM Summary  │
│NLP) │ │Notify) │  │(Rule-based)│  │  + PDF export)│
└─────┘ └────────┘  └────────────┘  └───────────────┘
            │
      ┌─────▼─────┐
      │  Database  │
      │(Firebase/  │
      │ Postgres)  │
      └────────────┘
```

---

## 9. Tech Stack (Recommended for Hackathon)

| Layer | Technology |
|---|---|
| Frontend | React (web) or Flutter (mobile) |
| Backend | FastAPI (Python) or Node/Express |
| AI/LLM | Claude or GPT API (chat + summarization) |
| Database | Firebase / Supabase (fast setup) |
| Notifications | Web Push / Twilio (SMS/voice demo) |
| Charts | Recharts / Chart.js |
| Report Export | PDF generation library (e.g., pdfkit, jsPDF) |
| Hosting (demo) | Vercel / Render / Firebase Hosting |

---

## 10. User Flow (Core MVP Journey)

1. Patient opens app → greeted by AI check-in ("How are you feeling today?")
2. Patient logs symptoms/meds conversationally or via quick-tap options.
3. System processes input → stores structured data → checks against risk rules.
4. If reminder due → push notification sent; if missed twice → caregiver alerted.
5. If abnormal pattern detected → AI generates plain-language insight + alert shown on dashboard.
6. Patient/caregiver taps "Generate Report" → AI compiles summary → exportable PDF shared with doctor.

---

## 11. Assumptions & Dependencies

- Real patient data is unavailable; synthetic/mock datasets will be used for demo purposes.
- LLM API availability and response latency assumed stable during demo.
- Wearable integration is simulated (mock data feed) rather than live device connection.
- Users are assumed to have basic smartphone access for MVP demo.

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| AI provides unsafe/incorrect health advice | High | Rule-based logic for alerts; LLM restricted to conversation/summarization; clear disclaimers |
| Live demo failure (API/network issues) | High | Pre-recorded backup demo video; offline mock data fallback |
| Scope creep during hackathon | Medium | Lock MVP feature set by hour 4; defer extras to "future roadmap" slide |
| Data privacy concerns raised by judges | Medium | Explicitly present consent flow and encryption approach, even if simulated |
| Over-reliance on synthetic data reducing realism | Low-Medium | Use realistic, condition-specific synthetic datasets prepared pre-event |

---

## 13. Milestones (24–48 Hour Build Plan)

| Time Block | Milestone |
|---|---|
| Hour 0–4 | Finalize scope, set up repo, design data schema, wireframe UI |
| Hour 4–12 | Build chat interface + LLM integration for symptom logging |
| Hour 12–20 | Build reminder engine + risk detection rules |
| Hour 20–30 | Build dashboard + report generation |
| Hour 30–40 | Integration testing, polish UI, seed demo data |
| Hour 40–48 | Rehearse demo, prepare pitch deck, backup recording |

---

## 14. Future Roadmap (Post-Hackathon)

- Real wearable device integration (Apple Health, Fitbit, Google Fit)
- Multi-condition rule engine expansion (COPD, kidney disease, etc.)
- Clinical validation partnership with hospitals for real-world pilot
- Multi-language and voice-first support for accessibility
- Full compliance certification (HIPAA/GDPR) for production deployment
- Insurance/EHR system integrations for care-team workflows

---

## 15. Appendix: Disclaimers

All AI-generated insights within CareLoop are wellness and pattern-recognition aids only. They do not constitute medical diagnosis or treatment advice. Users are directed to consult licensed healthcare professionals for all medical decisions. Emergency alerts are supplementary and not a replacement for emergency medical services.
