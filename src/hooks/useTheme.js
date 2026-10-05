import { useCallback, useEffect, useState } from "react";

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

function current() {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return media().matches ? "dark" : "light";
}

// Light / dark theme that follows the OS until the visitor picks one.
export function useTheme() {
  const [theme, setTheme] = useState(current);

  useEffect(() => {
    const mq = media();
    const onChange = () => {
      if (!document.documentElement.dataset.theme) setTheme(current());
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = current() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode); the choice still applies for this visit.
    }
    setTheme(next);
  }, []);

  return [theme, toggle];
}
