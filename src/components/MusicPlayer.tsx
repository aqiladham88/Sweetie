import loveStory from "../config/loveStory";
import type { AudioPlayerState, AudioPlayerActions } from "../hooks/useAudioPlayer";
import "./MusicPlayer.css";

type Props = AudioPlayerState & AudioPlayerActions;

export default function MusicPlayer(props: Props) {
  const {
    isPlaying, isMuted, volume, isAvailable,
    songTitle, songArtist, externalLink,
    togglePlay, toggleMute, setVolume, audioRef,
  } = props;

  const song = loveStory.song;

  // Nothing to show
  if (!song) return null;

  // Audio file not available — show external link fallback if configured
  if (!isAvailable) {
    if (externalLink) {
      return (
        <div className="music-player" role="complementary" aria-label="Music">
          <a
            className="music-player__link"
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            🎵 Listen to "{songTitle}" by {songArtist}
          </a>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={song.audioPath} loop preload="auto" />

      <div className="music-player" role="complementary" aria-label="Music player">
        {/* Play / Pause */}
        <button
          className="music-player__btn"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        {/* Song info */}
        <div className="music-player__info">
          <span className="music-player__title">{songTitle}</span>
          <span className="music-player__artist">{songArtist}</span>
        </div>

        {/* Volume */}
        <div className="music-player__volume">
          <button
            className="music-player__mute-btn"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? "🔇" : volume > 0.5 ? "🔊" : "🔉"}
          </button>
          <input
            type="range"
            className="music-player__volume-slider"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Volume"
          />
        </div>
      </div>
    </>
  );
}
