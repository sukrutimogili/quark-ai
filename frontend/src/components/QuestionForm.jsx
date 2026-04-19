import React, { useRef } from 'react';

function QuestionForm({ input, onInputChange, onSubmit }) {
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    const target = e.target;
    onInputChange(target.value);
    target.style.height = 'inherit';
    const nextHeight = Math.min(target.scrollHeight, 200);
    target.style.height = `${nextHeight}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="fixed bottom-0 left-72 right-0 px-12 py-6 z-50 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F] to-transparent">
      <div className="max-w-4xl mx-auto relative">
        <textarea
          ref={textareaRef}
          rows="1"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Message Quark..."
          style={{ minHeight: '56px' }}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pr-12 text-sm font-lato font-normal focus:outline-none focus:border-lime-400/50 transition-all resize-none placeholder:text-white/10 overflow-y-auto text-white"
        />
        <button
          onClick={onSubmit}
          disabled={!input.trim()}
          className="absolute top-1/2 -translate-y-1/2 right-3 w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center hover:bg-lime-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 8l12-6-6 12V9L2 8z" fill="#000"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default QuestionForm;