import { useRef, useState, useCallback, useEffect } from "react";
import loveStory from "../config/loveStory";

export interface AudioPlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  isAvailable: boolean;
  songTitle: string;
  songArtist: string;
  externalLink: string;
}

export interface AudioPlayerActions {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (v: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

/**
 * Manages the background music player.
 * Handles missing files, autoplay rejection, and user preferences.
 */
export function useAudioPlayer(): AudioPlayerState & AudioPlayerActions {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const [isAvailable, setIsAvailable] = useState(false);
  const userPaused = useRef(false);

  const song = loveStory.song;

  // Check if audio file exists
  useEffect(() => {
    if (!song?.audioPath) {
      setIsAvailable(false);
      return;
    }
    const audio = new Audio();
    audio.preload = "metadata";
    const onLoad = () => {
      setIsAvailable(true);
      audio.remove();
    };
    const onError = () => {
      setIsAvailable(false);
      audio.remove();
    };
    audio.addEventListener("canplaythrough", onLoad, { once: true });
    audio.addEventListener("error", onError, { once: true });
    audio.src = song.audioPath;

    return () => {
      audio.removeEventListener("canplaythrough", onLoad);
      audio.removeEventListener("error", onError);
      audio.remove();
    };
  }, [song?.audioPath]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = useCallback(() => {
    if (!audioRef.current || !isAvailable) return;
    userPaused.current = false;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Autoplay rejected — that's fine
      setIsPlaying(false);
    });
  }, [isAvailable]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    userPaused.current = true;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, pause, play]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const next = !isMuted;
    audioRef.current.muted = next;
    setIsMuted(next);
  }, [isMuted]);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (audioRef.current) audioRef.current.volume = clamped;
  }, []);

  // Pause when tab is hidden, resume when visible (if user hasn't paused)
  useEffect(() => {
    const handler = () => {
      if (!audioRef.current || !isAvailable) return;
      if (document.hidden) {
        audioRef.current.pause();
      } else if (!userPaused.current && isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [isAvailable, isPlaying]);

  return {
    isPlaying,
    isMuted,
    volume,
    isAvailable,
    songTitle: song?.title ?? "",
    songArtist: song?.artist ?? "",
    externalLink: song?.externalLink ?? "",
    play,
    pause,
    togglePlay,
    toggleMute,
    setVolume,
    audioRef,
  };
}
