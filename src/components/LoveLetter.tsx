import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import loveStory from "../config/loveStory";
import "./LoveLetter.css";

export default function LoveLetter() {
  const reducedMotion = useReducedMotion();
  const [showFull, setShowFull] = useState(reducedMotion);
  const [visibleChars, setVisibleChars] = useState(0);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<number | null>(null);

  const fullText = loveStory.letterParagraphs.join("\n\n");
  const totalChars = fullText.length;

  // Start typewriter when section is in view
  useEffect(() => {
    if (reducedMotion || showFull || started) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reducedMotion, showFull, started]);

  // Typewriter timer
  useEffect(() => {
    if (!started || showFull || reducedMotion) return;

    timerRef.current = window.setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= totalChars) {
          if (timerRef.current) clearInterval(timerRef.current);
          return totalChars;
        }
        return prev + 1;
      });
    }, 40);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [started, showFull, reducedMotion, totalChars]);

  // Pause when tab is hidden
  useEffect(() => {
    const handler = () => {
      if (document.hidden && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  const handleShowFull = () => {
    setShowFull(true);
    setVisibleChars(totalChars);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const displayText = showFull ? fullText : fullText.slice(0, visibleChars);
  const paragraphs = displayText.split("\n\n");
  const isTyping = !showFull && visibleChars < totalChars;

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section
      className="love-letter"
      id="love-letter"
      ref={sectionRef}
      aria-label="My letter to you"
    >
      <motion.h2 className="love-letter__title" {...fadeUp}>
        My letter to you
      </motion.h2>

      <motion.div
        className={`love-letter__paper${reducedMotion ? "" : " love-letter__paper--animated"}`}
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.15 }}
      >
        <p className="love-letter__greeting">{loveStory.letterGreeting}</p>

        <div className="love-letter__body">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {!isTyping && (
          <>
            <p className="love-letter__signature">
              {loveStory.letterSignature},
              <br />
              {loveStory.yourName}
            </p>
            <div className="love-letter__heart" aria-hidden="true">
              ♥
            </div>
          </>
        )}
      </motion.div>

      {isTyping && (
        <button className="love-letter__typewriter-toggle" onClick={handleShowFull}>
          Show full letter
        </button>
      )}
    </section>
  );
}
