# Melapu Praveen Kumar - Personal Portfolio 🚀

A modern, responsive, and glassmorphic personal portfolio website. It features a custom, self-contained **AI Portfolio Assistant** widget to provide visitors with an interactive, conversational exploration of the portfolio.

---

## 🎨 Portfolio Features

- **Premium Design:** Features a dark-themed glassmorphism layout with ambient neon-glow borders.
- **Responsive Layout:** Optimized to look premium on desktops, tablets, and mobile devices.
- **Interactive Particles:** A dynamic canvas-based ambient background.
- **Interactive AI Assistant:** A built-in virtual assistant that visitors can chat with to explore skills, education, and contact details.

---

## 🤖 AI Assistant Widget

The floating assistant in the bottom-right corner is a custom, lightweight widget built entirely from scratch with **pure HTML5, CSS3, and Vanilla JavaScript** (no heavy external libraries or frameworks).

### Key Widget Actions & Features:
- **Interactive Actions:** Triggers smooth scrolling to sections (like `#skills`, `#contact`), opens WhatsApp/Email links, or opens preview modals directly from the chat.
- **Session Name Memory:** Captures and stores visitor names using `sessionStorage` to personalize subsequent replies.
- **Recruiter & Fun Modes:** Custom dialog handlers for recruiter questions (why hire, strengths) and casual easter eggs.
- **Sleek UI:** Typing animations, custom glass scrollbars, word-by-word streaming effect, and quick suggestions horizontal chips row.

---

## 📂 File Structure

- `index.html` - The main portfolio landing page.
- `ai-assistant.js` - Core logic for the AI Assistant (interactive actions, NLP categorizer, streaming).
- `ai-assistant.css` - Styles for the AI widget (floating buttons, responsive mobile panel layout).
- `knowledge.json` - Structured JSON file containing portfolio information.

---

## 🚀 How to Run Locally

Since the project uses static assets, you can run it directly:

1. Clone this repository:
   ```bash
   git clone https://github.com/Praveenkumarmelapu/portfolio.git
   ```
2. Open `index.html` directly in any web browser.
3. *Recommended:* Run it using a local HTTP server (like VS Code **Live Server** extension) to ensure files like `knowledge.json` are retrieved properly.
