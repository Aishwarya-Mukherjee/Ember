<div align="center">

# 🔥 Ember (CareLoop)
### *AI Health Companion for Continuous Chronic Disease Management*

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)


---

</div>

## 🚨 The Problem

Over **60% of adults** live with at least one chronic condition (diabetes, hypertension, asthma, heart disease). Patients see their doctor every 3 to 6 months — but **99% of disease management happens at home every single day**.

- 💊 **Missed Medications & Doses**: Unnoticed missed doses lead to complications.
- 📉 **Untracked Symptom Patterns**: Isolated symptoms like morning dizziness or blood sugar spikes go unnoticed until an emergency occurs.
- ⏳ **High Friction Logging**: Complex health apps overwhelm elderly or low-tech patients.
- 🩺 **Data Disconnect**: Doctors receive no continuous trend data between clinic visits.

---

## 💡 The Solution: Ember AI

**Ember** bridges the gap between episodic doctor visits and daily home care. Powered by conversational AI, an interactive 3D companion canvas, and smart pattern-detection engines, Ember provides effortless, daily health guidance.

### ✨ Key Features

- 🤖 **Interactive 3D Avatar Companion**: Conversational, friendly AI character canvas providing voice & chat guidance (`DoctorCanvas.tsx`).
- 🗣️ **Conversational Check-in & Symptom Tracker**: Natural language input automatically extracts vitals, severity, and symptom logs.
- ⚡ **Early Warning Risk Engine**: Identifies hazardous health trends (e.g. *"Dizziness reported 3x this week"* or *"Blood sugar trending >200 mg/dL over 14 days"*).
- 📊 **Holographic Vitals & Health Score Dashboard**: Real-time status meters for Blood Pressure, Blood Sugar, Heart Rate, and Weight.
- 🔥 **Adherence Streaks & Gamification**: Smart medicine reminders with missed dose escalation logic.
- 📄 **Doctor Health Summary Reports**: Auto-generated shareable health trend reports for clinic visits.

---

## 📸 Interface Preview

<details>
<summary><b>Click to preview application screens</b></summary>

| Screen | Description |
| :--- | :--- |
| **Landing Hero** | Liquid-glass aesthetic background with video hero and quick consultation CTA |
| **Patient Dashboard** | 3-column holographic layout featuring 3D avatar canvas, adherence streak, and live vitals |
| **Interactive Modals** | Rapid check-in, vitals logger, symptom picker, and AI question assistant |

</details>

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/) |
| **Styling & Design System** | Custom Liquid Glass design system, [Tailwind CSS v4](https://tailwindcss.com), Framer Motion |
| **Interactive 3D & Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **Icons & UI Components** | Lucide React, Radix UI primitives (`@base-ui/react`), Shadcn UI |
| **AI & Pattern Analysis** | Anthropic AI SDK (`@anthropic-ai/sdk`), Rule-based Risk Engine |
| **Language & Tooling** | TypeScript 5, ESLint 9 |

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Aishwarya-Mukherjee/Ember.git
   cd Ember
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open Application**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.
   - **Landing Page**: `/`
   - **Patient Dashboard**: `/dashboard`

---

## 📁 Repository Structure

```
.
├── app/
│   ├── layout.tsx          # Main HTML layout & fonts
│   ├── page.tsx            # Landing page with video hero & CTA
│   └── dashboard/
│       ├── layout.tsx      # Dashboard glass layout with sidebar
│       └── page.tsx        # Holographic patient overview & 3D canvas
├── components/
│   ├── DoctorCanvas.tsx    # Animated 3D AI Doctor Avatar & speech bubble
│   ├── Sidebar.tsx         # Active-route aware glass navigation sidebar
│   └── ui/                 # Reusable Shadcn UI primitives (Button, Card, Badge, etc.)
├── data/
│   └── seed.ts             # Synthetic patient data (Meera Sharma, 58 y/o Diabetic)
├── docs/
│   ├── CareLoop_PRD.md     # Full Product Requirements Document (PRD)
│   └── assets/             # Design mockups & presentation graphics
├── lib/
│   ├── types.ts            # TypeScript interfaces (Patient, Vitals, Symptoms, Alerts)
│   └── utils.ts            # Classnames & Tailwind utilities
├── next.config.ts          # Next.js & Turbopack configuration
├── package.json            # Project dependencies & scripts
└── README.md               # Project documentation
```

---

## 📖 Documentation & PRD

For full product specs, user personas (Meera, Rajesh, Dr. Anya), success metrics, and 48-hour build milestones, explore our PRD:
- 📄 **[CareLoop PRD Document](file:///Users/rishavroy/Ember/Ember/docs/CareLoop_PRD.md)**

---

## 🔒 Environment Variables

Ember requires several environment variables for database connection and AI generation.

Create a `.env.local` file at the root of the project:

```bash
DATABASE_URL="postgres://user:password@host:port/database"
ANTHROPIC_API_KEY="your-anthropic-key-here"
```

> **Security Note:** Never commit actual secrets. See `.env.example` for the required schema.

---

## 🗄️ Database & Prisma

We use Prisma ORM connected to PostgreSQL.

1. **Push schema to local database:**
   ```bash
   npx prisma db push
   ```
2. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```
3. **Seed mock database (optional):**
   ```bash
   npm run prisma:seed
   ```
   *(Note: This populates synthetic mock patients like Meera Sharma).*

---

## 🚀 Deployment (Vercel)

Ember is designed for zero-config deployment on [Vercel](https://vercel.com).

1. Import the repository into your Vercel Dashboard.
2. Navigate to **Settings > Environment Variables** and inject the following:
   - `DATABASE_URL` (Points to your production PostgreSQL like Supabase or Neon)
   - `ANTHROPIC_API_KEY`
3. Under **Build & Development Settings**, Vercel will automatically run `npm run build`.
4. **IMPORTANT: Database Migrations in Production**
   Do NOT use `prisma db push` or `prisma migrate dev` in production. Instead, run:
   ```bash
   npx prisma migrate deploy
   ```
   *You can add this to your build command in `package.json` if preferred: `"build": "prisma generate && prisma migrate deploy && next build"`*

---

## ⚖️ Medical Disclaimer

*All AI-generated insights and pattern detections within Ember are intended for general wellness and pattern recognition only. They do not constitute medical diagnosis, treatment advice, or emergency medical services. Users are directed to consult licensed healthcare professionals for medical decisions.*

---

