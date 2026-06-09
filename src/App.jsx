import React, { useState } from 'react';
import { useMarketData } from './hooks/useMarketData';

const COIN_LIST = [
  { id: 'BTC', name: '비트코인 (BTC)', upbit: 'KRW-BTC', binance: 'BTCUSDT' },
  { id: 'ETH', name: '이더리움 (ETH)', upbit: 'KRW-ETH', binance: 'ETHUSDT' },
  { id: 'DOGE', name: '도지코인 (DOGE)', upbit: 'KRW-DOGE', binance: 'DOGEUSDT' },
  { id: 'ADA', name: '에이다 (ADA)', upbit: 'KRW-ADA', binance: 'ADAUSDT' },
];

function App() {
  const [selectedCoin, setSelectedCoin] = useState(COIN_LIST[0]);
  const { domesticPrice, foreignPrice, exchangeRate, loading } = useMarketData(selectedCoin);

  const convertedForeignPrice = foreignPrice * exchangeRate;
  const kimchiPremium = convertedForeignPrice > 0 
    ? ((domesticPrice - convertedForeignPrice) / convertedForeignPrice) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 font-sans">
      <div className="max-w-md mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-black text-white tracking-tighter">FX-KIMCHI ENGINE</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-bold">Real-time Arbitrage Analytics</p>
        </header>

        <select
          value={selectedCoin.id}
          onChange={(e) => setSelectedCoin(COIN_LIST.find(c => c.id === e.target.value))}
          className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-4 mb-6 font-bold outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-lg"
        >
          {COIN_LIST.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        {loading ? (
          <div className="animate-pulse text-slate-600 text-center py-20 font-mono text-sm tracking-widest">
            SYNCING LIVE DATA...
          </div>
        ) : (
          <div className="space-y-6">
            <div className={`p-8 rounded-3xl border shadow-2xl transition-colors duration-500 ${kimchiPremium >= 0 ? 'bg-red-950/20 border-red-900/50' : 'bg-blue-950/20 border-blue-900/50'}`}>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 text-center">
                KIMCHI PREMIUM
              </div>
              <div className={`text-6xl font-black font-mono text-center tracking-tighter ${kimchiPremium >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
                {kimchiPremium.toFixed(2)}%
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-500 mb-2 font-bold tracking-widest">UPBIT (KRW)</div>
                <div className="font-mono text-lg font-black text-white">{domesticPrice.toLocaleString()}</div>
              </div>
              <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-500 mb-2 font-bold tracking-widest">BINANCE (USD)</div>
                <div className="font-mono text-lg font-black text-white">${foreignPrice.toLocaleString()}</div>
              </div>
            </div>

            <div className="bg-slate-900/30 p-5 rounded-2xl border border-slate-800/50 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Live FX Rate</span>
              <span className="font-mono text-blue-400 font-bold">{exchangeRate.toFixed(2)} KRW</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;