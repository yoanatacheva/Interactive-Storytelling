'use client'

import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import MainVideo from '@/components/MainVideo';
import { useFont } from '@/components/FontProvider';

const Heading = ({ text, animationRef }: { 
  text: string, 
  animationRef: React.RefObject<HTMLSpanElement> 
}) => (
  <span className="block" ref={animationRef}>
    {text.split('').map((char, index) => (
      <span key={index} className="inline-block whitespace-pre opacity-0">{char}</span>
    ))}
  </span>
);

export default function Intro({ shouldAnimate = false }: { shouldAnimate?: boolean }): JSX.Element {
  const introRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const { fontType } = useFont();

  const timeline = useMemo(() => {
    const createCharAnimation = (children: Element[]) =>
      gsap.fromTo(children, { opacity: 0, filter: 'blur(5px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.1,
          stagger: 0.1,
          ease: 'none',
        }
      );

    return () => {
      if (!line1Ref.current || !line2Ref.current) return null;

      const line1Children = Array.from(line1Ref.current.children);
      const line2Children = Array.from(line2Ref.current.children);

      gsap.set([...line1Children, ...line2Children], {opacity: 0, });

      return gsap.timeline({ paused: true })
        .add(createCharAnimation(line1Children))
        .add(createCharAnimation(line2Children), '+=0.5');
    };
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return;

    const tl = timeline();
    const IntroComponent = introRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl?.restart();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (IntroComponent) {
      observer.observe(IntroComponent);
    }

    return () => {
      if (IntroComponent) {
        observer.unobserve(IntroComponent);
      }
    };
  }, [timeline, shouldAnimate]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen" ref={introRef}>
      <MainVideo />
      <div className="relative z-10">
        <h1 className={`${fontType === 'inter' ? 'font-juana' : 'font-dyslexic'} text-center 2xl:text-10xl xl:text-8xl lg:text-8xl md:text-7xl sm:text-6xl text-4.5xl text-nowrap 2xl:mb-12 lg:mb-10 md:mb-8 sm:mb-6 mb-4`}>
          <Heading text="The Journey of" animationRef={line1Ref} />
          <Heading text="Megan Majocha" animationRef={line2Ref} />
        </h1>
        <p className={`2xl:text-xl xl:text-xl lg:text-lg md:text-base text-base text-center leading-snug transition-opacity duration-500 ${shouldAnimate ? "opacity-100" : "opacity-0"}`}>
          <span className="block">Inspiring story transformed into</span>
          <span className="block">an interactive storytelling website</span>
        </p>
      </div>
    </div>
  );
}