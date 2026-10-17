import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import loveStory from "../config/loveStory";
import "./OurJourney.css";

export default function OurJourney() {
  const reducedMotion = useReducedMotion();
  const milestones = loveStory.milestones ?? [];

  if (milestones.length === 0) return null;

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section className="journey" id="journey" aria-label="Our journey together">
      <motion.h2 className="journey__title" {...fadeUp}>
        Our little journey
      </motion.h2>
      <motion.p className="journey__subtitle" {...fadeUp}>
        Every moment with you is worth remembering 🌸
      </motion.p>

      <div className="journey__timeline">
        <div className="journey__line" aria-hidden="true" />

        {milestones.map((m, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              className={`journey__item ${isLeft ? "journey__item--left" : "journey__item--right"}`}
              initial={reducedMotion ? {} : { opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              <div className="journey__dot" aria-hidden="true">
                <span>{m.icon}</span>
              </div>
              <div
                className={`journey__card${reducedMotion ? "" : " journey__card--animated"}`}
                style={{
                  "--float-delay": `${(i * 0.7) % 3}s`,
                  "--float-duration": `${3.8 + ((i * 3 + 1) % 4) * 0.5}s`,
                } as React.CSSProperties}
              >
                {m.date && <span className="journey__date">{m.date}</span>}
                <h3 className="journey__card-title">{m.title}</h3>
                <p className="journey__card-text">{m.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
