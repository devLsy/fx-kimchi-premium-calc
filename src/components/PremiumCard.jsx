export const PremiumCard = ({ rate }) => (
  <div className={`p-8 rounded-3xl border shadow-2xl transition-colors duration-500 ${rate >= 0 ? 'bg-red-950/20 border-red-900/50' : 'bg-blue-950/20 border-blue-900/50'}`}>
    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 text-center">KIMCHI PREMIUM</div>
    <div className={`text-6xl font-black font-mono text-center tracking-tighter ${rate >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
      {rate.toFixed(2)}%
    </div>
  </div>
);