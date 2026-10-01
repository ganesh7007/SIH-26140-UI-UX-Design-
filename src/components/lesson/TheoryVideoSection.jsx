import React, { useState, useRef, useEffect } from 'react';
import { PlaybookIcon, AlarmPlay, AlarmPause } from '../ReiconIcons';

export const TheoryVideoSection = ({
  videoData,
  hasQuiz = false,
  onTakeQuiz,
  onContinue,
  onPlaySound
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(15);
  const [duration, setDuration] = useState(191); // ~3:11 default
  const [isEnded, setIsEnded] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [captionsActive, setCaptionsActive] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressTrackRef = useRef(null);

  // Primary quantum computing theory video URL
  const videoUrl =
    videoData?.url?.trim() ||
    'https://res.cloudinary.com/dfjtvivgv/video/upload/v1789661841/%E0%AE%95%E0%AF%81%E0%AE%B5%E0%AE%BE%E0%AE%A3%E0%AF%8D%E0%AE%9F%E0%AE%AE%E0%AF%8D_%E0%AE%95%E0%AE%B1%E0%AF%8D%E0%AE%B1%E0%AE%B2%E0%AF%8D_qwx4kq.mp4';
  const videoTitle = videoData?.title || 'Quantum Computing Fundamentals';
  const durationLabel = videoData?.duration || '3:11';
  const thumbnail = videoData?.thumbnail;

  const handlePlayPause = (e) => {
    e?.stopPropagation?.();
    if (onPlaySound) onPlaySound('click');
    if (!videoRef.current) {
      setIsPlaying(!isPlaying);
      return;
    }
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setIsEnded(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    if (onPlaySound) onPlaySound('correct');
  };

  const handleToggleMute = (e) => {
    e?.stopPropagation?.();
    if (onPlaySound) onPlaySound('click');
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleScrub = (e) => {
    e?.stopPropagation?.();
    if (!progressTrackRef.current) return;
    const rect = progressTrackRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pos * (duration || 191);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleFullscreen = (e) => {
    e?.stopPropagation?.();
    if (onPlaySound) onPlaySound('click');
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen?.().catch((err) => console.log(err));
      } else {
        document.exitFullscreen?.().catch((err) => console.log(err));
      }
    }
  };

  const handlePiP = async (e) => {
    e?.stopPropagation?.();
    if (onPlaySound) onPlaySound('click');
    try {
      if (videoRef.current) {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
          await videoRef.current.requestPictureInPicture();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatSeconds = (sec) => {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const formatRemaining = (cur, total) => {
    const diff = Math.max(0, (total || 191) - (cur || 0));
    return `-${formatSeconds(diff)}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 8;
  const displayPercent = Math.max(8, Math.min(100, Math.round(progressPercent)));

  return (
    <div className="theory-video-section-wrapper modern-video-view">
      {/* Top Video Header Tag */}
      <div className="theory-section-tag">
        <span className="section-tag-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <PlaybookIcon size={20} color="currentColor" />
        </span>
        <span className="section-tag-title">THEORY VIDEO</span>
      </div>

      {/* Main Cinematic Video Player Card */}
      <div className="modern-video-card" ref={containerRef} onClick={handlePlayPause}>
        {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
          <div className="video-iframe-responsive">
            <iframe
              src={videoUrl.replace('watch?v=', 'embed/')}
              title={videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="modern-html5-video-wrapper">
            <video
              ref={videoRef}
              src={videoUrl}
              poster={thumbnail}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnded}
              playsInline
              className="modern-native-video"
            />

            {/* Central Soft Play Overlay Button when Paused */}
            {!isPlaying && (
              <div className="modern-video-center-overlay" onClick={handlePlayPause}>
                <button
                  type="button"
                  className="modern-center-play-btn"
                  aria-label="Play video"
                >
                  <AlarmPlay size={32} color="currentColor" />
                </button>
              </div>
            )}

            {/* Sleek Bottom Video Control Bar */}
            <div
              className={`modern-video-bar ${showControls ? 'active' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Controls (Play, Volume, Elapsed Time) */}
              <div className="modern-bar-left">
                {/* Play / Pause Toggle */}
                <button
                  type="button"
                  className="modern-bar-btn"
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <AlarmPause size={22} color="currentColor" />
                  ) : (
                    <AlarmPlay size={22} color="currentColor" />
                  )}
                </button>

                {/* Volume / Mute Button */}
                <button
                  type="button"
                  className="modern-bar-btn"
                  onClick={handleToggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  )}
                </button>

                {/* Current Elapsed Time */}
                <span className="modern-time-text elapsed">
                  {formatSeconds(currentTime)}
                </span>
              </div>

              {/* Center Scrubbable Progress Track */}
              <div
                className="modern-scrubber-track"
                ref={progressTrackRef}
                onClick={handleScrub}
              >
                <div
                  className="modern-scrubber-buffer"
                  style={{ width: `${Math.min(100, progressPercent + 25)}%` }}
                />
                <div
                  className="modern-scrubber-fill"
                  style={{ width: `${progressPercent}%` }}
                >
                  <span className="modern-scrubber-thumb" />
                </div>
              </div>

              {/* Right Controls (Remaining Time, CC, Settings, PiP, Cast, Fullscreen) */}
              <div className="modern-bar-right">
                <span className="modern-time-text remaining">
                  {formatRemaining(currentTime, duration)}
                </span>

                {/* Captions / CC */}
                <button
                  type="button"
                  className={`modern-bar-btn ${captionsActive ? 'btn-active' : ''}`}
                  onClick={() => setCaptionsActive(!captionsActive)}
                  title="Captions (CC)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="M7 15h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H7v6zM15 15h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2v6z" strokeWidth="1.5" />
                  </svg>
                </button>

                {/* Settings Gear */}
                <button
                  type="button"
                  className="modern-bar-btn"
                  title="Settings"
                  onClick={() => onPlaySound?.('click')}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                  </svg>
                </button>

                {/* Picture in Picture */}
                <button
                  type="button"
                  className="modern-bar-btn"
                  title="Picture in Picture"
                  onClick={handlePiP}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <rect x="12" y="10" width="8" height="6" rx="1" fill="currentColor" fillOpacity="0.3" />
                  </svg>
                </button>

                {/* Cast / Airplay */}
                <button
                  type="button"
                  className="modern-bar-btn"
                  title="Cast / Airplay"
                  onClick={() => onPlaySound?.('click')}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 20h.01" />
                  </svg>
                </button>

                {/* Fullscreen */}
                <button
                  type="button"
                  className="modern-bar-btn"
                  onClick={handleFullscreen}
                  title="Fullscreen"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Lesson Progress Dock / Bottom Card matching the user image */}
      <div className="lesson-progress-dock-card">
        {/* Left: Circular Progress Ring with Percentage */}
        <div className="progress-ring-box">
          <svg className="circular-progress-svg" viewBox="0 0 36 36">
            <path
              className="progress-bg-track"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="progress-val-fill"
              strokeDasharray={`${displayPercent}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="progress-percent-label">{displayPercent}%</span>
        </div>

        {/* Center: Lesson Progress Title and Watching Highlight */}
        <div className="progress-details-block">
          <span className="progress-sub-header">Lesson Progress</span>
          <div className="progress-main-title">
            Watching <span className="watching-title-highlight">{videoTitle}</span>
          </div>
        </div>

        {/* Right: Continue Button */}
        <div className="progress-action-box">
          <button
            type="button"
            className="modern-continue-btn"
            onClick={() => {
              if (onPlaySound) onPlaySound('click');
              if (hasQuiz && onTakeQuiz) {
                onTakeQuiz();
              } else if (onContinue) {
                onContinue();
              }
            }}
          >
            <span>{hasQuiz ? 'Take Quiz' : 'Continue'}</span>
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TheoryVideoSection;
