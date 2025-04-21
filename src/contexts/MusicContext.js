// src/contexts/MusicContext.jsx
import React, { createContext, useContext, useRef, useState } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(null);

  const playMusic = (track) => {
    if (audioRef.current.src !== track.src) {
      audioRef.current.src = track.src;
    }
    setCurrentTrack(track);
    audioRef.current.play();
    audioRef.current.loop = true; // 🔁 loop the track
    audioRef.current.play();
    setCurrentTrack(url);
    setIsPlaying(true);
  };

  const pauseMusic = () => audioRef.current.pause();

  const resumeMusic = () => audioRef.current.play();

  return (
    <MusicContext.Provider
      value={{ currentTrack, playMusic, pauseMusic, resumeMusic }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
