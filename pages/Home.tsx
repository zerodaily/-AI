
import React, { useState } from 'react';
import { AppRoute, PricingPlan, SubscriptionStatus } from '../types';

interface HomeProps {
  onNavigate: (route: AppRoute) => void;
  onSubscribe: (status: SubscriptionStatus) => void;
}

const PLANS: PricingPlan[] = [
  {
    id: 'monthly',
    name: '极客专业版',
    price: 499,
    period: 'month',
    features: ['全量DTC故障库深度匹配', '三电系统拓扑逻辑分析', 'IGBT功率模组诊断建议', '高压安全防护实时指引'],
    recommended: false
  },
  {
    id: 'yearly',
    name: '大师旗舰版',
    price: 2999,
    period: 'year',
    features: ['包含所有专业版权益', 'CAN-FD 协议在线解析', '动力电池健康(SOH)算法库', '企业级多端协作终端', '专属技术总监介入'],
    recommended: true
  }
];

const Home: React.FC<HomeProps> = ({ onNavigate, onSubscribe }) => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [paymentStep, setPaymentStep] = useState<'selection' | 'qrcode' | 'success'>('selection');
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat' | null>(null);

  const startPayment = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setPaymentStep('selection');
  };

  const handleSelectMethod = (method: 'alipay' | 'wechat') => {
    setPaymentMethod(method);
    setPaymentStep('qrcode');
    setTimeout(() => {
      setPaymentStep('success');
      setTimeout(() => {
        onSubscribe(selectedPlan?.id === 'monthly' ? 'monthly' : 'yearly');
      }, 1500);
    }, 3000);
  };

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Tech Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden tech-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-slate-950 to-slate-950"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex -space-x-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-5 h-5 rounded-full border-2 border-slate-950 bg-emerald-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-slate-950" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </div>
                  ))}
                </div>
                <span className="text-emerald-400 text-[10px] font-black tracking-widest uppercase">Expert Verified Diagnostic Engine</span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-black text-white leading-none brand-font tracking-tighter">
                水稻<span className="text-emerald-500">新能源</span><br />
                专家级AI大脑
              </h1>
              
              <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                业内首款集成 <span className="text-white font-bold underline decoration-emerald-500">三电拓扑逻辑</span> 的深度大模型。专为维修工程师打造，让每一个复杂故障都有专家背书。
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => onNavigate(AppRoute.CHAT)}
                  className="px-12 py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black text-xl transition-all shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95"
                >
                  立即试用
                </button>
                <div className="h-16 w-px bg-white/10 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-emerald-500 font-bold text-2xl brand-font">99.8%</span>
                  <span className="text-slate-500 text-xs font-bold uppercase">诊断准确率记录</span>
                </div>
              </div>

              {/* Real-time Stats Ticker */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
                {[
                  { label: '故障码解析', val: '5,800+', sub: 'DTC Protocols' },
                  { label: '响应速度', val: '< 1.2s', sub: 'Low Latency' },
                  { label: '覆盖品牌', val: '120+', sub: 'Global Brands' },
                  { label: '技术文档', val: '2.5万+', sub: 'Docs Library' },
                ].map((stat, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <div className="text-white font-bold text-lg leading-none mb-1">{stat.val}</div>
                    <div className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Tech Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-10 bg-emerald-500/20 blur-[100px] rounded-full animate-pulse"></div>
              <div className="relative bg-slate-900/50 border border-white/10 p-6 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">DEBUGGING: SYSTEM_3_ELECTRIC</span>
                </div>
                <div className="space-y-4">
                  <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[78%] animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 font-mono text-xs text-emerald-400 space-y-2">
                    <p className="">&gt; ANALYZING BMS_PACK_02...</p>
                    <p className="text-slate-500 opacity-60">&gt; VOLTAGE_UNBALANCE_DETECTED: 0.045V</p>
                    <p className="animate-pulse">&gt; STATUS: CRITICAL_DIAGNOSIS_READY</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" className="w-full h-48 object-cover rounded-2xl grayscale opacity-40 contrast-150" alt="Diagnostic Interface" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <div className="bg-slate-950 border-y border-white/5 py-4 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-[scroll_40s_linear_infinite]">
          {[
            'TESLA', 'BYD', 'NIO', 'XPENG', 'ZEEKR', 'GEELY', 'VW ID', 'BMW i', 'BENZ EQ', 'AION', 'LI AUTO'
          ].map((brand, i) => (
            <span key={i} className="text-slate-700 text-sm font-black mx-12 tracking-[0.3em]">{brand}</span>
          ))}
          {/* Duplicate for seamless scroll */}
          {[
            'TESLA', 'BYD', 'NIO', 'XPENG', 'ZEEKR', 'GEELY', 'VW ID', 'BMW i', 'BENZ EQ', 'AION', 'LI AUTO'
          ].map((brand, i) => (
            <span key={i+'2'} className="text-slate-700 text-sm font-black mx-12 tracking-[0.3em]">{brand}</span>
          ))}
        </div>
      </div>

      {/* Capabilities Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
             <h2 className="text-3xl font-bold text-white mb-4 brand-font">核心技术栈全解析</h2>
             <p className="text-slate-400">水稻AI专家不仅仅是检索工具，我们通过多层神经网络模拟高级技师的诊断直觉。</p>
          </div>
          <div className="text-emerald-500 font-bold border-b border-emerald-500 pb-1 cursor-pointer hover:text-emerald-400 transition-colors">查看详细技术文档 →</div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: 'BMS 主控逻辑', icon: '🔋', desc: '从电芯均衡算法到热失控阈值预判，深度解析BMS通讯报文。' },
            { title: 'IGBT 结温分析', icon: '⚡', desc: '精确评估逆变器功率模块老化状态，预警击穿风险。' },
            { title: 'CAN-FD 报文', icon: '📡', desc: '支持最新车载以太网及多路总线干扰排查与协议层分析。' },
            { title: '绝缘检测逻辑', icon: '⚠️', desc: '多级绝缘阻值偏差排查，精准定位漏电接点（含湿气干扰因子）。' }
          ].map((tech, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-emerald-500/40 transition-all group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{tech.icon}</div>
              <h3 className="text-lg font-bold text-white mb-3 brand-font">{tech.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compact Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white brand-font">专家权益计划</h2>
            <p className="text-slate-400">开启您的智能维保时代</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <div key={plan.id} className={`p-10 rounded-[2.5rem] flex flex-col bg-slate-950 border ${plan.recommended ? 'border-emerald-500' : 'border-white/5'}`}>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white brand-font mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">¥{plan.price}</span>
                      <span className="text-slate-500 text-sm">/{plan.period === 'month' ? '月' : '年'}</span>
                    </div>
                  </div>
                  {plan.recommended && <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded-full">Recommended</span>}
                </div>

                <div className="grid grid-cols-1 gap-4 mb-10 flex-grow">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex gap-3 text-slate-400 text-sm">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                      {f}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => startPayment(plan)}
                  className={`w-full py-5 rounded-2xl font-bold transition-all ${plan.recommended ? 'bg-emerald-50 text-slate-950 hover:bg-white' : 'bg-white/5 text-white hover:bg-white/10'}`}
                >
                  确认办理
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Keyframes for Animations */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      {/* Payment Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setSelectedPlan(null)}></div>
          <div className="relative bg-slate-900 border border-white/10 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white brand-font">确认订阅</h3>
                <p className="text-slate-500 text-xs">正在为账号 138****8888 办理</p>
              </div>
              <button onClick={() => setSelectedPlan(null)} className="text-slate-500 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {/* Modal Body (Payment UI) */}
            <div className="p-8">
              {paymentStep === 'selection' && (
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-2xl flex justify-between items-center border border-emerald-500/20">
                    <div>
                      <span className="text-emerald-400 font-bold block mb-1">{selectedPlan.name}</span>
                      <span className="text-2xl font-black text-white">¥{selectedPlan.price}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => handleSelectMethod('alipay')} className="p-6 rounded-2xl border border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all flex flex-col items-center gap-3">
                      <img src="https://upload.wikimedia.org/wikipedia/zh/thumb/9/9b/Ant_Group_and_Alipay_logo.svg/1024px-Ant_Group_and_Alipay_logo.svg.png" className="h-8" alt="Alipay" />
                      <span className="text-xs font-medium text-slate-400">支付宝支付</span>
                    </button>
                    <button onClick={() => handleSelectMethod('wechat')} className="p-6 rounded-2xl border border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all flex flex-col items-center gap-3">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/WeChat_Pay_logo.svg/1024px-WeChat_Pay_logo.svg.png" className="h-8" alt="WeChat" />
                      <span className="text-xs font-medium text-slate-400">微信支付</span>
                    </button>
                  </div>
                </div>
              )}
              {paymentStep === 'qrcode' && (
                <div className="flex flex-col items-center py-6 text-center">
                  <h4 className="text-white font-bold mb-6 tracking-wide">请使用{paymentMethod === 'alipay' ? '支付宝' : '微信'}扫码支付</h4>
                  <div className="p-4 bg-white rounded-2xl mb-6 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                    <div className="w-40 h-40 bg-slate-100 flex items-center justify-center">
                      <svg className="w-24 h-24 text-slate-300 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v2h-3v-2zm-3 3h2v2h-2v-2zm3-3h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v2h-3v-2z" /></svg>
                    </div>
                  </div>
                  <p className="text-emerald-500 text-xs font-black animate-pulse">WAITING FOR TRANSACTION...</p>
                </div>
              )}
              {paymentStep === 'success' && (
                <div className="flex flex-col items-center py-10 text-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                    <svg className="w-10 h-10 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2 brand-font">授权成功</h4>
                  <p className="text-slate-400">专家系统已激活</p>
                </div>
              )}
            </div>
            <div className="p-8 bg-white/5 text-[10px] text-slate-500 leading-relaxed text-center">
              水稻新能源技术支持中心 &bull; 全球数字化维保引擎
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
