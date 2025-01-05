'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MainVideo from "@/components/MainVideo";
import { useFont } from '@/components/FontProvider';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  <MainVideo />;
  const { fontType } = useFont();
  const textSectionRef = useRef<HTMLDivElement | null>(null);
  const textContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textContent = [
    {
      title: "Discovering the Problem",
      description: "After conversations with fellow deaf PhD students, Megan realized that each student used different signs for the same scientific terms because many signs did not exist in the American Sign Language (ASL) dictionary."
    },
    {
      title: "Developing New Signs",
      description: "Megan had to create her own signs for the scientific terms and built a team of interpreters. These interpreters worked closely with Megan to understand her research and coursework."
    },
    {
      title: "Ensuring Accurate Representation",
      description: "Megan needed to ensure her scientific ideas were communicated accurately by the interpreter because a single misused word could make her appear uninformed."
    },
    {
      title: "The Main Challenge",
      description: "The main challenge was developing signs that followed the official ASL grammar rules. She spent a significant amount of time developing the signs but wished to focus solely on her research work."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const textElements = textContentRefs.current;

      gsap.set(textElements, { opacity: 0, y: 0, filter: 'blur(10px)' });
      gsap.set(textElements[0], { opacity: 1, y: 0, filter: 'blur(0px)' });

      ScrollTrigger.create({
        trigger: textSectionRef.current,
        start: 'top top',
        pin: true,
        scrub: 1,
        onUpdate: ({ progress }) => {
          const currentSection = Math.floor(progress * textElements.length);
          const partialProgress = (progress * textElements.length) - currentSection;
          textElements.forEach((el, index) => {
            if (index === currentSection || (index === (textElements.length - 1) && progress === 1)) {
              gsap.to(el, {
                opacity: 1,
                y: (index === (textElements.length - 1)) ? 0 : partialProgress * -25,
                filter: 'blur(0px)',
                duration: 0.5,
                ease: 'power2.out',
                zIndex: 2,
              });
            } else if (index === currentSection + 1) {
              gsap.to(el, {
                opacity: partialProgress,
                y: 100 + -partialProgress * 100,
                filter: `blur(${15 - partialProgress * 10}px)`,
                duration: 0.5,
                ease: 'power2.out',
                zIndex: 1,
              });
            } else {
              gsap.to(el, {
                opacity: 0,
                y: index < currentSection ? -100 : 100,
                filter: 'blur(10px)',
                duration: 0.5,
                ease: 'power2.out',
                zIndex: 0,
              });
            }
          });
        }
      });
    }, textSectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section ref={textSectionRef} className="h-svh flex items-center justify-center overflow-hidden">
      <div className="grid 2xl:grid-cols-2 items-center gap-32 2xl:gap-28 mx-8 2xl:mx-20">
        <div>
          <h2 className={`${fontType === 'inter' ? 'font-juana' : 'font-dyslexic'} 2xl:text-7xl xl:text-6xl lg:text-6xl md:text-5xl sm:text-4xl text-4.5xl`}>
            <span className="block sm:text-nowrap">Megan develops</span>
            <span className="block">new signs to present</span>
            <span className="block sm:text-nowrap">her research</span>
          </h2>
        </div>
        <div className="relative w-full max-w-2xl 2xl:max-w-xl mx-auto">
          <div className="flex flex-col justify-center items-center">
            {textContent.map((content, index) => (
              <div
                key={index}
                ref={(el) => { textContentRefs.current[index] = el; }}
                className="absolute space-y-5">
                <h3 className="md:text-xl">{content.title}</h3>
                <p className="md:text-xl leading-snug">{content.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}