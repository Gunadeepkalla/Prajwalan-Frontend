// React Bits — SpotlightCard
// Mouse-tracking radial gradient glows under the cursor
import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(35,85,212,0.10)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = divRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current!.style.background = `radial-gradient(circle 220px at ${x}px ${y}px, ${spotlightColor}, transparent 80%), #ffffff`;
  };

  const handleMouseLeave = () => {
    if (divRef.current) divRef.current.style.background = "#ffffff";
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ background: "#ffffff", transition: "background 0.1s" }}
    >
      {children}
    </div>
  );
}
