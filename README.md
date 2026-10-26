# York Sunbury Search and Rescue (YSSR) Website

A modern, fast, accessible, responsive static website for **York Sunbury Search and Rescue (YSSR)**, serving Fredericton, York and Sunbury counties, and communities across New Brunswick.

Built with **pure semantic HTML5, modern CSS3, and vanilla JavaScript**. It requires **zero build tools, zero npm packages, and zero server maintenance**, making it ideal for hosting on **GitHub Pages**.

---

## 🌟 Key Features

1. **Official YSSR Brand Identity & Color System:**
   - Incorporates the official organization crest (`assets/images/logo.png`) and navigational compass watermark (`assets/images/compass.png`).
   - Built with the official organizational color system:
     - Safety Orange (`#de7907`)
     - Search & Rescue Blue (`#0090cc`)
     - Deep Navy / Teal (`#004866`)
     - Dark Charcoal (`#444444`)
     - Hi-Vis Yellow (`#ffff00`)
     - Silver Neutral (`#a6a1a1`)
     - Pure White (`#ffffff`) & Black (`#000000`)
   - Fully responsive design engineered for mobile devices, tablets, and desktop displays.
   - Prominent Emergency 911 Callout Banner on every page to direct urgent inquiries to emergency services.

2. **Full Section & Page Architecture:**
   - [index.html](index.html): Homepage with mission statement, core statistics, 4 pillars, police endorsement, latest news, and CTAs.
   - [about.html](about.html): Organizational background, operational coverage, partners, and Board & Committee roster.
   - [services.html](services.html): Search & rescue operational lifecycle, mobile command apparatus (Rescue 11), AdventureSmart programs, and civic support.
   - [project-lifesaver.html](project-lifesaver.html): Specialized radio-frequency transmitter program for wandering prevention (< 30 min recovery time).
   - [join.html](join.html): Recruitment overview, operational vs non-operational volunteer paths, Junior Program, 4-step checklist, and FAQ accordion.
   - [donate.html](donate.html): Direct CanadaHelps integration, NB GSAR provincial 50/50 lottery, equipment wishlist, and corporate sponsorship details.
   - [news.html](news.html): Filterable, searchable newsroom with interactive article modal.
   - [contact.html](contact.html): Contact form, mailing address, voicemail, departmental emails, and meeting schedules.
   - [admin.html](admin.html): **Visual Content Manager for Non-Technical Members.**
   - [404.html](404.html): Custom friendly error page with SAR trail theme.

3. **Easily Updatable by Non-Technical People:**
   - Content that changes frequently is cleanly separated into JSON data files inside `data/`:
     - `data/news.json`: Articles, field exercises, and announcements.
     - `data/team.json`: Executive board and committee chairs.
     - `data/faq.json`: Frequently asked questions and categories.
     - `data/wishlist.json`: Equipment wishlist items and estimated costs for donors.
     - `data/stats.json`: Annual metrics and response statistics.
     - `data/site-config.json`: Organization address, emergency message, phone numbers, and recruitment banner.
   - The included [admin.html](admin.html) provides an in-browser graphical editor where non-technical volunteers can type new announcements, edit team members, update FAQs, or manage equipment wishlist items, and download or copy the resulting JSON with one click.

---

## 🚀 How to Host on GitHub Pages

1. **Push this folder to a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit of modern YSSR website"
   git remote add origin https://github.com/<your-org-or-user>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - In your GitHub repository, click on **Settings** &rarr; **Pages**.
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Select branch: `main` and folder: `/ (root)`.
   - Click **Save**.
   - Your site will be live at `https://<username>.github.io/<repo-name>/` in under a minute!

3. **Using your Custom Domain (`yssr.ca`):**
   - In **Settings > Pages > Custom domain**, enter `yssr.ca`.
   - In your domain DNS registrar (e.g. GoDaddy, Namecheap, Cloudflare):
     - Add an **A Record** pointing `@` to GitHub's IPs:
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`
     - Add a **CNAME Record** for `www` pointing to `<username>.github.io`.
   - Check **Enforce HTTPS** in GitHub Pages settings.

---

## ✏️ How Non-Technical Volunteers Update Content

### Method 1: Using the Built-In Visual Editor (Easiest)
1. Open [admin.html](admin.html) in any web browser (either locally or on your live site).
2. Use the forms to:
   - Add or edit an article under **News & Articles**.
   - Update committee members under **Team Leadership**.
   - Add questions under **FAQs**.
3. Click **"Copy to Clipboard"** (or **"Download [file].json"**).
4. Go to GitHub.com &rarr; your repository &rarr; `data/` folder &rarr; click on the matching file (e.g. `news.json`).
5. Click the **Pencil icon** (Edit), paste your changes, and click **Commit changes**.
6. GitHub Pages will automatically publish the new content in ~30 seconds.

### Method 2: Editing Directly on GitHub.com
Non-technical users can also open any file in `data/` directly on GitHub.com, edit the text inside quotation marks, and click **Commit changes**.

---

## 💻 Local Testing & Development

Because this is a static site with `fetch()` calls to load JSON files, it runs best when served via a simple local HTTP server (to comply with browser CORS security):

- **VS Code:** Install the **Live Server** extension, right-click `index.html`, and click **"Open with Live Server"**.
- **Python (built into Windows/Mac):**
  ```powershell
  python -m http.server 8000
  ```
  Then open `http://localhost:8000` in your web browser.

---

## 📂 Project Directory Structure

```text
├── assets/
│   ├── images/
│   │   ├── logo.png             # Official YSSR crest logo
│   │   ├── compass.png          # Directional compass branding image
│   │   └── favicon.ico          # Browser tab icon in official colors
├── css/
│   └── styles.css               # Unified, responsive CSS with official palette
├── data/
│   ├── faq.json                 # Categorized recruitment & membership FAQs
│   ├── news.json                # Articles, press releases, announcements
│   ├── site-config.json         # Global settings, banner text, contact details
│   ├── stats.json               # Operational metrics & annual reports
│   └── team.json                # Executive board & committee chairs roster
├── js/
│   ├── admin.js                 # Visual editor logic for admin.html
│   ├── data-loader.js           # Dynamic loader for data/*.json with fallbacks
│   └── main.js                  # Navigation, filtering, and form interactions
├── .nojekyll                    # Disables Jekyll processing on GitHub Pages
├── 404.html                     # Custom 404 error page
├── about.html                   # Who We Are page
├── admin.html                   # Visual Content Manager
├── contact.html                 # Contact Us & Emergency guidance
├── donate.html                  # Support, CanadaHelps & Wishlist
├── index.html                   # Homepage
├── join.html                    # Recruitment & Member application
├── news.html                    # News & Updates with search/filter
├── project-lifesaver.html       # Project Lifesaver specialized page
├── services.html                # What We Do & AdventureSmart education
└── README.md                    # Project documentation
```

---

## 🛡️ License & Organization
&copy; 2026 York Sunbury Search & Rescue Inc. (YSSR). All rights reserved. Registered Canadian Charity.
