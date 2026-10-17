# 💕 Sweetie — A Love Letter Website

A personal, romantic digital scrapbook built as an appreciation gift. She can explore it on her phone (or desktop) and find love notes, memories, a mini-game, and a heartfelt letter — all wrapped in a warm, hand-crafted design.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open the URL shown in your terminal (usually http://localhost:5173)
```

---

## ✏️ How to Personalise

**Everything** you need to change lives in **one file**:

```
src/config/loveStory.ts
```

Open it and you'll find clearly labelled sections:

| What to change | Where in the file |
|---|---|
| Her name & nickname | `herName`, `herNickname` |
| Your name | `yourName` |
| Hero welcome message | `heroMessage` |
| Appreciation card messages | `appreciationCards` array |
| Photo captions & paths | `photos` array |
| "Open when…" notes | `openWhenNotes` array |
| Love letter text | `letterGreeting`, `letterParagraphs`, `letterSignature` |
| Final quote & message | `finalQuote`, `finalHugReveal` |
| Footer credit | `madeWithLoveBy` |
| Background song | `song` object |

Save the file and the page will hot-reload automatically.

---

## 📸 Adding Your Photos

1. Place your photos in the **`public/photos/`** folder.
2. Open `src/config/loveStory.ts` and update the `photos` array:

```ts
photos: [
  {
    src: "/photos/beach-sunset.jpg",   // path inside public/
    caption: "Our first trip together",
    alt: "Us at the beach during sunset",
    date: "August 2024",               // optional
  },
  // ... add more
],
```

**Tip:** Use `.jpg` or `.webp` for smaller file sizes. Photos are lazy-loaded, so add as many as you like.

If a photo file is missing, the card will show a friendly placeholder instead of a broken image.

---

## 🎵 Adding Her Favourite Song

1. Place the audio file (MP3, OGG, or WAV) in **`public/audio/`**.
2. Update the `song` section in `src/config/loveStory.ts`:

```ts
song: {
  audioPath: "/audio/our-song.mp3",
  title: "Perfect",
  artist: "Ed Sheeran",
  externalLink: "https://open.spotify.com/track/...",  // optional
},
```

3. If you don't have an audio file yet, set `song: null` — the site works perfectly without it.

**Important:** Do not use a Spotify or YouTube URL as the `audioPath` — those are not direct audio files. You need an actual `.mp3` file.

Audio only starts playing after the user explicitly taps "Open with music." It starts at a gentle volume and loops.

---

## 🏗️ Production Build

```bash
npm run build
```

The optimised files will be in the `dist/` folder. You can deploy this to any static hosting (Netlify, Vercel, GitHub Pages, etc.).

---

## 📁 Project Structure

```
src/
├── config/
│   └── loveStory.ts      ← All your personal content
├── components/
│   ├── EnvelopeIntro      ← Opening animation
│   ├── Hero               ← Welcome section
│   ├── AppreciationCards   ← "Things I love about you" cards
│   ├── MemoryGallery      ← Photo scrapbook with lightbox
│   ├── HeartGame           ← "Catch a little love" mini-game
│   ├── OpenWhenLetters     ← "Open when…" reassurance notes
│   ├── LoveLetter          ← The main letter
│   ├── FinalSurprise       ← Closing surprise & hug
│   └── MusicPlayer         ← Floating audio controls
├── hooks/
│   ├── useAudioPlayer.ts   ← Audio playback logic
│   └── useReducedMotion.ts ← Accessibility preference
├── App.tsx                  ← Main app layout
├── App.css                  ← App-level styles
├── index.css                ← Design system & global styles
└── main.tsx                 ← Entry point

public/
├── photos/                  ← Your photos go here
└── audio/                   ← Your song goes here
```

---

## ♿ Accessibility

- All interactive elements work with keyboard (Tab, Enter, Escape, arrow keys).
- Respects `prefers-reduced-motion` — animations are disabled or minimised.
- Visible focus indicators on all buttons and cards.
- Screen reader labels on all controls.
- Decorative elements are hidden from assistive technology.
- The gallery modal traps focus and supports Escape to close.

---

## ⚠️ Privacy Note

This is a **client-side only** website. Once you share it publicly:

- All text, photos, and audio files are accessible to anyone who visits the URL.
- There is no server-side authentication or encryption.
- Adding a client-side password prompt is **not real privacy protection** — the files can still be accessed directly.

If privacy matters, share the link only with the intended person, or host it on a private/password-protected server.

---

## 🛠️ Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (fast dev server & bundler)
- [Motion](https://motion.dev/) (smooth animations)
- Vanilla CSS (no framework needed)

---

Made with 💕
