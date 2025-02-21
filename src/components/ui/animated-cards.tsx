"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const AnimatedCards = ({
  items,
  children,
}: {
  items: number;
  children: React.ReactNode;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4'>
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          className='relative group'
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            initial={false}
            animate={{
              scale: hoveredIndex === i ? 1.05 : 1,
              rotateY: hoveredIndex === i ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
            className='relative bg-zinc-900 rounded-xl p-4 h-full'
          >
            {children}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

// components/ui/moving-border.tsx

export const MovingBorder = ({
  children,
  duration = 2000,
  roundness = "rounded-full",
}: {
  children: React.ReactNode;
  duration?: number;
  roundness?: string;
}) => {
  return (
    <div
      className={`relative ${roundness} bg-zinc-900 p-[1px] overflow-hidden`}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: duration / 1000,
          repeat: Infinity,
          ease: "linear",
        }}
        className='absolute inset-[-1px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500'
      />
      <div className={`relative ${roundness} bg-zinc-900 p-4`}>{children}</div>
    </div>
  );
};

export const TextGenerateEffect = ({ words }: { words: string }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= words.length) {
        setDisplayText(words.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [words]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.span>
  );
};

export const SparklesCore = () => {
  const particles = Array.from({ length: 50 });
  return (
    <div className='absolute inset-0 pointer-events-none'>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className='absolute w-1 h-1 bg-white rounded-full'
        />
      ))}
    </div>
  );
};
