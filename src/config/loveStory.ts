/**
 * ──────────────────────────────────────────────
 *  💝  PERSONALISE EVERYTHING HERE  💝
 * ──────────────────────────────────────────────
 *
 *  This is the ONLY file you need to edit
 *  to make this website yours.
 *
 *  Change the names, messages, photos,
 *  and song — then save and refresh.
 * ──────────────────────────────────────────────
 */

export interface PhotoEntry {
  /** Path relative to the `public/` folder, e.g. "/photos/date-night.jpg" */
  src: string;
  /** Short caption shown beneath the photo */
  caption: string;
  /** Alt text for screen readers */
  alt: string;
  /** Optional date label, e.g. "June 2024" */
  date?: string;
}

export interface AppreciationCard {
  /** The appreciation message */
  message: string;
  /** A small emoji or symbol for the card face */
  icon: string;
}

export interface OpenWhenNote {
  /** Label on the envelope, e.g. "Open when you miss me" */
  label: string;
  /** The note inside */
  note: string;
}

export interface SongConfig {
  /** Path relative to `public/`, e.g. "/audio/our-song.mp3" */
  audioPath: string;
  /** Song title displayed in the player */
  title: string;
  /** Artist name */
  artist: string;
  /** Optional link to the song on Spotify/YouTube/etc. */
  externalLink?: string;
}

export interface LoveStoryConfig {
  /* ─── Names ─────────────────────────── */
  herName: string;
  herNickname: string;
  yourName: string;

  /* ─── Hero Section ──────────────────── */
  heroMessage: string;

  /* ─── Appreciation Cards ────────────── */
  appreciationCards: AppreciationCard[];

  /* ─── Photo Gallery ─────────────────── */
  photos: PhotoEntry[];

  /* ─── "Open When" Notes ─────────────── */
  openWhenNotes: OpenWhenNote[];

  /* ─── Love Letter ───────────────────── */
  letterGreeting: string;
  letterParagraphs: string[];
  letterSignature: string;

  /* ─── Final Message ─────────────────── */
  finalQuote: string;
  finalHugReveal: string;
  madeWithLoveBy: string;

  /* ─── Song / Audio ──────────────────── */
  song: SongConfig | null;
}

// ─────────────────────────────────────────────
//  ✏️  Edit your content below
// ─────────────────────────────────────────────

const loveStory: LoveStoryConfig = {
  /* ─── Names ─────────────────────────── */
  herName: "My Love",
  herNickname: "My Love",
  yourName: "Me",

  /* ─── Hero Section ──────────────────── */
  heroMessage:
    "Life feels a little softer, brighter, and happier with you in it.",

  /* ─── Appreciation Cards ────────────── */
  appreciationCards: [
    {
      message: "The way you make ordinary days feel special.",
      icon: "✨",
    },
    {
      message: "Your laugh. Especially when you can't stop.",
      icon: "😄",
    },
    {
      message: "How you care about the little things.",
      icon: "🌷",
    },
    {
      message: "The comfort of simply being around you.",
      icon: "☁️",
    },
    {
      message: "Your kindness, even on difficult days.",
      icon: "🤍",
    },
    {
      message: "The fact that you're wonderfully, completely you.",
      icon: "🌙",
    },
  ],

  /* ─── Photo Gallery ─────────────────── */
  photos: [
    {
      src: "/photos/photo-1.jpg",
      caption: "A moment worth keeping",
      alt: "A treasured memory together",
      date: "",
    },
    {
      src: "/photos/photo-2.jpg",
      caption: "This one makes me smile",
      alt: "A happy moment together",
      date: "",
    },
    {
      src: "/photos/photo-3.jpg",
      caption: "One of my favourites",
      alt: "A favourite memory",
      date: "",
    },
    {
      src: "/photos/photo-4.jpg",
      caption: "I like us here",
      alt: "A lovely moment",
      date: "",
    },
  ],

  /* ─── "Open When" Notes ─────────────── */
  openWhenNotes: [
    {
      label: "Open when you miss me",
      note: "Close your eyes for a moment. Think of my voice, my laugh, the way I look at you. I'm never really far away — I'm always carrying you with me, and I hope you can feel that, even now.",
    },
    {
      label: "Open when your day feels heavy",
      note: "Some days are just hard, and that's okay. You don't have to be strong all the time. Rest if you need to. Tomorrow is a fresh page, and I'll be right there beside you when you turn it.",
    },
    {
      label: "Open when you need a smile",
      note: "Here's a little reminder: you are someone's favourite person. Mine, specifically. And right now, wherever I am, there's a very good chance I'm thinking about you and smiling like an idiot.",
    },
  ],

  /* ─── Love Letter ───────────────────── */
  letterGreeting: "Dear you,",
  letterParagraphs: [
    "I've been wanting to put this into words for a while, so here goes.",
    "Thank you for being you. For laughing at my terrible jokes, for listening when I ramble about nothing important, for making even the most ordinary Tuesday feel like something worth remembering.",
    "I love the little things — the way you get excited about small surprises, how you always know when something's on my mind, the way you make the people around you feel seen and cared for.",
    "You make me want to be better, not because you ask me to, but because being around you reminds me of what matters. Kindness. Patience. Showing up.",
    "I don't need grand gestures or perfect moments. I just like being with you — talking, laughing, sitting quietly, all of it.",
    "So this is my little way of saying: I notice you. I appreciate you. And I'm really, really glad you're in my life.",
  ],
  letterSignature: "With all my love",

  /* ─── Final Message ─────────────────── */
  finalQuote: "If I had to choose again, I'd still choose you.",
  finalHugReveal: "One hug now. The real one when I see you.",
  madeWithLoveBy: "me",

  /* ─── Song / Audio ──────────────────── */
  /**
   * To add your song:
   * 1. Place the audio file in  public/audio/  (e.g. our-song.mp3)
   * 2. Update the fields below.
   *
   * Set to `null` if you don't have an audio file yet —
   * the site will work perfectly without it.
   */
  song: {
    audioPath: "/audio/our-song.mp3",
    title: "Our Song",
    artist: "Artist",
    externalLink: "",
  },
};

export default loveStory;
