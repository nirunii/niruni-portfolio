# Niruni Prabhasha — Portfolio

## How to run this

1. Install Node.js from https://nodejs.org (the LTS version) if you haven't already.
2. Unzip this folder anywhere on your computer.
3. Open a terminal (Mac: Terminal app. Windows: PowerShell) and navigate into the folder:
   cd path/to/niruni-portfolio
4. Install the packages this project needs:
   npm install
5. Start it:
   npm run dev
6. Open the link it prints (usually http://localhost:5173) in your browser.

That's it — no manual file creation needed, everything is already wired up.

## Editing

- All the content (your name, bio, skills, projects, contact info) lives near the top of `src/Portfolio.jsx` in a few plain objects — edit those directly, no need to touch the layout code.
- To add your real photo: put an image file in `src/assets/`, then in `src/Portfolio.jsx` add `import photo from "./assets/your-photo.jpg"` near the top, and swap the "NP" initials block in the Hero section for `<img src={profilePic} className="w-full h-full rounded-full object-cover" alt="Niruni Prabhasha" />`

## Deploying

Push this folder to a GitHub repo, then connect it at vercel.com or netlify.com — both auto-detect Vite projects and give you a live URL in a couple of minutes.
