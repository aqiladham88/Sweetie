import { useState, useCallback } from "react";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import EnvelopeIntro from "./components/EnvelopeIntro";
import MusicPlayer from "./components/MusicPlayer";
import Hero from "./components/Hero";
import AppreciationCards from "./components/AppreciationCards";
import MemoryGallery from "./components/MemoryGallery";
import HeartGame from "./components/HeartGame";
import OpenWhenLetters from "./components/OpenWhenLetters";
import LoveLetter from "./components/LoveLetter";
import FinalSurprise from "./components/FinalSurprise";
import "./App.css";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const audio = useAudioPlayer();

  const handleIntroComplete = useCallback(
    (withMusic: boolean) => {
      setIntroComplete(true);
      if (withMusic) {
        audio.play();
      }
    },
    [audio]
  );

  return (
    <>
      {/* Skip link for keyboard users */}
      <a className="skip-link" href="#hero">
        Skip to content
      </a>

      {/* Envelope Intro */}
      {!introComplete && (
        <EnvelopeIntro
          audioAvailable={audio.isAvailable}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Main content */}
      {introComplete && (
        <main id="main-content">
          <Hero />

          <div className="section-divider" aria-hidden="true">♥</div>

          <AppreciationCards />

          <div className="section-divider" aria-hidden="true">♥</div>

          <MemoryGallery />

          <div className="section-divider" aria-hidden="true">♥</div>

          <HeartGame />

          <div className="section-divider" aria-hidden="true">♥</div>

          <OpenWhenLetters />

          <div className="section-divider" aria-hidden="true">♥</div>

          <LoveLetter />

          <div className="section-divider" aria-hidden="true">♥</div>

          <FinalSurprise />
        </main>
      )}

      {/* Persistent Music Player */}
      {introComplete && <MusicPlayer {...audio} />}
    </>
  );
}
