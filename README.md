# 🚀 GS Aprova - Landing Hub

GS Aprova Landing Hub is a modern web interface for the **GS Aprova** platform, designed to accelerate prototyping and integrate AI for content automation and educational metrics. Built with React, Vite, and a robust suite of developer tools, it offers a scalable foundation for educational applications and rapid feature iteration.

---

## ✨ Features

- Fast and responsive front-end powered by React + Vite
- Styled with TailwindCSS, Shadcn/UI, and Radix
- Real-time data management with Supabase and Tanstack React Query
- Form handling and validation with React Hook Form + Zod
- Interactive charts and visualizations (Recharts)
- Automated testing with Vitest + Testing Library
- Continuous integration and deployment via GitHub Actions, Vercel, or Netlify
- AI-augmented content and metric automation
- Built and maintained with [Lovable](https://lovable.dev/)

---

## 🧱 Tech Stack

- **Frontend Framework:** React (TypeScript), Vite
- **UI/UX:** TailwindCSS, Shadcn/UI, Radix
- **Forms & Validation:** React Hook Form, Zod
- **State & Data:** Tanstack React Query, Supabase
- **Charts:** Recharts
- **Testing:** Vitest, Testing Library
- **Build & Dev Tools:** ESLint, Prettier, TypeScript, Vite
- **Automation & Deploy:** GitHub Actions, Vercel, Netlify

---

## 📁 Folder Structure

```
.
├── public/             # Static assets
├── src/                # Application source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility libraries
│   ├── styles/         # Global and component styles
│   └── ...             # Other feature folders
├── private/            # Previous README and confidential docs
├── .github/            # GitHub Actions workflows
├── README.md           # Project overview and instructions
├── package.json        # Project metadata and dependencies
└── ...                 # Configs and other root files
```

---

## ⚙️ Getting Started

### 1️⃣ Prerequisites

- Node.js 20+
- npm 10+ or [Bun](https://bun.sh/)

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Local Development

```bash
npm run dev
```
This starts the local server with hot reload. Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Environment Variables

To connect to Supabase or other services, create a `.env.local` file and add your keys:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
# Add other variables as needed
```
> Refer to `.env.example` for all supported environment variables.

---

## 🚀 Deployment

### GitHub Pages (Automatic Production Deployment)

1. Enable GitHub Pages in your repository's Settings → Pages
2. Set "Source" to "GitHub Actions"
3. Every push to `main` triggers deployment via `.github/workflows/deploy.yml`
4. SPA routing supported with `404.html`

### Other Platforms

- **Vercel:** Connect GitHub repository for auto-deploys
- **Netlify:** Drag & drop `dist` or connect repo
- **Cloudflare Pages:** Connect repo, build with `npm run build`
- **AWS S3:** Upload `dist` contents to your bucket

### Build Commands

```bash
npm run build         # Production build
npm run build:dev     # Dev build with source maps
npm run preview       # Preview production build locally
```

---

## 🌐 Custom Domains

You can connect a custom domain to your Lovable project:

1. Go to Project > Settings > Domains
2. Click "Connect Domain"
3. [Guide: Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a Pull Request

Please review our [Code of Conduct](CODE_OF_CONDUCT.md) and [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

---

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

- Unit tests: Vitest
- Component tests: Testing Library

---

## 📄 Documentation & Links

- [Lovable Documentation](https://docs.lovable.dev/)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Docs](https://vitejs.dev/guide/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Shadcn UI](https://ui.shadcn.com/docs)
- [Radix UI](https://www.radix-ui.com/docs)

---

## 👤 Maintainers & Contact

- Gustavo Salves ([@salvesgustavo22-ops](https://github.com/salvesgustavo22-ops))
- [Open an Issue](https://github.com/salvesgustavo22-ops/gsprova-landing-hub/issues) for help or feature requests

---

## 📜 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 💡 Acknowledgements

- Lovable team for platform and tooling
- All contributors and open source dependencies

---

_Thank you for using GS Aprova - Landing Hub!_
