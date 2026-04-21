# 🚀 Flux Manager Pro - Modern Kanban Dashboard

**Flux Manager Pro** is a high-performance, visually stunning Kanban application designed for streamlined project management. Built with a focus on user experience, it features a sleek **Glassmorphism** UI, full Drag & Drop support, and a robust state management system.

## 🛠 Tech Stack & Versions

The project is built using the latest industry-standard technologies:

| Dependency | Version | Description |
| :--- | :--- | :--- |
| **React** | `^18.3.1` | UI Library |
| **TypeScript** | `^5.2.2` | Static Typing |
| **Vite** | `^5.4.1` | Next-generation Frontend Tooling |
| **Zustand** | `^4.5.5` | Lightweight State Management |
| **dnd-kit** | `^6.1.1` | Modern Drag and Drop Toolkit |
| **Framer Motion** | `^11.3.31` | Production-ready Animations |
| **Lucide React** | `^0.436.0` | Beautiful & Consistent Icons |
| **Sass** | `^1.77.8` | Advanced CSS Preprocessor |

---

## 📂 Project Structure

```text
flux-manager/
├── public/                # Static assets (Favicon, etc.)
├── src/
│   ├── components/        # React Components
│   │   ├── KanbanBoard.tsx# Main board wrapper & logic
│   │   ├── Column.tsx      # Column container for tasks
│   │   ├── TaskCard.tsx   # Individual task item
│   │   └── TaskModal.tsx  # Task detail view & editor (Pop-up)
│   ├── store/
│   │   └── useKanbanStore.ts # Zustand store with persistence
│   ├── styles/
│   │   └── kanban.scss    # Global styles, themes & variables
│   ├── App.tsx            # Main application entry point
│   └── main.tsx           # React DOM rendering
├── .gitignore             # Project ignore rules
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration