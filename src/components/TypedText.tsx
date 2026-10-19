"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export default function TypedText({ words, speed = 70 }: { words: string[]; speed?: number }) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const done = n === words[i].length;
    const t = setTimeout(() => {
      if (!done) setN(n + 1);
      else { setI((i + 1) % words.length); setN(0); }
    }, done ? 1400 : speed);
    return () => clearTimeout(t);
  }, [i, n, reduce, words, speed]);
  return <>{reduce ? words[0] : words[i].slice(0, n)}<span aria-hidden className="animate-pulse">|</span></>;
}
