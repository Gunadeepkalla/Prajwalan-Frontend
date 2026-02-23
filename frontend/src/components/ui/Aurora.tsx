// React Bits — Aurora (animated gradient blobs for hero backgrounds)
import { motion } from "framer-motion";

interface AuroraProps {
  className?: string;
}

const BLOBS = [
  {
    size: "w-[680px] h-[680px]",
    color: "bg-[#2355D4]",
    top: "-180px",
    left: "-160px",
    duration: 14,
    delay: 0,
  },
  {
    size: "w-[560px] h-[560px]",
    color: "bg-[#6D3FCF]",
    top: "-120px",
    right: "-120px",
    duration: 18,
    delay: 2,
  },
  {
    size: "w-[420px] h-[420px]",
    color: "bg-[#E06426]",
    bottom: "40px",
    left: "35%",
    duration: 12,
    delay: 4,
  },
];

export default function Aurora({ className = "" }: AuroraProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden
    >
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full opacity-20 blur-[100px] ${blob.size} ${blob.color}`}
          style={{
            top: blob.top,
            left: (blob as any).left,
            right: (blob as any).right,
            bottom: (blob as any).bottom,
          }}
          animate={{
            scale: [1, 1.18, 0.95, 1.1, 1],
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 20, -10, 0],
          }}
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* noise grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}
