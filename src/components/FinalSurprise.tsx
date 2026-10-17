import { useState, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import loveStory from "../config/loveStory";
import "./FinalSurprise.css";

const BURST_EMOJIS = ["💗", "💕", "💖", "🩷", "🤍", "✨", "💞", "💓"];

interface BurstHeart {
  id: number;
  emoji: string;
  dx: string;
  dy: string;
  dx2: string;
  dy2: string;
  delay: number;
}

let burstIdCounter = 0;

function createBurst(): BurstHeart[] {
  return Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
    const dist = 40 + Math.random() * 60;
    const dist2 = dist + 30 + Math.random() * 40;
    return {
      id: burstIdCounter++,
      emoji: BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)],
      dx: `${Math.cos(angle) * dist}px`,
      dy: `${Math.sin(angle) * dist}px`,
      dx2: `${Math.cos(angle) * dist2}px`,
      dy2: `${Math.sin(angle) * dist2 - 30}px`,
      delay: i * 0.06,
    };
  });
}

export default function FinalSurprise() {
  const reducedMotion = useReducedMotion();
  const [hugged, setHugged] = useState(false);
  const [burstHearts, setBurstHearts] = useState<BurstHeart[]>([]);
  const cleanupRef = useRef<number | null>(null);

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
      };

  const sendHug = useCallback(() => {
    setHugged(true);
    const burst = createBurst();
    setBurstHearts(burst);

    // Clean up hearts after animation
    if (cleanupRef.current) clearTimeout(cleanupRef.current);
    cleanupRef.current = window.setTimeout(() => {
      setBurstHearts([]);
    }, 2500);
  }, []);

  const replay = useCallback(() => {
    setHugged(false);
    setBurstHearts([]);
  }, []);

  return (
    <section className="final" id="final" aria-label="Final surprise">
      <motion.p className="final__quote" {...fadeUp}>
        "{loveStory.finalQuote}"
      </motion.p>

      {!hugged ? (
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
          <button className="btn-primary final__hug-btn" onClick={sendHug}>
            Sending you a hug 🤍
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="final__celebration"
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Heart burst */}
          <div className="final__hearts-burst" aria-hidden="true">
            {burstHearts.map((h) => (
              <span
                key={h.id}
                className="final__burst-heart"
                style={{
                  "--dx": h.dx,
                  "--dy": h.dy,
                  "--dx2": h.dx2,
                  "--dy2": h.dy2,
                  animationDelay: `${h.delay}s`,
                } as React.CSSProperties}
              >
                {h.emoji}
              </span>
            ))}
          </div>

          <p className="final__hug-reveal">{loveStory.finalHugReveal}</p>

          <button className="btn-secondary final__replay" onClick={replay}>
            Send another hug 💕
          </button>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="final__footer">
        <p className="final__made-with">
          Made with love, by {loveStory.madeWithLoveBy} 💕
        </p>
        <span className="final__footer-heart" aria-hidden="true">♥</span>
      </footer>
    </section>
  );
}
