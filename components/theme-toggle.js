"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    const savedMode = window.localStorage.getItem("perpsia-theme");
    const nextLightMode = savedMode === "light";
    // The initial render stays deterministic for SSR; this hydrates the saved browser preference.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLightMode(nextLightMode);
    document.documentElement.classList.toggle("light-mode", nextLightMode);
  }, []);

  function toggleTheme() {
    const nextLightMode = !lightMode;
    setLightMode(nextLightMode);
    document.documentElement.classList.toggle("light-mode", nextLightMode);
    window.localStorage.setItem("perpsia-theme", nextLightMode ? "light" : "dark");
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={lightMode ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={lightMode}
      title={lightMode ? "Switch to dark mode" : "Switch to light mode"}
    >
      {lightMode ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
      <span>{lightMode ? "Light" : "Dark"}</span>
    </button>
  );
}
