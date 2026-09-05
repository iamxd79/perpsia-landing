"use client";

import {
  ArrowDown,
  ArrowUp,
} from "lucide-react";

export default function SiteControls() {
  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function goBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <div
      className="site-controls"
      aria-label="Page navigation"
    >
      <button
        type="button"
        onClick={goTop}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <ArrowUp
          size={17}
          aria-hidden="true"
        />
      </button>

      <button
        type="button"
        onClick={goBottom}
        aria-label="Scroll to bottom"
        title="Scroll to bottom"
      >
        <ArrowDown
          size={17}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}