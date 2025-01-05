'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useFont } from '@/components/FontProvider';

type QuoteType = { 
  line1: string; 
  line2: string; 
  audio: string;
};

const quotes: QuoteType[] = [
  { 
    line1: "“All of this has", 
    line2: "been a lot of work.”",
    audio: "/narration/narration_A4-0002.mp3"
  },
  { 
    line1: "“I'd love to", 
    line2: "focus on my research.”",
    audio: "/narration/narration_A4-0001.mp3"
  },
  { 
    line1: "“I feel burnt out", 
    line2: "from all this work.”",
    audio: "/narration/narration_A4-0003.mp3"
  },
];

const Quote = ({ text, animationRef }: { text: string; animationRef: React.RefObject<HTMLSpanElement> }) => (
  <span className="block" ref={animationRef}>
    {text.split('').map((char, i) => (
      <span key={i} className="inline-block whitespace-pre">{char}</span>
    ))}
  </span>
);

export default function Quotes({ isNarrationEnabled }: { isNarrationEnabled: boolean; }): JSX.Element {
  const { fontType } = useFont();
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  const [currentQuote, setCurrentQuote] = useState<QuoteType>(quotes[0]);
  const [isInView, setIsInView] = useState(false);

  const typingTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
          audioRef.current?.pause();
        }
      },
      { threshold: 0.5 }
    );
  
    if (node) observer.observe(node);
  
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => {
        let newQuote;
        do {
          newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        } while (newQuote === prev);
        return newQuote;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    animateQuote();
    if (isInView && isNarrationEnabled && audioRef.current) {
      audioRef.current.src = currentQuote.audio;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.warn('Audio play was interrupted:', err);
      });
    } else {
      audioRef.current?.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuote, isNarrationEnabled]);

  const animateQuote = () => {
    if (!line1Ref.current || !line2Ref.current) return;

    typingTimelineRef.current?.kill();

    const tl = gsap.timeline();

    tl.set(
      [line1Ref.current.children, line2Ref.current.children],
      { opacity: 0, filter: 'blur(5px)' }
    );

    tl.to(line1Ref.current.children, {
      opacity: 1,
      filter: 'blur(0)',
      duration: 0.1,
      stagger: 0.1,
      ease: 'none'
    });

    tl.to(line2Ref.current.children, {
      opacity: 1,
      filter: 'blur(0)',
      duration: 0.1,
      stagger: 0.1,
      ease: 'none'
    }, '+=0.5');

    typingTimelineRef.current = tl;
  };

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className={`${fontType === 'inter' ? 'font-juana' : 'font-dyslexic'} text-center text-2xl sm:text-4xl md:text-4.5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-3 sm:mb-6 lg:mb-4 2xl:mb-8`}>
        <Quote text={currentQuote.line1} animationRef={line1Ref} />
        <Quote text={currentQuote.line2} animationRef={line2Ref} />
      </h1>
    </div>
  );
}