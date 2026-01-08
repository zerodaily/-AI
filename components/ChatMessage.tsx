
import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-8 animate-in slide-in-from-bottom-4 duration-500`}>
      <div className={`flex flex-col max-w-[88%] md:max-w-[80%] ${isAssistant ? 'items-start' : 'items-end'}`}>
        {/* Role Badge */}
        <div className="flex items-center gap-2 mb-2 px-1">
          {isAssistant ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <svg className="w-4 h-4 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
              </div>
              <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest brand-font">SHUIDAO AI EXPERT</span>
            </div>
          ) : (
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest brand-font">USER INPUT</span>
          )}
        </div>

        {/* Bubble */}
        <div className={`
          p-5 rounded-[1.5rem] shadow-xl text-sm leading-relaxed
          ${isAssistant 
            ? 'bg-slate-900 text-slate-300 border border-white/5 rounded-tl-none' 
            : 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-slate-950 font-medium rounded-tr-none shadow-emerald-500/10'}
        `}>
          {message.image && (
            <div className="relative mb-4 group overflow-hidden rounded-xl border border-white/10">
              <img 
                src={message.image} 
                alt="Context" 
                className="max-w-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay"></div>
            </div>
          )}
          <div className="whitespace-pre-wrap">
            {message.content}
          </div>
        </div>

        {/* Timestamp */}
        <span className="mt-2 text-[10px] text-slate-600 font-medium">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
