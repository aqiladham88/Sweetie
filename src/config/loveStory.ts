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

export interface MilestoneEntry {
  /** Emoji icon for the dot */
  icon: string;
  /** Title of the milestone */
  title: string;
  /** Short description */
  description: string;
  /** Optional date label */
  date?: string;
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

  /* ─── Our Journey (Timeline) ────────── */
  milestones?: MilestoneEntry[];

  /* ─── Reasons I Love You ────────────── */
  reasonsILoveYou?: string[];

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
  herName: "Qissy",
  herNickname: "Qissy",
  yourName: "Adham",

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
    {
      message: "How you always remember the small details about me.",
      icon: "💭",
    },
    {
      message: "The way you light up when you talk about things you love.",
      icon: "🌟",
    },
    {
      message: "Your voice — especially when it's the first thing I hear.",
      icon: "🎵",
    },
    {
      message: "How safe and understood you make me feel.",
      icon: "🫶",
    },
  ],

  /* ─── Photo Gallery ─────────────────── */
  photos: [
    {
      src: "/Sweetie/photos/photo_2026-10-17_15-51-43.jpg",
      caption: "This one makes me smile",
      alt: "A happy moment together",
      date: "",
    },
    {
      src: "/Sweetie/photos/photo_2026-10-17_15-51-50.jpg",
      caption: "One of my favourites",
      alt: "A favourite memory",
      date: "",
    },
    {
      src: "/Sweetie/photos/photo_2026-10-17_15-51-53.jpg",
      caption: "I like us here",
      alt: "A lovely moment",
      date: "",
    },
    {
      src: "/Sweetie/photos/photo_2026-10-17_15-51-57.jpg",
      caption: "Always smiling with you",
      alt: "A warm moment together",
      date: "",
    },
    {
      src: "/Sweetie/photos/photo_2026-10-17_15-51-59.jpg",
      caption: "Little moments like these",
      alt: "A sweet memory",
      date: "",
    },
    {
      src: "/Sweetie/photos/photo_2026-10-17_15-52-03.jpg",
      caption: "You make everything better",
      alt: "A special moment",
      date: "",
    },
    {
      src: "/Sweetie/photos/photo_2026-10-17_15-52-06.jpg",
      caption: "Heart full just looking at this",
      alt: "A cherished memory",
      date: "",
    },
    {
      src: "/Sweetie/photos/photo_2026-10-17_15-52-08.jpg",
      caption: "My favourite person",
      alt: "A treasured photo",
      date: "",
    },
    {
      src: "/Sweetie/photos/photo_2026-10-17_15-52-11.jpg",
      caption: "Glad it's you",
      alt: "A beautiful memory",
      date: "",
    },
    {
      src: "/Sweetie/photos/photo_2026-10-17_15-52-13.jpg",
      caption: "Us, always",
      alt: "A meaningful moment together",
      date: "",
    },
  ],

  /* ─── Our Journey (Timeline) ────────── */
  milestones: [
    {
      icon: "👋",
      title: "The day we met",
      description: "I had no idea that moment would change everything.",
    },
    {
      icon: "💬",
      title: "First real conversation",
      description: "Talking to you felt different. Like I'd known you longer than I actually had.",
    },
    {
      icon: "🦋",
      title: "When I knew",
      description: "It hit me quietly — not a lightning bolt, just a warm realisation that you were someone I didn't want to lose.",
    },
    {
      icon: "🤝",
      title: "Made it official",
      description: "The best decision. No overthinking, just choosing you.",
    },
    {
      icon: "🌙",
      title: "Late-night talks",
      description: "Those hours we spent talking about everything and nothing — I'd relive every single one.",
    },
    {
      icon: "💪",
      title: "First real challenge",
      description: "We weren't perfect, but we showed up for each other. That meant everything.",
    },
    {
      icon: "💕",
      title: "Right now",
      description: "Still here. Still choosing you. Still grateful.",
    },
  ],

  /* ─── Reasons I Love You ────────────── */
  reasonsILoveYou: [
    "Because you make me laugh even when I don't feel like smiling.",
    "Because you see the real me and still stay.",
    "Because your hugs feel like home.",
    "Because you always know when something is wrong, even when I say I'm fine.",
    "Because you make the most boring errands feel like little adventures.",
    "Because you're patient with me, even when I'm not easy to love.",
    "Because you remember the tiny things I say and surprise me with them later.",
    "Because your smile genuinely makes my day better.",
    "Because you never make me feel like I'm too much.",
    "Because being with you feels effortless.",
    "Because you make me believe in us — every single day.",
    "Because you're the person I want to tell everything to — the good, the bad, and the random.",
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
    {
      label: "Open when you doubt yourself",
      note: "Hey. You are more capable than you give yourself credit for. I've watched you handle things that would overwhelm anyone else, and you did it with grace. Trust yourself — I do.",
    },
    {
      label: "Open when you can't sleep",
      note: "If you're reading this in the dark at 2am — breathe. You're okay. Think of something that made you laugh today, close your eyes, and know that tomorrow I'll be right there. Goodnight, love.",
    },
    {
      label: "Open when you just need to hear it",
      note: "I love you. Not because I have to, but because choosing to love you is the easiest and best thing I do. You are enough, exactly as you are. Don't let anyone — including yourself — tell you otherwise.",
    },
  ],

  /* ─── Love Letter ───────────────────── */
  letterGreeting: "Dear Qissy,",
  letterParagraphs: [
    "I've been wanting to put this into words for a while, so here goes.",
    "Thank you for being you. For laughing at my terrible jokes, for listening when I ramble about nothing important, for making even the most ordinary Tuesday feel like something worth remembering.",
    "I love the little things — the way you get excited about small surprises, how you always know when something's on my mind, the way you make the people around you feel seen and cared for.",
    "You make me want to be better, not because you ask me to, but because being around you reminds me of what matters. Kindness. Patience. Showing up.",
    "I don't need grand gestures or perfect moments. I just like being with you — talking, laughing, sitting quietly, all of it.",
    "There are days when I look at you and can't believe I got this lucky. That out of everyone in the world, you chose to be here, with me. I don't take that for granted.",
    "So this is my little way of saying: I notice you. I appreciate you. And I'm really, really glad you're in my life.",
    "Always.",
  ],
  letterSignature: "With all my love, Adham",

  /* ─── Final Message ─────────────────── */
  finalQuote: "If I had to choose again, I'd still choose you. Every time.",
  finalHugReveal: "One hug now. The real one when I see you. 🤍",
  madeWithLoveBy: "Adham",

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
    audioPath: "/Sweetie/audio/our-song.mp3",
    title: "Our Song",
    artist: "Artist",
    externalLink: "",
  },
};

export default loveStory;
