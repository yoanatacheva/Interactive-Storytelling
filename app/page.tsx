'use client'

import { useState } from "react";
import About from "@/components/About";
import Intro from "@/components/Intro";
import Quotes from "@/components/Quotes";
import Story from "@/components/Story";
import { useAudio } from "@/hooks/useAudio";
import Menu from "@/components/Menu";
import ScrollNarration from '@/components/ScrollNarration';

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [shouldAnimateIntro, setShouldAnimateIntro] = useState(false);
  const { isMuted, togglePlay, toggleMute } = useAudio("/ambient.mp3");
  const [isNarrationEnabled, setIsNarrationEnabled] = useState(true);

  const handleClick = () => {
    togglePlay();
    setFadeOut(true);
    setTimeout(() => {
      setShowLanding(false);
      setShouldAnimateIntro(true);
    }, 500);
  };

  const toggleNarration = () => {
    setIsNarrationEnabled(prev => !prev);
  };

  return (
    <div>
      <ScrollNarration shouldStart={shouldAnimateIntro} enabled={isNarrationEnabled} />
      <Menu isMuted={isMuted} onToggleMute={toggleMute} isNarrationEnabled={isNarrationEnabled} onToggleNarration={toggleNarration} />
      
      <div id="intro"><Intro shouldAnimate={shouldAnimateIntro} /></div>
      <div id="about"><About /></div>
      <div id="story"><Story /></div>
      <div id="quotes"><Quotes isNarrationEnabled={isNarrationEnabled} /></div>

      {showLanding && (
        <div
          onClick={handleClick}
          className={`fixed inset-0 flex items-center justify-center bg-background transition-opacity duration-500 z-50 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex-none flex items-center justify-center w-[min(50svh,(100svw-2svh))] rounded-full aspect-square shadow-sm border-2 cursor-pointer">
            <div className="text-2xl">Click to Start</div>
          </div>
        </div>
      )}
    </div>
  );
}