import { useState, useEffect } from "react";

const tipsWithSave = [
  "Squad harmony is as important as individual skill.",
  "Adapt your tactics to your squad's strengths.",
  "Keep an eye on contract expirations — plan six months ahead.",
  "Youth development is the foundation of long-term success.",
  "The transfer market rewards patience. Bid early, negotiate late.",
];

const tipsNoSave = [
  "Choose a club that matches your philosophy.",
  "Start small. Build your reputation over seasons.",
  "Every great career begins with a single decision.",
  "Learn your squad before making big changes.",
  "Patience is a manager's most valuable trait.",
];

export function useRotatingTips(hasSaves: boolean, intervalMs = 10000): string {
  const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * 5));

  const pool = hasSaves ? tipsWithSave : tipsNoSave;
  const tip = pool[tipIndex % pool.length];

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % pool.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [hasSaves, intervalMs]);

  return tip;
}
