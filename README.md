# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0f0b994c-b7a4-4a1a-8c70-bfeaf57be691

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0f0b994c-b7a4-4a1a-8c70-bfeaf57be691) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Option 1: Lovable Platform (Recommended for prototyping)
Simply open [Lovable](https://lovable.dev/projects/0f0b994c-b7a4-4a1a-8c70-bfeaf57be691) and click on Share -> Publish.

### Option 2: GitHub Pages (Automatic Production Deployment)

This project is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages in Repository Settings**:
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Automatic Deployment**: 
   - Every push to `main` branch triggers automatic deployment via `.github/workflows/deploy.yml`
   - The workflow builds the project and deploys to GitHub Pages
   - Includes SPA routing support with `404.html` fallback

3. **Performance Features**:
   - 180KB JavaScript bundle limit (enforced in CI)
   - Lighthouse performance monitoring
   - Optimized asset caching and compression
   - Lazy loading and code splitting

### Manual Build Commands

```bash
npm run build          # Standard production build
npm run build:dev      # Development build with source maps
npm run preview        # Local preview of production build
```

### Other Deployment Platforms

This project can be deployed to any static hosting platform:

- **Vercel**: Connect GitHub repository for automatic deployments
- **Netlify**: Drag & drop `dist` folder or connect repository  
- **Cloudflare Pages**: Connect repository with build command `npm run build`
- **AWS S3**: Upload `dist` folder contents to S3 bucket

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
