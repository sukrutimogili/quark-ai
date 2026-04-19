import React from 'react';

function AnswerDisplay({ question, answer, isLoading, error, userName }) {
  if (!question && !isLoading) return null;

  return (
    <div className="w-full max-w-2xl flex flex-col gap-5 mt-6">

      {/* USER BUBBLE — only show if there's a question */}
      {question && (
        <div className="flex flex-col items-end w-full">
          <div className="flex items-end gap-2 justify-end">
            <div className="w-[25%] bg-lime-400 text-black p-3 px-4 rounded-2xl rounded-tr-none text-sm font-lato leading-relaxed">
              {question}
            </div>
            <div className="w-7 h-7 rounded-full bg-lime-400 flex items-center justify-center text-black text-[10px] font-black flex-shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
          <span className="text-[9px] font-outfit font-[900] uppercase mt-1.5 text-white/20 tracking-widest mr-9">
            {userName}
          </span>
        </div>
      )}

      {/* AI BUBBLE */}
      <div className="flex flex-col items-start w-full">
        <div className="flex items-end gap-2">
          <div className="w-7 h-7 rounded-full bg-[#6D28D9] flex items-center justify-center text-white text-[10px] font-black flex-shrink-0">
            Q
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="bg-[#6D28D9] p-3 px-4 rounded-2xl rounded-tl-none">
              <div className="flex gap-1 items-center h-5">
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0ms]"/>
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:150ms]"/>
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:300ms]"/>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && !isLoading && (
            <div className="w-[65%] bg-red-900/40 border border-red-500/20 p-3 px-4 rounded-2xl rounded-tl-none text-sm font-lato leading-relaxed text-red-300">
              {error}
            </div>
          )}

          {/* Answer state */}
          {answer && !isLoading && !error && (
            <div className="w-[65%] bg-[#6D28D9] p-3 px-4 rounded-2xl rounded-tl-none text-sm font-lato leading-relaxed text-white/95">
              {answer}
            </div>
          )}
        </div>

        {/* Metadata — only when answer is ready */}
        {answer && !isLoading && !error && (
          <div className="flex gap-4 mt-1.5 ml-9 text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
            <span>Quark AI</span>
          </div>
        )}
      </div>

    </div>
  );
}

export default AnswerDisplay;