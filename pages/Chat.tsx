
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getAiResponse } from '../services/gemini';
import ChatMessage from '../components/ChatMessage';

interface ChatProps {
  isPremium?: boolean;
}

const Chat: React.FC<ChatProps> = ({ isPremium = false }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: isPremium 
        ? '水稻科技专家系统 - 企业级权限已开启。\n\n尊敬的专家用户，我已为您准备好最高优先级的计算链路。您可以直接发送高清晰度的故障图片，或描述复杂的三电逻辑问题，我将为您提供最深度的维修策略建议。'
        : '水稻科技专家系统已启动。\n\n您好，我是水稻新能源专家AI。我已加载比亚迪、特斯拉、广汽、上汽等主流车型的全系三电诊断协议。请输入您的提问，或上传故障码图片。\n\n⚠️ 系统提示：高压系统作业需由具备低压/高压电工证人员操作，测量前请确保绝缘层完好。',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
      image: selectedImage || undefined
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    const currentImage = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const response = await getAiResponse(newMessages, currentImage || undefined);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-950 tech-grid">
      {/* Header Info for Premium */}
      {isPremium && (
        <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-6 py-2 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
             <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Priority Expert Channel Active</span>
           </div>
           <span className="text-[10px] text-slate-500 font-medium">Model: Gemini 3 Pro (Enhanced)</span>
        </div>
      )}

      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-4 md:p-8 space-y-6"
      >
        <div className="max-w-4xl mx-auto">
          {messages.map((m, i) => (
            <ChatMessage key={i} message={m} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-slate-900 p-5 rounded-2xl border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse [animation-delay:-.2s]"></div>
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse [animation-delay:-.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-slate-900/80 backdrop-blur-xl border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          {selectedImage && (
            <div className="mb-4 relative inline-block">
              <img src={selectedImage} alt="Selected" className="h-24 w-24 object-cover rounded-xl border-2 border-emerald-500 shadow-lg shadow-emerald-500/20" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 shadow-xl hover:bg-red-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          <div className="flex items-end gap-3">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-4 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-2xl transition-all"
              title="图片诊断"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
            
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={isPremium ? "请输入您的深度专家级问题..." : "描述故障现象... (AI专家大模型已就位)"}
              className="flex-grow p-4 bg-slate-800 text-white border border-white/5 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 outline-none resize-none min-h-[56px] max-h-40 placeholder:text-slate-500"
            />
            
            <button
              onClick={handleSend}
              disabled={isLoading}
              className={`p-4 rounded-2xl transition-all ${
                isLoading ? 'bg-slate-700 text-slate-500' : 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95'
              }`}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
