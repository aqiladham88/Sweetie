import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import loveStory from "../config/loveStory";
import "./AppreciationCards.css";

export default function AppreciationCards() {
  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const toggleCard = useCallback((index: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section className="appreciation" id="appreciation" aria-label="Little things I love about you">
      <motion.h2 className="appreciation__title" {...fadeUp}>
        Little things I love about you
      </motion.h2>
      <motion.p className="appreciation__subtitle" {...fadeUp}>
        Tap a card to reveal 💕
      </motion.p>

      <div className="appreciation__grid" role="list">
        {loveStory.appreciationCards.map((card, i) => {
          const isRevealed = revealed.has(i);
          return (
            <motion.div
              key={i}
              className={`appreciation-card${isRevealed ? " appreciation-card--revealed" : ""}${reducedMotion ? "" : " appreciation-card--animated"}`}
              style={{
                "--float-delay": `${(i * 0.5) % 3}s`,
                "--float-duration": `${3.5 + ((i * 7 + 3) % 5) * 0.5}s`,
              } as React.CSSProperties}
              role="listitem"
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.12 }}
            >
              <div
                className="appreciation-card__inner"
                onClick={() => toggleCard(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCard(i);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isRevealed}
                aria-label={
                  isRevealed
                    ? `Card ${i + 1}: ${card.message}. Tap to close.`
                    : `Card ${i + 1}: Tap to reveal`
                }
              >
                <div className="appreciation-card__front">
                  <span className="appreciation-card__icon" aria-hidden="true">
                    {card.icon}
                  </span>
                  <span className="appreciation-card__prompt">Tap me</span>
                </div>
                <div className="appreciation-card__back">
                  <p className="appreciation-card__message">"{card.message}"</p>
                  <span className="appreciation-card__heart" aria-hidden="true">♥</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
