"use client";

import { useEffect, useState } from "react";

const lines = [
  "[system] initializing developer brain...",
  "[ok] loading backend instincts (C#, .NET, APIs)",
  "[ok] attaching frontend layer (React, Next.js, HTML)",
  "[ok] compiling ideas into runnable logic",
  "[ok] loading curiosity engine: always active",
  "[ok] optimizing problem-solving routines",
  "[ok] connecting 'how does this work under the hood?' module",
  "[success] system ready: let's ship something interesting!"
];

const randomDelay = () => 1000 + Math.random() * 900;

type Phase = "typing" | "waiting" | "done";

export default function TerminalBox() {
  const [output, setOutput] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (lineIndex >= lines.length) {
      setPhase("done");
      return;
    }

    const line = lines[lineIndex];

    if (phase === "typing") {
      if (charIndex < line.length) {
        const t = setTimeout(() => {
          setCurrentLine(line.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 40);

        return () => clearTimeout(t);
      }

      // typing finished → move to waiting (deferred)
      const t = setTimeout(() => {
        setOutput((prev) => [...prev, line]);
        setCurrentLine("");
        setCharIndex(0);
        setPhase("waiting");
      }, 0);

      return () => clearTimeout(t);
    }

    if (phase === "waiting") {
      const t = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setPhase("typing");
      }, randomDelay());

      return () => clearTimeout(t);
    }
  }, [charIndex, lineIndex, phase]);

  return (
    <div className="w-full h-full rounded-lg bg-black text-green-500 font-mono p-4 shadow-lg">
      <div className="space-y-1">
        {output.map(l => (
          <p key={l}>{l}</p>
        ))}

        {lineIndex < lines.length && (
          <p>
            {currentLine}
            <span className="animate-pulse">▍</span>
          </p>
        )}
      </div>
    </div>
  );
}