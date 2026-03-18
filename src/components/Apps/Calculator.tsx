'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handlePress = (val: string) => {
    if (val === 'AC') {
      setDisplay('0');
      setEquation('');
    } else if (val === '=') {
      try {
        // Safer alternative to eval for basic math
        // eslint-disable-next-line no-new-func
        const result = new Function(`return ${equation.replace(/[^-()\d/*+.]/g, '')}`)().toString();
        setDisplay(result);
        setEquation(result);
      } catch (e) {
        setDisplay('Error');
        setEquation('');
      }
    } else {
      if (display === '0' && !isNaN(Number(val))) {
        setDisplay(val);
        setEquation(val);
      } else {
        setDisplay(display + val);
        setEquation(equation + val);
      }
    }
  };

  const buttons = [
    ['AC', '+/-', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#242424] text-white overflow-hidden pointer-events-auto select-none rounded-b-xl">
      <div className="h-20 bg-[#242424] flex items-end justify-end p-4 text-4xl font-light">
        {display.slice(0, 10)}
      </div>
      <div className="flex-1 flex flex-col">
        {buttons.map((row, i) => (
          <div key={i} className="flex-1 flex">
            {row.map(btn => (
              <button
                key={btn}
                className={`flex-1 border border-[#1c1c1c] flex items-center justify-center text-xl hover:bg-white/20 active:bg-white/30 transition-colors
                  ${['/', '*', '-', '+', '='].includes(btn) ? 'bg-[#ff9f0a] text-white' : 
                    ['AC', '+/-', '%'].includes(btn) ? 'bg-[#a5a5a5] text-black hover:bg-[#b5b5b5]' : 'bg-[#333333]'
                  }
                  ${btn === '0' ? 'flex-[2]' : ''}`}
                onClick={() => handlePress(btn === '*' ? '*' : btn === '/' ? '/' : btn)}
              >
                {btn === '*' ? '×' : btn === '/' ? '÷' : btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
