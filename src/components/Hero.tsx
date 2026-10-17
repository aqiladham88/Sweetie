import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import loveStory from "../config/loveStory";
import "./Hero.css";

export default function Hero() {
  const reducedMotion = useReducedMotion();

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      };

  const scrollToNext = () => {
    const el = document.getElementById("appreciation");
    el?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <section className="hero" id="hero" aria-label="Welcome">
      <div className="hero__content">
        <motion.p className="hero__greeting" {...fadeUp}>
          Hello there,
        </motion.p>

        <motion.h1
          className="hero__name"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
        >
          Hi, {loveStory.herNickname} 💕
        </motion.h1>

        {/* Decorative illustration */}
        <motion.div
          className="hero__decoration"
          aria-hidden="true"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.25 }}
        >
          <span>🌸</span>
          <span>·</span>
          <span>✨</span>
          <span>·</span>
          <span>🤍</span>
        </motion.div>

        <motion.p
          className="hero__message"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
        >
          {loveStory.heroMessage}
        </motion.p>

        <motion.div
          className="hero__cta"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.45 }}
        >
          <button className="btn-primary" onClick={scrollToNext}>
            See what I made for you 💌
          </button>
        </motion.div>
      </div>
    </section>
  );
}
