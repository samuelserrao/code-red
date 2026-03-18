'use client';

import { useState } from 'react';
import { Lock, Cpu, Clock, AlertCircle } from 'lucide-react';

export default function AgenticAI() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Mock access time data
  const accessRecords = [
    { id: 1, login: '2026-03-18 10:23', logout: '2026-03-18 11:45', attempt: 'Success' },
    { id: 2, login: '2026-03-18 12:05', logout: '-', attempt: 'Failed' },
    { id: 3, login: '2026-03-18 14:10', logout: '2026-03-18 15:00', attempt: 'Success' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#1e1e1e] text-white">
        <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 bg-[#2d2d2d] p-8 rounded-2xl shadow-2xl border border-white/10 w-80">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
            <Lock className="text-blue-400 w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold mb-2 tracking-tight">Agentic AI Login</h2>
          
          <div className="w-full flex flex-col gap-2">
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              autoFocus
            />
            {error && <p className="text-red-400 text-xs pl-1">Incorrect password</p>}
          </div>

          <button 
            type="submit"
            className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
          >
            Authenticate
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] text-gray-200 overflow-y-auto p-6">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
        <Cpu className="text-blue-400 w-8 h-8" />
        <h1 className="text-2xl font-bold tracking-tight text-white">Agentic AI Control Panel</h1>
      </div>

      <div className="flex flex-col gap-8 flex-1">
        {/* Section 1: AI Model */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
            <AlertCircle className="w-5 h-5 text-red-400" />
            AI Model
          </h2>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex items-center justify-center min-h-[120px]">
            <p className="text-red-400 font-medium text-lg tracking-wide uppercase text-center">
              Secured<br/>Cant be acced without authors permition
            </p>
          </div>
        </section>

        {/* Section 2: Access Time */}
        <section className="flex items-start flex-col gap-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
            <Clock className="w-5 h-5 text-blue-400" />
            Access Time
          </h2>
          <div className="w-full bg-[#2d2d2d] border border-white/10 rounded-xl overflow-hidden shadow-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm">
                  <th className="px-6 py-3 font-medium">Login</th>
                  <th className="px-6 py-3 font-medium">Logout</th>
                  <th className="px-6 py-3 font-medium">Attempt</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                {accessRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">{record.login}</td>
                    <td className="px-6 py-4">{record.logout}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        record.attempt === 'Success' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {record.attempt}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
