import React, { useState, useRef } from 'react';
import QuestionForm from './components/QuestionForm';
import AnswerDisplay from './components/AnswerDisplay';
import { askQuestion, sanitizeLatex } from './services/api';

const MAX_QUESTIONS = 10;
const TOKENS_PER_QUESTION = 500;
const TOKEN_LIMIT = 5000;

function App() {
  const [userName, setUserName] = useState(localStorage.getItem('quark_user') || "");
  const [tempName, setTempName] = useState("");
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]); // { question, answer }[]
  const [tokensUsed, setTokensUsed] = useState(0);
  const [popupMessage, setPopupMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(null); // which history item is shown

  const getGreeting = () => {
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
    setInput("");
    setQuestion("");
    setAnswer("");
    setError("");
    setHistory([]);
    setTokensUsed(0);
    setActiveIndex(null);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const currentQuestion = input.trim();
    setQuestion(currentQuestion);
    setInput("");
    setAnswer("");
    setError("");
    setIsLoading(true);
    setActiveIndex(null);

    try {
      const data = await askQuestion(currentQuestion);
      setAnswer(sanitizeLatex(data.answer));

      // add to history, keep last 10
      const newEntry = { question: currentQuestion, answer: data.answer };
      setHistory([newEntry]);

      // update token count (approximate)
      setTokensUsed(prev => Math.min(prev + TOKENS_PER_QUESTION, TOKEN_LIMIT));

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // clicking a history item shows that Q&A
  const handleHistoryClick = (index) => {
    const item = history[index];
    setQuestion(item.question);
    setAnswer(item.answer);
    setError("");
    setIsLoading(false);
    setActiveIndex(index);
  };

  const capacityPercent = Math.round((tokensUsed / TOKEN_LIMIT) * 100);

  // Inside App.jsx
  const handleNewChat = () => {
    const quips = [
      "New chat? I already forgot what we were talking about anyway. (I'm just designed to be stateless!)",
      "Oops! I have the memory of a goldfish. Every question is a brand new start for me!",
      "Error 404: Memory not found. (Just kidding, I'm just designed to stay in the moment!)"
    ];
    
    const randomQuip = quips[Math.floor(Math.random() * quips.length)];
    setPopupMessage(randomQuip); // Instead of alert(), set the state
  };

  // ── WELCOME SCREEN ──────────────────────────────
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

  // ── MAIN LAYOUT ─────────────────────────────────
  return (
    <div className="flex h-screen w-full bg-[#0F0F0F] font-lato text-white overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-6 bg-[#0A0A0A]">

        {/* Logo */}
        <div className="mb-8 flex items-center gap-1">
          <span className="font-outfit font-[900] text-[30px] text-white/80">quark</span>
          <span className="font-outfit text-2xl text-lime-400 leading-none mt-1">AI</span>
        </div>

        <button
          onClick={handleNewChat}
          className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm text-left text-white/70 font-medium mb-4 group"
        >
          <span className="group-hover:text-lime-400 transition-colors">+ New Chat</span>
        </button>

        {/* History */}
        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-[10px] text-white/20 text-center mt-4">No history yet</p>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/20 mb-2">
                Recent — {history.length}
              </p>
              {history.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleHistoryClick(i)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-lato transition-all truncate ${
                    activeIndex === i
                      ? 'bg-white/10 text-white border-l-2 border-lime-400'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  }`}
                >
                  {item.question}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Capacity + Reset */}
        <div className="pt-6 border-t border-white/10 space-y-6">
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Capacity</span>
              <span className="text-xs font-outfit font-[900] text-white">{capacityPercent}%</span>
            </div>
            <div className="h-2.5 w-full bg-white/5 border border-white/10">
              <div
                className={`h-full transition-all duration-500 ${
                  capacityPercent > 80 ? 'bg-red-400' :
                  capacityPercent > 50 ? 'bg-amber-400' : 'bg-lime-400'
                }`}
                style={{ width: `${capacityPercent}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[10px] font-medium text-white/60">
              <span>{tokensUsed.toLocaleString()} used</span>
              <span>{TOKEN_LIMIT.toLocaleString()} limit</span>
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

      {/* MAIN */}
      <main className="flex-1 flex flex-col px-16 py-12 pb-32 overflow-y-auto">

        {/* GREETING — own container, left aligned */}
        <div className="w-full max-w-2xl mb-8">
          <div className="flex items-baseline gap-4">
            <h1 className="font-outfit text-5xl font-[900] lowercase tracking-tighter text-white">
              {getGreeting()},
            </h1>
            <span className="font-pinyon text-6xl text-lime-400">
              {userName}.
            </span>
          </div>
        </div>

        {/* CHAT — own container, centred */}
        <div className="flex-1 flex flex-col items-center w-full">
          <div className="w-full max-w-2xl">
            <AnswerDisplay
              question={question}
              answer={answer}
              isLoading={isLoading}
              error={error}
              userName={userName}
            />
          </div>
        </div>

        <QuestionForm
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
        />

        {/* Custom Stateless Popup */}
        {popupMessage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
            <div className="bg-[#1A1A1A] border border-white/10 p-8 rounded-2xl max-w-sm w-full shadow-2xl text-center">
              <h3 className="font-outfit text-[10px] font-black uppercase tracking-[0.3em] text-lime-400 mb-4">
                System Protocol
              </h3>
              <p className="font-lato text-sm text-white/80 leading-relaxed mb-8">
                {popupMessage}
              </p>
              <button
                onClick={() => setPopupMessage("")}
                className="w-full py-3 bg-lime-400 text-black font-bold text-[10px] uppercase tracking-widest rounded-lg hover:bg-lime-300 transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}

export default App;