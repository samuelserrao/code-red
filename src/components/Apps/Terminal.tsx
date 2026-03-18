'use client';

import { useState, useRef, useEffect } from 'react';
import { getFolderContents } from '@/lib/filesystem';

export default function Terminal() {
  const [history, setHistory] = useState<{ type: 'input' | 'output', text: string }[]>([
    { type: 'output', text: 'Last login: ' + new Date().toString().slice(0, 24) + ' on ttys000' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>(['root', 'users', 'samuel']);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim();
      const currentDirName = currentPath[currentPath.length - 1] === 'root' ? '/' : currentPath[currentPath.length - 1];
      const newHistory = [...history, { type: 'input', text: `samuel@MacBook-Pro ${currentDirName} % ${cmd}` } as const];
      
      const args = cmd.split(' ');
      const baseCmd = args[0].toLowerCase();

      if (baseCmd === 'clear') {
        setHistory([]);
      } else if (baseCmd === 'whoami') {
        setHistory([...newHistory, { type: 'output', text: 'samuel' }]);
      } else if (baseCmd === 'date') {
        setHistory([...newHistory, { type: 'output', text: new Date().toString() }]);
      } else if (baseCmd === 'ls') {
        const items = getFolderContents(currentPath[currentPath.length - 1]);
        const output = items.map(item => item.name).join('  ');
        setHistory([...newHistory, { type: 'output', text: output || ' ' }]);
      } else if (baseCmd === 'cd') {
        const target = args[1];
        if (!target || target === '~') {
          setCurrentPath(['root', 'users', 'samuel']);
          setHistory(newHistory);
        } else if (target === '..') {
          if (currentPath.length > 1) {
            setCurrentPath(prev => prev.slice(0, -1));
          }
          setHistory(newHistory);
        } else {
          // Check if folder exists
          const contents = getFolderContents(currentPath[currentPath.length - 1]);
          const found = contents.find(c => c.type === 'folder' && c.name.toLowerCase() === target.toLowerCase());
          if (found) {
            setCurrentPath(prev => [...prev, found.id]);
            setHistory(newHistory);
          } else {
            setHistory([...newHistory, { type: 'output', text: `cd: ${target}: No such file or directory` }]);
          }
        }
      } else if (cmd !== '') {
        setHistory([...newHistory, { type: 'output', text: `zsh: command not found: ${cmd}` }]);
      } else {
        setHistory(newHistory);
      }
      
      setInputVal('');
    }
  };

  const currentDirName = currentPath[currentPath.length - 1] === 'root' ? '/' : currentPath[currentPath.length - 1];

  return (
    <div className="w-full h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs p-2 overflow-y-auto" onClick={() => document.getElementById('terminal-input')?.focus()}>
      {history.map((line, i) => (
        <div key={i} className={`whitespace-pre-wrap ${line.type === 'input' ? 'text-[#33ff00]' : 'text-[#d4d4d4]'}`}>
          {line.text}
        </div>
      ))}
      <div className="flex">
        <span className="text-[#33ff00] mr-2">samuel@MacBook-Pro {currentDirName} %</span>
        <input
          id="terminal-input"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none text-[#d4d4d4]"
          autoComplete="off"
          spellCheck="false"
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
