# Going live — Karuniya Premnath Portfolio

Your site is 100% static (just HTML/CSS/JS + a PDF + one photo), so it can be hosted
free almost anywhere. Below are three easy paths — pick one.

> ⚠️ **Before you deploy:** save your profile photo as **`assets/karuniya.jpg`**
> (see `assets/README.txt`). Without it the site shows a "KP" monogram instead of your face.

Files that must ship together (the whole `demo/` folder):
```
index.html   styles.css   script.js   KARUNIYA.pdf   assets/karuniya.jpg
```
(The `.claude/` folder and this file are not needed on the server — harmless if included.)

---

## Option 1 — GitHub Pages (recommended, free, permanent URL)

You'll get a URL like `https://<your-username>.github.io/portfolio/`.

1. **Create a free GitHub account** at https://github.com if you don't have one.
2. **Create a new repository** named `portfolio` (Public). Don't add a README.
3. In a terminal, from this folder:
   ```bash
   cd /Users/karuniyapremnath/claude_project/demo
   git init
   git add index.html styles.css script.js KARUNIYA.pdf assets/karuniya.jpg
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
   (Git will ask you to sign in to GitHub the first time.)
4. On GitHub: **repo → Settings → Pages →** under "Build and deployment",
   set **Source: Deploy from a branch**, **Branch: `main` / `root`**, then **Save**.
5. Wait ~1 minute, refresh the Pages settings page, and your live link appears at the top.

**To update later:** edit files, then
```bash
git add -A && git commit -m "update" && git push
```

### Optional: install the GitHub CLI to skip the web steps
```bash
brew install gh          # one-time
gh auth login            # log into your GitHub
cd /Users/karuniyapremnath/claude_project/demo
gh repo create portfolio --public --source=. --push
gh api -X POST repos/:owner/portfolio/pages -f source[branch]=main -f source[path]=/ 2>/dev/null
```

---

## Option 2 — Netlify Drop (fastest, drag-and-drop)

1. Go to https://app.netlify.com/drop
2. Sign in (free — GitHub/Google/email).
3. Drag the **`demo` folder** onto the page.
4. It's instantly live on a `*.netlify.app` URL. You can rename it or add a custom domain in site settings.

To update: drag the folder again, or connect the GitHub repo for auto-deploys.

---

## Option 3 — Preview locally first

No account needed — just view it on your own machine:
```bash
cd /Users/karuniyapremnath/claude_project/demo
python3 -m http.server 4173
# open http://localhost:4173
```

---

## Notes
- **Voice:** the AI assistant speaks using the browser's built-in Web Speech API.
  It works in Chrome, Edge and Safari. Voices differ per browser/OS; some mobile
  browsers only speak after the first tap (the assistant opens on tap, so that's fine).
- **Custom domain:** both GitHub Pages and Netlify let you attach `www.yourname.com`
  for free (you buy the domain separately).
- All asset paths are **relative**, so the site works in a subfolder (e.g. `/portfolio/`)
  without any changes.
