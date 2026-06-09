export const PriceCard = ({ title, value, label, isCurrency = false }) => (
  <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
    <div className="text-[10px] text-slate-500 mb-2 font-bold tracking-widest">{title}</div>
    <div className="font-mono text-lg font-black text-white">
      {isCurrency ? `$${value.toLocaleString()}` : `${value.toLocaleString()} KRW`}
    </div>
  </div>
);