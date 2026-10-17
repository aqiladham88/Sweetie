import { useState, useCallback, useRef, useEffect } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./EnvelopeIntro.css";

interface Props {
  audioAvailable: boolean;
  onComplete: (withMusic: boolean) => void;
}

export default function EnvelopeIntro({ audioAvailable, onComplete }: Props) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "opening" | "hearts" | "exiting">("idle");
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const heartId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const heartEmojis = ["💕", "💗", "💖", "🩷", "🤍", "✨"];

  const spawnHearts = useCallback(() => {
    if (reducedMotion) return;
    const newHearts = Array.from({ length: 12 }, () => ({
      id: heartId.current++,
      x: 20 + Math.random() * 60,
      y: 30 + Math.random() * 30,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    }));
    setHearts(newHearts);
  }, [reducedMotion]);

  const handleOpen = useCallback(
    (withMusic: boolean) => {
      if (phase !== "idle") return;

      if (reducedMotion) {
        onComplete(withMusic);
        return;
      }

      setPhase("opening");
      setTimeout(() => {
        setPhase("hearts");
        spawnHearts();
      }, 900);
      setTimeout(() => {
        setPhase("exiting");
      }, 2200);
      setTimeout(() => {
        onComplete(withMusic);
      }, 3000);
    },
    [phase, reducedMotion, onComplete, spawnHearts]
  );

  const handleSkip = useCallback(() => {
    onComplete(false);
  }, [onComplete]);

  // Clean up hearts after animation
  useEffect(() => {
    if (hearts.length > 0) {
      const timer = setTimeout(() => setHearts([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [hearts]);

  return (
    <div
      ref={containerRef}
      className={`envelope-intro${phase === "exiting" ? " envelope-intro--exiting" : ""}`}
      role="dialog"
      aria-label="Welcome introduction"
    >
      <p className="envelope-intro__tagline">For my favourite person.</p>
      <p className="envelope-intro__subtitle">A little something, just for you.</p>

      {/* Envelope */}
      <div className="envelope-container" aria-hidden="true">
        <div className="envelope-body">
          <div className={`envelope-flap${phase !== "idle" ? " envelope-flap--open" : ""}`} />
          <div className={`envelope-letter${phase !== "idle" ? " envelope-letter--risen" : ""}`}>
            Just for you 💌
          </div>
          <div className={`envelope-seal${phase !== "idle" ? " envelope-seal--hidden" : ""}`}>
            💌
          </div>
        </div>
      </div>

      {/* Floating hearts */}
      <div className="floating-hearts-container" aria-hidden="true">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="floating-heart"
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              animationDelay: `${Math.random() * 0.6}s`,
              fontSize: `${1 + Math.random() * 0.8}rem`,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>

      {/* Actions */}
      {phase === "idle" && (
        <div className="envelope-intro__actions">
          {audioAvailable ? (
            <div className="envelope-intro__music-choice">
              <button className="btn-primary" onClick={() => handleOpen(true)}>
                Open with music 🎵
              </button>
              <button className="btn-secondary" onClick={() => handleOpen(false)}>
                Open quietly
              </button>
            </div>
          ) : (
            <button className="btn-primary" onClick={() => handleOpen(false)}>
              Open your letter 💌
            </button>
          )}
          <button className="envelope-intro__skip" onClick={handleSkip}>
            Skip animation
          </button>
        </div>
      )}
    </div>
  );
}
