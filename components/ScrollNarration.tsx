import React, { useEffect, useState, useRef, useMemo } from 'react';

interface AudioSection {
  id: number;
  triggerAt: number;
  audioFile: string;
}

interface ScrollNarrationProps {
  shouldStart: boolean;
  enabled: boolean;
}

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

export default function ScrollNarration({ shouldStart, enabled }: ScrollNarrationProps) {
  const progress = useScrollProgress();
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInitialized = useRef(false);

  const audioSections = useMemo<AudioSection[]>(() => [
    { id: 1, triggerAt: 0, audioFile: '/narration/narration_A1-0001.mp3' },
    { id: 2, triggerAt: 6, audioFile: '/narration/narration_A2-0001.mp3' },
    { id: 3, triggerAt: 11.2, audioFile: '/narration/narration_A2-0002.mp3' },
    { id: 4, triggerAt: 14, audioFile: '/narration/narration_A2-0003.mp3' },
    { id: 5, triggerAt: 17.7, audioFile: '/narration/narration_A2-0004.mp3' },
    { id: 6, triggerAt: 21.5, audioFile: '/narration/narration_A2-0005.mp3' },
    { id: 7, triggerAt: 26.5, audioFile: '/narration/narration_A2-0006.mp3' },
    { id: 8, triggerAt: 31.8, audioFile: '/narration/narration_A2-0007.mp3' },
    { id: 9, triggerAt: 38, audioFile: '/narration/narration_A2-0008.mp3' },
    { id: 10, triggerAt: 46, audioFile: '/narration/narration_A2-0009.mp3' },
    { id: 11, triggerAt: 61, audioFile: '/narration/narration_A2-0010.mp3' },
    { id: 12, triggerAt: 72, audioFile: '/narration/narration_A3-0001.mp3' },
    { id: 13, triggerAt: 77.5, audioFile: '/narration/narration_A3-0002.mp3' },
    { id: 14, triggerAt: 79.9, audioFile: '/narration/narration_A3-0003.mp3' },
    { id: 15, triggerAt: 82.62, audioFile: '/narration/narration_A3-0004.mp3' },
    { id: 16, triggerAt: 85.42, audioFile: '/narration/narration_A3-0005.mp3' },
    { id: 17, triggerAt: 88, audioFile: '/narration/silent.mp3' },
  ], []);

  useEffect(() => {
    if (!enabled && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentAudio(null);
    }
  }, [enabled]);

  useEffect(() => {
    if (shouldStart && !hasInitialized.current && enabled) {
      hasInitialized.current = true;
      const firstSection = audioSections[0];
      const audio = new Audio(firstSection.audioFile);
      audioRef.current = audio;
      setCurrentAudio(firstSection.audioFile);
      audio.play().catch(error => console.log('Audio playback failed:', error));
    }
  }, [shouldStart, audioSections, enabled]);

  useEffect(() => {
    if (!shouldStart || !hasInitialized.current || !enabled) return;

    const currentSection = audioSections.reduce((prev, curr) => {
      if (progress >= curr.triggerAt) return curr;
      return prev;
    });

    if (currentSection && currentSection.audioFile !== currentAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(currentSection.audioFile);
      audioRef.current = audio;
      setCurrentAudio(currentSection.audioFile);
      
      audio.play().catch(error => console.log('Audio playback failed:', error));
    }
  }, [progress, currentAudio, audioSections, shouldStart, enabled]);

  if (!enabled) return null;

  return (
    <div>
    </div>
  );
};
