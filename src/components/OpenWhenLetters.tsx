import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import loveStory from "../config/loveStory";
import "./OpenWhenLetters.css";

export default function OpenWhenLetters() {
  const reducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const notes = loveStory.openWhenNotes;

  if (notes.length === 0) return null;

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
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
    <section className="open-when" id="open-when" aria-label="A little reassurance">
      <motion.h2 className="open-when__title" {...fadeUp}>
        A little reassurance
      </motion.h2>
      <motion.p className="open-when__subtitle" {...fadeUp}>
        Open one when you need it 💌
      </motion.p>

      <ul className="open-when__list" role="list">
        {notes.map((note, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.li
              key={i}
              className={`open-when-card${isOpen ? " open-when-card--open" : ""}${reducedMotion ? "" : " open-when-card--animated"}`}
              style={{
                "--float-delay": `${(i * 0.6) % 3}s`,
                "--float-duration": `${4 + ((i * 5 + 2) % 4) * 0.5}s`,
              } as React.CSSProperties}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.15 }}
            >
              <button
                className="open-when-card__trigger"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`open-when-note-${i}`}
              >
                <span className="open-when-card__trigger-icon" aria-hidden="true">
                  {isOpen ? "💌" : "✉️"}
                </span>
                {note.label}
              </button>
              <div
                className="open-when-card__note"
                id={`open-when-note-${i}`}
                role="region"
                aria-label={note.label}
              >
                <div className="open-when-card__note-inner">
                  <p>{note.note}</p>
                  <span className="open-when-card__note-heart" aria-hidden="true">
                    ♥
                  </span>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
