import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

function AnswerDisplay({ question, answer, isLoading, error, userName }) {
  if (!question && !isLoading) return null;

  return (
    <div className="w-full flex flex-col gap-5 mt-6 pb-64">

      {/* USER BUBBLE */}
      {question && (
        <div className="flex flex-col items-end w-full">
          <div className="flex items-end gap-2 justify-end">
            <div className="max-w-[70%] bg-lime-400 text-black p-3 px-4 rounded-2xl rounded-tr-none text-sm font-lato leading-relaxed break-words overflow-hidden min-w-0">
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
          <div className="w-7 h-7 rounded-full bg-[#6D28D9] flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 self-start mt-1">
            Q
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="bg-[#6D28D9] p-3 px-4 rounded-2xl rounded-tl-none">
              <div className="flex gap-1 items-center h-5">
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0ms]"/>
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:150ms]"/>
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:300ms]"/>
              </div>
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div className="max-w-[65%] max-h-[60vh] overflow-y-auto bg-[#6D28D9] p-4 px-5 rounded-2xl rounded-tl-none text-sm font-lato leading-relaxed text-white/95 break-words">
              {error}
            </div>
          )}

          {/* Answer with markdown + LaTeX */}
          {answer && !isLoading && !error && (
            <div className="max-w-[80%] bg-[#6D28D9] p-4 px-5 rounded-2xl rounded-tl-none text-sm font-lato leading-relaxed text-white/95 break-words overflow-hidden min-w-0">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                  strong: ({children}) => <strong className="font-bold text-white">{children}</strong>,
                  ul: ({children}) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                  li: ({children}) => <li className="text-white/90">{children}</li>,
                  code: ({inline, children}) => inline
                    ? <code className="bg-black/30 px-1.5 py-0.5 rounded text-lime-400 text-xs font-mono">{children}</code>
                    : <pre className="bg-black/30 p-3 rounded-lg mt-2 mb-2 overflow-x-auto"><code className="text-lime-400 text-xs font-mono whitespace-pre-wrap">{children}</code></pre>,
                }}
              >
                {answer}
              </ReactMarkdown>
            </div>
          )}
        </div>

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