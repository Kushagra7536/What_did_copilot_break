# What Did Copilot Break? 🔍

**What Did Copilot Break?** is an AI-powered diff explainer designed to help developers quickly understand code changes. Whether you're reviewing a pull request, trying to figure out what an AI coding assistant just did to your file, or double-checking your own work, this tool provides a plain-English breakdown of what changed, what could potentially break, and what specific scenarios you should test.

Built with a clean, minimalist paper-and-ink aesthetic, the application uses **Claude AI** (powered by Featherless AI) to read your code diffs and deliver actionable insights.

## Features ✨

- **Side-by-Side & Unified Diff Support:** Paste your original and modified code side-by-side, or drop in a standard unified diff (like from `git diff`).
- **AI-Powered Analysis:** Identifies changes, highlights potential risks, and suggests practical test cases.
- **Risk Severity Badges:** Automatically categorizes the safety of your changes into ✅ Safe, 🟡 Risky, or 🚨 Yikes.
- **Report Export:** Copy the generated analysis as Markdown with a single click to share in PR comments or documentation.
- **Local-First API Key:** Your Featherless API key is stored locally in your browser and never sent to a backend server.

## Getting Started 🚀

Follow these steps to run the application locally on your machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- An API key from [Featherless AI](https://featherless.ai)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kushagra7536/What_did_copilot_break.git
   cd What_did_copilot_break
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file to create your own configuration:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and add your Featherless API key:
   ```env
   VITE_FEATHERLESS_API_KEY=your_api_key_here
   # Optional: Override the model used (defaults to meta-llama/Meta-Llama-3.1-8B-Instruct)
   VITE_FEATHERLESS_MODEL=meta-llama/Meta-Llama-3.1-8B-Instruct
   ```
   *Note: If you don't set the key in the `.env` file, the app will prompt you to enter it in the browser UI, where it will be saved to `localStorage`.*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the App:**
   Open your browser and navigate to `http://localhost:5173` (or whichever port Vite provides).

## How to Use 🛠️

1. **Set your API Key:** If you didn't add it to your `.env` file, click the **"Set API key"** button in the top right corner and paste your Featherless AI key.
2. **Choose your Mode:** Toggle between **"Side-by-Side"** (pasting before and after code separately) and **"Unified Diff"** (pasting a single `git diff` output).
3. **Paste your Code:** Drop your code changes into the text areas.
4. **Analyze:** Click **"Explain the Diff"**. The app will take a few seconds to review the code and generate your personalized report!

## Tech Stack 💻

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS v4 (Custom Paper/Ink Theme)
- **AI Integration:** Featherless AI (Claude/Llama)

---
*Created by Yash & AI.*
