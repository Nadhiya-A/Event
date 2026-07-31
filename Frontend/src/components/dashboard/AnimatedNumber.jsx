import { useEffect, useState } from "react";

function AnimatedNumber({ value, duration = 600 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrame;
    let startTime;

    const animate = (time) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);

      setCount(Math.round(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return count;
}

export default AnimatedNumber;