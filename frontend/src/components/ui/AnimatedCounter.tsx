// React Bits — AnimatedCounter (count-up on mount)
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  to: number;
  duration?: number; // ms
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({
  to,
  duration = 1800,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * to));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [to, duration]);

  return (
    <span className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
