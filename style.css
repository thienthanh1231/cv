:root {
  --bg: #0f172a;
  --card: #1f2937;
  --text: #e5e7eb;
  --muted: #9ca3af;
  --primary: #22d3ee;
  --primary-dark: #06b6d4;
  --max-width: 1080px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background: radial-gradient(circle at top right, #1e293b 0%, #020617 46%, #020617 100%);
  color: var(--text);
  line-height: 1.6;
  position: relative;
  overflow-x: hidden;
}

.bg-orb {
  position: fixed;
  width: 320px;
  height: 320px;
  border-radius: 999px;
  filter: blur(75px);
  z-index: -1;
  opacity: 0.35;
  animation: float 14s ease-in-out infinite;
}

.orb-1 {
  background: #22d3ee;
  top: -60px;
  left: -70px;
}

.orb-2 {
  background: #a855f7;
  right: -80px;
  top: 38%;
  animation-delay: -4s;
}

.container {
  width: min(var(--max-width), 92%);
  margin: 0 auto;
}

.glass {
  backdrop-filter: blur(8px);
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 14px;
  padding: 0.45rem 1rem;
}

.hero {
  padding: 1rem 0 5rem;
}

.nav {
  position: sticky;
  top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  z-index: 20;
}

.logo {
  text-decoration: none;
  color: var(--primary);
  font-weight: 800;
  font-size: 1.4rem;
  letter-spacing: 0.03em;
}

.menu {
  display: flex;
  list-style: none;
  gap: 1.2rem;
  padding: 0;
}

.menu a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: color 0.25s ease;
}

.menu a:hover {
  color: var(--primary);
}

.menu-toggle {
  display: none;
  border: 1px solid #334155;
  background: transparent;
  color: var(--text);
  border-radius: 8px;
  font-size: 1.2rem;
}

.hero-content {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
  align-items: center;
}

.hero-text {
  animation: fadeUp 0.75s ease both;
}

.tag {
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 0.4rem;
}

h1 {
  font-size: clamp(2rem, 4vw, 3.4rem);
  margin: 0;
}

h1 span {
  color: var(--primary);
}

.lead {
  color: var(--muted);
  max-width: 58ch;
}

.section {
  padding: 4rem 0;
}

.alt {
  background: rgba(17, 24, 39, 0.58);
}

.grid {
  display: grid;
  gap: 1.2rem;
}

.skills-grid,
.project-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.card {
  background: linear-gradient(160deg, rgba(31, 41, 55, 0.86), rgba(15, 23, 42, 0.72));
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 1.2rem;
  transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 32px rgba(8, 47, 73, 0.35);
  border-color: rgba(34, 211, 238, 0.45);
}

.cta-group {
  margin-top: 1.25rem;
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.65rem 1rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.24);
}

.btn.primary {
  background: var(--primary);
  color: #06202a;
}

.btn.primary:hover {
  background: var(--primary-dark);
}

.btn.ghost {
  border: 1px solid #334155;
  color: var(--text);
}

.project-card a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
}

.contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;
  align-items: start;
}

.contact-form label {
  display: grid;
  gap: 0.35rem;
  margin-bottom: 0.8rem;
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  background: #0b1220;
  border: 1px solid #334155;
  border-radius: 10px;
  color: var(--text);
  padding: 0.7rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.2);
}

.form-note {
  min-height: 1.3rem;
  margin-top: 0.5rem;
  color: #86efac;
  font-size: 0.95rem;
}

.footer {
  text-align: center;
  color: var(--muted);
  padding: 1.6rem;
  border-top: 1px solid #1e293b;
}

[data-animate] {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}

[data-animate].in-view {
  opacity: 1;
  transform: translateY(0);
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(28px, -18px) scale(1.07);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .hero-content,
  .skills-grid,
  .project-grid,
  .contact {
    grid-template-columns: 1fr;
  }

  .bg-orb {
    width: 220px;
    height: 220px;
  }
}

@media (max-width: 680px) {
  .menu-toggle {
    display: inline-block;
    padding: 0.35rem 0.6rem;
  }

  .menu {
    position: absolute;
    top: 3.8rem;
    right: 4%;
    background: #0b1220;
    border: 1px solid #334155;
    border-radius: 10px;
    flex-direction: column;
    width: 190px;
    padding: 0.75rem;
    display: none;
  }

  .menu.open {
    display: flex;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
