export const PriceCard = ({ title, value, unit = 'KRW', isError = false }) => (
  <div className={`bg-slate-900/50 p-5 rounded-2xl border ${isError ? 'border-red-900' : 'border-slate-800'}`}>
    <div className="text-[10px] text-slate-500 mb-2 font-bold tracking-widest">{title}</div>
    <div className={`font-mono text-lg font-black ${isError ? 'text-red-500' : 'text-white'}`}>
      {isError ? 'ERR' : (
        unit === 'USDT' ? `$${value.toLocaleString()}` : `${value.toLocaleString()} ${unit}`
      )}
    </div>
  </div>
);