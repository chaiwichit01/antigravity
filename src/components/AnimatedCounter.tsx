import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  label: string;
}

const AnimatedCounter = ({ end, suffix = "", duration = 2000, label }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  const digits = `${count}${suffix}`.split("");

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-center justify-center gap-[2px] mb-1">
        {digits.map((char, i) => (
          <span
            key={`${i}-${char}`}
            className={`inline-flex items-center justify-center font-display text-2xl md:text-3xl font-bold ${/\d/.test(char)
                ? "bg-primary/10 text-primary w-8 h-10 md:w-10 md:h-12 rounded-lg"
                : "text-primary"
              }`}
            style={{
              animation: /\d/.test(char) ? `fade-in 0.15s ease-out ${i * 0.05}s both` : undefined,
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="text-muted-foreground text-xs md:text-sm">{label}</div>
    </div>
  );
};

export default AnimatedCounter;
