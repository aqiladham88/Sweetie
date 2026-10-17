import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./HeartGame.css";

const TOTAL_HEARTS = 5;
const HEART_EMOJIS = ["💗", "💕", "💖", "🩷", "🤍", "💓", "💞"];

interface GameHeart {
  id: number;
  x: number;
  y: number;
  emoji: string;
  collected: boolean;
  delay: number;
}

function generateHearts(): GameHeart[] {
  return Array.from({ length: TOTAL_HEARTS }, (_, i) => ({
    id: i,
    // Keep hearts away from edges for easy tapping
    x: 10 + Math.random() * 70,
    y: 10 + Math.random() * 65,
    emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    collected: false,
    delay: i * 0.3,
  }));
}

export default function HeartGame() {
  const reducedMotion = useReducedMotion();
  const [hearts, setHearts] = useState<GameHeart[]>(generateHearts);
  const [collected, setCollected] = useState(0);
  const [complete, setComplete] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      };

  const collectHeart = useCallback((id: number) => {
    setHearts((prev) =>
      prev.map((h) => (h.id === id && !h.collected ? { ...h, collected: true } : h))
    );
    setCollected((prev) => {
      const next = prev + 1;
      if (next >= TOTAL_HEARTS) {
        setTimeout(() => setComplete(true), 600);
      }
      return next;
    });
  }, []);

  const replay = useCallback(() => {
    setHearts(generateHearts());
    setCollected(0);
    setComplete(false);
  }, []);

  // Cleanup: nothing to clean since we use CSS animations
  // But let's pause animation when tab is hidden
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const handler = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  return (
    <section className="heart-game" id="heart-game" aria-label="Catch a little love game">
      <motion.h2 className="heart-game__title" {...fadeUp}>
        Catch a little love
      </motion.h2>
      <motion.p className="heart-game__subtitle" {...fadeUp}>
        Tap the floating hearts 💗
      </motion.p>

      {!complete ? (
        <>
          <p className="heart-game__progress" aria-live="polite">
            {collected} / {TOTAL_HEARTS} little hearts collected
          </p>

          <div
            className={`heart-game__area${reducedMotion ? "" : " heart-game__area--animated"}`}
            ref={areaRef}
            role="application"
            aria-label={`Heart catching game. ${collected} of ${TOTAL_HEARTS} hearts collected.`}
          >
            {hearts.map((heart) => (
              <button
                key={heart.id}
                className={`heart-game__heart${
                  heart.collected ? " heart-game__heart--collected" : ""
                }${
                  !heart.collected && !reducedMotion && tabVisible
                    ? " heart-game__heart--floating"
                    : ""
                }`}
                style={{
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                  animationDelay: `${heart.delay}s`,
                }}
                onClick={() => collectHeart(heart.id)}
                disabled={heart.collected}
                aria-label={
                  heart.collected
                    ? "Heart collected"
                    : `Catch heart ${heart.id + 1}`
                }
              >
                {heart.emoji}
              </button>
            ))}
          </div>

          <p className="heart-game__keyboard-alt">
            You can also use Tab + Enter to catch hearts
          </p>
        </>
      ) : (
        <motion.div
          className="heart-game__complete"
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="heart-game__reveal">
            "You've already had my heart this whole time." 💕
          </p>
          <button className="btn-secondary heart-game__replay" onClick={replay}>
            Play again
          </button>
        </motion.div>
      )}
    </section>
  );
}
