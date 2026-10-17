import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import loveStory from "../config/loveStory";
import "./MemoryGallery.css";

export default function MemoryGallery() {
  const reducedMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const prevFocusRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const photos = loveStory.photos;

  if (photos.length === 0) return null;

  const openModal = useCallback((index: number) => {
    prevFocusRef.current = document.activeElement as HTMLElement;
    setSelectedIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    // Restore focus
    setTimeout(() => prevFocusRef.current?.focus(), 50);
  }, []);

  const goNext = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i + 1) % photos.length : null));
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  }, [photos.length]);

  // Keyboard navigation in modal
  useEffect(() => {
    if (selectedIndex === null) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [selectedIndex, closeModal, goNext, goPrev]);

  // Trap focus in modal
  useEffect(() => {
    if (selectedIndex !== null) {
      modalRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedIndex]);

  const handleImageError = useCallback((index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  }, []);

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      };

  const selected = selectedIndex !== null ? photos[selectedIndex] : null;
  const selectedHasError = selectedIndex !== null && imageErrors.has(selectedIndex);

  return (
    <section className="gallery" id="gallery" aria-label="Our memory collection">
      <motion.h2 className="gallery__title" {...fadeUp}>
        Our little memory collection
      </motion.h2>
      <motion.p className="gallery__subtitle" {...fadeUp}>
        Tap a photo to see it closer 📸
      </motion.p>

      <div className="gallery__grid" role="list">
        {photos.map((photo, i) => {
          const hasError = imageErrors.has(i);
          return (
            <motion.div
              key={i}
              className="polaroid"
              role="listitem"
              tabIndex={0}
              onClick={() => openModal(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal(i);
                }
              }}
              aria-label={`View photo: ${photo.caption}`}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
            >
              <div className="polaroid__image-wrapper">
                {hasError ? (
                  <div className="polaroid__placeholder">
                    <span className="polaroid__placeholder-icon" aria-hidden="true">📷</span>
                    <span className="polaroid__placeholder-text">Your photo here</span>
                  </div>
                ) : (
                  <img
                    className="polaroid__image"
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    onError={() => handleImageError(i)}
                  />
                )}
              </div>
              <p className="polaroid__caption">{photo.caption}</p>
              {photo.date && <p className="polaroid__date">{photo.date}</p>}
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && selectedIndex !== null && (
          <motion.div
            className="gallery-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
            role="dialog"
            aria-label={`Photo: ${selected.caption}`}
            aria-modal="true"
          >
            <motion.div
              className="gallery-modal"
              ref={modalRef}
              tabIndex={-1}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
            >
              <button
                className="gallery-modal__close"
                onClick={closeModal}
                aria-label="Close photo"
              >
                ✕
              </button>

              {selectedHasError ? (
                <div className="gallery-modal__placeholder" aria-hidden="true">📷</div>
              ) : (
                <img
                  className="gallery-modal__image"
                  src={selected.src}
                  alt={selected.alt}
                />
              )}

              <p className="gallery-modal__caption">{selected.caption}</p>
              {selected.date && (
                <p className="gallery-modal__date">{selected.date}</p>
              )}

              {photos.length > 1 && (
                <div className="gallery-modal__nav">
                  <button className="gallery-modal__nav-btn" onClick={goPrev} aria-label="Previous photo">
                    ← Previous
                  </button>
                  <button className="gallery-modal__nav-btn" onClick={goNext} aria-label="Next photo">
                    Next →
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
