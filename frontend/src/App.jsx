import React, { useState, useRef } from 'react';

function App() {
  const [userName, setUserName] = useState(localStorage.getItem('quark_user') || "");
  const [tempName, setTempName] = useState("");
  const [input, setInput] = useState("");        
  const textareaRef = useRef(null);              

  const getOneWordGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter' && tempName.trim()) {
      localStorage.setItem('quark_user', tempName.trim());
      setUserName(tempName.trim());
    }
  };

  const handleReset = () => {
    localStorage.removeItem('quark_user');
    setUserName("");
    setTempName("");
  };

  const handleInput = (e) => {
    const target = e.target;
    setInput(target.value);
    target.style.height = 'inherit';
    const nextHeight = Math.min(target.scrollHeight, 200);
    target.style.height = `${nextHeight}px`;
  };

  if (!userName) {
    return (
      <div className="h-screen w-full bg-[#0F0F0F] flex flex-col items-center justify-center p-6 text-white">
        <div className="w-full max-w-md text-center space-y-8">
          <h2 className="font-outfit text-[10px] font-[900] uppercase tracking-[0.4em] text-white/30">
            Identify Yourself
          </h2>
          <input
            autoFocus
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="..."
            className="w-full bg-transparent border-b border-white/5 py-4 text-center font-pinyon text-6xl text-lime-400 focus:outline-none focus:border-lime-400/30 transition-all placeholder:text-white/5"
          />
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
            Press Enter to initialize
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#0F0F0F] font-lato text-white overflow-hidden">
      
      <aside className="w-72 border-r border-white/5 flex flex-col p-6 bg-[#0A0A0A]">
        {/* LOGO */}
        <div className="mb-8 flex items-center gap-0.75">
        
        <span className="font-outfit font-[900] text-[30px] tracking-smug text-white/80">
          quark
        </span>
        <span className="font-outfit text-xl text-lime-400 leading-none mt-2">
          AI
        </span>
      </div>
        <div className="flex-1">
          <button className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm text-left text-white/70 font-medium">
            + New Chat
          </button>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-6">
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Capacity</span>
              <span className="text-xs font-outfit font-[900] text-white">24%</span>
            </div>
            <div className="h-2.5 w-full bg-white/5 border border-white/10">
              <div className="h-full bg-lime-400" style={{ width: '24%' }}></div>
            </div>
            <div className="mt-2 flex justify-between text-[10px] font-medium text-white/60">
              <span>1,200 used</span>
              <span>5,000 limit</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-red-400 transition-colors w-full text-left"
          >
            Reset Identity
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col items-start p-12 overflow-y-auto">

        <div className="w-full max-w-5xl mb-12 flex items-baseline gap-4">
          <h1 className="font-outfit text-5xl font-[900] lowercase tracking-tighter text-white">
            {getOneWordGreeting()},
          </h1>
          <span className="font-pinyon text-6xl text-lime-400">
            {userName}.
          </span>
        </div>

        {/* USER MESSAGE */}
        <div className="flex flex-col items-end w-full">
          <div className="flex items-end gap-2 justify-end">
            <div className="w-[100%] bg-lime-400 text-black p-3 px-4 rounded-2xl rounded-tr-none text-sm font-lato leading-relaxed">
              Hey Quark, explain higher order functions in 2 lines.
            </div>
            <div className="w-7 h-7 rounded-full bg-lime-400 flex items-center justify-center text-black text-[10px] font-black flex-shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
          <span className="text-[9px] font-outfit font-[900] uppercase mt-1.5 text-white/20 tracking-widest mr-9">
            {userName}
          </span>
        </div>

        {/* AI MESSAGE */}
        <div className="flex flex-col items-start w-full">
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-[#6D28D9] flex items-center justify-center text-white text-[10px] font-black flex-shrink-0">
              Q
            </div>
            <div className="w-[65%] bg-[#6D28D9] p-3 px-4 rounded-2xl rounded-tl-none text-sm font-lato leading-relaxed text-white/95">
              A <strong>higher-order function</strong> is a function that either takes other functions as arguments or returns them. It allows for cleaner, more modular code through abstraction.
            </div>
          </div>
          <div className="flex gap-4 mt-1.5 ml-9 text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
            <span>120 tokens</span>
            <span>0.4s</span>
          </div>
        </div>

        <div className="fixed bottom-0 left-72 right-0 px-12 py-6 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F] to-transparent">
          <div className="max-w-2xl mx-auto relative">
            <textarea
              ref={textareaRef}
              rows="1"
              value={input}
              onChange={handleInput}
              placeholder="Message Quark..."
              style={{ minHeight: '56px' }}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pr-12 text-[15px] font-lato font-normal focus:outline-none focus:border-lime-400/50 transition-all resize-none placeholder:text-white/10 overflow-y-auto"
            />
            {/* Send button */}
            <button
              className="absolute top-1/2 -translate-y-1/2 right-3 w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center hover:bg-lime-300 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 8l12-6-6 12V9L2 8z" fill="#000"/>
              </svg>
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;