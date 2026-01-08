
import React from 'react';
import { AppRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentRoute: AppRoute;
  isPremium?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, currentRoute, isPremium }) => {
  const navigate = (route: AppRoute) => {
    window.location.hash = route;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <nav className="sticky top-0 z-50 glass-effect border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate(AppRoute.HOME)}>
              <div className="bg-emerald-500 p-2 rounded-xl rotate-3 group-hover:rotate-0 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                <svg className="w-7 h-7 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-tighter brand-font leading-none">
                  水稻<span className="text-emerald-500">新能源</span>
                </span>
                {isPremium && (
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.2em] mt-1">Premium Expert</span>
                )}
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-10">
              <button 
                onClick={() => navigate(AppRoute.HOME)}
                className={`text-sm font-medium tracking-wide transition-colors ${currentRoute === AppRoute.HOME ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-400'}`}
              >
                技术首页
              </button>
              <button 
                onClick={() => navigate(AppRoute.CHAT)}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-slate-950 glow-emerald transition-all hover:scale-105 active:scale-95"
              >
                {isPremium ? '进入诊断' : '立即试用'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-emerald-500 p-1.5 rounded-lg">
                   <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                    </svg>
                </div>
                <span className="text-white font-bold text-xl brand-font">水稻新能源专家</span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                致力于利用最先进的人工智能技术，为全球新能源维修从业者提供“专家级”的实时技术支持与故障闭环方案。
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">快速链接</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">专家团队</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">技术文档</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">订阅中心</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">联系支持</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">在线客服</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">商务合作</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">400-888-SHUIDAO</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p>&copy; 2024 水稻科技 (SHUIDAO Tech). 保留所有权利。</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-slate-400">隐私权政策</a>
              <a href="#" className="hover:text-slate-400">服务协议</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
