'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFont } from '@/components/FontProvider';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { fontType } = useFont();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const text_circlesRef = useRef<HTMLDivElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  function calculateDimensions() {
    const text_circles = text_circlesRef.current;
    const wrapper = wrapperRef.current;
    const container = containerRef.current;

    if (!wrapper || !container || text_circles.length === 0) return;

    const computedStyle = window.getComputedStyle(text_circles[0]);
    const marginLeft = parseInt(computedStyle.marginLeft) || 0;
    const marginRight = parseInt(computedStyle.marginRight) || 0;

    const totalWidth = text_circles[0].offsetWidth + marginLeft + marginRight;
    const initialXPosition = (container.offsetWidth - totalWidth) / 2;

    gsap.set(wrapper, { x: initialXPosition });

    return { totalWidth, initialXPosition };
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const text_circles = text_circlesRef.current;
      const container = containerRef.current;

      if (!container || !text_circles || text_circles.length === 0) return;

      gsap.to(text_circles, {
        x: () => {
          const { totalWidth = 0 } = calculateDimensions() || {};
          return -totalWidth * (text_circles.length - 1);
        },
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          end: '+=500%',
          onRefresh: () => {
            const { initialXPosition = 0 } = calculateDimensions() || {};
            gsap.set(wrapperRef.current, { x: initialXPosition });
          },
        },
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const texts = [
    'Megan was born in a third-generation Deaf family in Pittsburgh, Pennsylvania.',
    'She attended a primary school for Deaf children and went to a mainstream secondary school.',
    'Her parents believed learning to work with interpreters would benefit her later.',
    'During secondary school, Megan worked closely with interpreters for six years, developing signs for scientific terms.',
    'Balancing this effort with her studies was a significant challenge in her teens.',
    'In August 2019, Megan began her PhD in tumor biology at Georgetown University in Washington DC.',
    'During her research, she faced significant challenges leading to burnout.',
    'As she prepared to defend her thesis in her fifth year, Megan encountered a critical problem - communicating her research.',
    'This was a pivotal moment in her PhD, a challenge she had to overcome.',
  ];

  text_circlesRef.current = [];

  return (
    <div ref={containerRef} className="h-svh flex flex-col bg-background justify-evenly overflow-hidden">
      <div className="absolute top-0 left-0 lg:w-[25svw] h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 right-0 lg:w-[25svw] h-full bg-gradient-to-r from-transparent to-background pointer-events-none z-20" />
      <h1 className={`${fontType === 'inter' ? 'font-juana' : 'font-dyslexic'} text-center lg:text-7xl md:text-6xl sm:text-5xl text-4.5xl text-nowrap z-10`}>
        <span className="block">PhD</span>
        <span className="block">Megan Majocha</span>
      </h1>
      <div ref={wrapperRef} className="flex flex-row">
        {texts.map((text, index) => (
          <div key={index} ref={(el) => { if (el) text_circlesRef.current[index] = el; }} className={`flex-none flex items-center justify-center w-[min(50svh,(100svw-2svh))] rounded-full aspect-square shadow-sm border-2 px-[8svh] m-[1svh] ${fontType === 'dyslexic' ? 'text-lg' : ''}`}>
            <p className={`text-center text-[clamp(1rem,calc(0.25svw+1.5svh),1.5rem)] leading-snug ${fontType === 'dyslexic' ? 'font-dyslexic' : ''}`}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
