// React Bits — BlurText
// Words appear one-by-one with a blur-in + translate-up effect
import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;          // stagger delay between words in seconds
  stepDuration?: number;   // duration of each word animation in seconds
  animateBy?: "words" | "letters";
}

export default function BlurText({
  text,
  className = "",
  delay = 0.08,
  stepDuration = 0.45,
  animateBy = "words",
}: BlurTextProps) {
  const tokens = animateBy === "words" ? text.split(" ") : text.split("");

  return (
    <span className={`inline ${className}`}>
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(10px)", y: 18 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: stepDuration,
            delay: i * delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block"
          style={{ marginRight: animateBy === "words" ? "0.28em" : "0" }}
        >
          {token}
        </motion.span>
      ))}
    </span>
  );
}
