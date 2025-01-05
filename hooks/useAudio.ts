import { useState, useEffect } from 'react';

let audioInstance: HTMLAudioElement | null = null;

export function useAudio(src: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!audioInstance) {
      audioInstance = new Audio(src);
      audioInstance.loop = true;
      audioInstance.volume = 0.2;
    }
    return () => {
      if (audioInstance) {
        audioInstance.pause();
        audioInstance = null;
      }
    };
  }, [src]);

  const togglePlay = () => {
    if (audioInstance) {
      if (isPlaying) {
        audioInstance.pause();
      } else {
        audioInstance.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioInstance) {
      audioInstance.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return { isPlaying, isMuted, togglePlay, toggleMute };
}

