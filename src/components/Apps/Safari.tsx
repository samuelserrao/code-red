'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Plus, PanelLeft, Search as SearchIcon, Compass } from 'lucide-react';
import axios from 'axios';

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

export default function Safari() {
  const [url, setUrl] = useState('https://www.wikipedia.org/');
  const [inputVal, setInputVal] = useState('react.js');
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'iframe' | 'search'>('search');
  const [history, setHistory] = useState<string[]>(['https://www.wikipedia.org/']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const MOCK_RESULTS: SearchResult[] = [
    { title: 'React - A JavaScript library for building user interfaces', link: 'https://react.dev', snippet: 'React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components.' },
    { title: 'Next.js by Vercel - The React Framework', link: 'https://nextjs.org', snippet: 'Used by some of the world\'s largest companies, Next.js enables you to create high-quality web applications with the power of React components.' },
    { title: 'Tailwind CSS - Rapidly build modern websites', link: 'https://tailwindcss.com', snippet: 'A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design.' },
    { title: 'TypeScript: JavaScript with syntax for types', link: 'https://www.typescriptlang.org', snippet: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.' },
    { title: 'Framer Motion - A production-ready motion library for React', link: 'https://framer.com/motion', snippet: 'Complete documentation for Framer Motion, the simple yet powerful motion library for React.' },
    { title: 'MDN Web Docs', link: 'https://developer.mozilla.org', snippet: 'The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.' },
    { title: 'Stacked - The UI kit for macOS replicas', link: 'https://stacked.sh', snippet: 'Design and build world-class interfaces with our modular component library inspired by modern operating systems.' },
    { title: 'Lucide React - Beautiful & consistent icons', link: 'https://lucide.dev', snippet: 'A clean and customizable icon library for React, part of the Lucide project.' },
    { title: 'Vite | Next Generation Frontend Tooling', link: 'https://vitejs.dev', snippet: 'Get ready for a development environment that can finally catch up with you.' },
    { title: 'GitHub: Let\'s build from here', link: 'https://github.com', snippet: 'GitHub is where over 100 million developers shape the future of software, together.' },
  ];

  const handleSearch = async (query: string) => {
    setLoading(true);
    setMode('search');
    try {
      // First try real API
      const res = await axios.get('/api/search', { params: { q: query } });
      if (res.data.items && res.data.items.length > 0 && !res.data.items[0].title.includes('[MOCK]')) {
         setResults(res.data.items);
      } else {
         // Fallback to high-quality filtered mock
         const filtered = MOCK_RESULTS.filter(r => 
           r.title.toLowerCase().includes(query.toLowerCase()) || 
           r.snippet.toLowerCase().includes(query.toLowerCase())
         );
         setResults(filtered.length > 0 ? filtered : MOCK_RESULTS.slice(0, 5));
      }
    } catch (e) {
      console.error(e);
      // Fallback
      setResults(MOCK_RESULTS.slice(0, 5));
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let finalUrl = inputVal;
      if (finalUrl.includes(' ') || !finalUrl.includes('.')) {
        // Treat as search query
        handleSearch(finalUrl);
      } else {
        if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
          finalUrl = `https://${finalUrl}`;
        }
        setUrl(finalUrl);
        setMode('iframe');
        
        const newHistory = [...history.slice(0, historyIndex + 1), finalUrl];
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    }
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setUrl(history[prevIndex]);
      setInputVal(history[prevIndex]);
      setMode('iframe');
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setUrl(history[nextIndex]);
      setInputVal(history[nextIndex]);
      setMode('iframe');
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-b-xl overflow-hidden">
      {/* Safari Toolbar */}
      <div className="h-12 border-b border-gray-200 bg-[#f6f6f6] flex items-center px-4 gap-4 justify-between select-none shrink-0 drag-handle">
        
        <div className="flex items-center gap-4 pl-20">
          <PanelLeft size={20} className="text-gray-500 hover:text-gray-800 cursor-pointer" />
          <div className="flex items-center gap-2 text-gray-400">
            <ChevronLeft 
              size={20} 
              className={`cursor-pointer ${historyIndex > 0 ? 'hover:text-gray-800 text-gray-600' : 'opacity-40 cursor-default'}`} 
              onClick={handleBack} 
            />
            <ChevronRight 
              size={20} 
              className={`cursor-pointer ${historyIndex < history.length - 1 ? 'hover:text-gray-800 text-gray-600' : 'opacity-40 cursor-default'}`} 
              onClick={handleForward} 
            />
          </div>
        </div>

        <div className="flex-1 max-w-2xl px-4 flex items-center">
          <div className="w-full bg-white border border-gray-300 rounded-md flex items-center px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all">
            <input 
              type="text" 
              className="w-full text-sm outline-none text-gray-800 bg-transparent truncate"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck="false"
            />
            {loading ? (
               <RotateCw size={14} className="text-gray-400 animate-spin ml-2" />
            ) : (
               <RotateCw size={14} className="text-gray-400 hover:text-gray-800 cursor-pointer ml-2" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Plus size={20} className="text-gray-500 hover:text-gray-800 cursor-pointer" />
        </div>
      </div>

      {/* Browser View */}
      <div className="flex-1 bg-white relative overflow-y-auto">
        {mode === 'iframe' && (
          <iframe 
            src={url} 
            className="w-full h-full border-none"
            title="Safari Browser"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        )}

        {mode === 'search' && (
          <div className="max-w-3xl mx-auto py-8 px-6">
            <div className="flex items-center gap-4 mb-8 border-b pb-6">
               <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-md">
                 <SearchIcon size={24} />
               </div>
               <div>
                 <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Search Results</h2>
                 <p className="text-sm text-gray-500">Showing results for &quot;{inputVal}&quot;</p>
               </div>
            </div>

            {loading && <div className="text-gray-500 text-sm">Searching the web...</div>}
            
            {!loading && results && results.length === 0 && (
               <div className="text-gray-500 text-sm">No results found.</div>
            )}

            {!loading && results && (
              <div className="flex flex-col gap-8 pb-12">
                {/* Featured Result */}
                {results.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-1">Best Match</h4>
                    <a 
                      href={results[0].link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="block bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.15)] transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-2xl flex shrink-0 items-center justify-center border border-gray-100 shadow-sm">
                          <img 
                            src={`https://www.google.com/s2/favicons?domain=${new URL(results[0].link).hostname}&sz=64`} 
                            alt="favicon" 
                            className="w-6 h-6"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[15px] font-semibold text-gray-900 leading-tight">{new URL(results[0].link).hostname}</span>
                          <span className="text-[12px] text-gray-500 leading-tight">{results[0].link}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl text-blue-600 group-hover:underline font-bold mb-3 tracking-tight">
                        {results[0].title}
                      </h3>
                      <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl">
                        {results[0].snippet}
                      </p>
                    </a>
                  </div>
                )}

                {/* Other Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.slice(1).map((item, i) => (
                    <a 
                      key={i} 
                      href={item.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="block p-5 rounded-2xl border border-transparent hover:bg-gray-50 transition-all group"
                    >
                      <div className="flex items-center gap-2 mb-2 overflow-hidden">
                        <div className="w-6 h-6 bg-gray-50 rounded-lg flex shrink-0 items-center justify-center border border-gray-100 shadow-sm">
                          <img 
                            src={`https://www.google.com/s2/favicons?domain=${new URL(item.link).hostname}&sz=32`} 
                            alt="favicon" 
                            className="w-4 h-4"
                          />
                        </div>
                        <span className="text-[12px] text-gray-500 leading-tight truncate">{new URL(item.link).hostname}</span>
                      </div>
                      <h3 className="text-[17px] text-blue-600 group-hover:underline font-semibold mb-2 tracking-tight line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[14px] text-gray-600 leading-relaxed line-clamp-2">
                        {item.snippet}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {!loading && !results && (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 mt-20">
                 <Compass size={48} className="mb-4 opacity-50" />
                 <p>Enter a search query or URL to begin</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
