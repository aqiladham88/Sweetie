import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import loveStory from "../config/loveStory";
import "./ReasonsCounter.css";

export default function ReasonsCounter() {
  const reducedMotion = useReducedMotion();
  const reasons = loveStory.reasonsILoveYou ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  if (reasons.length === 0) return null;

  const nextReason = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= reasons.length) {
        setIsAutoPlaying(false);
        return prev;
      }
      setRevealed((r) => Math.max(r, next + 1));
      return next;
    });
  }, [reasons.length]);

  const startAutoPlay = useCallback(() => {
    setIsAutoPlaying(true);
    setRevealed(1);
    setCurrentIndex(0);
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= reasons.length) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsAutoPlaying(false);
          return prev;
        }
        setRevealed((r) => Math.max(r, next + 1));
        return next;
      });
    }, 2800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, reasons.length]);

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section className="reasons" id="reasons" aria-label="Reasons I love you">
      <motion.h2 className="reasons__title" {...fadeUp}>
        Reasons I love you
      </motion.h2>
      <motion.p className="reasons__subtitle" {...fadeUp}>
        (and counting… always counting) 💗
      </motion.p>

      <motion.div className="reasons__counter-badge" {...fadeUp}>
        <span className="reasons__number">{revealed || "?"}</span>
        <span className="reasons__of">of {reasons.length}</span>
      </motion.div>

      <div className="reasons__display">
        <AnimatePresence mode="wait">
          {revealed > 0 && (
            <motion.div
              key={currentIndex}
              className={`reasons__card${reducedMotion ? "" : " reasons__card--animated"}`}
              initial={reducedMotion ? {} : { opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? {} : { opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <span className="reasons__card-number">#{currentIndex + 1}</span>
              <p className="reasons__card-text">{reasons[currentIndex]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div className="reasons__actions" {...fadeUp}>
        {revealed === 0 ? (
          <button className="btn-primary" onClick={startAutoPlay}>
            Show me why ✨
          </button>
        ) : isAutoPlaying ? (
          <button
            className="btn-secondary"
            onClick={() => setIsAutoPlaying(false)}
          >
            Pause ⏸
          </button>
        ) : currentIndex < reasons.length - 1 ? (
          <div className="reasons__btn-group">
            <button className="btn-primary" onClick={nextReason}>
              Next reason 💕
            </button>
            <button className="btn-secondary" onClick={() => setIsAutoPlaying(true)}>
              Auto-play ▶
            </button>
          </div>
        ) : (
          <p className="reasons__done">
            …and so many more I can't fit here 💗
          </p>
        )}
      </motion.div>
    </section>
  );
}
