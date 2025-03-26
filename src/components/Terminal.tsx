import React, { useState, useEffect, useRef } from 'react';
import { typeWriter } from '../utils/gameUtils';

interface TerminalProps {
  lines: string[];
  typingSpeed?: number;
  onComplete?: () => void;
  interactive?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ 
  lines, 
  typingSpeed = 30,
  onComplete,
  interactive = false
}) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [lineComplete, setLineComplete] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // If typingSpeed is 0 (skipped), display all lines at once
    if (typingSpeed === 0) {
      setDisplayedLines(lines.filter(line => line.trim()));
      setCurrentLine(lines.length);
      if (onComplete) {
        onComplete();
      }
      return;
    }

    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        typeWriter(lines[currentLine], typingSpeed).then((result) => {
          setDisplayedLines((prev) => {
            // If the line is empty (just newlines), don't add it
            if (!result.trim()) return prev;
            // If the last line is empty, replace it with the new line
            if (prev.length > 0 && !prev[prev.length - 1].trim()) {
              return [...prev.slice(0, -1), result];
            }
            return [...prev, result];
          });
          setLineComplete(true);
        });
      }, 400);
      
      return () => clearTimeout(timer);
    } else if (onComplete && !interactive) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [currentLine, lines, typingSpeed, onComplete, interactive]);

  useEffect(() => {
    if (lineComplete) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
        setLineComplete(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [lineComplete]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      setDisplayedLines((prev) => [...prev, `> ${userInput}`]);
      setUserInput('');
      if (onComplete) {
        onComplete();
      }
    }
  };

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="cyber-card max-w-3xl mx-auto bg-cyber-terminal border-cyber-blue/30 w-full">
      <div 
        ref={terminalRef}
        className="font-mono text-sm sm:text-base text-cyber-blue overflow-y-auto max-h-[70vh] min-h-[300px] mb-2 p-2"
      >
        {displayedLines.map((line, index) => (
          <div key={index} className="mb-2 leading-relaxed whitespace-pre-wrap">
            {line}
          </div>
        ))}
        {interactive && currentLine >= lines.length && (
          <form onSubmit={handleSubmit} className="flex items-center mt-4">
            <span className="mr-2">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-cyber-blue"
              placeholder="Type your command..."
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Terminal;
