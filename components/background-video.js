"use client";

import { useEffect, useRef } from "react";

export default function BackgroundVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadVideo = () => {
      const video = videoRef.current;
      if (!video) return;

      const source = video.querySelector("source[data-src]");
      if (!source || source.src) return;

      source.src = source.dataset.src;
      video.load();
      video.play().catch(() => {
        // The poster remains visible when autoplay is unavailable.
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadVideo, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(loadVideo, 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <video
      ref={videoRef}
      className="site-background-video"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster="/images/hero-landscape.webp"
      aria-hidden="true"
    >
      <source data-src="/images/hero-landscape.mp4" type="video/mp4" />
    </video>
  );
}