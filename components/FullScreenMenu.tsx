'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useFont } from '@/components/FontProvider'
import { X, Moon, Sun, ZoomIn, AudioLines, Droplet, DropletOff, Volume2, VolumeOff, ZoomOut } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface MenuItemProps {
  icon: React.ReactNode
  text: string
  letter: string
  onClick?: () => void
  disabled?: boolean
}

type FontType = 'inter' | 'dyslexic';

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, letter, onClick, disabled }) => (
  <div
    className={`relative rounded-xl flex flex-col items-center justify-center shadow-sm min-h-36 md:min-h-44 
    ${disabled ? "text-muted-foreground" : "hover:bg-accent cursor-pointer"} 
    border border-input transition-color duration-300`}
    onClick={!disabled ? onClick : undefined}
  >
    <span className="absolute top-3 left-3 text-sm">{letter}</span>
    <div>{icon}</div>
    <span className="mt-5 text-md md:text-lg">{text}</span>
  </div>
)

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isNarrationEnabled: boolean;
  onToggleNarration: () => void;
}


export function FullScreenMenu({ isOpen, onClose, isMuted, onToggleMute, isNarrationEnabled, onToggleNarration }: FullScreenMenuProps) {
  const { theme, setTheme } = useTheme()
  const [zoom, setZoomLevel] = useState(1);
  const { fontType, setFontType } = useFont() as { fontType: FontType; setFontType: React.Dispatch<React.SetStateAction<FontType>> };
  const [isDesaturated, setIsDesaturated] = useState(false)
  const [isMobile, setIsMobile] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }

  const toggleZoom = () => {
    setZoomLevel((prevZoom) => (prevZoom === 1 ? 1.25 : 1));
    document.documentElement.style.fontSize = `${100 * (zoom === 1 ? 1.25 : 1)}%`;
  };

  const toggleFont = () => {
    setFontType((prevFont) => (prevFont === 'inter' ? 'dyslexic' : 'inter'));
  }

  const toggleDesaturation = () => {
    setIsDesaturated((prev) => !prev)
    document.documentElement.style.filter = !isDesaturated ? 'grayscale(100%)' : 'none'
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 't':
          setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
          break;
        case 'z':
          const newZoom = zoom === 1 ? 1.25 : 1;
          setZoomLevel(newZoom);
          document.documentElement.style.fontSize = `${100 * newZoom}%`;
          break;
        case 'f':
          setFontType((prevFont) => (prevFont === 'inter' ? 'dyslexic' : 'inter'));
          break;
        case 's':
          const newDesaturation = !isDesaturated;
          setIsDesaturated(newDesaturation);
          document.documentElement.style.filter = newDesaturation ? 'grayscale(100%)' : 'none';
          break;
        case 'm':
          onToggleMute();
          break;
        case 'v':
          onToggleNarration();
          break;
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
  
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [setFontType, setTheme, theme, zoom, fontType, isDesaturated, onToggleMute, onToggleNarration]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])

  return (
    <div className={`fixed inset-0 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 backdrop-blur-xl z-30 overflow-auto flex items-center justify-center transition-all duration-200 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="max-w-3xl w-full mx-auto px-5 sm:px-6 lg:px-8">
        <Button
          variant="blurbutton"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </Button>
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-10 sm:pt-0 transition-all duration-200 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <MenuItem
            icon={theme === 'dark' ? <Sun className="h-10 w-10" strokeWidth={1.5} /> : <Moon className="h-10 w-10" strokeWidth={1.5} />}
            text={theme === 'dark' ? "Light Theme" : "Dark Theme"}
            letter="T"
            onClick={toggleTheme}
          />
          <MenuItem
            icon={zoom === 1 ? <ZoomIn className="h-10 w-10" strokeWidth={1.5} /> : <ZoomOut className="h-10 w-10" strokeWidth={1.5} />}
            text={isMobile ? "Zoom Disabled" : zoom === 1 ? "Zoom In" : "Zoom Out"}
            letter="Z"
            onClick={toggleZoom}
            disabled={isMobile}
          />
          <MenuItem
            icon={<div className={`h-10 w-10 flex items-center justify-center cursor-pointer text-3xl ${fontType === 'inter' ? 'font-inter' : 'font-dyslexic'}`}>Aa</div>}
            text={`${fontType === 'inter' ? 'Default' : 'Dyslexic'}`}
            letter="F"
            onClick={toggleFont}
          />
          <MenuItem 
            icon={<AudioLines className="h-10 w-10" strokeWidth={1.5} />} 
            text={isNarrationEnabled ? "Narration Off" : "Narration On"} 
            letter="V"
            onClick={onToggleNarration}
          />
          <MenuItem
            icon={isDesaturated ? <Droplet className="h-10 w-10" strokeWidth={1.5} /> : <DropletOff className="h-10 w-10" strokeWidth={1.5} />}
            text={isDesaturated ? "Saturation" : "Desaturation"}
            letter="S"
            onClick={toggleDesaturation}
          />
          <MenuItem
            icon={isMuted ? <VolumeOff className="h-10 w-10" strokeWidth={1.5} /> : <Volume2 className="h-10 w-10" strokeWidth={1.5} />}
            text={isMuted ? "Unmute Sound" : "Mute Sound"}
            letter="M"
            onClick={onToggleMute}
          />
        </div>
      </div>
    </div>
  )
}