'use client';

import { useState, useEffect } from 'react';
import { PersonStanding } from 'lucide-react';
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { FullScreenMenu } from './FullScreenMenu';
import { useLenis } from '@/lib/lenis';

interface MenuProps {
  isMuted: boolean;
  onToggleMute: () => void;
  isNarrationEnabled: boolean;
  onToggleNarration: () => void;
}

export default function Menu({ isMuted, onToggleMute, isNarrationEnabled, onToggleNarration }: MenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'about', 'story', 'quotes'];
      const newActiveSection = sections.find(section => {
        const rect = document.getElementById(section)?.getBoundingClientRect();
        const halfWindowHeight = window.innerHeight / 2;
        return rect && rect.top <= halfWindowHeight && rect.bottom >= halfWindowHeight;
      });

      if (newActiveSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (section: string) => {
    const targetElement = document.getElementById(section);
    if (targetElement && lenis) {
      lenis.scrollTo(targetElement);
    }
  };

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-30">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <div className="flex items-center space-x-2">
            <Button 
              variant="blurbutton"
              size="icon"
              aria-label="Menu icon"
              className='bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 backdrop-blur-xl dark:hover:bg-accent'
              onClick={() => setIsMenuOpen(true)}
              >
                <PersonStanding className="h-6 w-6" />
              </Button>
              <Menubar>
                {[
                  { name: "Intro", id: "intro" },
                  { name: "About", id: "about" },
                  { name: "Story", id: "story" },
                  { name: "Quotes", id: "quotes" },
                ].map((item) => (
                  <MenubarMenu key={item.id}>
                    <MenubarTrigger
                      className={`cursor-pointer transition-color duration-300 ${
                        activeSection === item.id ? "bg-accent font-semibold" : "text-accent-foreground"
                      }`}
                      onClick={() => handleNavigation(item.id)}
                    >
                      {item.name}
                    </MenubarTrigger>
                  </MenubarMenu>
                ))}
              </Menubar>
            </div>
          </div>
        </div>
      </header>
      <FullScreenMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        isMuted={isMuted} 
        onToggleMute={onToggleMute}
        isNarrationEnabled={isNarrationEnabled}
        onToggleNarration={onToggleNarration}
      />
    </>
  )
}