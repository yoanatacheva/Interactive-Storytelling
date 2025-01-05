'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function MainVideo() {
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const { theme, systemTheme } = useTheme()

  const currentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    const video = document.createElement('video')
    video.preload = 'auto'

    const handleCanPlay = () => {
      setIsVideoReady(true)
    }

    video.addEventListener('canplay', handleCanPlay)

    video.innerHTML = `
    <source src="/${currentTheme === 'dark' ? 'dark' : 'light'}.webm" type="video/webm" />
    <source src="/${currentTheme === 'dark' ? 'dark' : 'light'}.mp4" type="video/mp4" />
    `

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [currentTheme])

  useEffect(() => {
    if (isVideoReady) {
      setShowVideo(true)
    }
  }, [isVideoReady])

  return (
    <div>
      {showVideo && (
        <video
          key={currentTheme}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover z-[-1] transition-opacity duration-100 opacity-0"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Gradient Background"
          onLoadedData={(e) => {
            e.currentTarget.classList.replace('opacity-0', 'opacity-100')
          }}
        >
          <source src={`/${currentTheme === 'dark' ? 'dark' : 'light'}.webm`} type="video/webm" />
          <source src={`/${currentTheme === 'dark' ? 'dark' : 'light'}.mp4`} type="video/mp4" />
          <p>Your browser does not support the video tag. Here is a <a href={`/${currentTheme === 'dark' ? 'dark' : 'light'}.mp4`}>link to the video</a> instead.</p>
        </video>
      )}
    </div>
  )
}